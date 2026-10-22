# Frequency, amplitude and physical output

Research date: 22 October 2026. INV-03/04/05/06; F05, U03 and M-Q02/06/11/12/22. These are engineering distinctions, not measured properties of the Electro-Med or a selected DAC. See the [source library](Source-Library.md), [signal contract](Signal-Specification.md) and [hardware investigation](Hardware-and-Electrical-Safety.md).

## Frequency versus signal strength

For the illustrative sine `x[n] = A sin(2*pi*f*n/Fs)`, `f` sets cycles per second at the nominal sample clock; `A` sets digital amplitude. Scaling a 1,000 Hz waveform changes its amplitude, not its requested 1,000 Hz frequency. This mathematical distinction is **ANSWERED — DOCUMENTED**. Actual analog frequency also depends on the playback clock and processing. At sufficiently small amplitude, quantization can produce silence; clipping or nonlinear electronics can introduce harmonics. None makes amplitude a frequency control.

| Term | Meaning and OpenWave boundary |
| --- | --- |
| Frequency (Hz) | Cycles per second; distinct from sample rate, which counts samples per second |
| Digital amplitude | Dimensionless sample magnitude relative to digital full scale; OpenWave's >0 to 0.8 setting is a peak ceiling, not volts, current or treatment intensity |
| Analog voltage | Potential difference at identified terminals under stated gain, frequency and load conditions; specify peak, peak-to-peak, RMS and DC separately |
| Electrical current | Charge flow through the connected circuit; depends on output behaviour and load, not frequency alone |
| Output impedance | Effective source impedance; can depend on frequency, operating level and protection state |
| Load impedance | The receiving circuit's opposition to AC, including resistive/reactive effects; not automatically equal to an instrument's input impedance |
| Power | Energy transfer per second. For a resistive load, average power is `Vrms²/R`; this simple expression is not a model of a human-contact load |
| Signal amplification | Increasing signal voltage, current capability or power within a stage's limits; does not generate a new fundamental simply by increasing gain |
| Signal conditioning | Filtering, buffering, attenuation, level shifting or other adaptation; may be needed without any increase in gain |
| Digital clipping | Samples exceed representable range and saturate; changes shape and introduces distortion. A valid export does not prevent later OS/DAC-stage clipping |
| DAC limitations | Supported rates/word lengths, clock accuracy, reconstruction response, noise, output range, DC bias, coupling and load-driving limits; inspect the chosen device |
| Electrical isolation | A defined barrier between circuits. A USB connector, a battery, low digital amplitude or a normal audio DAC does not establish galvanic isolation or safe human contact |

For a linear source model, source and load impedance form a frequency-dependent divider. Changing the load can change voltage and current without changing the requested waveform. DACs can have voltage or current outputs with different interface requirements; consult the selected part's specifications [S52]. No component values or output circuit are selected here.

## Does OpenWave Need Signal Amplification?

**No amplification is required simply to generate the requested frequency.** A phone, laptop or microcontroller can calculate digital samples; a suitable DAC converts samples into an analog signal. Platform capability does not authorize local synthesis in the current OpenWave application: its shared engine still executes in backend processes [S07/S09/S48; ADR-001].

Additional electronics might be needed for a specific load's measured electrical requirements. This could mean attenuation, buffering, filtering, isolation, protection or amplification. There is currently no agreed physical load/output specification demonstrating that an amplifier is required. **Amplification is a possible hardware requirement, not a confirmed OpenWave design requirement.** The Electro-Med's gain, regulation, filtering and other processing remain unverified.

## Laptop observation and interpretation

The owner reports playing a WAV on a laptop, connecting an electrode cable to its audio output and feeling no pulse [S55]. This is an informal owner observation; laptop/connector details, route, settings, load and analog measurements were not supplied. No measured zero-output or frequency result exists.

It does not establish absence of a waveform, incorrect frequency, zero volts, a need for amplification, that the Electro-Med merely boosts audio, or suitability of direct laptop-to-electrode connections. Possible explanations include output characteristics, connector pin assignments, level, impedance and frequency response; none has been diagnosed. Do not repeat body-contact experiments or increase headphone volume to investigate sensation. The next useful evidence is independent analog measurement into a reviewed electronic test load, under the [characterisation milestone](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation).

## Five independent evidence questions

| Question | Evidence required | Current status |
| --- | --- | --- |
| Digital waveform correctness | Independent samples, frames, headers and mathematical checks | Recorded 64-case software report; limited to its exact source and fixtures |
| Analog output correctness | Instrument captures, actual clock/rate, shape, levels and uncertainty | BLOCKED — MEASUREMENT REQUIRED |
| Electrical load compatibility | Defined loads, source/load behaviour, current, clipping and response | BLOCKED — MEASUREMENT REQUIRED |
| Human-contact electrical safety | Separate qualified design, isolation/fault assessment and applicable validation | OPEN — INVESTIGATION REQUIRED; excluded from prototypes |
| Medical or biological effectiveness | Separate suitable scientific evidence, not a waveform or electrical measurement | Not established; no claim or human study in this project |

Passing any row does not establish another. M-Q22 resolves only the conceptual amplification question; M-Q11/12 and INV-03/05/06 remain open.
