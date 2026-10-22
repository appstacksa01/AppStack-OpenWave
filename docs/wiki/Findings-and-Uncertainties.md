# Findings and uncertainties

As of 22 October 2026, the project has performed no measurements.

| ID | Finding or question | Evidence/status | Project implication |
| --- | --- | --- | --- |
| F01 | Abrams' diagnostic rates include ohm settings rather than direct hertz readings. | Historical text, S01 pp. 49–51 | Do not transcribe these into frequency presets. |
| F02 | Hoffman's patent gives an example near 200 interruptions per minute. | Component patent, S03 | Does not define the complete output. |
| F03 | Contemporary investigation did not substantiate Abrams' claims. | Report abstract, S04; underlying investigation review pending | Do not adopt historical mechanisms as established. |
| F04 | Android provides synthesis-oriented audio APIs and USB audio support. | Official documentation, S07–S08 | Investigate an audio generator; measure target-device behaviour. |
| F05 | Digital waveform matching does not establish electrical output or biological equivalence. | Engineering distinction; no equivalence demonstrated | Verify the full output path into a defined load. |
| U01 | Which machine/revision/mode is the reference? | Unknown, INV-01 | Blocks a reproduction specification. |
| U02 | What did the Jones electrical report measure? | Located, not reviewed; S05, INV-02 | No measurements adopted. |
| U03 | Which signal and external hardware requirements apply? | Unknown, INV-03–06 | Architecture stays provisional. |
| U04 | Which licenses and contribution model apply? | Undecided, INV-08 | Resolve before implementation contributions. |

## Corrections to the earlier concept

The original README combined historical assertions with broad statements about frequency and safety. These are not adopted as engineering requirements. Frequency alone does not establish safety. No direct technical lineage from Abrams' circuit to the owner's machine has been established, nor equivalence between audio playback and that machine's output.

Each future finding needs a source assessment or measurement record, conflicting evidence, limitations, and a next action. Record negative results too.