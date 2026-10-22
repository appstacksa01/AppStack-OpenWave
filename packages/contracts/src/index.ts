// SPDX-License-Identifier: GPL-3.0-only
/** Lifecycle shared by the editor and backend; contains no rendering code. */
export type ExportJobState =
  'queued' | 'running' | 'completed' | 'failed' | 'cancelled' | 'expired';
