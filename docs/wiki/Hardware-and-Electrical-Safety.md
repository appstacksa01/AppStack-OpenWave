# Hardware and electrical safety

Status: no hardware selected or approved. Investigations: INV-03, INV-05, INV-06.

Initial work is simulation and bench testing into suitable loads. Direct phone-to-electrode connections and body-connected experiments are outside this phase. Historical circuits are not modern safety designs. Low frequency or nominal power alone does not establish safety.

## Engineering review questions

- What output and load behaviour need characterization?
- Is hardware required, and how will isolation, current limitation, DC offset, power sources, and fault conditions be assessed?
- What changes when charging, using USB, disconnecting loads, or encountering damaged leads?
- What instruments, ratings, loads, and stop conditions suit the possible output?
- What hardware behaviour is needed when the app crashes or communication is lost?
- What expertise and applicable standards/regulatory assessment would a future body-connected design require?

This is a review agenda, not a construction specification or certification. No exposure limits are established here.

## Deliverables

1. Reviewed bench setup and stop conditions before measurements.
2. Test-only interface requirements and proposed hardware boundary.
3. Hazard record, mitigations, unresolved risks, and reviewer expertise.
4. An explicit bench-only scope decision for the initial phase.

Electrical measurements do not establish medical effectiveness. Cancer Research UK reports no reliable evidence of a cancer cure and notes reports of shocks and rashes [S06]. No treatment protocols are provided.

## Portable hardware roadmap

