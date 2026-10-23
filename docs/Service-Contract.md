# Initial export-service contract

Updated: 22 October 2026. This is the service acceptance contract, originally proposed with scaffolding. The current working tree contains uncommitted local HTTP/SQLite/filesystem/worker adapters; see [evidence and remaining gates](Mobile-Research-Audit.md). Local implementation does not establish production/mobile readiness. The [numeric WAV contract](wiki/Signal-Specification.md) is unchanged. Web and future mobile clients use the same authoritative backend engine; audio playback adapters are separate from export generation.

## API boundary

Use a versioned `/api/v1` JSON API. The first implementation may use Node's HTTP server with thin routing adapters; application logic must remain independent of HTTP. Document and test complete request/response schemas before exposing endpoints.

| Route | Contract |
| --- | --- |
| `POST /api/v1/exports` | Accept the sequence-file v1 object; validate authoritatively and admit capacity before returning HTTP 202 with job ID/state, frame count, relative status URL and expiry information. |
| `GET /api/v1/exports/{id}` | Return the owner's job state, written/total frames, stable error code if failed, and download availability. Never claim completion before artifact publication. |
| `POST /api/v1/exports/{id}/cancel` | Idempotently request cancellation; return the actual resulting state, including completion if completion already won. |
| `GET /api/v1/exports/{id}/file` | Owner-only streaming `audio/wav` attachment for a completed, unexpired artifact; deny all other states. |

Errors use `{ "error": { "code": "...", "message": "..." } }` with an optional field path for validation failures. Distinguish malformed input (400), validation (422), missing/unauthorized job (404 without ownership disclosure), body too large (413), request/admission limits (429 with retry information), unavailable service/storage (503) and an expired owner artifact (410). Final error-code enumeration and integration fixtures belong with the API implementation.

## Local adapters and initial resource defaults

The local preview uses SQLite transactions/conditional updates for admission, claims and terminal transitions, private filesystem artifacts and one separate Node worker. It uses built-in `node:sqlite`, experimental in the observed Node 22.20 runtime, rather than an added SQLite package. Temporary files publish by same-filesystem rename after close/size checks. The launcher fixes its data root at `.openwave/service/` and ports at 3001/API and 5174/frontend. General configurable deployment settings and a supported production storage/runtime choice remain acceptance work. Do not run untrusted uploaded code or spawn a process per sample/step.

| Setting | Target value; local preview status below |
| --- | --- |
| JSON request body | 1 MiB maximum |
| Per-export scope | Existing 100-step, 300-second, 64-MiB WAV caps |
| Worker concurrency | 1 |
| Pending jobs | 10 globally; at most 2 active jobs per owner (queued + running) |
| Submission rate | 6 requests/minute per owner and per client IP; document trusted-proxy handling |
| Worker execution deadline | 120 seconds, followed by failure/cleanup; validate feasibility with largest export tests |
| Queue wait deadline | 5 minutes, then fail with a stable queue-timeout code |
| Automatic retries | 0 initially; recovery marks orphaned work failed rather than creating duplicate output |
| Artifacts/terminal metadata retention | 1 hour; cleanup at least every minute, including restart cleanup |
| Artifact storage budget | 512 MiB globally; reserve expected output bytes at admission, reclaim reservations on failure/cancellation/expiry |

Capacity checks and reservations must be atomic, including across restarts. Test limits before acceptance; if deployment measurements require different defaults, change the documented configuration in a reviewed PR. Never represent these defaults as measured service throughput. Cleanup must remove abandoned temporary files and preserve unrelated user files outside the configured data directory.

The local preview hard-codes the numeric capacity/deadline values above; they are not runtime-configurable. It retries no failed jobs, but its launcher attempts up to three worker-process restarts; process restart and job retry are different policies. The storage reservation remains held until failed/cancelled/expired files are removed. Completed-file retention is one hour from completion; failed/cancelled records retain their admission expiry, and expired metadata tombstones may remain a further hour, longer if cleanup cannot release reserved storage. This is a documented difference from the one-hour terminal-metadata target, not compliance with it. Cleanup runs on startup and every minute; actual supervisor failure/recovery still needs end-to-end verification.

## Access and deployment boundary

For the first single-origin service, use an anonymous owner session rather than account registration: a cryptographically random server-issued secret stored in a Secure, HttpOnly, SameSite=Strict cookie, with server-side ownership validation on every job/status/cancel/download. Use at least 32 random bytes; job IDs are not credentials. Require HTTPS in deployment, validate the Origin on state-changing requests, reject cross-origin use and require JSON for submission. Document a separate loopback development policy without weakening production defaults. Test isolation between two owners, CSRF/cross-origin rejection and missing/expired sessions before enabling public access.

Do not log cookies, tokens or full sequences. Explain to users that exports send their sequence to the service; no source-URL fetching or private recordings are involved. The first service implementation must define owner-session expiry and how it relates to the one-hour artifact window, then test retention and access together. Hosting, production secret handling, backup/cleanup operations and deployment are separate review items. Keep GPL-3.0-only unless a separate reviewed licence decision changes it.

### Loopback preview and remaining acceptance

The later [desktop player](Desktop-Player.md) adds `POST /api/v1/playback` to prepare a same-origin, owner-scoped, single-use stream and `GET /api/v1/playback/{id}` to consume it. This is a separate ephemeral playback contract: eight pending starts, 60-second start expiry, six starts/minute per owner/IP, 100 globally/minute and one live process. The child reuses the export planner/encoder, with pacing/backpressure and a 310-second deadline; disconnect aborts it. It does not publish a partial export artifact or weaken the export-completion rule. No public service deployment is introduced.

The development cookie is HttpOnly, SameSite=Strict and scoped to `/api/v1`, with a two-hour fixed session expiry; it omits Secure solely for loopback HTTP. Owner secrets use 32 random bytes and hashed server-side storage. Mutations require the exact frontend Origin and JSON content type. Client IP is the direct socket address; there is no trusted-proxy deployment configuration. This launcher is not a production entry point and must not be exposed on a LAN/public interface for mobile testing.

Local adapter tests cover isolation, malformed/expired sessions, limits, cancellation and artifact expiry. Remaining review includes configurable settings, exact error/DTO documentation, session/retention edge cases, real supervisor crash/restart/timeout coverage, automated browser/download workflow, deployment HTTPS/access controls, operational cleanup/storage behaviour and independent release review. These requirements remain distinct from the later [playback-adapter validation](wiki/Mobile-POC.md).

## Proposed enterprise contract extension — 23 October 2026

The [catalogue/API target](Catalogue-and-Data-Architecture.md) proposes published research/programmes, profile/admin/sync resources, pagination, optimistic concurrency, OpenAPI and health contracts. [Independent IAM](Identity-and-Security-Architecture.md) proposes access-token validation and application policies. These are not existing routes or a silent replacement for anonymous owner sessions/error envelopes. [ADR-004](ADR-004-Enterprise-Evolution.md) requires an explicit compatibility/migration decision before a backend/database change. Current local service limits do not establish production capacity or an enterprise SLA.

## Proposed worker and package boundary

The [render worker v1 contract](Render-Worker-Contract.md) defines a possible future migration boundary, separate from current development IPC/SQLite wiring. The Rendering module owns durable jobs; versioned process messages cannot publish a stale/cancelled attempt. The [package contract](Programme-Package-Contract.md) distinguishes canonical programme and actual legacy sequence digests and binds final WAV metadata/bytes. No current HTTP payload, response envelope, worker code or numerical rule changes here.
