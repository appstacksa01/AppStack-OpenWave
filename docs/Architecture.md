# Architecture decision: backend export processing

ADR-001 — 22 October 2026. Adopted through PR #5 following the maintainer's explicit requirement that heavy processing run in backend processes. Supersedes v0.2's browser/Web Worker rendering design. The mathematical WAV contract remains unchanged. Scaffolding now introduces presentation/lifecycle policy and tests; no export service has been implemented or deployed. The [initial service contract](Service-Contract.md) specifies proposed endpoints, local adapters and resource defaults for the next increments.

## Responsibilities

| Component | Responsibility |
| --- | --- |
| Browser frontend | Edit sequences, bounded form/JSON validation, show calculated duration/size, submit jobs, display status/progress, request cancellation and download finished files. No synthesis, sample loops, WAV encoding, FFT or full audio analysis. |
| Backend API | Authoritative validation, caller access checks, admission/resource limits, enqueue jobs, return status and authorize downloads. Never render audio in an HTTP request handler. |
| Backend worker process | Claim a queued job, validate its immutable sequence snapshot, generate PCM and encode WAV in bounded chunks, observe cancellation/timeouts, publish the complete artifact and update job state. |
| Queue/job repository | Track job ownership, state and progress, coordinate worker claims and define restart/recovery behaviour. |
| Artifact storage | Store private temporary outputs, make only completed artifacts available and remove failed/cancelled/expired artifacts. |

Use TypeScript for frontend and backend, with framework-independent domain/application modules and narrow ports for queue, repository, renderer and storage. The renderer belongs only in the backend dependency graph; it must never enter the browser bundle. Shared packages may expose schemas, types and bounded validation/size calculations, not executable synthesis code to the frontend.

Start with one separately runnable worker process and bounded concurrency, not a microservice fleet. The API process remains responsive while generation runs. A background browser worker does not satisfy this server-processing requirement. Merely wrapping CPU work in an `async` function does not isolate it from an API event loop. See [Node.js event-loop guidance](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop).

## Job contract

Export requests carry the versioned sequence JSON in the [signal specification](wiki/Signal-Specification.md). The backend validates independently of the browser, rejects invalid/over-limit requests before enqueueing, and freezes accepted inputs for reproducible output. Return a job identifier and access-controlled status endpoint promptly rather than holding a rendering request open. Final HTTP paths, payload/error schemas and the access mechanism must be documented and contract-tested with the first API implementation.

States are `queued`, `running`, `completed`, `failed`, `cancelled` and `expired`. Normal transitions are queued → running → completed/failed; queued or running → cancelled; terminal states → expired during retention cleanup. Startup recovery may mark orphaned queued/running work failed with a stable reason. Never return a job to running after it has reached a terminal state. A completed artifact may expire; a failed/cancelled job has no downloadable artifact.

Cancellation is idempotent. Resolve cancellation/completion with an atomic state transition: if cancellation wins, remove unpublished output; if completion wins, report completion rather than claiming cancellation succeeded. Workers must tolerate duplicate delivery and may publish at most one accepted artifact per job. Progress represents frames written, never an invented completion percentage. Completed status requires a closed, size-checked artifact; a download response is streamed without loading the full file into API memory.

Bound request size, pending jobs, concurrency, execution time, retries, storage usage and artifact retention. Keep the existing per-export numeric/file limits. Before a service implementation is accepted, commit concrete configurable defaults, the chosen queue/storage adapters and tests for limit/error/recovery behaviour. Do not start work beyond capacity or retry indefinitely. Public deployment requires tested caller isolation, rate limits and protected artifact access; an opaque job ID alone is not authorization. No user-account product feature is implied; a scoped session/capability design can be evaluated.

Treat optional source text as untrusted text: no URL fetching, file-path interpretation, execution or HTML rendering. Submit no private audio or medical records. Restrict logs to operational metadata; do not log credentials or full submitted sequences. Document retention and network requirements because export now sends sequences to the backend. Session/access design, hosting location and data-handling details must be reviewed before public deployment.

## Testing and implementation order

Follow the [mandatory coding standards](Coding-Standards.md). Frontend and backend both require unit tests. Also test real API/queue/worker/storage integration, admission rejection, ownership isolation, cancellation races, worker crash/recovery, storage failure, expiry and repeat downloads. Verify actual backend artifacts with an independent reader/analyser. Browser tests cover the UI/network/download workflow, not a client-side generator.

1. Scaffold frontend/backend packages, strict typing, formatting/linting, unit suites and CI; define the concrete API, queue/storage and resource defaults in the same reviewed implementation work.
2. Implement and independently verify the backend domain renderer; keep it outside the frontend build.
3. Implement the asynchronous export service and worker lifecycle with unit and integration tests.
4. Connect the editor and complete frontend unit, browser end-to-end and independent release verification.

A deployment provider, paid infrastructure and production operations are not selected by this ADR. Backend operation adds hosting, queue/storage, access-control and maintenance costs; re-estimate the [funding worksheet](Funding-and-Maintenance.md) before publishing a target. Original backend code remains covered by GPL-3.0-only under [LICENSING.md](../LICENSING.md); this decision does not silently adopt AGPL or change contribution terms.
