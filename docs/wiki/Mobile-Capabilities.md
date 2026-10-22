# Mobile capabilities

Reviewed: 22 October 2026. INV-04, with INV-03/05/06/07 dependencies. The earlier questions below are retained for traceability. Their current dispositions are in the [mobile question register](Mobile-Question-Register.md); the sections that follow supersede the earlier provisional-stack wording, not ADR-001 or the numerical contract.

**Later desktop evidence:** [Desktop Player](Desktop-Player.md) now implements the browser audio adapter and live/local WAV playback, with new waveforms in the same backend engine. The capability assessment below concerns phones unless stated otherwise; it must not be read as saying desktop playback is absent. No Android/iPhone/DAC physical row has passed.

[Audio-format research](Audio-Format-Research.md) records official Android sampling guidance and the limits of the supplied background articles. Platform feasibility is partly researched; specific devices, playback routes and reference-player formats still require verification.

The adopted v0.3 [file-export specification](Signal-Specification.md) defines PCM16 WAV at 44.1/48 kHz, mono or duplicate stereo, with explicit signal/timing targets. Its [verification plan](Signal-Verification-Plan.md) separates digital checks from playback/electrical measurement. The backend renderer has recorded digital results; mobile/physical compatibility is not established.

The [audio sample analysis](Audio-Sample-Analysis.md) supplies a timed-sequence example, approximately 20 Hz–10 kHz. This is a sample finding, not a device requirement. The current file contract includes per-step durations and sine WAV export; third-party list import and additional waveform controls remain separate future scope/rights decisions. Reference-player compatibility and physical output-path validation remain open.

The [equipment research](Test-Equipment-Research.md) also identifies an external-instrument control path for investigation. No phone compatibility or hardware protocol integration has been demonstrated.

Android documents synthesis-oriented audio APIs and USB audio support [S07–S08]. Apple documents a native audio-data source callback [S09], whose overview was reviewed in this update. These support mobile feasibility research, not a particular phone/adapter's terminal-output specification.

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

The requirements-based comparison is now recorded in [ADR-002](../ADR-002-Mobile-Playback.md), with a [POC/device matrix](Mobile-POC.md). MEVN is not the implemented stack. Mobile architecture selection remains proposed pending review and tests.

## October mobile architecture review

The implementation remains plain TypeScript/Vite, with no React, PWA manifest/service worker or native app. The desktop increment adds `AudioOutput` and its browser adapter to the prior connected preview. Live synthesis is in a separate backend process; native browser APIs decode/play and provide bounded monitoring. See the [desktop results](../Desktop-Player.md), not the earlier audit's implementation snapshot, for current status. None establishes accepted `main`, mobile tests or electrical measurements.

The [v0.4 working-tree extension](Signal-Specification.md) adds band-limited square/triangle to the adopted sine baseline, preserving PCM16, 44.1/48 kHz, mono/identical stereo, 20 Hz–10 kHz, 100 steps/300 seconds. It is authorized for the desktop increment, not a mobile POC acceptance claim. Generation/encoding remains backend-process work.

### Primary platform evidence

Android provides native audio facilities for synthesizers [S07]. Its USB documentation describes a host-mode UAC1 subset including PCM16, 44.1/48 kHz and mono/stereo [S08]. This is a baseline, not universal USB-C/UAC2 compatibility. USB host support is device dependent [S29]. Apple's USB audio design note describes class-device requirements and clocking [S30]; its iPhone support guidance explicitly documents USB-C audio accessories [S31]. These establish platform capability, not OpenWave device compatibility.

Android documents background playback [S32], audio focus [S33] and route observation/preferences [S34]. Apple documents audio-session/background configuration, interruptions and route changes [S35–S37]. Check API availability and policy for the selected deployment targets. A preferred route or configured session is not evidence that audio reached the intended connector.

The Web Audio standard defines synthesis/scheduling and sine, square and triangle oscillators [S38]. That capability does not change ADR-001's backend-only rule. The supplied MDN overview was inspected for orientation; conclusions here use the primary W3C specification. Browser background and route behaviour require target-browser testing.

### Capabilities and limitations

