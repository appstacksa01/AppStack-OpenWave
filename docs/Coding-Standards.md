# Mandatory coding and testing standards

Status: proposed for review on 22 October 2026, following the maintainer's requirement for SOLID, compulsory frontend/backend unit tests and server-side heavy processing. These rules apply to all implementation work once merged. No application, test suites or CI gates have been implemented yet.

## SOLID in practice

| Principle | Required application in OpenWave |
| --- | --- |
| Single responsibility | Separate editor presentation, sequence validation, export-job orchestration, sample generation, WAV encoding and storage. A component/controller must not do all of them. |
| Open/closed | Add supported capabilities through focused modules and explicit contracts; avoid scattered waveform/provider switches. Add an abstraction when there is a real change boundary, rather than speculative extension points. |
| Liskov substitution | Implementations of a port must preserve its documented inputs, results, errors and cancellation behaviour. Test alternate adapters against the same contract. |
| Interface segregation | Use small interfaces such as `JobQueue`, `ArtifactStore` and `ExportRepository`; consumers depend only on operations they use. |
| Dependency inversion | Domain/application logic depends on contracts and receives adapters as dependencies. It must not import the UI framework, HTTP server, queue SDK or storage client. |

SOLID applies to frontend and backend. Small pure functions and composition are welcome; inheritance and a class for every function are not requirements. Reviewers must assess actual responsibilities, dependencies and substitutability, not accept a claim that code is SOLID without examining it.

## Code quality

- Use TypeScript strict mode for application code. Treat external data as `unknown` and validate/narrow it at boundaries. Avoid `any`, unchecked assertions and suppressed type/lint errors; any unavoidable interoperability escape needs a local explanation and tests.
- Name values with units (`frequencyHz`, `durationMicroseconds`, `sampleRateHz`); use explicit domain types and centralised limits. Preserve the specification's integer timing and PCM rules.
- Keep modules focused, avoid duplicated business rules, prefer explicit inputs/results and immutable sequence snapshots. Separate dependency wiring from application behaviour.
- Use structured errors with stable codes at API boundaries. Do not swallow failures or present partial exports as complete. Inject clocks, IDs and external adapters where determinism is needed.
- Format and lint consistently using pinned tooling and a committed lockfile. Document runtime/tool versions, setup and commands with the implementation scaffolding. Commit no credentials, private recordings or generated large artifacts.
- Document public contracts, non-obvious numerical choices and architectural decisions. Comments should explain intent; use descriptive code for ordinary mechanics.
- Follow the [backend boundary](Architecture.md): no sample generation, WAV encoding or heavy analysis in the browser, browser workers or API request event loop. A client-side fallback must not bypass this requirement.

## Compulsory unit tests

Every new or changed frontend/backend behaviour requires meaningful unit tests in the same pull request. Bug fixes require a regression test. Tests must cover normal results, relevant boundaries and error paths; a snapshot-only or implementation-mirroring test is insufficient. End-to-end tests do not replace unit tests.

| Layer | Minimum behaviour to test |
| --- | --- |
| Frontend logic/components | Sequence editing/reordering, validation feedback, unsaved-change handling, job progress/state, cancellation, network errors and download availability. Test observable behaviour through accessible controls; mock the API boundary. |
| Backend domain/generator | Validation, cumulative timing, fade/phase/PCM rules, WAV headers, stereo identity and resource-size calculations. Include invalid and nonfinite inputs. |
| Backend application services | Job submission/state transitions, cancellation races, ownership checks, queue/storage failure, worker failure and artifact expiry; inject controlled adapters/clocks. |
| Backend adapters | Unit-test adapter mapping/error behaviour where applicable; also run contract/integration checks against actual implementations. Mocks alone do not prove queue/storage/HTTP interoperability. |

Unit tests must be isolated, deterministic and runnable without production services or secrets. Avoid arbitrary sleeps and live internet dependencies; use controlled clocks and fixtures. Keep the independent numerical checker separate from the production generator so a shared mistake cannot validate itself.

Publish separate frontend/backend coverage reports with source-file inclusion that exposes untested modules. Inspect uncovered branches in review; no blanket coverage exclusions, skipped failing tests or lowered quality gates to obtain a pass. Coverage is evidence of exercised code, not proof of correctness. Numerical fixtures and worker/API integration checks remain mandatory under the [verification plan](wiki/Signal-Verification-Plan.md).

Documentation-only changes require documentation checks; they do not create a requirement for meaningless runtime unit tests. This does not exempt implementation changes from either layer's unit-test obligations.

## CI and merge gates

The first implementation/scaffolding PR must introduce runnable, non-empty frontend and backend unit suites alongside their code and configure CI for pull requests. Required jobs must fail on test failure, missing expected suites, type errors, lint/format errors or build failure. Shared-contract changes must run both suites; each implementation PR must run both suites against the current repository, not only the changed package. Unit, integration and independent signal-verification results must be distinguishable.

CI must run pinned installs, formatting checks, lint, strict type checking, frontend unit tests, backend unit tests and builds. Add API/worker/storage integration tests when these boundaries are introduced and browser end-to-end tests when the editor is usable. Publish the exact commands and results in each PR. Configure GitHub rulesets/branch protection to require the actual check names and maintainer review before merge; documentation alone does not enforce them. Do not claim enforcement until the settings and checks have been verified.

Until runnable code/tooling exists, these are requirements for its introduction, not passing checks. Unimplemented features cannot be marked tested. A PR failing the applicable mandatory checks is not ready to merge.
