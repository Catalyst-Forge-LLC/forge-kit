# ForgeKit

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A structured development methodology for solo developers building full-stack apps with AI coding agents. It turns a general-purpose AI into an experienced build partner by giving it a 7-phase lifecycle, battle-tested lessons, and operational discipline.

**Open source** under the [Apache License 2.0](LICENSE). Fork, use in commercial projects, and contribute via [CONTRIBUTING.md](CONTRIBUTING.md). Security reports: [SECURITY.md](SECURITY.md).

Distilled from real-world app development on [Exec Foundry](https://execfoundry.com).

## Quickstart

**MCP (recommended):** Enable the ForgeKit MCP server ([setup](mcp-server/README.md)) → in your first chat, tell the agent *"Call `getNewProjectKickoff` and set up the project"* (one bundled call) → the agent handles the rest.

**Template-in-repo:** Copy this folder into your project as `_forgekit/` → paste the contents of `INITIAL_PROMPT.md` into your first agent chat → fill in the bracketed placeholders → go.

**Install scripts (from a clone of this repo):** Run against an existing project folder — no MCP required.

```bash
# Full offline kit → <project>/_forgekit/ (+ .forgekit/workflow_tracking.json starter)
pnpm run install:forgekit -- --path /path/to/your-app

# Lite only → <project>/.forgekit/FORGEKIT_LITE.md (+ lite tracking + cursor rules)
pnpm run install:lite -- --path /path/to/your-app
```

Use `--force` to overwrite existing files, `--dry-run` to preview, `--skip-tracking` to omit the tracking JSON. See `scripts/install-forgekit.mjs` and `scripts/install-forgekit-lite.mjs` for details.

Both paths follow the same 7-phase lifecycle. The MCP path keeps methodology server-side and always up to date; the template path is self-contained.

## The 7 phases

| Phase | Name          | What happens                                                                             |
| ----- | ------------- | ---------------------------------------------------------------------------------------- |
| 1     | **Plan**      | Architecture decisions locked before any code. `PHASE_1_BRIEF.md` captures everything so Phase 2 can start cold. |
| 2     | **Build**     | Full working skeleton in one pass. Core workflow running end to end. Brief merged into `CONTEXT_PROMPT.md`. |
| 3     | **Stabilize** | Environment issues, path bugs, auth failures. Make the foundation solid.                 |
| 4     | **Iterate**   | Feature by feature with real data. AI plans before it builds.                            |
| 5     | **Refine**    | Complexity managed before it manages you. Systematic cleanup.                            |
| 6     | **Align**     | Features pressure-tested against product vision. Cut what doesn't serve it.              |
| 7     | **Harden**    | Security, performance, documentation. Production-grade, not demo-grade.                  |

Phases 4 and 5 commonly alternate. A typical path is 1 → 2 → 3 → 4 → 5 → 4 → 6 → 4 → 7. This is normal — the tracking system handles it.

Each phase has detailed entry/exit criteria, a playbook, and example prompts in [WORKFLOW.md](WORKFLOW.md).

Documentation is **progressive** (WORKFLOW.md §1a): Phase 1 produces the brief; Phase 2 adds four core docs; later phases add templates only when the work demands them. No empty boilerplate on day one.

## How to use it

### MCP (recommended)

The MCP server exposes ForgeKit's methodology to any MCP-compatible agent (Cursor, Claude Desktop, Claude Code, Windsurf, etc.) without copying files into your project.

1. Enable the ForgeKit MCP server — see [mcp-server/README.md](mcp-server/README.md) for setup.
2. In your first chat message, tell the agent: *"Call ForgeKit `getNewProjectKickoff` and set up the project."* That single tool bundles bootstrap, starter `.forgekit/workflow_tracking.json`, short first-reply guidance, and the Cursor rule (omit the rule with `includeCursorRule: false` if not using Cursor). In Phase 1, agents should also use **`getGreenfieldIntakePrompt`** (with `getChecklist` `before-session-1`) for exports (e.g. PDF, DOCX, PPTX), tenancy, hybrid spec, compliance, and hero flow.
3. The agent will walk you through Phase 1 planning, create `PHASE_1_BRIEF.md` and `.forgekit/workflow_tracking.json`, then scaffold your app in Phase 2.
4. Your repo ends up with **your app code**, **your filled docs**, and **`.forgekit/workflow_tracking.json`** — not a vendored copy of ForgeKit.

To resume in a later session, tell the agent: *"Call ForgeKit `getResumeSessionInstructions` and pick up where we left off."*

### Template-in-repo

1. Copy the `forge-kit/` folder into your project root as `_forgekit/` (the underscore keeps it sorted separately). Or keep it as a sibling folder and adjust paths in `INITIAL_PROMPT.md`.
2. Open `INITIAL_PROMPT.md`, copy its contents into your first agent chat, and fill in the bracketed placeholders with your project details.
3. The agent follows the Phase 1 → 7 lifecycle in `WORKFLOW.md`, starting with the planning brief.
4. As you build, the agent updates `.forgekit/workflow_tracking.json` and creates docs progressively per WORKFLOW.md §1a.

To resume in a later session, paste `CONTINUATION_PROMPT.md` into a new agent chat.

### Optional: LLM-generated JSON for seed or fixture data

You can use **any** LLM chat (same or different product as your coding agent — including a **local Ollama** window) to produce **valid JSON** for dev seeds, test fixtures, or demo content: paste a structured prompt, save the model’s output to a file in the repo, then have your project agent validate and wire it. Repeat per dataset (e.g. one file for users, another for a catalog). Full ForgeKit documents this in [WORKFLOW.md](WORKFLOW.md) (Phase 2 — what to provide). **ForgeKit Lite** includes a **copy-paste prompt** in [mcp-server/content/FORGEKIT_LITE.md](mcp-server/content/FORGEKIT_LITE.md) §4.3.

### Optional: web search APIs (Tavily, Brave, …)

If the app needs **live web search** (research, RAG, “what’s current”), sign up for a **developer API** and put the key in **`.env`** — common starting points with **free or entry-level credits** are [Tavily](https://tavily.com/) (docs: [docs.tavily.com](https://docs.tavily.com/)) and the [Brave Search API](https://api-dashboard.search.brave.com/) (see their [pricing](https://api-dashboard.search.brave.com/documentation/pricing)). Confirm limits on the vendor site. **ForgeKit Lite** explains the workflow in [mcp-server/content/FORGEKIT_LITE.md](mcp-server/content/FORGEKIT_LITE.md) §4.4.

### Optional: LLM-backed content (runtime / build-time / BYO-LLM)

If the app **displays LLM-generated content**, pick one of three patterns **in Phase 1**; the choice drives deploy model, cost, and secret management:

- **Runtime LLM API** — server route calls the provider per request; requires a server runtime (not `adapter-static`), rate limits, and streaming UX for latency. Live and personalized.
  - **Cloud:** OpenAI, Anthropic, etc. — API key in `.env`; cost scales with traffic.
  - **Local Ollama:** no cloud key; **`OLLAMA_BASE_URL`** + **`OLLAMA_MODEL`** in `.env`. Phase 2 adds **`setup-ollama.bat`** / **`test-ollama.bat`** (install, VRAM-sized model pull, completion smoke test). Defaults: **Granite 4.1** or **Gemma 3** instruct models — not reasoning/thinking models unless the brief requires them. See [SYSTEM_HEALTH_CHECKS.md](mcp-server/content/SYSTEM_HEALTH_CHECKS.md) and [FORGEKIT_LITE.md](mcp-server/content/FORGEKIT_LITE.md) §4.8.
- **Build-time LLM generation** — `scripts/seed.ts` (or `pnpm run seed`) calls the provider **once**, writes JSON into `data/`, commits it. Zero runtime LLM cost; pairs well with local-state apps + `adapter-static`. The seed script can target **cloud APIs** or **local Ollama** the same way as runtime routes (`OLLAMA_BASE_URL` / `OLLAMA_MODEL` only needed when you run `pnpm run seed`, not when users run the app).
- **BYO-LLM paste** — ship a prompt in the repo; the user runs it in **any** LLM chat (ChatGPT, Claude, a local Ollama UI, …); pastes JSON into `data/seed.json`; Zod validates at app start. Zero project-level API keys and no project-level provider bill.

Record **pattern**, **provider** (e.g. `ollama/ibm/granite4.1:8b`, `openai/gpt-4o-mini`), **env var names**, and **validator paths** in **`PHASE_1_BRIEF.md`** (content-generation section) and **`.forgekit/workflow_tracking.json` → `decisions[]`**.

**ForgeKit Lite** §7.1 has minimal reference skeletons (SvelteKit route for OpenAI and Ollama, seed script, import-time validator): [mcp-server/content/FORGEKIT_LITE.md](mcp-server/content/FORGEKIT_LITE.md#71-content-generation-patterns).

**Listing / article URL import (fetch + parse):** If v1 creates records from **pasted external URLs**, read **ForgeKit Lite** §7.2 for layered fetch, **markup drift**, failure UX (don’t blame users for correct URLs when parse fails), and optional **last-resort structured LLM recover**. Full templates expand this in [docs/TECHNICAL_REFERENCE.md](docs/TECHNICAL_REFERENCE.md) (*URL import: deterministic extractors vs markup drift*).

### Web apps: state persistence choice (local vs accounts)

Before locking a backend, answer: *"Does any state need to outlive the current browser — accounts, cross-device sync, shared data — or is per-user state fine in `localStorage` / `IndexedDB`?"* If **local-only**, drop PocketBase + auth and target `adapter-static`; if **persistent**, use the full Default-A stack. See [FORGEKIT_LITE.md](mcp-server/content/FORGEKIT_LITE.md) §7 (A-local vs A-persistent).

### Local PocketBase: port in `.env`, version at install (not hardcoded)

Put the **API URL and port** in **`.env`** / **`.env.example`**. Install scripts resolve PocketBase **`latest`** from GitHub unless **`POCKETBASE_VERSION`** pins a tested semver — do not rely on a single old version frozen in docs. For non-technical operators, Phase 2 should add **setup.bat** / **run.bat** / **status.bat** (see [ONE_CLICK_DEV_SETUP.md](mcp-server/content/ONE_CLICK_DEV_SETUP.md) and [FORGEKIT_LITE.md](mcp-server/content/FORGEKIT_LITE.md) §4.2.2–§4.8). **Troubleshoot one service:** **test-pocketbase.bat**; local LLM: **setup-ollama.bat** / **test-ollama.bat** ([SYSTEM_HEALTH_CHECKS.md](mcp-server/content/SYSTEM_HEALTH_CHECKS.md)). Phase progress: **status.bat** or **docs/FORGEKIT_PROGRESS.md**.

### Using ForgeKit with gstack

If you use [gstack](https://github.com/garrytan/gstack) (Garry Tan's Claude Code slash-command skills), ForgeKit and gstack are complementary:

- **ForgeKit** handles the lifecycle: phases, exit criteria, progressive documentation, `.forgekit/workflow_tracking.json`, business strategy, and persistent project memory across sessions.
- **gstack** handles the sprint: `/plan-eng-review` for design, `/review` for code quality, `/qa` for Playwright-based browser testing, `/cso` for security probing, `/ship` → `/land-and-deploy` → `/canary` for the deploy pipeline.

Use gstack skills *within* ForgeKit phases. gstack persists some sprint artifacts (design docs, retro snapshots, review overrides, skill analytics), but it has no lifecycle state, decision rationale log, or architecture context document. After each sprint, update `.forgekit/workflow_tracking.json` — ForgeKit is how the next session knows what phase you're in, what's been decided, and what the architecture looks like. See WORKFLOW.md §1b for the full phase-by-phase integration guide.

### Propagating lessons back

When you learn something new — a pattern that works, a gotcha that cost hours — propagate it back into ForgeKit's templates so your next project starts smarter. See `prompts/propagate-to-forgekit.md`.

## What your project looks like

After Phase 2, a typical project repo:

```
my-app/
  .forgekit/
    workflow_tracking.json   ← Live progress (AI-updated)
    IDEAS.md                 ← Parking lot for future ideas
  CONTEXT_PROMPT.md          ← Architecture + decisions (merged from Phase 1 brief)
  docs/
    PHASE_1_BRIEF.md         ← Locked Phase 1 handoff (audit trail)
  README.md                  ← Your app's setup instructions
  TODO.md                    ← Feature backlog
  src/                       ← Your app code
  .env.example
  .gitignore
```

Later phases add docs as needed: `TECHNICAL_REFERENCE.md`, `DESIGN_SYSTEM.md`, `BRAND_AND_PRODUCT.md`, `CODE_QUALITY.md`, `DEPLOYMENT.md`, etc. — but only when the work calls for them.

## What's in the box

```
forge-kit/
  WORKFLOW.md              ← 7-phase lifecycle with entry/exit criteria and playbooks
  INITIAL_PROMPT.md        ← Starter prompt for a new project (MCP + local modes)
  CONTINUATION_PROMPT.md   ← Resume prompt for later sessions (MCP + local modes)
  TRACKING_SCHEMA.md       ← How the AI reads and updates `.forgekit/workflow_tracking.json`
  update-log.md            ← Chronological log of ForgeKit template/prompt changes (propagation runs)
  workflow_tracking.json   ← Starter tracking JSON (MCP/Lite: write to customer `.forgekit/workflow_tracking.json`)
  docs/
    PHASE_1_BRIEF.md       ← Template: structured Phase 1 planning handoff
    CONTEXT_PROMPT.md      ← Template: persistent context for session continuity
    README.md              ← Template: your app's README
    TODO.md                ← Template: feature backlog (reorganize by brand pillars in Phase 6)
    IDEAS.md               ← Template: parking lot for future ideas
    TECHNICAL_REFERENCE.md ← Template: API routes, data model, integrations
    DESIGN_SYSTEM.md       ← Template: visual language, layout, accessibility
    SPEC_UI_CHROME_NAV_TEMPLATE.md ← Optional: copy to app docs when nav/flyout/chrome rules solidify
    BRAND_AND_PRODUCT.md   ← Template: positioning, voice, messaging
    BUSINESS_PLAN.md       ← Template: pricing, metrics, growth strategy
    CODE_QUALITY.md        ← Template: engineering quality audit
    BLACK_HAT_REPORT.md    ← Template: security vulnerability audit
    DEPLOYMENT.md          ← Template: production deployment guide
    TEST_PLAN.md           ← Template: manual test walkthrough
    AUTOMATED_TESTING.md   ← Optional: automated test strategy (pairs with TEST_PLAN)
    DEV_ESTIMATE.md        ← Template: dev cost/effort (inventory methodology + hours × US rates)
    MARKETING_GROWTH.md    ← Template: post-launch growth playbook
    BUGS.md                ← Template: bug intake and triage
  prompts/
    black-hat-audit.md           ← Security audit (11 areas)
    pre-launch-audit.md          ← Production readiness checklist
    panel-usability-audit.md     ← Deep UX audit of a single panel/surface
    ux-cohesion-audit.md         ← Whole-app cross-cutting UX read (confuse/block/distract/delight)
    docs-alignment-audit.md      ← Cross-doc consistency checker
    brand-copy-edit-pass.md      ← Editorial pass for brand copy
    cialdini-marketing-audit.md  ← Conversion optimization via influence principles
    competitor-deep-dive.md      ← Structured competitive analysis
    landing-page-rewrite.md      ← Rewrite landing page from brand doc
    personal-beta-outreach.md    ← Generate a personal outreach playbook for beta launch
    user-facing-content-sync-audit.md ← Periodic sync of all discovery surfaces with shipped features
    microcopy-centralization.md      ← Phased inline→module migration; export/inline/duplication audits
    propagate-to-forgekit.md     ← Sync lessons back into ForgeKit templates
    product-feedback-to-spec.md  ← Turn raw user feedback into an implementation spec
  mcp-server/              ← MCP server source (see mcp-server/README.md)
```

## Doc templates

Each template in `docs/` contains `[BRACKETED]` placeholders and **blockquote callouts** with lessons learned from production development. Three callout types:

- 💡 **Lesson learned** — Hard-won implementation wisdom (what works, what doesn't, and why)
- 📝 **Example** — Concrete samples showing how a real project filled in a section
- 🔧 **Guidance** — Instructions for how to fill in a section

The MCP server can serve templates in **shell** mode (callouts stripped, structure only) or **full** mode (everything). See [mcp-server/TEMPLATE_STRIPPING.md](mcp-server/TEMPLATE_STRIPPING.md).

Templates cover architecture, business strategy, security, design systems, deployment, marketing, and more. The lessons are most directly applicable to SvelteKit + PocketBase + Claude but the methodology is **stack-agnostic**.

## Prerequisites

- **For MCP mode:** Node.js and npm (to run the MCP server). Compatible with Cursor, Claude Desktop, Claude Code, Windsurf, and any MCP-compatible agent.
- **For template-in-repo / Lite greenfield:** **Git**, **Node.js 20+** (LTS from [nodejs.org](https://nodejs.org/)), **npm** (bundled with Node), and **pnpm** (via corepack or `npm install -g pnpm`) — §4.1 preflight before Phase 1 file work. **Phase 2** adds stack-specific checks (PocketBase, Ollama, Playwright, native compilers, API keys) per [FORGEKIT_LITE.md](mcp-server/content/FORGEKIT_LITE.md) §4.1.2.
- **For template-in-repo mode:** Any AI coding agent that can read files from disk (Claude, GPT, etc.).
- **With gstack (optional):** If you have [gstack](https://github.com/garrytan/gstack) installed, ForgeKit uses its skills for sprint execution and QA. See "Using ForgeKit with gstack" above and WORKFLOW.md §1b.
- **Stack:** ForgeKit is stack-agnostic. The embedded lessons lean toward SvelteKit, PocketBase, Tailwind, and common LLM providers (Anthropic, OpenAI, **local Ollama**), but the phases, templates, and methodology work with any stack.

## Origin

ForgeKit was extracted from building [Exec Foundry](https://execfoundry.com), an AI-powered job search tool built with SvelteKit, PocketBase, and Anthropic's Claude. The methodology emerged from 7 sessions and ~78,000 lines of real development.

Built by [Catalyst Forge](https://catalystforge.com).

## License and support

ForgeKit is licensed under **Apache License 2.0**. See [LICENSE](LICENSE).

**Support:** community best-effort via GitHub issues and contributions — no SLA or paid support bundled with the license. See [CONTRIBUTING.md](CONTRIBUTING.md).
