# OpenWave implementation requirements

Read [CONTRIBUTING.md](CONTRIBUTING.md), [docs/Coding-Standards.md](docs/Coding-Standards.md), [docs/Architecture.md](docs/Architecture.md) and the applicable signal specification before changing implementation code.

- Apply SOLID principles in frontend and backend code with focused modules and explicit dependency boundaries.
- Frontend and backend unit tests are compulsory for new/changed behaviour; fixes need regression tests. Run both suites and applicable type/lint/build/integration checks. Do not replace meaningful unit tests with snapshots, end-to-end tests or mocked numerical expectations copied from production code.
- Heavy processing, waveform synthesis, WAV encoding and analysis run in backend worker processes. Keep them out of the browser bundle, browser workers and API request handlers.
- Introduce runnable test suites and CI with the implementation scaffolding. Do not claim checks exist or pass until run. Documentation-only work needs documentation checks, not artificial runtime tests.
- Use separate branches and reviewed pull requests into `main`. Do not push directly to `main` or publish unmerged wiki changes. Delete merged source branches without deleting unmerged work.
