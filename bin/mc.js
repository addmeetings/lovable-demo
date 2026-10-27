#!/usr/bin/env node
// Terminal client for the Minecraft Education bridge.
//
//   mc                      interactive shell (type commands, see chat live)
//   mc say hello            run a single command
//   mc build castle         build the Hogwarts-style castle where you stand
//   mc status               is Minecraft connected?
//   mc events               stream game events
import readline from 'node:readline';
import { loadEnv } from '../src/env.js';
import { buildCastle } from '../src/structures/castle.js';

loadEnv();
const API = (process.env.MC_API_URL ?? `http://127.0.0.1:${process.env.API_PORT ?? 3001}`).replace(/\/$/, '');
const TOKEN = process.env.MC_API_TOKEN ?? process.env.API_TOKEN ?? '';
const BATCH = 400;

const STRUCTURES = { castle: buildCastle };

async function call(method, path, body) {
  const res = await fetch(API + path, {
    method,
    headers: { 'Content-Type': 'application/json', ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }) },
    body: body && JSON.stringify(body),
  }).catch(() => {
    throw new Error(`Cannot reach the bridge at ${API}. Start it with: npm start`);
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data;
}

async function run(command) {
  const r = await call('POST', '/command', { command });
  console.log(`${r.ok ? '✔' : '✖'} /${command}${r.body?.statusMessage ? ' → ' + r.body.statusMessage : ''}`);
  return r;
}

async function playerPosition() {
  const r = await call('POST', '/command', { command: 'querytarget @s' });
  try {
    const [target] = JSON.parse(r.body.details);
    const { x, y, z } = target.position;
    // querytarget reports the eye/feet position as floats; feet are ~1.62 below the eye in some versions.
    return { x: Math.floor(x), y: Math.floor(y - (y % 1 > 0.5 ? 1.62 : 0)), z: Math.floor(z) };
  } catch {
    throw new Error('Could not read your position. Pass it explicitly: mc build castle --at <x> <y> <z>');
  }
}

async function build(name, args) {
  const make = STRUCTURES[name];
  if (!make) throw new Error(`Unknown structure "${name}". Available: ${Object.keys(STRUCTURES).join(', ')}`);

  const at = args.indexOf('--at');
  const pos = at >= 0 ? { x: +args[at + 1], y: +args[at + 2], z: +args[at + 3] } : await playerPosition();
  if (![pos.x, pos.y, pos.z].every(Number.isFinite)) throw new Error('Usage: mc build castle --at <x> <y> <z>');

  // The structure sits north of you; the lake's water surface is at your feet level - 1.
  const origin = { x: pos.x, y: pos.y - 1, z: pos.z - 70 };
  if (origin.y + 80 > 319 || origin.y < -63) throw new Error('Stand somewhere between y=-62 and y=239 to build.');

  const builder = make(origin);
  console.log(`Building ${name} at ${pos.x} ${pos.y} ${pos.z}: ${builder.size} commands in ${builder.phases.length} phases`);
  let failed = 0;
  for (const phase of builder.phases) {
    for (let i = 0; i < phase.commands.length; i += BATCH) {
      const slice = phase.commands.slice(i, i + BATCH);
      const { results } = await call('POST', '/commands', { commands: slice });
      const bad = results.filter((r) => !r.ok);
      failed += bad.length;
      if (bad.length && failed <= bad.length) console.log(`  first failure: /${bad[0].command} → ${bad[0].body?.statusMessage ?? bad[0].error}`);
      const done = Math.min(i + BATCH, phase.commands.length);
      process.stdout.write(`\r  ${phase.name.padEnd(12)} ${done}/${phase.commands.length}`);
    }
    process.stdout.write('\n');
  }
  console.log(failed ? `Done with ${failed} failed commands (often: area outside loaded chunks — raise render distance and retry).` : 'Done!');
}

async function streamEvents(onEvent) {
  const res = await fetch(API + '/events', { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} });
  if (!res.ok) throw new Error(`Event stream failed: HTTP ${res.status}`);
  const decoder = new TextDecoder();
  let buf = '';
  for await (const chunk of res.body) {
    buf += decoder.decode(chunk, { stream: true });
    let idx;
    while ((idx = buf.indexOf('\n\n')) >= 0) {
      const frame = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      const type = frame.match(/^event: (.*)$/m)?.[1];
      const data = frame.match(/^data: (.*)$/m)?.[1];
      if (type && data) onEvent(type, JSON.parse(data));
    }
  }
}

function formatEvent(type, data) {
  if (type === 'status') return data.connected ? '● Minecraft connected' : `○ Minecraft not connected — in game type: /connect localhost:${data.wsPort}`;
  const { name, body } = data;
  if (name === 'PlayerMessage') return `[chat] <${body.sender}> ${body.message}`;
  if (name === 'BlockPlaced' || name === 'BlockBroken') return `[${name}] ${body.block?.id ?? ''}`;
  if (name === 'PlayerTravelled') return null; // too chatty for the shell
  return `[${name}] ${JSON.stringify(body)}`;
}

async function shell() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: 'minecraft> ' });
  const print = (line) => {
    if (!line) return;
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
    console.log(line);
    rl.prompt(true);
  };
  streamEvents((t, d) => print(formatEvent(t, d))).catch((e) => print(`(events unavailable: ${e.message})`));

  console.log('Type any Minecraft command (no slash needed). Extras: build castle | status | help | exit');
  rl.prompt();
  for await (const line of rl) {
    const input = line.trim();
    try {
      if (!input) {
      } else if (input === 'exit' || input === 'quit') break;
      else if (input === 'help') console.log('Examples: say hi | time set day | weather clear | give @s diamond 5 | build castle');
      else if (input === 'status') console.log((await call('GET', '/health')).minecraft);
      else if (input.startsWith('build ')) {
        const [, name, ...rest] = input.split(/\s+/);
        await build(name, rest);
      } else await run(input);
    } catch (err) {
      console.log(`✖ ${err.message}`);
    }
    rl.prompt();
  }
  rl.close();
  process.exit(0);
}

const [cmd, ...rest] = process.argv.slice(2);
try {
  if (!cmd) await shell();
  else if (cmd === 'status') console.log((await call('GET', '/health')).minecraft);
  else if (cmd === 'events') await streamEvents((t, d) => { const s = formatEvent(t, d); if (s) console.log(s); });
  else if (cmd === 'build') await build(rest[0], rest.slice(1));
  else {
    const r = await run([cmd, ...rest].join(' '));
    process.exitCode = r.ok ? 0 : 1;
  }
} catch (err) {
  console.error(`✖ ${err.message}`);
  process.exitCode = 1;
}
