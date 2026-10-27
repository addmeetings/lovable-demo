import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';
import { MinecraftBridge } from '../src/minecraft-bridge.js';
import { createApi } from '../src/api.js';
import { buildCastle } from '../src/structures/castle.js';
import { MAX_FILL_VOLUME } from '../src/builder.js';

const exec = promisify(execFile);
const CLI = fileURLToPath(new URL('../bin/mc.js', import.meta.url));

/** Behaves like Minecraft Education after `/connect`: answers every commandRequest. */
function fakeMinecraft(port) {
  const ws = new WebSocket(`ws://127.0.0.1:${port}`);
  const received = [];
  ws.on('message', (raw) => {
    const { header, body } = JSON.parse(raw);
    received.push({ purpose: header.messagePurpose, body });
    if (header.messagePurpose !== 'commandRequest') return;
    const reply = body.commandLine.startsWith('querytarget')
      ? { statusCode: 0, details: JSON.stringify([{ position: { x: 10.5, y: 65.62, z: -3.2 } }]) }
      : body.commandLine.startsWith('bogus')
        ? { statusCode: -2147483648, statusMessage: 'Unknown command: bogus' }
        : { statusCode: 0, statusMessage: 'ok' };
    ws.send(JSON.stringify({ header: { requestId: header.requestId, messagePurpose: 'commandResponse' }, body: reply }));
  });
  return new Promise((resolve) => ws.on('open', () => resolve({ ws, received })));
}

async function setup(t) {
  const bridge = new MinecraftBridge({ port: 0, logger: {} });
  await bridge.start();
  const api = createApi(bridge);
  await new Promise((r) => api.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${api.address().port}`;
  t.after(async () => {
    api.closeAllStreams();
    api.close();
    await bridge.stop();
  });
  return { bridge, url };
}

const waitFor = (emitter, event) => new Promise((r) => emitter.once(event, r));

test('reports not connected until Minecraft runs /connect', async (t) => {
  const { url } = await setup(t);
  const health = await (await fetch(`${url}/health`)).json();
  assert.equal(health.minecraft.connected, false);
  const res = await fetch(`${url}/command`, { method: 'POST', body: JSON.stringify({ command: 'say hi' }) });
  assert.equal(res.status, 503);
});

test('relays commands, responses and game events', async (t) => {
  const { bridge, url } = await setup(t);
  const connected = waitFor(bridge, 'connected');
  const mc = await fakeMinecraft(bridge.port);
  t.after(() => mc.ws.close());
  await connected;

  assert.ok(mc.received.some((m) => m.purpose === 'subscribe' && m.body.eventName === 'PlayerMessage'));

  const ok = await (await fetch(`${url}/command`, { method: 'POST', body: JSON.stringify({ command: '/say hi' }) })).json();
  assert.equal(ok.ok, true);
  assert.equal(mc.received.at(-1).body.commandLine, 'say hi');

  const bad = await (await fetch(`${url}/command`, { method: 'POST', body: JSON.stringify({ command: 'bogus' }) })).json();
  assert.equal(bad.ok, false);

  const event = waitFor(bridge, 'event');
  mc.ws.send(JSON.stringify({ header: { messagePurpose: 'event', eventName: 'PlayerMessage' }, body: { sender: 'Steve', message: 'hello', type: 'chat' } }));
  assert.deepEqual(await event, { name: 'PlayerMessage', body: { sender: 'Steve', message: 'hello', type: 'chat' } });
});

test('CLI builds the castle end to end at the player position', async (t) => {
  const { bridge, url } = await setup(t);
  const connected = waitFor(bridge, 'connected');
  const mc = await fakeMinecraft(bridge.port);
  t.after(() => mc.ws.close());
  await connected;

  const { stdout } = await exec('node', [CLI, 'build', 'castle'], { env: { ...process.env, MC_API_URL: url } });
  assert.match(stdout, /Done!/);
  const commands = mc.received.filter((m) => m.purpose === 'commandRequest').map((m) => m.body.commandLine);
  assert.equal(commands.length, buildCastle({ x: 0, y: 0, z: 0 }).size + 1); // + querytarget
  // Player stood at feet y=64, so the lake surface is y=63 and the finish teleport is relative to that.
  assert.ok(commands.includes('tp @s 68 93 4 facing 10 85 -98'));
});

test('castle never exceeds the /fill volume limit', () => {
  for (const { commands } of buildCastle({ x: 0, y: 64, z: 0 }).phases) {
    for (const c of commands) {
      const m = c.match(/^fill (\S+) (\S+) (\S+) (\S+) (\S+) (\S+)/);
      if (!m) continue;
      const [x1, y1, z1, x2, y2, z2] = m.slice(1).map(Number);
      assert.ok((x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1) <= MAX_FILL_VOLUME, c);
    }
  }
});
