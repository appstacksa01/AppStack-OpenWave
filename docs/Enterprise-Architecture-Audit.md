# Enterprise architecture alignment audit and implementation readiness

23 October 2026. **Documentation-only review; owner approval required before further implementation.** Baseline accepted repository commit: `d9e2d51996abfe5f015851ab5dec3dea6c1fefdc`. Existing uncommitted desktop/service code, tests, tooling and artwork were preserved. The enterprise review itself creates no code, database/migration, firmware, dependencies, infrastructure, application configuration, deployment, commit or push. Earlier approved wiki publication is a separate completed action, described below.

## A. Current implementation assessment

The discovery inventory covers tracked and untracked project files, excluding ignored dependency/build/private runtime directories. The working tree and accepted `main` are different: the accepted sine renderer and documentation are merged; service/editor/live-player/new-waveform work remains local. A developer must not infer shipped functionality from the target diagrams.

| Capability / delivery state | Architecture classification | Source and verification boundary |
| --- | --- | --- |
| TypeScript/Vite DOM web UI and desktop integration — implemented with prior local tests | VERIFIED IMPLEMENTATION within recorded software scope | `apps/frontend/src/main.ts`, `sequence-editor.ts`, `connect-export.ts`, `desktop-player.ts` and corresponding tests; [Desktop Player](Desktop-Player.md) records 121 frontend/186 backend tests. Current code includes uncommitted files; not a release or native device result |
| Pure mathematical engine/PCM16 WAV export — implemented and digitally verified for recorded fixtures | VERIFIED IMPLEMENTATION | `apps/backend/src/domain/sequence.ts`, `waveform.ts`, `wav-encoder.ts`, `application/render-export.ts`; [64-case report](verification/desktop-player-initial.json) and independent `tooling/verify-wav.py`. All six recorded engine/checker hashes matched during this review; original 36 sine fixture identity preserved |
| Backend processing separation — implemented local process wiring; incomplete operational verification | VERIFIED IMPLEMENTATION for inspected boundary; INVESTIGATION REQUIRED for failure/release gates | `tooling/dev-backend.mjs`, `export-worker.mjs`, `live-process.mjs`, `live-renderer.mjs`; `tooling/live-process.test.mjs` and desktop guide record real-process streaming checks, not full deployment supervision |
| Local versioned HTTP API, SQLite sessions/jobs and private file artifacts — implemented with prior tests | VERIFIED IMPLEMENTATION for local contract; partially implemented service acceptance | `adapters/export-http.ts`, `sqlite-export-store.ts`, `file-artifacts.ts`, application ports and adapter tests; [Service Contract](Service-Contract.md) lists remaining settings/retention/access/recovery gaps |
| Browser audio port, local WAV loading and route/error/mute lifecycle — implemented software scope | VERIFIED IMPLEMENTATION; physical output BLOCKED | `apps/frontend/src/audio-output.ts`, `browser-audio.ts`, `wav-file.ts`, their tests and desktop guide; chooser support is feature-detected, no named DAC measured |
| JSON sequence save/load and unsaved-change protection — incomplete | INVESTIGATION REQUIRED; partially implemented editor | `sequence-editor.ts` and [desktop/development gaps](Development.md); do not describe all signal-specification workflow acceptance as completed |
| Native Android/iOS, offline catalogue cache and local generation — documented but not implemented | PROPOSED ARCHITECTURE / DECISION REQUIRED | No native projects, React/Capacitor dependency, mobile adapter, PWA manifest/service worker or runtime found in inventory; ADR-002 and ADR-005 distinguish targets |
| Central catalogue, import pipeline, programmes/profile persistence and admin portal — proposed only | PROPOSED ARCHITECTURE | No catalogue models/routes/importer/database found. Existing SQLite tables are `jobs`, `sessions`, `submissions`; they are not a central research catalogue |
| OIDC, access-token policies and MFA integration — absent | PROPOSED ARCHITECTURE / DECISION REQUIRED | Current anonymous HttpOnly owner sessions in HTTP/SQLite code are not IAM; [identity design](Identity-and-Security-Architecture.md) is a target |
| .NET/PostgreSQL/cloud/containers/health/OpenAPI/telemetry — absent in application inventory | PROPOSED ARCHITECTURE / DECISION REQUIRED | Root/app manifests are npm/TypeScript, no .NET project, PostgreSQL driver/migration, Dockerfile/Compose, IaC or OTel instrumentation; no health route in `export-http.ts` |
| Hardware concept v0.2 — documented proposal; no validated implementation | FEASIBLE BUT UNVERIFIED / BLOCKED | [Portable Concept](wiki/Portable-Concept.md), INV-03/05/06 and question register: UAC DAC baseline, optional battery, no controller dependency, no approved body-contact output |
| CI tooling — configured; current hosted execution blocked | BLOCKED | `.github/workflows/quality.yml` declares Node 22.20/24 checks. PR #9 check annotations state jobs did not start due to account billing. No paid CI change or pass claimed |

