---
title: Try ForgeTrail
description: Prove ForgeTrail in one sitting with a Genesis spec and ForgeTrail Lite. No MCP required.
order: 1
---

Prove ForgeTrail in one sitting: write a **what, not how** spec in any AI chat, drop it next to **ForgeTrail Lite**, and let your coding agent forge the path and keep the trail.

**You need:** any LLM chat (ChatGPT, Claude, Grok, a local Ollama UI) and any coding agent that can read files (Cursor, Claude Code, Codex).

**You do not need:** Node MCP setup, or `forgetrail` on PATH. Those are optional shortcuts.

**Important:** Use a **new empty project folder**. Do not run this inside a clone of the ForgeTrail methodology repo.

## 15-minute recipe

1. **Get the Genesis prompt**  
   Open [GENESIS_SPEC_PROMPT.md](https://github.com/Catalyst-Forge-LLC/forgetrail/blob/main/content/GENESIS_SPEC_PROMPT.md). Copy the **Copy-paste prompt** section.

2. **Iterate a spec in your favorite chat app**  
   Fill the bracketed parts, send it, and refine until you trust the markdown. Optional shape reference: [Mars habitat duty roster](https://github.com/Catalyst-Forge-LLC/forgetrail/blob/main/content/examples/GENESIS_SAMPLE_mars-habitat-roster.md) (fiction).

3. **Create a new project folder**  
   Example: `mkdir my-app && cd my-app`

4. **Add ForgeTrail Lite**  
   Save [FORGETRAIL_LITE.md](https://github.com/Catalyst-Forge-LLC/forgetrail/blob/main/content/FORGETRAIL_LITE.md) as `.forgetrail/FORGETRAIL_LITE.md` in your project.  
   If you have Node 20+: `npx forgetrail install --lite` (add `--with-genesis-stub` if you want a `docs/GENESIS.md` stub).

5. **Save your spec as `docs/GENESIS.md`**  
   Create `docs/` if needed. That path is the canonical handoff (not the repo root).

6. **Open the folder in your coding agent** and paste this kickoff line:

> Follow `.forgetrail/FORGETRAIL_LITE.md` as the project protocol. Treat `docs/GENESIS.md` as the product spec (what, not how). Create `.forgetrail/workflow_tracking.json` and draft `docs/PHASE_1_BRIEF.md` from the Genesis file, asking me only about gaps. Do not scaffold application code until I explicitly approve the Phase 1 brief.

7. **Approve the Phase 1 brief** before any app scaffold. If the agent starts writing application code early, stop it and paste the kickoff line again.

## What “it worked” looks like

- `.forgetrail/FORGETRAIL_LITE.md` is present
- `docs/GENESIS.md` is present
- `.forgetrail/workflow_tracking.json` exists
- `docs/PHASE_1_BRIEF.md` drafted from your Genesis (or clearly in progress)
- The agent asked for approval before scaffolding

Stuck? Open a [Try ForgeTrail checklist](https://github.com/Catalyst-Forge-LLC/forgetrail/issues/new?template=try-forgetrail-checklist.md) issue and mark how far you got.

## MCP (optional, later)

When you want always-current tools in the IDE, register `npx -y forgetrail-mcp` (see [MCP setup](https://github.com/Catalyst-Forge-LLC/forgetrail/blob/main/mcp-server/README.md)). First chat: *Call `getNewProjectKickoff` and set up the project.*
