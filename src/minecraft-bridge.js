import { EventEmitter } from 'node:events';
import { randomUUID } from 'node:crypto';
import { WebSocketServer } from 'ws';

// Minecraft (Bedrock / Education) drops commands once roughly 100 are in flight,
// so we keep a safety margin and queue the rest.
const MAX_IN_FLIGHT = 80;
const COMMAND_TIMEOUT_MS = 10_000;

// Events worth streaming to the terminal by default.
export const DEFAULT_EVENTS = ['PlayerMessage', 'PlayerTravelled', 'BlockPlaced', 'BlockBroken'];

/**
 * Accepts the WebSocket connection Minecraft opens when a player types
 * `/connect <host>:<port>` and exposes it as a promise-based command API.
 *
 * Emits: 'connected', 'disconnected', 'event' ({ name, body }).
 */
export class MinecraftBridge extends EventEmitter {
  constructor({ port, host = '127.0.0.1', events = DEFAULT_EVENTS, logger = console } = {}) {
    super();
    this.port = port;
    this.host = host;
    this.events = events;
    this.logger = logger;
    this.socket = null;
    this.pending = new Map(); // requestId -> { resolve, reject, timer, commandLine }
    this.queue = [];          // commands waiting for an in-flight slot
    this.connectedAt = null;
  }

  start() {
    return new Promise((resolve, reject) => {
      this.wss = new WebSocketServer({ port: this.port, host: this.host });
      this.wss.once('listening', () => {
        this.port = this.wss.address().port;
        resolve(this);
      });
      this.wss.once('error', reject);
      this.wss.on('connection', (socket, req) => this.#attach(socket, req));
    });
  }

  async stop() {
    this.#failAll(new Error('Bridge stopped'));
    this.socket?.terminate();
    await new Promise((resolve) => (this.wss ? this.wss.close(() => resolve()) : resolve()));
  }

  get isConnected() {
    return this.socket?.readyState === 1;
  }

  status() {
    return {
      connected: this.isConnected,
      connectedAt: this.connectedAt,
      inFlight: this.pending.size,
      queued: this.queue.length,
      wsPort: this.port,
    };
  }

  /** Run a slash command (with or without the leading "/"). Resolves with Minecraft's response body. */
  run(commandLine) {
    const cmd = String(commandLine ?? '').trim().replace(/^\//, '');
    if (!cmd) return Promise.reject(new Error('Empty command'));
    if (!this.isConnected) {
      return Promise.reject(new Error('Minecraft is not connected. In game, run: /connect localhost:' + this.port));
    }
    return new Promise((resolve, reject) => {
      this.queue.push({ commandLine: cmd, resolve, reject });
      this.#drain();
    });
  }

  /** Run several commands in order, stopping at nothing; returns one result per command. */
  async runMany(commandLines) {
    return Promise.all(
      commandLines.map((c) =>
        this.run(c).then(
          (body) => ({ command: c, ok: isSuccess(body), body }),
          (err) => ({ command: c, ok: false, error: err.message }),
        ),
      ),
    );
  }

  #attach(socket, req) {
    if (this.socket) {
      this.logger.info?.('[bridge] new Minecraft connection replaces the previous one');
      this.#failAll(new Error('Minecraft reconnected'));
      this.socket.terminate();
    }
    this.socket = socket;
    this.connectedAt = new Date().toISOString();
    this.logger.info?.(`[bridge] Minecraft connected from ${req.socket.remoteAddress}`);

    for (const eventName of this.events) this.#send('subscribe', { eventName });
    this.emit('connected', this.status());

    socket.on('message', (data) => this.#onMessage(data));
    socket.on('close', () => {
      if (this.socket !== socket) return;
      this.socket = null;
      this.connectedAt = null;
      this.#failAll(new Error('Minecraft disconnected'));
      this.logger.info?.('[bridge] Minecraft disconnected');
      this.emit('disconnected');
    });
    socket.on('error', (err) => this.logger.error?.('[bridge] socket error:', err.message));
  }

  #onMessage(data) {
    let msg;
    try {
      msg = JSON.parse(data.toString());
    } catch {
      return;
    }
    const { header = {}, body = {} } = msg;

    if (header.messagePurpose === 'event') {
      this.emit('event', { name: header.eventName ?? body.eventName, body });
      return;
    }

    const entry = this.pending.get(header.requestId);
    if (!entry) return;
    clearTimeout(entry.timer);
    this.pending.delete(header.requestId);
    if (header.messagePurpose === 'error') entry.reject(new Error(body.statusMessage ?? 'Minecraft error'));
    else entry.resolve(body);
    this.#drain();
  }

  #drain() {
    while (this.queue.length && this.pending.size < MAX_IN_FLIGHT && this.isConnected) {
      const { commandLine, resolve, reject } = this.queue.shift();
      const requestId = this.#send('commandRequest', {
        version: 1,
        commandLine,
        origin: { type: 'player' },
      });
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error(`Timed out waiting for Minecraft: /${commandLine}`));
        this.#drain();
      }, COMMAND_TIMEOUT_MS);
      this.pending.set(requestId, { resolve, reject, timer, commandLine });
    }
  }

  #send(messagePurpose, body) {
    const requestId = randomUUID();
    this.socket.send(
      JSON.stringify({
        header: { version: 1, requestId, messagePurpose, messageType: 'commandRequest' },
        body,
      }),
    );
    return requestId;
  }

  #failAll(err) {
    for (const { reject, timer } of this.pending.values()) {
      clearTimeout(timer);
      reject(err);
    }
    this.pending.clear();
    for (const { reject } of this.queue.splice(0)) reject(err);
  }
}

/** Minecraft reports failures with a negative statusCode. */
export function isSuccess(body) {
  return !(typeof body?.statusCode === 'number' && body.statusCode < 0);
}
