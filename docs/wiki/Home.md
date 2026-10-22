# Research home

AppStack is investigating an open-source mobile frequency generator. This notebook records source claims, current implementation evidence, open questions and the decisions/verification required before each later stage.

Updated: 22 October 2026. Stage: uncommitted desktop waveform-player prototype. The [desktop increment](Desktop-Player.md) reuses the engine/UI, adds explicit local/live audio playback and has 64 independent WAV cases plus frontend/backend/process checks. Physical output, mobile adapters and independent release reproduction remain unverified. The [earlier audit](../Mobile-Research-Audit.md) is a planning-stage snapshot, superseded for desktop status by the new guide. Backend-process synthesis remains controlling; the desktop request explicitly extends the original file-only scope.

## Contents

Start with [research progress and answered questions](Research-Progress.md) for the current status and next steps.

1. [Project scope](Project-Scope.md)
2. [Historical research](Historical-Research.md)
3. [Source library](Source-Library.md)
4. [Findings and uncertainties](Findings-and-Uncertainties.md)
5. [Existing machine investigation](Existing-Machine-Investigation.md)
6. [Mobile capabilities](Mobile-Capabilities.md)
7. [Hardware and electrical safety](Hardware-and-Electrical-Safety.md)
8. [Development readiness and backlog](Development-Readiness.md)
9. [Audio sample analysis](Audio-Sample-Analysis.md)
10. [Software and supplier research](Software-and-Supplier-Research.md)
11. [Test equipment research](Test-Equipment-Research.md)
12. [First prototype signal specification](Signal-Specification.md)
13. [Repeatable signal verification plan](Signal-Verification-Plan.md)
14. [Frequency-list review](Frequency-List-Review.md)
15. [Audio-format research](Audio-Format-Research.md)
16. [OpenWave Portable concept](Portable-Concept.md)
17. [Mobile question and evidence register](Mobile-Question-Register.md)
18. [Mobile POC and acceptance matrix](Mobile-POC.md)
19. [Desktop player, results and lab plan](Desktop-Player.md)
20. [Frequency, amplitude and amplification](Frequency-and-Amplitude.md)
21. [ESP32-S3 portable architecture investigation](ESP32-S3-Investigation.md)

Latest hardware review: [audit, decisions and evidence limits](../Portable-Hardware-Research-Review.md). Next milestone: [OpenWave Analog Output Characterisation](Hardware-and-Electrical-Safety.md#openwave-analog-output-characterisation). No hardware output is verified; the ESP32-S3 remains a candidate.

Mobile architecture: [ADR-002 direction and diagram](../ADR-002-Mobile-Playback.md). The maintainer's direction is one shared engine, one principal TypeScript UI and separate web/Android/iOS audio adapters. Framework selection and native implementation await capability validation; on-phone synthesis is not authorized.

Implementation references: [coding and testing standards](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Coding-Standards.md) and [backend architecture](https://github.com/appstacksa01/AppStack-OpenWave/blob/main/docs/Architecture.md).

Use the [research entry template](Research-Entry-Template.md). Reference sources by ID, preserve disagreements, and update requirements when evidence changes.

The files in `docs/wiki/` are the version-controlled source for the [published wiki](https://github.com/appstacksa01/AppStack-OpenWave/wiki). Submit changes through repository pull requests, then synchronize approved pages. The repository copy remains available for review and offline reading.
