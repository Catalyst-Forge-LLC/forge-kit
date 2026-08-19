# Resume ForgeTrail (this repo)

Use this file after a folder rename or a new chat. Do **not** use `INITIAL_PROMPT.md` or `CONTINUATION_PROMPT.md` here. Those start or resume **app** projects that adopt ForgeTrail.

**Paste this into a new chat:**

> Read `RESUME.md`, `docs/FORGETRAIL_RENAME.md`, `specs/partial/forgetrail-rename.md`, and `TODO.md`. Continue the ForgeTrail naming pass from remaining items. Do not restart the rename.

---

## Where we are (2026-08-19)

The product is **ForgeTrail** (domain: forgetrail.dev, registered, not live yet). Tagline: **Forge the path. Keep the trail.** Category line: **A persistent development system for building software with AI agents.** Copy rules: `docs/FORGETRAIL_RENAME.md`.

This repo and sibling consumers were renamed (CLI `forgetrail`, `.forgetrail/`, Lite `FORGETRAIL_LITE.md` v2.0.0, MCP tools `getForgeTrail*`, env `FORGETRAIL_*`). Local clone is `Z:/workspace/forgetrail`. `.cursor/mcp.json` points at that path.

The marketing site lives in **`site/`** (FilePress + Wrangler, same pattern as IngotVault). Preview: `pnpm site:dev`. First ship: `pnpm --dir site exec wrangler login`, create Pages project `forgetrail` if needed, then `pnpm ship`. Attach the custom domain in Cloudflare after that.

## Remaining

- GitHub repo rename and redirects (`Catalyst-Forge-LLC/forge-kit` → `forgetrail`).
- `pnpm ship` + attach forgetrail.dev (Pages project and DNS not live yet).
- anticonfab: contents renamed; Windows lock left the folder as `.forgekit/`. Retry when nothing has it open.
- After the slug change: update consumer repos that still pin `forge-kit` paths.
- npm publish under `forgetrail` (if/when public).

## Do not

- Re-run a full ForgeKit → ForgeTrail string replace.
- Use `INITIAL_PROMPT.md` or `CONTINUATION_PROMPT.md` as the kickoff for this methodology repo.
- Put the marketing site in a sibling `forgetrail-site` folder. It belongs in `site/`.
