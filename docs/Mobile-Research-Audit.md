# Mobile architecture and USB-C research audit

22 October 2026. Documentation/research only. No application, dependency or test source was changed by this task. Existing uncommitted connection work and unrelated artwork were preserved. No commit, push, PR creation, public-wiki synchronization, purchase or hardware experiment is part of this task.

**Historical snapshot:** This audit and its documentation-alignment follow-up preceded the maintainer's separate desktop-player implementation request. Its “no code change”, 48-file hash comparison, 74/169 counts and next-task recommendations describe those earlier tasks only. Current implementation/status is in [Desktop-Player.md](Desktop-Player.md) and [ADR-003](ADR-003-Desktop-Player.md). The desktop task now changes code and implements the browser playback contract; it does not retroactively turn this earlier research task into an implementation or authorize mobile/human-contact work.

## A. Documentation and implementation reviewed

| Material | Purpose and findings |
| --- | --- |
| `AGENTS.md`, `CONTRIBUTING.md`, `docs/Coding-Standards.md` | Reviewed-PR policy, SOLID, compulsory frontend/backend tests, no browser/API-handler synthesis, no unmerged wiki publication |
| `README.md`, `docs/wiki/Project-Scope.md`, `docs/Funding-and-Maintenance.md`, `LICENSING.md` | Vision, file-only milestone, original software/docs rights, provisional funding; no portable procurement or paid CI authorized |
| `docs/Architecture.md`, `docs/Service-Contract.md`, `docs/Development.md` | ADR-001 backend workers, proposed API/access/resource limits and scaffolding; older implementation-stage prose required provenance notes |
| `docs/wiki/Home.md`, `_Sidebar.md`, `Research-Progress.md`, `Development-Readiness.md`, `Findings-and-Uncertainties.md` | Existing navigation, INV-01–09 and F/U questions; no hardware measurement completed |
| `docs/wiki/Mobile-Capabilities.md`, `Audio-Format-Research.md`, `Audio-Sample-Analysis.md` | Original platform questions, sampling background and private-file observations; phone/DAC support was untested |
| `docs/wiki/Existing-Machine-Investigation.md`, `Hardware-and-Electrical-Safety.md`, `Test-Equipment-Research.md` | Reference model/labels, unknown electrical characteristics, instrument candidates and qualified bench boundary |
| `docs/wiki/Signal-Specification.md`, `Signal-Verification-Plan.md`, `docs/Backend-Renderer.md`, `docs/verification/backend-renderer-initial.json` | Sine-only numerical contract and independent digital evidence; not live-playback or physical output acceptance |
| `docs/wiki/Source-Library.md`, `Historical-Research.md`, `Software-and-Supplier-Research.md`, `Frequency-List-Review.md`, `Research-Entry-Template.md` | Source provenance, unresolved history/rights and research-record conventions; mobile research does not close these gaps |
| Published repository and local wiki mirror | Public repository page inspected. Live wiki fetch failed; existing local mirror Home was readable but its freshness was not established. Repository `docs/wiki/` was used as the maintained source; no live-wiki alignment is claimed |

At this historical snapshot, the local preview was based on renderer commit `9852bf6`; the local `origin/main` reference was `3e2676b`. The obsolete branch label is omitted following the maintainer's later descriptive-naming policy; commit provenance is unchanged. No fresh fetch or remote merge-state assertion was needed/performed for this task. Source-tree evidence below must not be described as an accepted `main` release.

### What the code actually does

