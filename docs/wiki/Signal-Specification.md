# First prototype signal specification

Version 0.2 — 22 October 2026. INV-04/07. Proposed for maintainer approval through a repository pull request. Once merged, this is the implementation contract for the first file-export prototype. **No application has been implemented or verified. These are engineering requirements, not measured performance or Electro-Med compatibility specifications.** Supersedes the broader v0.1 draft for this milestone.

## Purpose and platform

Build a browser-based editor for neutral frequency sequences and export WAV files for independent digital verification and later bench testing. Generate samples directly from the formula below rather than routing export through live audio hardware or a browser audio graph. Device sample rates and playback volume must not change file samples.

The first implementation uses TypeScript with a framework-independent generator, automated tests and a small responsive editor. Use a static frontend without accounts, backend, database, analytics, external frequency catalogues or runtime network dependencies. Rendering runs in a Web Worker to keep the editor responsive; see [MDN's worker guidance](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). The build tool and any UI dependencies must be pinned and reviewed when introduced.

Initial release targets: the current stable Chrome and Edge on Windows, Chrome on Android, and Safari on iPhone/iPad at verification time. Record exact versions and device models. These are required test targets, not claims of support already established. Missing access to a target requires a documented scope revision before release. Installation as a PWA, first-load offline availability and background/locked-screen operation are deferred; once loaded, editing and generation require no network requests.

## User workflow

1. Add, edit, remove and reorder steps using labelled controls usable with keyboard and touch.
2. Set export sample rate and channel mode. Show the total duration and estimated WAV size before export.
3. Save a valid sequence as JSON and load a previously saved sequence. Loading replaces the editor only after full validation; obtain confirmation before discarding unsaved edits. Never silently clamp or reinterpret values.
4. Export WAV with visible progress and a cancel action. Preserve the sequence on failure/cancellation. Show completion only after a complete file has been prepared for browser download; the browser controls whether it is saved successfully.

Defaults for a newly added step: sine, 500 Hz, 1 second, peak amplitude 0.25. Default export: 48,000 Hz, mono. Label amplitude as digital peak fraction, not volts or treatment intensity. No live playback or automatic sound is included.

## Export contract

| Parameter | Required value or limit |
| --- | --- |
| Container | Canonical 44-byte RIFF/WAVE header, PCM format tag 1, 16-byte `fmt ` chunk, then `data`; no metadata chunks |
| Encoding | Signed 16-bit little-endian PCM; interleaved samples for stereo |
| Sample rate | 44,100 Hz or 48,000 Hz; explicit setting |
| Channels | 1 (mono) or 2 (sample-identical duplicate stereo) |
| Waveform | Sine only |
| Frequency | 20–10,000 Hz inclusive, finite numeric Hz |
| Duration | 0.1–300 seconds per step; at most six decimal places (integer microseconds) |
| Digital amplitude | Finite peak fraction >0 and <=0.8; default 0.25 |
| Sequence limits | 1–100 steps; summed requested duration <=300 seconds |
| File limit | 64 MiB (67,108,864 bytes), including the header; reject before allocation if exceeded |
| Completion | Exact calculated frame count, no repeats or trailing audio |

At the maximum duration, 48 kHz duplicate stereo uses 57,600,044 WAV bytes, below the file cap. These conservative initial limits are project choices, not measured browser capacity or limits of the reference machine. Allocation can still fail; report it without offering a partial file. Generate directly into the PCM output buffer with bounded temporary blocks, not an additional full-length floating-point audio buffer. Revoke obsolete download URLs and release worker buffers after completion/cancellation. Include maximum-size exports in actual target-device verification before claiming support.

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
x(n) = amplitude * e(n) * sin(2*pi*frequency_hz*n/Fs)
q(n) = sign(x(n)) * floor(abs(32767*x(n)) + 0.5)
```

`sign(0) = 0`. PCM rounding is nearest integer with ties away from zero. There is no dither, normalization, compression or limiting. Both channels receive the same `q(n)` in duplicate-stereo mode. The first and last samples of each step are zero; the fade reaches one after `R` frames and remains one until the fade out. The minimum duration is longer than both fades combined. Amplitude is the sine's peak parameter before the envelope; it need not occur exactly at a sampled point.

RIFF size is `36 + dataBytes`; data size is `totalFrames * channels * 2`; byte rate is `Fs * channels * 2`; block alignment is `channels * 2`; bits per sample is 16. Identical inputs in the same application/runtime must produce identical bytes. Cross-runtime mathematical comparisons allow the numeric tolerance in the verification plan rather than assuming bit-identical trigonometric libraries.

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

`source` is the only optional step field: plain text, at most 500 Unicode code points. It is provenance, never executable HTML or a medical claim. Export JSON preserves step order and source text. Reject unsupported schema versions, missing/unknown fields, wrong types (including numeric strings, booleans and null), nonfinite values, empty sequences, unsupported settings, excessive duration precision and limits exceeded. Reject malformed JSON before altering the editor. Validate all inputs and frame/file counts before rendering; report the affected step/field. Local form values may be incomplete while editing, but save/export requires a fully valid sequence.

## Exclusions and acceptance

Square waves and their harmonic definitions are deferred, as are MP3, higher bit depths/rates, independent stereo, long programmes, live playback, hardware control and calibrated electrical output. No third-party frequency lists or private recordings are bundled. The 20 Hz–10 kHz range is informed by the private sample analysis [S12], not therapeutic evidence.

Apply the [verification plan](Signal-Verification-Plan.md). Merging this specification authorizes the reduced, file-only implementation scope; it does not pass tests, close every investigation or authorize hardware/body testing. See the [readiness decision](Development-Readiness.md#file-only-prototype-decision). Player compatibility and qualified electrical measurements remain separate.
