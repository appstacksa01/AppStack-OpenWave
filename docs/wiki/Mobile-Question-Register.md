# Mobile questions and evidence register

22 October 2026. Maps questions to INV/F/U identifiers; M-Q identifiers are subquestions, not replacements. Platform capability is distinct from project verification. Sources are in the [library](Source-Library.md). The [earlier audit](../Mobile-Research-Audit.md) is supplemented by the authorized [desktop implementation/results](Desktop-Player.md); desktop evidence must not close mobile/hardware questions.

## Status definitions

| Classification | Meaning |
| --- | --- |
| ANSWERED — DOCUMENTED | Supported by authoritative specifications or recorded project evidence, limited to the stated claim |
| FEASIBLE — NOT YET VERIFIED | Supported in principle; not demonstrated in the target implementation/hardware |
| PARTIALLY ANSWERED | Some aspects resolved; material evidence remains missing |
| OPEN — INVESTIGATION REQUIRED | Insufficient technical evidence |
| DECISION REQUIRED | Product/architecture choice, not a factual research gap |
| BLOCKED — HARDWARE OR TESTING | Required physical equipment or measurements are unavailable/not performed |
| BLOCKED — MEASUREMENT REQUIRED | Specific physical-measurement gate within the earlier hardware/testing category; not a resolved question |

## Reconciliation of original questions

