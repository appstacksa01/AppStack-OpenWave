# Project scope

## Purpose

Investigate mobile signal generation and the electrical behaviour of specific historical or commercial frequency-generating devices. Share sources, methods, costs, limitations, and results so others can inspect and reproduce the engineering.

## Research questions

- What device, revision, and output mode are we investigating?
- What does it produce under a defined load: waveform, frequency content, voltage, current, modulation, timing, and DC offset?
- Which functions can a phone reproduce, and which require external hardware?
- How does output vary across phones, adapters, and operating systems?
- Can another contributor reproduce our measurements with documented uncertainty?

## Initial boundary

The original file-only boundary below is extended for the requested [desktop player](Desktop-Player.md): one browser audio adapter, local WAV playback and live backend streams, plus band-limited square/triangle in the same engine under v0.4. This is uncommitted implementation, not mobile/physical validation. No Electron/Tauri/native mobile framework was introduced; backend synthesis and the human-contact exclusions remain.

The first software deliverable is a browser-based sine-sequence editor exporting PCM16 WAV at 44.1/48 kHz, verified independently as digital files. See the [implementation contract](Signal-Specification.md). This file-only milestone does not require connection to the Electro-Med, a phone audio output or test instruments. Physical bench measurements remain a separate stage. Diagnostic systems, disease-treatment presets, clinical trials, and body-connected experiments are outside this phase. Biological research would require its own protocol, expertise, ethical review, and assessment of applicable requirements.

Abrams' apparatus, Rife-associated apparatus, and modern commercial machines must be investigated separately. Similar names or historical analogies do not establish equivalent circuitry or outputs.

## First software decisions

PR #4 established the software/docs licences and first numeric WAV contract. PR #5 adopted v0.3's TypeScript browser editor/backend API/worker execution and compulsory SOLID/frontend/backend tests, superseding browser rendering. Sine-only 20 Hz–10 kHz generation, digital amplitude, JSON sequences, 100 steps and five-minute exports remain the contract. Software uses GPL-3.0-only; original docs use CC-BY-SA-4.0 with third-party exclusions. Backend numerical checks and an uncommitted connected preview exist; full release acceptance remains incomplete.

The confirmed architectural direction is one shared OpenWave engine, one principal TypeScript UI and separate web/Android/iOS audio adapters. Sharing an engine does not imply running synthesis on every device: the authoritative implementation executes in backend workers. Framework and mobile capability decisions remain open under [ADR-002](../ADR-002-Mobile-Playback.md).

## Decisions still open

Portable research now has a [concept](Portable-Concept.md), [mobile assessment](Mobile-Capabilities.md), [architecture proposal](../ADR-002-Mobile-Playback.md) and [POC plan](Mobile-POC.md). Proposed USB-C playback into electronic loads is a later stage, not a silent addition to the current file-only milestone. Offline playback of retained files is compatible with backend generation; offline new-file generation and live phone synthesis require an explicit architecture decision. React, Capacitor, native playback and portable hardware have not been adopted or implemented by this documentation review.

Physical output interfaces, electrical calibration, external hardware, Electro-Med formats and verification equipment remain open. The [service contract](../Service-Contract.md) records targets and the local HTTP/SQLite/filesystem implementation's remaining configuration/access/retention gaps. Hosting and public-deployment data handling still need review. Define the shared playback contract and capability matrix before choosing a mobile shell or native implementation; record actual browser/device results. Longer programmes remain a later scope decision.
