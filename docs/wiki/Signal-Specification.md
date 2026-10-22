# Proposed signal specification

Draft v0.1 — 22 October 2026. Investigation INV-07. **These are proposed OpenWave engineering targets, not implemented features, measured performance, or Electro-Med compatibility specifications.** Maintainer review and the readiness decision remain pending.

## Initial bench prototype

Import or enter a sequence of frequencies and durations, inspect its settings, and export a deterministic audio file. Use synthetic test sequences with clear provenance. No condition-labelled catalogue is adopted as a validated preset library.

| Parameter | Proposed target |
| --- | --- |
| Export | Uncompressed WAV, signed 16-bit integer PCM |
| Sample rates | 44,100 Hz and 48,000 Hz; explicit selection |
| Channels | Mono, or stereo with identical channels initially |
| Sine frequency | 20–10,000 Hz |
| Square-wave fundamental | 20–1,000 Hz initially; band-limited synthesis, subject to verification |
| Step duration | 0.1 seconds or longer, with finite positive values |
| Digital amplitude | Peak fraction of normalized full scale; default 0.25, permitted >0 to 0.8 |
| Timing | Boundary frame = floor(cumulative duration * sample rate + 0.5); positive values round half up |
| Transitions | Phase resets at each step; 10 ms half-cosine fade in/out contained within the step |
| Completion | Export ends at the specified frame count; no unrequested repeat or trailing audio |
| MP3, higher bit depths/rates, independent stereo | Deferred until separately specified and tested |
| Hardware control and live playback | Separate future specifications; not implied by file-export support |

The 20 Hz–10 kHz range is informed by the analysed sample [S12]. The reduced square-wave range is a proposed scope choice, not a device limit. A square wave contains harmonics; a phone/audio file cannot preserve ideal instantaneous edges. The planned implementation must document its harmonic truncation and normalization before square-wave conformance can be claimed.

## Sample definition

For sine steps, the reference is a sine at the requested frequency, multiplied by the digital amplitude and transition envelope, then quantized to signed PCM16. Use peak scale 32767; zero initial phase. Within a step, phase advances by 2*pi*f/sample_rate per frame.

The envelope is zero at the first and last sample of a step, ramps smoothly to/from one over 10 ms, and is one between ramps. Document the exact discrete envelope formula with the first implementation to make reference files reproducible. Square synthesis and its mathematical reference require a separate reviewed definition.

Amplitude describes file samples, not terminal volts/current. Live playback volume, hardware amplification, resampling, and electrical isolation are outside this file contract.

## Import fields and validation

Minimum neutral fields: frequency_hz, duration_seconds, waveform, amplitude, and optional source reference. Provide export sample rate and channel mode at sequence level. Parse decimal points consistently; reject ambiguous units rather than guessing.

Reject nonfinite numbers, unsupported waveforms/rates/channels, out-of-range frequencies/amplitudes, nonpositive durations, malformed rows, empty sequences, and exports beyond documented resource limits. Resource limits must be chosen and tested before implementation approval.

Frequency-list labels and source notes are provenance, not claims of efficacy. Review licenses before redistribution.

## Acceptance and change control

Use the [verification plan](Signal-Verification-Plan.md). No conformance is claimed until actual application exports pass the relevant tests. Record proposed changes, rationale, and measured evidence. Supported WAV settings on the Electro-Med remain unverified even if an OpenWave file passes these tests.
