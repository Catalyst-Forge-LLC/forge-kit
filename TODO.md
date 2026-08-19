# ForgeTrail backlog

Methodology-repo work. App projects keep their own `TODO.md`. After a folder rename or new chat, start from **[RESUME.md](RESUME.md)** (not `INITIAL_PROMPT.md`).

- [ ] [ForgeTrail naming pass](specs/partial/forgetrail-rename.md): GitHub slug is `Catalyst-Forge-LLC/forgetrail`. Remaining: first Wrangler ship + forgetrail.dev DNS
- [ ] [forgetrail.dev FilePress site](site/README.md): `site/` scaffolded (IngotVault `/site` pattern). Domain registered. Pages project and custom domain not live yet. Preview with `pnpm site:dev`; publish with `pnpm ship`.
- [ ] [npm publish](docs/NPM.md): packages are ready (`forgetrail` 0.3.0, `forgetrail-mcp` 0.2.2). Run `pnpm run pack:check`, then `pnpm publish --access public` and `pnpm --dir mcp-server publish --access public`.
