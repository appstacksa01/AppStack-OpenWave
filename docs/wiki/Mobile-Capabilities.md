# Mobile capabilities

Status: platform investigation pending; INV-04.

[Audio-format research](Audio-Format-Research.md) records official Android sampling guidance and the limits of the supplied background articles. Platform feasibility is partly researched; specific devices, playback routes and reference-player formats still require verification.

A [draft file-export specification](Signal-Specification.md) now proposes PCM16 WAV at 44.1/48 kHz, mono or duplicate stereo, with defined signal and timing targets. Its [verification plan](Signal-Verification-Plan.md) separates exported-file checks from actual playback and electrical measurement. Targets are not implemented or accepted compatibility claims.

The [audio sample analysis](Audio-Sample-Analysis.md) supplies an observed example of a timed sequence, approximately 20 Hz–10 kHz. This range is a sample finding, not an adopted device requirement. Candidate software functions now include frequency-list import, per-step durations, waveform controls, and lossless WAV export. File format and output-path validation remain open.

The [equipment research](Test-Equipment-Research.md) also identifies an external-instrument control path for investigation. No phone compatibility or hardware protocol integration has been demonstrated.

Android documents synthesis-oriented audio APIs and USB audio support [S07–S08]. This supports investigating mobile audio generation, but does not establish a particular phone or adapter's terminal output. iOS API documentation is located for further review [S09].

## Questions before selection

- Is the required signal within an audio output path's capabilities, or does it require external generation?
- What range, waveform, amplitude representation, timing tolerance, and channel count are needed?
- Which routes are supported: built-in audio, USB audio, or commands to external hardware?
- What happens on calls, route changes, disconnects, screen lock, or suspension?
- How do sampling, resampling, filtering, volume, clipping, and processing affect output?
- Which phone/OS/interface combinations can we verify?

| Candidate | Evaluation needed |
| --- | --- |
| Web app | Audio APIs, background operation, routing, measured performance |
| Native/hybrid mobile app | Platform integration, interruption handling, device coverage |
| Controller for external hardware | Protocol, generator capabilities, disconnect behaviour, hardware verification |

Phone radios are not assumed to be general-purpose programmable signal outputs. Sample rate is not output frequency; software amplitude is not calibrated terminal voltage.

Deliver a requirements-based comparison, target-device matrix, limitations, and verification plan before selecting a stack. MEVN remains provisional.
