// SPDX-License-Identifier: GPL-3.0-only
// Runs the backend renderer in this Node process; the independent checker is
// a separate Python process with no imports of OpenWave implementation code.
import {
  mkdir,
  mkdtemp,
  open,
  readFile,
  rename,
  writeFile,
} from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { renderExport } from '../dist/backend/apps/backend/src/application/render-export.js';

const root = resolve('.openwave/verification');
await mkdir(root, { recursive: true });
const directory = await mkdtemp(resolve(root, 'run-'));
const sourceHashes = {};
for (const file of [
  'apps/backend/src/domain/sequence.ts',
  'apps/backend/src/domain/wav-encoder.ts',
  'apps/backend/src/application/render-export.ts',
  'tooling/verify-signals.mjs',
  'tooling/verify-wav.py',
]) {
  sourceHashes[file] = createHash('sha256')
    .update(await readFile(file))
    .digest('hex');
}
const cases = [];
const step = (frequency_hz, duration_seconds, amplitude = 0.25) => ({
  frequency_hz,
  duration_seconds,
  amplitude,
  waveform: 'sine',
});
const add = (
  name,
  sample_rate_hz,
  channels,
  steps,
  shape = true,
  frequency = false,
) =>
  cases.push({
    name,
    input: { schema_version: 1, sample_rate_hz, channels, steps },
    shape,
    frequency,
  });
for (const rate of [44100, 48000]) {
  for (const channels of [1, 2]) {
    for (const hz of [20, 125.5, 500, 1000, 10000]) {
      add(
        `tone-${rate}-${channels}-${hz}`,
        rate,
        channels,
        [step(hz, 10)],
        true,
        true,
      );
    }
    add(`sequence-${rate}-${channels}`, rate, channels, [
      step(125.5, 1.25),
      step(500, 2.5),
      step(1000, 1.75),
    ]);
    add(`fractional-${rate}-${channels}`, rate, channels, [
      step(500, 0.10001),
      step(500, 0.10001),
      step(500, 0.10001),
    ]);
  }
  add(`half-frame-${rate}`, rate, 1, [
    step(1000, 0.105),
    step(500, 0.100625),
    step(125.5, 0.100001),
  ]);
}
add('maximum-single', 48000, 2, [step(500, 300)], false);
add(
  'maximum-100-steps',
  48000,
  2,
  Array.from({ length: 100 }, () => step(500, 3)),
  false,
);
add('amplitude-maximum', 48000, 1, [step(1000, 0.1, 0.8)]);
add('amplitude-silence', 44100, 2, [step(20, 0.1, Number.MIN_VALUE)]);
add('repeatability-a', 48000, 2, [step(125.5, 1.25), step(500, 0.1)]);
add('repeatability-b', 48000, 2, [step(125.5, 1.25), step(500, 0.1)]);

for (const item of cases) {
  const path = resolve(directory, `${item.name}.wav`);
  const temporary = `${path}.part`;
  const handle = await open(temporary, 'wx');
  const start = performance.now();
  try {
    await renderExport(item.input, {
      write: async (chunk) => {
        await handle.writeFile(chunk);
      },
      complete: async () => {
        await handle.close();
        await rename(temporary, path);
      },
      abort: async () => {
        await handle.close();
      },
    });
  } catch (error) {
    throw new Error(
      `Fixture ${item.name} failed; incomplete bytes remain in ${temporary} for diagnosis.`,
      { cause: error },
    );
  }
  item.renderMilliseconds = performance.now() - start;
}
await writeFile(
  resolve(directory, 'manifest.json'),
  JSON.stringify(
    {
      node: process.version,
      sourceHashes,
      workingTreeBaseCommit: execFileSync('git', ['rev-parse', 'HEAD'], {
        encoding: 'utf8',
      }).trim(),
      workingTreeDirty:
        execFileSync('git', ['status', '--porcelain'], {
          encoding: 'utf8',
        }).trim().length > 0,
      platform: process.platform,
      cases,
    },
    null,
    2,
  ),
);
console.log(`Verification artifacts: ${directory}`);
const python =
  process.env.OPENWAVE_PYTHON ??
  (process.platform === 'win32' ? 'python' : 'python3');
const result = spawnSync(python, ['tooling/verify-wav.py', directory], {
  stdio: 'inherit',
});
if (result.error) throw result.error;
if (result.status !== 0)
  throw new Error(`Independent checker failed (exit ${result.status}).`);