The existing coverage-summary artifacts show 100% for the four standard coverage metrics, and Vitest configs enforce 100% executable-app thresholds. These are prior artifacts/settings, not fresh full-suite results for this review. No runtime test, application build, dependency install or database operation was performed. Hash matching narrows numerical provenance; it does not verify physical output or every uncommitted adapter against a new release.

## B. Documentation inventory

Reviewed repository structure, README, AGENTS, CONTRIBUTING, LICENSING and unmodified licence texts. Technical inventory: Architecture/ADR-001; ADR-002/003; Coding Standards; Development; Service Contract; Backend Renderer; Desktop Player; Mobile Research Audit; Portable Hardware Research Review; Funding and Maintenance; both verification JSON records. Source/contract/test/build/workflow files in A were inspected without modification.

Wiki inventory and review groups:

| Group | Existing pages |
| --- | --- |
| Navigation/scope/progress | Home, _Sidebar, Project-Scope, Research-Progress, Findings-and-Uncertainties, Development-Readiness, Research-Entry-Template |
| Historical/source/list/software evidence | Historical-Research, Source-Library, Frequency-List-Review, Software-and-Supplier-Research, Audio-Sample-Analysis, Audio-Format-Research |
| Numerical/software verification | Signal-Specification, Signal-Verification-Plan, Desktop-Player |
| Mobile/portable | Mobile-Capabilities, Mobile-Question-Register, Mobile-POC, Portable-Concept, ESP32-S3-Investigation |
| Physical engineering | Existing-Machine-Investigation, Hardware-and-Electrical-Safety, Test-Equipment-Research, Frequency-and-Amplitude |

Research sources retain their inspected/located limitations. This architecture audit does not newly verify a therapeutic list, historical mechanism, source redistribution right, hardware characteristic or legal compliance.

## C. Documentation changes and navigation

Added [Enterprise Architecture](Enterprise-Architecture.md), [Catalogue and Data Architecture](Catalogue-and-Data-Architecture.md), [Identity and Security Architecture](Identity-and-Security-Architecture.md), [Deployment and Operations](Deployment-and-Operations.md), proposed [ADR-004](ADR-004-Enterprise-Evolution.md), unresolved [ADR-005](ADR-005-Offline-Generation.md) and this audit. These fill missing domains rather than reorganize code or replace the research notebook.

The review follow-up also adds [Programme Package Contract](Programme-Package-Contract.md), [Render Worker Contract](Render-Worker-Contract.md) and [Release Readiness](Release-Readiness.md), making ten new documents across the review and gap fixes. Updated README/index links, contribution branch naming, existing architecture/mobile/service/development/funding boundaries and applicable wiki scope/capability/question/readiness/source/navigation pages. Historical audits remain snapshots, with branch-name prose simplified and commit provenance preserved.

The ten new files are linked above. The 19 existing documents updated are:

| Location | Files |
| --- | --- |
| Repository root | `README.md`, `CONTRIBUTING.md` |
| Technical documentation | `docs/ADR-002-Mobile-Playback.md`, `docs/Architecture.md`, `docs/Coding-Standards.md`, `docs/Development.md`, `docs/Funding-and-Maintenance.md`, `docs/Mobile-Research-Audit.md`, `docs/Service-Contract.md` |
| Wiki research/readiness | `docs/wiki/Development-Readiness.md`, `docs/wiki/Frequency-List-Review.md`, `docs/wiki/Mobile-Capabilities.md`, `docs/wiki/Mobile-Question-Register.md`, `docs/wiki/Portable-Concept.md`, `docs/wiki/Project-Scope.md`, `docs/wiki/Research-Progress.md`, `docs/wiki/Source-Library.md` |
| Wiki navigation | `docs/wiki/Home.md`, `docs/wiki/_Sidebar.md` |

