# Development readiness and investigation backlog

The first implementation decision now narrows the software milestone to browser-based WAV export; see the file-only decision below. These are investigation records, not created GitHub Issues. Exterior photographs inform INV-01; local audio analysis informs INV-07. No hardware measurements have been performed, and they still require INV-06 review first.

See [research progress](Research-Progress.md) for evidence by investigation. The reviewed third-party frequency list advances INV-09 without resolving reuse rights or complete signal settings. The v0.2 specification settles the first file-export contract; its tests remain planned, not passed.

| ID | Investigation | Deliverable and completion criteria | Dependencies |
| --- | --- | --- | --- |
| INV-01 | Document the reference machine — in progress | Electro-Med 235p identified from photos; obtain manufacturer/revision, manual, accepted formats/levels and operating modes; or explicitly adopt generic-generator scope | Model observed; documentation still required |
| INV-02 | Review historical evidence | Annotated Abrams/Rife/later-device records; Jones scan and underlying investigation reviewed; claims distinguished from measurements | Lawful source access |
| INV-03 | Characterize output | Engineer-reviewed bench protocol; load-defined measurements with raw data and uncertainty, or recorded limitation and reduced scope | INV-01; equipment/expertise; INV-06 review before testing |
| INV-04 | Browser selected for first software milestone | Target browser/device checks required before release; native/mobile audio route investigation remains separate | File-only scope; record actual versions and results |
| INV-05 | Define hardware boundary | Hardware necessity, interface/output requirements, disconnect/fault behaviour, phone limitations | INV-03/04; coordinate with INV-06 |
| INV-06 | Review safety and boundaries | Bench review before testing; hazards, expertise, future review requirements; bench-only initial scope | Starts before INV-03 testing; revisit after INV-05 |
| INV-07 | First file-only specification prepared for approval | v0.2 defines sine generation, timing/fades, limits, JSON and [verification](Signal-Verification-Plan.md); implementation checks and independent release review remain outstanding | Review/merge specification; no hardware dependency for file generation |
| INV-08 | Software/docs licences selected in licensing PR | GPL-3.0-only and CC-BY-SA-4.0 texts and [scope](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/LICENSING.md) published in that change; effective on merge; review dependencies when introduced | Hardware and third-party assets remain separately scoped |
| INV-09 | Review existing software and online lists — partial findings | [List structure/provenance reviewed](Frequency-List-Review.md); finish rights, units, ambiguity handling, neutral schema, and software/export verification | S13–S15/S19/S26–S28; no installer execution required |

## Broader hardware investigation checklist

This original checklist remains for the broader bench/device work. The reduced software scope below has an explicit decision rather than claiming all these research questions are resolved.

- [ ] First release purpose and exclusions agreed.
- [x] Reference model identified from owner photographs: Electro-Med 235p.
- [ ] Revision, file/input specifications and applicable operating mode documented, or generic-generator scope chosen explicitly.
- [ ] Historical evidence reviewed sufficiently to avoid unsupported specifications.
- [x] Draft numeric file-export targets and repeatable verification plan documented.
- [ ] Broader hardware/output targets reviewed and finalized; square synthesis remains deferred beyond the file-only sine milestone.
- [ ] Platform and target devices selected with reasons.
- [ ] Hardware boundary and bench safety plan reviewed by suitable expertise.
- [ ] Acceptance methods, equipment, loads, and uncertainty requirements documented.
- [ ] Appropriate hardware/design rights and any third-party reuse terms settled before those contributions; software/docs licensing is covered by the file-only decision below.
- [ ] Maintainer records proceed, revise, or defer decision and outstanding risks.

Checked documentation milestones record work actually done; they do not mean the development gate has passed.

## File-only prototype decision

Decision date: 22 October 2026. Status: proposed through the licensing/specification pull request; effective upon maintainer approval and merge. **Proceed with the defined file-only implementation after merge**, beginning with the generator and its independent automated verification, then the editor. This is an implementation decision, not a release approval or a claim of passed tests.

- Scope: the v0.2 [specification](Signal-Specification.md) and [verification plan](Signal-Verification-Plan.md), using synthetic inputs only.
- Platform: static TypeScript browser application, with a generator independent of the UI; exact target versions/device results to be recorded before release.
- Rights: GPL-3.0-only software and CC-BY-SA-4.0 original documentation; dependency rights reviewed before addition; no imported catalogues/recordings or hardware design contributions.
- Scope exceptions: reconstructing Abrams/Rife circuitry, completing the Jones review, Electro-Med input/file specifications and electrical characterization do not block generic mathematical WAV generation. They remain open and must not be represented as established by this app.
- Safety boundary: this phase creates/downloads digital files, with no live playback, hardware connection or human experiments. Qualified bench review is still required before any later physical testing.
- Remaining release risks: browser allocation/download behaviour, actual generation accuracy, dependency compatibility and independent reviewer/device availability. Complete the verification plan or approve a documented scope revision before release.
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
