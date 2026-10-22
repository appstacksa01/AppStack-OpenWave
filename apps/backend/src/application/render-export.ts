// SPDX-License-Identifier: GPL-3.0-only
import { planSequence } from '../domain/sequence.js';
import { encodeWav } from '../domain/wav-encoder.js';
import type { EncodingOptions } from '../domain/wav-encoder.js';

/** The worker supplies storage; completion must never expose partial bytes. */
export interface ExportSink {
  write(chunk: Uint8Array): Promise<void>;
  complete(): Promise<void>;
  abort(): Promise<void>;
}

export interface RenderOptions extends EncodingOptions {
  readonly onProgress?: (framesWritten: number, totalFrames: number) => void;
}

/** Run in a backend process, never a browser or API request handler. */
export async function renderExport(
  input: unknown,
  sink: ExportSink,
  options: RenderOptions = {},
): Promise<{ framesWritten: number; bytesWritten: number }> {
  const plan = planSequence(input); // Reject before any sink access or allocation.
  let bytesWritten = 0;
  try {
    for (const chunk of encodeWav(plan, options)) {
      await sink.write(chunk); // Backpressure: no next chunk until storage accepts it.
      bytesWritten += chunk.byteLength;
      options.onProgress?.(
        (bytesWritten - 44) / (plan.channels * 2),
        plan.totalFrames,
      );
    }
    await sink.complete();
    return { framesWritten: plan.totalFrames, bytesWritten };
  } catch (error) {
    try {
      await sink.abort();
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        'Render failed and sink cleanup also failed.',
        { cause: cleanupError },
      );
    }
    throw error;
  }
}
