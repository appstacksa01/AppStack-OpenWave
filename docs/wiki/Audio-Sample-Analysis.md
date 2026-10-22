# Audio sample analysis

Reviewed: 22 October 2026. Evidence: S12, owner-supplied audio inspected locally. **This is digital-file analysis; the machine's electrical output has not been measured.**

## Observations

| Property | Result |
| --- | --- |
| Container/encoding | MP3, constant 128 kbps |
| Sample rate | 44,100 Hz |
| Duration | 9,720 seconds: 2 hours 42 minutes |
| Channels | Two, carrying effectively the same signal |
| Steady-frequency sections | 51 per channel |
| Section durations | Approximately 180, 240, or 300 seconds |
| Dominant-frequency range | Approximately 20 Hz to 10 kHz |

Sampled waveform excerpts are approximately rectangular; low-frequency spectra show odd harmonics. This is **consistent with square-wave generation modified by lossy compression**, not proof of the original generator settings.

## Method and confidence

The complete file was decoded in floating point with SoundFile/libsndfile. Mutagen supplied format metadata. One-second Hann-window FFTs with log-parabolic peak interpolation tracked the strongest spectral component. A three-point median filter and grouping tolerance of max(2 Hz, 0.1%) identified sections. Ten-second FFT spot checks at six positions supported selected frequency estimates; those channel pairs were sample-identical.

Section boundaries are approximate to the one-second analysis interval. Frequency estimates are digital observations, not calibrated hardware accuracy. Tracking the strongest peak is not a complete reconstruction of every spectral component.

The local record contains the analysis script, JSON summary, CSV timeline/segments, plots, and source checksum. The recording and identifying filename remain private; these public findings cannot be independently reproduced from the wiki alone. A later public validation dataset should use newly generated synthetic test signals with clear redistribution rights.

## Limitations

- MP3 compression prevents exact recovery of the original uncompressed waveform.
- Floating-point decoded peaks reached approximately 1.663 in normalized magnitude. This exceeds nominal full scale; playback may clip or rescale. It is not a calibrated amplitude reference.
- Waveform duty cycle, phase continuity, transition behaviour, and intended generator settings need further investigation.
- Digital amplitudes cannot establish electrode voltage/current, isolation, or compatibility.
- No audio playback, hardware measurement, or body-connected test was performed.
- The supplied program label does not establish a medical effect. The full sequence is not published as a treatment preset.

## Software implications

A candidate bench prototype could support frequency entry/import, dwell times, waveform controls, sequence editing, and lossless WAV export. This is a requirements direction, not an approved implementation specification.

Next: define a documented sequence format; inspect transitions and duty cycle; establish supported WAV parameters; compare synthetic reference files with real output into a test load.

See [existing machine investigation](Existing-Machine-Investigation.md) and [development readiness](Development-Readiness.md).