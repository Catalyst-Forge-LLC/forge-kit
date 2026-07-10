# ForgeKit MCP Server

A local MCP server that exposes the ForgeKit methodology to any MCP-compatible AI agent — Cursor, Claude Desktop, Claude Code, Windsurf, etc.

## Setup

**No MCP yet?** Prove ForgeKit with Genesis + Lite first: see repo-root **[TRY_FORGEKIT.md](../TRY_FORGEKIT.md)**.

From the **forge-kit repo root** (MCP path):

```bash
pnpm run mcp:build              # install deps + compile dist/ + print Cursor MCP config
pnpm run mcp:status             # dist/, content/, Cursor mcp.json
pnpm run mcp:ping               # live JSON-RPC ping tool call
forgekit mcp cursor-config      # reprint .cursor/mcp.json template
```

Or manually:

```bash
cd mcp-server
pnpm install
pnpm run build
```

If the app already has **`docs/GENESIS.md`**, after MCP is connected call **`ingestPlanArtifact`** (or tell the agent to) before locking Phase 1. To draft a Genesis file, call **`getGenesisSpecPrompt`** or follow TRY_FORGEKIT.md.

## Tools exposed

| Tool | Description |
|---|---|
| `ping` | **Connectivity check:** returns `ok`, package version, `FORGEKIT_ROOT`, and whether `WORKFLOW.md` is readable — use to verify the client reaches ForgeKit |
| `getNewProjectKickoff` | **One-call greenfield setup:** bootstrap + starter `.forgekit/workflow_tracking.json` + post-bootstrap user-message guidance + optional Cursor rule (`includeCursorRule: false` if not using Cursor) |
| `kickoffGreenfield` | Same as `getNewProjectKickoff` with Cursor rule included; **no parameters** (use if the client mishandles optional args) |
| `kickoffGreenfieldNoCursor` | Same bundle **without** the Cursor `.mdc` section; **no parameters** |
| `getProgressiveDocSchedule` | WORKFLOW §1a: Phase 1 = PHASE_1_BRIEF + tracking; Phase 2 = merge brief → CONTEXT_PROMPT + README + TODO + IDEAS + spine; rest later |
| `getNewProjectBootstrap` | **MCP-first onboarding:** same as kickoff bundle’s methodology section alone; maps phases to MCP tools |
| `getForgeKitLite` | **Portable Lite protocol:** full `FORGEKIT_LITE.md` for drop-in / paste bootstrap (no MCP required in the app repo) |
| `getForgeKitLiteUpdates` | Starter `.forgekit/FORGEKIT_LITE_UPDATES.md` for local Lite protocol feedback (§1.6) |
| `getGenesisSpecPrompt` | **Pre-Phase-1:** copy-paste prompt for an external LLM chat; save as **`docs/GENESIS.md`**. Humans: **TRY_FORGEKIT.md**. Feed into `ingestPlanArtifact` |
| `getGreenfieldIntakePrompt` | **Phase 1:** exports (PDF/DOCX/PPTX, etc.), tenancy, hybrid vs full spec, compliance, hero flow — complements `getChecklist(before-session-1)` |
| `getForgeKitCursorPhaseRule` | **Cursor:** optional `.cursor/rules/forgekit-phase-status.mdc` — agents show phase / next actions from `.forgekit/workflow_tracking.json` |
| `getForgeKitCursorLessonsRules` | **Cursor:** `.cursor/rules/forgekit-lessons-gate.mdc` + `forgekit-lessons-mcp.mdc` — when to call `getAntiPatterns` / `searchLessons` before large work (also bundled in `getNewProjectKickoff`) |
| `getScaffoldInstallParams` | **Phase 2:** PocketBase (**latest** unless pinned), one-click launchers, **isolated** `test:pocketbase` / `setup:ollama` / `test:ollama` — **SYSTEM_HEALTH_CHECKS.md**, `scripts/*.mjs` |
| `getInitialWorkflowTracking` | Starter `.forgekit/workflow_tracking.json` text (exit criteria rewritten for MCP; write to `.forgekit/workflow_tracking.json`) |
| `getPostBootstrapUserMessage` | **After tracking exists:** how the first reply to the user should read—short; no tool/JSON dump |
| `getUserReplyFormat` | **Lists and choices:** numbers vs bullets vs letters when presenting options (matches Cursor `forgekit-phase-status.mdc`) |
| `getResumeSessionInstructions` | **MCP-first resume:** session-start steps when ForgeKit is only on MCP |
| `getPhaseGuidance` | Phase-specific guidance (1-7): entry/exit criteria, playbook, prompt patterns |
| `searchLessons` | Keyword search across the full lesson database (71+ lessons, anti-patterns, insights) |
| `getTemplate` | Doc template from `docs/*.md`. `mode: "shell"` strips 💡/📝/🔧 blockquote callouts (single source; no parallel files). `mode: "full"` returns the full file. Default: `FORGEKIT_TEMPLATE_DEFAULT_MODE` or `shell` — see [TEMPLATE_STRIPPING.md](./TEMPLATE_STRIPPING.md) |
| `runAudit` | Get a structured audit prompt (security, pre-launch, marketing, competitor, docs, copy) |
| `getChecklist` | Project checklist by milestone or in full |
| `getTrackingSchema` | The `workflow_tracking.json` schema reference (live file: `.forgekit/workflow_tracking.json`) |
| `getAntiPatterns` | All documented failure modes and how to avoid them |

## Environment

| Variable | Purpose |
|----------|---------|
| `FORGEKIT_ROOT` | Path to ForgeKit repo root if not next to `mcp-server/` |
| `FORGEKIT_TEMPLATE_DEFAULT_MODE` | `full` or `shell` — default when `getTemplate` omits `mode` (unset = `shell`) |
| `FORGEKIT_QUIET` | Set to `1` or `true` to hide the stderr startup banner (hints for Cursor / first prompts) |

