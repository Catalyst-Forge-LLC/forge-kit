# Development Estimate

Rough estimate of the cost in man-hours to develop [APP NAME] from scratch, based on a full codebase inventory.

**Last updated:** [DATE]

> 💡 **Lesson learned:** This document serves three purposes:
> 1. **Credibility** — When potential investors, partners, or acquirers ask "how much would this cost to rebuild?", you have a defensible answer.
> 2. **Scope awareness** — Forces you to inventory every feature area, revealing complexity you've normalized.
> 3. **Hiring context** — If you ever need to bring on help, this doc scopes the project accurately.
>
> Keep this updated as major features ship. The exercise of estimating is as valuable as the numbers.

## How to measure the inventory (recommended)

Use **reproducible commands** so the estimate does not drift silently when someone eyeballs the repo.

> 🔧 **Guidance:** Prefer **tracked source only** (`git ls-files`) so generated artifacts and `node_modules` do not inflate totals.

1. **Application LOC (TypeScript + Svelte/Vue/React as applicable)** — Sum line counts for tracked files under your primary source tree (e.g. `src/**/*.ts` + `src/**/*.svelte`). Loop over paths or use a LOC tool; document the exact glob in the **Last updated** note or a footnote.
2. **API surface** — Count **route handler modules** your framework uses (e.g. SvelteKit `+server.ts` files under `src/routes`). That number tends to track authorization and test burden better than “REST resources.”
3. **Server/library modules** — Count `.ts` files under `src/lib/server/` (or equivalent) as a proxy for backend complexity.
4. **UI inventory** — Count `.svelte` / `.tsx` files; split **panels**, **modals**, **tab subtrees**, and **charts** when possible so effort tables stay explainable.
5. **Monolithic hotspots** — Note any **very large** single files (LLM orchestration, marketing shell). They inflate LOC without representing even distribution of work; call them out under **Key complexity drivers**.

> 💡 **Lesson learned:** A naive LOC figure without methodology invites skepticism. One sentence on *how* it was counted beats a false-precision single integer.

## Codebase Inventory

| Metric                         | Value |
| ------------------------------ | ----- |
| **Estimated Total LOC**        |       |
| **UI sources**                 |       |
| **Panels / major shells**      |       |
| **Modals / dialogs**           |       |
| **Tab / nested-tab components**|       |
| **Charts / dashboards**        |       |
| **API route modules**          |       |
| **Server library modules**     |       |
| **Third-party integrations**   |       |
| **Major feature areas**        |       |

> 💡 **Lesson learned:** Be specific with component counts.
> "54 components" means less than "20 panels, 5 modals, 22 tab-area pieces, 4 charts." The breakdown reveals where complexity lives.

## Estimated Development Effort

| Area                                                         | Hours | Notes                                                                 |
| ------------------------------------------------------------ | ----- | --------------------------------------------------------------------- |
| AI/LLM integration                                           |       | Prompt chains, parsing, guards, regression risk per surface           |
| UI layer                                                     |       | Shell pages, panels, responsive behavior, design-system consistency      |
| [Strategic user workflows — e.g. goals / directions]        |       | Optional: multi-step guided flows that anchor tailoring or discovery     |
| [Prospecting / discovery automation]                         |       | Optional: search orchestration, quotas, empty-state UX                |
| [In-app assistant / copilot]                                 |       | Optional: runs, steps, streaming, record binding                      |
| [Demo / staging / anonymization tooling]                     |       | Optional: admin-only pipelines, PII rules, synthetic content           |
| Document processing (DOCX / PDF / templates / audits)        |       | Structured formats multiply integration hours                           |
| Auth + OAuth                                                 |       | Providers, sessions, edge cases                                       |
| Database + data layer                                        |       | Schema, typed client, migrations, file fields                           |
| Web scraping or external HTML ingestion                      |       | Per-source variance, bot defenses                                     |
| Payment/billing                                              |       | Checkout, portal, webhooks, entitlements                              |
| Template or variant systems                                  |       | Optional: alternate document/product variants                         |
| Domain-specific intelligence (dossiers, research, scoring)   |       | Optional                                                            |
| Networking / CRM-lite                                        |       | Optional                                                            |
| Analytics & reporting                                        |       |                                                                      |
| Delegation / impersonation                                   |       | Optional                                                            |
| Promo codes / coupons                                        |       | Optional                                                            |
| Landing + marketing                                          |       |                                                                      |
| Security audit + hardening                                   |       | Scale notes with **API route module** count                           |
| Architecture & config                                        |       | Framework wiring, env, observability                                  |
| Deployment infra                                             |       |                                                                      |
| Admin / internal tooling                                     |       | Optional                                                            |
| Design decisions & UX iteration                              |       | Scales with **major feature area** count                             |
| Testing, debugging, polish                                   |       | Integration paths, failure states                                     |
| **Total**                                                    |       |                                                                      |

