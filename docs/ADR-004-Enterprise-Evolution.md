# ADR-004: modular enterprise evolution and technology candidates

23 October 2026. **PROPOSED ARCHITECTURE — owner review pending.** Trigger: enterprise architecture master task [S57]. Documentation authorization is not implementation approval. See the [baseline](Enterprise-Architecture.md) and [readiness audit](Enterprise-Architecture-Audit.md).

## Context

The repo has a TypeScript/Vite client, a pure TypeScript waveform domain and local Node/SQLite/file/worker adapters. Some are uncommitted working-tree implementation. It has no central catalogue, OIDC, .NET backend, PostgreSQL deployment, containers or administration application. Existing ADR-001 through ADR-003 and compulsory tests remain effective for current implementation.

## Proposed position

| Topic | Position for review | Consequence / gate |
| --- | --- | --- |
| Business backend | Start with a modular monolith; isolate render execution in workers | Logical domain ownership without automatic network-service proliferation |
| Clean Architecture / DDD | Domain/application ports inward, infrastructure outward; explicit catalogue/programme/profile/rendering boundaries | Enforce through code review, architecture tests and owned transactions when implemented |
| ASP.NET Core | Preferred candidate, supported .NET LTS; .NET 10 support reviewed [S58] | Compare against existing TypeScript before choosing. No mandatory rewrite, new project or dependency |
| Shared engine | Keep authoritative TypeScript implementation and conformance rules | If .NET selected, retain a bounded Node worker integration until an approved single-engine portability strategy exists |
| Central database | PostgreSQL preferred candidate; SQL Server and existing SQLite evaluated in data design | No database/migration created. Choose after operational/licensing/adapter and recovery review |
| IAM | Independent OIDC/OAuth capability; profiles and catalogue permissions stay OpenWave-owned | Provider decision remains open; no passwords in business tables |
| Mobile | Principal TypeScript UI plus platform audio adapters | React + Capacitor is a preferred candidate subject to reuse costs and capability proof; React migration not automatic |
| Offline local generation | Target requirement conflicts with current execution policy | ADR-005 remains a blocking decision, not an adopted exception |
| Hosting | OCI/container/configuration/telemetry/storage contracts, simple self-hosted profile first | No cloud account, managed service or Kubernetes requirement |

These are proposals, not selected production technologies. The target expands ADR-001's original no-accounts/no-catalogue milestone without rewriting its history: the earlier exclusions describe the reduced prototype; catalogue/IAM are future modules, separately authorized only after review. Sine-only mobile POC and desktop v0.4 remain distinct from future catalogue programme scope.

## Alternatives and review criteria

Retaining Node/TypeScript has immediate engine reuse and one-language maintenance; adding .NET may fit team/ecosystem preferences but adds migration and interprocess contracts. Microservices add deployment/consistency/on-call costs without demonstrated need. SQL Server may fit an existing operator/team, but no such dependency appears in the repo; evaluate supported OS/driver, image and licensing requirements before selection. Provider-specific infrastructure may be optional adapters, never a domain dependency.

Owner approval must resolve backend/database choice, offline engine execution, initial IAM provider/deployment model, source rights, launch scope and funded operational ownership. Preserve reviewed PRs, test gates and unchanged GPL-3.0-only/CC-BY-SA-4.0 licences. This review neither installs software nor commits/pushes its documentation.

## Concrete boundary follow-up — documentation only

The [release matrix](Release-Readiness.md) separates R1 desktop, R2 catalogue, R3 mobile retained playback, R4 local generation and H1/H2 physical work. Initial delivery keeps backend generation; R4 remains a separate owner/runtime gate. The proposed [worker protocol](Render-Worker-Contract.md) defines the .NET/Node bridge if a migration is chosen, with one durable job owner, immutable input, attempt fencing and completion/publication rules. [Programme Package v1](Programme-Package-Contract.md) binds published settings/engine identity to WAV bytes; it is not an implemented new sequence endpoint. No choice of .NET, native runtime or dependency is silently adopted.