## D. Enterprise architecture assessment

The current domain/application/adapters separation and pure engine are useful foundations. SOLID and compulsory tests are documented decisions, not proof of enterprise readiness. A proposed Clean Architecture modular monolith owns research, catalogue, programmes, profiles and rendering behind versioned application/API contracts. Independent IAM does not require a custom identity microservice. API and worker are distinct execution roles; schema/module boundaries are logical. Service extraction needs measured isolation/scaling/team/trust reasons plus consistency and operations capacity.

## E. Database and API architecture

[Data Architecture](Catalogue-and-Data-Architecture.md) defines logical schemas/entities, ownership, source/original-text preservation, tagged values/ranges/sweeps, immutable revisions, complete programme steps, constraints/index candidates, publication/audit workflow and versioned migration/recovery strategy. PostgreSQL is preferred, not installed; SQL Server and SQLite trade-offs are explicit. No source records or missing playback settings were invented. A lawful source copy/rights review is required: the supplied PPTX is local, not repository input.

Proposed catalogue/programme/profile/admin/sync/health contracts are separate from existing exports/live URLs. Define OpenAPI, pagination/filter limits, consistent errors, ownership/permissions, revision preconditions, idempotency and compatibility before implementation. Existing anonymous sessions and response envelopes are not silently replaced.

## F. Identity and user management

[IAM/Security](Identity-and-Security-Architecture.md) separates provider credentials/MFA/lifecycle/tokens, OpenWave profile data and application review/publication permissions. Stable identity is issuer+subject, with explicit account linking and provider-migration planning. Compare self-hosted Keycloak, managed OIDC and enterprise IdP against the same security/portability/operation requirements. Mobile uses standard external-browser authorization with PKCE; native secret storage, API access-token validation and policy tests are mandatory future work.

## G. Mobile architecture

The current UI is plain TypeScript, so React is a migration, not an existing dependency. React + TypeScript + Capacitor is the preferred candidate to evaluate; direct wrapping of the existing UI is a reuse comparator. ADR-002 compares PWA, hybrid, React Native and Kotlin/Swift, and now documents snapshot/revision/hash caching, tombstones, offline files, outbox/conflicts and native route/lifecycle tests. No continuous API connection is allowed for retained valid playback. Full local WAV generation remains blocked by the execution-policy/runtime decision in ADR-005; it is not disguised as implemented offline support.

## H. Cloud portability

[Deployment and Operations](Deployment-and-Operations.md) defines OCI artifacts, configuration/secret contracts, PostgreSQL and artifact adapters, OIDC/OTLP, networking/health, versioned migrations, observability, backup/restore and provider-specific IaC boundaries. Cloud-neutral business logic can be hosted locally/self-hosted or in Azure/AWS/GCP/private infrastructure; actual portability must be tested. No provider account, Kubernetes, service mesh or microservice fleet is mandated.

## I. Open-source installation and governance

The DEVELOPMENT, SELF-HOSTED and ENTERPRISE profiles are targets with explicit absent artifacts. Clone/configure/Compose-up is not a working OpenWave quick start today. Fresh installation needs pinned images/config/sample environment, secure identity bootstrap, persistent storage, migrations, TLS, smoke/upgrade/backup/restore tests and supportable platform versions. Existing npm development instructions remain the current path, not independently fresh-host verified in this review.