| ID / original question and record | Status | Evidence and answer boundary | Required evidence / next action |
| --- | --- | --- | --- |
| M-Q01 / INV-04, F04: Can phones generate audio waveforms? | ANSWERED — DOCUMENTED | Platform audio APIs exist [S07/S09/S38]; this is capability, not an OpenWave phone implementation | Do not close target-device verification or authorize local synthesis on this basis |
| M-Q02 / INV-04: Is the signal within an audio path's capabilities, or is external generation required? | PARTIALLY ANSWERED | The defined sine WAV is digitally renderable; USB audio is documented [S08/S30]. Required electrode output is unknown | Measure bandwidth/levels into known loads; determine whether a DAC or a different generator is needed |
| M-Q03 / INV-04/07: What range, waveform, amplitude, timing and channels are needed? | PARTIALLY ANSWERED | v0.4 desktop extension defines sine/band-limited square/triangle; 64 digital cases recorded. It does not specify the Electro-Med's electrical requirements | Preserve the digital contract and separate sine-first mobile POC; characterize the physical target |
| M-Q04 / INV-04/05: Which output routes are supported? | ANSWERED — DOCUMENTED | USB audio is an Android/iPhone platform capability [S08/S30/S31]; USB-C selected for proposed portable path | Exact phone/OS/DAC pairs remain unverified under M-Q08; external generator protocols are separate |
| M-Q05 / INV-04: Calls, route changes, disconnects, lock and suspension? | FEASIBLE — NOT YET VERIFIED | Native mobile lifecycle mechanisms documented [S32–S37]; desktop adapter is software-tested, mobile adapters absent | Implement/test phone interruption policy; measure USB-loss fallback and require explicit restart |
| M-Q06 / INV-04, F10: Sampling, filtering, volume, clipping and processing effects? | PARTIALLY ANSWERED | Resampling and clocking are documented [S22/S30]; amplitude is not volts | Capture actual route rate, gain, clipping, distortion, response and uncertainty |
| M-Q07 / INV-04: Web, hybrid/native or external controller? | DECISION REQUIRED | Maintainer confirms one shared engine/principal TypeScript UI and separate web/Android/iOS audio adapters; ADR-002 compares framework options | Capability-validation findings must drive framework and native-development selection; no framework adopted |
| M-Q08 / INV-04/05: Which phone/OS/interface combinations can we verify? | BLOCKED — HARDWARE OR TESTING | No identified physical pair has been tested | Name available Android, USB-C iPhone, DAC/cable and instruments; execute POC matrix |
| M-Q09 / INV-01, U01: WAV/MP3, rates, bit depth and channels accepted by existing player? | PARTIALLY ANSWERED | Owner reports WAV and MP3 support; supplied sample is MP3 [S12]. Neither is an independently verified player-format matrix | Obtain revision/manual or qualified file-playback trials; generic phone docs cannot close this |
| M-Q10 / INV-01/03, U01: Reference identity, manufacturer, revision and output characteristics? | PARTIALLY ANSWERED | Electro-Med 235p/Natural Health labels observed [S11]; owner describes USB-stick workflow | Obtain manual/revision/manufacturer; physical characteristics tracked separately in M-Q11 |
| M-Q11 / INV-03/06: Voltage/current/impedance/isolation/waveform/response/gain/current limit/protection/channel independence/electrode characteristics? | BLOCKED — MEASUREMENT REQUIRED | None independently measured; photos, audio, branding and owner no-sensation observation cannot answer these | Qualified review first, then appropriate protocol/instruments/loads and raw measurements; establish reference isolation/safety before electrode-output measurements |
| M-Q12 / INV-05, U03: Minimum external hardware? | PARTIALLY ANSWERED | Amplification is unnecessary for digital frequency generation; analog/load requirements unresolved. DAC, ESP32 bridge, generator and validated module remain candidates [S47–S52] | Complete analog baseline and load requirements before selection; no amplifier or custom manufacture requirement adopted |
| M-Q13 / INV-06: What safety review, load/probing and fault handling are needed? | OPEN — INVESTIGATION REQUIRED | Existing agenda defines the boundary, not a completed review | Assign qualified reviewer; approve topology, instruments, load ratings and stop conditions before energizing |
| M-Q14 / INV-07: Can OpenWave create correct sine WAVs? | ANSWERED — DOCUMENTED | All 36 sine fixture hashes preserved in the later 64-case desktop report; 0 LSB reference error for fully compared fixtures | Limited to recorded source/fixtures; independent human reproduction, release and physical-output gates remain open |
| M-Q15 / INV-04/07: Can Portable work offline? | PARTIALLY ANSWERED | Local-file playback is feasible; current generator requires backend | Test retained local files without network; offline new generation needs explicit architecture decision |
| M-Q16 / INV-04/07: Sine, square, triangle and live generation? | PARTIALLY ANSWERED | Desktop request authorizes v0.4 shapes and backend live streaming; 64 independent files and actual stream downloads pass software checks | Phone playback/native integration and physical output remain unverified; on-phone synthesis still needs an ADR-001 decision |
| M-Q17 / INV-04/07: Can playback be continuous/deterministic? | OPEN — INVESTIGATION REQUIRED | Exact WAV frame counts do not prove DAC timing, gaplessness or uninterrupted OS execution | Measure multistep playback, maximum duration, drift, underruns, start/stop and event timing |
| M-Q18 / INV-05: Power/battery and charging while connected? | OPEN — INVESTIGATION REQUIRED | USB host supplies bus power [S29]; concept v0.2 makes a battery optional [S56], not required or proven unnecessary | Measure selected DAC startup/steady demand, phone supply/runtime/thermal behaviour; review charging topology under M-Q28 |
| M-Q19 / INV-02, U02: Jones report/historical reconstruction? | OPEN — INVESTIGATION REQUIRED | No new historical measurements reviewed; S05 remains located, not reliably inspected | Lawful scan review and source appraisal; unrelated mobile capability does not close it |
| M-Q20 / INV-08, U04: Software/docs licences and contribution process? | ANSWERED — DOCUMENTED | GPL-3.0-only software, CC-BY-SA-4.0 original docs and reviewed PR workflow recorded in merged licensing/policy documents | Hardware, dependencies, store distribution and third-party material still need their own rights review |
| M-Q21 / INV-09, U05: List/software reuse rights and complete signal settings? | PARTIALLY ANSWERED | Existing list inspection establishes provenance/parsing issues, not redistribution rights or complete settings [S27/S28] | Resolve licences, units, durations, waveform/amplitude and import rules; use synthetic fixtures meanwhile |

No entire INV-01/03/04/05/06/07/09 is closed by this review. M-Q01/M-Q04 answer platform-level subquestions only. No hardware acceptance, safe-contact claim or biological effect is established. See [POC acceptance](Mobile-POC.md) for the evidence required next.