| Capability | Current disposition |
| --- | --- |
| Sine file generation, durations and sequences | **ANSWERED — DOCUMENTED** for the defined backend contract and recorded digital fixtures, not physical playback |
| WAV playback on smartphones | **FEASIBLE — NOT YET VERIFIED** in OpenWave; native adapter and phone tests required |
| Square and triangle | **ANSWERED — DOCUMENTED** for the desktop backend's v0.4 definition/digital tests; phone playback and mobile POC scope remain unverified |
| Real-time synthesis | Desktop paced streaming is software-tested in a separate backend process; on-phone synthesis is **DECISION REQUIRED** and excluded from mobile POC 1 |
| Offline local-file playback | **FEASIBLE — NOT YET VERIFIED** after persistent download/import |
| Offline generation of new sequences | **DECISION REQUIRED**; current backend-dependent design cannot provide it without a reachable backend |
| Sample rates and channels | **PARTIALLY ANSWERED**: file contract verified digitally; actual route rate/channel map unmeasured |
| Frequency accuracy | **PARTIALLY ANSWERED**: digital fixtures checked, physical clock drift and loaded output unknown |
| Playback continuity and deterministic timing | **OPEN — INVESTIGATION REQUIRED**: measure gaps, underruns, start/stop latency and interruptions; no hard real-time promise |
| Background and locked-screen playback | **FEASIBLE — NOT YET VERIFIED** through native lifecycle facilities; absent from the current preview |

Square/triangle harmonics cannot retain ideal infinite-bandwidth shapes through a finite-rate audio DAC. Fundamental frequency alone does not validate waveform shape. Sample rate is not tone frequency; normalized amplitude is not volts; identical stereo samples do not establish isolated electrical channels.

### USB-C feasibility and test needs

Use an active USB Audio Class DAC/interface and a data-capable USB-C connection. Charging capability or connector shape alone does not establish host/audio support. Shortlist documented class-compliant devices; Apple's USB-C to 3.5 mm adapter is an iPhone candidate [S31], not an OpenWave-tested cross-platform recommendation. Obtain exact revision, descriptors, supported formats and power requirements before selection.

Record file rate versus actual session/route rate, PCM transport, channel mapping, app/system/DAC gain, mixing, enhancements, clipping, AC coupling, low-frequency roll-off and load-dependent level. Android warns about resampling artifacts [S22]; Apple describes clock-domain distinctions [S30]. A nominal 48 kHz rate does not prove bit-perfect playback or calibrated frequency.

Power/battery use remains unmeasured. Record bus power, session duration, battery change, temperature and any powered-hub/charging arrangement. Accessory charging capability is not a DAC power guarantee. Proposed policy: stop/pause on USB loss or an unexpected route, require deliberate restart, and never silently continue on speakers/Bluetooth. Test that policy physically; it is not an existing feature.

The maintainer's direction is one shared OpenWave engine, one principal TypeScript UI and separate web/Android/iOS audio adapters; see [ADR-002](../ADR-002-Mobile-Playback.md). Capacitor remains a candidate, with framework/native implementation decisions driven by the capability findings. React adds a UI migration rather than a different USB driver. Backend-only synthesis remains; a future Portable client initially consumes retained files. See the [portable concept](Portable-Concept.md), [POC](Mobile-POC.md), [hardware roadmap](Hardware-and-Electrical-Safety.md#portable-hardware-roadmap) and [question register](Mobile-Question-Register.md).

## ESP32-S3 and signal-strength investigation

The [ESP32-S3 research](ESP32-S3-Investigation.md) compares USB audio streaming to an external DAC with command-based local MCU generation. Espressif documents native USB/UAC and I2S capabilities; the S3 does not supply the original ESP32 analog DAC [S47–S50]. Android/iPhone USB audio capability is documented, but no OpenWave phone/ESP32/DAC pairing is verified. Generic USB commands on iPhone need a specific supported accessory/API route [S53/S54]; connector shape alone does not establish it.

Frequency and digital amplitude are independent; [amplification](Frequency-and-Amplitude.md#does-openwave-need-signal-amplification) is not needed to calculate the requested frequency. Load-compatible analog output remains unmeasured. Local MCU generation is only a proposed option: preserve one engine and obtain an explicit ADR-001 amendment before changing synthesis placement. See M-Q22–M-Q27 and the [decision register](Portable-Concept.md#portable-hardware-decision-register); offline retained WAV playback remains distinct from offline new generation.
