import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

/** Minimal .env loader (project root) so there is no extra dependency. Real env vars win. */
export function loadEnv(path = fileURLToPath(new URL('../.env', import.meta.url))) {
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch {
    return;
  }
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
