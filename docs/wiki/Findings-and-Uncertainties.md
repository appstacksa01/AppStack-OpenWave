# Findings and uncertainties

As of 22 October 2026, a private audio file has been analysed digitally. No hardware output measurements or medical experiments have been performed.

The later [desktop player](Desktop-Player.md) now has software-tested local/live playback, a browser audio adapter and 64 independent waveform-file cases for the shared engine. These supplement F11's digital evidence, not F05/U01/U03's physical equivalence/safety requirements. Mobile/native adapters and hardware measurements remain unverified.

| ID | Finding or question | Evidence/status | Project implication |
| --- | --- | --- | --- |
| F01 | Abrams' diagnostic rates include ohm settings rather than direct hertz readings. | Historical text, S01 pp. 49–51 | Do not transcribe these into frequency presets. |
| F02 | Hoffman's patent gives an example near 200 interruptions per minute. | Component patent, S03 | Does not define the complete output. |
| F03 | Contemporary investigation did not substantiate Abrams' claims. | Report abstract, S04; underlying investigation review pending | Do not adopt historical mechanisms as established. |
| F04 | Android provides synthesis-oriented audio APIs and USB audio support. | Official documentation, S07–S08 | Investigate an audio generator; measure target-device behaviour. |
| F05 | Digital waveform matching does not establish electrical output or biological equivalence. | Engineering distinction; no equivalence demonstrated | Verify the full output path into a defined load. |
| F06 | Owner photographs identify the Electro-Med 235p and labelled external input, USB source, and measurement connections. | Exterior observations, S11 | Model identified; manual, revision, and input/output specifications remain open. |
| F07 | An owner-provided MP3 contains 51 steady-frequency sections across 162 minutes, with approximately 20 Hz–10 kHz dominant peaks and matching channels. | Local digital analysis, S12; [method and limits](Audio-Sample-Analysis.md) | Supports investigating a sequence editor/exporter; not hardware equivalence. |
| F08 | Supplier software and programmable lab instruments provide potential workflow/interface references. | Supplier/manufacturer statements, S13–S18 | Investigate formats, licenses, interfaces, and measurement requirements; no integration verified. |
| F09 | An 18-slide list identifies Dragonfly75 as its source; matching webpage text is accessible. Entries mix numbers, ranges, sweep notes and ambiguous text. | Read-only document/web inspection, S27–S28 | [Import requirements identified](Frequency-List-Review.md); not a redistribution license or execution-ready database. |
| F10 | Android's rate guidance supports evaluating 44.1/48 kHz and minimizing unnecessary resampling. | Official documentation, S22 | Informs platform/export design; does not confirm Electro-Med compatibility. |
| F11 | Numeric export targets and repeatable acceptance methods are defined; backend digital fixtures have recorded results. | [Specification](Signal-Specification.md), [plan](Signal-Verification-Plan.md) and [implementation audit](../Mobile-Research-Audit.md) | Digital file evidence does not complete service/mobile/hardware release gates. |
| U01 | What are the machine's revision, accepted file/input formats, and electrical specifications? | Model identified; remaining details unknown, INV-01/03 | Reproduction/compatibility claims remain unsupported. |
| U02 | What did the Jones electrical report measure? | Located, not reviewed; S05, INV-02 | No measurements adopted. |
| U03 | Which signal and external hardware requirements apply? | Unknown, INV-03–06 | Architecture stays provisional. |
| U04 | Which licenses and contribution model apply? | ANSWERED — DOCUMENTED for original software/docs: GPL-3.0-only and CC-BY-SA-4.0 merged in PR #4, INV-08 | Use reviewed pull requests; assess dependencies, hardware and third-party rights separately. |
| U05 | Can lists/software be redistributed, and are units/settings sufficient for execution? | INV-09; one list inspected, rights/settings incomplete; Spooky2 download not inspected | Retain provenance and flag ambiguities; use synthetic public fixtures until rights are established. |

## Corrections to the earlier concept

The [mobile question register](Mobile-Question-Register.md) refines F04/F10 and U01/U03 without replacing their identifiers. Official USB audio support resolves platform capability, not target compatibility. ADR-002's shared-engine/principal-TypeScript-UI/platform-adapter direction is maintainer-confirmed; framework selection remains **DECISION REQUIRED**. Mobile playback is **FEASIBLE — NOT YET VERIFIED**; reference electrical characterization is **BLOCKED — HARDWARE OR TESTING**. See the [portable concept](Portable-Concept.md) and [hardware roadmap](Hardware-and-Electrical-Safety.md#portable-hardware-roadmap).

The original README combined historical assertions with broad statements about frequency and safety. These are not adopted as engineering requirements. Frequency alone does not establish safety. No direct technical lineage from Abrams' circuit to the owner's machine has been established, nor equivalence between audio playback and that machine's output.

Each future finding needs a source assessment or measurement record, conflicting evidence, limitations, and a next action. Record negative results too.

## Signal and embedded hardware review — 22 October 2026

F05/U03 are refined, not closed: frequency and digital amplitude are independent; an amplifier is not required to generate a mathematical frequency, while physical load compatibility remains unknown. The [explanation](Frequency-and-Amplitude.md) records the owner-reported laptop no-sensation observation [S55] without inferring zero volts, incorrect frequency or an amplification requirement.

ESP32-S3 native USB/UAC and external-DAC integration are documented capabilities [S47–S51], not OpenWave hardware results. The [candidate comparison](ESP32-S3-Investigation.md) preserves current backend execution and one engine. M-Q11 now uses the more specific **BLOCKED — MEASUREMENT REQUIRED** label; M-Q12 is **PARTIALLY ANSWERED**. See the [status/evidence change log](Mobile-Question-Register.md#status-and-evidence-change-log--22-october-2026) for prior labels and actions. No analog waveform, isolation, human-contact safety or effectiveness question has been answered by this review.
