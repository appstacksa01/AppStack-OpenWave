// SPDX-License-Identifier: GPL-3.0-only
import {
  SEQUENCE_LIMITS,
  SequenceValidationError,
} from '../domain/sequence.js';

/** Body streaming limits must also be enforced by the future HTTP adapter. */
export function parseSequenceJson(text: string): unknown {
  if (Buffer.byteLength(text, 'utf8') > SEQUENCE_LIMITS.maxJsonBytes) {
    throw new SequenceValidationError('sequence', 'JSON exceeds 1 MiB');
  }
  try {
    const value: unknown = JSON.parse(text);
    return value;
  } catch {
    throw new SequenceValidationError('sequence', 'malformed JSON');
  }
}