| Governance item | Inventory result / next action |
| --- | --- |
| Licence, README, contribution process | Present; GPL-3.0-only software / CC-BY-SA-4.0 original docs unchanged; third-party/hardware rights separate |
| CODE_OF_CONDUCT.md | Absent; owner must select/adopt policy and enforcement contacts |
| SECURITY.md / disclosure process | Absent; establish a private reporting route, supported versions and response ownership before public service launch |
| CHANGELOG.md / release policy | Absent; package versions are 0.0.0, not a support commitment; define release/schema/engine/mobile compatibility and deprecation policy |
| Dependency rights/security | Lockfile and licence policy present; no complete SBOM/scanning/remediation policy verified; target NFR-06 |
| Support/funding | Funding/maintenance proposal exists; funded operations, support windows/on-call and independent review ownership unconfirmed |
| Templates | PR template present; issue templates absent; add research/import/bug/security routing after owner policy review |
| CI/release gates | Quality workflow present; hosted jobs billing-blocked; ruleset enforcement and release provenance not established by this review |
| Branch naming | Descriptive `docs/`, `research/`, `feature/`, `fix/`, `chore/`; current local branch renamed and fully merged/stale old references removed. Historical Git commits/PR records are not rewritten |

No governance policy, licence or private contact was invented or silently adopted. Missing documents are scoped future contributions, not permission to block research on an imagined policy.

## J. Hardware architecture

Concept v0.2 remains under technical review: phone UAC playback to an unselected DAC and laboratory loads; optional power only after load/supply assessment. ESP32/AD9833 and an amplifier are not baseline requirements. Future output module/electrodes remain unspecified and excluded. Electro-Med photographs do not establish gain/current/isolation/protection. Keep INV-03/05/06 and size/mass/charging questions open. Status/physical controls and rechargeability are target items for requirements review, not circuitry designed here.

## K. Contradictions and naming reconciled

| Earlier wording / conflict | Updated position and rationale |
| --- | --- |
| Development introduction said playback adapters absent despite desktop implementation | Corrected to browser adapter exists; native mobile/PWA absent, with direct implementation evidence |
| Sine-only/file-only milestone read as permanent full-product scope | Retained historical milestone and desktop v0.4; enterprise catalogue/IAM/admin/offline targets explicitly proposed |
| Shared engine interpreted as running on every client | One implementation/rule set retained; current backend execution separate from proposed native runtime decision |
| Local mobile generation target versus mandatory backend synthesis | Explicit blocking ADR-005; no silent browser/native exception or duplicate numerical engine |
| ASP.NET/React/PostgreSQL preferences interpreted as installed technologies | Labelled candidates, migration/reuse implications documented; existing TS/Vite/SQLite remains factual |
| Rechargeable accessory interpreted as mandatory battery | Optional power budget first, as v0.2 requires; no capacity/topology selected |
| ESP32 feasibility interpreted as controller requirement | Retain research, exclude from baseline unless a demonstrated need justifies reopening |
| Catalogue association interpreted as complete programme or medical evidence | Separate research record, explicit programme settings/renderability and evidentiary status |
| Earlier generic framework/branch labels | Descriptive branch names now required; removed obsolete tool-specific branch literal from prose without changing commits or measured report hashes |

The prior decisions are linked, not silently erased. Proposed ADRs cannot supersede an adopted execution rule without owner review. This is one consistent current-versus-target baseline, not a claim that every target choice is resolved.

## L. Outstanding decision and investigation register

New E-Q IDs supplement, not replace, INV-01–09, M-Q01–29 and P-D01–08. All are open for the stated scope; next action and evidence gate are explicit.

