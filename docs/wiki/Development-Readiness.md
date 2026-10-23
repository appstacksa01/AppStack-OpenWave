# Development readiness and investigation backlog

The first implementation decision now narrows the software milestone to browser-based WAV export; see the file-only decision below. These are investigation records, not created GitHub Issues. Exterior photographs inform INV-01; local audio analysis informs INV-07. No hardware measurements have been performed, and they still require INV-06 review first.

See [research progress](Research-Progress.md) for evidence by investigation. The reviewed third-party frequency list advances INV-09 without resolving reuse rights or complete signal settings. The v0.3 specification requires backend worker generation, SOLID and frontend/backend unit tests. The initial renderer's [local results](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Backend-Renderer.md) cover unit behaviour and 36 synthetic WAV cases; service/browser and human release verification remain outstanding.

**Current mobile direction:** [M-Q01–M-Q21](Mobile-Question-Register.md) reconcile existing questions without closing whole investigations. The maintainer confirmed one shared engine, one principal TypeScript UI and web/Android/iOS audio adapters in [ADR-002](../ADR-002-Mobile-Playback.md). Framework choice is **DECISION REQUIRED**; INV-04/05 remain **PARTIALLY ANSWERED** and physical verification is **BLOCKED — HARDWARE OR TESTING**. The [audit](../Mobile-Research-Audit.md) records uncommitted preview code/local evidence; [Mobile POC 1](Mobile-POC.md) remains a proposed verification/implementation plan, not passed acceptance.

**Desktop scope extension:** A later explicit maintainer request authorizes [ADR-003](../ADR-003-Desktop-Player.md)'s browser desktop playback and added waveforms in the same backend engine. The [desktop guide](Desktop-Player.md) records software results and outstanding physical/release checks. This supersedes the original no-live/sine-only boundary for desktop implementation; it does not adopt a mobile framework, authorize human-contact hardware, or close INV-03/05/06. The original file-only decision below remains historical traceability.

| ID | Investigation | Deliverable and completion criteria | Dependencies |
| --- | --- | --- | --- |
| INV-01 | Document the reference machine — in progress | Electro-Med 235p identified from photos; obtain manufacturer/revision, manual, accepted formats/levels and operating modes; or explicitly adopt generic-generator scope | Model observed; documentation still required |
| INV-02 | Review historical evidence | Annotated Abrams/Rife/later-device records; Jones scan and underlying investigation reviewed; claims distinguished from measurements | Lawful source access |
| INV-03 | Characterize output | Engineer-reviewed bench protocol; load-defined measurements with raw data and uncertainty, or recorded limitation and reduced scope | INV-01; equipment/expertise; INV-06 review before testing |
| INV-04 | Mobile/platform capability — PARTIALLY ANSWERED | Browser file milestone selected; shared-engine/UI/adapter direction confirmed; define playback contract and capability matrix before framework selection | Record actual browser/phone/OS/DAC identities and results; mobile playback remains unverified |
| INV-05 | Define hardware boundary | Hardware necessity, interface/output requirements, disconnect/fault behaviour, phone limitations | INV-03/04; coordinate with INV-06 |
| INV-06 | Review safety and boundaries | Bench review before testing; hazards, expertise, future review requirements; bench-only initial scope | Starts before INV-03 testing; revisit after INV-05 |
| INV-07 | File prototype — PARTIALLY ANSWERED | Backend-only v0.3 contract adopted; renderer results and uncommitted service/editor preview recorded; review and complete [acceptance](Signal-Verification-Plan.md) | No hardware dependency for file generation; independent release review and complete workflow/service verification remain |
| INV-08 | Original software/docs licensing — ANSWERED — DOCUMENTED | GPL-3.0-only software and CC-BY-SA-4.0 original docs adopted in PR #4; [scope](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/LICENSING.md) and contribution process published | Dependencies, distribution, hardware and third-party assets still require applicable rights reviews |
| INV-09 | Review existing software and online lists — partial findings | [List structure/provenance reviewed](Frequency-List-Review.md); finish rights, units, ambiguity handling, neutral schema, and software/export verification | S13–S15/S19/S26–S28; no installer execution required |

## Broader hardware investigation checklist

