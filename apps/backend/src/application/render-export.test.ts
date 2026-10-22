// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it, vi } from 'vitest';
import { renderExport } from './render-export.js';
import { RenderCancelledError } from '../domain/wav-encoder.js';

const input = {
  schema_version: 1,
  sample_rate_hz: 48000,
  channels: 1,
  steps: [
    {
      frequency_hz: 500,
      duration_seconds: 0.1,
      amplitude: 0.25,
      waveform: 'sine',
    },
  ],
};
function sink() {
  return {
    write: vi.fn<(chunk: Uint8Array) => Promise<void>>(async () => {}),
    complete: vi.fn(async () => {}),
    abort: vi.fn(async () => {}),
  };
}

describe('render application', () => {
  it('reports acknowledged writes and completes only after all bytes', async () => {
    const target = sink();
    const progress = vi.fn();
    const result = await renderExport(input, target, { onProgress: progress });
    expect(result).toEqual({ framesWritten: 4800, bytesWritten: 9644 });
    expect(progress.mock.calls).toEqual([
      [0, 4800],
      [4096, 4800],
      [4800, 4800],
    ]);
    expect(target.complete).toHaveBeenCalledOnce();
    expect(target.abort).not.toHaveBeenCalled();
    expect(target.write.mock.invocationCallOrder.at(-1)).toBeLessThan(
      Math.min(...target.complete.mock.invocationCallOrder),
    );
  });
  it('validates before touching a sink', async () => {
    const target = sink();
    await expect(renderExport({}, target)).rejects.toThrow('schema_version');
    expect(target.write).not.toHaveBeenCalled();
    expect(target.complete).not.toHaveBeenCalled();
    expect(target.abort).not.toHaveBeenCalled();
  });
  it('honours sink backpressure instead of rendering ahead', async () => {
    let acknowledge: () => void = () => {
      throw new Error('not initialized');
    };
    const waiting = new Promise<void>((resolve) => {
      acknowledge = resolve;
    });
    const target = sink();
    target.write.mockImplementationOnce(async () => waiting);
    const pending = renderExport(input, target);
    expect(target.write).toHaveBeenCalledTimes(1);
    expect(target.complete).not.toHaveBeenCalled();
    acknowledge();
    await pending;
    expect(target.write).toHaveBeenCalledTimes(3);
  });
  it.each(['write', 'complete'] as const)(
    'aborts on %s failure and preserves the cause',
    async (method) => {
      const target = sink();
      const cause = new Error('storage failed');
      target[method].mockRejectedValueOnce(cause);
      await expect(renderExport(input, target)).rejects.toBe(cause);
      expect(target.abort).toHaveBeenCalledOnce();
    },
  );
  it('preserves both the rendering and cleanup failure', async () => {
    const target = sink();
    const first = new Error('write failed');
    const cleanup = new Error('cleanup failed');
    target.write.mockRejectedValueOnce(first);
    target.abort.mockRejectedValueOnce(cleanup);
    await expect(renderExport(input, target)).rejects.toMatchObject({
      errors: [first, cleanup],
      cause: cleanup,
    });
  });
  it('aborts when the progress consumer fails', async () => {
    const target = sink();
    await expect(
      renderExport(input, target, {
        onProgress: () => {
          throw new Error('progress failed');
        },
      }),
    ).rejects.toThrow('progress failed');
    expect(target.abort).toHaveBeenCalledOnce();
  });
  it('aborts cancellation without completing, and later work still succeeds', async () => {
    const target = sink();
    const controller = new AbortController();
    target.write.mockImplementationOnce(async () => {
      controller.abort();
    });
    await expect(
      renderExport(input, target, { signal: controller.signal }),
    ).rejects.toThrow(RenderCancelledError);
    expect(target.complete).not.toHaveBeenCalled();
    expect(target.abort).toHaveBeenCalledOnce();
    await expect(renderExport(input, sink())).resolves.toHaveProperty(
      'framesWritten',
      4800,
    );
  });
});
