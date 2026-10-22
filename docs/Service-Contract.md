# Initial export-service contract

Proposed with the scaffolding PR, 22 October 2026. This documents targets for the first service implementation; no endpoints, database, worker, credentials or retention service exist yet. The [numeric WAV contract](wiki/Signal-Specification.md) is unchanged.

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

Select a local SQLite-backed job repository/queue using transactions for claims and compare-and-set state transitions, and a private filesystem artifact adapter under a configurable data directory (default `.openwave/`). Temporary outputs publish by atomic rename on the same filesystem only after close/size validation. Review and pin a compatible SQLite driver when the adapter is implemented; none is installed by the scaffolding. Start one dedicated Node worker process. Do not run untrusted uploaded code or spawn a process per sample/step.

| Setting | Initial configurable default |
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

## Access and deployment boundary

For the first single-origin service, use an anonymous owner session rather than account registration: a cryptographically random server-issued secret stored in a Secure, HttpOnly, SameSite=Strict cookie, with server-side ownership validation on every job/status/cancel/download. Use at least 32 random bytes; job IDs are not credentials. Require HTTPS in deployment, validate the Origin on state-changing requests, reject cross-origin use and require JSON for submission. Document a separate loopback development policy without weakening production defaults. Test isolation between two owners, CSRF/cross-origin rejection and missing/expired sessions before enabling public access.

Do not log cookies, tokens or full sequences. Explain to users that exports send their sequence to the service; no source-URL fetching or private recordings are involved. The first service implementation must define owner-session expiry and how it relates to the one-hour artifact window, then test retention and access together. Hosting, production secret handling, backup/cleanup operations and deployment are separate review items. Keep GPL-3.0-only unless a separate reviewed licence decision changes it.
