# Research progress

Updated: 22 October 2026. This page distinguishes research, implementation increments and outstanding verification. PR #6 merged the scaffolding. The renderer PR introduces backend generation with local unit and independent digital-file results; the export service/editor and physical output measurements remain outstanding.

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

The v0.3 [signal specification](Signal-Specification.md) keeps sine-only PCM16 WAV at 44.1/48 kHz, mono/duplicate stereo, 20 Hz–10 kHz, 100 steps/five minutes and exact timing/fades/JSON, with backend worker generation and an editor-only frontend. SOLID and frontend/backend unit tests are compulsory. Square waves remain deferred. Initial [renderer results](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Backend-Renderer.md) cover 36 synthetic WAV cases, not the complete [service/browser verification plan](Signal-Verification-Plan.md). The renderer PR awaits review; its results do not validate electrical output or clinical claims.

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
| INV-07: Prototype implementation | Backend renderer prepared; local digital checks passed for 36 fixtures and both maximum exports | Maintainer review, human reproduction, job-service integration, editor and release verification remain |
| INV-08: Licensing | GPL-3.0-only software / CC-BY-SA-4.0 original docs merged in PR #4 | Dependency review during implementation; hardware/third-party rights separate; no AGPL change adopted |
| INV-09: Lists/software | Partial: actual list structure and provenance inspected | Rights, normalization rules, neutral import schema, software/export checks |

Remaining investigation requirements are tracked separately from authorization for the reduced software scope. See the [file-only decision](Development-Readiness.md#file-only-prototype-decision).

## Next practical work

1. Review the backend renderer, unit tests and independent WAV results; merge accepted work through its PR.
2. Implement queue/storage/HTTP adapters and the worker against the [service contract](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Service-Contract.md), with unit and integration tests.
3. Connect the editor and obtain browser/device results and a second verification review before release. Cloud CI remains deferred without enabling paid services; local checks remain compulsory.
4. Re-estimate funding and maintenance for backend operation. Establish player compatibility and a qualified bench measurement plan separately.

Historical reconstruction and an exhaustive player-format matrix need not prevent a generic export prototype if the maintainer records that reduced scope and the applicable readiness criteria are met.
