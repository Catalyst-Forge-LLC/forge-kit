# forgetrail.dev

Marketing + notes site for [ForgeTrail](https://github.com/Catalyst-Forge-LLC/forge-kit), built with [FilePress](https://getfilepress.com) ([`getfilepress`](https://www.npmjs.com/package/getfilepress) on npm). Same `/site` pattern as IngotVault.

```bash
# from the ForgeTrail repo root
pnpm site:dev     # local preview
pnpm site:build   # → site/build/

# or from this folder
pnpm install
pnpm dev
pnpm build
```

Optional: edit `theme.css` next to `filepress.config.ts`.

## Deploy (Cloudflare Pages)

The domain is registered. The Pages project and custom-domain DNS are not live yet.

**Use one pipeline only.** Dual deploys overwrite each other when asset hashes disagree.

```bash
pnpm ship
# = pnpm --dir site run ship
# = pnpm build && wrangler pages deploy build --project-name=forgetrail
```

First time on this machine:

1. `pnpm --dir site exec wrangler login`
2. `pnpm --dir site exec wrangler pages project create forgetrail` (if the project does not exist)
3. `pnpm ship` (publishes to `forgetrail.pages.dev`)
4. Attach **forgetrail.dev** in the Cloudflare dashboard and point the registrar at Cloudflare

### Git-connected Pages

| Setting | Value |
| --- | --- |
| Root directory | `site` |
| Build command | `pnpm install && pnpm build` |
| Output directory | `build` |

Dependency is the public npm package:

```json
"getfilepress": "^0.1.4"
```

## Content sync

**Site** = product narrative (home, Try, How it works, About, posts). **Root README** = methodology / CLI / MCP reference. Keep the tagline, category line, and try-path steps aligned. When behavior changes, update root README + `TRY_FORGETRAIL.md` + `site/pages/*`.
