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

## Specified, not verified

The v0.2 [signal specification](Signal-Specification.md) defines a browser-based sine-only PCM16 WAV editor/exporter at 44.1/48 kHz, mono or duplicate stereo, with a 20 Hz–10 kHz range, 100-step/five-minute limits, exact timing/fades and a JSON sequence format. Square waves are deferred. Its [verification plan](Signal-Verification-Plan.md) defines independent acceptance methods. These requirements and the software/docs licences take effect when their pull request is approved and merged. No application has passed the checks.

We have not established the existing player's accepted WAV bit depths/rates/channel combinations or the actual waveform at its outputs.

## Investigation status

| Investigation | Progress | Remaining requirement |
| --- | --- | --- |
| INV-01: Reference documentation | Partial: model, labels and owner workflow recorded | Manual/revision, file formats and input specifications |
| INV-02: Historical research | Partial: primary claims and critical account located | Jones report and underlying investigation review |
| INV-03: Hardware characterization | Not measured | Qualified protocol, equipment, load-defined results |
| INV-04: Mobile platform | Browser selected for first file-only milestone in specification PR | Actual browser/device checks; physical route verification separate |
| INV-05: Hardware boundary | Partial: candidate instruments/interfaces documented | Decide what external hardware is required |
| INV-06: Safety review | Pending | Qualified bench setup and hazard review |
| INV-07: Prototype specification | v0.2 contract and file-only decision ready for review/merge | Implement, independently verify and record release results; square waves deferred |
| INV-08: Licensing | GPL-3.0-only software / CC-BY-SA-4.0 original docs selected in licensing PR | Effective on merge; dependency review during implementation; hardware/third-party rights separate |
| INV-09: Lists/software | Partial: actual list structure and provenance inspected | Rights, normalization rules, neutral import schema, software/export checks |

Remaining investigation requirements are tracked separately from authorization for the reduced software scope. See the [file-only decision](Development-Readiness.md#file-only-prototype-decision).

## Next practical work

1. Review and merge the software/documentation licences, v0.2 specification and file-only implementation decision.
2. Build the generator and independent verification checks on a new branch, using synthetic inputs and the defined JSON format.
3. Add the browser editor; record actual browser/device results and obtain a second verification review before release.
4. Pursue funding and maintenance planning alongside development. Establish player compatibility and a qualified bench measurement plan separately.

Historical reconstruction and an exhaustive player-format matrix need not prevent a generic export prototype if the maintainer records that reduced scope and the applicable readiness criteria are met.
