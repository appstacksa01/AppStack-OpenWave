# First prototype signal specification

Version 0.4 — 22 October 2026. INV-04/07. **Working-tree extension authorized by the maintainer's desktop-player request; uncommitted/unmerged.** The adopted v0.3 backend/sine baseline remains traceable to PR #5; v0.4 adds the square/triangle definition below and separate explicit desktop playback under [ADR-003](../ADR-003-Desktop-Player.md). Existing sine PCM, timing, fades and resource limits remain unchanged. [64 independent WAV cases](../Desktop-Player.md) passed locally, not full release/hardware acceptance. These are digital requirements, not Electro-Med/electrical specifications.

## Purpose and platform

Build a browser-based editor for neutral frequency sequences and export WAV files for independent digital verification and later bench testing. Generate samples directly from the formula below rather than routing export through live audio hardware or a browser audio graph. Device sample rates and playback volume must not change file samples.

The first implementation uses a TypeScript browser editor, backend API and separate backend worker processes. All waveform generation, WAV encoding and heavy analysis run on the backend, never in the browser or browser workers. The browser handles editing, bounded validation/size estimates, job progress and downloads. See the [backend architecture](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Architecture.md) and [mandatory SOLID/unit-test standards](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Coding-Standards.md). Pin and review framework/tooling dependencies when introduced. No accounts product, analytics or external frequency catalogue is included.

The shared-engine/UI/adapter direction in [ADR-002](../ADR-002-Mobile-Playback.md) remains. The desktop adapter consumes files/live streams from the same engine; it does not reimplement synthesis. Playback is the later ADR-003 increment, not an assertion that the original file-only milestone or mobile/hardware gate passed. Mobile framework selection and offline phone generation remain separate decisions.

Initial release targets: the current stable Chrome and Edge on Windows, Chrome on Android, and Safari on iPhone/iPad at verification time. Record exact versions and device models. These are required test targets, not claims of support already established. Missing access to a target requires a documented scope revision before release. Installation as a PWA and background/locked-screen operation are deferred. Editing and JSON save/load are local; WAV exports require backend connectivity and send the sequence to the server. Preserve local edits and report connection failures without client-side rendering fallback.

## User workflow

1. Add, edit, remove and reorder steps using labelled controls usable with keyboard and touch.
2. Set export sample rate and channel mode. Show the total duration and estimated WAV size before export.
3. Save a valid sequence as JSON and load a previously saved sequence. Loading replaces the editor only after full validation; obtain confirmation before discarding unsaved edits. Never silently clamp or reinterpret values.
4. Submit an export job with visible progress and a cancel action. Preserve the sequence on network/service failure or cancellation. Only a backend-confirmed completed job enables download; never offer partial output. Report expired files and cancellation/completion races accurately. The browser controls whether the downloaded file is saved successfully.

Defaults: sine, 500 Hz, 1 second, peak amplitude 0.25; export 48,000 Hz mono. Amplitude is a digital peak ceiling, not volts or treatment intensity. The desktop player starts live/file audio only on an explicit action; page/file loading or mute reset never autoplays. Playback controls do not alter the mathematical export bytes.

## Export contract

| Parameter | Required value or limit |
| --- | --- |
| Container | Canonical 44-byte RIFF/WAVE header, PCM format tag 1, 16-byte `fmt ` chunk, then `data`; no metadata chunks |
| Encoding | Signed 16-bit little-endian PCM; interleaved samples for stereo |
| Sample rate | 44,100 Hz or 48,000 Hz; explicit setting |
| Channels | 1 (mono) or 2 (sample-identical duplicate stereo) |
| Waveform | Sine, band-limited square or triangle as defined below |
| Frequency | 20–10,000 Hz inclusive, finite numeric Hz |
| Duration | 0.1–300 seconds per step; at most six decimal places (integer microseconds) |
| Digital amplitude | Finite peak fraction >0 and <=0.8; default 0.25 |
| Sequence limits | 1–100 steps; summed requested duration <=300 seconds |
| File limit | 64 MiB (67,108,864 bytes), including the header; reject before allocation if exceeded |
| Completion | Exact calculated frame count, no repeats or trailing audio |

At the maximum duration, 48 kHz duplicate stereo uses 57,600,044 WAV bytes, below the file cap. These conservative initial limits are project choices, not measured service capacity or limits of the reference machine. Enforce them authoritatively on the backend before enqueueing and again in the renderer. Generate and write PCM in bounded chunks to temporary backend storage rather than retaining an additional full floating-point buffer. Only publish closed, size-checked artifacts. Stream downloads; remove incomplete/expired output and release worker resources. Define service concurrency, queue, timeout, storage and retention limits with the backend implementation. Test maximum-size generation on the server and downloading on the target browser matrix.

