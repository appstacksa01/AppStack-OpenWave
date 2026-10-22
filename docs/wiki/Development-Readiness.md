# Development readiness and investigation backlog

All investigations remain open. INV-01 is partially answered by exterior photographs; local audio analysis informs INV-07. These are issue-ready tasks, not created GitHub Issues. Next priorities: obtain the reference manual/file specifications (INV-01), assess software/data sources (INV-09), and define the bench prototype and licensing (INV-07/08). Hardware measurements require INV-06 review first.

See [research progress](Research-Progress.md) for answered questions and evidence by investigation. An actual third-party frequency-list presentation and its source page have now been inspected; this advances INV-09 without resolving reuse rights or complete signal settings. Draft specifications and test plans advance INV-07 but are not passed application tests.

| ID | Investigation | Deliverable and completion criteria | Dependencies |
| --- | --- | --- | --- |
| INV-01 | Document the reference machine — in progress | Electro-Med 235p identified from photos; obtain manufacturer/revision, manual, accepted formats/levels and operating modes; or explicitly adopt generic-generator scope | Model observed; documentation still required |
| INV-02 | Review historical evidence | Annotated Abrams/Rife/later-device records; Jones scan and underlying investigation reviewed; claims distinguished from measurements | Lawful source access |
| INV-03 | Characterize output | Engineer-reviewed bench protocol; load-defined measurements with raw data and uncertainty, or recorded limitation and reduced scope | INV-01; equipment/expertise; INV-06 review before testing |
| INV-04 | Assess mobile platforms — research in progress | Official Android rate/resampling guidance reviewed; finish platform comparison, device matrix and output-route verification | INV-01/03 or generic-generator scope; S07–S09/S22 |
| INV-05 | Define hardware boundary | Hardware necessity, interface/output requirements, disconnect/fault behaviour, phone limitations | INV-03/04; coordinate with INV-06 |
| INV-06 | Review safety and boundaries | Bench review before testing; hazards, expertise, future review requirements; bench-only initial scope | Starts before INV-03 testing; revisit after INV-05 |
| INV-07 | Specify first prototype — draft prepared | Review [proposed file specification](Signal-Specification.md) and [verification plan](Signal-Verification-Plan.md); settle square-wave definition, resource limits, platform and readiness decision. No app tests run. | INV-02–06 with documented scope exceptions |
| INV-08 | Decide licensing | Maintainer chooses software/docs/hardware licenses as appropriate; license texts and contribution rules published; third-party rights checked | Maintainer decision |
| INV-09 | Review existing software and online lists — partial findings | [List structure/provenance reviewed](Frequency-List-Review.md); finish rights, units, ambiguity handling, neutral schema, and software/export verification | S13–S15/S19/S26–S28; no installer execution required |

## Before application implementation starts

- [ ] First release purpose and exclusions agreed.
- [x] Reference model identified from owner photographs: Electro-Med 235p.
- [ ] Revision, file/input specifications and applicable operating mode documented, or generic-generator scope chosen explicitly.
- [ ] Historical evidence reviewed sufficiently to avoid unsupported specifications.
- [x] Draft numeric file-export targets and repeatable verification plan documented.
- [ ] Draft targets reviewed and finalized, including square synthesis, envelope formula, resource limits and output scope.
- [ ] Platform and target devices selected with reasons.
- [ ] Hardware boundary and bench safety plan reviewed by suitable expertise.
- [ ] Acceptance methods, equipment, loads, and uncertainty requirements documented.
- [ ] Appropriate licenses selected and published before implementation contributions.
- [ ] Maintainer records proceed, revise, or defer decision and outstanding risks.

Checked documentation milestones record work actually done; they do not mean the development gate has passed.

Missing evidence leads to further investigation or an explicit scope reduction. A generic bench generator may proceed without historical reconstruction if applicable criteria are met; it must not claim device equivalence.

## GitHub issue template

Use the investigation title and ID above. Include:

- Research question.
- Scope and dependencies.
- Expected deliverable.
- Completion criteria and reviewer.
- Sources, findings, limitations, and notebook pages to update.
- Owner: unassigned. Status: open.
