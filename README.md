# AppStack OpenWave

An AppStack open-source research and development initiative exploring mobile signal generation and the engineering behind historical and commercial devices described as Rife frequency generators.

**Status: research and requirements gathering. No application or hardware has been implemented or validated.**

## What we want to explore

We want to understand what these devices actually output, which functions a mobile phone can reproduce, and what external hardware would be required. We invite developers, electronics engineers, researchers, and technical writers to contribute reproducible evidence.

Our first software milestone is a browser-based sequence editor that exports sine-wave WAV files for independent digital verification and later bench testing. The [prototype specification](docs/wiki/Signal-Specification.md) defines the settings, limits and acceptance contract. Electro-Med compatibility and physical output measurements remain separate investigations; no output has been validated yet.

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

The first prototype is a static TypeScript browser application with a framework-independent WAV generator and a responsive editor. It needs no backend, database or account. The original MEVN proposal is superseded for this milestone; native mobile apps and hardware control may be assessed separately later.

## Contributing

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

Original software is licensed under [GPLv3 only](LICENSE); original documentation is licensed under [CC BY-SA 4.0](LICENSE-DOCS). Read [LICENSING.md](LICENSING.md) for scope, attribution, contribution terms and third-party/branding exclusions. Hardware licensing remains a future decision if designs are introduced. These choices take effect in `main` when the licensing pull request is approved and merged.

## Funding and maintenance

We are seeking research sponsorship and grants to support engineering research, independent verification and ongoing maintenance. No funding has been confirmed in the [funding and maintenance proposal](docs/Funding-and-Maintenance.md). It outlines a browser-based WAV-generator milestone, an initial budget worksheet, sponsor expectations and public reporting. The licensing and prototype specification changes require review and merge; costs and a funding collection route also need agreement before a funding request is launched.

## Contact

Development is facilitated by Stephen at AppStack. Contact: stephen@appstacksa.co.za
