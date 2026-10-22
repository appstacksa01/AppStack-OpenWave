// SPDX-License-Identifier: GPL-3.0-only
import { describe, expect, it, vi } from 'vitest';
import { renderExportStatus } from './export-status';

describe('export status presentation', () => {
  it.each([
    ['idle', 'No export requested.'],
    ['queued', 'Your export is queued.'],
    ['running', 'The server is generating your WAV file.'],
    ['completed', 'Your WAV file is ready on the server.'],
    ['failed', 'Export failed. Your sequence has been preserved.'],
    ['cancelled', 'Export cancelled. Your sequence has been preserved.'],
    ['expired', 'This export has expired. Request a new export.'],
  ] as const)('announces %s accessibly', (state, expected) => {
    const host = document.createElement('section');
    renderExportStatus(host, state);
    expect(host.querySelector('[role="status"]')?.textContent).toBe(expected);
    expect(host.querySelector('[aria-live="polite"]')).not.toBeNull();
    expect(host.querySelector('a')).toBeNull();
  });

  it.each(['queued', 'running'] as const)(
    'offers cancellation during %s',
    (state) => {
      const host = document.createElement('section');
      const cancel = vi.fn();
      renderExportStatus(host, state, cancel);
      host.querySelector('button')?.click();
      expect(cancel).toHaveBeenCalledOnce();
    },
  );

  it('does not promise cancellation without a connected command', () => {
    const host = document.createElement('section');
    renderExportStatus(host, 'running');
    expect(host.querySelector('button')).toBeNull();
  });

  it.each(['completed', 'failed', 'cancelled', 'expired'] as const)(
    'removes stale cancellation controls after %s',
    (state) => {
      const host = document.createElement('section');
      renderExportStatus(host, 'running', vi.fn());
      renderExportStatus(host, state, vi.fn());
      expect(host.querySelector('button')).toBeNull();
      expect(host.querySelectorAll('[role="status"]')).toHaveLength(1);
    },
  );
});