| Layer | Files examined | Established boundary |
| --- | --- | --- |
| Frontend | `apps/frontend/src/main.ts`, `sequence-editor.ts`, `connect-export.ts`, `export-client.ts`, status/tests, HTML/Vite/package config | Plain TypeScript DOM UI, sequence editing, job submission/poll/cancel/download. No React, PWA manifest/service worker, native project, local playback or mobile route adapter |
| Backend domain/application | `domain/sequence.ts`, `wav-encoder.ts`, `job-lifecycle.ts`, `application/render-export.ts`, `run-export-job.ts` and ports/tests | Backend sine validation, exact frame planning, bounded PCM16 encoding and injected job/artifact boundaries |
| Backend adapters/tooling | HTTP, SQLite, file-artifact adapters/tests; `tooling/dev-backend.mjs`, `export-worker.mjs` | Uncommitted loopback HTTP/SQLite/private artifact service with a separately forked worker. Node's SQLite API is experimental in the observed Node 22.20 runtime; this is not a production/mobile deployment |
| Shared/build/checks | `packages/contracts/src/index.ts`, Vitest configs, boundary guard, independent checker scripts, workflow/package scripts | Shared lifecycle types, 100% current app coverage thresholds, browser source-map boundary guard, separate Python WAV reader/reference calculations; no reusable mobile “Core” package yet |

The connected API integration tests use real HTTP/storage adapters and invoke job processing within the test process. The observed local dev run used a separate worker process. This does not amount to automated multiprocess crash/recovery end-to-end coverage. Cancellation, admission and storage tests do not prove all supervisor/production failure behaviours.

### Verification evidence reviewed

- Immediately preceding this research task, `npm run check` passed: formatting, lint, strict types, **74 frontend and 169 backend tests**, both builds and the frontend bundle boundary check. Coverage was 100% statements/branches/functions/lines for executable current app sources; thresholds were not lowered. These are existing local results, not a new mobile test run or remote CI result.
- The committed initial report contains **36 independent synthetic WAV checks**, including maximum exports, with inputs/source/artifact hashes and runtime information. Its source hashes identify the renderer version measured. The report and checker were reviewed; the whole numerical suite was not rerun for documentation edits.
- A preceding desktop in-app-browser session at `127.0.0.1:5174` submitted the default 500 Hz, one-second, amplitude 0.25, 48 kHz mono request; UI progressed from queued to completed (48,000/48,000 frames), and a WAV download completed. The downloaded file was not independently analysed before the user redirected work to this research task. This observation establishes the local UI/worker/download workflow only, not sample accuracy of that download, mobile functionality or hardware output.
- No Android/iPhone/DAC, background/locked-screen, analog frequency/amplitude/distortion, power or Electro-Med test has been run. No second human reviewer has reproduced release checks. Cloud CI remains deferred under the existing no-paid-CI instruction.

## B. Documentation files changed in the original audit and direction follow-up

New files:

1. [ADR-002-Mobile-Playback.md](ADR-002-Mobile-Playback.md): options matrix, recommendation, boundaries, risks and Mermaid diagram.
2. [Mobile-Research-Audit.md](Mobile-Research-Audit.md): audit, evidence, file inventory and deliverable summary.
3. [wiki/Portable-Concept.md](wiki/Portable-Concept.md): portable vision and staged scope.
4. [wiki/Mobile-Question-Register.md](wiki/Mobile-Question-Register.md): 21 traceable questions with classifications, evidence and next actions.
5. [wiki/Mobile-POC.md](wiki/Mobile-POC.md): phased plan, acceptance/evidence requirements and unfilled physical-device matrix.

Updated files:

1. [../README.md](../README.md): current/proposed status and mobile entry points.
2. [Architecture.md](Architecture.md): ADR-001-preserving mobile addendum.
3. [Backend-Renderer.md](Backend-Renderer.md): historical renderer versus later local-preview evidence.
4. [Development.md](Development.md): audit pointer distinguishing original stage from uncommitted preview.
5. [Service-Contract.md](Service-Contract.md): preview versus acceptance/deployment distinction.
6. [wiki/Mobile-Capabilities.md](wiki/Mobile-Capabilities.md): existing investigation expanded, earlier assumptions reconciled.
7. [wiki/Source-Library.md](wiki/Source-Library.md): S09 review and S29–S41 primary mobile references with access date/limits.
8. [wiki/Existing-Machine-Investigation.md](wiki/Existing-Machine-Investigation.md): owner workflow versus missing electrical specifications.
9. [wiki/Hardware-and-Electrical-Safety.md](wiki/Hardware-and-Electrical-Safety.md): four hardware approaches and gated roadmap.
10. [wiki/Audio-Format-Research.md](wiki/Audio-Format-Research.md): file/route/electrical and offline distinctions.
11. [wiki/Project-Scope.md](wiki/Project-Scope.md): future portable phase and unchanged file-only scope.
12. [wiki/Development-Readiness.md](wiki/Development-Readiness.md): investigation/status reconciliation and gates.
13. [wiki/Research-Progress.md](wiki/Research-Progress.md): documented capability versus actual verification and next work.
14. [wiki/Findings-and-Uncertainties.md](wiki/Findings-and-Uncertainties.md): F04/F10/F11 and U01/U03/U04 reconciliation.
15. [wiki/Home.md](wiki/Home.md): stage/navigation.
16. [wiki/_Sidebar.md](wiki/_Sidebar.md): mobile research/architecture navigation.

