# Funding and maintenance proposal

Prepared: 22 October 2026. Status: proposal for maintainer review, not a funding commitment or approved delivery budget.

AppStack OpenWave seeks research sponsorship and grants to support reproducible engineering research, a verified software prototype, and ongoing maintenance. No project funding has been confirmed in this plan. Voluntary contributions are welcome; paid assignments require an agreed scope and available funding before work starts.

## First funding objective

Fund a small browser-based frequency-sequence editor that exports WAV files for bench testing, together with independent review of its verification results. This is the recommended first deliverable, subject to the project's [development readiness review](wiki/Development-Readiness.md).

Users would add and reorder steps, choose frequency, duration and digital amplitude, save and reload sequences, and request backend exports as 16-bit PCM WAV at 44.1 or 48 kHz. Start with synthetic test sequences. The [architecture revision](Architecture.md) requires backend worker processes for heavy work, SOLID and compulsory frontend/backend unit tests. Keep the specified numeric WAV limits; agree concrete service limits and contracts with implementation.

The deliverable does not establish Electro-Med compatibility, calibrated electrical output or medical effectiveness. Square waves, condition presets, hardware control and body-connected experiments are excluded. The adopted v0.3 [signal specification](wiki/Signal-Specification.md) defines the first file-only implementation; adoption is not release acceptance. Existing renderer/local-preview evidence and remaining workflow checks are recorded in the [audit](Mobile-Research-Audit.md).

The maintainer's direction is one shared engine, one principal TypeScript UI and web/Android/iOS audio adapters. Budget reusable engine/UI maintenance plus justified platform-adapter/testing work, not two independent application builds. Framework/native implementation selection follows [capability validation](wiki/Mobile-POC.md#phases). Portable testing, native integration if needed, distribution and hardware review require separate estimates; no budget or spending is approved by the architecture direction.

## Milestones and evidence

| Milestone | Deliverable | Evidence required for acceptance |
| --- | --- | --- |
| 1. Agree requirements and rights | Reviewed prototype scope, software/documentation licences, browser matrix, resource limits and verification criteria | Maintainer-approved pull requests; published licence texts and explicit readiness decision |
| 2. Build the prototype | Sequence editor, save/load and WAV export with input validation and clear digital units | Reviewable source, reproducible build instructions, automated file/signal checks and recorded browser checks |
| 3. Independently verify and release | A second reviewer reproduces the export checks; limitations and results published with a numbered release | Versioned test inputs, analysis method, expected/observed results and reviewer findings; failures resolved or scope revised before release |
| 4. Maintain the release | Issue triage, necessary dependency/security updates, regression checks and documentation corrections | Public issue/release history and periodic maintenance/funding reports |

Digital file verification is separate from physical bench measurement. Any later instrument purchase or hardware investigation needs its own qualified protocol, test loads, safety review and budget. Successful digital checks do not imply safe or equivalent electrode output.

## Initial budget worksheet

These are rough planning allowances for discussion, not quotations or a delivery schedule. Confirm them after milestone 1. Currency: South African rand (ZAR). Record whether each quote includes VAT and any payment fees before publishing a funding target.

| Work item | Initial planning allowance | Cost basis |
| --- | --- | --- |
| Requirements, licence setup and acceptance review | 12–20 hours | Agreed contributor rate × approved hours |
| Browser editor, backend API/worker service and automated verification | Re-estimate; previous 40–80-hour allowance assumed browser-only rendering | Separate estimates for frontend, backend, unit/integration tests and operations |
| Independent verification and release documentation | 16–32 hours | Separate reviewer/developer quotes; avoid counting the same work twice |
| Hosting, job queue/storage and release infrastructure | To be quoted for the backend architecture | API/worker compute, temporary artifact storage, transfer, monitoring and CI; include retention limits |
| Equipment or specialist bench review | Separate, deferred budget | Written scope and supplier/specialist quotes before purchasing |
| Contingency | Proposed 15% of approved initial costs | Maintainer approval; disclose use in spending reports |

The earlier **68–132-hour total is superseded** because it assumed browser-only generation. Obtain revised estimates for the backend architecture and required testing before setting an effort total or rand target. Confirm rates, donated time, infrastructure costs and applicable fees. Record donated equipment/time separately from cash received; do not count it twice toward the cash target.

