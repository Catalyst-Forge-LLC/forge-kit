# ForgeTrail naming pass — delivery spec

**Spec kind:** Delivery  
**Status:** Partial; naming pass landed. GitHub slug is `forgetrail`. Remaining: anticonfab folder lock if any, first Wrangler ship + DNS  
**Date:** 2026-08-15  
**Related:** [TODO.md](../TODO.md), [docs/FORGETRAIL_RENAME.md](../docs/FORGETRAIL_RENAME.md)  
**Surfaces:** docs, README, Lite, MCP, CLI, Cursor rules, sibling consumer repos

---

## 1. Problem

The product is now **ForgeTrail** (domain: forgetrail.dev). The repo, CLI, MCP tools, workspace folder, and consumer projects still said **ForgeKit**. Mixed names confuse first-time readers and break the trail metaphor in copy.

## 2. Goals

1. Record the naming rationale and copy rules in `docs/FORGETRAIL_RENAME.md`.
2. Rename user-facing and mechanical identifiers in this repo to ForgeTrail / forgetrail.
3. Improve hero and positioning copy so "trail" reads as a development system, not a tracker.
4. Update sibling workspace projects that use or depend on the methodology.

### Non-goals

- ~~Renaming the GitHub repo slug `Catalyst-Forge-LLC/forge-kit`~~ Done 2026-08-19 (`Catalyst-Forge-LLC/forgetrail`; old URL redirects).
- Renaming the local clone folder `forgetrail`.
- DNS, SSL, or landing-page hosting for forgetrail.dev.
- Logo / OG image regeneration.
- Compatibility aliases for old MCP tool names (pre-1.0; clean cut).

## 3. Proposed behavior

Follow the identifier map and copy principles in `docs/FORGETRAIL_RENAME.md`.

- Product name: **ForgeTrail**. Tagline: **Forge the path. Keep the trail.**
- Category line on first contact: **A persistent development system for building software with AI agents.**
- Workspace: `.forgetrail/`. Vendored tree: `_forgetrail/`.
- CLI / packages / MCP key: `forgetrail`.
- Lite and progress files: `FORGETRAIL_LITE.md`, `FORGETRAIL_PROGRESS.md`.
- MCP tools: `getForgeTrail*` (was `getForgeKit*`).
- Env: `FORGETRAIL_ROOT`, `FORGETRAIL_TARGET`, `FORGETRAIL_TEMPLATE_DEFAULT_MODE`.

## 8. Acceptance criteria

- [x] Rename guide exists and does not list sibling product brands.
- [x] Grep of this repo for the old product name is clean except GitHub slug, local folder path, the rename script, and explicit former-name provenance.
- [x] README and Lite open with category + trail language from the guide.
- [x] Sibling consumer repos that used the old workspace or copy are updated and committed.

### Progress (2026-08-15)

- Identifiers and copy in this repo now use ForgeTrail / forgetrail.
- Lite bumped to v2.0.0 (breaking workspace path `.forgetrail/`).
- Sibling consumers updated (aegis, curator, deal-dashboard, engram, filepress, first-shift, gui4cli, nerdy, temper-pass, exec-foundry, catalyst-forge, and others).
- **anticonfab:** file contents and rule names updated; Windows file lock blocked renaming `.forgekit/` to `.forgetrail/`. Retry when nothing has that folder open.

### Progress (2026-08-19)

- Marketing site lives in **`site/`** (FilePress + Wrangler, IngotVault `/site` pattern). Domain registered; Pages project and DNS not live yet.
- GitHub slug renamed to **`Catalyst-Forge-LLC/forgetrail`**. Public links updated.
- anticonfab workspace folder renamed `.forgekit/` → `.forgetrail/`.

## 9. Out of scope / follow-ups

- ~~GitHub repository rename and URL redirects.~~ Done (`Catalyst-Forge-LLC/forgetrail`).
- forgetrail.dev first Wrangler ship and custom-domain DNS (FilePress site lives in `site/`).
- npm publish under `forgetrail` / `forgetrail-mcp` (packages are public-ready; you run `pnpm publish`). See [docs/NPM.md](../../docs/NPM.md).
- ~~anticonfab `.forgekit/` directory rename.~~ Done 2026-08-19 (`.forgetrail/`).
