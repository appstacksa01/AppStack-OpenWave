# Contributing

We are gathering evidence and specifying the first browser-based WAV prototype. Contributions can include source analysis, device documentation, reproducible bench measurements, software and corrections, within the applicable readiness decision.

Read [LICENSING.md](LICENSING.md) before contributing. Original software contributions use GPL-3.0-only; original documentation uses CC-BY-SA-4.0. Contributors retain copyright and must have the rights to submit their work. Disclose third-party sources and licences; do not assume public availability permits copying.

## Workflow

The `main` branch is the source of truth for accepted project work. Do not push directly to it, force-push it, or replace its history. Submit contributions on a separate branch or fork and obtain maintainer approval through a pull request.

1. Choose an investigation from [Development Readiness](docs/wiki/Development-Readiness.md), or propose a new question in an issue. Agree on scope before substantial work; small documentation corrections do not need a separate issue.
2. State the question, scope, deliverable, dependencies, and completion criteria. Reference its INV ID where applicable.
3. Start from the latest `main`. Create a descriptive branch such as `docs/contribution-guide`, `research/source-review`, or `feature/sequence-import`. Contributors without write access should fork the repository and create the branch in their fork.
4. Make focused commits on that branch. For research, use the [research entry template](docs/wiki/Research-Entry-Template.md) and record sources, methods, uncertainties, and conflicting evidence.
5. Push the branch to your fork or the repository and open a pull request targeting `main`. Describe the change, rationale, linked issue/investigation, checks performed, and remaining limitations. Mark unfinished work as a draft pull request.
6. Address feedback with further commits on the same branch. If `main` changes, update your branch and resolve conflicts there; do not overwrite accepted work to bypass a conflict.
7. A maintainer reviews the scope, evidence, applicable checks, and project readiness requirements, requests changes where necessary, and approves accepted work before merging it into `main`.
8. After merging, maintainers publish any accepted wiki changes. Update findings and backlog statuses when the merged evidence changes a requirement.
9. Delete the source branch after its pull request is merged. GitHub automatically deletes eligible merged branches in this repository. Contributors should remove merged branches from their own forks and local checkouts when no longer needed; preserve any unmerged work and keep `main`.

Opening a pull request does not make its contents accepted. Maintainers may request changes, defer a proposal, or close it with an explanation. Research approval records the project's assessed evidence and limitations; it does not establish medical effectiveness.

## Wiki contributions

Edit the Markdown files in `docs/wiki/` in your branch and include them in a repository pull request. Do not publish unreviewed research directly to the GitHub wiki. After approval and merge, a maintainer synchronizes the accepted pages and adjusts links for wiki navigation. The wiki should reflect the accepted repository version.

## Review checks

Implementation must follow the [mandatory coding/testing standards](docs/Coding-Standards.md) and [backend architecture](docs/Architecture.md). SOLID principles and meaningful unit tests for frontend and backend are compulsory. Include tests for new/changed behaviour and regressions, run both unit suites and applicable lint/type/build/integration checks, and record commands/results. Heavy processing belongs in backend worker processes, never the browser or API request handler. The first scaffolding PR must introduce the tooling, non-empty suites and CI alongside its code; these checks do not exist yet.

Keep changes within the agreed scope and check links, source references, and personal information before submitting. Documentation-only changes require documentation checks; runtime unit tests are not expected when no implementation code changes. Do not describe a planned or skipped check as passed.

## Repository enforcement

This document defines the contribution policy. GitHub branch protection or rulesets must be configured separately by a repository administrator to enforce pull requests, review requirements, and restrictions on direct/force pushes. This documentation update does not configure those settings or claim that they are enabled.

## Evidence and publication standards

- Prefer original publications, patents, manuals, measured data, and official platform documentation. Assess what each can actually establish.
- A patent documents an invention claim, not medical effectiveness. A manual's stated output is separate from independent measurement.
- Label historical claims, engineering inferences, and project measurements explicitly.
- Record source/access dates and exact pages or sections. Mark abstract-only or inaccessible documents as partial review or located.
- Link and paraphrase third-party publications; do not upload copyrighted books, manuals, figures, or papers without appropriate permission.
- Do not publish patient information or personal medical histories.
- Do not present disease-treatment presets or diagnostic claims as validated functionality.

## Measurements and implementation

Bench work needs device identity, instruments and calibration status, test loads, output path, settings, methods, uncertainty, and an appropriate safety review. Historical mains-connected circuits are research material, not construction instructions. No body-connected experiments are included in this phase.

The [file-only readiness decision](docs/wiki/Development-Readiness.md#file-only-prototype-decision) permits implementation of the defined editor/backend WAV scope after the applicable specification changes are approved and merged. This does not authorize hardware testing or imply that the prototype passes verification. Start with testable scaffolding/CI and the backend renderer, then the export service and editor, on separate reviewed branches. Run the applicable [verification checks](docs/wiki/Signal-Verification-Plan.md) and report actual outcomes.