## Exact timing and sample definition

Validate decimal duration precision before conversion. Convert each duration to integer microseconds `u[i]`. Use safe integer arithmetic for cumulative microseconds `U[k] = sum(u[0..k])` and the frame boundary:

```text
B[-1] = 0
B[k] = floor((U[k] * Fs + 500000) / 1000000)
N[k] = B[k] - B[k-1]
```

This rounds positive cumulative durations to the nearest frame, with half frames rounding up. Do not round individual step lengths and then add them. With the limits above, all timing products fit exactly within JavaScript's safe integer range.

For a step of `N` frames, use local sample index `n = 0..N-1`, starting at zero phase for each step. Let `R = floor(0.010 * Fs + 0.5)` (441 or 480 frames) and define:

```text
r(j) = 0.5 * (1 - cos(pi * min(j, R) / R))
e(n) = min(r(n), r(N-1-n))
x(n) = amplitude * e(n) * w(n)
q(n) = sign(x(n)) * floor(abs(32767*x(n)) + 0.5)
```

`sign(0) = 0`. PCM rounding is nearest integer with ties away from zero. There is no dither, post-render loudness normalization, compression or limiting. Both stereo channels receive the same `q(n)`. Each step starts/ends at zero; the fade reaches one after `R` frames and remains one until fade-out. Minimum duration exceeds both fades combined. Amplitude scales the normalized waveform's peak ceiling, which need not occur exactly at a sample or equal the plateau/RMS amplitude.

For sine, `w(n) = sin(2*pi*frequency_hz*n/Fs)`, preserving v0.3 bytes. For square/triangle let `K` be odd integers 1–63 with `k*frequency_hz < Fs/2`. Square coefficients are `c[k]=1/k`; triangle coefficients are `c[k]=(-1)^((k-1)/2)/k^2`. Define `w(n)=sum(c[k]*sin(2*pi*k*frequency_hz*n/Fs))/sum(abs(c[k]))`. This fixed coefficient normalization is part of the waveform definition, not post-render loudness normalization. It bounds peak magnitude to one, preserves the fundamental and excludes Nyquist/higher harmonics. It does not promise ideal square edges or equal waveform RMS. High fundamentals may retain only a sine component. Phase resets and envelopes apply per step for every shape.

RIFF size is `36 + dataBytes`; data size is `totalFrames * channels * 2`; byte rate is `Fs * channels * 2`; block alignment is `channels * 2`; bits per sample is 16. Identical inputs in the same backend version/runtime must produce identical bytes regardless of the requesting browser. Cross-runtime mathematical comparisons allow the numeric tolerance in the verification plan rather than assuming bit-identical trigonometric libraries.

## Sequence file v1 and validation

Save/load UTF-8 JSON, maximum 1 MiB (1,048,576 input bytes). This is the only import format in the first milestone; no CSV, list scraping, range/sweep notation or condition presets. Required fields are explicit, with no defaults silently inserted on import:

```json
{
  "schema_version": 1,
  "sample_rate_hz": 48000,
  "channels": 1,
  "steps": [
    {
      "frequency_hz": 500,
      "duration_seconds": 1,
      "waveform": "sine",
      "amplitude": 0.25,
      "source": "Synthetic engineering test"
    }
  ]
}
```

`source` is the only optional step field: plain text, at most 500 Unicode code points. It is provenance, never executable HTML or a medical claim. Export JSON preserves step order and source text. Reject unsupported schema versions, missing/unknown fields, wrong types (including numeric strings, booleans and null), nonfinite values, empty sequences, unsupported settings, excessive duration precision and limits exceeded. Reject malformed JSON before altering the editor. Validate locally for feedback and independently on the backend before job admission/rendering; report the affected step/field. Local form values may be incomplete while editing, but save/export requires a fully valid sequence. Do not trust client validation or fetch source URLs on the server.

## Exclusions and acceptance

MP3 export, higher bit depths/rates, independent stereo, longer programmes, continuous parameter modulation, hardware control and calibrated electrical output remain excluded. Desktop finite live/file playback is implemented separately and subject to browser/OS capabilities; no on-phone synthesis is introduced. No third-party lists/private recordings are bundled. The frequency range is informed by S12, not therapeutic evidence. Sequence JSON retains schema version 1 with explicit waveform values; older sine-only backends reject the added values, so client/backend versions must match.

Apply the [verification plan](Signal-Verification-Plan.md). Merging this specification authorizes the reduced, file-only implementation scope; it does not pass tests, close every investigation or authorize hardware/body testing. See the [readiness decision](Development-Readiness.md#file-only-prototype-decision). Player compatibility and qualified electrical measurements remain separate.
