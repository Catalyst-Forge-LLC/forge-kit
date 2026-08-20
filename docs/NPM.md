# Publishing ForgeTrail to npm

You run `pnpm publish`. The gate does not log in or publish.

Two public unscoped packages:

| Package | Version | From | What it is |
| --- | --- | --- | --- |
| [`forgetrail`](https://www.npmjs.com/package/forgetrail) | 0.3.0 | repo root | CLI + Lite + templates. `npx forgetrail install --lite` |
| [`forgetrail-mcp`](https://www.npmjs.com/package/forgetrail-mcp) | 0.2.2 | `mcp-server/` | MCP bin. `npx -y forgetrail-mcp` |

These are **installer and MCP channels**, not a library. App repos should not add `forgetrail` to `dependencies`.

`pnpm run pack:check` already passed on this tree (2026-08-20). Root dry-run packed `forgetrail@0.3.0` (98 files, no `site/` or `specs/`).

---

## Once (this machine)

```bash
pnpm login
pnpm whoami
```

Use an npm account that can publish **unscoped** public packages.

---

## First publish (paste in order)

From the repo root, on `main`, **clean working tree** (pnpm refuses `publish` if git is dirty). Push first if you want the published tarball to match GitHub.

```bash
# 1. Gate (rebuilds mcp-server/dist)
pnpm run pack:check

# 2. CLI + methodology
pnpm publish --dry-run --access public
pnpm publish --access public

# 3. MCP server — cd in. Do not use `pnpm --dir mcp-server publish`.
# npm 12 treats leftover `--dir` tokens as extra package-specs and exits EUSAGE.
cd mcp-server
pnpm publish --access public
cd ..
```

`prepublishOnly` on the root re-runs the pack check. It refuses `private: true` and a tarball that includes `site/` or `specs/`.

The `Debugger listening` line on MCP `prepack` is Cursor attaching to a one-line `node -e`. It is harmless. Do not let it rewrite the publish command.

---

## After publish (verify)

```bash
# Prefer pnpm dlx. npm 12 `npx forgetrail --help` on Windows failed to spawn the bin.
pnpm dlx forgetrail@0.3.0 --help
pnpm dlx forgetrail@0.3.0 install --lite --dry-run

# MCP starts; needs content via FORGETRAIL_ROOT or a sibling forgetrail install
pnpm dlx forgetrail-mcp@0.2.2
```

Optional Cursor MCP (content from a `forgetrail` install, or set the path):

```json
{
  "mcpServers": {
    "forgetrail": {
      "command": "npx",
      "args": ["-y", "forgetrail-mcp"],
      "env": {
        "FORGETRAIL_ROOT": "/path/to/node_modules/forgetrail"
      }
    }
  }
}
```

If `forgetrail` is installed in the same tree, `forgetrail-mcp` finds `WORKFLOW.md` without `FORGETRAIL_ROOT`.

Registry pages to confirm:

- https://www.npmjs.com/package/forgetrail
- https://www.npmjs.com/package/forgetrail-mcp

---

## Later releases

1. Bump `version` in `package.json` and/or `mcp-server/package.json` (independent versions are OK).
2. Repeat the three publish blocks above.
3. GitHub `main` stays canonical. npm versions are snapshots.

---

## Do not publish

- `site/` (FilePress marketing app)
- `specs/` (methodology-repo meta-specs)
- `.cursor/`
