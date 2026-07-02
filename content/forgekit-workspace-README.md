# Local ForgeKit workspace (`.forgekit/`)

This folder holds **ForgeKit agent artifacts** — tracking, platform rules, and (for Lite boots) the protocol file. ForgeKit upstream is **Apache 2.0**; you may commit this folder or **gitignore** it for a slimmer public app repo. Never commit secrets here.

Used for **both** ForgeKit Lite file bootstrap and **MCP greenfield** kickoff.

## Contents

| File | Purpose |
|------|---------|
| `workflow_tracking.json` | Phase / decisions / session tracking (all approaches) |
| `FORGEKIT_LITE.md` | Full Lite kickoff protocol (Lite file bootstrap only) |
| `FORGEKIT_LITE_UPDATES.md` | Optional local feedback log (§1.6) — merge accepted items upstream |
| `AGENTS.md` | Agent instructions — cite or symlink for your IDE |
| `CLAUDE.md` | Claude Code trailer override |
| `IDEAS.md` | Backlog parking lot |
| `cursor/rules/*.mdc` | Cursor rule snippets (no-trailer, updates-log, …) |

## Wire up Cursor (one-time)

From the **repo root**:

**Git Bash / WSL:**

```bash
mkdir -p .cursor/rules
ln -sf ../../.forgekit/cursor/rules/forgekit-no-trailer.mdc .cursor/rules/
ln -sf ../../.forgekit/cursor/rules/forgekit-updates-log.mdc .cursor/rules/
```

**Windows cmd (junction):**

```bat
mkdir .cursor\rules 2>nul
mklink .cursor\rules\forgekit-no-trailer.mdc ..\.forgekit\cursor\rules\forgekit-no-trailer.mdc
mklink .cursor\rules\forgekit-updates-log.mdc ..\.forgekit\cursor\rules\forgekit-updates-log.mdc
```

Optional: symlink `.forgekit/AGENTS.md` → `AGENTS.md` at repo root if a tool requires root placement (also gitignore root copies if you symlink).

## Recovering after clone

If `.forgekit/` was gitignored, it is not in git. Copy from upstream Catalyst Forge (`content/`) or restore from backup; MCP-only projects can recreate tracking via **`getInitialWorkflowTracking`**.
