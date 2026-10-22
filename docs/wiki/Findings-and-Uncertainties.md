# Findings and uncertainties

As of 22 October 2026, a private audio file has been analysed digitally. No hardware output measurements or medical experiments have been performed.

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
| F11 | Numeric export targets and repeatable acceptance methods have been drafted. | Project proposal, [specification](Signal-Specification.md) and [plan](Signal-Verification-Plan.md) | Documentation milestone reached; no app tests run and implementation approval remains pending. |
| U01 | What are the machine's revision, accepted file/input formats, and electrical specifications? | Model identified; remaining details unknown, INV-01/03 | Reproduction/compatibility claims remain unsupported. |
| U02 | What did the Jones electrical report measure? | Located, not reviewed; S05, INV-02 | No measurements adopted. |
| U03 | Which signal and external hardware requirements apply? | Unknown, INV-03–06 | Architecture stays provisional. |
| U04 | Which licenses and contribution model apply? | Undecided, INV-08 | Resolve before implementation contributions. |
| U05 | Can lists/software be redistributed, and are units/settings sufficient for execution? | INV-09; one list inspected, rights/settings incomplete; Spooky2 download not inspected | Retain provenance and flag ambiguities; use synthetic public fixtures until rights are established. |

## Corrections to the earlier concept

The original README combined historical assertions with broad statements about frequency and safety. These are not adopted as engineering requirements. Frequency alone does not establish safety. No direct technical lineage from Abrams' circuit to the owner's machine has been established, nor equivalence between audio playback and that machine's output.

Each future finding needs a source assessment or measurement record, conflicting evidence, limitations, and a next action. Record negative results too.
