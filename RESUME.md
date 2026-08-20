# Resume ForgeTrail (this repo)

Use this file after a folder rename or a new chat. Do **not** use `INITIAL_PROMPT.md` or `CONTINUATION_PROMPT.md` here. Those start or resume **app** projects that adopt ForgeTrail.

**Paste this into a new chat:**

> Read `RESUME.md`, `docs/FORGETRAIL_RENAME.md`, `specs/partial/npm-distribution.md`, and `TODO.md`. Help finish npm publish if needed. Do not restart the rename.

---

## Where we are (2026-08-20)

The product is **ForgeTrail** (https://forgetrail.dev is live). Tagline: **Forge the path. Keep the trail.** Category line: **A persistent development system for building software with AI agents.** Copy rules: `docs/FORGETRAIL_RENAME.md`.

This repo and sibling consumers were renamed (CLI `forgetrail`, `.forgetrail/`, Lite `FORGETRAIL_LITE.md` v2.0.0, MCP tools `getForgeTrail*`, env `FORGETRAIL_*`). Local clone is `Z:/workspace/forgetrail`. `.cursor/mcp.json` points at that path.

GitHub slug is **`Catalyst-Forge-LLC/forgetrail`**. The old `forge-kit` URL redirects.

The marketing site lives in **`site/`**. Preview: `pnpm site:dev`. Redeploy: `pnpm ship`.

npm packages are **teed up**, not yet on the registry. You publish. See [docs/NPM.md](docs/NPM.md).

## Remaining

- Publish `forgetrail@0.3.0` and `forgetrail-mcp@0.2.2` ([docs/NPM.md](docs/NPM.md)). Then walk `npx forgetrail --help` (M3).
- Naming pass and first site ship are done ([specs/completed/forgetrail-rename.md](specs/completed/forgetrail-rename.md)).

## Do not

- Re-run a full ForgeKit → ForgeTrail string replace.
- Use `INITIAL_PROMPT.md` or `CONTINUATION_PROMPT.md` as the kickoff for this methodology repo.
- Put the marketing site in a sibling `forgetrail-site` folder. It belongs in `site/`.
- Tell app repos to add `forgetrail` as a runtime dependency.
