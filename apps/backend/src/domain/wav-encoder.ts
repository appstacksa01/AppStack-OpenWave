// SPDX-License-Identifier: GPL-3.0-only
import type { RenderPlan } from './sequence.js';

export interface EncodingOptions {
  readonly signal?: AbortSignal;
  readonly chunkFrames?: number;
}

export class RenderCancelledError extends Error {
  readonly code = 'RENDER_CANCELLED';
  constructor() {
    super('WAV generation was cancelled.');
    this.name = 'RenderCancelledError';
  }
}

function checkCancellation(signal: AbortSignal | undefined): void {
  if (signal?.aborted) throw new RenderCancelledError();
}

export function quantizePcm16(sample: number): number {
  const rounded =
    Math.sign(sample) * Math.floor(Math.abs(32767 * sample) + 0.5);
  return rounded === 0 ? 0 : rounded;
}

function header(plan: RenderPlan): Uint8Array {
  const bytes = new Uint8Array(44);
  const view = new DataView(bytes.buffer);
  view.setUint32(0, 0x46464952, true); // RIFF
  view.setUint32(4, plan.wavBytes - 8, true);
  view.setUint32(8, 0x45564157, true); // WAVE
  view.setUint32(12, 0x20746d66, true); // fmt
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, plan.channels, true);
  view.setUint32(24, plan.sampleRateHz, true);
  view.setUint32(28, plan.sampleRateHz * plan.channels * 2, true);
  view.setUint16(32, plan.channels * 2, true);
  view.setUint16(34, 16, true);
  view.setUint32(36, 0x61746164, true); // data
  view.setUint32(40, plan.wavBytes - 44, true);
  return bytes;
}

/** Backend-only, pull-based PCM chunks. Call only with a validated frozen plan. */
export function* encodeWav(
  plan: RenderPlan,
  options: EncodingOptions = {},
): Generator<Uint8Array> {
  const chunkFrames = options.chunkFrames ?? 4096;
  if (
    !Number.isInteger(chunkFrames) ||
    chunkFrames < 1 ||
    chunkFrames > 16384
  ) {
    throw new RangeError('chunkFrames must be an integer within 1–16384.');
  }
  checkCancellation(options.signal);
  yield header(plan);
  const rampFrames = Math.floor(0.01 * plan.sampleRateHz + 0.5);
  const ramp = (index: number) =>
    0.5 * (1 - Math.cos((Math.PI * Math.min(index, rampFrames)) / rampFrames));
  for (const step of plan.steps) {
    for (let start = 0; start < step.frameCount; start += chunkFrames) {
      checkCancellation(options.signal);
      const length = Math.min(chunkFrames, step.frameCount - start);
      const bytes = new Uint8Array(length * plan.channels * 2);
      const view = new DataView(bytes.buffer);
      for (let offset = 0; offset < length; offset++) {
        const frame = start + offset;
        const envelope = Math.min(
          ramp(frame),
          ramp(step.frameCount - 1 - frame),
        );
        const sample = quantizePcm16(
          step.amplitude *
            envelope *
            Math.sin(
              (2 * Math.PI * step.frequencyHz * frame) / plan.sampleRateHz,
            ),
        );
        for (let channel = 0; channel < plan.channels; channel++) {
          view.setInt16((offset * plan.channels + channel) * 2, sample, true);
        }
      }
      yield bytes;
    }
  }
  checkCancellation(options.signal);
}