Re-estimate recurring maintenance as well: the earlier **4–8 hours/month** was a provisional allowance, not validated capacity for operating a backend. Include service monitoring, updates, access controls, retention/cleanup, review, releases and hosting. Publish the revised monthly target only after operational scope is agreed, then review it after three months. No response-time guarantee is made. Define paid deliverables separately from volunteer participation; student involvement does not guarantee payment, employment or supervision capacity.

## Funding routes and sponsor expectations

Prioritize research grants, company sponsorships, equipment donations and recurring maintenance sponsorships. AppStack may also offer separately scoped paid support, training, integrations or commissioned development. Project changes remain subject to the published licence and normal review process.

Potential sponsor recognition includes an opt-in acknowledgement, links to public progress reports and demonstrations of completed milestones. Agree recognition and reporting terms in writing. Funding does not buy merge approval, exclusive ownership of community contributions, favourable findings or a promise of medical benefit. Negative or inconclusive findings remain publishable.

GitHub Sponsors is one potential collection route, subject to account/region eligibility and payout setup. No payment channel is active or endorsed by this proposal. Confirm the receiving entity, account authority, accounting arrangements, fees and any grant conditions before accepting funds. Sponsorship is distinct from an equity investment; any future investment needs a separate agreement and must not promise rights the project does not hold.

## Maintenance and governance

- AppStack maintains the official repository. Accepted work reaches `main` through the [contribution workflow](../CONTRIBUTING.md), with review before merge and source-branch cleanup afterward. Configure branch protection/rulesets separately; policy text does not prove enforcement is enabled.
- Before release, name a maintainer and an independent verification reviewer, with their consent. Assign responsibility for issue triage, dependency updates, release approval and financial reporting.
- Publish numbered releases with change notes and verification results. Re-run applicable checks when signal generation, export, dependencies or supported browsers change.
- Triage issues regularly within available funded/volunteer capacity. Do not promise response times until staffing and funding support them.
- Publish a monthly report while funded work is active: receipts, spending by category, remaining balance, completed milestones, findings and next priorities. Keep personal/payment information private; agree any additional grant reporting before accepting the grant.
- If maintenance funding ends, disclose the capacity change and revise the roadmap. Do not describe an unmaintained release as actively supported.

## Licensing and reuse

Merged PR #4 adopted **GPLv3 only for software** and **CC BY-SA 4.0 for original documentation**; see [LICENSING.md](../LICENSING.md). Third-party recordings, manuals, lists, images and code need their own rights assessment; a project licence cannot grant rights in material we do not own.

GPLv3 permits commercial activity, including paid distribution and services. Its source-sharing obligations do not require upstream submissions, sponsorship, publication of private modifications or fork maintenance. Funding maintenance and encouraging contributions therefore also require governance. Original backend code remains under the existing software policy; server architecture did not adopt AGPLv3. A future licence change requires separate review.

## Before launching a funding request

- [ ] Approve the first milestone's scope and acceptance criteria.
- [x] Select and publish original software/documentation licences and contribution terms (PR #4); review new dependency/third-party rights when introduced.
- [ ] Obtain effort/rate estimates and agree how independent review will be funded.
- [ ] Set the initial ZAR target and recurring maintenance target from the worksheet.
- [ ] Confirm the funding recipient and collection route; agree sponsor/grant terms.
- [ ] Name maintainers/reviewers and publish reporting responsibilities.
- [ ] Publish a funding page with the target, uses of funds, exclusions and reporting cadence; add a repository funding button only when the collection route is ready.

## References

- [GNU licence FAQ](https://www.gnu.org/licenses/gpl-faq.en.html): commercial use, distribution and source-sharing obligations.
- [Why the GNU Affero GPL](https://www.gnu.org/licenses/why-affero-gpl.html): additional source access for users interacting with modified software over a network.
- [Creative Commons licence overview](https://creativecommons.org/share-your-work/cclicenses/): attribution and share-alike terms for original documentation.
- [Receiving sponsorships through GitHub Sponsors](https://docs.github.com/en/sponsors/receiving-sponsorships-through-github-sponsors): eligibility and account setup.

References checked 22 October 2026. Funding platform eligibility and terms must be checked again before account setup.

## Enterprise and portable target costs — review required

The [enterprise architecture review](Enterprise-Architecture-Audit.md) expands proposed work beyond the original exporter budget. Re-estimate catalogue/source-rights review, IAM/security/privacy, mobile/native engine feasibility, database/migration/recovery, packaging/self-host support, telemetry, independent verification and ongoing operations before fundraising commitments. None is funded or priced here. Cloud neutrality is not zero operating cost; do not add paid CI, accounts or infrastructure without authorization.
