# Desktop waveform player

22 October 2026. INV-04/07. The maintainer authorized a desktop waveform player after the mobile architecture audit. The uncommitted implementation reuses the TypeScript UI and one backend waveform engine, adds an audio-output contract/browser adapter and supports local WAV plus paced live sine/square/triangle sequence playback. No Electron/Tauri/native mobile framework was added.

Read the [implementation, supported configurations, verification, changed-file inventory and manual lab plan](../Desktop-Player.md), the [desktop decision](../ADR-003-Desktop-Player.md), and the [v0.4 working-tree signal contract](Signal-Specification.md). The original v0.3 sine baseline is preserved; mobile/native and physical-output verification remain separate.

Local evidence: 121 frontend/186 backend tests with full current app coverage; 64 independent WAV cases; real HTTP/separate-process checks and three independently checked stream downloads; desktop browser smoke checks. No physical sound-card/DAC measurement, human testing, Electro-Med equivalence or release approval is claimed. Public-wiki publication still follows review/merge of `docs/wiki/` sources.