The immediate desktop investigation starts with ordinary laptop sound-card output, then a compatible USB-C DAC using the same test fixtures and reviewed electronic loads. Follow the [desktop lab plan](../Desktop-Player.md#short-manual-lab-verification-plan). Compare measurements before deciding whether additional hardware is needed. Keep waveform generation, audio playback and future hardware-specific interfaces independent; the first two can be developed and software-tested while hardware questions remain open.

22 October 2026. INV-03/05/06 remain open; no equipment, module or setup has been selected/approved. USB-C is mandatory for the proposed portable hardware path. A normal USB-C DAC is an audio component, not a validated human-contact electrical-output device. No direct DAC-to-electrode wiring is provided or authorized.

| Candidate | Useful question | Gate before use or selection |
| --- | --- | --- |
| Standard active USB-C DAC/audio interface | Can native playback produce the intended audio waveform into a known electronic load? | Obtain exact device/format/power data; qualified load/probing review; measure frequency, amplitude, distortion, clock drift, continuity and route-loss transients |
| Off-the-shelf programmable signal generator | Is non-audio bandwidth, shape, level or timing required? | Define requirements and phone control protocol; published instrument features are not verified mobile integration or human-contact suitability |
| Commercial validated electrical-output module | Can a documented module meet future isolation/current/fault and intended-use requirements? | No specific module validated here; obtain intended-use/test evidence and expert assessment against complete requirements |
| Custom hardware | Is there a documented requirement that existing solutions cannot meet? | Record why alternatives fail; agree hardware licence, funded scope, specialist design and independent validation before implementation |

Sequence: (1) inventory available phones/interfaces/instruments without purchasing; (2) assign qualified reviewer and agree load, grounding, instrument ratings, uncertainty and stop conditions; (3) characterize low-voltage DAC output on electronic loads; (4) separately review the unknown Electro-Med measurement setup; (5) compare measured requirements before selecting a generator/output module or custom design. Charging/powered hubs, faults, damaged cables and disconnect/reconnect need their own topology assessment. Phone battery operation alone does not establish isolation.

Use the [POC acceptance/device matrix](Mobile-POC.md). Record failures and unsupported pairs. No human subjects, electrical exposure limits, safety certification or equivalence claim is part of this roadmap.

## OpenWave Analog Output Characterisation

Proposed next research milestone, 22 October 2026; a sub-investigation of existing INV-03/05/06, not a replacement ID. Status: **BLOCKED — MEASUREMENT REQUIRED**. No physical results exist. The purpose is to compare actual analog output with verified digital fixtures and determine whether any additional conditioning or amplification is needed. See [frequency versus amplitude](Frequency-and-Amplitude.md) and the [desktop procedure](../Desktop-Player.md#short-manual-lab-verification-plan).

| Candidate path | Entry condition | Current evidence |
| --- | --- | --- |
| Laptop audio output | Identified output/connector/route and reviewer-approved load/instrument setup | Owner's no-sensation account only [S55]; no analog measurements |
| Compatible commercial USB-C audio DAC | Exact device/revision/formats, cable, host and power topology recorded | Platform capability documented; no OpenWave physical result |
| ESP32-S3 with external DAC, if available | Later firmware/execution authorization, identified board/DAC and reviewed setup | Candidate architecture only [S47–S51]; not implemented or required for baseline |
| Electro-Med 235p | Qualified personnel independently establish isolation/safety properties and approve the measurement arrangement before any electrode-output measurement | No manual-backed electrical specification or measurement; do not energize/connect an unknown output to ordinary grounded equipment |

1. Inventory available equipment and assign a qualified reviewer. Define intended operating mode, electronic loads and their ratings, instrument ranges/bandwidth/calibration, probing/grounding/isolation arrangement, uncertainty and stop conditions before connecting outputs. No body-contact wiring or stimulation circuit is part of this plan. Do not assume an oscilloscope's protective earth can be disconnected safely.
2. Freeze synthetic WAV inputs/checksums, generator/checker source versions and file rate/channel/amplitude settings. Reuse the desktop sine fixtures (20, 125.5, 500, 1,000 and 10,000 Hz), specified band-limited shapes and multistep/max-duration cases. Compare the same fixtures where a path supports them; record unsupported formats rather than altering them silently.
3. Establish the laptop baseline, then repeat on a commercial USB-C DAC. Add the optional ESP32 and separately reviewed Electro-Med only when their entry conditions are met. Reference equipment uncertainty must suit the agreed tolerances; proposed digital tolerances are not automatically physical acceptance criteria.
4. Record the measurement set below across reviewer-approved loads and levels, including unloaded/reference behaviour where appropriate. Separate direct measurements, calculations and unknowns. Do not assume constant source impedance or current limiting from a single point.
5. Review repeatability, failures, physical tolerances and requirement gaps. Compare off-the-shelf alternatives before deciding whether custom conditioning, an ESP32 bridge or another generator is justified. No pass status until agreed criteria and independent review are satisfied.

| Measurement | Required record |
| --- | --- |
| Frequency accuracy | Requested/measured Hz, actual output clock/rate where known, drift, estimator and uncertainty |
| Waveform shape and timing | Raw time-domain captures, fundamental/harmonic spectrum, transitions, gaps, duration, start/stop/mute/USB-loss behaviour |
| Voltage | Loaded RMS, peak, peak-to-peak and DC offset; measurement bandwidth and all app/OS/device gain settings |
| Current under defined loads | Measured current and method, or explicitly calculated value for a known resistive load with uncertainty; never infer body current |
| Distortion and clipping | Sine THD/THD+N with analysis bandwidth; square/triangle comparison to their specified intentional harmonics; onset/conditions of clipping |
| Response and noise | Frequency-dependent gain/phase where measurable, noise floor, spectrum and instrument bandwidth |
| Changes under load | Voltage/current/shape versus defined load; source-impedance estimate only if its model/measurement is valid |
| Reference-machine transfer | WAV amplitude and intensity settings versus output, channels/modes, filtering/gain/limiting evidence; isolation/protection require separate qualified assessment |

Publish a reviewable record with timestamp, host/OS/browser/app and worker versions, board/DAC/firmware identity, topology diagram approved by the reviewer, load values/ratings, instruments/calibration, complete settings, checksums, raw captures, analysis version, uncertainty, anomalies and reviewer disposition. Include battery draw/thermal observations where possible; charging/hub topology needs its own assessment. MCU counters or the UI trace are diagnostic data, not independent analog evidence.

Completion is a reproduced laptop/DAC baseline with explicit limits and a measured requirements comparison, or an honest blocked/inconclusive result. It does not require buying an ESP32 or characterizing the Electro-Med first. Qualified safety review remains a prerequisite for that machine's output work. No human-contact suitability, medical effectiveness or reference-machine equivalence follows from this milestone.
