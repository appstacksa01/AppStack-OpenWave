// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it } from 'vitest';
import type { ExportJobState } from '@openwave/contracts';
import { InvalidJobTransitionError, transitionJob } from './job-lifecycle.js';

describe('export lifecycle', () => {
  it.each<[ExportJobState, ExportJobState]>([
    ['queued', 'running'],
    ['queued', 'failed'],
    ['queued', 'cancelled'],
    ['running', 'completed'],
    ['running', 'failed'],
    ['running', 'cancelled'],
    ['completed', 'expired'],
    ['failed', 'expired'],
    ['cancelled', 'expired'],
  ])('allows %s → %s', (from, to) => {
    expect(transitionJob(from, to)).toBe(to);
  });

  it('makes repeated cancellation idempotent', () => {
    expect(transitionJob('cancelled', 'cancelled')).toBe('cancelled');
  });

  it.each<ExportJobState>(['completed', 'failed', 'cancelled', 'expired'])(
    'never restarts terminal state %s',
    (from) => {
      expect(() => transitionJob(from, 'running')).toThrow(
        InvalidJobTransitionError,
      );
    },
  );

  it('does not let late cancellation overwrite completion', () => {
    expect(() => transitionJob('completed', 'cancelled')).toThrow(
      'completed to cancelled',
    );
  });

  it('does not let completion overwrite accepted cancellation', () => {
    expect(() => transitionJob('cancelled', 'completed')).toThrow(
      'cancelled to completed',
    );
  });

  it.each<[ExportJobState, ExportJobState]>([
    ['queued', 'completed'],
    ['running', 'queued'],
    ['queued', 'expired'],
    ['running', 'running'],
    ['expired', 'completed'],
  ])('rejects invalid transition %s → %s with a stable code', (from, to) => {
    try {
      transitionJob(from, to);
      expect.fail('Expected transition rejection');
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidJobTransitionError);
      expect(error).toMatchObject({
        code: 'INVALID_JOB_TRANSITION',
        name: 'InvalidJobTransitionError',
      });
    }
  });
});
