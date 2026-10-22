# Portable signal and hardware documentation review

22 October 2026. Documentation-only working-tree update. No application code, firmware, hardware designs, dependency settings or recorded numerical results changed. No commit, push, purchase or public-wiki publication performed. Existing uncommitted implementation, earlier documentation and artwork were retained. Repository wiki source remains subject to reviewed merge before publication, per [AGENTS.md](../AGENTS.md) and [README contribution policy](../README.md#how-changes-reach-main).

## A. Documentation audit

Inventoried the existing `docs/wiki/` pages and architecture documents by topic/headings; reviewed the relevant content in README/AGENTS, [ADR-001](Architecture.md), [ADR-002](ADR-002-Mobile-Playback.md), [ADR-003](ADR-003-Desktop-Player.md), [desktop guide](Desktop-Player.md), [prior mobile audit](Mobile-Research-Audit.md), and the wiki's scope/readiness, Mobile Capabilities, Portable Concept, Mobile Question Register, Mobile POC, Existing Machine, Hardware and Electrical Safety, Findings, Research Progress, Source Library, Signal Specification/Verification, audio-format/sample, supplier/list and test-equipment research. Historical/list/supplier material remains background; this update does not reinterpret it as electrical evidence.

Reviewed the current backend sequence/oscillator/PCM encoder boundaries, WAV export/live-process arrangement, frontend `AudioOutput` interface and relevant numerical/playback unit-test cases. The existing 64-case [desktop verification record](verification/desktop-player-initial.json) separates synthetic digital evidence from physical output. Its six recorded engine/checker source hashes were rechecked against the working files and match; this is provenance checking, not a new execution of those tests. Prior desktop results remain 121 frontend/186 backend tests and 64 independent WAV cases, as recorded in the desktop guide. No runtime suite was rerun for prose changes.

Existing IDs retained: INV-01–09, F05/F10/F11, U01/U03 and M-Q01–M-Q21. Added M-Q22–M-Q27 as mapped subquestions. No parent investigation closed. The more specific measurement-blocked classification is nested within the earlier hardware/testing category, preserving its meaning. Corrected stale sine-only and no-playback descriptions without changing mobile acceptance.

## B. Wiki changes and file inventory

Created two wiki pages for genuinely new topics:

- [Frequency and amplitude](wiki/Frequency-and-Amplitude.md): terminology, central amplification answer, laptop observation and five independent evidence questions.
- [ESP32-S3 investigation](wiki/ESP32-S3-Investigation.md): documented capabilities, external DAC, UAC/command comparison, iPhone uncertainty and execution-policy gate.

Updated existing pages rather than creating parallel question, hardware or decision systems:

| Files | Change |
| --- | --- |
| `docs/Architecture.md`, `docs/ADR-002-Mobile-Playback.md` | Candidate hardware pointers and explicit preservation of backend-only synthesis/one-engine direction |
| `docs/wiki/Portable-Concept.md` | Mermaid composition, long-term product objective, P-D01–P-D06 decision register; corrected desktop/mobile waveform distinction |
| `docs/wiki/Mobile-Capabilities.md`, `docs/wiki/Mobile-Question-Register.md` | ESP32/platform findings, mapped subquestions, previous/new status and evidence/action log |
| `docs/wiki/Existing-Machine-Investigation.md` | Owner workflow and individually unresolved electrical questions |
| `docs/wiki/Hardware-and-Electrical-Safety.md` | OpenWave Analog Output Characterisation milestone, entry gates, measurement set and evidence record |
| `docs/wiki/Signal-Verification-Plan.md`, `docs/wiki/Development-Readiness.md` | Link physical milestone without replacing digital or safety gates |
| `docs/wiki/Findings-and-Uncertainties.md`, `docs/wiki/Research-Progress.md` | Findings/status reconciliation, 27 questions and next milestone |
| `docs/wiki/Source-Library.md` | S47–S55, primary-source scopes/access dates and owner-report limitations |
| `docs/wiki/Home.md`, `docs/wiki/_Sidebar.md` | Navigation to new research, decision register, milestone and this review |
| `docs/Portable-Hardware-Research-Review.md` | This audit and final evidence/verification report |

This task changes 14 existing documents and adds three, including this report. Other Git changes predate this request; they are not claimed as this task's edits. The earlier desktop guide's documentation-check counts are a historical record of that increment, not this larger document set.

## C. Questions now answered

| Question | Answer / evidence | Boundary |
| --- | --- | --- |
| Does digital frequency generation need amplification? | No; amplitude scaling and frequency are separate in the mathematical waveform/encoder contract. DAC interface requirements depend on the part/load [S52] | Does not answer actual terminal voltage/current or load compatibility |
| Does S3 contain the original ESP32 general-purpose analog DAC? | No; external DAC/codec is the investigated path. Espressif peripheral and I2S capability documentation [S47/S48] | No external DAC selected or output measured |
| Is there an S3 USB audio implementation starting point? | Espressif documents a TinyUSB-based UAC component and S3 applicability [S49/S50] | Android/iPhone compatibility remains FEASIBLE — NOT YET VERIFIED, not answered by the example |
| Are USB-C S3 boards documented? | Espressif lists an ESP32-S3-USB-OTG board with USB Type-C [S51] | No procurement, stock, revision or suitability assertion |

The [source library](wiki/Source-Library.md#portable-signal-and-esp32-s3-review--22-october-2026) records primary URLs and inspected portions. The owner's laptop observation is not technical proof of missing/incorrect output.

## D. Questions still unanswered

Reference voltage/current, impedance, isolation/protection, gain/limiting/filtering, frequency response, channel implementation and WAV-to-output transfer remain blocked pending documentation and appropriate qualified measurements. Laptop and USB-C DAC analog output are also unmeasured. Isolation/safety properties of the Electro-Med must be independently established before its electrode-output measurements.

Named phone/OS/UAC/DAC compatibility, route/interruption behaviour, negotiated rates, clock drift, noise/distortion/clipping, loaded levels, continuity and power/battery behaviour need actual device/instrument evidence. USB command transport on iPhone needs current supported protocol/API, accessory-programme and deployment-target review. Local MCU generation needs architecture approval plus engine portability/resource/conformance evidence. None is solved by changing a UI label or adding a microcontroller.

## E. ESP32-S3 assessment

Viable for further investigation as a USB audio peripheral feeding an external DAC. Option A best preserves the existing engine boundary, although a commercial USB-C DAC is the baseline and may remove the need for an ESP32 bridge. Option B could support local generation in principle, but requires more transport, execution-policy and one-engine portability work. No measured latency, accuracy, battery, cost or effort advantage is claimed. No option, board or firmware stack has been adopted.

## F. Amplification conclusion

No amplification is required simply to generate the requested frequency. Additional analog circuitry may be required by the measured load/output requirements; an amplifier is not currently a confirmed OpenWave requirement. The Electro-Med's processing is unknown. Digital correctness, analog correctness, load compatibility, human-contact safety and biological effectiveness remain independent evidence questions.

## G. Recommended next milestone

**OpenWave Analog Output Characterisation** under INV-03/05/06: first a laptop sound-card baseline, then a compatible commercial USB-C DAC, using identical verified fixtures and qualified electronic-load/instrument setups. Add an available, later-authorized ESP32/DAC and separately safety-reviewed Electro-Med only after their entry gates. Record raw captures, settings, load/instrument identity, frequency/shape, RMS/peak/DC/current, distortion/clipping/response/noise, uncertainty, failures and independent review. Use results to decide additional hardware needs; do not start custom manufacturing by assumption.

## H. Repository verification

Validation passed across **41 repository Markdown files, 338 local links/anchors, 54 tables, 10 fenced blocks and 55 source IDs**, including fence balance, table widths, merge markers and trailing whitespace. Git whitespace checks passed. The pre-edit hash comparison confirms **14 existing documents changed, three documents added and zero application/tooling files changed**. All six engine/checker source hashes in the unchanged 64-case verification record match the current files. Validation details are retained locally in `.openwave/portable-docs-validation.json`.

No runtime suite was rerun because this task changes documentation only. No physical test, Mermaid renderer run, remote CI or public wiki synchronization is claimed. The Mermaid diagram received structural/source review only. Accessory Access documentation retrieval was incomplete, so no new iPhone command capability was adopted from it; choosing an iPhone command protocol remains an explicit investigation. Public wiki publication waits for the repository's reviewed merge process.