The documentation-only [ESP32-S3 review](ESP32-S3-Investigation.md) adds candidate UAC and command paths without selecting hardware or authorizing firmware. The next evidence milestone under INV-03/05/06 is [OpenWave Analog Output Characterisation](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation). [M-Q22–M-Q27 and the change log](Mobile-Question-Register.md#portable-hardware-subquestions--22-october-2026) refine existing questions without closing parent investigations. Local MCU generation needs an explicit ADR-001 amendment and a one-engine portability plan.

The [portable hardware roadmap](Hardware-and-Electrical-Safety.md#portable-hardware-roadmap) compares a USB-C DAC, programmable instrument, documented output modules and custom design. No purchase, connection, module selection or body-contact design is authorized by this research review. Target devices, physical acceptance tolerances and qualified bench setup remain unassigned.

This original checklist remains for the broader bench/device work. The reduced software scope below has an explicit decision rather than claiming all these research questions are resolved.

- [ ] Broader hardware phase purpose and exclusions agreed; the reduced file-only scope is already adopted below.
- [x] Reference model identified from owner photographs: Electro-Med 235p.
- [ ] Revision, file/input specifications and applicable operating mode documented, or generic-generator scope chosen explicitly.
- [ ] Historical evidence reviewed sufficiently to avoid unsupported specifications.
- [x] Numeric file-export contract and repeatable verification requirements adopted; this does not pass their release checks.
- [ ] Broader hardware/output targets reviewed and finalized; square synthesis remains deferred beyond the file-only sine milestone.
- [ ] Platform and target devices selected with reasons.
- [ ] Hardware boundary and bench safety plan reviewed by suitable expertise.
- [ ] Acceptance methods, equipment, loads, and uncertainty requirements documented.
- [ ] Appropriate hardware/design rights and any third-party reuse terms settled before those contributions; software/docs licensing is covered by the file-only decision below.
- [ ] Maintainer records proceed, revise, or defer decision and outstanding risks.

Checked documentation milestones record work actually done; they do not mean the development gate has passed.

## File-only prototype decision

Decision date: 22 October 2026. PR #4 established the licences and original file-only scope; PR #5 adopted backend worker generation and compulsory standards, superseding browser rendering. **Proceed with the file-only prototype in reviewed increments.** Scaffolding and renderer evidence exist, and the working tree has an uncommitted service/editor preview; review remaining acceptance rather than restarting those components. This implementation decision is not release approval or authorization for mobile playback/hardware work.

- Scope: the v0.3 [specification](Signal-Specification.md) and [verification plan](Signal-Verification-Plan.md), using synthetic inputs only.
- Platform: TypeScript browser editor, backend API and separate worker processes; synthesis/encoding never runs in the browser or API request handler. Concrete service contracts, resource defaults and adapters must accompany the service implementation; exact browser/device results are required before release.
- Quality: [SOLID and compulsory frontend/backend unit tests](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Coding-Standards.md); introduce runnable suites/CI with scaffolding, and actual API/worker integration and independent numerical checks as those components are introduced.
- Rights: GPL-3.0-only software and CC-BY-SA-4.0 original documentation; dependency rights reviewed before addition; no imported catalogues/recordings or hardware design contributions.
- Scope exceptions: reconstructing Abrams/Rife circuitry, completing the Jones review, Electro-Med input/file specifications and electrical characterization do not block generic mathematical WAV generation. They remain open and must not be represented as established by this app.
- Safety boundary: this phase creates/downloads digital files, with no live playback, hardware connection or human experiments. Qualified bench review is still required before any later physical testing.
- Remaining release risks: backend job/storage capacity, caller isolation, failure/recovery/cancellation, generation accuracy, browser/network/download behaviour, dependency compatibility and independent reviewer/device availability. Complete verification before release; scope revisions cannot waive compulsory unit tests.
- Funding estimates remain provisional. Implementation authorization does not authorize spending or promise a delivery date.

Missing evidence leads to further investigation or an explicit scope reduction. A generic bench generator may proceed without historical reconstruction if applicable criteria are met; it must not claim device equivalence.

## GitHub issue template

Use the investigation title and ID above. Include:

- Research question.
- Scope and dependencies.
- Expected deliverable.
- Completion criteria and reviewer.
- Sources, findings, limitations, and notebook pages to update.
- Owner: unassigned. Status: open.

## Enterprise implementation gate — 23 October 2026

The [enterprise audit](../Enterprise-Architecture-Audit.md) classifies the full target **NOT READY — ARCHITECTURAL GAPS**. Existing digital code is not a reason to start an unapproved .NET rewrite, catalogue migration or native engine. Owner decisions E-Q01–E-Q12 cover shared-engine execution, backend/database/IAM, lawful source input, mobile/offline capability, governance and deployment/recovery scope; existing INV/M-Q hardware/history/rights questions remain open. The original reduced prototype decisions above retain their historical scope. Review [ADR-004](../ADR-004-Enterprise-Evolution.md) and [ADR-005](../ADR-005-Offline-Generation.md) before future implementation.

## Scope-specific readiness follow-up

Use [Release Readiness](../Release-Readiness.md) to assess R1 desktop software, R2 catalogue, R3 retained mobile playback and R4 local generation separately. H1 measurements support physical claims; H2 future body-contact engineering is not a gate for those software releases. The full enterprise target still has open decisions, while R1 can be reviewed as a narrowly bounded implementation increment with its own acceptance conditions. This is a documentation correction, not release/development approval.