Application/test/package changes already present at task start belong to the preceding connected-preview task. They are not new changes made by this documentation task. Original artwork remains untouched.

## C. Questions answered

[M-Q01, M-Q04](wiki/Mobile-Question-Register.md) answer platform feasibility: mobile audio generation facilities and compatible USB audio paths are documented, with the actual-device boundary kept open. [M-Q14](wiki/Mobile-Question-Register.md) records existing backend digital WAV evidence, and M-Q20 corrects the original software/docs licensing question using merged project decisions. These are bounded answers, not closure of entire mobile/hardware investigations. The register also identifies partial answers for numerical targets, file formats, sampling and offline operation.

## D. Questions still open

The [register](wiki/Mobile-Question-Register.md) supplies original question, status, evidence gap and next action for every row. Highest dependencies: exact phone/OS/DAC/instrument availability; actual route/clock/level/distortion/continuity; electrical reference output and protection; a qualified load/probing review; supported waveform scope; mobile generation placement; third-party rights and independent release reproduction. Do not mark blocked measurements as feasible-device verification.

## E–F. Architecture recommendation and diagram

[ADR-002](ADR-002-Mobile-Playback.md) compares 17 criteria across Web/PWA, React/Capacitor, React Native and native Kotlin/Swift. Following the audit, the maintainer confirmed one shared OpenWave engine, one principal TypeScript UI and separate web/Android/iOS audio adapters. Capacitor remains a candidate, not a commitment; framework and native-development decisions follow capability validation. React is optional and adds migration. The updated Mermaid diagram shows the principal UI shared by Web/Portable, one backend-executed engine, audio adapters, USB-C DAC, electronic loads and a separate future electrical-output interface.

## G–H. POC, risks and assumptions

[Mobile POC 1](wiki/Mobile-POC.md) defines six phases, evidence gates, unsupported functionality and physical-device rows, all unpassed for Mobile. Risks include OS interruptions/mixing/resampling, route fallback, plugin maintenance, power/clock variation, missing hardware specifications and storage lifecycle. Affordability, deterministic physical output, universal compatibility and Electro-Med equivalence are goals/questions, not findings. There are no human-contact trials or direct DAC/electrode instructions.

## I. Single recommended next development task

The maintainer's follow-up defers native implementation. The single next task is to **specify the shared playback contract and capability-validation matrix**, using the audit findings and identified Android/USB-C iPhone/DAC hardware. Define state, actual-route reporting, background/lock, interruption and USB-loss requirements; map web/platform gaps before selecting Capacitor or native adapters. Any later implementation must preserve one engine/UI and compulsory unit/contract tests. Offline custom generation, live synthesis and electrode hardware remain excluded. No implementation was performed in this research task or its documentation follow-up.

## Documentation checks and publication

Documentation checks are recorded at task completion below. Runtime suites are not substitutes for documentation review and need not be rerun solely for this task. Before any future public-wiki synchronization, review/merge the source and translate repository-relative `../` architecture links to accepted repository URLs using the established publishing process. Do not publish links to unmerged files or overwrite the live wiki from this working tree.

Checks executed for this documentation task:

