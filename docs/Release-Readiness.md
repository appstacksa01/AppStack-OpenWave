# Release scope and independent readiness gates

23 October 2026. **PROPOSED delivery plan for owner review; no release or implementation approval.** Resolves the ambiguity of one verdict for unrelated software, enterprise and future body-contact work. Each scope has its own acceptance gate; later scope is not a prerequisite merely because it appears in the long-term vision.

| Scope | Included / excluded | Required gate and current disposition |
| --- | --- | --- |
| R1: Desktop digital bench software | Existing sequence/WAV export and explicit desktop WAV/live playback; no catalogue, accounts, mobile generation or electrodes required | READY WITH DOCUMENTED CONDITIONS for a future implementation-review increment: review/commit existing code separately, reproduce mandatory suites/numerical/process checks and close declared service/UI acceptance gaps before a release. No release accepted here |
| R2: Published catalogue and administration | Provenance-preserving catalogue, complete programme definitions, import/review/publication, identity for protected actions and simple self-hosting; public read can remain anonymous if approved | NOT READY — ARCHITECTURAL GAPS: source rights/input, database/IAM/backend composition, API/package contract adoption, workflow/privacy and deployment/recovery acceptance. Does not require native generation or electrode engineering |
| R3: Mobile retained-file playback and synchronization | Android/USB-C iPhone adapters, verified retained public packages, identity-bound private cache/outbox if offered, route/interruption/lock/offline behaviour | NOT READY — ARCHITECTURAL GAPS: framework/adapter/storage/integrity capability decisions and named-device tests. Custom local generation and a body-contact output module are explicitly excluded |
| R4: New local mobile WAV generation | Optional future device execution of the authoritative engine, separate from retained-file playback | BLOCKED: ADR-005 policy/runtime/portability decision and bounded native conformance/power/storage evidence; retain backend generation until approved |
| H1: Analog DAC verification | Qualified laptop/USB-DAC waveform/load/power measurements supporting named physical compatibility claims | BLOCKED — MEASUREMENT REQUIRED. Can run in parallel with R1/R2; required for any specific physical compatibility assertion, not for digital-file correctness |
| H2: Future body-contact module | Independently specified output, isolation, regulation, fault/protection and intended-use review | Separate unapproved hardware/safety programme. Not a dependency of R1, R2, R3 or R4; no DAC/electrode connection permitted by those scopes |

R1 and R3 are independent increments, not version numbers or a promise that every feature ships together. R3 synchronization of a central catalogue depends on the relevant R2 API/package functions; a narrower imported/local-file mobile playback POC may be reviewed without the entire catalogue/admin release. H1 supports named sound-card/DAC claims; unmeasured devices must be labelled unverified. No software release establishes H2 or medical effectiveness.

## Current recommended baseline

Keep the existing TypeScript engine in backend worker processes. First finish R1 software acceptance; evaluate R3 offline playback of already retained valid files independently of R4. R2 module/API/data/IAM work proceeds only after its owner decisions. Retain the current TypeScript API until a selected .NET migration satisfies the [worker boundary](Render-Worker-Contract.md); preference is not a rewrite requirement.

The local-generation goal remains recorded, not silently removed. Its documentation gap is closed by an explicit delivery boundary: no R1/R2/R3 feature assumes on-phone synthesis. R4 stays blocked until an owner-approved execution amendment and one-engine runtime strategy are evidenced. This task's instruction to fix documentation does not amend AGENTS or authorize native synthesis.

## Release acceptance record

Before accepting an affected scope, record owner, exact scope/features/exclusions, application/API/engine/programme/schema versions, supported platform matrix, checks actually run, unresolved defects, data/rights/security disposition and rollback/support plan. Link raw verification artifacts and an independent reviewer. A documentation link check, catalogue hash or UI plot does not replace numerical, native, physical or security acceptance.

Public-service NFRs apply only when the corresponding public/protected feature is included. Do not require an IdP for R1's loopback bench editor, and do not omit identity/security gates for R2 administration or R3 private-profile sync. Missing source rights must block affected ingestion/distribution, not synthetic-fixture development unrelated to that source. Historical/template numerical reports must never be presented as a new release run.
