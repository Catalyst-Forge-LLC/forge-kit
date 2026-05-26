## Instructions

I'm continuing work on [APP NAME]. You are following ForgeKit, a structured phase-based development workflow. Your job is to track progress and pause at phase transitions for my approval before advancing.

### MCP-first (no `_forgekit/` in this repo)

**Before doing anything else:**

1. Call ForgeKit MCP **`getResumeSessionInstructions`** and follow it.
2. Read **`.forgekit/workflow_tracking.json`**. If phase is **1-architecture**, read **`docs/PHASE_1_BRIEF.md`**. Otherwise read **`CONTEXT_PROMPT.md`** (if Phase 2+ but CONTEXT is missing and the brief exists, **merge the brief into CONTEXT** first per the CONTEXT_PROMPT template).
3. Use **`getPhaseGuidance`** for the current phase, **`getTrackingSchema`** when updating tracking, and other ForgeKit MCP tools as needed.

### Local `_forgekit/` folder

> **Path note:** ForgeKit files live in `_forgekit/` by default. If the folder is elsewhere (e.g., a sibling `forge-kit/` directory), adjust paths accordingly.

**Before doing anything else:**

1. Read **`.forgekit/workflow_tracking.json`** to see where we left off.
2. Read `_forgekit/WORKFLOW.md` for the full phase map, playbooks, and patterns.
3. Read `_forgekit/TRACKING_SCHEMA.md` to understand how to update the tracking file.
4. Read `CONTEXT_PROMPT.md` for the current architecture and project state — or **`docs/PHASE_1_BRIEF.md`** if still in Phase 1; if Phase 2+ and CONTEXT is empty but the brief exists, merge brief → CONTEXT first.

**Rules for this session:**

- When you believe a phase's exit criteria are met, tell me explicitly: "I think we've completed [Phase X]. The exit criteria are met because [reasons]. Ready to move to [Phase Y]?" Wait for my confirmation.
- After completing work, update **`.forgekit/workflow_tracking.json`** following the structure in `_forgekit/TRACKING_SCHEMA.md`: move satisfied exit criteria, add decisions to the `decisions` array (with rationale), log issues to the `gotchas` array, and add session notes.
- Keep `CONTEXT_PROMPT.md` updated as the source of truth for project architecture.
- If something isn't working after 5 turns, propose a fundamentally different approach rather than continuing to patch.

---

## Session Context

**Last session we completed:** _______________

**Today I want to focus on:** _______________

**Any new context or changes since last session:** _______________