- Read-only SHA-256 comparison of 48 application, tooling and dependency files against the task-start baseline: **unchanged**. This includes existing uncommitted preview source/tests; no dependency introduced.
- Standard-library documentation checker over all 21 changed/new Markdown files: **195 local file links/anchors resolved**, balanced fenced blocks, consistent table columns, no conflict markers and all referenced source IDs found in the 41-entry library. This checks local targets, not the availability of every historical external URL.
- `git -c core.whitespace=cr-at-eol diff --check -- README.md docs`: **passed**, respecting Windows CRLF line endings without changing repository configuration. Untracked Markdown was included in the separate documentation checker above.
- Existing numerical report parsed successfully: 36 recorded WAV cases. This is report inspection, not a rerun or fresh mobile verification.
- Mermaid diagram reviewed structurally for named components and flow; no Mermaid renderer was installed or run. No new dependency was installed to render it.
- No dedicated Markdown-check script exists in the package scripts; the existing format script targets implementation/tooling rather than these docs. Runtime tests were not repeated for documentation-only edits. Prior runtime results above remain labelled as such.

The public wiki was not modified. No commit or push was made. The maintainer confirmed the shared-engine/UI/adapter direction in a follow-up; framework selection and the POC implementation scope still need evidence and review.

## Documentation alignment review

Following the maintainer's request to review and align the documentation, the current text now consistently distinguishes:

1. **Confirmed direction:** one authoritative OpenWave engine, one principal TypeScript UI and separate web/Android/iOS audio adapters. These local edits have not changed accepted Git history.
2. **Controlling execution rule:** synthesis/encoding remains backend-worker work. Offline playback consumes retained files; offline generation needs an explicit ADR-001 amendment.
3. **Current implementation:** local uncommitted editor/HTTP/SQLite/filesystem/separate-worker preview, not a release or mobile app. Development setup now documents its actual two-terminal commands and data path.
4. **Open platform decision:** Capacitor and native APIs are candidates. Native UI is not an automatic fallback that would authorize a second principal UI. Define the common playback contract and capability-validation matrix before selecting an implementation.
5. **Verification:** original renderer results, later local preview results, required future checks and unperformed physical measurements have distinct labels. Adapter integration tests do not prove full multiprocess/browser/device acceptance.
6. **Governance and funding:** original software/docs licensing and backend architecture are already adopted. Funding and new framework/hardware decisions remain open; review/merge and public-wiki policy are unchanged.

Stale assertions were corrected in place rather than retained behind warning addenda. The service contract now identifies fixed local settings, Node SQLite status, loopback cookie policy, worker-process restarts versus job retries, and the expired-metadata retention gap. None is labelled production acceptance.

Additional files aligned beyond the original 21-file inventory above:

- [../CONTRIBUTING.md](../CONTRIBUTING.md): shared-code/adapters policy and current contribution stage.
- [../LICENSING.md](../LICENSING.md): already-adopted licence status and existing backend coverage; no licence change.
- [Coding-Standards.md](Coding-Standards.md): one engine/UI, adapter conformance and platform-specific tests where implemented.
- [Funding-and-Maintenance.md](Funding-and-Maintenance.md): adopted requirements/licences versus unfunded future platform work; no duplicate-app budgeting assumption.
- [wiki/Signal-Specification.md](wiki/Signal-Specification.md): shared direction leaves the numerical contract/backend boundary unchanged.
- [wiki/Signal-Verification-Plan.md](wiki/Signal-Verification-Plan.md): historical/current results versus incomplete acceptance and future adapter checks.
- [wiki/Frequency-List-Review.md](wiki/Frequency-List-Review.md): adopted file scope terminology, with rights/settings questions still open.

The combined pending documentation set is 28 Markdown files. Final alignment checks passed: **241 local links/anchors**, balanced fences, table columns, whitespace/conflict-marker checks and all source IDs. Git diff whitespace checks passed. A fresh comparison with the audit baseline confirmed **48 application/tooling/dependency files unchanged**. These checks include untracked Markdown; they do not claim every external source URL is live or that Mermaid was rendered. No runtime suites were rerun for prose-only alignment, and no application changes, dependencies, commits, pushes or live-wiki publication are included.