| ID / question | Classification | Owner decision or evidence required before the affected work |
| --- | --- | --- |
| E-Q01 Local generation execution and one-engine runtime? | DECISION REQUIRED / BLOCKED for R4 only | R1–R3 retain backend generation/retained playback. Owner approves a scoped policy amendment and proven runtime/resource/numerical plan before R4; ADR-005 |
| E-Q02 Retain TS API or migrate to ASP.NET Core LTS? | DECISION REQUIRED for migration | Retain the existing TS API until a migration is chosen and passes the proposed worker protocol, team/operations comparison and reversible slice; no blanket rewrite |
| E-Q03 PostgreSQL/driver/ORM/migrations and local jobs? | DECISION REQUIRED | Select supported versions/tooling, schema ownership, transaction/index/queue strategy and upgrade/restore plan; SQLite state disposition |
| E-Q04 IAM provider and web sign-in composition? | DECISION REQUIRED | Self-host/managed/enterprise comparison, secure bootstrap, MFA, issuer/subject linking, token/key/revocation and recovery tests |
| E-Q05 Public-read, private cache and offline entitlements? | DECISION REQUIRED for affected R2/R3 features | Proposed identity-bound namespace/replay/logout rules now explicit. Owner approves public-read/private entitlement scope and proves storage/deletion/revocation behaviour before offering it |
| E-Q06 Lawful versioned source/input and import rights? | INVESTIGATION REQUIRED / BLOCKED for actual ingestion | Owner supplies authorized source revision/terms; validate original text/units/ambiguities without inventing records |
| E-Q07 Programme completeness, sweeps and publication roles? | DECISION REQUIRED | Versioned required settings, source versus user authorship, unsupported sweep/range rules, reviewer/publisher separation and retraction semantics |
| E-Q08 Mobile framework/native capabilities? | FEASIBLE BUT UNVERIFIED / DECISION REQUIRED | Existing-UI versus React migration comparison, plugin/runtime maintenance, phone/OS/DAC/storage/lock/route matrix and signing/store requirements |
| E-Q09 Deployment/workload/SLO and recovery budgets? | DECISION REQUIRED | Define release profiles, platform support, resource/concurrency targets, RPO/RTO/retention and operators; no arbitrary SLA |
| E-Q10 Governance/security/privacy/CI operations? | INVESTIGATION REQUIRED / BLOCKED for public release | Disclosure/support roles, POPIA assessment, dependency rights/security gates, independent review, viable CI without assuming paid approval |
| E-Q11 Analog/power/output requirements? | BLOCKED — measurement gate | Qualified laptop/DAC baseline, phone-power/charging review and separate safe Electro-Med protocol; existing hardware IDs retained |
| E-Q12 Architecture approval and funding/maintenance ownership? | DECISION REQUIRED | Owner approves target/ADRs/scope and names funded maintainers/reviewers/operations responsibilities before implementation |

More detailed unknowns are in the data constraints/API contracts, NFR-01–15, mobile POC, existing historical/source rights investigations and power/output register. Their lack of results is recorded; no theoretical feasibility closes them.

## M. Readiness verdict

**NOT READY — ARCHITECTURAL GAPS** for the complete enterprise/mobile/offline target, with scope-specific verdicts in [Release Readiness](Release-Readiness.md). R1 desktop software is **READY WITH DOCUMENTED CONDITIONS** for a separate implementation-review increment, not accepted release. R2 catalogue and R3 mobile have their own unmet composition/rights/contract/deployment/device gates. R4 local generation alone is blocked by the execution-policy/runtime decision. H1 measurements gate physical compatibility claims; future H2 body-contact engineering is outside these software scopes and must not become their accidental prerequisite.

Documentation is ready for owner review as an aligned **current implementation plus proposed target**. Owner-approved, narrowly scoped future increments may proceed only after their relevant decisions, contracts and test criteria are agreed; this audit does not authorize development. No claim of production security, enterprise readiness, supported self-hosting or safe human contact is made.

## N. Recommended development sequence — do not start here

1. Owner reviews this baseline, ADR-004/005, E-Q01–12 and the independent release matrix. Resolve only the decisions required by the chosen increment; R4 execution or H2 body-contact work does not block unrelated R1–R3 scopes.
2. Preserve/independently review the existing service/player work as a separate implementation contribution with compulsory tests; close actual acceptance/configuration gaps without duplicating the engine.
3. Define OpenAPI, complete programme/source schemas and authorization/publication contracts; obtain lawful synthetic/source fixtures and version/migration policy.
4. Implement the chosen modular backend/profile/IAM boundaries and database increment with contract/migration/security tests; use a bounded existing-engine worker integration if .NET is selected.
5. Deliver the simplest reproducible self-hosted profile, secure configuration, telemetry and tested backup/restore/upgrade before claiming public deployment support.
6. Validate the shared UI/mobile playback/cache/auth adapter POC on named Android/USB-C iPhone/DAC combinations. Implement local generation only after ADR-005 approval and conformance evidence.
7. Add catalogue administration/import/review/publish/retract workflows with audit and provenance; do not auto-convert lists into programmes or therapeutic claims.
8. Complete independent laptop/DAC/power measurements in parallel where qualified resources exist. Keep future body-contact hardware as a separately reviewed workstream, never an app-release shortcut.
9. Load-test and measure operational needs before adding horizontal scale, microservices, multi-region or Kubernetes-specific scope.

## Diagrams and verification record

