# Research progress

Updated: 22 October 2026. The later [desktop-player request](Desktop-Player.md) now has an uncommitted implementation: one shared backend engine supports sine/band-limited square/triangle, with local WAV and live streaming through the browser audio adapter. Local checks passed 121 frontend/186 backend tests, 64 independent WAV cases and real HTTP/process streaming checks. Desktop browser smoke checks cover playing, mute, local load and completion. These are software results, not merged release, phone support or physical output. The [earlier audit](../Mobile-Research-Audit.md) retains its original 74/169 and sine-only planning snapshot.

## Concept v0.2 update — 23 October 2026

The [functional specification and Mermaid diagram](Portable-Concept.md#concept-v02-functional-specification) record the maintainer's hardware proposal [S56], **under review**: phone → standard UAC DAC → instrumented electronic load; no ESP32/AD9833 baseline. Battery/charging is optional pending measured phone/DAC power needs. The future output module is unspecified and electrodes remain future safety research, with no direct DAC/unvalidated-amplifier connection.

Six critical questions are mapped to the existing investigations; M-Q28 adds charging-port/power/data-role choice and M-Q29 adds packaging feasibility. The 80 x 50 x 20 mm and under 100 g targets remain aspirational. [Status/scope trace](Mobile-Question-Register.md#concept-v02-follow-up--23-october-2026) preserves prior ESP32 feasibility without making it a prototype dependency. No components selected, circuits designed, new tests run or measurements recorded. Shared-engine/backend execution remains unchanged.

The next hardware milestone remains laptop/commercial-DAC analog characterisation plus the selected mobile DAC's power/route matrix; use its results before adding a battery, controller or custom output hardware.

Documentation validation for this update passed across 41 Markdown files, 351 local links/anchors, 59 tables, 11 fenced blocks and 56 source IDs; Git whitespace checks passed. Exactly ten existing wiki-source pages changed, with no application/tooling or numerical-result changes. The recorded renderer/checker source hashes still match. No runtime tests or physical measurements were rerun for this documentation-only review; the Mermaid diagram was source-reviewed, not rendered. Earlier audit counts remain historical snapshots. No commit, push or public-wiki synchronization is part of this update.

## Portable research update

The [question register](Mobile-Question-Register.md) now tracks 29 subquestions across INV-01–09, retaining its six core classifications and refining physical gates as **BLOCKED — MEASUREMENT REQUIRED** within the earlier hardware/testing category. Android/iPhone USB audio is **ANSWERED — DOCUMENTED** at platform-capability level; actual phone/DAC compatibility is **BLOCKED — HARDWARE OR TESTING**. Native file playback/background handling is **FEASIBLE — NOT YET VERIFIED** in OpenWave. Reference electrical output and list reuse rights remain unresolved. No historical, hardware or medical question was closed by mobile API availability.

The latest [signal/amplification explanation](Frequency-and-Amplitude.md) answers the conceptual question: amplification is not required to calculate a frequency. Load-compatible analog output remains unknown. The [ESP32-S3 review](ESP32-S3-Investigation.md) documents UAC/external-DAC feasibility and separates it from command-based generation, unresolved iPhone command access and the required engine-execution decision. [Status transitions](Mobile-Question-Register.md#status-and-evidence-change-log--22-october-2026) retain previous statuses, evidence limits and next actions. No code, firmware, board selection or new physical test accompanies this review.

The shared engine/principal TypeScript UI direction is unchanged. [ADR-003](../ADR-003-Desktop-Player.md) selects the browser for this desktop increment and adds its playback adapter; Electron/Tauri/PWA packaging and mobile frameworks remain unselected. The [mobile POC](Mobile-POC.md) must reuse the implemented audio contract and validate platform gaps. Local-file playback needs no generator; live custom synthesis still runs in backend processes. On-phone synthesis requires an ADR-001 amendment. Mobile acceptance rows remain unpassed.

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

The [v0.4 working-tree contract](Signal-Specification.md) extends the adopted v0.3 sine baseline with explicitly normalized/truncated square/triangle. All original timing/rate/channel/resource limits remain. Sine fixture hashes are unchanged; 64 digital cases pass, with 0 PCM16 LSB maximum error for fully compared fixtures. The [desktop guide](../Desktop-Player.md) distinguishes unit, real-process, independent and manual browser evidence from unresolved release/hardware checks. SOLID/frontend/backend tests remain compulsory. Remote merge/CI outcomes are not inferred from local results.

We have not established the existing player's accepted WAV bit depths/rates/channel combinations or the actual waveform at its outputs.

## Investigation status

| Investigation | Progress | Remaining requirement |
| --- | --- | --- |
| INV-01: Reference documentation | Partial: model, labels and owner workflow recorded | Manual/revision, file formats and input specifications |
| INV-02: Historical research | Partial: primary claims and critical account located | Jones report and underlying investigation review |
| INV-03: Hardware characterization | BLOCKED — MEASUREMENT REQUIRED; laptop observation recorded without electrical inference | Analog Output Characterisation protocol, qualified reviewer/equipment and load-defined results |
| INV-04: Mobile platform | PARTIALLY ANSWERED: file milestone and shared-engine/UI/adapter direction confirmed; official platform capability documented | Framework/capability decisions, identified phone/DAC tests and POC evidence |
| INV-05: Hardware boundary | PARTIALLY ANSWERED: frequency/amplitude distinction and commercial DAC/ESP32/external-DAC options documented | Measure load/output needs; no amplifier or custom hardware requirement established |
| INV-06: Safety review | Pending | Qualified bench setup and hazard review |
| INV-07: Prototype implementation | PARTIALLY ANSWERED: renderer evidence plus uncommitted local connected preview; see audit | Review/acceptance, human reproduction, complete release workflow and target-device verification remain |
| INV-08: Licensing | GPL-3.0-only software / CC-BY-SA-4.0 original docs merged in PR #4 | Dependency review during implementation; hardware/third-party rights separate; no AGPL change adopted |
| INV-09: Lists/software | Partial: actual list structure and provenance inspected | Rights, normalization rules, neutral import schema, software/export checks |

Remaining investigation requirements are tracked separately from authorization for the reduced software scope. See the [file-only decision](Development-Readiness.md#file-only-prototype-decision).

## Next practical work

For the desktop track, the next evidence milestone is laptop sound-card output followed by a compatible USB-C DAC, using identical fixtures and reviewed electronic loads. Follow the [desktop measurement plan](../Desktop-Player.md#short-manual-lab-verification-plan); record physical results separately from passing software tests. Generation, playback and future external hardware interfaces remain independent, so hardware design does not block software work. Use measured results to decide whether additional hardware or a different desktop audio layer is necessary.

This is now formalized as [OpenWave Analog Output Characterisation](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation), the single next Portable hardware research milestone. Optional ESP32 and independently safety-reviewed Electro-Med comparisons follow their own entry gates; they do not block the laptop/DAC baseline.

1. Review the renderer and existing uncommitted connection work against the [service contract](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Service-Contract.md), preserving branch/PR policy and independent release verification. No commits or publication are part of this documentation task.
2. Reuse/review the implemented desktop `AudioOutput` contract for mobile capability validation; assign Android/USB-C iPhone/DAC/instrument identities before choosing native/mobile integration. See POC phase 0.
3. Obtain browser/mobile/device results and independent review before any relevant release. Cloud CI remains deferred; local checks are compulsory and remote checks must not be labelled passed while blocked.
4. Re-estimate funding/maintenance separately for backend operation, native adapters, physical testing and eventual distribution. No new budget or hardware purchase is approved here.

Historical reconstruction and an exhaustive player-format matrix need not prevent a generic export prototype if the maintainer records that reduced scope and the applicable readiness criteria are met.

## Enterprise architecture review — 23 October 2026

A [current implementation and readiness audit](../Enterprise-Architecture-Audit.md) now reconciles the existing TypeScript prototype with the proposed catalogue, independent IAM, mobile/admin clients and cloud-neutral operations. [ADR-004](../ADR-004-Enterprise-Evolution.md) records technology/module candidates; [ADR-005](../ADR-005-Offline-Generation.md) exposes the local-generation versus backend-only execution conflict. Full-product verdict: **NOT READY — ARCHITECTURAL GAPS** pending owner decisions, not permission to start development. New E-Q01–E-Q12 supplement existing investigation IDs; no physical/medical question is closed.

The prior approved concept v0.2 pages were published separately from accepted main commit `d9e2d51` to wiki commit `a4b36b6`. Hosted PR #9 quality jobs did not start because GitHub reported account billing lock; local documentation checks were separate. This enterprise review changes documentation only and remains uncommitted/unpushed. Descriptive branch naming is now required; historical Git commits/PR records and numerical evidence are preserved.

## Architecture gap fixes — 23 October 2026

The six review gaps now have explicit proposed rules: separate release gates/backend-first delivery, identity-bound private cache/outbox and logout behaviour, a programme/engine/WAV package binding, a bounded API/Node worker protocol, and source/entry/programme withdrawal propagation. See the [closure register](../Enterprise-Architecture-Audit.md#review-gap-closure--23-october-2026). Local native generation still needs owner/runtime approval for R4; physical measurements and implementation tests remain outstanding. Documentation fixes do not mark any proposed capability implemented. No commits, pushes, migrations, packages or application changes accompany this follow-up.
