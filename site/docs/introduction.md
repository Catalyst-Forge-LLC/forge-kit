---
title: Introduction
---

**ForgeTrail** is a persistent development system for building software with AI agents.

**Forge the path. Keep the trail.**

Most AI coding sessions forget everything the moment you close the tab. ForgeTrail keeps the phase you are in, the decisions you made, and the gotchas you hit inside the repo, so the next session picks up the trail.

It is not a library, a SaaS, or a plugin. It is a methodology encoded into files your agent reads, follows, and updates as you build. Distilled from real production apps.

## The problem

AI writes code quickly. It does not build a product on its own.

- **Context evaporates between sessions.** Every new chat starts from zero. You spend the first twenty minutes re-explaining architecture, decisions, and what you already tried.
- **No structure, no momentum.** Features land in random order. Hardening gets skipped. Fragile code ships.
- **You manage the AI instead of building.** Prompt engineering, context stuffing, and copy-pasting file contents eat the productivity gains.
- **Decisions get lost and mistakes repeat.** You solved a hard bug in session 3. In session 6 the agent reintroduces it because it does not know the history.

## Two packages

| Package | Job |
| --- | --- |
| [`forgetrail`](https://www.npmjs.com/package/forgetrail) | CLI that writes Lite or the full template tree into an app folder |
| [`forgetrail-mcp`](https://www.npmjs.com/package/forgetrail-mcp) | MCP server for Cursor, Claude, and other clients |

Do not add `forgetrail` to an app's `dependencies`. The trail lives in the app's files.

## Two surfaces

| Surface | What it is |
| --- | --- |
| [forgetrail.dev](https://forgetrail.dev) | Product story: home, Try, About |
| [forgetrail.dev/docs](https://forgetrail.dev/docs) | This guide: install, CLI, MCP, phases |

GitHub remains the source of truth for methodology files.

## Next

- [Install](/docs/install) — npm, pnpm dlx, or a checkout
- [Try](/docs/try) — Genesis plus Lite, no MCP required
- [MCP](/docs/mcp) — always-current tools in the IDE
