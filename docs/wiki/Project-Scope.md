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

The first software deliverable is a browser-based sine-sequence editor exporting PCM16 WAV at 44.1/48 kHz, verified independently as digital files. See the [implementation contract](Signal-Specification.md). This file-only milestone does not require connection to the Electro-Med, a phone audio output or test instruments. Physical bench measurements remain a separate stage. Diagnostic systems, disease-treatment presets, clinical trials, and body-connected experiments are outside this phase. Biological research would require its own protocol, expertise, ethical review, and assessment of applicable requirements.

Abrams' apparatus, Rife-associated apparatus, and modern commercial machines must be investigated separately. Similar names or historical analogies do not establish equivalent circuitry or outputs.

## First software decisions

PR #4 established the software/docs licences and first numeric WAV contract. The v0.3 revision selects a TypeScript browser editor with backend API and worker processes for all generation/encoding; SOLID and frontend/backend unit tests are compulsory. Sine-only 20 Hz–10 kHz generation, digital amplitude, JSON sequences, 100 steps and five-minute exports are unchanged. Software uses GPL-3.0-only; original documentation uses CC-BY-SA-4.0 with third-party exclusions. The architecture revision takes effect when reviewed and merged into `main`; browser rendering is superseded.

## Decisions still open

Physical output interfaces, electrical calibration, external hardware, Electro-Med format compatibility and verification equipment remain open. Backend frameworks, queue/storage/access contracts and concrete operational limits must be documented with the first service implementation; hosting and public-deployment data handling need review. Record actual supported browser/device versions and verification results during development; native apps and long programmes need a later scope decision.
