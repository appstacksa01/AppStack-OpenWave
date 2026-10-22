// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from 'vitest';
import { planSequence } from './sequence.js';
import {
  encodeWav,
  quantizePcm16,
  RenderCancelledError,
} from './wav-encoder.js';

const fixture = {
  schema_version: 1,
  sample_rate_hz: 48000,
  channels: 1,
  steps: [
    {
      frequency_hz: 1000,
      duration_seconds: 0.1,
      amplitude: 0.25,
      waveform: 'sine',
    },
  ],
};

function samples(channels = 1) {
  return Buffer.concat([...encodeWav(planSequence({ ...fixture, channels }))]);
}

describe('WAV encoding', () => {
  it.each([44100, 48000])('writes the complete PCM header at %i Hz', (rate) => {
    const bytes = Buffer.concat([
      ...encodeWav(
        planSequence({ ...fixture, sample_rate_hz: rate, channels: 2 }),
      ),
    ]);
    expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
    expect(bytes.subarray(8, 16).toString()).toBe('WAVEfmt ');
    expect(bytes.subarray(36, 40).toString()).toBe('data');
    expect(bytes.readUInt32LE(4)).toBe(bytes.length - 8);
    expect(bytes.readUInt32LE(16)).toBe(16);
    expect(bytes.readUInt16LE(20)).toBe(1);
    expect(bytes.readUInt16LE(22)).toBe(2);
    expect(bytes.readUInt32LE(24)).toBe(rate);
    expect(bytes.readUInt32LE(28)).toBe(rate * 4);
    expect(bytes.readUInt16LE(32)).toBe(4);
    expect(bytes.readUInt16LE(34)).toBe(16);
    expect(bytes.readUInt32LE(40)).toBe(bytes.length - 44);
  });
  it('matches analytic quarter-cycle samples, fades and zero endpoints', () => {
    const bytes = samples();
    const at = (n: number) => bytes.readInt16LE(44 + n * 2);
    expect(at(0)).toBe(0);
    expect(at(4799)).toBe(0);
    expect(at(492)).toBe(8192);
    expect(at(516)).toBe(-8192);
    expect(at(252)).toBe(
      Math.round(32767 * 0.25 * 0.5 * (1 - Math.cos((Math.PI * 252) / 480))),
    );
    expect(Math.abs(at(4770))).toBeLessThan(200);
  });
  it('writes exactly identical stereo channels', () => {
    const bytes = samples(2);
    for (let offset = 44; offset < bytes.length; offset += 4) {
      expect(bytes.readInt16LE(offset)).toBe(bytes.readInt16LE(offset + 2));
    }
  });
  it('is byte-identical regardless of chunk boundaries', () => {
    const plan = planSequence(fixture);
    const one = Buffer.concat([...encodeWav(plan, { chunkFrames: 1 })]);
    expect(Buffer.concat([...encodeWav(plan, { chunkFrames: 16384 })])).toEqual(
      one,
    );
    expect(Buffer.concat([...encodeWav(plan)])).toEqual(one);
  });
  it.each([0, -1, 1.5, 16385, NaN, Infinity])(
    'rejects chunk size %s',
    (chunkFrames) => {
      expect(() => [
        ...encodeWav(planSequence(fixture), { chunkFrames }),
      ]).toThrow(RangeError);
    },
  );
  it('cancels before any bytes and exposes a stable error', () => {
    const controller = new AbortController();
    controller.abort();
    const iterator = encodeWav(planSequence(fixture), {
      signal: controller.signal,
    });
    expect(() => iterator.next()).toThrow(RenderCancelledError);
    expect(new RenderCancelledError()).toMatchObject({
      code: 'RENDER_CANCELLED',
      name: 'RenderCancelledError',
    });
  });
  it('checks cancellation between header and data chunks', () => {
    const controller = new AbortController();
    const iterator = encodeWav(planSequence(fixture), {
      signal: controller.signal,
    });
    expect(iterator.next().value?.byteLength).toBe(44);
    controller.abort();
    expect(() => iterator.next()).toThrow(RenderCancelledError);
  });
  it('checks cancellation after the final chunk before completion', () => {
    const controller = new AbortController();
    const iterator = encodeWav(planSequence(fixture), {
      signal: controller.signal,
      chunkFrames: 16384,
    });
    iterator.next();
    iterator.next();
    controller.abort();
    expect(() => iterator.next()).toThrow(RenderCancelledError);
  });
  it.each([
    [0, 0],
    [-0, 0],
    [0.5 / 32767, 1],
    [-0.5 / 32767, -1],
    [0.4 / 32767, 0],
    [-0.4 / 32767, 0],
    [0.8, 26214],
  ])('quantizes %s with symmetric ties', (value, expected) => {
    expect(quantizePcm16(value)).toBe(expected);
  });
});
