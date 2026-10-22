# Development setup

The implementation provides a minimal browser entry/status component, shared lifecycle types, backend lifecycle policy and a backend-only WAV renderer with independent checks. It does **not** implement the sequence editor, HTTP export API, queue/storage adapters or managed worker service. There is no user-facing export service to run yet; see the [backend renderer](Backend-Renderer.md) for its programmatic boundary and actual verification results.

## Install and run

Use Node.js 22.20.0 (the `.nvmrc` baseline) and npm 11.4.2. CI also checks Node 24. Development dependencies are pinned and `package-lock.json` is committed. The supported Node engine range is declared in `package.json`; do not install dependencies globally except the documented npm version if needed.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The development server binds to loopback. The preview honestly states that editor/export service work is still outstanding. No backend server is started by this command.

## Required checks

```sh
npm run check
```

This runs formatting checks, ESLint, strict TypeScript checking, both unit-test suites with separate coverage, both builds and the browser bundle boundary check. Individual commands are `format:check`, `lint`, `typecheck`, `test:frontend`, `test:backend`, `build` and `check:boundaries`. Run `npm run format` to apply formatting to implementation/tooling files without rewriting the research notebook.

Unit suites fail if no tests are found. Coverage includes all executable source in each app (excluding test files), with 100% line/statement/function/branch thresholds for the small initial modules. Types-only contracts have no runtime statements. Maintain meaningful behaviour/boundary/error tests as modules are added; do not lower thresholds or hide modules to bypass failures. Reports are in `coverage/frontend` and `coverage/backend`; CI uploads both. Coverage does not substitute for the separate independent numerical checker or real service integration tests.

The frontend uses plain TypeScript DOM components and Vite; no UI framework is needed for this increment. Vitest/jsdom tests observable frontend behaviour; backend policy tests run in Node. The backend TypeScript build emits domain modules and declarations under `dist/backend`; it is not an executable HTTP service. Frontend bundles are generated in `apps/frontend/dist`, including Vite's bundled-dependency licence report under `.vite/license.md`, with source maps inspected for unexpected module origins. Preserve third-party notices when distributing builds and provide corresponding OpenWave source under the project licence. The bundle guard is conservative and must be reviewed when dependencies are added; it does not prove performance or detect every possible hand-written computation.

## Structure and boundaries

- `apps/frontend/src`: presentation and, later, API-client/editor behaviour. Never import backend modules.
- `apps/backend/src/domain`: pure backend rules; job transitions currently live here. A future repository must enforce transitions atomically; the pure function alone does not solve concurrency.
- `packages/contracts/src`: shared types only at present; no synthesis code.
- `tooling`: separate test/coverage configurations and frontend artifact inspection.
- `.github/workflows/quality.yml`: both suites and all local checks on pull requests and pushes to `main`, for Node 22.20.0/24. The check names are `Quality (Node 22.20.0)` and `Quality (Node 24)`. Configure repository rules to require them and maintainer review; this PR does not claim those repository settings are enabled.

Tests cover accessible export-state messages, cancellation controls, application mount success/failure, lifecycle policy, sequence/JSON validation, exact timing, PCM/header/streaming behaviour and rendering sink failure/cancellation. `npm run verify:signals` adds independent Python/standard-library WAV analysis; see [requirements and results](Backend-Renderer.md). API integration, cancellation races against real job storage and browser downloads remain outstanding.

## Next increments

Review the [renderer](Backend-Renderer.md), then implement queue/repository/artifact adapters and the export API against the [service contract](Service-Contract.md), with integration tests. Connect the editor after those contracts are tested. Follow the [coding standards](Coding-Standards.md), [architecture decision](Architecture.md) and [signal contract](wiki/Signal-Specification.md). Cloud CI is currently deferred under the user's no-paid-CI instruction; local checks remain compulsory, and remote checks must not be labelled passed while blocked.
