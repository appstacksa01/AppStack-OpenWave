// SPDX-License-Identifier: GPL-3.0-only
import type { ExportJobState } from '@openwave/contracts';

const transitions: Record<ExportJobState, readonly ExportJobState[]> = {
  queued: ['running', 'failed', 'cancelled'],
  running: ['completed', 'failed', 'cancelled'],
  completed: ['expired'],
  failed: ['expired'],
  cancelled: ['expired'],
  expired: [],
};

export class InvalidJobTransitionError extends Error {
  readonly code = 'INVALID_JOB_TRANSITION';

  constructor(from: ExportJobState, to: ExportJobState) {
    super(`Cannot transition export job from ${from} to ${to}.`);
    this.name = 'InvalidJobTransitionError';
  }
}

/** Pure policy only. A repository must enforce it in an atomic update. */
export function transitionJob(
  from: ExportJobState,
  to: ExportJobState,
): ExportJobState {
  if (from === 'cancelled' && to === 'cancelled') return 'cancelled';
  if (!transitions[from].includes(to)) {
    throw new InvalidJobTransitionError(from, to);
  }
  return to;
}
