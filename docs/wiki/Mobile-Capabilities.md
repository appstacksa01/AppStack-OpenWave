# Mobile capabilities

Status: platform investigation pending; INV-04.

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