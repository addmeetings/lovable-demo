#!/usr/bin/env node
import { MinecraftBridge } from './minecraft-bridge.js';
import { createApi } from './api.js';
import { loadEnv } from './env.js';

loadEnv();

const MC_WS_PORT = Number(process.env.MC_WS_PORT ?? 3000);
const API_PORT = Number(process.env.API_PORT ?? 3001);
const HOST = process.env.HOST ?? '127.0.0.1';
const API_TOKEN = process.env.API_TOKEN || undefined;

const bridge = new MinecraftBridge({ port: MC_WS_PORT, host: HOST });
await bridge.start();

const api = createApi(bridge, { token: API_TOKEN });
api.listen(API_PORT, HOST);

bridge.on('event', ({ name, body }) => {
  if (name === 'PlayerMessage' && body.type === 'chat') console.log(`[chat] <${body.sender}> ${body.message}`);
});

console.log(`
Minecraft Education bridge is running
  Minecraft WebSocket : ws://${HOST}:${MC_WS_PORT}
  Terminal API        : http://${HOST}:${API_PORT}${API_TOKEN ? '  (token required)' : ''}

In Minecraft Education, open chat and type:
  /connect ${HOST === '0.0.0.0' ? '<this-mac-ip>' : 'localhost'}:${MC_WS_PORT}

Then in another Mac terminal:
  npm run cli
`);

const shutdown = async () => {
  api.closeAllStreams();
  api.close();
  await bridge.stop();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
