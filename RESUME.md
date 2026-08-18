# Resume ForgeTrail (this repo)

Use this file after a folder rename or a new chat. Do **not** use `INITIAL_PROMPT.md` or `CONTINUATION_PROMPT.md` here. Those start or resume **app** projects that adopt ForgeTrail.

**Paste this into a new chat:**

> Read `RESUME.md`, `docs/FORGETRAIL_RENAME.md`, `specs/partial/forgetrail-rename.md`, and `TODO.md`. Continue the ForgeTrail naming pass from remaining items. Do not restart the rename.

---

## Where we are (2026-08-15)

The product is **ForgeTrail** (domain: forgetrail.dev). Tagline: **Forge the path. Keep the trail.** Category line: **A persistent development system for building software with AI agents.** Copy rules: `docs/FORGETRAIL_RENAME.md`.

This repo and sibling consumers were renamed (CLI `forgetrail`, `.forgetrail/`, Lite `FORGETRAIL_LITE.md` v2.0.0, MCP tools `getForgeTrail*`, env `FORGETRAIL_*`). GitHub slug is still `Catalyst-Forge-LLC/forge-kit`.

## After you rename the clone folder

1. Update **`.cursor/mcp.json`**: `args` and `FORGETRAIL_ROOT` must point at the new path (they still say `Z:/workspace/forge-kit`).
2. Reconnect the **forgetrail** MCP server in Cursor.
3. Rebuild if needed: `pnpm run mcp:build` from the new folder.

## Remaining

- GitHub repo rename and redirects (`Catalyst-Forge-LLC/forge-kit`).
- forgetrail.dev DNS / site.
- anticonfab: contents renamed; Windows lock left the folder as `.forgekit/`. Retry when nothing has it open.
- npm publish under `forgetrail` (if/when public).

## Do not

- Re-run a full ForgeKit → ForgeTrail string replace.
- Use `INITIAL_PROMPT.md` as the kickoff for this methodology repo.