## Portable hardware subquestions — 22 October 2026

New subquestions retain the original INV/F/U mapping. They were not previously separately classified; do not treat a newly documented answer as closure of its parent investigation.

| ID / question | Status | Evidence and boundary | Recommended next action |
| --- | --- | --- | --- |
| M-Q22 / INV-04/05, F05/U03: Is amplification needed to generate a requested frequency? | ANSWERED — DOCUMENTED | Frequency and amplitude are independent parameters; load conditioning remains unknown. [Explanation](Frequency-and-Amplitude.md#does-openwave-need-signal-amplification), mathematical contract and S52 | Measure analog/load behaviour; do not turn this into an amplification or safety requirement |
| M-Q23 / INV-05: Does ESP32-S3 provide the original ESP32 analog DAC? | ANSWERED — DOCUMENTED | No general-purpose built-in analog DAC of that type; external conversion is the investigated path [S47/S48] | Specify external DAC requirements without selecting/designing hardware |
| M-Q24 / INV-04/05: ESP32-S3 as USB audio peripheral to Android/USB-C iPhone? | FEASIBLE — NOT YET VERIFIED | Espressif UAC component plus platform audio support [S49/S08/S31]; no tested pairing | Pin descriptors/SDK/board, review power, then obtain separately authorized enumeration/route/measurement evidence |
| M-Q25 / INV-04/05: Commands to ESP32 from both mobile platforms? | PARTIALLY ANSWERED | Android host endpoints documented [S29]; iPhone accessory/API route requires specific review [S53/S54] | Resolve iPhone protocol/programme/entitlement terms and deployment targets before selecting transport |
| M-Q26 / INV-04/07: Local ESP32 generation while retaining one engine? | DECISION REQUIRED | MCU capability supports investigation [S47/S48]; ADR-001 backend execution still controls. No portable runtime or firmware conformance evidence | Review execution-policy amendment, engine portability/resources and common golden fixtures before implementation |
| M-Q27 / INV-03/05/06: Can laptop, DAC, optional ESP32 and Electro-Med outputs be compared? | BLOCKED — MEASUREMENT REQUIRED | [Milestone and entry conditions](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation) defined; no captures or assigned equipment/reviewer | Establish laptop/commercial-DAC baseline first; independently establish reference isolation/safety before its output measurements |

## Status and evidence change log — 22 October 2026

| Original question | Previous status | New status | Evidence / remaining uncertainty | Next action |
| --- | --- | --- | --- | --- |
| M-Q11: Reference electrical output, isolation and protection? | BLOCKED — HARDWARE OR TESTING | BLOCKED — MEASUREMENT REQUIRED | More specific label for the same unresolved physical gate; S55 is observation only, not electrical evidence | Qualified documentation/safety review and load-defined measurements |
| INV-03 progress summary: Hardware characterization? | Not measured | BLOCKED — MEASUREMENT REQUIRED | Same absence of physical data, now linked to an explicit milestone; no acceptance change | Assign qualified reviewer/equipment and execute the laptop/DAC baseline before optional reference comparison |
| M-Q12: Minimum external hardware? | OPEN — INVESTIGATION REQUIRED | PARTIALLY ANSWERED | Digital frequency generation needs no amplifier; S47–S52 establish candidate capabilities, not physical load requirements | Analog characterisation and measured requirements comparison |
| M-Q03: Required waveform/timing/channels? | PARTIALLY ANSWERED | PARTIALLY ANSWERED (evidence correction) | Replaces stale sine-only wording with v0.4 desktop evidence; mobile scope and physical needs remain separate | Preserve specification; measure physical target |
| M-Q05: Interruptions/route changes? | FEASIBLE — NOT YET VERIFIED | FEASIBLE — NOT YET VERIFIED (mobile status retained) | Corrects obsolete absence-of-playback wording; desktop adapter exists, phone behaviour untested | Named-phone lifecycle/route tests |
| M-Q22–M-Q27: Newly explicit subquestions above | Not separately recorded | As individually classified above | Sources and limitations recorded per row; no new measurements | Follow each row's next action; parent INV statuses remain unresolved |

## Concept v0.2 follow-up — 23 October 2026

The maintainer's functional proposal [S56] prioritizes a standard USB Audio Class DAC with no ESP32/AD9833 in the baseline. This changes proposed scope, not technical feasibility or hardware acceptance. M-Q05/08/17 cover cross-platform routing/lock/interruptions, M-Q18 covers battery necessity, M-Q11/27 cover Electro-Med output and M-Q13 covers future protection/isolation. None is answered by the drawing. See [all six questions](Portable-Concept.md#critical-open-engineering-questions).

| ID / question | Previous status | Current status | Evidence / uncertainty | Next action |
| --- | --- | --- | --- | --- |
| M-Q18 / INV-05: Battery needed or phone-powered? | OPEN — INVESTIGATION REQUIRED | OPEN — INVESTIGATION REQUIRED | S56 makes battery optional; selected DAC/phone load budget and supply behaviour remain unknown | Measure startup/steady demand and phone power/runtime/thermal behaviour before selecting a cell |
| M-Q28 / INV-05/06: Dedicated USB-C charging input or shared audio/charging port, if battery-powered? | Not separately recorded; part of M-Q18 | DECISION REQUIRED | S56 proposes alternatives; no selected power/data roles, power path, topology or fault evidence | Qualified role/power-path/backfeed/charging/thermal review; first establish whether external power is needed |
| M-Q29 / INV-05: Can the complete validated hardware meet 80 x 50 x 20 mm and under 100 g? | Not separately recorded | OPEN — INVESTIGATION REQUIRED | S56 records aspirations, not verified fit/mass or accepted constraints | Budget all components, enclosure, connectors, power/protection and future output hardware; measure complete assembly and review thermal behaviour |
| M-Q24–M-Q26: ESP32 UAC, command transport and local generation? | FEASIBLE — NOT YET VERIFIED / PARTIALLY ANSWERED / DECISION REQUIRED respectively | Unchanged technical classifications; outside proposed baseline | Controller omitted from v0.2, not disproved; prior evidence/engine-execution gates retained | Reopen product scope only for demonstrated diagnostics, proprietary controls, monitoring or independent playback needs |

Decision trace: P-D02 changes from a feasible candidate to a deferred alternative outside baseline; P-D03 changes from an unselected audio/command choice to a **proposed UAC baseline**, with compatibility still unverified. P-D07 records undecided power/ports and P-D08 aspirational packaging. See the [decision register](Portable-Concept.md#portable-hardware-decision-register). No parent investigation closes, safety acceptance occurs or implementation begins.

## Enterprise follow-up — 23 October 2026

M-Q07 framework, M-Q15 offline operation, M-Q16 live shapes and M-Q26 local generation retain unresolved platform/execution gates. The master task [S57] adds local WAV generation as a target; it does not satisfy those gates or silently amend ADR-001/AGENTS. See [ADR-005](../ADR-005-Offline-Generation.md) and [ADR-002 offline synchronization](../ADR-002-Mobile-Playback.md#proposed-mobile-catalogue-and-offline-flow). New enterprise questions E-Q01–E-Q12 in the [readiness register](../Enterprise-Architecture-Audit.md#l-outstanding-decision-and-investigation-register) supplement existing INV/M-Q/P-D identifiers rather than replacing or closing them. Native playback, IAM/catalogue integration and physical DAC acceptance remain separate evidence requirements.

## Review follow-up: scoped decisions

M-Q15 offline playback is separated from M-Q26 new local generation by [R3 versus R4](../Release-Readiness.md). E-Q01 remains blocked only for local generation; it does not block desktop/catalogue/retained-file scopes. Identity switching, programme/WAV bindings and dependent withdrawals now have [explicit contracts](../Enterprise-Architecture-Audit.md#review-gap-closure--23-october-2026); technical implementation/device/rights evidence remains required. No parent INV or physical acceptance status is closed.
