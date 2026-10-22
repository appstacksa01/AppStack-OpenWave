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

The licensing/specification pull request selects a static TypeScript browser prototype, sine-only 20 Hz–10 kHz WAV generation, digital peak amplitude, JSON sequence files, 100 steps and five-minute exports. Software uses GPL-3.0-only; original documentation uses CC-BY-SA-4.0 with third-party exclusions. Decisions become accepted when reviewed and merged into `main`. This supersedes MEVN and square-wave support for the first milestone.

## Decisions still open

Physical output interfaces, electrical calibration, external hardware, Electro-Med format compatibility and verification equipment remain open. Implementation dependencies, actual supported browser/device versions and verification results must be recorded during development; native apps and long programmes need a later scope decision.
