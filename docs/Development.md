# Development setup

Updated: 23 October 2026. This describes the current working tree, including the uncommitted connected desktop preview. It provides a TypeScript sequence editor, HTTP export API, SQLite job storage, private filesystem artifacts and separate backend rendering processes. Desktop browser playback and its audio adapter exist; Android/iOS adapters, PWA packaging and public deployment remain absent. See the [desktop results](Desktop-Player.md) and [enterprise assessment](Enterprise-Architecture-Audit.md) for provenance and gaps; this is not an accepted application release.

The [three target deployment profiles](Deployment-and-Operations.md) are proposed. No Dockerfile/Compose definition, sample environment, PostgreSQL migration or OIDC setup is supplied; do not treat the target container quick start as executable today.

The architecture keeps one engine, one principal TypeScript UI and platform audio adapters. The [desktop-player increment](Desktop-Player.md) implements the browser playback adapter and live backend streams under [ADR-003](ADR-003-Desktop-Player.md), without a desktop framework/dependency. Android/iOS adapters remain future work. The engine's pure planner/encoder executes only in backend processes.

## Install and run

Use Node.js 22.20.0 (the `.nvmrc` baseline) and npm 11.4.2. CI also checks Node 24. Development dependencies are pinned and `package-lock.json` is committed. The supported Node engine range is declared in `package.json`; do not install dependencies globally except the documented npm version if needed.

```sh
npm ci
```

From the repository root, start the backend in one terminal:

```sh
npm run dev:backend
```

Start the frontend in a second terminal:

```sh
npm run dev
```

The frontend is at `http://127.0.0.1:5174`; Vite proxies `/api` to the loopback API at port 3001. The backend command builds TypeScript and starts the API plus a separately forked worker. `npm run dev` alone starts only the frontend. Stop the commands in their terminals before restarting them; do not start duplicate servers on the same ports.

The local service writes its SQLite database and private `.part`/`.wav` files under `.openwave/service/`, excluded from Git. Completed artifacts expire after one hour; owner sessions last at most two hours from issuance. The preview uses Node's built-in SQLite API, experimental in the observed Node 22.20 runtime, with fixed development settings. See the [service contract](Service-Contract.md) for retention details, access policy and remaining deployment gaps. Do not expose these loopback servers as a public or phone-accessible deployment.

Edit the sequence and choose Generate WAV for a completed download, or Start sequence (live) for a paced stream from the same engine. Local PCM16 WAV loading/playback, Stop, latched Emergency Mute/reset, feature-detected output selection and a digital waveform monitor are implemented; see the [desktop guide](Desktop-Player.md). JSON sequence save/load, unsaved-change protection and complete release/device coverage remain incomplete. USB audio is the OS/browser route, not a custom DAC/electrode driver or verified physical output.

## Required checks

```sh
npm run check
```

This runs formatting checks, ESLint, strict TypeScript checking, both unit-test suites with separate coverage, both builds and the browser bundle boundary check. Individual commands are `format:check`, `lint`, `typecheck`, `test:frontend`, `test:backend`, `build` and `check:boundaries`. Run `npm run format` to apply formatting to implementation/tooling files without rewriting the research notebook.

Unit suites fail if no tests are found. Coverage includes all executable source in each app (excluding test files), with 100% line/statement/function/branch thresholds for the small initial modules. Types-only contracts have no runtime statements. Maintain meaningful behaviour/boundary/error tests as modules are added; do not lower thresholds or hide modules to bypass failures. Reports are in `coverage/frontend` and `coverage/backend`; CI uploads both. Coverage does not substitute for the separate independent numerical checker or real service integration tests.

The frontend uses plain TypeScript DOM components and Vite. Vitest/jsdom tests observable UI/API-client behaviour; backend tests run in Node. The backend build emits modules under `dist/backend`; `tooling/dev-backend.mjs` and `tooling/export-worker.mjs` supply development service/process wiring. Frontend builds are in `apps/frontend/dist`, with Vite's dependency licence report under `.vite/license.md` and source maps for boundary inspection. Preserve third-party notices and provide corresponding OpenWave source under the project licence. The bundle guard requires review when dependencies are added; it does not prove performance or detect every possible hand-written computation.

## Structure and boundaries

- `apps/frontend/src`: sequence editing, API client and job/status presentation; principal UI codebase. Never import backend synthesis.
- `apps/backend/src/domain`: backend sequence/numerical/lifecycle rules; the authoritative waveform implementation.
- `apps/backend/src/application`: rendering and job orchestration through narrow ports.
- `apps/backend/src/adapters`: local HTTP, SQLite and filesystem implementations. SQLite transactions/conditional updates enforce state changes; pure lifecycle rules alone do not solve concurrency.
- `packages/contracts/src`: shared types only at present; no synthesis code.
- `tooling`: test/coverage configurations, independent numerical checks, bundle inspection and local API/worker wiring.
- `.github/workflows/quality.yml`: both suites and all local checks on pull requests and pushes to `main`, for Node 22.20.0/24. The check names are `Quality (Node 22.20.0)` and `Quality (Node 24)`. Configure repository rules to require them and maintainer review; this PR does not claim those repository settings are enabled.

Tests cover UI editing/job/network behaviour, numerical rules, sink failures, real HTTP/SQLite/filesystem integration, ownership, admission limits, cancellation and expiry. `npm run verify:signals` adds independent Python/standard-library WAV analysis; see [requirements and historical results](Backend-Renderer.md). Adapter integration tests do not fully exercise the real multiprocess supervisor. One desktop browser download was observed manually; automated browser/multiprocess failure coverage, independent human reproduction and target-device release checks remain outstanding. Prior local counts are in the audit, not a claim that tests were rerun for documentation edits.

## Next increments

Run `npm run verify:desktop` for real HTTP/separate-process progressive streaming, cancellation/failure/deadline checks and independent checks of three downloaded WAVs. It needs the same Python executable/`OPENWAVE_PYTHON` setup as `verify:signals`. See the desktop guide for recorded results and remaining physical/browser acceptance. Reuse the implemented `AudioOutput` contract for [mobile capability review](wiki/Mobile-POC.md#phases) before choosing native adapters/frameworks. Cloud CI remains deferred; local checks remain compulsory and blocked remote checks must not be labelled passed.