On startup, the server prints a short **stderr** banner with agent prompt hints (client setup JSON is printed by **`pnpm run mcp:build`**). **Do not** log to stdout — MCP uses stdout only for JSON-RPC.

## Configure in Cursor

Add to your Cursor MCP settings (`.cursor/mcp.json` in the project root, or globally):

```json
{
  "mcpServers": {
    "forgekit": {
      "command": "node",
      "args": ["Z:/workspace/forge-kit/mcp-server/dist/index.js"],
      "env": {
        "FORGEKIT_ROOT": "Z:/workspace/forge-kit"
      }
    }
  }
}
```

Run `forgekit mcp cursor-config` from your clone for paths filled in automatically.

## Configure in Claude Desktop

Add to `claude_desktop_config.json` (on Windows: `%APPDATA%\Claude\claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "forgekit": {
      "command": "node",
      "args": ["Z:/workspace/forge-kit/mcp-server/dist/index.js"]
    }
  }
}
```

## Configure in Claude Code

```bash
claude mcp add forgekit node Z:/workspace/forge-kit/mcp-server/dist/index.js
```

## Custom ForgeKit location

If your ForgeKit repo lives somewhere other than the parent of `mcp-server/`, set `FORGEKIT_ROOT`:

```json
{
  "mcpServers": {
    "forgekit": {
      "command": "node",
      "args": ["Z:/workspace/forge-kit/mcp-server/dist/index.js"],
      "env": {
        "FORGEKIT_ROOT": "/path/to/your/forge-kit"
      }
    }
  }
}
```

## gstack compatibility

ForgeKit works alongside [gstack](https://github.com/garrytan/gstack) (Garry Tan's Claude Code slash-command skills). ForgeKit provides the lifecycle methodology and project memory; gstack provides sprint execution, browser testing, and deploy automation. The bootstrap and resume tools include gstack integration guidance when applicable. See WORKFLOW.md §1b for the full integration guide.

## Development

```bash
pnpm run dev    # runs via tsx (no build step)
pnpm run build  # compiles to dist/
pnpm start      # runs compiled version
```

## Testing

1. **Rebuild after changes:** `pnpm run mcp:build` (repo root) or `pnpm run build` in `mcp-server/` — Cursor loads `dist/index.js` from `mcp.json`.
2. **CLI ping (no Cursor):** `pnpm run mcp:ping` or `forgekit mcp ping` — spawns the server and calls the **`ping`** tool; expect JSON with `ok: true`, version, and `FORGEKIT_ROOT`.
3. **Full status:** `pnpm run mcp:status -- --ping` — static file checks, Cursor config review, and live ping.
4. **In Cursor:** Open **MCP** settings, confirm **forgekit** is green; use **agent/chat** with *“Call the ForgeKit `ping` tool”*. If `ping` returns version + `FORGEKIT_ROOT` + `WORKFLOW.md: readable`, the server and content paths are good.
5. **MCP Inspector:** `pnpm run mcp:inspector` or `forgekit mcp inspector` — browser UI to invoke **`ping`** without Cursor.

## Troubleshooting

| Symptom | What to check |
|--------|----------------|
| **Cursor shows ForgeKit connected (green) but the coding agent cannot invoke ForgeKit tools** | Cursor may expose only **some** MCP servers to the **agent/composer** tool bridge; the full server list in MCP settings can still differ. Try the same request in a chat mode that uses MCP tools directly, update Cursor, or use the **template-in-repo** path (`_forgekit/` + `INITIAL_PROMPT.md`) so methodology is on disk. You can also paste outputs from running the server tools via another MCP client (e.g. Claude Desktop) or copy content from this repo (`.forgekit/workflow_tracking.json`, `content/NEW_PROJECT_BOOTSTRAP.md`). |
| **Agent says it will “replicate” kickoff from the repo** | That is normal when MCP tools are not visible in **that** session. See **`content/KICKOFF_WITHOUT_MCP.md`** for the same file order as `getNewProjectKickoff`, or call **`ping`** where tools work to confirm **`forgekit-mcp` ≥ 0.2.1** (version/path check; `ping` does not replace **`tools/list`**). |
| **`getNewProjectKickoff` / `kickoffGreenfield` not found; agent falls back to reading files** | Call **`ping`**. If **`forgekit-mcp version`** is **below 0.2.1**, rebuild `mcp-server` (`pnpm run build`) and restart MCP / Cursor — older builds omitted the `server.tool("name", …)` name for kickoff/bootstrap. **`ping` text lists expected tool names but does not enumerate the live tool list**; if the version is new but the client still hides tools, it is a client/session bridge issue—see **`KICKOFF_WITHOUT_MCP.md`**. |
| **`NEW_PROJECT_BOOTSTRAP.md` / templates not found** | Set **`FORGEKIT_ROOT`** to your ForgeKit repo root in `mcp.json` `env` (see [Custom ForgeKit location](#custom-forgekit-location)). |
| **Server fails to start** | Run `pnpm install` and `pnpm run build` in `mcp-server/`; ensure **`args`** points at **`mcp-server/dist/index.js`** (not `src/`). |
| **Strange JSON-RPC errors** | Anything that writes to **stdout** besides MCP JSON-RPC breaks the protocol. The server logs hints to **stderr** only; do not wrap `node` in a script that prints to stdout. |

**Note:** Another MCP server showing **Errored** (e.g. `browsermcp`) does not mean ForgeKit failed; fix or disable the broken server separately.
