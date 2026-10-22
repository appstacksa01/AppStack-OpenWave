# ADR-003: desktop waveform player

22 October 2026. Authorized implementation scope by the maintainer's desktop-player request; local/unmerged work, not release acceptance. Extends ADR-002's common playback contract and permits desktop audio playback plus band-limited square/triangle in the existing engine. ADR-001's backend-process synthesis rule remains: no browser oscillators, DSP worker or duplicate engine.

## Decision before implementation

Use the existing TypeScript/Vite UI in a desktop browser, with a platform-neutral `AudioOutput` contract and a browser adapter. Keep engine validation/math/PCM encoding free of Node, browser and audio-device APIs; its existing backend domain modules already have that property. Add waveforms there, not a second generator. Generation executes in separate backend processes, both for existing export jobs and for paced live WAV streams. Live and export paths call the same planner/encoder. Controls apply to the next start; sample-accurate parameter modulation while playing is not promised.

| Option | Reuse / execution | Trade-offs and decision |
| --- | --- | --- |
| Desktop browser; later PWA | Existing UI/API/engine; native browser decoding/output; separate local Node backend | Selected now, no new dependency. Routing depends on browser permissions/features; persistent installation/background/offline generation are not implied. PWA caching/install remains separate |
| Electron | Existing UI and Node engine could be packaged with separate main/renderer/utility processes | Consistent Chromium distribution but larger runtime/update/security/packaging responsibility. Not introduced without demonstrated browser limitations |
| Tauri | Existing UI in system WebView with Rust core; Node engine would need a managed sidecar or reviewed portable execution path | Additional Rust/toolchain/sidecar packaging and WebView variation. Not introduced; do not rewrite the engine in Rust |

This is an engineering assessment, not a measured package-size/performance comparison. Sources reviewed 22 October 2026: [Electron process model](https://www.electronjs.org/docs/latest/tutorial/process-model), [Tauri process model](https://v2.tauri.app/concept/process-model/). Future Android/iOS adapters implement the same playback contract; neither desktop wrapper is a mobile architecture commitment.

## Independent capabilities

Keep the data flow **waveform generation → audio playback → external hardware interface**, with independent responsibilities:

| Capability | Responsibility | Boundary |
| --- | --- | --- |
| Waveform generation | Validate sequences and produce deterministic PCM/WAV using the shared engine | No playback, device or hardware SDK dependency; execute synthesis in backend processes |
| Audio playback | Consume generated/imported audio, manage transport, mute, interruptions and output routing through platform adapters | No duplicate signal engine; device selection reports software routing rather than measured terminal output |
| External hardware interface | Define any future device-specific control, capability and protection requirements | Separate investigation; no custom interface implemented or required for software development and tests |

Ordinary sound-card/DAC playback uses the operating system's audio route. It does not establish a validated external electrical-output interface. Develop and verify generation/playback immediately; hardware design is not their prerequisite.

## Audio and numerical scope

Reuse the existing 20–10,000 Hz, 0.1–300 seconds/step, 300 seconds total, 100-step, PCM16 44.1/48 kHz mono/identical-stereo limits, fades, phase resets and timing rules. Sine samples must remain unchanged. Square uses odd harmonics `1/k`; triangle uses alternating odd harmonics `(-1)^((k-1)/2)/k²`. Include odd harmonic indices up to 63 strictly below Nyquist; divide each series by its sum of absolute coefficients so normalized magnitude cannot exceed one. This intentionally defines finite-bandwidth approximations and a digital peak ceiling, not ideal square edges or constant calibrated RMS. At high fundamentals only the fundamental remains. No ultrasonic/RF output or electrical boosting.

Live playback is a finite WAV stream generated with bounded chunks and paced ahead of wall-clock playback by a small buffer; it starts before the full sequence exists. It is not a hard real-time or phase-continuous modulation system. Generated sequences play as one stream with deterministic file-frame transitions; browser/OS timing and interruptions remain separate. Stop/mute must invalidate pending starts and close the media source; a short OS/DAC buffer may remain. Emergency audio mute is a software control, not a hardware interlock.

Use native browser audio decoding and a gain/analyser graph for a bounded 256-point time-domain display. That display is digital monitoring, not heavy FFT analysis or physical verification. Output selection uses feature-detected permission/routing APIs. Report selected/default/unknown route honestly; device labels do not prove a DAC's actual loaded terminals. Stop/mute on device changes, page loss and audio-context interruptions, requiring explicit restart. No automatic playback on load.

Primary references: [Audio Output Devices API](https://www.w3.org/TR/audio-output/) (candidate draft; permissions and platform support require feature tests), [HTML media](https://html.spec.whatwg.org/multipage/media.html), [Web Audio Recommendation](https://www.w3.org/TR/2021/REC-webaudio-20210617/). WAV imports are local and bounded; do not upload private recordings. Unknown codecs/unsupported features must fail visibly.

## Verification and remaining gates

Compulsory frontend/backend unit suites, real HTTP/stream integration, independent WAV/reference/spectrum checks and desktop browser smoke tests. Never call mocks physical measurements. Record actual test results separately, keep failed/unsupported capabilities visible, and provide a qualified dummy-load test plan. No electrode output, body-current setting, human testing or hardware certification is included. No dependencies, commit, push or live-wiki publication are authorized by this decision.

The next desktop milestone is a measured laptop sound-card baseline followed by a compatible USB-C DAC using the same fixtures and reviewed electronic-load setup. Record frequency, loaded amplitude, waveform fidelity, continuity, routing and interruption behaviour before deciding whether additional hardware is needed. Reconsider Electron or a native audio layer only against documented browser capability failures and project requirements; a desktop wrapper alone is not proof of predictable physical output. See the [desktop lab plan](Desktop-Player.md#short-manual-lab-verification-plan).
