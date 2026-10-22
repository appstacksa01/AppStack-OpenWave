# ESP32-S3 portable architecture investigation

Reviewed: 22 October 2026. INV-04/05/07, with INV-03/06 measurement gates. **Research candidate only: no board selected, firmware implemented, purchase or hardware design authorized.** Preserve one shared engine, one principal TypeScript UI and separate web/Android/iOS playback adapters. See [ADR-002](../ADR-002-Mobile-Playback.md), [Portable concept and decision register](Portable-Concept.md#portable-hardware-decision-register) and the [question register](Mobile-Question-Register.md).

## Documented capability and limits

| Topic | Evidence and disposition |
| --- | --- |
| Native USB device | ESP32-S3 has full-speed USB OTG; Espressif documents device functions and TinyUSB integration [S47/S50]. ANSWERED — DOCUMENTED for chip/SDK capability, not OpenWave interoperability |
| USB-C development boards | Espressif lists USB Type-C on its ESP32-S3-USB-OTG board [S51]. Board availability as a documented option is not a stock, cost or suitability check. Verify exact revision and connection to native USB rather than a USB-to-UART bridge |
| Analog DAC | The S3 lacks the original ESP32's general-purpose built-in analog DAC. Its I2S capability table shows no ADC/DAC mode, and the datasheet identifies its peripherals [S47/S48]. Investigate an external DAC/codec; digital I2S or PWM is not a calibrated analog output |
| Samples and sequence control | CPU, memory, timers and digital audio peripherals support investigation of buffered samples and sequence scheduling [S47/S48]. FEASIBLE — NOT YET VERIFIED for OpenWave throughput, precision, storage and timing |
| Compact/portable operation | A compact controller is plausible; enclosure size, thermal behaviour, power draw and runtime depend on the complete board/DAC/interface. No battery or dimension result exists |
| Diagnostics | Firmware state, negotiated format, buffer-underrun and clock information could be exposed. These would not independently measure DAC terminals; analog measurement needs suitable instruments or a separately validated acquisition path |

The ESP32-S3's USB OTG and USB Serial/JTAG controllers share a PHY [S50]. Debugging/programming strategy and the actual board connection must be reviewed; no fuse changes or extra circuitry are proposed here.

## Option A — USB audio streaming

The proposed mobile app plays an already generated WAV through the phone's audio stack. The phone acts as USB host; an ESP32-S3 UAC peripheral receives digital PCM and sends it through I2S to an external DAC. USB carries audio samples, not necessarily the WAV container/header. The DAC feeds only a reviewed electronic test load in this research phase.

Espressif provides a TinyUSB-based `esp_device_uac` component/example, configurable audio formats and buffering/feedback facilities [S49]. This establishes an implementation starting point, not an OpenWave implementation or a verified Android/iPhone accessory. Pin component/SDK versions, inspect actual UAC revision/descriptors, supported rates and mute/volume handling. The documentation warns that its macOS compatibility setting may affect Windows recognition; macOS support is not evidence of iOS support.

Android documents a host-mode UAC1 baseline including PCM16, 44.1/48 kHz and mono/stereo [S08]. Apple documents USB-C audio accessories on iPhone [S31]; it does not certify this ESP32 firmware. Test enumeration, descriptors, negotiated format, permission/security state, audio route, disconnects, clock feedback and power on each exact phone/OS pairing. Class-compliant audio can use the OS audio route; it does not require treating the device as an arbitrary USB serial peripheral.

Option A preserves the current engine placement: verified files come from the backend, are retained locally, then play offline. The ESP32 would transport/buffer PCM rather than contain another oscillator. An ordinary commercial USB-C DAC remains the simpler baseline; investigate an ESP32 bridge only if a documented requirement justifies it.

## Option B — command-based local generation

The phone sends versioned sequence/configuration commands; the ESP32 generates samples locally and feeds an external DAC. FEASIBLE — NOT YET VERIFIED as an embedded approach; **DECISION REQUIRED** for OpenWave execution policy, engine portability and cross-platform transport. No firmware or duplicate C/C++ waveform engine is approved.

Android's USB host APIs allow permission-based endpoint communication on supporting devices [S29]. That does not provide an identical iPhone transport. Apple's USBDriverKit support is for macOS and supported M-series iPads, not a generic iPhone driver path [S53]. Apple DTS describes iAP3/ExternalAccessory as an iPhone accessory route with its own development trade-offs [S54]; programme eligibility, protocol access, authentication/licensing and deployment support must be confirmed. USB-C audio support does not prove arbitrary CDC/vendor commands work in an iPhone app. Do not label all command paths impossible, universally available or free of accessory requirements.

Commands would need units/schema, capability negotiation, acknowledgements, validation/resource limits, programme integrity, timing semantics, stop/mute ownership and communication-loss policy. These are research questions, not a protocol design. USB message arrival must not determine sample timing; local sample-clock/buffer behaviour needs measurement. A phone software mute is not a physical hardware interlock.

ADR-001 currently requires backend synthesis. Before Option B implementation, a reviewed amendment must establish how one authoritative engine/contract can execute on the MCU without formula duplication, and how numerical conformance, precision, fades and timing are verified. MCU resources, TypeScript execution/portability and toolchain costs are unbenchmarked; mathematical plausibility alone does not solve engine reuse.

## Options compared

Assessments below are architectural inferences, not benchmarks or compatibility results.

| Criterion | A: USB audio streaming | B: commands and local generation |
| --- | --- | --- |
| Cross-platform compatibility | Uses existing OS audio support; exact UAC/phone combinations unverified | Android host path documented; iPhone transport/accessory route unresolved |
| Audio accuracy | Shared verified PCM; OS mixing/resampling and DAC clock affect terminals | New execution environment and clock require numerical conformance and physical checks |
| Sample rate | Target existing PCM16 44.1/48 kHz formats; descriptor/clock agreement unverified | Rate set by firmware/DAC clock; exact achievable rates and error unmeasured |
| Timing | Phone buffers, USB feedback and DAC clock; latency/underruns must be measured | Local schedule can avoid per-step USB latency; start latency, drift and underruns unverified |
| Firmware complexity | USB descriptors, buffering/feedback, I2S, mute and errors; no oscillator | Transport plus sequence engine, validation, scheduling and firmware lifecycle |
| Battery | Continuous phone playback/USB plus board/DAC load; unmeasured | Potentially fewer USB data transfers; MCU computation and total power unmeasured; no savings claim |
| Offline operation | Retained WAV plays without network; new generation still needs backend | New local programmes possible only after engine/execution decision and implementation |
| Development effort | Lower engine-reuse risk; still embedded/USB integration work | Greater engine/toolchain/protocol and iPhone access uncertainty; no estimate agreed |
| Testing complexity | File integrity, enumeration, route, feedback, buffers, output and interruption matrix | All relevant analog checks plus firmware maths, commands, storage, timing and fault tests |
| Future extensibility | Additional documented formats/status can be investigated; diagnostics may need separate transport | Richer device control possible if a supported protocol and shared semantics are established |

## External DAC investigation requirements

Record exact part/module/revision, I2S format/clock requirements, PCM resolution/rates, channel mapping, analog output type/bias/range, rated load, impedance, coupling/reconstruction response, noise/distortion and supply requirements. Assess clock ownership and drift across USB/I2S/DAC, buffer sizes/underruns, start/stop transients, mute and reset/USB-loss behaviour. A higher bit-depth label does not establish better usable accuracy. Include power draw, charging/topology and protection/isolation requirements without assuming they exist [S48/S52].

No DAC, amplifier or manufacturing requirement is selected. Compare commercially available audio interfaces before custom hardware. Additional conditioning is load-dependent; see [Does OpenWave Need Signal Amplification?](Frequency-and-Amplitude.md#does-openwave-need-signal-amplification).

## Evidence needed next

First complete the [OpenWave Analog Output Characterisation](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation) laptop/commercial-DAC baseline. Add ESP32-S3 plus external DAC only if equipment is available and a subsequent implementation decision authorizes it; its absence must not block that baseline. Freeze board/component identities and run Android/USB-C iPhone enumeration, format, route, interruption and power tests before selecting either option. No complete INV is closed by this source review.
