# ForgeTrail

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

**Forge the path. Keep the trail.**

A persistent development system for building software with AI agents.

**ForgeTrail** gives solo developers (and small teams) a 7-phase playbook so agents plan before they build, keep the trail of decisions across sessions, and leave structured knowledge that improves the next project.

**Who it is for:** builders using Cursor, Claude Code, Codex, or similar agents who want structure without a heavyweight process.

**Why it works:** phases with exit criteria, a live `.forgetrail/workflow_tracking.json`, and templates pre-loaded with production lessons. Each project leaves a trail of decisions, gotchas, and breadcrumbs that future work can follow.

**Try it now (no MCP):** [TRY_FORGETRAIL.md](TRY_FORGETRAIL.md): write a `docs/GENESIS.md` in any AI chat, drop in ForgeTrail Lite, paste one kickoff line into your coding agent.

Site: [forgetrail.dev](https://forgetrail.dev). Open source under [Apache License 2.0](LICENSE). Distilled from [Exec Foundry](https://execfoundry.com) and refined across about a dozen further projects. Built by [Catalyst Forge](https://catalystforge.com).

---

## Quickstart (ranked)

### 1. Try (no MCP): start here

Follow **[TRY_FORGETRAIL.md](TRY_FORGETRAIL.md)** (~15 minutes of setup, plus time to iterate your spec):

1. Paste the [Genesis prompt](content/GENESIS_SPEC_PROMPT.md) into ChatGPT, Claude, Grok, or a local Ollama UI.
2. Save the result as `docs/GENESIS.md` in a **new empty project folder**.
3. Add [ForgeTrail Lite](content/FORGETRAIL_LITE.md) as `.forgetrail/FORGETRAIL_LITE.md` (or `forgetrail install --lite --with-genesis-stub` if you already have the CLI).
4. Paste the kickoff line from TRY_FORGETRAIL.md into your coding agent. Approve the Phase 1 brief before any scaffold.

Optional shape reference (fiction): [Mars habitat duty roster](content/examples/GENESIS_SAMPLE_mars-habitat-roster.md).

Stuck? Use the [Try ForgeTrail checklist](https://github.com/Catalyst-Forge-LLC/forge-kit/issues/new?template=try-forgetrail-checklist.md) issue template.

### 2. MCP (Cursor / Claude power users)

When you have cloned this repo and want always-current tools in the IDE:

```bash
pnpm run mcp:build              # or: forgetrail mcp build (prints Cursor MCP config)
pnpm run mcp:status -- --ping   # static checks + live ping
```

See [mcp-server/README.md](mcp-server/README.md). First chat: *"Call `getNewProjectKickoff` and set up the project."* Resume later with *"Call `getResumeSessionInstructions`."*

### 3. Full / vendored methodology

Need the whole template tree on disk (offline, no MCP):

```bash
# One-time from this clone:
pnpm run link:global            # registers `forgetrail` on PATH

cd /path/to/your-app
forgetrail install --lite --with-genesis-stub   # Lite + docs/GENESIS.md stub
forgetrail install                              # full _forgetrail/ + tracking
```

Or copy this repo into your project as `_forgetrail/` and use [INITIAL_PROMPT.md](INITIAL_PROMPT.md). Without global install: `node /path/to/forgetrail/scripts/forgetrail-cli.mjs install --lite`.

**Graduation:** Try → stay on Lite for small tools → add MCP when you live in Cursor with this clone → full `_forgetrail/` only when you need vendored templates. Details in [TRY_FORGETRAIL.md](TRY_FORGETRAIL.md).

---

## The 7 phases (short)

| Phase | Name | What happens |
| ----- | ---- | ------------ |
| 1 | **Plan** | Lock architecture in `PHASE_1_BRIEF.md` before code |
| 2 | **Build** | Full runnable spine in one pass |
| 3 | **Stabilize** | Env, paths, auth: make the foundation solid |
| 4 | **Iterate** | Feature by feature with real data |
| 5 | **Refine** | Systematic cleanup before complexity owns you |
| 6 | **Align** | Cut what does not serve the product vision |
| 7 | **Harden** | Security, performance, production docs |

Phases 4 and 5 often alternate. Full playbooks: [WORKFLOW.md](WORKFLOW.md). Docs arrive progressively (brief first; no empty boilerplate day one).

---

## Why ForgeTrail

Most AI chats forget. ForgeTrail keeps **phase state**, **decisions**, and **gotchas** in the repo, and leaves a trail of lessons the next build can follow via [prompts/propagate-to-forgetrail.md](prompts/propagate-to-forgetrail.md) ([update-log.md](update-log.md)).

| Framework | Core idea | Where ForgeTrail differs |
|-----------|-----------|------------------------|
| **GitHub Spec Kit** | Gated specify → plan → tasks | Templates arrive **pre-loaded with production lessons** and keep absorbing new ones |
| **BMAD-Method** | Many agent personas | One developer + one agent; invests in **lifecycle memory**, not persona breadth |
| **OpenSpec** | Change deltas in an existing repo | Complementary: OpenSpec for changes; ForgeTrail for the **whole product lifecycle** |
| **Per-project retros** | Lessons in one repo's instruction file | ForgeTrail propagation is **cross-project** |

ForgeTrail earns its weight when you build **repeatedly**. For a single gated change, Spec Kit or OpenSpec may be enough.

---

## How to use it (deeper)

### MCP details

The MCP server exposes methodology to Cursor, Claude Desktop, Claude Code, Windsurf, and other MCP clients without copying ForgeTrail into the app repo.

1. Enable the server ([mcp-server/README.md](mcp-server/README.md)).
2. Call `getNewProjectKickoff` (or use Genesis + `ingestPlanArtifact` if you already have `docs/GENESIS.md`).
3. In Phase 1, use `getGreenfieldIntakePrompt` with `getChecklist(before-session-1)` for exports, tenancy, compliance, and hero flow.
4. Your app repo keeps **your code**, **your docs**, and **`.forgetrail/workflow_tracking.json`**.

### Template-in-repo

1. Copy this folder as `_forgetrail/` (or keep it as a sibling and adjust paths in `INITIAL_PROMPT.md`).
2. Paste `INITIAL_PROMPT.md` into the first agent chat; fill bracketed placeholders.
3. Resume later with `CONTINUATION_PROMPT.md`.

### Optional patterns (when your brief needs them)

- **Seed / fixture JSON from any LLM:** [FORGETRAIL_LITE.md](content/FORGETRAIL_LITE.md) §4.3; also WORKFLOW.md Phase 2.
- **Live web search (Tavily, Brave, …):** [FORGETRAIL_LITE.md](content/FORGETRAIL_LITE.md) §4.4.
- **LLM-backed content (runtime / build-time / BYO-LLM):** [FORGETRAIL_LITE.md](content/FORGETRAIL_LITE.md) §7.1; local Ollama: §4.8 and [SYSTEM_HEALTH_CHECKS.md](content/SYSTEM_HEALTH_CHECKS.md).
- **URL import / markup drift:** Lite §7.2; [docs/TECHNICAL_REFERENCE.md](docs/TECHNICAL_REFERENCE.md).
- **Web app state: local vs accounts:** Lite §7 (A-local vs A-persistent).
- **Local PocketBase:** port in `.env`; version at install ([ONE_CLICK_DEV_SETUP.md](content/ONE_CLICK_DEV_SETUP.md)).
- **gstack:** ForgeTrail owns lifecycle; gstack owns sprint skills. WORKFLOW.md §1b.
- **Propagate lessons back:** [prompts/propagate-to-forgetrail.md](prompts/propagate-to-forgetrail.md); wrap protocol in WORKFLOW.md §1e.

---

## What your project looks like

After Phase 2, a typical app repo:

```
my-app/
  .forgetrail/
    workflow_tracking.json   ← Live progress (AI-updated)
    FORGETRAIL_LITE.md         ← If you used the Try / Lite path
    IDEAS.md
  CONTEXT_PROMPT.md
  docs/
    GENESIS.md               ← Optional pre-Phase-1 "what, not how" spec
    PHASE_1_BRIEF.md
  README.md
  TODO.md
  src/
```

Later phases add docs only when needed (`TECHNICAL_REFERENCE`, `DESIGN_SYSTEM`, `BRAND_AND_PRODUCT`, hardening docs, …).

---

## What's in the box

```
forge-kit/                   ← clone folder; product name is ForgeTrail
  TRY_FORGETRAIL.md          ← Human prove-it path (start here)
  WORKFLOW.md              ← 7-phase lifecycle
  INITIAL_PROMPT.md        ← Starter prompt (MCP + local)
  CONTINUATION_PROMPT.md   ← Resume prompt
  TRACKING_SCHEMA.md
  update-log.md
  content/
    GENESIS_SPEC_PROMPT.md ← Paste into any LLM chat
    FORGETRAIL_LITE.md       ← Portable single-file protocol
    examples/              ← Sample Genesis (Mars roster, fiction)
  docs/                    ← Phase templates (brief, SPEC_FEATURE_TEMPLATE, audits, …)
  prompts/                 ← Audits, marketing, propagate-to-forgetrail, …
  mcp-server/              ← MCP server (see mcp-server/README.md)
  specs/                   ← ForgeTrail meta-specs (including NUX)
```

Doc templates use `[BRACKETED]` placeholders and callouts (💡 lesson, 📝 example, 🔧 guidance). MCP can serve **shell** or **full** mode: [mcp-server/TEMPLATE_STRIPPING.md](mcp-server/TEMPLATE_STRIPPING.md). Methodology is **stack-agnostic**; embedded lessons lean SvelteKit + PocketBase + common LLM providers (including local Ollama).

---

## Prerequisites

- **Try path:** any LLM chat + any file-reading coding agent. No Node/MCP required to start.
- **MCP:** Node.js to run the server; Cursor, Claude Desktop, Claude Code, Windsurf, or other MCP clients.
- **Lite / full greenfield (when the agent scaffolds):** Git, Node.js 20+, npm, pnpm (Lite §4.1). Phase 2 adds stack-specific checks (PocketBase, Ollama, Playwright, …) per [FORGETRAIL_LITE.md](content/FORGETRAIL_LITE.md) §4.1.2.
- **gstack (optional):** [gstack](https://github.com/garrytan/gstack) for sprint skills inside ForgeTrail phases.

---

## License and support

**Apache License 2.0.** See [LICENSE](LICENSE). Contribute via [CONTRIBUTING.md](CONTRIBUTING.md). Security: [SECURITY.md](SECURITY.md).

**Support:** community best-effort via GitHub issues (including the [Try checklist](https://github.com/Catalyst-Forge-LLC/forge-kit/issues/new?template=try-forgetrail-checklist.md)). No SLA or paid support bundled with the license.
