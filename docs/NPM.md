# Publishing ForgeTrail to npm

Maintainer steps. You run the actual `pnpm publish`. The gate does not log in or publish.

Two packages:

| Package | From | What it is |
| --- | --- | --- |
| `forgetrail` | repo root | CLI, Lite, templates. `npx forgetrail install --lite` |
| `forgetrail-mcp` | `mcp-server/` | MCP server bin. Set `FORGETRAIL_ROOT` or install `forgetrail` beside it |

Neither name is reserved as of 2026-08-19 (registry 404).

## Once

1. `pnpm login` (npm account that can publish unscoped public packages).
2. Confirm `pnpm whoami`.

## Every release

1. Bump versions in `package.json` and `mcp-server/package.json` if this is not the first publish of that number.
2. From the repo root:

```bash
pnpm run pack:check
pnpm publish --dry-run --access public
pnpm publish --access public
```

3. MCP package (builds `dist/` in `prepublishOnly`):

```bash
pnpm --dir mcp-server publish --dry-run --access public
pnpm --dir mcp-server publish --access public
```

`prepublishOnly` on the root runs the same pack check (builds the MCP server, refuses `private: true`, refuses a tarball that includes `site/` or `specs/`).

## After publish

```bash
npx forgetrail --help
npx forgetrail install --lite --dry-run
```

Optional Cursor MCP after a global install:

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

## Do not publish

- `site/` (FilePress marketing app)
- `specs/` (methodology-repo meta-specs)
- `.cursor/`
