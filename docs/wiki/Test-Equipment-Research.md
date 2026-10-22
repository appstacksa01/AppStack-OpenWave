# Test equipment research

Reviewed: 22 October 2026. **No purchase, calibration, bench setup approval, or hardware test has been completed.** Amazon listings were inaccessible; numerical details below come from manufacturer documentation, not verified seller bundles or current prices.

## FeelElec FY8300S-20M

The [manufacturer page](https://feelelec.cn/html/product/signalgenerator/108.html) describes three independent outputs and computer control with an available communications protocol [S16]. The [2019 manufacturer manual, hosted by a distributor](https://supereyes.ru/img/instructions/FY8300S_manual.pdf) specifies sine/square generation to 20 MHz for the 20M model and USB-to-serial control [S17, printed pp. 10, 46, 49].

Potential role: generating known reference signals and investigating an external-instrument backend for OpenWave. Verify the exact model/revision, protocol, driver requirements, and load-dependent output specifications before integration. An arbitrary-waveform memory is not automatically a long-duration WAV player.

## FNIRSI DSO-510

[FNIRSI's product specifications](https://www.fnirsi.com/products/dso-510) list one oscilloscope channel, 10 MHz bandwidth, 48 MS/s sampling, and a generator up to 50 kHz [S18].

Potential role: initial inspection of low-voltage audio-range test signals. This is an engineering assessment of published specifications, not measured accuracy. One input prevents simultaneous input/output comparison. The 10 MHz scope bandwidth and 50 kHz generator limit describe different functions. A 10 MHz scope cannot fully characterize a 20 MHz output.

## Selection criteria

| Need | Decision required |
| --- | --- |
| Input/output comparison | Whether simultaneous two-channel acquisition is required |
| Waveform verification | Bandwidth for harmonics/edges as well as the fundamental |
| Output amplitude | Expected levels, probe attenuation, input ratings, and uncertainty |
| Isolation and grounding | Appropriate differential/isolated measurement arrangement and fault assessment |
| Reproducibility | Calibration/reference checks, raw captures, data export, and documented loads |
| Software integration | Protocol availability and supported computer/phone interface |

Battery power or a headline voltage range does not establish safe isolation. Unknown electrode outputs must not be connected until a competent engineer reviews the circuit, probes, ratings, grounding, and test load. These instruments are not proposed for direct connection to people.

Next: write the measurement requirements, identify available equipment/expertise, and review the setup under INV-03/INV-06 before choosing equipment.