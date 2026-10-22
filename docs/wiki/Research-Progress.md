# Research progress

Updated: 22 October 2026. This page distinguishes answered research questions from proposals and outstanding work. No application has been implemented and no hardware output measurements have been performed.

## Questions answered so far

| Question | Answer and evidence | What this does not establish |
| --- | --- | --- |
| Which machine is our reference? | Electro-Med 235p with Natural Health branding, observed in exterior photographs [S11] | Legal manufacturer, revision, internal circuitry and certified specifications |
| What does the supplied audio file contain? | MP3, 44.1 kHz stereo, 128 kbps, 162 minutes; 51 steady-frequency sections lasting 3–5 minutes, approximately 20 Hz–10 kHz [S12] | Hardware output or therapeutic effect |
| Are the sample's channels different? | Effectively matching; six ten-second spot checks were sample-identical [S12] | Independence or isolation of the machine's two output channels |
| Can a frequency list be inspected? | Yes: the supplied 18-slide list and matching Dragonfly75 page contain numeric lists, decimals, ranges and sweep notes [S27–S28] | Permission to redistribute, clinical validity, or a complete waveform specification |
| Is there official mobile audio guidance? | Android recommends device-appropriate rates, typically 44.1 or 48 kHz, and avoiding unnecessary resampling [S22] | Support on every phone or the Electro-Med USB player |
| Do existing apps advertise relevant functions? | Supplier listings describe tone generation/catalogues; some documentation also describes external-generator control [S13–S19] | Verified signal accuracy, interoperability, open-source rights or WAV export |

See [audio analysis](Audio-Sample-Analysis.md), [frequency-list review](Frequency-List-Review.md), and [audio-format research](Audio-Format-Research.md).

## Proposed, not verified

The [draft signal specification](Signal-Specification.md) proposes PCM16 WAV at 44.1/48 kHz, mono or duplicate stereo, sine signals at 20 Hz–10 kHz, and a narrower initial square-wave range. Its [verification plan](Signal-Verification-Plan.md) contains repeatable acceptance methods. These are draft design targets. No application has passed them.

We have not established the existing player's accepted WAV bit depths/rates/channel combinations or the actual waveform at its outputs.

## Investigation status

| Investigation | Progress | Remaining requirement |
| --- | --- | --- |
| INV-01: Reference documentation | Partial: model, labels and owner workflow recorded | Manual/revision, file formats and input specifications |
| INV-02: Historical research | Partial: primary claims and critical account located | Jones report and underlying investigation review |
| INV-03: Hardware characterization | Not measured | Qualified protocol, equipment, load-defined results |
| INV-04: Mobile platform | Partial: official Android guidance and candidate approaches | Platform choice, device matrix, route verification |
| INV-05: Hardware boundary | Partial: candidate instruments/interfaces documented | Decide what external hardware is required |
| INV-06: Safety review | Pending | Qualified bench setup and hazard review |
| INV-07: Prototype specification | Draft ready | Square-wave definition, envelope details, resource limits and acceptance review |
| INV-08: Licensing | Undecided | Maintainer selects and publishes appropriate licenses |
| INV-09: Lists/software | Partial: actual list structure and provenance inspected | Rights, normalization rules, neutral import schema, software/export checks |

No investigation is marked complete while its original completion criteria remain unmet. See the [backlog](Development-Readiness.md).

## Next practical work

1. Review and settle the generic WAV-generator scope under INV-07; list any hardware-reproduction claims explicitly excluded.
2. Specify the neutral import schema and ambiguity handling using the list review; use synthetic data for public importer tests.
3. Decide licensing before implementation contributions.
4. Establish player compatibility and a qualified bench measurement plan separately.

Historical reconstruction and an exhaustive player-format matrix need not prevent a generic export prototype if the maintainer records that reduced scope and the applicable readiness criteria are met.