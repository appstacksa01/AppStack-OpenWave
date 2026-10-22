// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from 'vitest';
import { parseSequenceJson } from './sequence-json.js';
import {
  SEQUENCE_LIMITS,
  SequenceValidationError,
} from '../domain/sequence.js';

describe('JSON input adapter', () => {
  it('decodes without silently inserting or validating fields', () => {
    expect(parseSequenceJson('{"channels":2}')).toEqual({ channels: 2 });
  });
  it('rejects malformed JSON', () => {
    expect(() => parseSequenceJson('{"steps":[')).toThrow('malformed JSON');
  });
  it('accepts exactly the byte limit', () => {
    expect(
      parseSequenceJson('0' + ' '.repeat(SEQUENCE_LIMITS.maxJsonBytes - 1)),
    ).toBe(0);
  });
  it('rejects oversize UTF-8 before JSON parsing', () => {
    expect(() =>
      parseSequenceJson(' '.repeat(SEQUENCE_LIMITS.maxJsonBytes + 1)),
    ).toThrow('exceeds 1 MiB');
    expect(() =>
      parseSequenceJson('🌊'.repeat(SEQUENCE_LIMITS.maxJsonBytes / 4 + 1)),
    ).toThrow(SequenceValidationError);
  });
});
