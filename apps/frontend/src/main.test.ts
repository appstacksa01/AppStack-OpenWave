// SPDX-License-Identifier: GPL-3.0-only
import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  document.body.replaceChildren();
  vi.resetModules();
});
describe('application entry', () => {
  it('shows the honest development status without an export action', async () => {
    const app = document.createElement('main');
    app.id = 'app';
    document.body.append(app);
    await import('./main');
    expect(app.querySelector('h1')?.textContent).toBe('AppStack OpenWave');
    expect(app.textContent).toContain('not connected yet');
    expect(app.querySelector('[role="status"]')?.textContent).toBe(
      'No export requested.',
    );
    expect(app.querySelector('button')).toBeNull();
  });
  it('fails clearly when the mount is absent', async () => {
    await expect(import('./main')).rejects.toThrow(
      'application mount is missing',
    );
  });
});
