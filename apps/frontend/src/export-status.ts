// SPDX-License-Identifier: GPL-3.0-only
import type { ExportJobState } from '@openwave/contracts';

type ViewState = ExportJobState | 'idle';
const messages: Record<ViewState, string> = {
  idle: 'No export requested.',
  queued: 'Your export is queued.',
  running: 'The server is generating your WAV file.',
  completed: 'Your WAV file is ready on the server.',
  failed: 'Export failed. Your sequence has been preserved.',
  cancelled: 'Export cancelled. Your sequence has been preserved.',
  expired: 'This export has expired. Request a new export.',
};

/** Presentation only: receives state and a cancellation command from its caller. */
export function renderExportStatus(
  host: HTMLElement,
  state: ViewState,
  onCancel?: () => void,
): void {
  const message = document.createElement('p');
  message.setAttribute('role', 'status');
  message.setAttribute('aria-live', 'polite');
  message.textContent = messages[state];
  host.replaceChildren(message);

  if ((state === 'queued' || state === 'running') && onCancel) {
    const cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.textContent = 'Cancel export';
    cancel.addEventListener('click', onCancel);
    host.append(cancel);
  }
}
