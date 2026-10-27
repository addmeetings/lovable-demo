import http from 'node:http';
import { timingSafeEqual } from 'node:crypto';
import { isSuccess } from './minecraft-bridge.js';

const MAX_BODY_BYTES = 1_000_000;
const MAX_BATCH = 5_000;

/**
 * HTTP API the terminal CLI (or any script / AI agent) talks to.
 *
 *   GET  /health            -> liveness + Minecraft connection status
 *   POST /command           -> { "command": "say hi" }
 *   POST /commands          -> { "commands": ["say a", "say b"] }
 *   GET  /events            -> Server-Sent Events stream of game events
 */
export function createApi(bridge, { token } = {}) {
  const sseClients = new Set();

  const broadcast = (type, data) => {
    const frame = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const res of sseClients) res.write(frame);
  };
  bridge.on('event', (e) => broadcast('game', e));
  bridge.on('connected', (s) => broadcast('status', s));
  bridge.on('disconnected', () => broadcast('status', bridge.status()));

  const server = http.createServer(async (req, res) => {
    try {
      if (!authorized(req, token)) return send(res, 401, { error: 'Unauthorized' });

      const { pathname } = new URL(req.url, 'http://localhost');

      if (req.method === 'GET' && pathname === '/health') {
        return send(res, 200, { ok: true, minecraft: bridge.status() });
      }

      if (req.method === 'POST' && pathname === '/command') {
        const { command } = await readJson(req);
        if (typeof command !== 'string') return send(res, 400, { error: '"command" must be a string' });
        const body = await bridge.run(command);
        return send(res, 200, { ok: isSuccess(body), command, body });
      }

      if (req.method === 'POST' && pathname === '/commands') {
        const { commands } = await readJson(req);
        if (!Array.isArray(commands) || !commands.every((c) => typeof c === 'string')) {
          return send(res, 400, { error: '"commands" must be an array of strings' });
        }
        if (commands.length > MAX_BATCH) return send(res, 400, { error: `At most ${MAX_BATCH} commands per batch` });
        if (!bridge.isConnected) return send(res, 503, { error: 'Minecraft is not connected' });
        const results = await bridge.runMany(commands);
        return send(res, 200, { ok: results.every((r) => r.ok), results });
      }

      if (req.method === 'GET' && pathname === '/events') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        });
        res.write(`event: status\ndata: ${JSON.stringify(bridge.status())}\n\n`);
        sseClients.add(res);
        const keepAlive = setInterval(() => res.write(': ping\n\n'), 15_000);
        req.on('close', () => {
          clearInterval(keepAlive);
          sseClients.delete(res);
        });
        return;
      }

      send(res, 404, { error: 'Not found' });
    } catch (err) {
      const status = err.statusCode ?? (/not connected/i.test(err.message) ? 503 : 502);
      send(res, status, { ok: false, error: err.message });
    }
  });

  server.requestTimeout = 0; // big builds can take minutes
  server.closeAllStreams = () => {
    for (const res of sseClients) res.end();
    sseClients.clear();
  };
  return server;
}

function authorized(req, token) {
  if (!token) return true;
  const header = req.headers.authorization ?? '';
  const given = Buffer.from(header.replace(/^Bearer\s+/i, ''));
  const expected = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

function send(res, status, payload) {
  if (res.headersSent) return;
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Body too large'), { statusCode: 413 }));
        req.destroy();
      } else chunks.push(c);
    });
    req.on('end', () => {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString()) : {});
      } catch {
        reject(Object.assign(new Error('Invalid JSON'), { statusCode: 400 }));
      }
    });
    req.on('error', reject);
  });
}
