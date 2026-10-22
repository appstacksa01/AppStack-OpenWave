# First prototype verification plan

Version 0.3 — 22 October 2026. Applies to the [first prototype specification](Signal-Specification.md), backend generation and compulsory frontend/backend tests. The original renderer snapshot recorded 16 frontend/129 backend tests and 36 independent WAV cases; a later uncommitted local preview recorded 74 frontend/169 backend tests and one manual browser download. See [renderer results](../Backend-Renderer.md) and the [audit](../Mobile-Research-Audit.md) for provenance. **Complete service/browser acceptance, physical measurements and second human release review remain outstanding.** No new runtime results are claimed by documentation alignment; the private MP3 analysis is separate research.

**v0.4 desktop supplement:** The later desktop implementation passed 121 frontend/186 backend tests and 64 independent WAV fixtures, preserving all 36 original sine hashes. Add square/triangle low/high/fundamental, harmonic-ratio, normalized headroom, 300-second bounds and exact waveform-reference checks. `verify:desktop` exercises actual HTTP/separate-process streaming/cancellation/deadline and three independent stream-file checks; `tooling/desktop-browser-check.mjs` is a connector-driven browser workflow check, not cloud CI. See the [desktop evidence and manual physical plan](../Desktop-Player.md). Earlier counts above are historical snapshots; release/mobile/physical checks remain open.

## Records and independent checks

Record application commit, backend/worker version and runtime/configuration, OS/browser versions, device model, settings, complete synthetic input, checker/dependency versions, expected/actual results and downloaded artifact checksums. Report failures and inconclusive checks explicitly. Use a separate WAV reader and independently written mathematical/signal analysis rather than importing the generator as the expected-value oracle. An on-screen plot does not verify the file. A second reviewer must reproduce the release checks and record findings before the first release.

## Mandatory test layers

Follow the [coding standards](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Coding-Standards.md): frontend/backend unit tests are compulsory for changed behaviour, with regression tests for fixes. Frontend tests cover editing, validation, job/network states and downloads; backend tests cover numerical/domain logic and jobs. Both suites run for implementation PRs. Scaffolding supplies coverage/CI/type/lint/format/build tooling; local HTTP/storage integration and independent numerical checks now exist. Complete automated browser/multiprocess failure coverage and independent release reproduction remain open. No layer substitutes for another.

For the shared-engine/UI direction, use one numerical conformance dataset and require every implemented playback adapter to satisfy the common playback contract, plus platform-specific tests. Physical/device acceptance stays in the [Mobile POC](Mobile-POC.md). That plan is not implemented or passed, and defining its capability matrix precedes framework/native-development decisions. Common contracts do not turn a web result into Android/iOS compatibility evidence.

## Synthetic cases

- Generate 10-second sine steps at 20, 125.5, 500, 1,000 and 10,000 Hz, amplitude 0.25, at both sample rates and both channel modes.
- Generate 125.5 Hz for 1.25 s, 500 Hz for 2.5 s and 1,000 Hz for 1.75 s. Expect 242,550 frames at 44.1 kHz and 264,000 at 48 kHz, with boundaries calculated cumulatively.
- Exercise fractional frames: three 0.100010 s steps produce cumulative boundaries 4,410 / 8,821 / 13,231 at 44.1 kHz, and 4,800 / 9,601 / 14,401 at 48 kHz. One 0.100625 s step at 44.1 kHz rounds 4,437.5625 to 4,438 frames; one 0.100500 s step rounds 4,432.05 to 4,432. Add 0.105 s at 44.1 kHz to check an exact half-frame rounds 4,630.5 up to 4,631.
- Exercise the limits: one 300-second step and 100 three-second steps, including 48 kHz duplicate stereo. Expect 14,400,000 frames and 57,600,044 bytes for either maximum-duration stereo file. Also test 0.1-second steps, amplitude 0.8 and a small positive amplitude that quantizes to silence.

## Acceptance

