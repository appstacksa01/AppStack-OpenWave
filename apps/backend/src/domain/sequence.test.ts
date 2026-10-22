// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from 'vitest';
import {
  planSequence,
  SEQUENCE_LIMITS,
  SequenceValidationError,
  wavByteLength,
} from './sequence.js';

function fixture() {
  return {
    schema_version: 1,
    sample_rate_hz: 48000,
    channels: 1,
    steps: [
      {
        frequency_hz: 500,
        duration_seconds: 1,
        waveform: 'sine',
        amplitude: 0.25,
      },
    ],
  };
}

function firstStep(input: ReturnType<typeof fixture>) {
  const step = input.steps[0];
  if (!step) throw new Error('Fixture has no first step');
  return step;
}

describe('sequence planning', () => {
  it('detaches and freezes the plan before input can change', () => {
    const input = fixture();
    const plan = planSequence(input);
    firstStep(input).frequency_hz = 1000;
    expect(plan.steps[0]).toEqual({
      frequencyHz: 500,
      amplitude: 0.25,
      frameCount: 48000,
    });
    expect(plan.totalFrames).toBe(48000);
    expect(plan.wavBytes).toBe(96044);
    expect(Object.isFrozen(plan)).toBe(true);
    expect(Object.isFrozen(plan.steps)).toBe(true);
    expect(Object.isFrozen(plan.steps[0])).toBe(true);
  });

  it.each([44100, 48000])('rounds cumulative microseconds at %i Hz', (rate) => {
    const input = fixture();
    input.sample_rate_hz = rate;
    input.steps = [0.10001, 0.10001, 0.10001].map((duration_seconds) => ({
      ...firstStep(input),
      duration_seconds,
    }));
    const plan = planSequence(input);
    expect(plan.steps.map((step) => step.frameCount)).toEqual(
      rate === 44100 ? [4410, 4411, 4410] : [4800, 4801, 4800],
    );
  });

  it.each([
    [0.105, 4631],
    [0.100625, 4438],
    [0.1005, 4432],
    [0.100001, 4410],
  ])(
    'handles duration %s without binary-float precision rejection',
    (seconds, frames) => {
      const input = fixture();
      input.sample_rate_hz = 44100;
      firstStep(input).duration_seconds = seconds;
      expect(planSequence(input).totalFrames).toBe(frames);
    },
  );

  it('accepts 100 steps and exactly 300 seconds in duplicate stereo', () => {
    const input = fixture();
    input.channels = 2;
    input.steps = Array.from({ length: 100 }, () => ({
      ...firstStep(input),
      duration_seconds: 3,
    }));
    expect(planSequence(input)).toMatchObject({
      totalFrames: 14400000,
      wavBytes: 57600044,
    });
  });

  it.each([20, 10000])('accepts the frequency boundary %i', (frequency_hz) => {
    const input = fixture();
    firstStep(input).frequency_hz = frequency_hz;
    expect(planSequence(input).steps[0]?.frequencyHz).toBe(frequency_hz);
  });

  it.each([Number.MIN_VALUE, 0.8])('accepts amplitude %s', (amplitude) => {
    const input = fixture();
    firstStep(input).amplitude = amplitude;
    expect(planSequence(input).steps[0]?.amplitude).toBe(amplitude);
  });

  it.each(['', 'x'.repeat(500), '🌊'.repeat(500)])(
    'accepts bounded Unicode provenance',
    (source) => {
      const input = fixture();
      expect(
        planSequence({ ...input, steps: [{ ...input.steps[0], source }] })
          .totalFrames,
      ).toBe(48000);
    },
  );

  const invalidRoots: unknown[] = [null, [], false, 'sequence', 1];
  it.each(invalidRoots)('rejects non-object input %j', (value) => {
    expect(() => planSequence(value)).toThrow(SequenceValidationError);
  });

  it.each([
    { schema_version: 2 },
    { schema_version: '1' },
    { schema_version: undefined },
    { sample_rate_hz: 96000 },
    { sample_rate_hz: '48000' },
    { sample_rate_hz: null },
    { channels: 0 },
    { channels: 3 },
    { channels: true },
    { channels: null },
    { steps: [] },
    { steps: null },
    { steps: 'rows' },
    { steps: new Array(101).fill(null) },
    { steps: [null] },
    { unexpected: 1 },
  ])('rejects invalid root field %j', (patch) => {
    expect(() => planSequence({ ...fixture(), ...patch })).toThrow(
      SequenceValidationError,
    );
  });

  it.each([
    { frequency_hz: 19 },
    { frequency_hz: 10001 },
    { frequency_hz: '500' },
    { frequency_hz: NaN },
    { frequency_hz: Infinity },
    { frequency_hz: -Infinity },
    { frequency_hz: null },
    { frequency_hz: true },
    { frequency_hz: undefined },
    { duration_seconds: 0 },
    { duration_seconds: 0.099999 },
    { duration_seconds: 300.1 },
    { duration_seconds: 0.1000001 },
    { duration_seconds: 1.0000000000000002 },
    { duration_seconds: '1' },
    { duration_seconds: NaN },
    { duration_seconds: Infinity },
    { amplitude: 0 },
    { amplitude: -1 },
    { amplitude: 0.800001 },
    { amplitude: '0.25' },
    { amplitude: NaN },
    { amplitude: Infinity },
    { waveform: 'square' },
    { waveform: undefined },
    { source: 5 },
    { source: undefined },
    { source: null },
    { source: 'x'.repeat(501) },
    { source: '🌊'.repeat(501) },
    { extra: 'field' },
  ])('rejects invalid step %j', (patch) => {
    const input = fixture();
    expect(() =>
      planSequence({ ...input, steps: [{ ...input.steps[0], ...patch }] }),
    ).toThrow(SequenceValidationError);
  });

  it('rejects excess summed duration and identifies the invalid field', () => {
    const input = fixture();
    input.steps = [300, 0.1].map((duration_seconds) => ({
      ...firstStep(input),
      duration_seconds,
    }));
    expect(() => planSequence(input)).toThrow('total duration exceeds');
    try {
      planSequence({ ...fixture(), channels: 7 });
    } catch (error) {
      expect(error).toMatchObject({
        field: 'channels',
        code: 'INVALID_SEQUENCE',
        name: 'SequenceValidationError',
      });
    }
  });

  it.each([0, -1, 1.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1])(
    'rejects invalid frame count %s',
    (frames) => {
      expect(() => wavByteLength(frames, 1)).toThrow('positive safe integer');
    },
  );

  it('checks the independent file cap before allocation', () => {
    const largest = Math.floor((SEQUENCE_LIMITS.maxWavBytes - 44) / 4);
    expect(wavByteLength(largest, 2)).toBeLessThanOrEqual(
      SEQUENCE_LIMITS.maxWavBytes,
    );
    expect(() => wavByteLength(largest + 1, 2)).toThrow('64 MiB');
    expect(() => wavByteLength(Number.MAX_SAFE_INTEGER, 2)).toThrow('64 MiB');
  });
});
