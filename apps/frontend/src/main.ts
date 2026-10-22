// SPDX-License-Identifier: GPL-3.0-only
import { renderExportStatus } from './export-status';
import './style.css';

const host = document.getElementById('app');
if (!host) throw new Error('OpenWave application mount is missing.');

const heading = document.createElement('h1');
heading.textContent = 'AppStack OpenWave';
const introduction = document.createElement('p');
introduction.textContent =
  'Engineering preview. The editor and backend export service are not connected yet.';
const status = document.createElement('section');
status.setAttribute('aria-label', 'Export status');
host.replaceChildren(heading, introduction, status);
renderExportStatus(status, 'idle');