| Check | Required result |
| --- | --- |
| Container | Independent reader accepts PCM16 WAV; canonical 44-byte header and every size/rate/channel/alignment field match the specification and actual payload |
| Timing | Exact total frames and cumulative boundaries; no extra frames or repeated steps |
| Frequency | Analyse the middle 8 s of each 10 s tone with a documented fitted/phase or interpolated spectral estimator; error <=max(0.02 Hz, 0.005% of requested Hz); estimator uncertainty <=one third of tolerance, otherwise inconclusive |
| Shape/amplitude/envelope | Compare backend artifact samples in short fixtures to an independent implementation of the specified sine, fade and PCM rounding; error <=2 PCM16 LSB, including fade endpoints and reset phase; use this tolerance across backend runtimes |
| Headroom/stereo | No clipping; absolute PCM <=ceil(32767 * amplitude), and duplicate channels exactly match |
| Repeatability | Identical requests to the same backend version/runtime produce identical complete WAV bytes across frontend browsers; playback sample rate/volume do not alter bytes |
| JSON round trip | Save/load preserves settings, ordered steps and optional source; regenerated PCM matches within the same runtime |
| Invalid input | Each specified invalid class, unsupported schema/unknown fields, malformed JSON and numerical limit violation is rejected with a useful field/step error; loaded invalid files do not replace existing edits |
| Resource handling | Backend rejects >100 steps, >300 total seconds, >1 MiB JSON and calculated WAV >64 MiB before admission/allocation; test queue/concurrency/time/storage limits and worker failure; no partial file becomes available |
| Job lifecycle | Integration tests prove isolated access, duplicate delivery handling, atomic cancellation/completion, crash/recovery, failure cleanup and retention expiry; completed means a closed, size-checked artifact |
| User workflow | Add/edit/remove/reorder, unsaved-change confirmation, progress/cancel, keyboard/touch, service/network failure, expiry and browser download work on the declared matrix; source strings are rendered as text |

At the current duration/rate/channel limits, valid WAVs cannot reach 64 MiB. Check the file-cap guard independently with a synthetic size calculation instead of pretending a valid sequence exceeds it. Test duration precision using values such as 0.1000001 (reject), and accept ordinary six-decimal values without floating-point validation artefacts. Include NaN/Infinity through the generator API; they are not valid JSON numbers.

Use an independent reader to decode the largest backend exports. Record worker elapsed time, memory/storage behaviour and API responsiveness while rendering under the configured concurrency. Test early/late cancellation, service disconnection, worker termination, queue/storage errors and simulated allocation failure. Verify that no generation/encoding implementation is imported into the frontend bundle and that no sample loops execute in browser/API request handlers. On each target device, verify download checksum/size and memory/failure behaviour without claiming a universal bound. The app cannot confirm successful browser storage; verify saved files manually and report blocked/cancelled downloads accurately.

## Release gate

Publish actual commands, results and outstanding limitations, not just this plan. Both unit suites and applicable CI checks must pass. Before a first release, all applicable acceptance checks and the second review must pass, or maintainers must approve a documented scope revision; scope revision does not waive compulsory unit tests. Confirm dependency licences, service access/retention/resource settings, installation/build instructions and source licence notices. No investigation becomes complete solely because this specification is merged.

## Playback and hardware remain separate

The proposed [OpenWave Analog Output Characterisation](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation) is the next physical milestone under INV-03/05/06: laptop baseline, commercial USB-C DAC, optional later-authorized ESP32/external DAC, and independently safety-reviewed Electro-Med. It records load-defined voltage/current, frequency/shape, distortion/clipping/response/noise and uncertainty. It does not replace this digital acceptance plan or establish human-contact safety or effectiveness. See [five independent evidence questions](Frequency-and-Amplitude.md#five-independent-evidence-questions).


A valid WAV does not verify a phone, adapter, USB player or electrode output. Actual playback measurements require a named output path, settings, load, instruments, calibration and uncertainty. Electro-Med format compatibility needs observed results for a defined player/revision. The supplied MP3 establishes its own encoding, not player compatibility. Unknown outputs require qualified setup review under INV-06; people are never part of the test circuit.
