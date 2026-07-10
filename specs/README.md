# Specs in the ForgeKit repo

This folder holds **ForgeKit methodology and meta-documentation** — not customer app feature specs (those live in each product repo's `specs/` per WORKFLOW.md).

## Folder layout

| Path | Purpose |
|------|---------|
| `specs/` | Draft proposals and not-yet-started feature specs for ForgeKit itself |
| `specs/partial/` | In-flight implementation specs (work started, not all criteria met) |
| `specs/completed/` | Fully implemented specs with an implementation summary |
| `specs/canonical/` | Living reference documents — methodology, evolution plans, archived strategy notes |

Canonical docs use `**Spec kind:** Canonical reference` in the header and track **catalog/evolution state**, not a delivery lifecycle. They stay in `canonical/` and evolve over time.

## Draft proposals (not started)

| Document | Summary |
|----------|---------|
| `forgekit-new-user-experience.md` | NUX / README front door — Genesis + Lite as the prove-it path; ranked Quickstart; graduation ladder |

## Canonical references (current)

| Document | Summary |
|----------|---------|
| `canonical/forgekit-modern-agents-evolution.md` | Modern agent integration (Grok, subagents, skills, MCP evolution) |
| `canonical/forgekit-prelaunch-review.md` | Pre-adoption kit review (implemented 2026-06-01) |
| `canonical/forgekit-as-product.md` | Archived paid-product draft — OSS is the shipping model |

For the full spec lifecycle model (draft → partial → completed vs canonical), see **WORKFLOW.md** §2 (Per-Phase Playbook, spec lifecycle folders).
