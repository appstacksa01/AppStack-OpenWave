// SPDX-License-Identifier: GPL-3.0-only
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

// Inspect Vite source maps, not minified symbol names. All executable sources in
// the browser artifact must come from the frontend or the contracts package.
const output = resolve('apps/frontend/dist/assets');
const maps = (await readdir(output)).filter((name) => name.endsWith('.js.map'));
if (maps.length === 0)
  throw new Error('No frontend source maps found; build first.');
for (const name of maps) {
  const map = JSON.parse(await readFile(resolve(output, name), 'utf8'));
  if (!Array.isArray(map.sources) || map.sources.length === 0) {
    throw new Error('Frontend source map has no sources.');
  }
  for (const source of map.sources) {
    if (
      typeof source !== 'string' ||
      !/^(\.\.\/)+(src\/|packages\/contracts\/)/.test(source)
    ) {
      throw new Error(
        `Unexpected executable source in browser bundle: ${String(source)}`,
      );
    }
  }
}
console.log('Frontend bundle contains only frontend/contracts sources.');
