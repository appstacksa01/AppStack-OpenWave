# AppStack OpenWave

An AppStack open-source research and development initiative exploring mobile signal generation and the engineering behind historical and commercial devices described as Rife frequency generators.

**Status: local desktop waveform-player prototype; uncommitted and not a release.** The existing UI now loads WAVs, plays live backend-generated sine/band-limited square/triangle sequences and provides software mute, route feedback and a digital monitor. See the [desktop guide, results and lab plan](docs/Desktop-Player.md) and [desktop architecture decision](docs/ADR-003-Desktop-Player.md). No physical sound-card/DAC/phone output has been measured or validated.

## What we want to explore

We want to understand what these devices actually output, which functions a mobile phone can reproduce, and what external hardware would be required. We invite developers, electronics engineers, researchers, and technical writers to contribute reproducible evidence.

The original milestone was a browser sine-sequence WAV exporter. The maintainer's desktop-player request now extends that shared engine with band-limited square/triangle and explicit live/file playback, without adopting a desktop framework. The [signal contract](docs/wiki/Signal-Specification.md) defines the working-tree extension and unchanged limits. Electro-Med compatibility and physical measurements remain separate investigations.

## Research scope

This is an experimental engineering project. We make no claims that the proposed app or hardware can diagnose, treat, or cure disease. Historical claims, personal accounts, and commercial frequency lists are not proof of medical effectiveness. Cancer Research UK reports no reliable evidence that Rife machines cure cancer: [evidence overview](https://www.cancerresearchuk.org/about-cancer/treatment/complementary-alternative-therapies/individual-therapies/rife-machine-and-cancer).

Generating a digital waveform does not demonstrate the same electrical output as a commercial machine or establish a biological effect. Initial investigations are limited to simulation and bench measurements into suitable test loads. Body-connected hardware requires a separate qualified engineering and safety review; do not connect electrodes directly to a phone or ordinary amplifier.

## Research notebook

Start at the [GitHub research wiki](https://github.com/appstacksa01/AppStack-OpenWave/wiki). The [repository copy](docs/wiki/Home.md) preserves the research pages in version control.

- [Scope and research questions](docs/wiki/Project-Scope.md)
- [Historical research](docs/wiki/Historical-Research.md)
- [Source library](docs/wiki/Source-Library.md)
- [Findings and uncertainties](docs/wiki/Findings-and-Uncertainties.md)
- [Existing machine investigation](docs/wiki/Existing-Machine-Investigation.md)
- [Mobile capabilities](docs/wiki/Mobile-Capabilities.md)
- [Hardware and electrical safety](docs/wiki/Hardware-and-Electrical-Safety.md)
- [Investigation backlog and development readiness](docs/wiki/Development-Readiness.md)
- [Proposed signal specification](docs/wiki/Signal-Specification.md)
- [Repeatable verification plan](docs/wiki/Signal-Verification-Plan.md)
- [Research progress and answered questions](docs/wiki/Research-Progress.md)

## Proposed technology

The [Portable concept](docs/wiki/Portable-Concept.md) targets future Android/USB-C iPhone operation. [ADR-002](docs/ADR-002-Mobile-Playback.md) keeps one shared engine, one principal TypeScript UI and platform audio adapters. [ADR-003](docs/ADR-003-Desktop-Player.md) implements the browser adapter for desktop; Electron/Tauri/Capacitor and native mobile UI are not introduced. Mobile capability validation remains separate. Synthesis stays in backend processes; local WAV playback is separate from offline custom generation.

The local file-export preview uses a plain TypeScript/Vite editor, Node HTTP API, SQLite job storage, private file artifacts and a separate backend worker for synthesis/encoding. The browser handles editing, lightweight validation, progress and downloads. See the [architecture](docs/Architecture.md) and [service contract](docs/Service-Contract.md) for boundaries and remaining acceptance/configuration work. These local implementation choices are not a production hosting or mobile-framework decision; MEVN has not been adopted.

## Engineering standards

**SOLID principles and meaningful frontend/backend unit tests are compulsory.** Follow the [coding and testing standards](docs/Coding-Standards.md). Implementation pull requests must include tests for changed behaviour and pass both unit suites plus applicable formatting, lint, strict type, build and integration checks. Scaffolding introduces runnable suites and CI configuration; repository branch rules and remote CI results must be verified separately.

## Contributing

Start with [development setup and checks](docs/Development.md). The project provides separate frontend/backend unit suites, strict typing, lint/format checks, builds and CI configuration. Run `npm run check` before submitting implementation changes. The [backend renderer and independent WAV checks](docs/Backend-Renderer.md) cover the numerical increment. The [initial service contract](docs/Service-Contract.md) remains the acceptance target; a local connected preview does not complete its release/deployment gates. See the [audit](docs/Mobile-Research-Audit.md) for current working-tree status.

Research contributions are welcome before code. Read [CONTRIBUTING.md](CONTRIBUTING.md), choose an investigation from the [backlog](docs/wiki/Development-Readiness.md), and open an issue or pull request with sources, methods, uncertainties, and completion criteria. Document negative results and contradictory evidence as carefully as positive results.

### How changes reach main

**The `main` branch is the source of truth for accepted project work.** Contributions must go through a pull request and maintainer review before they are merged. Do not push directly to `main`, force-push it, or overwrite its history.

1. For substantial changes, open an issue first to agree on the scope. Small documentation corrections can go straight to a pull request.
2. Fork the repository, or create a separate working branch if you have write access. Start from the latest `main`.
3. Commit your changes to that branch and open a pull request targeting `main`.
4. Explain what changed, why, and how it was checked. Include source references for research contributions.
5. Address review feedback. A maintainer approves and merges accepted changes into `main`.
6. After merging, delete the source branch. GitHub automatically deletes eligible merged branches in this repository; contributors should also clean up their local branches and branches in their own forks. Keep `main`.

The reviewed files in `docs/wiki/` are the source for the public wiki. Propose research updates there through the same pull request process; maintainers publish the accepted version to the wiki after merging. A branch or an open pull request is proposed work, not an accepted project decision.

## Licensing

Original software is licensed under [GPLv3 only](LICENSE); original documentation is licensed under [CC BY-SA 4.0](LICENSE-DOCS), adopted in merged PR #4. Read [LICENSING.md](LICENSING.md) for scope, attribution, contribution terms and third-party/branding exclusions. Hardware licensing remains a future decision if designs are introduced.

## Funding and maintenance

We are seeking research sponsorship and grants to support engineering research, independent verification and ongoing maintenance. No funding has been confirmed in the [funding and maintenance proposal](docs/Funding-and-Maintenance.md). It outlines a browser-based WAV-generator milestone, an initial budget worksheet, sponsor expectations and public reporting. Costs and a funding collection route need agreement before a funding request is launched; portable/native and hardware work require separate estimates and review.

## Contact

Development is facilitated by Stephen at AppStack. Contact: stephen@appstacksa.co.za
