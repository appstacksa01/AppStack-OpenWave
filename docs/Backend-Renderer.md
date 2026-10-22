# Backend WAV renderer: first implementation

22 October 2026. Proposed implementation for review. This increment adds backend-only sequence validation, frozen rendering plans, bounded-chunk sine/PCM16 WAV encoding and a rendering application service with an injected output sink. It does not implement HTTP endpoints, queue/database/storage adapters, the managed worker service or the editor.

## Responsibilities and usage

- `domain/sequence.ts` validates unknown values, canonical decimal duration precision, units/ranges, source text, step/total limits and calculated file size. It creates an immutable numerical snapshot using cumulative microsecond timing.
- `domain/wav-encoder.ts` implements the specified phase reset, half-cosine fades, symmetric PCM rounding and exact header. It yields a 44-byte header and PCM chunks of at most 16,384 frames (default 4,096); each chunk is at most 65,536 bytes in stereo. It retains neither a full WAV nor a full floating-point programme in memory.
- `application/render-export.ts` depends on an `ExportSink` interface, not filesystem/HTTP/queue libraries. It awaits each write before asking for the next chunk, reports acknowledged frame counts, completes only after generation and propagates errors/cancellation through sink abort. If cleanup also fails, both errors are retained in an `AggregateError`.
- `adapters/sequence-json.ts` bounds UTF-8 JSON to 1 MiB before parsing. A future HTTP adapter must enforce the body cap while streaming as well, then perform authoritative sequence validation before admission.

The future backend worker supplies a sink whose completion closes/checks and atomically publishes the artifact, and whose abort removes private incomplete output. Repository/worker code must enforce ownership, cancellation/completion races and expiry atomically. The renderer's pure cancellation checks do not implement those job-level guarantees. Call this code only in backend processes; never import it into frontend bundles or HTTP request handlers.

Validation snapshots deliberately contain only the numerical rendering data. Provenance remains in the original sequence JSON and must be preserved by the eventual sequence editor/job record; it is not embedded in the canonical WAV header.

## Reproduce the checks

```sh
npm ci
npm run check
npm run verify:signals
```

The independent check requires Python 3.11+ with its standard library; no pip packages are needed. The default executable is `python` on Windows and `python3` elsewhere. Set `OPENWAVE_PYTHON` to a Python executable path if necessary. `verify:signals` builds the backend, renders synthetic fixtures in a standalone Node process and starts the Python checker. CI is configured to run the same command when GitHub permits jobs to start; no paid CI has been enabled.

Generated WAVs, the complete input manifest and the report remain in `.openwave/verification/run-*`, excluded from Git. A fresh directory is created each run. The local verification sink retains failed `.part` output for diagnosis and never publishes it as a `.wav`; it is not the production artifact adapter. Review/remove these local test directories when no longer needed. The committed [initial verification record](verification/backend-renderer-initial.json) includes exact inputs, artifact/source SHA-256 values, runtime versions and the working-tree base/dirty state. Source hashes identify the measured implementation even when verification precedes its commit.

## Actual results

Local environment: Windows, Node 22.20.0 and Python 3.12.14. `npm run check` passed formatting, lint, strict type checking, both builds, the browser artifact boundary check, 16 frontend tests and 129 backend tests. Both suites retain 100% line/statement/function/branch coverage for current executable app modules. No threshold was lowered or source file hidden.

All **36 independent WAV cases passed**: five 10-second frequencies (20, 125.5, 500, 1,000 and 10,000 Hz) at both rates/channel modes, multistep/fractional/half-frame cases, maximum/minimum amplitude, repeatability, a 300-second step and a 100-step/300-second sequence. Each maximum stereo export is exactly 14,400,000 frames / 57,600,044 bytes. Local rendering took approximately 2.0 seconds for the single step and 1.6 seconds for 100 steps; these observations are not service throughput or a performance guarantee.

The independent reader (`wave`) and header checks agreed on format and payload sizes. Stereo samples matched, headroom and each step's zero endpoints passed, and repeat exports had identical hashes. Reference samples use complex rotation and a sine-squared envelope, independently of the renderer's direct sine/half-cosine calculation. The largest observed reference error was 0 PCM16 LSB for the fully compared fixtures. Large maximum-duration files were scanned for container/frame/headroom/stereo/endpoints, not compared sample-by-sample to the mathematical reference.

Frequency uses interpolated rising zero crossings over the middle eight seconds. Its conservative endpoint-bracketing bound is checked against one third of the allowed tolerance; this bound applies to these noiseless, comfortably quantized fixtures, not arbitrary captured hardware signals. Largest observed frequency error was approximately 0.000784 Hz. Additional local corruption probes confirmed rejection of a wrong header, truncated payload, altered PCM sample and incorrect frequency target.

## Remaining work

No independent human reviewer has yet reproduced these results; that remains a release gate. Actual service integration, worker restart/timeout/race handling, simulated allocation failure, browser/network/download behaviour and physical playback measurements remain outstanding. This is not a release, electrical-output certification, therapeutic validation or Electro-Med compatibility finding.

Next: implement the asynchronous export service and worker/storage adapters against the [service contract](Service-Contract.md), with unit and integration tests, then connect the tested editor. The user has deferred blocked cloud CI rather than authorizing paid services; continue compulsory local checks and do not describe remote checks as passed.
