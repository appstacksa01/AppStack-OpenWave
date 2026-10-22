// SPDX-License-Identifier: GPL-3.0-only
export const SEQUENCE_LIMITS = Object.freeze({
  maxSteps: 100,
  maxDurationMicroseconds: 300_000_000,
  maxWavBytes: 64 * 1024 * 1024,
  maxJsonBytes: 1024 * 1024,
});

export interface RenderStep {
  readonly frequencyHz: number;
  readonly amplitude: number;
  readonly frameCount: number;
}

export interface RenderPlan {
  readonly sampleRateHz: 44100 | 48000;
  readonly channels: 1 | 2;
  readonly totalFrames: number;
  readonly wavBytes: number;
  readonly steps: readonly RenderStep[];
}

export class SequenceValidationError extends Error {
  readonly code = 'INVALID_SEQUENCE';
  constructor(
    readonly field: string,
    reason: string,
  ) {
    super(`${field}: ${reason}`);
    this.name = 'SequenceValidationError';
  }
}

function record(
  value: unknown,
  allowed: readonly string[],
  field: string,
): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new SequenceValidationError(field, 'must be an object');
  }
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) {
      throw new SequenceValidationError(`${field}.${key}`, 'unknown field');
    }
  }
  return Object.fromEntries(Object.entries(value));
}

function finiteNumber(value: unknown, field: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new SequenceValidationError(field, 'must be a finite number');
  }
  return value;
}

/** Separate size guard also protects callers if later scope limits change. */
export function wavByteLength(totalFrames: number, channels: 1 | 2): number {
  if (!Number.isSafeInteger(totalFrames) || totalFrames <= 0) {
    throw new SequenceValidationError(
      'frames',
      'must be a positive safe integer',
    );
  }
  const bytes = 44 + totalFrames * channels * 2;
  if (!Number.isSafeInteger(bytes) || bytes > SEQUENCE_LIMITS.maxWavBytes) {
    throw new SequenceValidationError('frames', 'WAV exceeds 64 MiB');
  }
  return bytes;
}

/** Validate untrusted input and freeze a detached numerical snapshot. */
export function planSequence(input: unknown): RenderPlan {
  const root = record(
    input,
    ['schema_version', 'sample_rate_hz', 'channels', 'steps'],
    'sequence',
  );
  if (root.schema_version !== 1) {
    throw new SequenceValidationError('schema_version', 'must be 1');
  }
  const sampleRateHz = root.sample_rate_hz;
  if (sampleRateHz !== 44100 && sampleRateHz !== 48000) {
    throw new SequenceValidationError(
      'sample_rate_hz',
      'must be 44100 or 48000',
    );
  }
  const channels = root.channels;
  if (channels !== 1 && channels !== 2) {
    throw new SequenceValidationError('channels', 'must be 1 or 2');
  }
  if (
    !Array.isArray(root.steps) ||
    root.steps.length === 0 ||
    root.steps.length > SEQUENCE_LIMITS.maxSteps
  ) {
    throw new SequenceValidationError('steps', 'must contain 1–100 steps');
  }

  let cumulativeMicroseconds = 0;
  let previousBoundary = 0;
  const steps: RenderStep[] = [];
  for (const [index, item] of root.steps.entries()) {
    const path = `steps[${index}]`;
    const step = record(
      item,
      ['frequency_hz', 'duration_seconds', 'waveform', 'amplitude', 'source'],
      path,
    );
    if (step.waveform !== 'sine') {
      throw new SequenceValidationError(`${path}.waveform`, 'must be sine');
    }
    const frequencyHz = finiteNumber(step.frequency_hz, `${path}.frequency_hz`);
    if (frequencyHz < 20 || frequencyHz > 10000) {
      throw new SequenceValidationError(
        `${path}.frequency_hz`,
        'must be within 20–10000 Hz',
      );
    }
    const amplitude = finiteNumber(step.amplitude, `${path}.amplitude`);
    if (amplitude <= 0 || amplitude > 0.8) {
      throw new SequenceValidationError(
        `${path}.amplitude`,
        'must be >0 and <=0.8',
      );
    }
    const durationSeconds = finiteNumber(
      step.duration_seconds,
      `${path}.duration_seconds`,
    );
    if (
      durationSeconds < 0.1 ||
      durationSeconds > 300 ||
      !/^\d+(?:\.\d{1,6})?$/.test(String(durationSeconds))
    ) {
      throw new SequenceValidationError(
        `${path}.duration_seconds`,
        'must be 0.1–300 seconds with at most six decimal places',
      );
    }
    if (Object.hasOwn(step, 'source')) {
      if (typeof step.source !== 'string') {
        throw new SequenceValidationError(`${path}.source`, 'must be text');
      }
      // Bound the temporary code-point array even for direct non-JSON callers.
      if (step.source.length > 1000 || [...step.source].length > 500) {
        throw new SequenceValidationError(
          `${path}.source`,
          'must be at most 500 Unicode code points',
        );
      }
    }
    cumulativeMicroseconds += Math.round(durationSeconds * 1_000_000);
    if (cumulativeMicroseconds > SEQUENCE_LIMITS.maxDurationMicroseconds) {
      throw new SequenceValidationError(
        'steps',
        'total duration exceeds 300 seconds',
      );
    }
    const boundary = Math.floor(
      (cumulativeMicroseconds * sampleRateHz + 500_000) / 1_000_000,
    );
    steps.push(
      Object.freeze({
        frequencyHz,
        amplitude,
        frameCount: boundary - previousBoundary,
      }),
    );
    previousBoundary = boundary;
  }
  return Object.freeze({
    sampleRateHz,
    channels,
    totalFrames: previousBoundary,
    wavBytes: wavByteLength(previousBoundary, channels),
    steps: Object.freeze(steps),
  });
}
