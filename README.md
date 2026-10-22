# Open Frequency Generator Mobile Application

An AppStack open-source research and development initiative exploring mobile signal generation and the engineering behind historical and commercial devices described as Rife frequency generators.

**Status: research and requirements gathering. No application or hardware has been implemented or validated.**

## What we want to explore

We want to understand what these devices actually output, which functions a mobile phone can reproduce, and what external hardware would be required. We invite developers, electronics engineers, researchers, and technical writers to contribute reproducible evidence.

Our proposed first milestone is a bench-tested signal generator with documented settings and measured output. Its frequency range, waveforms, platform, and output interface remain undecided.

## Research scope

This is an experimental engineering project. We make no claims that the proposed app or hardware can diagnose, treat, or cure disease. Historical claims, personal accounts, and commercial frequency lists are not proof of medical effectiveness. Cancer Research UK reports no reliable evidence that Rife machines cure cancer: [evidence overview](https://www.cancerresearchuk.org/about-cancer/treatment/complementary-alternative-therapies/individual-therapies/rife-machine-and-cancer).

Generating a digital waveform does not demonstrate the same electrical output as a commercial machine or establish a biological effect. Initial investigations are limited to simulation and bench measurements into suitable test loads. Body-connected hardware requires a separate qualified engineering and safety review; do not connect electrodes directly to a phone or ordinary amplifier.

## Research notebook

Start at the [research home](docs/wiki/Home.md). These Markdown pages are also prepared for publication to the GitHub wiki.

- [Scope and research questions](docs/wiki/Project-Scope.md)
- [Historical research](docs/wiki/Historical-Research.md)
- [Source library](docs/wiki/Source-Library.md)
- [Findings and uncertainties](docs/wiki/Findings-and-Uncertainties.md)
- [Existing machine investigation](docs/wiki/Existing-Machine-Investigation.md)
- [Mobile capabilities](docs/wiki/Mobile-Capabilities.md)
- [Hardware and electrical safety](docs/wiki/Hardware-and-Electrical-Safety.md)
- [Investigation backlog and development readiness](docs/wiki/Development-Readiness.md)

## Proposed technology

The original proposal was the MEVN stack: MongoDB, Express, Vue, and Node.js. This remains provisional. Research will determine whether a web app, native mobile app, hybrid approach, or hardware controller fits the requirements. A backend and database will only be introduced if the agreed scope needs them.

## Contributing

Research contributions are welcome before code. Read [CONTRIBUTING.md](CONTRIBUTING.md), choose an investigation from the [backlog](docs/wiki/Development-Readiness.md), and open an issue or pull request with sources, methods, uncertainties, and completion criteria. Document negative results and contradictory evidence as carefully as positive results.

## Licensing

The project is intended to be open source. An explicit software, documentation, and hardware licensing decision is still required before implementation contributions are accepted. Public visibility alone does not grant an open-source license. See INV-08.

## Contact

Development is facilitated by Stephen at AppStack. Contact: shakings@hotmail.co.za.