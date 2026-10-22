# First prototype verification plan

Version 0.2 — 22 October 2026. Applies to the [first prototype specification](Signal-Specification.md). **All application checks below are planned, not run: no application exists yet.** The private MP3 analysis is separate research, not an OpenWave test result.

## Records and independent checks

Record application commit, OS/runtime/browser versions, device model, settings, complete synthetic input, checker/dependency versions, expected/actual results and artifact checksums. Report failures and inconclusive checks explicitly. Use a separate WAV reader and independently written mathematical/signal analysis rather than importing the generator as the expected-value oracle. An on-screen plot does not verify the file. A second reviewer must reproduce the release checks and record findings before the first release.

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
| Shape/amplitude/envelope | Compare all samples in short fixtures to an independent implementation of the specified sine, fade and PCM rounding; error <=2 PCM16 LSB, including fade endpoints and reset phase; compare across browsers with this tolerance |
| Headroom/stereo | No clipping; absolute PCM <=ceil(32767 * amplitude), and duplicate channels exactly match |
| Repeatability | Repeated exports in the same app/runtime produce identical complete WAV bytes; changes to device playback sample rate or volume do not alter bytes |
| JSON round trip | Save/load preserves settings, ordered steps and optional source; regenerated PCM matches within the same runtime |
| Invalid input | Each specified invalid class, unsupported schema/unknown fields, malformed JSON and numerical limit violation is rejected with a useful field/step error; loaded invalid files do not replace existing edits |
| Resource handling | Reject >100 steps, >300 total seconds, >1 MiB JSON and any calculated WAV >64 MiB before allocation; report allocation/worker failure; cancellation offers no partial file and a later export still works |
| User workflow | Add/edit/remove/reorder, unsaved-change confirmation, progress/cancel, keyboard/touch controls and browser download work on the declared matrix; source strings are rendered as text |

At the current duration/rate/channel limits, valid WAVs cannot reach 64 MiB. Check the file-cap guard independently with a synthetic size calculation instead of pretending a valid sequence exceeds it. Test duration precision using values such as 0.1000001 (reject), and accept ordinary six-decimal values without floating-point validation artefacts. Include NaN/Infinity through the generator API; they are not valid JSON numbers.

Use an independent reader to decode the largest exports. Record maximum-export elapsed time and observed memory/failure behaviour on each target device; do not claim a universal memory bound. Test cancellation early and late during generation, worker errors and a simulated allocation failure. The app can confirm preparation of a download, not successful storage by the browser; verify a saved file manually on each target and report a cancelled/blocked browser download accurately.

## Release gate

Publish actual commands, results and outstanding limitations, not just this plan. Before a first release, all applicable acceptance checks and the second review must pass, or maintainers must approve a documented scope revision. Confirm dependency licences, installation/build instructions and the source licence notices. No investigation becomes complete solely because this specification is merged.

## Playback and hardware remain separate

A valid WAV does not verify a phone, adapter, USB player or electrode output. Actual playback measurements require a named output path, settings, load, instruments, calibration and uncertainty. Electro-Med format compatibility needs observed results for a defined player/revision. The supplied MP3 establishes its own encoding, not player compatibility. Unknown outputs require qualified setup review under INV-06; people are never part of the test circuit.