> 💡 **Lesson learned:** The features that take the most hours aren't always
> the most complex conceptually. They're the ones where integration between systems
> is unpredictable (e.g., LLM output → structured document formats). When estimating,
> add 3–5× for anything that bridges AI output with structured formats.

## Iteration density (traditional vs assisted)

> 💡 **Lesson learned:** Headline **hours** are not the same as **iteration count**. Classic teams burn calendar time on compile/fix loops, branch/review cycles, QA bounce-backs, and cross-functional clarification — especially wherever formats, vendors, or auth boundaries meet. Assistants collapse many micro-edit-verify cycles; stakeholders comparing “rebuild cost” should separate **billable engineer-hours** from **calendar-to-ship under a given process**.

> 🔧 **Guidance:** If this doc is used with investors or acquirers, add one sentence on whether totals assume **dense assisted iteration** (fewer human-paced loops) vs **traditional gate-heavy delivery** (often **many more** loops at the same nominal scope).

## Key Complexity Drivers

> 🔧 **Guidance:** List the 3–6 factors that make this project harder than it looks. Examples:
> 1. **Breadth** — N major feature areas all wired together
> 2. **AI depth** — N distinct LLM-powered features, each needing prompt engineering
> 3. **Format manipulation** — Parsing/generating structured documents (DOCX, PDF, etc.)
> 4. **Multi-source integration** — Each external source has different APIs, rate limits, failure modes
> 5. **Security surface** — Auth, authorization, IDOR exposure across N **route modules**
> 6. **Monolithic hotspots** — Few giant files concentrate review and regression risk

1. **[Driver 1]** —
2. **[Driver 2]** —
3. **[Driver 3]** —

## Cost Ranges (US market)

> 🔧 **Guidance:** Costs are **[estimated hours] × [loaded rate]** per scenario. Refresh rates yearly; **2026 US senior contract** full-stack often lands **~$150–$225/hr** for established freelancers; **boutique agencies** often quote **~$175–$275/hr** blended; **offshore** blended **~$60–$100/hr** depending on seniority mix.
>
> **Fully loaded FTE** includes salary, payroll taxes (~8%), benefits (~20%), equipment — roughly **1.3–1.4×** base salary. Calendar duration ≠ billable rebuild hours.

Rates below use **[TOTAL HOURS RANGE]** from your effort table — replace with your totals.

| Scenario                                            | Rate basis                                  | Estimated cost |
| --------------------------------------------------- | ------------------------------------------- | -------------- |
| Senior freelance full-stack dev (contract)          | $150–200/hr × **[TOTAL HOURS RANGE]**       |                |
| Boutique agency (senior team, US-based)             | $175–250/hr blended × **[TOTAL HOURS RANGE]** |              |
| Offshore agency (Eastern Europe / LatAm)             | $60–90/hr blended × **[TOTAL HOURS RANGE]** |               |
| 2-person in-house team (senior FTE + mid FTE)       | Combined annual comp × calendar fraction    |                |
| Solo in-house senior engineer (FTE, fully loaded)   | Fully loaded annual × calendar fraction     |                |

**Not included:** Model/vendor API spend during development, hosting, payment processor fees, third-party SaaS seats.

## Practical Timelines

Calendars stretch with coordination overhead; compress with parallel roles (frontend + backend + design).

| Scenario                                     | Timeline |
| -------------------------------------------- | -------- |
| Solo senior full-stack dev (knows the stack) |        |
| 2-person team (frontend + backend)           |        |
| 3-person team with a designer                |        |
