# ForgeTrail backlog

Methodology-repo work. App projects keep their own `TODO.md`. After a folder rename or a new chat, start from **[RESUME.md](RESUME.md)** (not `INITIAL_PROMPT.md`).

- [x] [ForgeTrail naming pass](specs/completed/forgetrail-rename.md): GitHub slug `Catalyst-Forge-LLC/forgetrail`. forgetrail.dev is live.
- [x] [forgetrail.dev FilePress site](site/README.md): live at https://forgetrail.dev. Preview: `pnpm site:dev`. Redeploy: `pnpm ship`.
- [ ] [npm distribution](specs/partial/npm-distribution.md): M2 copy is in. You publish M1 from [docs/NPM.md](docs/NPM.md): root `pnpm publish --access public`, then `cd mcp-server && pnpm publish --access public` (not `pnpm --dir`; npm 12 EUSAGE).
