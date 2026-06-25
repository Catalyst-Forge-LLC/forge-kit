# ForgeKit update log

Chronological record of meaningful changes to **this** ForgeKit repository: propagation passes from live apps, new prompt templates, methodology edits, and doc inventory updates.

**Public repo note:** Entries before **2026-05-26** describe private development and template propagation from real apps (including codenames like ChronoVault and Exec Foundry). They are kept for **maintainer context**, not as a public product roadmap. For the first open-source release, see the git tag or initial commit on [GitHub](https://github.com/Catalyst-Forge-LLC/forge-kit).

After each run of **`prompts/propagate-to-forgekit.md`**, append a row to the table and a short detail section below.

**What belongs in the summary column:** The *generalized* outcome (e.g. “propagate prompt: principle-first lessons, examples secondary”), not a dump of app-specific literals. Use the Detail section for file-level bullets; frame those bullets as *what template behavior changed*, not as a copy-paste of example numbers or strings from the source app.

**FORGEKIT_LITE release checklist** (when editing `mcp-server/content/FORGEKIT_LITE.md`):

1. **Version strings** — bump every `v#.#.#` in the file: header block (~line 3), `AGENTS.md` snippet in §12, footer. Canonical source is the header; keep all three in sync.
2. **`schemaVersion`** in §11 starter JSON — bump only when `workflow_tracking.json` shape changes (e.g. `lite-1` → `lite-2`).
3. **Cross-doc sync (triplicate optional sections)** — if these Lite sections change materially, mirror the same guidance in **`README.md`** and **`WORKFLOW.md`**:
   - **§4.3** — LLM-generated JSON seed/fixture prompt
   - **§4.4** — Tavily / Brave web search onboarding
   - **§7.1** — runtime / build-time / BYO-LLM content patterns (+ §7.2 URL import when applicable)
   README anchors: "Optional: LLM-generated JSON", "Optional: web search APIs", "Optional: LLM-backed content", "Listing / article URL import".
4. **Append this log** — table row + Detail when the Lite edit ships.

| Date (ISO) | Summary |
|------------|---------|
| 2026-06-15 | **Microcopy centralization propagation (Exec Foundry):** New **`prompts/microcopy-centralization.md`**; **TECHNICAL_REFERENCE** § User-facing copy; **CODE_QUALITY** + **TEST_PLAN** audit hooks; **BRAND_AND_PRODUCT** duplication policy; **CONTEXT_PROMPT** patterns/anti-patterns; **WORKFLOW** Phase 7 + post-launch cadence; **`.cursor/rules/user-facing-content.mdc`** + **`us-english.mdc`** (+ MCP **`cursor-rules/`** mirrors); propagate prompt trigger + Context inventory. |
| 2026-06-10 | **Anti-self-importance and position-of-strength tone controls:** TECHNICAL_REFERENCE (new tone controls subsection); CONTEXT_PROMPT Patterns to Follow (anti-self-importance & posture rules); BRAND_AND_PRODUCT (grandiose & striving register prevention); TEST_PLAN (anti-self-importance & position-of-strength checks). Source: Exec Foundry cover letter anti-self-importance pass. |
| 2026-06-10 | **Factual grounding and veracity check safety nets:** TECHNICAL_REFERENCE (new veracity pass subsection); CONTEXT_PROMPT Patterns to Follow (grounding text in prompt); BRAND_AND_PRODUCT (veracity pass lesson); DESIGN_SYSTEM (VeracityCard visual spec); TEST_PLAN (grounding & veracity test cases). Source: Exec Foundry cover letter grounding and veracity pass. |
| 2026-06-04 | **LLM JSON parse hardening (verbatim upload):** TECH_REF Output Validation lesson + guidance (`parseJsonFromLlmOutput`, `sanitizeJsonControlChars`, prompt escape rule, Support ID); CONTEXT_PROMPT integration pattern; CODE_QUALITY audit item #5; TEST_PLAN resume/cover upload checklist. Source: Exec Foundry onboarding upload fix + PostHog `Bad control character in string literal`. |
| 2026-06-01 | **Loved-tier UX patterns:** modal focus trap + return focus; board "Start here" recommendation strip; first-artifact orientation overlay; AI section lifecycle vocabulary + stale banner. DESIGN_SYSTEM, CONTEXT_PROMPT, TECHNICAL_REFERENCE (AI lifecycle stub), TEST_PLAN §7.4c–f. |
| 2026-06-01 | **Prelaunch review — low polish:** TRACKING_SCHEMA phase ID map (Lite vs MCP); WORKFLOW agent-agnostic intro; Lite maintainer triplicate-sync note; propagate prompt + update-log cross-doc anchors; §15 decisions[] shape. Completes prelaunch review spec. |
| 2026-06-01 | **Prelaunch review — medium fixes:** FORGEKIT_LITE §4 reading order + map; §8 rule 5/6 notation (vs §8.9 subsection); `.forgekit/` git policy (H1 status launcher + H2 commit/gitignore from prior commit); MCP `getForgeKitLite` + `getForgeKitLiteUpdates`; Lite release checklist in update-log; unified `decisions[]` example shape. |
| 2026-05-29 | **Cohesion-tier UX patterns:** minimal global keyboard set + **safe-Esc layering** + help overlay; **first-load skeletons** (shape over spinner); **canonical empty-state component** with `wrapper`/`centered`/`hero` variants; **unified three-phase save acknowledgement** (`Saving…`/`Saved`/`error`) bubbled from child components to one indicator; **dismissible per-user first-run hints**. DESIGN_SYSTEM sections + CONTEXT_PROMPT pattern/anti-patterns + TEST_PLAN checks. |
| 2026-05-29 | **New prompt: UX Cohesion Audit** — whole-app, cross-cutting read of where a product confuses, blocks, distracts, or fails to delight; two-lens method (cross-cutting "feels like N apps" themes + surface-by-surface), Step 0 corpus read to point at owned specs instead of re-speccing, Critical/High/Medium/Low + effort with delight first-class. Complements `panel-usability-audit.md` (single surface) and `pre-launch-audit.md` (launch readiness). README prompt tree updated (also added previously-missing `panel-usability-audit.md`). |
| 2026-05-26 | **Cover letter templates:** drop mailed-letter `[City, State]` guidance — **BRAND_AND_PRODUCT**, **TECHNICAL_REFERENCE** (tailoring), **CONTEXT_PROMPT** voice rules. |
| 2026-05-26 | **Public repo polish:** `forgekit.html` OSS CTAs (GitHub/MCP); archived `specs/forgekit-as-product.md`; removed internal product `.docx`; update-log intro for pre-OSS entries. |
| 2026-05-26 | **Open source (Apache 2.0):** `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`; README license/support; reframe closed-distribution wording in **FORGEKIT_LITE v1.3.0**, **NEW_PROJECT_BOOTSTRAP**, **WORKFLOW**, **INITIAL_PROMPT**, **forgekit-workspace-README**; `mcp-server/package.json` license field; public repo published with clean history. |
| 2026-05-21 | **FORGEKIT_LITE §4.1.2:** Phase 2 stack-conditional deps table (PocketBase, Ollama, LLM keys, Playwright, native addons, ports); README + NEW_PROJECT_BOOTSTRAP + SCAFFOLD_INSTALL cross-refs. |
| 2026-05-21 | **FORGEKIT_LITE §4.1 preflight:** explicit **Node.js** + **npm** before **pnpm** (install order, LTS paths, npm as bootstrap only). ONE_CLICK_DEV_SETUP + README prerequisites. |
| 2026-05-21 | **Git trailers — Git 2.32+ baseline:** `--trailer` native from 2.32.0 (2021); ForgeKit policy = no unrequested attribution on all versions; shell-hop / `unknown option` guidance **pre-2.32 only**. Updated FORGEKIT_LITE §8.9, commit-messages.mdc, forgekit-no-trailer.mdc, bootstrap/INITIAL_PROMPT. |
| 2026-05-21 | **LLM content patterns + Ollama:** README, WORKFLOW, INITIAL_PROMPT, GREENFIELD_INTAKE, FORGEKIT_LITE §7.1 (Ollama runtime skeleton), §12/.env; docs CONTEXT_PROMPT, TECHNICAL_REFERENCE, PHASE_1_BRIEF §6a. |
| 2026-05-21 | **FORGEKIT_LITE v1.2.0 — isolated health checks + Ollama:** §4.7 test-pocketbase; §4.8 setup/test Ollama (VRAM, Granite 4.1 / Gemma 3, no thinking default); **`SYSTEM_HEALTH_CHECKS.md`**, reference scripts + launchers. |
| 2026-05-21 | **FORGEKIT_LITE v1.1.9 — PocketBase latest install, one-click setup, phase status:** §4.2.2 no hardcoded PB version; §4.5 setup/run/status `.bat`/`.sh`; §4.6 `FORGEKIT_PROGRESS.md` + status script; **`ONE_CLICK_DEV_SETUP.md`**, reference **`scripts/*.mjs`**, **`SCAFFOLD_INSTALL.json`** `versionPolicy`. |
| 2026-05-21 | **FORGEKIT_LITE v1.1.8 — unified `.forgekit/` workspace (Lite + MCP):** rename from `.forgekit-lite/`; all paths use **`.forgekit/workflow_tracking.json`**, **`.forgekit/IDEAS.md`**, platform rules; **`WORKFLOW.md`**, **`README.md`**, **`INITIAL_PROMPT.md`**, **`CONTINUATION_PROMPT.md`**, **`TRACKING_SCHEMA.md`**, templates aligned. Bundled **`forgekit-*.mdc`**, **`forgekit-workspace-README.md`**; MCP kickoff tools updated. |
| 2026-05-21 | **FORGEKIT_LITE v1.1.7 — fold EchoVault boot lessons into Lite:** **§4.2.1** env (dotenv at Node entry, Vite `loadEnv` merge in monorepos); **§4.1** pnpm `onlyBuiltDependencies`; **§4.2 step 10** pnpm workspace `backend/` + `frontend/`; **§1.6** protocol feedback log; **§13–§14** port health-check, split `.env.example`, README env restart note. **`FORGEKIT_LITE_UPDATES.md`** trimmed to local starter template. |
| 2026-05-20 | **FORGEKIT_LITE v1.1.6 — `.forgekit-lite/` gitignored workspace (ChronoVault propagation):** **§1.5** local agent workspace; §4.2 / §11 / §12 / §14 path updates; **§4.1.1** GitHub GH007 / noreply email; §13 anti-patterns (public Lite commit, history rewrite). New **`FORGEKIT_LITE_UPDATES.md`** template; **`cursor-rules/forgekit-lite-no-trailer.mdc`** + **`forgekit-lite-updates-log.mdc`**; **`forgekit-lite-workspace-README.md`**. **NEW_PROJECT_BOOTSTRAP** — Lite §1.5 cross-ref for published repos. |
| 2026-05-19 | **Deduplication and admin health proxy propagation:** **TECHNICAL_REFERENCE** — Admin health proxy of private edge node, central file parsing isolation. **CONTEXT_PROMPT** — Gated server proxies, micro-button helper wrapping, script-to-form component delegation, standard UTC formatting. **DESIGN_SYSTEM** — Modal form delegation, micro-icon button helpers. **CODE_QUALITY** — PDF-parse isolation, UTC formatters. **TEST_PLAN** — Admin proxy integration, file parsing. |
| 2026-05-17 | **Exec Foundry propagation:** **git-user-commits** — wrap-up commits (end of each request when files changed; stage only that request); **DESIGN_SYSTEM** — compact hero band for workspace slide-out panels; propagation prompts — git-policy trigger row wording. |
| 2026-05-16 | **Git workflow rule — proactive commits restored:** `.cursor/rules/git-user-commits.mdc` (ForgeKit + Exec Foundry) again defaults to **commit after substantive work** with descriptive multi-line messages (`commit-messages.mdc`); push remains explicit-only; opt-out when user leaves tree dirty. |
| 2026-05-15 | **Git workflow rule — explicit commits default:** `.cursor/rules/git-user-commits.mdc` (ForgeKit + Exec Foundry aligned) now defaults to *commit only when the user asks*, notes that Cursor **user rules** override for proactive commits, keeps push explicit and `commit-messages.mdc` workflow. |
| 2026-05-12 | **Follow-up propagation:** Long-running generation HTTP boundaries (non-JSON failures); milestone-aligned progress UX; sticky outline + scroll-spy for long generated reads. CONTEXT integration + anti-pattern; TECH_REF AI Output Validation lesson; DESIGN_SYSTEM (progress + new long-form reading section); TEST_PLAN §7.8 + §10 checklist extension. |
| 2026-05-11 | **Client-side fetch/polling resilience + feature stubs (activity timeline, modal extraction, panel density, admin UI):** CONTEXT_PROMPT new critical patterns group + anti-patterns; TECH_REF activity timeline stub; CODE_QUALITY audit checklist + lesson; TEST_PLAN new sections; DESIGN_SYSTEM modal/density/admin lessons. |
| 2026-05-06 | **URL scrape propagation — markup drift + optional LLM recover (+ ForgeKit Lite v1.1.5):** TECH_REF subsection (*deterministic extractors vs markup drift*); CONTEXT + TEST_PLAN §2a; **FORGEKIT_LITE** new §7.2; README / WORKFLOW / INITIAL_PROMPT cross-refs; **both** propagate prompts — Context (**FORGEKIT_LITE.md** duty), Step **5** Lite parity, Step **3** mapping row, “when to run” trigger for listing-import pipelines. |
| 2026-04-30 | **DEV_ESTIMATE iteration density:** Exec Foundry + ForgeKit templates distinguish billable hours vs traditional micro-iteration load (reviews, QA, boundaries); timeline caveat for gate-heavy delivery. |
| 2026-04-30 | **DEV_ESTIMATE template:** reproducible LOC / route-module inventory methodology; expanded inventory + effort rows (optional assistant, demo tooling, prospect flows); US cost formula guidance; complexity drivers include monolithic hotspots and API surface. Propagation prompts — refresh trigger + Exec Foundry discovery-table markdown fix. |
| 2026-05-02 | **Branded-but-generic UX shapes:** Reusable stubs for **persistent AI dock/rail**, **multi-lens entity detail**, **user-visible identity URLs**, and **admin/support master–detail tables** in **TECH_REF**, **CONTEXT_PROMPT**, **DESIGN_SYSTEM**, **TEST_PLAN**; propagation prompts — **Sounds product-specific** §6 mapping, Discovery scan row, Step **3** table rows + Step **6** second-pass for marketing-named bullets (EF + ForgeKit). |
| 2026-05-02 | **Journal-driven propagation + feature stubs from recent journal backlog:** Expanded **both** propagation prompts with explicit **journal time-window sweep** (Added / Improved / substantive Fixed → TECH_REF + TEST_PLAN). **TECHNICAL_REFERENCE** — apply vs discovery URL; posting **additive merge**; **AI tailoring critique + structural controls**. **CONTEXT** — discovery bulk honors filters; dual URL export parity. **TEST_PLAN** — dual URL checklist; discovery bulk filter parity; §4.2 in-tab critique persistence. **BRAND_AND_PRODUCT** — LLM letter register / density / cross-paragraph dedup guidance. |
| 2026-05-02 | **Progressive URL import (client) + workflow enum normalization + systemd deploy timing:** TECH_REF subsections for **client reconciliation after stub/finalize** and **stored workflow enums**; CONTEXT critical patterns, patterns, and anti-patterns; TEST_PLAN §2a bullets; DEPLOYMENT **`TimeoutStopSec` vs deploy wall-clock**; propagation prompts — discovery scan rows + systemd/deploy trigger (EF + ForgeKit). |
| 2026-04-26 | **FORGEKIT_LITE v1.1.4 — §13 opaque backend / SDK–server version drift:** single bullet after CommonJS/ESM — `curl` before SDK archaeology; independent release trains; permissive write vs strict read; `beforeSend` shim; log SDK + server in `gotchas[]`. |
| 2026-04-25 | **FORGEKIT_LITE v1.1.3 — Windows install/bootstrap shell-outs:** §4.1 after pnpm adds guidance to branch on `process.platform` before `tar`/`curl`/…; §8 new rule 10; §13 Engineering bullet on PATH shadowing, drive-letter-as-host (bsdtar + `Z:\`), GNU vs bsdtar for zip; §11 gotchas[] example. Generalizes to Unix-named tools on Windows. |
| 2026-04-24 | **PocketBase local port / `.env` alignment (Lite v1.1.2 + regular docs):** document that on a dev machine **several** PocketBase processes may run; default **8090** conflicts; **set URL+port in `.env` / `.env.example`** and keep `serve` / SDK / schema scripts on the same value. **FORGEKIT_LITE** §14 new `.env.example` sub-bullet. **WORKFLOW** Phase 2 artifacts, **INITIAL_PROMPT** Phase 2, **README** new subsection, **NEW_PROJECT_BOOTSTRAP** scripted-PB line, **POCKETBASE_SCHEMA_SCRIPT** step 1, **docs/CONTEXT_PROMPT** example “Database quirks” line. |
| 2026-04-23 | **FORGEKIT_LITE v1.1 / v1.1.1 propagation pass** — push the Mode A/Mode B commit story, A-local vs A-persistent, §7.1 content-generation patterns, and unconditional platform-rule-file guardrails outward into the surrounding ForgeKit docs so they are reachable without reading all of Lite. **`.cursor/rules/commit-messages.mdc`** now names Mode A vs Mode B explicitly, documents the `bash -c` / `cmd.exe //c` shell hop as the Mode B remedy (not a git upgrade), and warns that git 2.32+ silently accepts injected trailers. **`NEW_PROJECT_BOOTSTRAP.md`** — web-app state-persistence sub-question, content-generation pattern picker (runtime / build-time / BYO-LLM), **trailer-ban guardrails created unconditionally** (`AGENTS.md` + `CLAUDE.md` + `.cursor/rules/forgekit-lite-no-trailer.mdc` regardless of current agent; users switch tools), and a Rules entry covering Mode B git commits. **`GREENFIELD_INTAKE.md`** — new §7 State persistence + §8 Content-generation pattern sections, in the same copy-paste shape as §6 search. **`WORKFLOW.md`** Phase 1 — state-persistence sub-question + content-generation pattern picker in *"What to ask Claude to do"*; Phase 2 — scaffolding bullet for the three patterns. **`INITIAL_PROMPT.md`** — Phase 1 state-persistence + content-generation blocks and a Mode B git-commits awareness block. **`README.md`** — new "LLM-backed content" and "state persistence choice" sections, matching the existing LLM-JSON and web-search optional sections. |
| 2026-04-23 | **FORGEKIT_LITE v1.1.1** residual-gaps pass on top of v1.1: brief template §6 gains a **State persistence** row (§7 A-local vs A-persistent) and a new **§12 Content-generation pattern** section (pattern / provider / env / paths / validator / prompt). §14 `.env.example` guidance now covers **runtime-LLM / build-time-LLM / BYO-LLM** key policies, not just search. §14 `README.md` guidance **flipped** — manual scaffold at repo root is the default (`pnpm dev`); `cd app && pnpm dev` is the shortcut case. §7.1 gains **minimal reference skeletons** — SvelteKit server route for runtime LLM, `scripts/seed.ts` for build-time, and a `Zod`-at-boundary validator for the BYO-LLM paste. |
| 2026-04-23 | **FORGEKIT_LITE v1.1** from session feedback: **§8.9 Mode A/Mode B** split — Mode B is **platform argv injection** of `--trailer` below rule-file scope; remedy is a `bash -c` / `cmd.exe //c` shell hop, **not** a git upgrade; §4.1 preflight records git ≥2.32 trade-off (loud failure = feature). **§14 `.gitignore`** — root-only patterns **anchored** (`/build/`, `/dist/`, `/pb_data/`); collision warning (unanchored `build/` silently swallows `src/routes/build/`). **§4.2 step 10** — **manual SvelteKit scaffold is the primary Default-A path**; `sv create` demoted to shortcut (new empty subfolder only, never `.`); extended §13 anti-pattern. **§7** — **A-sub-question** (local-only vs persistent) to skip PocketBase for browser-state apps; **§7.1 content-generation patterns** (runtime API / build-time script / BYO-LLM paste). **§4.2 step 3** — create **`AGENTS.md` + `.cursor/rules/forgekit-lite-no-trailer.mdc` + `CLAUDE.md` unconditionally**. **Minor:** §4.2 step 8 defines *explicit approval*; §8 rule 2 spine-output budget (split into two commits >~30 tool calls); §4.2 step 10 A.3 `pnpm init` cleanup checklist; §11 gotchas[] example for Mode B. |
| 2026-04-22 | **FORGEKIT_LITE** §4.3–§4.4 (JSON seed prompt; Tavily/Brave search). **`sv create` → `app/` or `web/`** (not `.`) when root has Lite files; **`Directory not empty. Continue?`** hang + no flag; not `src` as outer dir; §8.6, §11 gotchas, §13, §14 README; **WORKFLOW**/**INITIAL_PROMPT**/**NEW_PROJECT_BOOTSTRAP**/**GREENFIELD** cross-refs. |
| 2026-04-17 | **Exec Foundry propagation (import + board patterns):** CONTEXT — SSR-safe `onDestroy`/document cleanup; stub→finalize **listing hints** + merge rules so required BaaS fields are not cleared by empty LLM output; native **horizontal drag** auto-scroll + listener teardown. **TECHNICAL_REFERENCE** — URL import subsection *extraction hints and required-field merge*; Product Analytics optional *digest/labs* experiments stub. **TEST_PLAN** — thin-listing-body import check (§2a); horizontal board drag (§2c). |
| 2026-04-16 | **Canonical specs folder (`specs/canonical/`):** fourth spec-lifecycle home for *living references / methodology / invention disclosures* that outlive any one implementation pass and are exempt from `partial/` → `completed/` moves. **WORKFLOW** “Spec lifecycle folders” subsection; update-log row; pattern encoded via `.cursor/rules/specs-and-todo.mdc` + `spec-completion.mdc` in source app. |
| 2026-04-16 | **AUTOMATED_TESTING template:** optional ForgeKit doc for Vitest / API / Playwright strategy; pairs with **TEST_PLAN**; propagation Context, **WORKFLOW** inventory row, **README** tree. |
| 2026-04-16 | **New prompt: User-Facing Content Sync Audit** — periodic review ensuring all discovery surfaces (landing, features, help, tours, onboarding, nav, exports) stay current with shipped features. |
| 2026-04-16 | **Exec Foundry propagation (two-track):** TECH_REF stubs (branded discovery elevation, optional LLM vendor browse tools); TEST_PLAN §2b nav/label parity; BRAND profile/priority label lesson; CONTEXT tour skip + trial UI race; pre-launch billing wake check; WORKFLOW Phase 6 + INITIAL_PROMPT (feature catalog + content sync); propagation Context — optional `FEATURE_CATALOG.md`. |
| 2026-04-15 | **WORKFLOW.md:** §1a — ForgeKit template propagation blurb (two tracks: feature memory vs pattern memory; `update-log.md` append). |
| 2026-04-15 | **Propagation = two tracks + older journal gaps:** `propagate-to-forgekit.md` — “what propagation means,” Step 3 walk twice, Step 4 **1b** thin stubs, Step 6 journal backlog, incomplete-propagation constraint; `TECHNICAL_REFERENCE` optional stubs for `.ics`, self-service export, first-party analytics proxy; `TEST_PLAN` credential refresh; `CONTEXT_PROMPT` re-auth vs list stores. |
| 2026-04-15 | **Journal “Added” → feature templates (follow-up):** `TECHNICAL_REFERENCE` stubs for user-intent profile → discovery/variants and trust/plausibility checks; `TEST_PLAN` §2b; `BRAND_AND_PRODUCT` nav hubs; `DESIGN_SYSTEM` focus-visible + FAQ grouping; `WORKFLOW` Phase 4 doc depth; propagation prompts (EF + ForgeKit) — map journal **Added** to feature docs, not only CONTEXT lessons; `pre-launch-audit` nav-hub parity. |
| 2026-04-15 | **Bulk import, admin archive, deploy blips, support IDs:** multi-record URL import (preview, caps, stub/finalize, CSV symmetry); admin archive vs gated erase; rolling-restart / proxy 502 lesson; user-facing support correlation ids; onboarding + tour UX; discovery→import contract; TEST_PLAN + pre-launch CSV check. |
| 2026-04-10 | **Transactional email + deletion lifecycle:** app-owned outbound mail (BaaS vs product, env, idempotency, graceful no-op, DNS); data-model **deletion and data lifecycle** (cascade vs soft delete, orphans); TEST_PLAN auth subsection; CONTEXT, DEPLOYMENT, pre-launch-audit, WORKFLOW; propagation triggers. |
| 2026-04-10 | **PocketBase JS SDK parallel reads:** list routes that fan out `getList` on one client hit auto-cancellation — nested data empty after reload; document `requestKey: null` / alternatives. **Admin vs active account:** session capability flags must follow signed-in user; impersonation needs explicit detection. CONTEXT_PROMPT, TECHNICAL_REFERENCE, TEST_PLAN; propagation prompt discovery row. |
| 2026-04-08 | **Panel usability audit prompt:** New reusable prompt `panel-usability-audit.md` — six-dimension audit methodology (flow, hierarchy, errors, affordances, consistency, accessibility) producing a phased spec with severity/effort ratings. |
| 2026-04-08 | **Git commit / `--trailer`:** Agent/IDE shells may inject `git commit --trailer`, which fails on common Git for Windows (`unknown option 'trailer'`). `commit-messages.mdc` (EF + ForgeKit): prefer `git commit -F`; fallback `cmd.exe //c "…git commit -F…"` to bypass the wrapper. |
| 2026-04-11 | **Commit message rules:** detailed multi-line body by default (subject + blank line + scope/what/why); removed one-line-only habit; `commit-messages.mdc` + `git-user-commits.mdc` in EF + ForgeKit; `git commit -F` note for Windows/Cursor; propagate prompt Context rows. |
| 2026-04-10 | Cursor rules: **commit after substantive work** with message from session summary **reconciled to staged diff**; new `git-user-commits.mdc`; `commit-messages.mdc` updated; propagation triggers + Exec Foundry `Propagate to ForgeKit.md` Context row. |
| 2026-04-09 | Propagation prompts: **Discovery scan**; CI/dev-tooling triggers; Step 1 + Step 6 gaps; `prompts/README` + `PHASE_1_BRIEF` note (EF); **parity pass** — `propagate-to-forgekit.md` Step **7** `update-log` append, journal + “major feature” triggers, optional NPS/launch docs, “skim Steps 2–3” intro. |
| 2026-04-08 | Journal + git themes (Apr 7–8): headless PDF/LibreOffice export lessons, duplicate-URL guard before create, Node/CI/`engines` parity, global keyboard shortcuts; TECH_REF, CONTEXT Patterns, DEPLOYMENT, DESIGN_SYSTEM. |
| 2026-04-06 | TypeScript hygiene at boundaries: `unknown` catches + shared error helpers, PocketBase `RecordModel` at mapper inputs, UI literal unions; CODE_QUALITY checklist and narrative lessons; CONTEXT_PROMPT + TECHNICAL_REFERENCE alignment. |
| 2026-04-06 | Personal beta outreach: **Alumni / former org** promoted from overlay tag to first-class bucket **E** (A--F); classification, templates, and tracking updated in `personal-beta-outreach.md` prompt. |
| 2026-04-02 | UI chrome & nav flyouts: flex shell, nested-menu hover state, typography split, flyout positioning lessons; new `SPEC_UI_CHROME_NAV_TEMPLATE`; propagate prompt Context updated. |
| 2026-03-26 | Product-limit centralization lessons; new `product-feedback-to-spec` prompt; propagate prompt + README tie-in; this log created. |
| 2026-03-26 | Propagate prompt: **generalization first**—abstract rule before illustrative examples (magic numbers/strings as illustrations, not headlines); `update-log` guidance aligned. |
| 2026-03-27 | Server-side failure observability pattern: centralized failure logging with PostHog, failure categories, instrumentation priority tiers. |
| 2026-03-27 | LLM justification pattern, invisible-feature marketing audit, future-proof copy, scroll-bounce anti-pattern, journal same-day merge fingerprinting, accent border placement, spec-with-quick-win delivery. |
| 2026-03-30 | New `NAMING_EXPLORATION.md` template (product naming/renaming methodology); `WORKFLOW.md` Phase 6 updated to reference it; propagation prompt Context sections updated. |
| 2026-04-05 | Personal beta outreach playbook: relationship-warmth buckets, classification rules, per-bucket message templates, AI-tell writing checklist, promo mapping strategy. New prompt + MARKETING_GROWTH and BRAND_AND_PRODUCT lessons. |
| 2026-03-31 | Landing SEO single-source module; fixed nav + spacer + hysteresis; SSR date + hydration store patterns; HTTPS base URL port pitfall; pre-launch SEO checklist alignment. |

---

## Detail

### 2026-06-15 — Microcopy centralization (Exec Foundry)

- **`prompts/microcopy-centralization.md`** — Phased cluster migration checklist; three-layer architecture (labels / microcopy / surface `*Copy.ts`); duplication policy; three complementary audits (sync, export duplication, inline AST); legal-as-markdown guidance.
- **`docs/TECHNICAL_REFERENCE.md`** — New **User-facing copy** section: module layout, export/audit scripts, cursor rules, pre-release target (0 inline prose backlog).
- **`docs/CODE_QUALITY.md`** — Audit checklist row for `export:copy` + `audit:inline-copy` + sync audit before marketing pushes.
- **`docs/TEST_PLAN.md`** — §12 optional copy-hygiene walkthrough.
- **`docs/BRAND_AND_PRODUCT.md`** — **Microcopy duplication policy** blockquote under Copy & Messaging Lessons.
- **`docs/CONTEXT_PROMPT.md`** — Centralized copy module pattern + anti-patterns for duplicated help prose and inline product strings.
- **`WORKFLOW.md`** — Phase 7 hardening + post-launch re-run cadence for copy audits.
- **`README.md`** — Prompt tree entry for `microcopy-centralization.md`.
- **`prompts/user-facing-content-sync-audit.md`** — Cross-link to microcopy centralization prompt.
- **`prompts/propagate-to-forgekit.md`** — Trigger row + Context inventory for microcopy pass.
- **`.cursor/rules/user-facing-content.mdc`**, **`us-english.mdc`** — App copy tone/locale defaults (also in **`mcp-server/content/cursor-rules/`** for MCP distribution).

### 2026-06-10 — Anti-self-importance and position-of-strength tone controls

Propagated from Exec Foundry after implementing and validating the cover letter anti-self-importance and position-of-strength rules. Pattern and feature memory for any application that generates outbound copy representing the user and needs to prevent grandiose, visionary, or striving registers from leaking into the output.

- **`docs/TECHNICAL_REFERENCE.md`**
  - **Anti-self-importance and position-of-strength tone controls** — New subsection documenting the need for strict tone and posture controls, filtering out rhetorical scaffolding/self-narration, banning clever self-authored aphorisms, and enforcing a "position of strength" posture.
- **`docs/CONTEXT_PROMPT.md`**
  - **Patterns to Follow** — Added a pattern on anti-self-importance and position-of-strength posture, outlining specific rules and the "why" behind them.
- **`docs/BRAND_AND_PRODUCT.md`**
  - **Generated letters and long-form outbound copy (LLM)** — Added a lesson learned on how anti-self-importance and position-of-strength rules prevent grandiose and striving registers.
- **`docs/TEST_PLAN.md`**
  - **AI Features** — Added `### 4.4 Anti-self-importance and position-of-strength tone checks` containing manual test cases for grandiose framing, visionary self-positioning, analytical flattery, name-dropping by negation, performative specificity, modifier stacking, and position-of-strength posture.

### 2026-06-10 — Factual grounding and veracity check safety nets

Propagated from Exec Foundry after implementing cover letter grounding in resume truth and a programmatic veracity pass MVP. Pattern and feature memory for any application that generates tailored materials representing the user and needs to prevent hallucinations and establish user trust.

- **`docs/TECHNICAL_REFERENCE.md`**
  - **Factual grounding and veracity checks on tailored outputs** — New subsection documenting the feature shape, grounding contract (passing full source document in prompt), and programmatic veracity pass (post-generation semantic audit using a smaller model) as a human-in-the-loop safety net.
- **`docs/CONTEXT_PROMPT.md`**
  - **Patterns to Follow** — Added a pattern on factual grounding and veracity checks, emphasizing passing full verbatim text of source documents and running post-generation audits.
- **`docs/BRAND_AND_PRODUCT.md`**
  - **Generated letters and long-form outbound copy (LLM)** — Added a lesson learned on how factual grounding and veracity checks prevent hallucinated credentials and establish trust.
- **`docs/DESIGN_SYSTEM.md`**
  - **Factual grounding and veracity cards** — New section specifying visual styling, structure, detailed issue cards (severity badges, exact excerpts, reasons, repairs), and outcome-oriented copy for veracity cards.
- **`docs/TEST_PLAN.md`**
  - **AI Features** — Added `### 4.3 Factual grounding and programmatic veracity checks` containing manual test cases for grounding checks, automatic veracity passes, flagged issues, success states, persistence, and dismissal.

### 2026-06-04 — LLM JSON parse hardening (verbatim document upload)

Propagated from Exec Foundry after production `server_failure_llm_parse` on resume DOCX upload (`Bad control character in string literal` when the model copied soft line breaks verbatim into JSON strings). Pattern memory for any app that maps uploaded documents to structured JSON via LLM.

- **`docs/TECHNICAL_REFERENCE.md`**
  - **Output Validation** — lesson + guidance: prompt escape rule (`\n` / `\t` inside strings), shared `parseJsonFromLlmOutput` + `sanitizeJsonControlChars` (strict-first, repair fallback), route all verbatim-copy parsers through the helper, Support ID on upload failures.
- **`docs/CONTEXT_PROMPT.md`**
  - Integration pattern — verbatim text in LLM JSON: prompt + server-side sanitization for onboarding-critical uploads.
- **`docs/CODE_QUALITY.md`**
  - Audit checklist item **#5** — do not bare-`JSON.parse` verbatim-copy LLM output; unit-test newline-in-string payloads.
- **`docs/TEST_PLAN.md`**
  - **Resume / cover-letter upload — LLM JSON resilience** — manual checks for soft-break DOCX, Support ID correlation, content sanity.

### 2026-06-01 — Loved-tier UX patterns (focus trap, board recommendation, first artifact, AI lifecycle)

Propagated from Exec Foundry's beta-iteration ("loved") cohesion first pass. Generalized delight and cross-cutting primitives beyond the early-beta tier.

- **`docs/DESIGN_SYSTEM.md`**
  - **Accessibility Patterns → Modal and dialog focus trap** (new) — shared trap action: Tab cycle, `[data-autofocus]`, return focus on teardown; Escape stays per-layer.
  - **Board-level "next best move"** (new) — elevate top priority follow-up into a calm "Start here" strip; distinct from inline first-run panel hints.
  - **First successful artifact moment** (new) — one-time orientation overlay after first core generated bundle; per-user dismissal.
  - **AI-generated section lifecycle** (new) — empty / generating / ready / stale vocabulary + canonical stale banner; input-hash prerequisite for stale.
- **`docs/CONTEXT_PROMPT.md`**
  - **Patterns to Follow** — focusTrap adoption; AI lifecycle vocabulary; board Start here from reminders; first-artifact overlay.
  - **Anti-Patterns** — modals without trap/return; per-surface AI status copy drift.
- **`docs/TECHNICAL_REFERENCE.md`**
  - **AI/LLM Integration → AI-generated section lifecycle** — feature stub (routes, persistence, staleness hash, vocabulary module).
- **`docs/TEST_PLAN.md`**
  - New **§7.4c** focus trap, **§7.4d** first-artifact orientation, **§7.4e** board recommendation, **§7.4f** AI section lifecycle checks.

### 2026-05-29 — Cohesion-tier UX patterns (keyboard, skeletons, empty states, save ack, first-run hints)

Propagated from an Exec Foundry "early-beta cohesion" implementation pass that built a minimal global keyboard layer, a board load skeleton, an `EmptyState` hero variant, a unified save acknowledgement, and a first-open wayfinding hint. Generalized into reusable, stack-neutral guidance.

- **`docs/DESIGN_SYSTEM.md`**
  - **Global keyboard shortcuts** — two new lessons: ship the *smallest credible set first* (`/` search, create-new, `?` help, disciplined `Esc`) with `isTypingContext` + IME guards and "bare primary surface only" gating; and a **minimal-safe `Esc`** that defers to layers already owning Escape (record drawers, modals) instead of stacking a second `window` listener — full topmost-layer precedence deferred.
  - **First-load skeletons (shape over spinner)** (new) — skeleton mirroring the destination layout for data-heavy primary surfaces; spinners reserved for small bounded waits.
  - **Canonical empty-state component** (new) — one component with `wrapper`/`centered`/`hero` variants; first-run copy driven by onboarding/search stage so the empty screen teaches the next step.
  - **Save acknowledgement (auto-save feedback)** (new) — one shared three-phase ack (`Saving…`/`✓ Saved`/`Couldn't save`) for blur-save surfaces; no per-field spinners, no success-only ack.
  - **First-run hints (dismissible coach marks)** (new) — one-time inline "start here" cue on dense surfaces, dismissal persisted per user.
- **`docs/CONTEXT_PROMPT.md`**
  - **Patterns to Follow** — unified save acknowledgement fed by parent + child components via an `onSaveStatus(phase, label?)` bubbling callback into one `setSaveAck` machine.
  - **Anti-Patterns to Avoid** — partial/success-only save acks; and registering an app-level `Esc` handler without deferring to layers that already own the key.
- **`docs/TEST_PLAN.md`**
  - §10 — save-ack lifecycle (`Saving…` → `Saved`), error phase on simulated failure, and ack ubiquity across parent + child fields.
  - §7.4 — skeleton-shaped-like-destination check; new **§7.4a** global keyboard shortcuts and **§7.4b** first-run hints checklists.

### 2026-05-29 — New prompt: UX Cohesion Audit

Reusable whole-app UX audit, generalized from an Exec Foundry pass that produced a cohesion-audit spec. Distinct from the existing single-surface and launch-readiness audits.

- **`prompts/ux-cohesion-audit.md`** (new) — app-agnostic prompt for a fresh-eyes, cross-cutting read of where a product confuses, blocks, distracts, or fails to delight. Codifies: a **two-lens method** (Lens A cross-cutting "feels like N apps" themes — inconsistent interaction/save/confirm models, silent feedback, opt-in-only discoverability, missing global keyboard model, fragmented system legibility, vocabulary/state drift; Lens B surface-by-surface findings); a **Step 0** that reads the existing spec/doc corpus so the audit *points at* owned specs instead of re-speccing them (mandatory "relationship to existing specs" table); a **Critical/High/Medium/Low + XS–L effort** model with **delight as a first-class tier**; and a three-tier prioritized plan (trust → cohesion → loved). All placeholders bracketed and stack-neutral.
- **`README.md`** — prompt file tree gains `ux-cohesion-audit.md` (and the previously-missing `panel-usability-audit.md`).



Single agent workspace folder for **Lite file bootstrap** and **MCP greenfield**:

- **`mcp-server/content/FORGEKIT_LITE.md`** — **v1.1.8**; §1.5 renamed to **`.forgekit/`** (Lite and MCP).
- **`mcp-server/content/NEW_PROJECT_BOOTSTRAP.md`** — tracking + guardrails under **`.forgekit/`**; no repo-root split.
- **`mcp-server/src/index.ts`** — kickoff bundle and **`getInitialWorkflowTracking`** write path.
- **`cursor-rules/forgekit-no-trailer.mdc`**, **`forgekit-updates-log.mdc`**, **`forgekit-workspace-README.md`** — renamed from `forgekit-lite-*`.
- **`WORKFLOW.md`**, **`README.md`**, **`INITIAL_PROMPT.md`**, **`CONTINUATION_PROMPT.md`**, **`TRACKING_SCHEMA.md`**, **`docs/PHASE_1_BRIEF.md`**, **`docs/CONTEXT_PROMPT.md`** — customer paths use **`.forgekit/`**.
- **`forgekit-phase-status.mdc`**, **`KICKOFF_WITHOUT_MCP.md`**, **`SESSION_RESUME_MCP.md`** — read **`.forgekit/workflow_tracking.json`**.

### 2026-05-21 — FORGEKIT_LITE v1.1.7 (EchoVault / monorepo env fold-in)

Merged **`FORGEKIT_LITE_UPDATES.md`** maintainer notes into upstream Lite:

- **`mcp-server/content/FORGEKIT_LITE.md`** — **v1.1.7**; **§1.6** feedback log; **§4.2.1** environment variables; **§4.1** native-addon preflight; **§4.2** workspace UI+API layout + updates-log rule in step 3; **§13–§14** anti-patterns and baseline docs for env/port drift.
- **`mcp-server/content/FORGEKIT_LITE_UPDATES.md`** — empty per-project starter (protocol text now in §1.6).
- **`prompts/propagate-to-forgekit.md`** — trigger rows for monorepo env / native builds.

Bundled assets unchanged in role: **`cursor-rules/forgekit-lite-*.mdc`**, **`forgekit-lite-workspace-README.md`**.

### 2026-05-20 — FORGEKIT_LITE v1.1.6 (ChronoVault → published repo)

Lessons from publishing **ChronoVault** after Lite bootstrap had committed ForgeKit workspace files to git history (before optional `.forgekit/` gitignore guidance):

- **`mcp-server/content/FORGEKIT_LITE.md`** — **v1.1.6**; new **§1.5** `.forgekit-lite/` gitignored workspace; **§4.1.1** GitHub GH007 / noreply identity; §4.2 / §11 / §12 / §14 path updates; §13 anti-patterns for public Lite commits and history rewrite.
- **`mcp-server/content/FORGEKIT_LITE_UPDATES.md`** — new feedback-log template (§6–§8 from ChronoVault boot).
- **`mcp-server/content/cursor-rules/forgekit-lite-no-trailer.mdc`** + **`forgekit-lite-updates-log.mdc`** — bundled for Lite workspace copy.
- **`mcp-server/content/forgekit-lite-workspace-README.md`** — local setup notes for `.forgekit-lite/`.
- **`mcp-server/content/NEW_PROJECT_BOOTSTRAP.md`** — MCP vs Lite file-bootstrap path split (§1.5 cross-ref).
- **`prompts/propagate-to-forgekit.md`** — trigger row for published-repo / Lite workspace layout.

### 2026-05-19 — Code deduplication and admin proxy of private edge nodes

Generalized patterns from the recent admin observability and code reusability pass:

- **`docs/TECHNICAL_REFERENCE.md`** — New **`Gated Server-Side Proxies for Private Edge Services (Admin-Only)`** subsection. Explains how to securely proxy unauthenticated edge health endpoints (or other VPN-protected APIs) via gated server-side routes (session check + short 10s timeout + server-side credentials/tokens injection) without exposing passwords or topographical hosts to the client browser. Also added a lesson to **`Processing/Transformation`** on isolating third-party file text extractors (such as `mammoth` and `pdf-parse`) behind server-side helper modules (with lazy imports) instead of importing directly inside individual routes.
- **`docs/CONTEXT_PROMPT.md`** — Critical Patterns: added guidance on checking `res.ok` before running `.json()` on responses from long-running generation routes (HTML error page safety). Patterns to Follow: (1) Secure proxy routing for private edge nodes; (2) Micro-icon button helpers wrapping a core button primitive; (3) Modal script-clones deduplication (forms delegated to an underlying form component); (4) Centralized UTC timestamp formatters. Anti-patterns: cloning form state variables between modal wrappers and inline forms; creating multiple visual icon buttons with cloned tooltips and script blocks; leaking parser dependencies inside routes; repeating ad-hoc date replacements.
- **`docs/DESIGN_SYSTEM.md`** — Layout Patterns (Modals): added **Modal-Form Wrapping Architecture** — modal wrappers act as pure visual containers forwarding actions to an extracted canonical, reusable form. Tooltip Guidelines: added **Micro-Icon Button Component Unification** — consolidating visual design, tooltip lifecycles, and icon paddings inside a single, generic `IconButton` wrapper with pass-through prop support.
- **`docs/CODE_QUALITY.md`** — Checklist: added checkpoints for isolating third-party file parsers behind dedicated server boundaries, standardizing ISO timestamps with a central formatter, and securing admin proxies.
- **`docs/TEST_PLAN.md`** — §7.7 (Admin master-detail): added 4 testing checkpoints verifying gating, credentials safety, topography masking, and connection timeouts on gated edge service proxies.

### 2026-05-17 — Compact panel hero + wrap-up commit policy (from Exec Foundry)

Generalized patterns shipped recently in the live app: **dense workspace panels** benefit from a **compact hero** (inline icon, blurb + chips + overflow actions on one row, search and filter chips inside the same accent-stripe card, tighter padding) vs a tall **full hero** with a large circle when the panel needs a stronger visual anchor.

- **`.cursor/rules/git-user-commits.mdc`** — Aligns ForgeKit with Exec Foundry: **end of each request**, when the request changed tracked files, **stage only that request’s paths** and **commit** with message from **`git diff --staged`**; user should not need to say “commit”; **push** still explicit-only; Cursor user-rule override called out.
- **`docs/DESIGN_SYSTEM.md`** — New **Panel interior: compact hero band (workspace panels)** under Layout Patterns (after slide-out width tiers): structure, class tokens, when to use compact vs full hero; separate lesson callout plus existing vertical-density lesson.
- **`prompts/propagate-to-forgekit.md`** — Git / commit policy trigger row: **wrap-up = stage + commit** wording.

**Exec Foundry (source repo):** `prompts/Propagate to ForgeKit.md` — same trigger-row wording for parity on future propagation passes.

### 2026-05-12 — Long-running generation HTTP safety, milestone progress, long-form reading navigation

Follow-up from journal themes (May 7–8 dossier error handling, milestone Intel progress, May 5 sticky outline): generalized patterns for apps with multi-phase AI outputs and long rendered documents.

- **`docs/CONTEXT_PROMPT.md`** — Integration pattern: **Long-running synthesis / research over HTTP** (`Content-Type`, safe parse, JSON error contract with `Accept: application/json`). Anti-pattern: blind `.json()` on generation/research routes (pairs with progressive-import finalize discipline).
- **`docs/TECHNICAL_REFERENCE.md`** — **`AI/LLM Integration` → Output Validation:** lesson on validating HTTP boundaries for long-running generation routes (HTML/plain-text failures, structured API errors).
- **`docs/DESIGN_SYSTEM.md`** — **Long-Running Operations:** second lesson — align UI milestones with **real backend phases** (avoid decorative-only labels). New **`Long-form generated reading (outline & navigation)`** section — sticky outline, scroll-spy, subsection headings, deep links, mobile collapse, keyboard focus.
- **`docs/TEST_PLAN.md`** — **`§7.8 Long-form generated reading`** (5 checklist items). **`§10`** — one item simulating non-JSON/HTML errors on long-running generation routes.

### 2026-05-11 — Client-side fetch/polling resilience, activity timeline, modal extraction, panel density, admin UI

Exec Foundry shipped: **429 request storm fix** (bulk import triggering N concurrent polling intervals), **response guard hardening** across 6+ files, **timer lifecycle cleanup** on page destroy, **stale closure guards** on async operations, **optimistic UI rollback** on HTTP failure, **false success indicator prevention**, **record-level activity/event timeline** (CRUD + AI triage), **inline form → modal extraction** (connections, timeline, companies, people), **panel vertical density audit** (canonical spec + three-phase implementation), **admin UI cohesion** (trial bypass, badge consistency), and **delegation access label centralization**. This pass generalizes the client resilience patterns and UX architecture lessons for greenfield projects.

- **`docs/TECHNICAL_REFERENCE.md`** — New **Record-level activity / event timeline (optional)** stub: append-mostly child events, creation paths (manual, automatic, AI-generated, quick-log), event type extensibility, dedup guard, rendering, inline editing density guidance.
- **`docs/CONTEXT_PROMPT.md`** — New **Client-side fetch and polling resilience** critical patterns group (7 bullets: `res.ok` guards, 429 skip-tick backoff, bulk suppression of per-item polling, timer map cleanup on destroy, stale-closure entity-ID guards, optimistic HTTP-aware rollback, success indicator gating). Two new **Patterns to Follow** (centralize display labels for internal enums; admin-neutral UI for plan/trial gates). Six new **Anti-Patterns** (no `.json()` without `res.ok`; no polling without 429 backoff; no unconditional success indicators; no optimistic updates without `!res.ok` revert; no per-item polling during bulk ops; no `setInterval` without lifecycle cleanup — these complement existing timer-cleanup and error-swallowing bullets but are specific to the fetch/polling class).
- **`docs/CODE_QUALITY.md`** — Six new **Audit Checklist** items (res.ok before json, 429 polling backoff, optimistic revert on !res.ok, success gates, stale-context guards, bulk poll suppression). New **Lesson learned** on auditing fetch/polling resilience as a category with skip-tick example.
- **`docs/TEST_PLAN.md`** — New **§10 Client Fetch and Polling Resilience** (9 checklist items: bulk storm, poll suppression, 429 backoff, orphaned timers, stale data on switch, optimistic revert, false saved, delete dialog, code-review check). New **§11 Record-Level Activity / Event Timeline** (6 checklist items).
- **`docs/DESIGN_SYSTEM.md`** — New lesson under **Modals**: extract inline add/create forms into standalone modals when the form grows or appears in multiple contexts. New lesson under **Slide-Out Panels**: systematic vertical density audit pass (remove redundant headers, collapse copy into placeholders/tooltips, tighten spacing tokens). New lesson under **Admin master–detail tables**: shared badge/chip class for role/status indicators + admin bypass for trial/plan columns.

### 2026-05-06 — External URL scrape: markup drift, optional LLM recover, ForgeKit Lite §7.2

Exec Foundry shipped **layered listing fetch**, **selector maintenance**, **user-facing classification** when parse yields empty despite fetch success, and an optional **last-resort Haiku-class structured recover** from stripped HTML (`specs/partial/scrape-llm-posting-recover.md`). This pass generalizes the **shape** for greenfield ForgeKit projects and ensures **Lite-only** kickoffs see the same guidance.

- **`docs/TECHNICAL_REFERENCE.md`** — New subsection **URL import: deterministic extractors vs markup drift (and optional LLM recover)** — principle-first: separate **wrong URL** from **layout/extraction failure**; layered pipeline; selector fixes vs optional single **verbatim** small-model recover; diagnostics without full HTML; pointer to **`FORGEKIT_LITE.md` §7.2** + partial specs.
- **`docs/CONTEXT_PROMPT.md`** — New **Patterns to Follow** bullet: **Scrape pipeline: markup drift vs bad URLs** with TECH_REF cross-link.
- **`docs/TEST_PLAN.md`** — §2a bullet **Markup drift / empty parse** (outcome-oriented errors; optional recover env gate; diagnostics).
- **`mcp-server/content/FORGEKIT_LITE.md`** — **v1.1.5**; new **§7.2 External URL → structured record (scrape / import)**; header/footer/`AGENTS` snippet version bumps.
- **`README.md`**, **`WORKFLOW.md`**, **`INITIAL_PROMPT.md`** — Cross-references to Lite §7.2 / TECH_REF template (INITIAL already aligned).
- **`prompts/propagate-to-forgekit.md`** and **`exec-foundry/prompts/Propagate to ForgeKit.md`** — ForgeKit **`content/`** inventory names **`FORGEKIT_LITE.md`** and when to edit §7.2 + version; **Step 5** **ForgeKit Lite parity** checklist; **Step 3** mapping row for external URL scrape; **When to run** trigger row **URL / listing import pipeline**.

### 2026-04-30 — DEV_ESTIMATE methodology (inventory + US cost framing)

Generalized from a mature-app refresh: stakeholders ask “what would this cost to rebuild **traditionally**?” — the template must say **how** LOC and API counts were produced, not only headline numbers.

- **`docs/DEV_ESTIMATE.md`** — New **How to measure the inventory** section (`git ls-files` + summed `wc -l` or equivalent; count route handler modules such as `+server.ts`; server subtree file counts; UI breakdown). Inventory table gains API route modules, server modules, UI splits. Effort table gains optional rows (assistant, demo/anonymization, prospect flows, variants). **Cost ranges** framed as hours × rate with **2026 US rate bands** as guidance and `[TOTAL HOURS RANGE]` placeholder. **Key complexity drivers** explicitly mention monolithic files and route-module security surface.
- **`prompts/propagate-to-forgekit.md`** and **`exec-foundry/prompts/Propagate to ForgeKit.md`** — New propagation trigger when **`docs/DEV_ESTIMATE.md`** is materially updated; EF copy fixes a broken markdown table (blank line interrupted the discovery scan table).
- **`WORKFLOW.md`** — DEV_ESTIMATE lifecycle cell notes reproducible inventory methodology.
- **`README.md`** — File tree line for DEV_ESTIMATE mentions inventory methodology note inside the template.

Follow-up (same theme — stakeholder framing):

- **`docs/DEV_ESTIMATE.md`** — **Iteration density (traditional vs assisted)** callouts: headline hours ≠ keystroke-level iteration count; gate-heavy delivery stretches calendar beyond naive hours÷FTE; prompt authors to state assumptions when pitching rebuild cost.

### 2026-05-02 (c) — SaaS-shape templates + propagation prompt parity

Themes that often ship under **marketing names** but recur across products: conversational shell, multiple persisted views on one record, outbound profile/portfolio URLs, dense operator grids.

- **`docs/TECHNICAL_REFERENCE.md`** — **Persistent contextual assistant** (dock/rail binding, persistence, metering, streaming caveat); **Companion lenses on a primary record** (per-lens state, collisions); **User-visible external identity URLs** (normalization, export/PII, dedupe vs internal keys).
- **`docs/CONTEXT_PROMPT.md`** — **Patterns to Follow** bullets aligned with those three capability areas (record binding + streaming tokens; lenses; URL fields + normalization).
- **`docs/DESIGN_SYSTEM.md`** — **Admin/internal tools — master–detail tables** — dense readability, expandable rows / slide-over, colspan for linked accounts, impersonation/session labels.
- **`docs/TEST_PLAN.md`** — §1.8 external identity URLs; §7.5 persistent assistant shell; §7.6 multi-lens detail; §7.7 admin master–detail (numbering shifted with prior §7.x sections).
- **`prompts/propagate-to-forgekit.md`** and **`exec-foundry/prompts/Propagate to ForgeKit.md`** — **Journal-driven propagation** bullet **§6** (*Sounds branded / product-specific*) → generalized stub targets; **Discovery scan** row for journal lines that sound app-specific; **Step 3** mapping rows for assistant, multi-lens, identity URLs, admin tables; **Step 6** second-pass bullet to re-scan marketing-named **`Added`/`Improved`** for §6 shapes.

### 2026-05-02 (b) — Journal-driven propagation instructions + journal-backlog feature stubs

**Prompts (Exec Foundry + ForgeKit):** New **Journal-driven propagation** subsection — default **10–14 day** (or since last `update-log` propagation) sweep of **`Added` / `Improved` / substantive `Fixed`**; **Improved** treated as capability expansion unless polish-only; journal **Docs → specs** cross-read. New trigger row: **week+ shipping without propagation** → run journal sweep. **Step 1** / **Step 3** updated to require journal pass for periodic runs and to include **Improved** / contract-changing **Fixed** in the “walk twice” rule.

**Feature templates (from recent `PRODUCT_JOURNAL` themes, generalized):**

- **`docs/TECHNICAL_REFERENCE.md`** — **Imported record: apply URL vs discovery URL**; **Posting body upgrade (additive merge)**; **AI-assisted tailoring: in-tab critique and structural controls**.
- **`docs/CONTEXT_PROMPT.md`** — Discovery **bulk add** must respect active filters; **dual URL** detail + export parity + dedupe scope.
- **`docs/TEST_PLAN.md`** — §2a dual-URL export; §2b bulk-add filter parity; **§4.2** tailoring critique persistence and structural override.
- **`docs/BRAND_AND_PRODUCT.md`** — **Generated letters** — register, anti-density, cross-paragraph dedup; shared prompt fragments.

### 2026-05-02 — Progressive import client reconciliation, workflow enums, deploy stop timeout

Themes from Exec Foundry recent work (multi-step scrape/import UX, board visibility, operator-reported longer deploys after systemd stop tuning), generalized for greenfield projects.

- **`docs/TECHNICAL_REFERENCE.md`**
  - New **URL import: client reconciliation after multi-step finalize** — after stub+finalize from the browser: failed/unreadable finalize does not trump server state; GET-by-id (or equivalent) merge; strip bulky read payload fields; wire the same success/failure handlers on every surface (modal, discovery, onboarding, bulk); defensive JSON on both steps.
  - New **Stored workflow enums and filter surfaces** — normalize legacy/empty/deferred enum values at the mapper before boards and search; avoid “invisible but deduping” rows and count mismatches.
- **`docs/CONTEXT_PROMPT.md`**
  - **Critical Patterns** — progressive import terminal-state reconciliation + polling caveat for phases that depend on import completion without relying on a single finalize JSON.
  - **Patterns to Follow** — workflow columns aligned with normalized stored status at mapper.
  - **Anti-Patterns** — assuming finalize HTTP is the sole success signal; optional external **API key absent**: avoid perpetual “generating” placeholders — complete with a terminal state and user-visible outcome.
- **`docs/TEST_PLAN.md`** — §2a: finalize failure / reconcile behavior; workflow visibility with legacy or empty status.
- **`docs/DEPLOYMENT.md`** — **`TimeoutStopSec` vs deploy wall-clock**: longer graceful stop budgets can lengthen `systemctl stop` during blue-green/rolling scripts; graceful app shutdown, middle-ground timeouts, CI step split for attribution.
- **`prompts/propagate-to-forgekit.md`** and **`exec-foundry/prompts/Propagate to ForgeKit.md`** — Discovery scan rows for progressive-import client paths and workflow enum normalization; propagation trigger row for systemd/deploy script changes (ForgeKit + EF copies).

Deliberately did **not** duplicate existing stub→finalize **server-side** hint/merge lessons; this pass extends **client** and **enum visibility** angles only.

### 2026-04-26 — FORGEKIT_LITE v1.1.4 (opaque backend errors, SDK vs server)

Condensed one **Engineering** bullet (placed immediately after the CommonJS/ESM line per user preference): managed / single-binary backends return content-less 400/500s when **wire format** drifts between **server binary** and **client SDK** (independent version trains). Symptom can look like *data not saved* when writes pass and reads fail. **First move:** raw HTTP with `curl`, vary one axis at a time, compare to what the SDK sends. **Follow-up:** `beforeSend` normalization until the SDK matches; log **SDK + server** versions in `gotchas[]` for the next session.

### 2026-04-25 — FORGEKIT_LITE v1.1.3 (Windows: Node scripts vs `tar` / PATH)

Field lesson: on Windows, shelling out from a Node installer to Unix-style tools without **platform detection** fails in two common ways — **drive-letter-as-host** (bsdtar interprets `Z:\path\file.zip` as remote `host:path` → `Cannot connect to Z: resolve failed`) and **PATH shadowing** (Git Bash’s GNU `tar` ahead of System32 → `tar -xf foo.zip` fails because GNU tar does not read zip like bsdtar). **FORGEKIT_LITE.md** bumped to **v1.1.3**: §4.1 adds a short **Install/bootstrap scripts (Node)** paragraph; §8 adds **rule 10** (branch before `tar`/`unzip`/`curl`/…; PowerShell or `System32\tar.exe` on `win32`); §13 **Engineering** adds a full bullet with sub-bullets for both traps and the “generalizes to curl, sed, awk, openssl…” note; §11 **gotchas[]** copy block gains a fourth example with the distilled errors and fix. AGENTS snippet version comment updated in the same file.

### 2026-04-24 — PocketBase local port in `.env` (FORGEKIT_LITE v1.1.2)

Users often run **more than one** PocketBase (multiple projects, another clone, a stray process). The binary’s default **8090** is a frequent collision; the app can then fail to connect or talk to the **wrong** process if the URL is implicit or out of sync with `pocketbase serve`. **ForgeKit Lite** is bumped to **v1.1.2** with a new §14 bullet under **`.env.example`**: public API URL+port in env; one source of truth for serve script, SvelteKit client, and admin/schema scripts. The same message is propagated to **WORKFLOW** Phase 2, **INITIAL_PROMPT** (Phase 2 pocketbase sentence), **README** (new “Local PocketBase” subsection), **NEW_PROJECT_BOOTSTRAP** (scripted local services), **POCKETBASE_SCHEMA_SCRIPT** (step 1 and step 2 cross-reference), and **docs/CONTEXT_PROMPT** (example “Database quirks” so merged projects pick it up in session context).

### 2026-04-23 — FORGEKIT_LITE v1.1 / v1.1.1 propagation pass

After two iterations polished `FORGEKIT_LITE.md`, the v1.1 and v1.1.1 concepts were trapped inside that one file. This pass pushes them outward so the rest of the ForgeKit doc set references the same mental model without requiring a reader to start in Lite.

- **`.cursor/rules/commit-messages.mdc`** — workspace rule. Explicit **Mode A vs Mode B** framing. Mode A: the agent typed a trailer → rewrite the command. Mode B: a clean command, and the shell/IDE wrapper injects `--trailer` at argv level below rule-file scope → hop out of the wrapper with `bash -c "git commit -F path/to/msg.txt"` (preferred) or `cmd.exe //c "cd /d <repo> && git commit -F <file>"` (Windows fallback). Notes that `-F` alone does **not** protect against Mode B. Warns against upgrading git to silence `unknown option 'trailer'`: on git 2.32+ the error becomes silent acceptance, which is worse than loud failure. Points back to `FORGEKIT_LITE.md` §8.9 and §4.1.
- **`mcp-server/content/NEW_PROJECT_BOOTSTRAP.md`** — MCP-first bootstrap.
  - Progressive scaffolding — added a **web-app sub-question** (state outliving browser? → A-local drops PocketBase + auth; A-persistent keeps the full stack), a **content-generation pattern** picker (runtime LLM API / build-time LLM generation / BYO-LLM paste) with the trade-offs that matter at Phase 1, both tied back to `PHASE_1_BRIEF.md` §4 and §12.
  - Files to create — a new bullet: create `AGENTS.md`, `CLAUDE.md`, and `.cursor/rules/forgekit-lite-no-trailer.mdc` **unconditionally** regardless of current agent. Users switch tools; a CLAUDE-only repo opened in Cursor next week has no guardrail. Caveat: rule files only guard **Mode A**; Mode B needs the shell hop.
  - Rules — Git commits bullet documenting `-F`, the trailer ban list, Mode B + `bash -c` hop, and the git-version trade-off.
- **`mcp-server/content/GREENFIELD_INTAKE.md`** — Phase 1 intake helper.
  - New **§7 State persistence** section in the same copy-paste shape as existing §6 web search. "Before locking PocketBase + auth, ask…" → A-local vs A-persistent → deploy/secret consequences → record in `PHASE_1_BRIEF.md` §4.
  - New **§8 Content-generation pattern** section, only if content is LLM-produced. Same three-pattern taxonomy as Lite §7.1 with the decision factors spelled out; record in `PHASE_1_BRIEF.md` §12.
  - Updated the "Why this exists" footer to include state persistence and content-generation alongside the existing exports / multi-tenant / hybrid-spec / search list.
- **`WORKFLOW.md`** — Phase 1 "What to ask Claude to do" gains bullets for the state-persistence sub-question (web apps) and the content-generation pattern picker (only if LLM-produced content). Phase 2 "What to provide Claude" gains a content-generation-pattern scaffolding bullet that points to the §7.1 reference skeletons, placed next to the existing LLM-JSON and web-search optional bullets so readers encounter all three in the same eye-path.
- **`INITIAL_PROMPT.md`** — starter prompt. Adds a state-persistence Phase 1 block, a content-generation-pattern Phase 1 block with the three options and their trade-offs, and a **Mode B awareness** block for git commits (`-F <file>`, the trailer ban list, the `bash -c` hop, the git-version note). Sits next to the existing `§4.3 / §4.4` optional blocks for seed JSON and web search.
- **`README.md`** — public README. Adds an **LLM-backed content** subsection (runtime / build-time / BYO-LLM with their trade-offs) and a **state persistence choice** subsection pointing to Lite §7. Matches the shape of the existing "LLM-generated JSON" and "web search APIs" optional subsections.

What this pass deliberately did **not** do: it did not re-export the long-form content or reference skeletons from Lite into every downstream file. The pattern is "mention the existence of the decision and its consequences at the surface, link back to Lite for the recipe." Each outward file gets enough context for Phase 1 to ask the right question and capture the answer in `PHASE_1_BRIEF.md` / `decisions[]`; Lite remains the single implementation source.

### 2026-04-23 — FORGEKIT_LITE v1.1.1 (residual-gaps pass)

Follow-up to v1.1 later the same day, closing the residual gaps that were implicit in the session feedback but not in its explicit priority list. Version bumped to **v1.1.1** in the header, footer, and AGENTS.md snippet comment.

- **Brief template §6 gains homes for the v1.1 concepts:**
  - **§4 Stack & architecture** now has a `State persistence:` row prompting the A-local vs A-persistent choice from §7 (browser-only `localStorage` / `IndexedDB` vs DB + auth). Matches the sub-question; stops the user from having to remember where to write it down.
  - **New §12 Content-generation pattern (if applicable)** — fields for pattern choice (runtime / build-time / BYO-LLM / mixed), provider, env var names, seed file paths, validation boundary, and an inline prompt block. The session that fed v1.1 ad-hoc invented a "§12 for the prompt"; v1.1.1 formalizes it.
- **§14 `.env.example` guidance (B).** Previously mentioned only web-search provider keys (Tavily / Brave). Now also spells out the three content-generation cases: **runtime LLM API** keys go in `.env.example`; **build-time LLM generation** keys go in but with a README note that they are only required to re-run `pnpm run seed`, not to run the app; **BYO-LLM paste** adds **no** key to `.env.example` (only validator / file paths). Matches §7.1.
- **§14 `README.md` guidance (C).** Flipped to reflect the v1.1 pivot from `sv create app/` to manual scaffold at repo root. Default is now `pnpm dev` (repo-root scaffold); `cd app && pnpm dev` (or `pnpm -C app dev`) is the shortcut-only case to document prominently.
- **§7.1 minimal reference skeletons (D).** Session feedback asked for "tiny example pattern" links per pattern. Added three inline code skeletons:
  - **Runtime LLM API:** SvelteKit `src/routes/api/suggest/+server.ts` — `$env/static/private` key, Zod at request and response boundaries, 400 on invalid input, 502 on upstream failure, never leaks the key to the browser.
  - **Build-time LLM generation:** `scripts/seed.ts` — calls the provider once, Zod-validates, writes to `data/seed-catalog.json`, commits. Wired as `pnpm run seed` in `package.json`. README note: the key is only needed to re-generate seed data.
  - **BYO-LLM paste:** `src/lib/data/catalog.ts` — imports the hand-pasted `catalog.json`, Zod-parses at import time so malformed paste fails loudly at app start rather than shipping broken data. Matches §4.3.

### 2026-04-23 — FORGEKIT_LITE v1.1 (session-feedback pass)

Second revision of **FORGEKIT_LITE.md** driven by real-session feedback on v1.0 — three items that *actually* bit during a live project, plus four that will bite someone else. Version bumped to **v1.1** in the header, footer, and the `AGENTS.md` snippet comment.

- **Two failure modes for `--trailer`, not one (§0 callout, §8.9, §12.5, §4.1 preflight, AGENTS.md snippet, `CONTEXT_PROMPT.md` scaffolding note):**
  - **Mode A** — the *agent* authored `--trailer` / `Made-with:` / `Co-Authored-By:` / etc. Same as before: rewrite to plain `-m`, do not diagnose the trailer machinery.
  - **Mode B** — the *platform shell wrapper* injected `--trailer` into argv below where `.cursor/rules/*.mdc`, `AGENTS.md`, or `CLAUDE.md` can reach. The old v1.0 text actively forbade wrapper diagnosis; v1.1 calls this out as the **one case** where finding the wrapper is correct, and prescribes a shell hop (`bash -c 'git commit -m "..."'` or `cmd.exe //c "…"` on Windows) the wrapper cannot see through.
  - **Git-version trade-off in §4.1 preflight:** pre-2.32 git rejects `--trailer` loudly; 2.32+ silently accepts and produces polluted commits. The loud failure is a feature — do not "upgrade git to fix the trailer error," that replaces a visible alarm with invisible attribution leaks.
  - `§11` gotchas[] starter block now includes a Mode-B example entry.
- **`.gitignore` anchoring (§14):** Published `.gitignore` example now anchors root-only rules with a leading slash (`/build/`, `/dist/`, `/pb_data/`, `/pocketbase/`) and adds an explicit warning: an unanchored `build/` will silently match `src/routes/build/` in SvelteKit dynamic-route trees, producing a "clean" `git status` while half the Phase 2 spine is untracked. Rule-of-thumb added for any new framework: check whether its build-output name (`build`, `dist`, `public`, `out`, `target`) could collide with a source path.
- **Manual SvelteKit scaffold promoted to primary Default-A path (§4.2 step 10, §8 rule 6, §13):** The §4.2 bootstrap (steps 1–9) always leaves the repo root **non-empty** by step 10, so `pnpm dlx sv create .` will always hit the un-skippable `Directory not empty. Continue?` prompt and hang. v1.1 resolves the self-contradiction by making **manual scaffold** (`pnpm init` + `pnpm add -D @sveltejs/kit @sveltejs/adapter-auto @sveltejs/vite-plugin-svelte svelte svelte-check typescript vite tailwindcss @tailwindcss/vite tsx @types/node` + hand-written configs + `pnpm exec svelte-kit sync`) the default. `sv create` is demoted to an explicit shortcut with one rule: target a **new, empty subfolder** (`sv create app`), never `.`. §13 anti-pattern rewritten to match; §8 rule 6 example updated.
- **`pnpm init` cleanup checklist (§4.2 step 10 A.3):** Applies to both paths. Set `"type": "module"`, set `"name"` from the brief (not the directory default), remove `"main": "index.js"` unless publishing a library, replace the default "Error: no test specified" script with real scripts, pick a real `"license"` or remove the `"ISC"` default.
- **§7 web-app sub-question (local-only vs persistent):** Before locking PocketBase + auth for a Default-A project, ask whether any state needs to outlive the browser. If not (many hobby / toy apps fit here), drop PocketBase + auth entirely, enable `adapter-static`, persist via `localStorage` / `IndexedDB`. Avoids scaffolding server infrastructure the project will never use. Decision recorded in `decisions[]` and brief §4.
- **§7.1 content-generation patterns:** New subsection covering three orthogonal options when the app needs LLM-produced content — **runtime LLM API** (live, pay-per-use, keys required), **build-time LLM generation** (offline `pnpm run seed` writes JSON into repo, zero runtime cost, pairs with `adapter-static`), and the **BYO-LLM paste pattern** from §4.3 (user runs prompt in their own chat, pastes JSON, schema validates — zero keys, ideal for free-hosted hobby/OSS projects). Pattern choice recorded in `decisions[]` alongside stack.
- **Unconditional platform rule file creation (§4.2 step 3, §12.5 cross-platform notes):** Users switch tools between sessions — Cursor today, Claude Code tomorrow. v1.1 creates all three rule files up front:
  1. `AGENTS.md` (Codex + AGENTS.md-native tools),
  2. `.cursor/rules/forgekit-lite-no-trailer.mdc` (Cursor Mode-A override),
  3. `CLAUDE.md` (Claude Code Mode-A override).
  Cost is zero, coverage is complete. Remembered that rule files are **not** a complete fix for Mode-B argv injection; the §12.5 preface now says so explicitly and points at the `bash -c` hop.
- **Minor:** §4.2 step 8 now defines *explicit approval* ("locked", "approved", "go to phase 2", "ship it" — silence/ambiguous nods/questions don't count; when in doubt, ask). §8 rule 2 adds an output-budget escape hatch: if the spine will exceed ~30 tool calls, split into **two commits within the same Phase 2 session** (configs + stubs, then route bodies + hero-flow glue) without pausing for user approval between them — still "one-pass spine," not a deferred wiring.

### 2026-04-17 — Exec Foundry: import hints, required-field merge, SSR drag cleanup

- **`docs/CONTEXT_PROMPT.md`** — Framework: **`onDestroy` / SSR** — guard DOM/`document` cleanup with `browser`. Integration: **two-phase URL import** — pass listing/title/employer hints into extraction; do not overwrite required fields with empty model values. Patterns: **horizontal Kanban drag** — document `dragover` edge scroll + `browser`-guarded listeners. Anti-pattern: document-level drag listeners without guard/teardown.
- **`docs/TECHNICAL_REFERENCE.md`** — New **URL import: extraction hints and required-field merge** (hints from header/schema/URL; defensive merge; normalization cross-ref). Under Product Analytics: optional **Digest, labs, or experimental analytics panels** (routes, entitlements, capability-based APIs, observability, suggestions-first UX).
- **`docs/TEST_PLAN.md`** — §2a: **thin listing body** still populates required fields after finalize. New §2c: **horizontal scroll while dragging** + clean console / no SSR destroy errors.

### 2026-04-16 — Canonical specs folder (`specs/canonical/`)

- **`WORKFLOW.md`** — Phase 4 "What to ask Claude to do" list: new **Spec lifecycle folders** bullet describing the four homes (drafts in `specs/`, in-flight in `specs/partial/`, finished in `specs/completed/`, **living references in `specs/canonical/`**). Canonical specs are exempt from `partial/` → `completed/` moves; header uses `**Spec kind:** Canonical reference` + catalog-state `Status:` line. Recommends encoding the lifecycle in `.cursor/rules/specs-and-todo.mdc` + `spec-completion.mdc`.
- **Source-app pattern:** Exec Foundry `.cursor/rules/specs-and-todo.mdc` + `spec-completion.mdc` updated in the same pass: "Delivery specs" vs "Canonical specs" split; `spec-completion.mdc` opens by declaring it applies only to delivery specs; new-spec guidance says canonical specs go **directly** to `specs/canonical/`. Exec Foundry `specs/canonical/` initial population: `outreach-buckets-canonical.md` (methodology), `elevator-pitch-canonical.md` (living variant catalog), `patent-application.md` / `patent-application_opus.md` / `patent-application-comparison.md` (invention disclosure drafts).
- **Lesson behind the move:** When a "canonical" living reference is managed through the delivery lifecycle (root `specs/` for drafts, `completed/` once a first pass ships), its catalog rows keep growing but the folder signals "done, don't touch" — the two misalign. `specs/canonical/` gives living references a stable home while keeping delivery specs honest about `partial/` vs `completed/`.

### 2026-04-16 — AUTOMATED_TESTING template + inventory

- **`docs/AUTOMATED_TESTING.md`** — New optional template: automated test layers (unit, API, browser/E2E), complements manual **TEST_PLAN** (not a replacement).
- **`prompts/propagate-to-forgekit.md`** — Both Context bullet lists include **`docs/AUTOMATED_TESTING.md`** after **TEST_PLAN**; discovery table row maps “testing strategy” to **TEST_PLAN** and/or **AUTOMATED_TESTING**.
- **`README.md`** — Docs tree lists **AUTOMATED_TESTING.md** next to **TEST_PLAN.md**.
- **`WORKFLOW.md`** — Progressive doc table: **AUTOMATED_TESTING.md** row (Phase 4+, optional).

### 2026-04-15 — WORKFLOW propagation blurb

- **`WORKFLOW.md`** — After **§1a** progressive doc **Agent rule**: short **ForgeKit template propagation (two tracks)** note — `TECHNICAL_REFERENCE` / `TEST_PLAN` for named capabilities vs lesson callouts elsewhere; `update-log.md` after each pass.

### 2026-04-15 — Propagation semantics (feature memory vs pattern memory) + journal backlog templates

- **`prompts/propagate-to-forgekit.md`** — Opening “two parallel deliverables”; periodic backlog review; Instructions on **both tracks**; Step 3 **twice** (feature home, then lessons); Step 4 **1b** thin feature-area stubs; Step 6 **journal backlog**; Constraints **incomplete propagation** when only lesson callouts ship for a new capability.
- **`docs/TECHNICAL_REFERENCE.md`** — Optional **Feature Documentation** stubs: calendar / `.ics` exports; user **data export & portability**; **first-party / reverse-proxy** analytics ingest under Product Analytics.
- **`docs/TEST_PLAN.md`** — **§1.7** credential refresh / password change: lists and parallel loads must not render empty after re-auth.
- **`docs/CONTEXT_PROMPT.md`** — **Credential change vs in-memory SPA state:** refetch / invalidate after auth rotation to avoid empty pipeline UX.

### 2026-04-15 (follow-up) — Product journal **Added** as feature propagation

- **`docs/TECHNICAL_REFERENCE.md`** — **User intent profile** subsection (direction/goals driving discovery + artifact variants; canonical fields; discovery → same import pipeline). **Trust / plausibility checks** subsection (structured comp vs text heuristics; false-positive severity).
- **`docs/TEST_PLAN.md`** — **§2b** intent-driven discovery, profile refresh, URL-synced panel tabs, trust vs structured pay.
- **`docs/BRAND_AND_PRODUCT.md`** — **New primary hubs and navigation pillars** (landing/Help/FAQ alignment when IA adds a top-level area).
- **`docs/DESIGN_SYSTEM.md`** — **Focus-visible and composite widgets**; **FAQ** structure note for category tabs / shareable categories.
- **`WORKFLOW.md`** — Phase **4** row: new capabilities need TECH_REF feature stubs + TEST_PLAN scenarios, not only lesson callouts in CONTEXT.
- **`prompts/propagate-to-forgekit.md`** + **Exec Foundry `prompts/Propagate to ForgeKit.md`** — Intro + discovery scan + periodic review: journal **`Added`** / major **`Improved`** → Step 3 feature documentation, not lessons only.
- **`prompts/pre-launch-audit.md`** — Checklist: **primary nav hub** changes vs landing / About / Help / FAQ groupings.

### 2026-04-15 — Exec Foundry journal themes (Apr 8–15)

- **`docs/CONTEXT_PROMPT.md`** — Integration: **support correlation id** on multi-step failures. Patterns: **multi-record URL import**, **discovery/search → same import contract**, **onboarding** non-blocking background imports, **guided tours** close overlays before shell highlights. Anti-pattern: **bulk import must not bypass limits**.
- **`docs/TECHNICAL_REFERENCE.md`** — **Deletion lifecycle:** admin **archive vs gated hard-delete** lesson. **URL import:** new **Multi-record URL import** subsection (preview, normalization parity, progressive stub/finalize, optional batch finalize flag, PATCH hints, aggregate analytics, CSV header/row alignment).
- **`docs/DEPLOYMENT.md`** — **Rolling restarts / reverse proxy:** dual upstream or health checks to reduce **502/503** during deploy.
- **`docs/TEST_PLAN.md`** — **§2a** manual checks for bulk import, limits mid-batch, CSV round-trip.
- **`prompts/pre-launch-audit.md`** — SEO/data: **CSV export/import column alignment** checklist item.

### 2026-04-10 — Transactional email + deletion lifecycle

- **`docs/TECHNICAL_REFERENCE.md`** — **Data Model → Deletion and data lifecycle:** hard vs soft delete, cascade vs tombstone, fork/copy semantics, orphan risks; **Configuration → Environment Variables:** optional app-owned email vars + lessons (BaaS/auth vs product mail, idempotency, no-op when unset).
- **`docs/DEPLOYMENT.md`** — Infrastructure: outbound transactional email domain authentication (SPF/DKIM/DMARC) before go-live.
- **`docs/TEST_PLAN.md`** — **§1.6** manual checks for app-owned transactional email (signup, password notice, billing events, provider dashboard).
- **`docs/CONTEXT_PROMPT.md`** — Integration patterns: transactional email module, observability, idempotency, PII-safe logging; pointer to TECHNICAL_REFERENCE Configuration and deletion lifecycle.
- **`prompts/pre-launch-audit.md`** — Authentication: app-owned mail credentials and sending-domain DNS when applicable.
- **`WORKFLOW.md`** — Embedded TECHNICAL_REFERENCE lesson bullets: deletion lifecycle documentation; app-owned email pattern.
- **`prompts/propagate-to-forgekit.md`** + **`prompts/Propagate to ForgeKit.md` (Exec Foundry)** — Propagation triggers + discovery scan: transactional email and delete semantics.

### 2026-04-10 — PocketBase parallel requests + admin session shape

- **`docs/CONTEXT_PROMPT.md`** — Critical Patterns (Database quirks): PocketBase JS SDK auto-cancellation when parallel same-collection reads share one client; fix via opt-out key, unique keys, serialization, or separate instances. Patterns to Follow: capability flags (`isAdmin`, etc.) must reflect authenticated identity; impersonation via explicit signal not shared delegation fields. Anti-Patterns: parallel same-collection SDK reads without handling auto-cancellation.
- **`docs/TECHNICAL_REFERENCE.md`** — Schema Notes: lesson on list endpoints enriching parents with per-row related `getList` and aborted/empty nested payloads.
- **`docs/TEST_PLAN.md`** — §8.6 manual checks for list APIs + nested BaaS reads (reload + log sanity).
- **`prompts/propagate-to-forgekit.md`** + **`prompts/Propagate to ForgeKit.md` (EF)** — Discovery scan table: parallel BaaS/SDK list enrichment row.

### 2026-04-08 — Panel usability audit prompt

- **`prompts/panel-usability-audit.md`** (new) — Reusable prompt template for deep UX audits of any panel or feature surface. Six-dimension methodology (flow/orientation, information hierarchy, error handling, missing affordances, consistency, accessibility) with guiding questions and anti-patterns. Output is a structured spec with numbered findings (severity + effort), concrete recommendations, phased implementation tables, affected-files list, and open questions. Generalized from an Exec Foundry Resume panel audit.

### 2026-04-08 — Git commit (`--trailer`)

- **`.cursor/rules/commit-messages.mdc`** (EF + ForgeKit) — Expanded **Multi-line on Windows / Cursor**: do not rely on flows that inject `--trailer`; prefer `-F` message file; if the shell still injects, run `git` via `cmd.exe //c` (adjust path) or the user’s normal terminal.

### 2026-04-11

- **`.cursor/rules/commit-messages.mdc`** (EF + ForgeKit) — Default **multi-line** commits: subject line, blank line, body with scope, per-file or grouped what changed (added/changed/removed), light justification when useful; trivial commits may stay subject-only; note on `git commit -F` when shell/Git wrapper breaks multi-line; professional tone (no joke suffixes); opening line that **committing is allowed** when `git-user-commits` criteria are met (message rules do not forbid commits).
- **`.cursor/rules/git-user-commits.mdc`** (EF + ForgeKit) — Explicit pointer to detailed body by default; new **Permission** section: `git commit` **allowed and expected** after substantive work without the user having to say “commit”; revokes older “only commit if explicitly asked” habit; push still explicit-only.
- **`prompts/propagate-to-forgekit.md`** + **`prompts/Propagate to ForgeKit.md` (EF)** — Trigger row mentions detailed multi-line commit body.

### 2026-04-10

- **`.cursor/rules/git-user-commits.mdc`** (new) — Default: create a commit when substantive work completes; message grounded in session summary but verified against `git diff --staged`; push still only when user asks; skip if user opts out or nothing to commit.
- **`.cursor/rules/commit-messages.mdc`** — Session summary may structure the message, but must reconcile with staged diff; TODO/IDEAS wording unchanged.
- **`prompts/propagate-to-forgekit.md`** — Propagation triggers table: `.cursor/rules` git/commit policy row.

### 2026-04-09

- **`prompts/propagate-to-forgekit.md`** — Discovery scan; triggers for CI, dev-tooling, **journal automation**, **major feature**; intro “skim Steps 2–3”; optional Context bullets (NPS / launch / checklist); Step **7** part 2 **append `update-log.md`** (was missing vs EF mirror).
- **`prompts/Propagate to ForgeKit.md`** — `PHASE_1_BRIEF` + `prompts/README.md` maintenance note in Context.

### 2026-04-08

- **`docs/TECHNICAL_REFERENCE.md`** — File/Document Pipeline → Output/Export: lesson on headless office conversion (isolated profile dir, fonts on host, logging).
- **`docs/CONTEXT_PROMPT.md`** — Patterns to Follow: duplicate URL normalization + pre-insert check for import flows.
- **`docs/DEPLOYMENT.md`** — Infrastructure: `engines` / CI / runtime Node version triplet alignment.
- **`docs/DESIGN_SYSTEM.md`** — New subsection *Global keyboard shortcuts*: centralized registration, ignore editable targets, avoid browser conflicts, discoverability.

### 2026-04-06

- **`docs/CODE_QUALITY.md`** — Audit category #4 expanded: systematic replacement of `any` at catch/JSON/mapper/UI boundaries. New checklist lines: `unknown` catches + helpers, lint/typecheck in CI. New lesson blockquote on tightening types at boundaries + example (`errorMessage`, `RecordModel`).
- **`docs/CONTEXT_PROMPT.md`** — Critical Patterns: `catch (e: unknown)` + shared helpers; PocketBase mappers use `RecordModel` at the route boundary, not `as any`.
- **`docs/TECHNICAL_REFERENCE.md`** — After Schema Notes: lesson on mapper inputs reflecting SDK record types and pairing with `unknown` in routes.

- **`prompts/personal-beta-outreach.md`** — Six primary buckets **A--F** with **E** = alumni/org/cohort as anchor (not a boolean overlay). Tie-break guidance for **E** vs **B**/**C**; edge cases updated; tracking drops separate `Alumni?` column; tone matrix, promo tiers, and template instructions include **E**; full Template E expected in generated playbooks.
- **`docs/MARKETING_GROWTH.md`** — Personal Beta Outreach lesson updated: six buckets including **E**; removed alumni-as-overlay wording.

### 2026-04-02

- **`docs/DESIGN_SYSTEM.md`** — Layout Patterns: full-height main shell (flex vs fragile viewport calc); dropdown secondary flyouts (padding context for `absolute`, shared chrome, vertical center/clamp vs bottom-only growth; hover identity + shell-close reset). Typography: chrome vs reading stacks; interactive control radius consistency.
- **`docs/CONTEXT_PROMPT.md`** — Patterns to Follow: nested hover flyouts (stable id, cancel timers on same id, reset when parent menu closes); flex shell below nav. Anti-patterns: bulk reset on every `mouseenter`; fixed horizontal offsets that drift from sibling `absolute` flyouts.
- **`docs/SPEC_UI_CHROME_NAV_TEMPLATE.md`** — New optional template for apps to copy when nav/chrome rules stabilize.
- **`README.md`** — File tree lists `SPEC_UI_CHROME_NAV_TEMPLATE.md`.
- **`prompts/propagate-to-forgekit.md`** — Context lists the new spec template in both “your app” and ForgeKit inventories.

### 2026-03-26

- **`docs/CONTEXT_PROMPT.md`** — Patterns to Follow: centralize trial length, billing-period windows, tier caps, rate limits, trial export caps, and UI urgency thresholds in named modules; single `MS_PER_DAY` (or equivalent) for calendar math; wire marketing copy from the same constants. Anti-pattern: duplicated policy numbers across hooks, entitlements, and export routes.
- **`docs/TECHNICAL_REFERENCE.md`** — Billing / Entitlements: named constants for tier limits (`planLimitValues`-style module feeding `PLAN_LIMITS`); shared modules for product limits and rate limits; setup-script sync comment pattern.
- **`prompts/product-feedback-to-spec.md`** — New template: turn raw user feedback into an implementation-ready spec (structured headings + rules).
- **`prompts/propagate-to-forgekit.md`** — Context lists `update-log.md`; Step 7 requires appending to this file; README parity note.
- **`README.md`** — Root file tree includes `update-log.md` and the new prompt.

### 2026-03-26 (follow-up)

- **`prompts/propagate-to-forgekit.md`** — After **Instructions**, added **Generalization first**: lead with reusable principle; examples (e.g. duplicated numeric literals, magic strings, copy aligned with enforcement) are illustrative only. **Step 4** renumbered: new rule **Principle before examples**; `📝 **Example:**` callout explicitly for concrete literals/paths; concise lesson rule now item 7.
- **Mirror prompt** (where a live app keeps a copy, e.g. `Propagate to ForgeKit.md`) — Same **Generalization first** block and Step 4 rules; Step 3 mapping row for `update-log.md` if missing.
- **`update-log.md`** (this file) — Intro paragraph: table summaries should state generalized outcomes; Detail bullets describe template changes, not app-specific trivia.

### 2026-04-16

- **`prompts/user-facing-content-sync-audit.md`** — New prompt: periodic audit ensuring all user-facing discovery surfaces (landing/marketing, features/about panel, help/knowledge base, guided tours, onboarding flow, navigation, exports) stay current with the product's shipped feature set. Covers source-of-truth assembly, per-surface checklists, cross-surface information architecture review, naming/branding consistency pass, freshness signals, and structured run-logging. Generalized from a real audit pass that caught stale help sections, missing tour coverage, and buried features after a batch of rapid changes.
- **`README.md`** — File tree updated with new prompt.
- **`docs/TECHNICAL_REFERENCE.md`** — **Feature Documentation:** optional subsections *Branded discovery hub and navigation elevation* (deep-link nav + message parity; pointer to content-sync audit) and *LLM vendor browsing tools* (hosted search/fetch vs own scrape; capability-based API naming; structured fallbacks).
- **`docs/TEST_PLAN.md`** — §2b: checklist item for **named discovery** reachable from top-level nav and in-panel tab — same view, consistent labels with Help/tours.
- **`docs/BRAND_AND_PRODUCT.md`** — *Plain language for profile and priority labels* (schema vs editorial vocabulary; grep tours/onboarding/exports after renames).
- **`docs/CONTEXT_PROMPT.md`** — **Patterns:** tour completion vs skip/cancel for auto-start. **Anti-patterns:** trial/paywall UI racing server entitlement initialization.
- **`prompts/pre-launch-audit.md`** — Billing: cold load / sleep wake / fast onboarding navigation — trial UI matches server (no false "trial ended").
- **`WORKFLOW.md`** — Phase 6 progressive table: optional `FEATURE_CATALOG.md` + periodic `user-facing-content-sync-audit.md`.
- **`INITIAL_PROMPT.md`** — Phase 2 doc note: Phase 6 optional feature catalog + content sync; audit prompt list includes user-facing content sync.
- **`prompts/propagate-to-forgekit.md`** + Exec Foundry **`Propagate to ForgeKit.md`** — Context: optional `docs/FEATURE_CATALOG.md` paired with content-sync audits.

### 2026-03-27

- **`docs/TECHNICAL_REFERENCE.md`** — Product Analytics section: new **Server-Side Failure Observability** lesson. Pattern: low-level server capture module → centralized failure logger (categories, UUID debug correlation, clipped payloads) → convenience wrappers for high-volume categories (LLM parse). Domain-specific modules (e.g. scrape fingerprinting) stay separate. Instrumentation priority tiers (Tier 1: user-impacting failures; Tier 2: instrument when touching; Tier 3: internal). Includes code example.

### 2026-03-27 (follow-up)

- **`docs/TECHNICAL_REFERENCE.md`** — AI/LLM Integration > Output Validation: new lesson on always requesting textual justification alongside LLM-assigned scores/ranks, with full-stack field addition pattern.
- **`docs/BRAND_AND_PRODUCT.md`** — Copy & Messaging Lessons: two new subsections — *Audit for invisible features (the marketing gap)* (diff shipped capabilities vs. marketing surfaces) and *Describe features at the right level of abstraction* (category-of-value over sub-feature enumeration for copy that survives evolution).
- **`docs/CONTEXT_PROMPT.md`** — Critical Patterns: new `{#key}` + `transition:fade` scroll-bounce lesson (layout inflation during crossfade breaks `scrollTo`). Integration patterns: new same-day journal merge pattern (commit-hash fingerprint markers for append-only idempotent updates). Anti-patterns: added `{#key}` + `transition:fade` scroll-bounce. Design Philosophy: new "ship a quick UX win alongside a future-phase spec" pattern.
- **`docs/DESIGN_SYSTEM.md`** — Accent Color Tiers > Medium: lesson on accent border placement — top-borders on viewport-flush panels are invisible; use bottom-borders or inset edges instead.

### 2026-03-30

- **`docs/NAMING_EXPLORATION.md`** — New template: structured methodology for naming or renaming a product. 9 sections (why rename, criteria, theme extraction from brand docs, candidate generation, brand copy stress tests, domain/handle availability with DNS batch-check script, weighted evaluation framework, decision process, what doesn't change) + appendix of 7 naming anti-patterns. Follows ForgeKit blockquote conventions (9 enrichment markers for shell-mode stripping). Designed to run after `BRAND_AND_PRODUCT.md` exists so themes are grounded in real brand language.
- **`WORKFLOW.md`** — Progressive doc schedule table: Phase 6 row now includes optional `NAMING_EXPLORATION.md`. Phase 6 playbook artifacts list: added `NAMING_EXPLORATION.md` with timing note.
- **`prompts/propagate-to-forgekit.md`** — Context section: added `docs/NAMING_EXPLORATION.md` to ForgeKit file inventory.

### 2026-04-05

- **`prompts/personal-beta-outreach.md`** -- New prompt: generates a full personal beta outreach playbook from brand/business/marketing docs. Covers audience buckets (5 warmth levels + alumni overlay), classification workflow, message architecture with shared spine and per-bucket tone, AI-tell writing checklist, promo code mapping, and channel-specific guidance.
- **`docs/MARKETING_GROWTH.md`** -- New *Personal Beta Outreach* section before Growth Audiences: relationship-warmth bucketing pattern, product one-liner rotation, AI-tell checklist summary, promo-per-bucket strategy, connector bucket and forwardable blurb patterns. Pointer to the new prompt.
- **`docs/BRAND_AND_PRODUCT.md`** -- Copy & Messaging Lessons: new *Personal outreach copy: avoid AI tells in founder-written messages* subsection. Covers sincerity adverbs, filler openings, flattery formulas, identical product descriptions, three-item lists, pitch-deck language, and structural parallelism as the hardest-to-catch tell.
- **`README.md`** -- File tree updated with new prompt.

### 2026-03-31

- **`docs/BRAND_AND_PRODUCT.md`** — Copy & Messaging Lessons: new subsection *Single module for landing SEO and on-page marketing copy* (one source for title, meta, OG, Twitter, JSON-LD; audience language consistent with hero; anti-pattern: parallel hardcoded head tags).
- **`docs/DESIGN_SYSTEM.md`** — Navbar: lesson on fixed header + height-matched spacer + scroll hysteresis when the bar animates height; why sticky + height change causes jitter.
- **`docs/CONTEXT_PROMPT.md`** — Critical Patterns: SSR/browser `Date` agreement for rotation keys; store hydration from layout via `$effect`; Integration: HTTPS base URL construction from env without wrong port append (pointer to TECH_REF).
- **`docs/TECHNICAL_REFERENCE.md`** — Configuration: new *Service base URLs (HTTPS and ports)* lesson (parse origin; avoid appending dev default port to production HTTPS).
- **`prompts/pre-launch-audit.md`** — SEO & Social: checklist items for shared module-driven meta/schema and ICP language parity across tags and visible copy.
- **`prompts/Propagate to ForgeKit.md`** (PC copy) — Context section: added `docs/NAMING_EXPLORATION.md` to ForgeKit file inventory.

### 2026-05-16

- **`.cursor/rules/git-user-commits.mdc`** (ForgeKit + Exec Foundry) — Default restored to **commit substantive/bounded work** without requiring the user to say “commit”; emphasizes **descriptive messages** and multi-line bodies per `commit-messages.mdc`; **push** still explicit-only; **opt-out** when the user wants a dirty tree; notes this project rule overrides conflicting global “don’t commit” guidance unless the user overrides in-chat.

### 2026-05-15

- **`.cursor/rules/git-user-commits.mdc`** — Default behavior flipped to **explicit-request commits** (do not commit unless the user asks or clearly bundles “implement and commit”). Documents that **Cursor user rules** override when they request proactive commits; push remains explicit; links to `commit-messages.mdc` when committing.
