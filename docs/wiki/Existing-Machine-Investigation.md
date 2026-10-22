# Existing machine investigation

Status: model identified from owner-supplied exterior photographs; manufacturer manual, revision, and electrical behaviour remain unverified. No hardware testing performed. Investigations: INV-01 and INV-03. Source: S11 (private owner photographs).

## Observed identification and controls

| Exterior observation | Interpretation limit |
| --- | --- |
| Model label: Electro-Med 235p; Natural Health branding | Branding does not establish the legal manufacturer or revision |
| Product description: dual programmable frequency resonator | Label terminology, not independent performance evidence |
| Channel 1/2 electrode terminals and handheld metal electrodes | Independence, isolation, and electrical characteristics unmeasured |
| RCA input labelled Computer / Freq. Generator, CH1/CH2 | External input is labelled; accepted levels and bandwidth unknown |
| Source selector labelled computer/frequency generator and USB flash | File formats and actual USB playback behaviour unverified |
| RCA outputs labelled frequency counter/oscilloscope | Measurement connections are labelled; loading and scaling unknown |
| Intensity control, indicators, pause/resume, and mains/high-voltage labels | No calibration, isolation, compliance, or safety certification verified |

The owner recalls software generating an audio file from frequency lists; the application is no longer available. The supplied example is MP3, not WAV. The [local audio analysis](Audio-Sample-Analysis.md) documents its digital contents, not the machine's output. Do not infer compatibility or a circuit design from these observations.

Personal names, the device serial number, and original photographs are not included in the public notebook.

## Collect first

### Portable research reconciliation — 22 October 2026

The owner reports audio stored on a USB memory stick, selected/played by the equipment, processed internally and delivered at metal hand electrodes; footplate accessories are possible but not independently characterized. WAV and MP3 support is owner-reported, not a completed format matrix. The private sample analysis verifies that file's MP3 encoding only.

**INV-01: PARTIALLY ANSWERED. INV-03: BLOCKED — HARDWARE OR TESTING.** Smartphone USB audio support cannot establish the machine's voltage, current, output impedance, isolation, waveform shape, frequency response, amplification, current limiting, fault protection, channel independence or electrode-connection characteristics. Each remains unverified pending a manual with provenance and/or appropriate qualified tests. Photos and the “8Ω Min” label must not be treated as a body-contact/load specification.

Do not equate a USB memory-stick reader with a USB Audio Class input: mass-storage playback and streaming digital audio are different interfaces. A mobile DAC may replace an audio source in a future investigated path, not necessarily any of the unknown output circuitry. See [question register M-Q09–M-Q13](Mobile-Question-Register.md) and the [portable concept](Portable-Concept.md).

- Manufacturer, model, revision, purchase period, and operating modes.
- External label/control/connector photos, with unnecessary identifying details redacted.
- Manufacturer manual, stated specifications, accessory descriptions, and source provenance.
- Evidence of whether the device accepts audio, generates signals internally, or uses another method.

Appearance and audible sounds do not establish its electrical output. Do not open or energize unknown equipment solely to answer these questions. Measurement planning requires competent electronics expertise, especially for mains-powered equipment.

## Electrical questions still unanswered

The owner-reported sequence is WAV files on a USB memory stick → equipment playback → unknown internal processing → output at stainless-steel hand electrodes [S55]. This describes use, not a verified block diagram. The separate [laptop observation](Frequency-and-Amplitude.md#laptop-observation-and-interpretation) does not show that the machine simply amplifies laptop audio.

| Question | Evidence still required |
| --- | --- |
| Actual output voltage? | Defined mode, frequency, intensity setting and load; RMS/peak/DC captures |
| Current into specified loads; regulation or limiting? | Qualified load-defined measurements plus manufacturer circuit/protection information where available |
| Does it amplify input; relationship between WAV amplitude and output? | Input/output transfer measurements across reviewed levels, frequencies and settings |
| Waveform alteration, modulation or filtering? | Captured input/output shape/spectrum/response; do not infer architecture from sensation |
| Galvanic isolation? | Appropriate manufacturer evidence and independent qualified assessment before electrode-output measurements |
| Supported frequency range? | Manual/revision and measured response at defined conditions, distinct from audio-file contents |
| Two-channel implementation and independence? | Channel mapping, simultaneous behaviour and qualified coupling/isolation assessment |
| Output impedance? | Appropriate source/load characterization across conditions |
| Dedicated protection circuitry and fault behaviour? | Documented protection design and qualified assessment; normal playback alone cannot establish it |

All remain **BLOCKED — MEASUREMENT REQUIRED** for physical behaviour, with documentation collection still open under INV-01. This refines the earlier “BLOCKED — HARDWARE OR TESTING” label; it does not resolve INV-03. Obtain manufacturer documentation with provenance and the qualified review required by [Analog Output Characterisation](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation). No person is a test load; do not provide or repeat direct audio-to-electrode experiments.

## Prepare a bench protocol

An engineer should select appropriate loads, isolation/probing methods, instrument ratings, and stop conditions before measurement. No person is part of the circuit.

| Area | Required record |
| --- | --- |
| Identity | Device/revision, manual reference, mode |
| Setup | Connection diagram, load type/value, instruments and calibration status |
| Signal | Waveform, fundamental frequency, spectrum, modulation and pulse timing |
| Electrical output | Voltage/current under the specified load, DC offset, load dependence |
| Repeatability | Settings, duration, repeat observations and uncertainty |
| Artifacts | Raw captures/data, method, anomalies, interpretation limits |

## Completion

INV-01: reviewed identity/documentation record, or a decision to pursue a generic bench generator without claiming reproduction.

INV-03: reviewed protocol and measurements where suitable equipment/expertise is available. If unavailable, record the limitation and reduce the scope; do not assume missing specifications.