Required diagram coverage: enterprise context/logical/backend in Enterprise Architecture; IAM in Identity and Security; data/ownership in Catalogue and Data; mobile/API/offline in ADR-002; shared engine/playback in ADR-005; portable software/hardware in Enterprise Architecture plus the existing functional v0.2 diagram; self-hosted and cloud-neutral deployment in Deployment and Operations. All target elements are labelled proposed/unverified and current code is distinguished.

Initial documentation checks passed for local targets/heading anchors, source IDs, tables, fenced blocks, merge markers and whitespace. That pre-edit comparison found only seven new and 19 updated Markdown documents; the gap follow-up adds the three contracts linked above. No application, test, dependency, infrastructure, configuration, licence text or recorded-result files change in either documentation task. All six recorded engine/checker source hashes still match, and review HEAD remains the accepted baseline commit. No new commit/push occurred for this enterprise review; its index is unstaged. Current local/remote branch references have no old tool-specific prefix; historical commits/PR titles remain intact.

The initial manifest is `.openwave/enterprise-review-validation.json`; its 48 Markdown files, 438 local links/anchors, 76 tables, 21 fenced blocks and 69 source IDs describe the pre-follow-up corpus. Updated follow-up results are recorded below. The ten requested diagram categories are covered across 13 total Mermaid blocks, including retained earlier diagrams. They received source/notation review, not a renderer run. No application/runtime suite or fresh hardware result is claimed. The earlier concept wiki publication completed separately at `a4b36b6`; its remote branch hash and all 25 source-derived page hashes were verified. Public rendering could not be independently fetched through the web tool, so no browser-render test is claimed.

## Review gap closure — 23 October 2026

| Review gap | Documentation resolution | Remaining evidence / boundary |
| --- | --- | --- |
| 1. No approved local mobile execution model | ADR-005 now explicitly recommends backend generation and retained R3 playback first; R4 is a separate blocked scope | No native runtime invented or AGENTS exception adopted; owner/runtime approval and conformance required only before R4 |
| 2. Account-switch/outbox ambiguity | IAM specifies deployment/profile/issuer/subject namespace, owner-scoped operation identity, logout discard warning, callback invalidation and mismatch-blocked replay | A → logout → B and late A callback tests required before private R3 sync; no implementation claimed |
| 3. Missing programme/audio binding | Package v1 defines required manifest fields, canonical programme/sequence distinctions, engine/build identity, trusted manifest digest, exact WAV bytes/metadata, bounds and failure/promotion rules | Contract/canonicalization/native integrity capability tests and owner approval required; current raw WAV loader is not relabelled verified |
| 4. Unspecified .NET/Node worker bridge | Worker v1 defines supervised process messages, single durable owner, immutable snapshot, attempt fencing, cancellation/publication/recovery and acceptance cases | Retain existing API until a chosen migration proves real executor/independent-WAV and failure tests; no new worker service |
| 5. One readiness verdict spans unrelated work | R1/R2/R3/R4 and H1/H2 have explicit scope, dependencies and acceptance records | No release approved; future body-contact design is never a software prerequisite |
| 6. Withdrawal consequences unclear | Data design defines reason-specific source/entry/programme dispositions, reverse dependency review, admission/claim/publication checks and atomic sync/quarantine handling | Offline recall limits remain explicit; qualified rights decisions and race/reconnect tests are required |

These six documentation gaps are addressed with concrete proposed rules. Owner approvals, implementation and acceptance evidence remain open where specified; they are not converted into VERIFIED IMPLEMENTATION by the fixes.

Follow-up validation passed across **51 Markdown files, 477 local links/anchors, 84 tables, 21 fenced blocks, 13 Mermaid source blocks and 71 source IDs**, including whitespace, fence/table structure, source IDs and merge markers. Sixteen existing documents changed and three were added in this follow-up; the complete enterprise review now has ten new documents plus its original 19 updated documents. The per-file comparison confirms no application, tests, dependency/configuration, infrastructure, numerical-result or licence changes; HEAD and all six recorded renderer/checker hashes remain unchanged. The follow-up manifest is `.openwave/gap-fix-validation.json`. No runtime tests, renderer execution, native generation, public-wiki publication, commit or push occurred for these fixes.
