# Render worker boundary v1

23 October 2026. **PROPOSED CONTRACT for a future API/worker integration; not the current development IPC implementation.** This defines the .NET-to-TypeScript boundary if an API migration is selected; it does not mandate .NET or a separate network service. The present launcher/SQLite worker remains unchanged. See [ADR-004](ADR-004-Enterprise-Evolution.md) and [Service Contract](Service-Contract.md).

## Roles and transport

The Rendering module owns the authoritative durable job repository, owner authorization, admission, attempt/lease state, cancellation, publication and retention. A background Render Coordinator supervises a bounded Node executor process; synthesis/encoding runs only in that process. HTTP handlers never render or publish partial output. The executor owns no identity/provider/profile/catalogue tables and does not treat an opaque job ID as authorization.

The initial migration transport is supervised local process pipes, not a newly deployed worker HTTP microservice or broker. Control/input and events are UTF-8 newline-delimited JSON; binary WAV output goes to the server-assigned private candidate artifact, never mixed into event stdout. A process runs one admitted attempt and exits. Reuse one engine, with explicit process/startup/resource tests before changing current worker orchestration. Multi-host execution would require a later transport/security ADR while preserving these semantic contracts.

| Message | Required fields / meaning |
| --- | --- |
| `ready` executor → coordinator | `protocol_version`, `engine_id`, `engine_version`, `engine_build_sha256`, supported waveform contract IDs; no work before compatible handshake |
| `start` coordinator → executor | `protocol_version`, `job_id`, `attempt_id`, `fencing_token`, immutable validated `sequence`, `input_sha256`, optional package programme/revision/digest binding, expected engine/contract identity, expected frame/byte count, execution deadline and opaque candidate artifact handle |
| `progress` executor → coordinator | `job_id`, `attempt_id`, `fencing_token`, monotonic `frames_written` bounded by expected frames; progress never means completion |
| `cancel` coordinator → executor | Matching attempt identity and reason code; best-effort cooperative cancellation followed by process termination at the coordinator's bounded grace limit |
| `candidate_ready` executor → coordinator | Matching attempt identity, candidate handle, frame count, byte count and raw WAV SHA-256; only after closing the candidate successfully |
| `failed` executor → coordinator | Matching attempt identity and allowlisted error code; no stack, token or submitted-source text in public results |

`input_sha256` is SHA-256 of RFC 8785 canonical JSON for the exact legacy sequence snapshot [S70/S71]. It is separate from a portable programme hash, whose IDs and microsecond-duration representation differ. Freeze and record the translation between the two; validate both bindings rather than compare unlike digests. The executor validates independently against the authoritative engine contract and rejects handshake/settings/expected-output mismatches.

Proposal framing limits are 2 MiB per input/control record and 64 KiB per event; the embedded sequence retains the current 1 MiB ceiling and existing numerical/file limits. These bound protocol overhead, not increase public API limits or claim throughput. Ignore no unknown protocol versions: terminate with a stable incompatibility error. Bound event rate and stderr capture in the coordinator's reviewed configuration; malformed/oversized output fails the attempt. Stdout is protocol-only, stderr is bounded diagnostic metadata, and neither is permission to log private sequences.

## Durable lifecycle and publication invariants

- Submission uses an owner-scoped idempotency key plus immutable input/contract digest. Reusing a key with different content is a conflict; retrying the same request returns its stored outcome. Catalogue/profile changes do not mutate an admitted input snapshot.
- A repository transaction admits/reserves capacity and creates the job. Claiming creates a unique attempt and monotonically increasing fencing token/lease. Only the current unexpired attempt can advance progress or publish. A process message or artifact path does not itself confer a valid lease.
- The coordinator owns lease renewal through a conditional repository update while the admitted attempt is healthy and within its execution deadline; the executor cannot renew or replace its own lease. Expiry, failed renewal or lost coordinator ownership blocks publication and triggers bounded child termination/cleanup. Lease/renewal/publication-grace settings must be explicit and race-tested rather than inferred from progress messages.
- The coordinator checks owner access for external status/cancel/download operations. The worker receives no user access token. Candidate handles resolve only inside a validated artifact root; never pass user-selected paths, script names or source URLs to the process launcher.
- `candidate_ready` is not `completed`. In a background publication step, verify current attempt/lease, cancellation winner, contract/input binding, file size/header/checksum and current distribution eligibility. Atomically arbitrate cancellation versus finalization in the repository. Publish the complete candidate, then expose completion only when the final verified artifact is available; record recoverable publication intent for crash reconciliation.
- Publication failure cannot yield a completed downloadable job. Restart reconciliation must detect orphan candidates, missing final artifacts and final files without completed rows; retry publication only for an authorized current intent or fail/clean up. Duplicate or stale attempt messages must not revive terminal jobs or replace a winner's artifact.
- Cancellation/completion has one durable winner, and repeated cancellation is idempotent. If completion has won, return the actual completed state; if cancellation wins, kill/abort the executor and remove its candidate. The API must not claim cancellation succeeded while a later stale worker can publish.
- Deadlines/concurrency/storage/retention initially inherit the current reviewed service limits. No automatic execution retry is introduced by this contract; retry policy requires explicit idempotency, attempt fencing and measured capacity. A failed worker is not silently replayed forever.

An API implementation must map these invariants to its chosen database/storage transactions; do not assume a database transaction makes a filesystem/object-store rename atomic with a row update. The concrete publication-intent/reconciliation implementation and tests are migration acceptance requirements. Runtime stderr/process exit alone is insufficient evidence of a successfully published artifact.

## Failures and acceptance

| Scenario | Required result |
| --- | --- |
| Wrong engine/protocol/contract or changed sequence digest | No rendering admitted to that executor; explicit incompatibility failure |
| Duplicate start, progress or candidate message | Idempotent handling; no second completed artifact or backwards progress |
| Expired/replaced attempt continues running | Fencing denies publication; bounded process termination and candidate cleanup |
| Worker crash, deadline or coordinator restart | Durable recovery disposition, no partial completion; reservations released only after cleanup |
| Disk full, wrong header/count/checksum or artifact substitution | Fail/quarantine candidate, never expose verified download |
| Cancellation races with finalization | One documented durable winner; no resurrection or false cancelled/completed response |
| Programme withdrawn before candidate publication | Distribution eligibility recheck rejects publication; no stale job bypass |

Before a .NET migration, run the same interface/ownership/failure suite from both coordinators against the real Node executor and independent WAV checker, including maximum files and forced restart races. Until those pass, keep the existing TypeScript API rather than merge an unproven bridge or duplicate engine. No such bridge, process protocol, database migration or tests are implemented here.
