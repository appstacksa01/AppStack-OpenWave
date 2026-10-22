# Repeatable signal verification plan

Draft v0.1 — 22 October 2026. Applies to the [proposed specification](Signal-Specification.md). **All OpenWave application tests below are planned, not run: no application exists yet.** The private MP3 analysis is a separate completed investigation, not a test of OpenWave.

## Test records

Every run must record application commit/version, export settings, full neutral test sequence, OS/runtime, checker and dependency versions, estimator/method, artifact checksums, expected/actual results, and pass/fail with limitations. Use independent analysis of exported samples; an on-screen waveform is not output verification.

## Synthetic test cases

Use 20, 125.5, 500, 1,000, and 10,000 Hz sine tones, each 10 seconds, at amplitude 0.25. Run at both proposed sample rates and channel modes. These are engineering test frequencies without condition labels.

Add a three-step sequence: 125.5 Hz for 1.25 s, 500 Hz for 2.5 s, and 1,000 Hz for 1.75 s. The total is 5.5 s. Include fractional-frame duration cases and a long streaming export after resource limits are specified.

| Test | Method | Proposed acceptance |
| --- | --- | --- |
| Container | Decode with a separate reader; inspect header and payload | PCM16 WAV, chosen rate/channels, valid payload length |
| Timing | Count frames and compare cumulative boundaries | Total and each boundary equal floor(cumulative duration * sample rate + 0.5) |
| Sine frequency | Analyse middle 8 seconds, excluding transitions; use a documented fitted/phase or interpolated spectral estimator | Error <= max(0.02 Hz, 0.005% of requested frequency); estimator uncertainty <= one third of tolerance, otherwise inconclusive |
| Sine amplitude/shape | Compare settled samples against the quantized mathematical sine at the declared phase | Absolute error <= 2 PCM16 least-significant steps; account for time alignment explicitly |
| Stereo | Compare samples directly | Channels sample-identical in duplicate-stereo mode |
| Headroom | Inspect all samples | No clipping; values within declared amplitude plus quantization tolerance |
| Transitions | Inspect first/last samples and envelope; check step boundaries | Correct phase/envelope policy, no extra/missing frames, zero first/last step samples within one quantization step |
| Repeatability | Export identical settings twice with the same app version | PCM payloads identical; variable metadata excluded from comparison |
| Invalid input | Exercise nonfinite values, invalid ranges, malformed imports, and unsupported settings | Clear rejection; no silently substituted signal or incomplete file presented as valid |
| Resource handling | Test documented size/time limits, cancellation, and storage failure | Clean completion or reported failure; incomplete export never presented as complete |

These tolerances are design proposals. Resolve numeric-method details and platform feasibility before accepting them.

## Square-wave review

After the harmonic algorithm is specified, test 20, 125.5, 500, and 1,000 Hz with 50% duty cycle. Compare against an independent implementation of the reviewed band-limited reference; inspect odd-harmonic amplitudes, unwanted aliases, normalization, and transitions. Publish numeric harmonic/alias tolerances before claiming this feature passes. Do not test it against an unattainable ideal discontinuous square wave.

## Actual playback and hardware: separate stage

A valid WAV file does not verify a phone, adapter, USB player, or electrode output. For a named output path, document hardware/firmware, audio routing, volume, processing, load, instruments, calibration, and uncertainty. Measure frequency, level, distortion, timing, and route-change behaviour as applicable.

USB-player compatibility needs a matrix of WAV/MP3 formats and observed outcomes. The owner's supplied MP3 establishes its encoding, not proof that all players accept that encoding.

For app competitors, capture known test tones from their actual outputs before assessing accuracy. Store displays and advertising are feature descriptions, not measurements.

Unknown Electro-Med outputs require a qualified bench setup review under INV-06. No people form part of a test circuit.
