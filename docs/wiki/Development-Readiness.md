# Development readiness and investigation backlog

All items are open and unassigned. These are issue-ready tasks; they have not yet been created as GitHub Issues. Begin with INV-01, INV-02, and INV-08.

| ID | Investigation | Deliverable and completion criteria | Dependencies |
| --- | --- | --- | --- |
| INV-01 | Identify the reference machine | Reviewed model/revision, external photos and manual references; or explicit generic-generator scope without reproduction claim | Maintainer provides identity information |
| INV-02 | Review historical evidence | Annotated Abrams/Rife/later-device records; Jones scan and underlying investigation reviewed; claims distinguished from measurements | Lawful source access |
| INV-03 | Characterize output | Engineer-reviewed bench protocol; load-defined measurements with raw data and uncertainty, or recorded limitation and reduced scope | INV-01; equipment/expertise; INV-06 review before testing |
| INV-04 | Assess mobile platforms | Requirements-based web/native/hybrid/controller comparison, target devices, output limits, verification proposal | INV-01/03 or generic-generator scope |
| INV-05 | Define hardware boundary | Hardware necessity, interface/output requirements, disconnect/fault behaviour, phone limitations | INV-03/04; coordinate with INV-06 |
| INV-06 | Review safety and boundaries | Bench review before testing; hazards, expertise, future review requirements; bench-only initial scope | Starts before INV-03 testing; revisit after INV-05 |
| INV-07 | Specify first prototype | Numeric signal requirements, routes/devices, tolerances, interruptions, acceptance measurements; maintainer review recorded | INV-02–06 with documented scope exceptions |
| INV-08 | Decide licensing | Maintainer chooses software/docs/hardware licenses as appropriate; license texts and contribution rules published; third-party rights checked | Maintainer decision |

## Before application implementation starts

- [ ] First release purpose and exclusions agreed.
- [ ] Reference identified, or generic-generator scope chosen explicitly.
- [ ] Historical evidence reviewed sufficiently to avoid unsupported specifications.
- [ ] Signal range, waveforms, amplitude representation, timing, tolerances, and interface specified.
- [ ] Platform and target devices selected with reasons.
- [ ] Hardware boundary and bench safety plan reviewed by suitable expertise.
- [ ] Acceptance methods, equipment, loads, and uncertainty requirements documented.
- [ ] Appropriate licenses selected and published before implementation contributions.
- [ ] Maintainer records proceed, revise, or defer decision and outstanding risks.

Missing evidence leads to further investigation or an explicit scope reduction. A generic bench generator may proceed without historical reconstruction if applicable criteria are met; it must not claim device equivalence.

## GitHub issue template

Use the investigation title and ID above. Include:

- Research question.
- Scope and dependencies.
- Expected deliverable.
- Completion criteria and reviewer.
- Sources, findings, limitations, and notebook pages to update.
- Owner: unassigned. Status: open.