# OpenWave Mobile POC 1

22 October 2026. **POC proposed, not implemented or passed.** INV-04/05/07, dependent on INV-03/06 for bench work. [ADR-002](../ADR-002-Mobile-Playback.md) records the confirmed shared-engine/UI/adapter direction; framework choice and this implementation plan still require evidence and review. Existing [digital verification](Signal-Verification-Plan.md) remains applicable.

The later [desktop player](Desktop-Player.md) implements `AudioOutput` and the browser adapter, not this mobile POC. Reuse/review that contract and its tests when mapping Android/iOS capabilities. Desktop support for square/triangle/live backend streams does not pass a mobile device row or change this POC's initial sine-only acceptance scope.

## Scope and dependencies

Select frequency, waveform and duration; generate through the existing backend or load a verified local WAV; retain it locally; start/stop playback; show playback and actual-route status; use a compatible USB-C DAC into electronic dummy loads only. The initial waveform choice is **sine**; square and triangle must be explicitly unavailable until their numerical contract is approved. No treatment presets, Electro-Med equivalence, body contact or live synthesis.

Preserve v0.3 frequency, duration, amplitude, rate/channel and resource limits. Backend generation needs connectivity; local-file playback must be tested offline. New on-phone generation and real-time synthesis are excluded until ADR-001 is explicitly amended. Loading a local file requires bounded validation, explicit unsupported-format feedback, preserved provenance and no execution of metadata/source text.

## Phases

| Phase | Deliverable | Dependency / exit evidence |
| --- | --- | --- |
| 0. Validate requirements and choose platform approach | Follow the confirmed shared-engine/shared-UI/adapter direction; define the playback contract and web/Android/iOS capability matrix, waveform scope, restart policy and minimum OS targets | Audit findings and named phone/DAC/instrument availability inform the framework decision; no native implementation or backend-rule exception assumed |
| 1. Playback contract and local files | After approach approval, implement one TS playback contract and the minimum required platform adapters; validate/read retained files | Compulsory frontend/backend tests plus native adapter tests where native code is justified; shared adapter conformance; no DSP through JS bridge |
| 2. Platform lifecycle | Implement only the adapters justified by phase 0; map focus/session/background and actual-route state through the common contract | Device tests for lock, background, calls/alarms, stop and USB loss; API availability and unsupported capabilities recorded |
| 3. Digital integrity | Backend-generated/imported fixture checksums and independent reader/sample checks | Existing renderer tests plus actual retained-file checks; preserve original bytes, no transcoding assumed |
| 4. Qualified USB-C bench | Loaded-output frequency, level, distortion, spectrum, drift and continuity | INV-06 setup review; equipment/calibration/load record; raw captures; both platforms |
| 5. Review/recommend | Publish compatibility/results including failures and unsupported functions | Independent reviewer reproduces; no release until applicable gates pass or scope is explicitly revised |

The next mobile task is phase 0: review the implemented desktop playback contract and build the Android/iOS capability matrix and targeted cases. Do not create a parallel contract or engine. Use findings to choose justified native adapters/shell; native implementation remains separately approved. Keep one engine/UI; expanding mobile waveforms, on-phone synthesis or electrode hardware is outside this decision task.

## Acceptance register

“Not run” below means no mobile acceptance evidence; historical backend checks are explicitly distinguished.

| Acceptance criterion | Required evidence | Current result |
| --- | --- | --- |
| Frequency/waveform/duration selection | Tests for valid/invalid settings; sine-only unsupported-choice handling | Local web editor exists; mobile selection not run |
| Automated waveform tests | Both frontend/backend suites, plus native units for new playback behaviour; no lowered thresholds | Prior local preview: 74 frontend/169 backend passed; no mobile/native suite yet |
| Independent WAV correctness | Separate reader, exact frames/header, reference samples, checksum of actual retained mobile file | Existing backend report covers 36 fixtures; retained phone file not tested |
| Start/stop and playback status | Actual adapter/player state/position, completion/error, repeated stop and required-route policy; native state if a native adapter is selected | Not run |
| USB-C routing | Named phone/OS/DAC/cable; actual route observed and analog output captured; unsupported route blocks start | Not run |
| Actual frequency | Calibrated capture with estimator/method, requested/measured Hz, error, uncertainty and clock drift | Not measured; use digital tolerance only as a proposed physical target, not an inherited guarantee |
| Amplitude/distortion | Loaded RMS/peak/DC, gain settings, THD+N with bandwidth/noise method, clipping and response versus frequency | Not measured; acceptable physical limits must be agreed before pass/fail |
| Continuity/timing | Whole multistep capture and maximum-duration run; gaps, underruns, step transitions and start/stop latency | Not measured; physical timing/gap tolerances need approval |
| Interruption/disconnection | Calls, alarms/focus loss, USB removal/reinsert, app background/foreground, lock, media-service reset | Not run; proposed policy pauses/stops and requires deliberate restart; measure any fallback/transient output |
| Offline/local storage | Airplane/no-network playback, app restart, missing/corrupt/evicted files, low-storage and import errors | Not run; offline generation unsupported |
| Power/battery | Duration, bus power, thermal/battery record with known topology | Not measured |
| Android and iPhone compatibility | Completed matrix rows, raw results and explicit unsupported features | No physical rows completed |
| Independent review | Named reviewer, reproduced data/results and limitations | Pending |

If route observation cannot reliably establish the required output, mark that combination unsupported. Do not label a button press, a waveform display or the existence of a USB connection as acceptance.

## Device matrix to populate

| Test target | Identity required | Route/file cases | Current status |
| --- | --- | --- | --- |
| Android + USB-C DAC | Phone model, Android build/API, app commit/native plugin version; DAC model/revision/VID/PID/UAC/firmware; cable/hub | 44.1/48 kHz PCM16, mono/identical stereo, multistep and 300 s; foreground/background/lock/interruption/USB loss | BLOCKED — HARDWARE OR TESTING; identities unassigned |
| USB-C iPhone + DAC | Exact iPhone/iOS build, app commit/plugin version; same DAC/cable details | Same cases; actual session route/rate and background configuration | BLOCKED — HARDWARE OR TESTING; identities unassigned |
| Second device/DAC combination | Exact identities before expanding supported matrix | Repeat core cases and record differences/failures | Not scheduled; coverage expansion requires resources |

Keep requested file parameters separate from negotiated output parameters. Record instrument model/calibration/date, safe load/value/rating, probing arrangement, sample capture rate/bandwidth, UTC timestamp, raw captures, analysis version, uncertainty and reviewer. Avoid personal identifiers. A simulator/emulator may test UI but cannot satisfy USB/audio/power acceptance.

## Hardware sequence

Begin with an off-the-shelf active DAC into a qualified test load. Compare an external programmable generator only if the required waveform, clocking, bandwidth or output level cannot be met by audio hardware. Seek documented output modules before considering custom design; no such module is validated by this review. Reference-machine measurements require a separate setup because its output is unknown. Follow the [hardware roadmap](Hardware-and-Electrical-Safety.md#portable-hardware-roadmap).
