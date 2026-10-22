# Backend WAV renderer: first implementation

**Scope, 22 October 2026:** This records the authoritative backend waveform implementation and its original results (16 frontend/129 backend tests). Later uncommitted connection work has 74 frontend/169 backend local tests and one observed desktop browser download; see the [audit](Mobile-Research-Audit.md). These are separate verification snapshots, neither covering mobile/USB-C/electrode output. [ADR-002](ADR-002-Mobile-Playback.md) preserves one engine and principal UI with platform playback adapters; it does not move synthesis into clients.

**Later desktop extension:** [ADR-003](ADR-003-Desktop-Player.md) adds `domain/waveform.ts` to this engine, not a duplicate engine. The planner accepts sine/square/triangle; the same encoder serves export jobs and live backend processes. All sine fixture hashes remain unchanged; [64 independent cases and current test results](Desktop-Player.md) supplement the original record below. The original sine formula/results remain useful regression evidence, not the complete current waveform feature list.

The renderer increment adds sequence validation, frozen rendering plans, bounded-chunk sine/PCM16 WAV encoding and an application service with an injected output sink. HTTP, queue/storage and editor implementations are separate modules in the current uncommitted preview, not responsibilities of the renderer.

## Responsibilities and usage

- `domain/sequence.ts` validates unknown values, canonical decimal duration precision, units/ranges, source text, step/total limits and calculated file size. It creates an immutable numerical snapshot using cumulative microsecond timing.
- `domain/wav-encoder.ts` implements the specified phase reset, half-cosine fades, symmetric PCM rounding and exact header. It yields a 44-byte header and PCM chunks of at most 16,384 frames (default 4,096); each chunk is at most 65,536 bytes in stereo. It retains neither a full WAV nor a full floating-point programme in memory.
- `application/render-export.ts` depends on an `ExportSink` interface, not filesystem/HTTP/queue libraries. It awaits each write before asking for the next chunk, reports acknowledged frame counts, completes only after generation and propagates errors/cancellation through sink abort. If cleanup also fails, both errors are retained in an `AggregateError`.
- `adapters/sequence-json.ts` bounds UTF-8 JSON to 1 MiB before parsing. The local HTTP adapter also caps its streamed request body and authoritatively validates before admission.

The local backend worker supplies a filesystem sink whose completion closes/checks and atomically publishes the artifact and whose abort removes incomplete output. Repository/job modules enforce ownership, terminal state races and expiry; the renderer's cancellation checks alone do not provide those guarantees. Their presence does not complete all service acceptance tests. Call synthesis only in backend worker processes; never import it into frontend bundles, mobile playback adapters or HTTP request handlers.

Validation snapshots contain only numerical rendering data. Provenance belongs in sequence JSON/job records, not the canonical WAV header. The editor's full JSON save/load/provenance workflow remains incomplete; inspect the [service contract](Service-Contract.md) and [audit](Mobile-Research-Audit.md) before describing end-to-end round-trip support.

## Reproduce the checks

```sh
npm ci
npm run check
npm run verify:signals
```

The independent check requires Python 3.11+ with its standard library; no pip packages are needed. The default executable is `python` on Windows and `python3` elsewhere. Set `OPENWAVE_PYTHON` to a Python executable path if necessary. `verify:signals` builds the backend, renders synthetic fixtures in a standalone Node process and starts the Python checker. CI is configured to run the same command when GitHub permits jobs to start; no paid CI has been enabled.

Generated WAVs, the complete input manifest and the report remain in `.openwave/verification/run-*`, excluded from Git. A fresh directory is created each run. The local verification sink retains failed `.part` output for diagnosis and never publishes it as a `.wav`; it is not the production artifact adapter. Review/remove these local test directories when no longer needed. The committed [initial verification record](verification/backend-renderer-initial.json) includes exact inputs, artifact/source SHA-256 values, runtime versions and the working-tree base/dirty state. Source hashes identify the measured implementation even when verification precedes its commit.

## Original renderer verification results

Original verification environment: Windows, Node 22.20.0 and Python 3.12.14. At the renderer increment, `npm run check` passed formatting, lint, strict types, both builds, the bundle boundary check, 16 frontend tests and 129 backend tests. Coverage was 100% lines/statements/functions/branches for executable app modules in that snapshot. No threshold was lowered or source hidden. The later 74/169 preview result is recorded separately in the audit; neither suite was rerun merely to align documentation.

All **36 independent WAV cases passed**: five 10-second frequencies (20, 125.5, 500, 1,000 and 10,000 Hz) at both rates/channel modes, multistep/fractional/half-frame cases, maximum/minimum amplitude, repeatability, a 300-second step and a 100-step/300-second sequence. Each maximum stereo export is exactly 14,400,000 frames / 57,600,044 bytes. Local rendering took approximately 2.0 seconds for the single step and 1.6 seconds for 100 steps; these observations are not service throughput or a performance guarantee.

The independent reader (`wave`) and header checks agreed on format and payload sizes. Stereo samples matched, headroom and each step's zero endpoints passed, and repeat exports had identical hashes. Reference samples use complex rotation and a sine-squared envelope, independently of the renderer's direct sine/half-cosine calculation. The largest observed reference error was 0 PCM16 LSB for the fully compared fixtures. Large maximum-duration files were scanned for container/frame/headroom/stereo/endpoints, not compared sample-by-sample to the mathematical reference.

Frequency uses interpolated rising zero crossings over the middle eight seconds. Its conservative endpoint-bracketing bound is checked against one third of the allowed tolerance; this bound applies to these noiseless, comfortably quantized fixtures, not arbitrary captured hardware signals. Largest observed frequency error was approximately 0.000784 Hz. Additional local corruption probes confirmed rejection of a wrong header, truncated payload, altered PCM sample and incorrect frequency target.

## Remaining work

No independent human reviewer has reproduced release checks. Local adapter integration and one manual browser download exist, but real multiprocess supervisor failure/recovery, complete browser/network/download workflows, simulated resource failures and physical playback measurements remain incomplete. This is not a release, electrical-output certification, medical validation or Electro-Med compatibility result.

Review the existing service/editor against the [service contract](Service-Contract.md) and complete missing acceptance evidence rather than starting duplicate implementations. For Portable, define the common playback contract and capability matrix before selecting framework/native work. Cloud CI remains deferred; local checks remain compulsory and blocked remote checks must not be described as passed.
