# ForgeKit evolution for modern agent systems (Grok, subagents, skills, MCP)

**Spec kind:** Canonical reference

**Status:** Canonical; initial ideas captured 2026-06-15 during direct session with author using Grok Build. Living document — append proposals, experiments, and outcomes here rather than scattering across chat history.

**Scope:** Improvements and extensions to ForgeKit itself (methodology, tracking, MCP server, prompts/templates, documentation practices) to better leverage and integrate with powerful contemporary AI coding agents that support rich tool use, parallel subagents, structured plan modes, reusable skills, native MCP, and persistent session/todo state.

**Related artifacts:**
- `WORKFLOW.md` (especially § on specs lifecycle and gstack complementarity)
- `mcp-server/src/index.ts` and `mcp-server/content/`
- Existing meta-specs in this folder
- `TRACKING_SCHEMA.md`
- `prompts/propagate-to-forgekit.md`

---

## 1. Context and Motivation

ForgeKit has proven "extremely powerful, even if used partially" across multiple real projects for the author. Its core strengths — the 7-phase lifecycle with explicit exit criteria, the machine-readable `.forgekit/workflow_tracking.json` as cross-session state, progressive single-source templates, the rich lessons/anti-patterns database, and the MCP-first design that keeps methodology server-side — create durable discipline that general-purpose agents otherwise lack.

Modern agents (Grok Build, advanced Claude setups, Cursor with heavy agentic use, future systems) bring new primitives that ForgeKit can exploit rather than treat as black boxes:
- Native plan modes that map directly to Phase 1.
- First-class subagent spawning with isolation (worktrees), capability modes, personas, and background execution.
- Skills / prompt packages that can embed ForgeKit rules persistently (similar to but more structured than gstack slash commands).
- Strong MCP support (already the recommended path; see browsermcp precedent).
- Built-in todo tracking, session persistence, and structured artifacts (plan.md, etc.).
- Headless/automation modes + media/document generation capabilities.

The opportunity is to evolve ForgeKit from "excellent prompt + template + tracking system for file-reading agents" into "the canonical lifecycle + memory layer that supercharges the best agentic engines."

This spec catalogs concrete, prioritized ideas. Many can be implemented incrementally without breaking Lite or existing MCP clients.

---

## 2. High-Value Opportunity Areas

### 2.1 Plan Mode as Native Phase 1
Grok's `/plan` (or Shift+Tab to enter plan mode) + `enter_plan_mode` / `exit_plan_mode` tool + the generated `plan.md` inside the session directory is already a close structural match for Phase 1. It forces exploration before edits, produces a reviewable artifact, and gates on explicit user approval — exactly what ForgeKit Phase 1 demands before any code or heavy docs are produced.

**Problem today:** Agents often jump into scaffolding or require the user to paste "use plan mode" instructions manually. The approved plan is not automatically turned into the durable `docs/PHASE_1_BRIEF.md` + `decisions[]` entries that let Phase 2 start "cold."

**Detailed Implementation Approach**

1. **Guidance updates (low-risk, high-visibility)**
   - In `mcp-server/content/NEW_PROJECT_BOOTSTRAP.md` and the output of `getPhaseGuidance("1")`, add a prominent block:
     ```
     If your agent supports a native plan mode (Grok Build `/plan`, equivalent in other systems):
     1. Call `enter_plan_mode` (or equivalent) with a prompt that includes the greenfield intake questions from `getGreenfieldIntakePrompt`.
     2. Work inside the plan artifact until the architecture, stack decisions, state-persistence choice, content-generation pattern, and hero flow are locked.
     3. On user approval (`exit_plan_mode`), immediately:
        - Write `docs/PHASE_1_BRIEF.md` using `getTemplate({ name: "PHASE_1_BRIEF", mode: "full" })` as base.
        - Merge the approved plan content into the brief using the "Handoff from Phase 1" mapping in the CONTEXT_PROMPT template.
        - Log every major commitment as an entry in `.forgekit/workflow_tracking.json` → `decisions[]` (id, timestamp, phase: "1-architecture", decision, rationale, alternatives_considered).
     ```
   - Update `WORKFLOW.md` Phase 1 "What to ask the agent" section with a new subsection "Using Native Plan Modes".

2. **New or enhanced MCP tool**
   - Add `ingestPlanArtifact` (or extend `getPhaseGuidance` / add to `getNewProjectKickoff` response):
     ```ts
     server.tool(
       "ingestPlanArtifact",
       "Take the content of a native plan.md (or similar approved planning artifact) and produce a filled PHASE_1_BRIEF.md skeleton plus decision entries ready to write to .forgekit/workflow_tracking.json.",
       {
         planContent: z.string().describe("Full text of the approved plan.md or equivalent artifact"),
         projectName: z.string().optional(),
         existingBrief: z.string().optional().describe("Current PHASE_1_BRIEF.md if one exists for merging"),
       },
       async ({ planContent, projectName, existingBrief }) => {
         // Implementation: LLM-assisted or rule-based mapping to the brief template sections.
         // Return: { briefMarkdown: string, trackingDecisionsJson: string, instructions: string }
       }
     );
     ```
   - The handler can live in a new helper in `mcp-server/src/` (e.g. `planIngest.ts`) and be called from the tool.

3. **Cross-agent patterns**
   - Create `mcp-server/content/PLAN_MODE_PATTERNS.md` (served by a new `getPlanModePatterns` tool or included in bootstrap).
   - Document equivalents: Grok plan mode, Claude "think step by step + review before code", Cursor Composer planning, etc.

**Deliverables to create/edit:**
- `mcp-server/src/planIngest.ts` (new)
- Edits to `src/index.ts` to register the tool
- Updates to `NEW_PROJECT_BOOTSTRAP.md`, `WORKFLOW.md` §1 (Phase 1), and `getPhaseGuidance`
- New file: `mcp-server/content/PLAN_MODE_PATTERNS.md`

**Value:** Makes ForgeKit feel native to the agent's best planning UX. The plan artifact becomes the durable handoff instead of chat history.

### 2.2 Subagents for Parallel Execution Inside Phases
ForgeKit's audits (black-hat, UX-cohesion, docs-alignment, competitor-deep-dive) and research tasks (lessons search, stabilize root-cause, feature spikes) are perfect for parallel subagents. Grok's `spawn_subagent` supports `subagent_type` (`explore`, `plan`, `general-purpose`), `capability_mode` (`read-only`, `read-write`, `execute`, `all`), `isolation: "worktree"`, `background`, `personas`, and `resume_from`.

**Problem today:** These tasks are described in prompts and run serially in the main thread, consuming context and time.

**Detailed Implementation Approach**

1. **New dedicated MCP tool**
   ```ts
   server.tool(
     "suggestSubagentDecomposition",
     "For a given phase and task, return recommended subagent calls (including exact spawn_subagent parameters, persona instructions, and a parent prompt to synthesize results).",
     {
       phase: z.string().describe("1-7 or name"),
       taskDescription: z.string(),
       maxSubagents: z.number().default(4),
       preferredIsolation: z.enum(["none", "worktree"]).optional(),
     },
     async (args) => { /* return structured text or JSON describing 1-N spawn_subagent calls + synthesis step */ }
   );
   ```

2. **Persona and instruction assets**
   - Create `mcp-server/content/personas/` (or reuse/extend existing):
     - `security-auditor.md`
     - `ux-cohesion-reviewer.md`
     - `stabilize-debugger.md`
     - `lessons-extractor.md`
   - These become the `instructions` passed when spawning or referenced via a new `getSubagentPersona` tool.
   - Update `runAudit` and `searchLessons` to return an optional "recommendedSubagentPersona" field in their response.

3. **WORKFLOW.md integration (mirror the gstack section)**
   - Add a new top-level section after the current gstack §1b: "## Using Subagents (Grok, Claude, future systems)"
   - Per-phase guidance:
     - Phase 1: Main agent only (or one explore subagent for competitive research).
     - Phase 4/5: Main agent plans; spawn 2-3 `explore` subagents for parallel feature research or refactor analysis.
     - Phase 7: Spawn one subagent per audit type (black-hat, code-quality, deployment) using `capability_mode: "read-only" | "execute"`, then main agent synthesizes into `BLACK_HAT_REPORT.md` + `CODE_QUALITY.md`.
   - Key rule: "After subagent results return, the parent must update `.forgekit/workflow_tracking.json` (gotchas, decisions) and relevant progressive docs."

4. **Bootstrap and phase guidance updates**
   - Add examples in `NEW_PROJECT_BOOTSTRAP.md` and `getPhaseGuidance`.
   - Update tool descriptions for `runAudit`, `getAntiPatterns`, `searchLessons` to say: "This task is safe and recommended to run via parallel subagents when the host agent supports `spawn_subagent`."

5. **Worktree & resume support**
   - Document when to use `isolation: "worktree"` (exploratory refactors in Phase 5) vs `none`.
   - New helper logic (or guidance) for using `resume_from` when chaining a research subagent into an implementation subagent.

**Implementation steps:**
- Add the tool and personas in `mcp-server/src/`.
- Edit `WORKFLOW.md` (add ~1-2 pages of guidance modeled on the existing gstack §1b).
- Update several `server.tool` descriptions + bootstrap content.
- Optionally add `getSubagentPersona` tool.

**Value:** Directly multiplies throughput on the parts of ForgeKit that are most context-heavy and parallelizable. Addresses the "long sessions hit context limits" anti-pattern repeatedly called out in WORKFLOW.md.

### 2.3 Skills / Persistent Prompt Packages as ForgeKit Delivery
Grok skills (see `~/.grok/skills/<name>/SKILL.md` with YAML frontmatter) are activated by description match or `/skill-name`. They are the perfect vehicle for "always-on" ForgeKit discipline.

**Detailed Implementation Approach**

1. **Canonical forgekit skill definition**
   - Add `mcp-server/content/skills/forgekit/SKILL.md` (a ready-to-copy file).
   - Frontmatter example:
     ```yaml
     ---
     name: forgekit
     description: "Enforce ForgeKit 7-phase lifecycle, maintain .forgekit/workflow_tracking.json, pause at phase transitions, use subagents for audits, follow progressive documentation. Use for any non-trivial app development project."
     user-invocable: true
     argument-hint: "start new project | resume | phase 4 feature work | run black-hat audit"
     allowed-tools: "todo_write, spawn_subagent, read_file, search_replace, run_terminal_command, getPhaseGuidance, runAudit, searchLessons"
     ---
     ```
   - Body: concise phase summary, tracking rules, "call getPhaseGuidance before major work", anti-pattern reminders, subagent usage patterns, reply format instructions.

2. **MCP delivery**
   - New tool:
     ```ts
     server.tool(
       "getForgeKitSkill",
       "Returns the canonical forgekit SKILL.md definition (with optional agent-specific variants).",
       { agent: z.string().optional().describe("grok | claude | generic") },
       async () => { return the content }
     );
     ```

3. **Integration with existing mechanisms**
   - Update Cursor rules and Lite content to mention "or install the equivalent skill in your agent".
   - In `getNewProjectKickoff` and `getResumeSessionInstructions`, include a short paragraph telling the agent to load the skill if available.
   - Document how to compose: user skill + project-local rules.

4. **Grok-specific packaging**
   - Provide instructions + a small generator so users can drop it into `~/.grok/skills/forgekit/`.

**Value:** Turns ForgeKit from "instructions the user must remember to paste" into persistent, automatically activated context — exactly like the existing `.cursor/rules/` files but for any skill-capable agent.

### 2.4 MCP Server Enhancements for Rich Agents
Current implementation (McpServer + `server.tool` with Zod schemas, text returns, `FORGEKIT_ROOT` resolution, template stripping, lesson extraction) is solid.

**Detailed Proposals & Code Sketches**

**New tools (add to `src/index.ts` after the existing tool registrations):**

- `suggestSubagentDecomposition` (see 2.2)
- `validateTracking`:
  ```ts
  server.tool(
    "validateTracking",
    "...",
    {
      trackingJson: z.string().optional(),
      path: z.string().optional().describe("Path to .forgekit/workflow_tracking.json (server will read if possible)"),
    },
    async (args) => {
      // Load schema from TRACKING_SCHEMA_PATH or in-memory
      // Check phases, exit criteria movement rules, decision shapes, gotcha categories
      // Return list of issues + auto-fix snippets
    }
  );
  ```
- `getAgentIntegrationGuide`:
  ```ts
  server.tool(
    "getAgentIntegrationGuide",
    "Returns tailored bootstrap + primitive mappings for a specific agent.",
    { agent: z.enum(["grok", "claude", "cursor", "generic"]).default("generic") },
    async ({ agent }) => { /* return content from mcp-server/content/AGENT_INTEGRATION_<agent>.md */ }
  );
  ```

**Improvements to existing tools:**
- Extend `getTemplate` and `runAudit` return objects to include a `metadata` field (JSON) when the caller passes `includeMetadata: true`.
- Add optional `format: "text" | "json"` to several tools for headless/Grok `-p --output-format json` users.
- Make `ping` also report "subagent support recommended: true" or list known complementary primitives.

**Packaging & discovery:**
- Update `mcp-server/package.json` bin and README with `npx forgekit-mcp` and one-line registration examples for Grok (`grok mcp add forgekit -- node ...`).
- Consider a thin `forgekit-mcp` wrapper that sets sensible `FORGEKIT_ROOT`.

**Files to touch:**
- `mcp-server/src/index.ts` (add tools + metadata support)
- New files under `mcp-server/content/AGENT_INTEGRATION_*.md`
- `mcp-server/README.md` and root README

**Value:** The MCP becomes a true collaborator that understands what the connected agent can do.

### 2.5 Tracking.json as First-Class Citizen + Tooling
**Schema extensions (add to TRACKING_SCHEMA.md and the starter `workflow_tracking.json`):**

```json
{
  "agentContext": {
    "primaryAgent": "grok-build",
    "supportsSubagents": true,
    "supportsPlanMode": true,
    "lastSessionId": "..."
  },
  "phases": {
    "...": {
      "subagentRuns": [ { "id": "...", "description": "...", "outcome": "..." } ]
    }
  }
}
```

**Tooling:**
- `validateTracking` tool (above) + a small Node CLI in `mcp-server/bin/` or a script in `content/scripts/`.
- Sync convention: after important work, the agent should run `todo_write` for open exit criteria + update tracking.

**Visualization:** Extend `forgekit.html` or add a `getProgressHtml` tool.

### 2.6 Agent-Agnosticism, Propagation, and Other Polish
- Make all bootstrap and phase guidance default to "your agent" / "the host agent".
- Strengthen `prompts/propagate-to-forgekit.md` with a Grok-specific example that uses `spawn_subagent` + `todo_write` to analyze a project before contributing lessons.
- **Spec folder hygiene:** Create `specs/canonical/` now and move the three meta-specs (or symlink). Update `forgekit-prelaunch-review.md` and the new file with full canonical headers. Add a short `specs/README.md`.
- **Headless support:** Add structured JSON variants to key tools and a section in `WORKFLOW.md` "Using ForgeKit in headless/CI pipelines".
- **Media & exports:** Add patterns in Phase 1 guidance and a small `mcp-server/content/EXPORT_PATTERNS.md` that references agents with strong docx/pptx generation (Grok skills, etc.).
- **Dogfooding:** Add a `scripts/dogfood-cycle.mjs` that can be run against a throwaway repo using different agents.

---

## 3. Proposed New MCP Tools — Full Implementation Sketches

(See detailed Zod schemas and handler outlines in the subsections above.)

Recommended order of addition:
1. `validateTracking` (quick to implement, high immediate value for all users)
2. `suggestSubagentDecomposition` (leverages Grok's strengths immediately)
3. `getAgentIntegrationGuide` + supporting content files
4. `getForgeKitSkill` + `ingestPlanArtifact`

All new tools should follow existing patterns: text-first returns for human/agent readability, optional structured modes, good error messages when `FORGEKIT_ROOT` is wrong.

---

## 4. Updates Required to Core Files

- **WORKFLOW.md**: New top-level section on subagents (modeled on §1b gstack). Expanded Phase 1, 4, 5, 7 playbooks. Update spec lifecycle guidance to reference the new canonical spec.
- **TRACKING_SCHEMA.md**: Document the new optional `agentContext` object and `subagentRuns` per phase.
- **mcp-server/content/**: Several new `.md` files (PLAN_MODE_PATTERNS, AGENT_INTEGRATION_*, SKILL template, EXPORT_PATTERNS).
- **mcp-server/src/index.ts** + new helper modules: 3–5 new tools + metadata support.
- **Root README + mcp-server/README**: Mention new capabilities and registration for Grok.
- **prompts/propagate-to-forgekit.md**: Add a "modern agent analysis" variant.

All changes must keep the Lite path and existing MCP clients fully working.

---

## 5. Grok Build Skill Template (Deliverable)

Create `mcp-server/content/skills/forgekit/SKILL.md` (copyable to `~/.grok/skills/forgekit/SKILL.md`).

Include:
- Frontmatter as shown in 2.3
- Body containing:
  - 7-phase one-paragraph summary + link to phases via `getPhaseGuidance`
  - Mandatory: read `.forgekit/workflow_tracking.json` at start of session
  - "Call `suggestSubagentDecomposition` or `runAudit` for audits"
  - Phase transition protocol
  - Reply format rules

A `getForgeKitSkill` tool can emit the latest version.

---

## 6. Prioritization Sketch (Updated)

**P0 (do in next 1-2 sessions):**
- `validateTracking` tool + schema extension
- Subagent guidance in WORKFLOW.md + `suggestSubagentDecomposition` tool
- Creation of the Grok skill definition file + `getForgeKitSkill` tool

**P1:**
- Plan artifact ingestion tool + PLAN_MODE_PATTERNS.md
- `getAgentIntegrationGuide` + Grok appendix
- Spec folder canonical reorganization

**P2 / nice-to-have:**
- CLI wrapper, richer structured outputs, dogfood harness, packaging polish.

---

## 7. Open Questions & Risks (refined)

- Balance of core vs. agent-specific content (keep core minimal, deliver agent details via MCP tools/content).
- Should we add an official `agentCapabilities` section to the tracking schema (yes — proposed above).
- Backward compatibility: all new tools and fields must be optional.
- How to measure success: usage of new tools in real sessions, reduction in "repeated mistakes" reported in gotchas[], author + early adopter feedback.

---

## 8. Next Steps (Immediate)

1. Review this expanded spec using ForgeKit process (Phase 1 on the highest-value item).
2. Implement `validateTracking` and `suggestSubagentDecomposition` (self-contained in the MCP server).
3. Create the initial Grok skill file and wire the local ForgeKit MCP into a Grok session for dogfooding.
4. Update WORKFLOW.md and bootstrap content with the new subagent + plan mode sections.
5. Append experiment results back into this spec.

This remains a living canonical reference. Append dated notes, implementation PR links, and "what actually worked" here.

---

**Appendix A: Related Grok Build Primitives (2026-06-15)**

(See previous version + these mappings)

- Plan mode directly implements Phase 1 gates.
- `spawn_subagent` + personas + worktree = parallel ForgeKit audits and research.
- `todo_write` + sessions = natural sync target for `.forgekit/workflow_tracking.json`.
- Skills = persistent ForgeKit "personality".
- Native MCP consumption pattern (already used by this Grok instance with browsermcp).
- Headless + JSON = great for CI automation of ForgeKit status checks.
- docx/pptx/xlsx + imagine = direct support for Phase 1 export/landing needs and Phase 6/7 deliverables.

Use these primitives to execute the methodology instead of working around the agent.

**Appendix B: Example Subagent Spawn for Phase 7 (Grok syntax)**

``` 
Spawn three read-only subagents:
1. security: runAudit black-hat + searchLessons "security"
2. ux: run the ux-cohesion-audit prompt
3. code-quality: read CODE_QUALITY template and audit the current tree

Main agent then synthesizes into BLACK_HAT_REPORT.md and CODE_QUALITY.md and updates tracking.
```

This pattern generalizes across phases.

---

## Implementation Log

**Date:** 2026-06-23 (Grok Build session with author)

**Completed work** (directly implementing the "Next Steps (Immediate)" and P0 items from the Prioritization Sketch above):

1. **MCP Server — new tools added to `mcp-server/src/index.ts`**  
   - `validateTracking`: Accepts JSON or path (or defaults), performs basic structural validation against expected phases/decisions/gotchas shape. Returns clear issues + suggested fixes.  
   - `suggestSubagentDecomposition`: Takes phase + taskDescription (+ optional maxSubagents). Returns phase-aware spawn recommendations (types, capability_mode, isolation hints, prompt seeds) + parent synthesis instructions. Strong defaults for audits (Phase 7) and iteration/refine.  
   - Updated `printStartupHintsToStderr()` to list the new tools.  
   Tools follow existing patterns and are additive (no breakage to Lite or prior MCP clients).

2. **ForgeKit skill definition created**  
   - `mcp-server/content/skills/forgekit/SKILL.md`  
   Full SKILL.md with YAML frontmatter (name, description, user-invocable, allowed-tools) + detailed body covering:  
   - 7-phase core rules  
   - Session start discipline (read tracking + CONTEXT_PROMPT)  
   - Phase transition protocol  
   - Native plan mode + subagent preferences  
   - Reply format, audits/lessons, key tools to call proactively  
   Ready to copy to `~/.grok/skills/forgekit/SKILL.md` (or equivalent) for persistent activation.

3. **WORKFLOW.md §1c — planned, not yet landed**  
   The P0 sketch called for "1c. Using Subagents with Modern Agents" after §1b (gstack). That section is **not** in `WORKFLOW.md` yet; subagent guidance currently lives in this spec, `AGENT_INTEGRATION_grok.md`, and the forgekit skill. Land §1c in a follow-up pass.

4. **Supporting content files created**  
   - `mcp-server/content/PLAN_MODE_PATTERNS.md`: Detailed recommended flow for using native plan modes as Phase 1 implementation, Grok-specific steps, cross-agent equivalents, required artifacts.  
   - `mcp-server/content/AGENT_INTEGRATION_grok.md`: Mapping table (Grok primitives → ForgeKit phases), recommended session openers, subagent patterns, tracking sync, skills usage, headless tips, local MCP registration command, and dogfooding guidance.

**Files changed/added (relative to repo root):**
- mcp-server/src/index.ts (new tools + hints)
- mcp-server/content/skills/forgekit/SKILL.md (new, with directory)
- mcp-server/content/PLAN_MODE_PATTERNS.md (new)
- mcp-server/content/AGENT_INTEGRATION_grok.md (new)
- specs/canonical/forgekit-modern-agents-evolution.md (this spec)

**Notes on what worked:**
- The implementations stayed lightweight and text-first (matching existing MCP tool style).
- Mirroring the gstack section for subagents provided excellent structural consistency.
- All changes are designed to be immediately testable with the local MCP (via tsx or after `pnpm run build` in mcp-server/).
- Directly exercises the "propagate lessons" spirit by documenting the work back into the canonical spec.

**Status:** Core P0 MCP tools and supporting content landed in this pass. WORKFLOW.md §1c and MCP wrappers for the new content files remain follow-ups.

**Next actions (per updated Next Steps):**
- Rebuild/test the MCP tools in a live Grok session.
- Wire the local ForgeKit MCP server into this environment for dogfooding.
- Consider further appends after real usage (e.g. "what actually worked in subagent audits").
- Update other bootstrap content (e.g. NEW_PROJECT_BOOTSTRAP.md) with references to the new tools/sections if desired.

This log entry appended per the instruction at the end of the prior "Next Steps" section: "Append experiment results back into this spec."

---

**Appendix C: Quick Test Commands (post-implementation)**

To exercise the new tools (after registering the MCP):

- `validateTracking` with path to a sample tracking file.
- `suggestSubagentDecomposition` with phase="7" and a task like "perform black-hat security + UX review".

See AGENT_INTEGRATION_grok.md for full registration example.

---

**Date:** 2026-06-25 (follow-up — Cursor session)

**Completed work** (P0 follow-ups from prior review):

1. **WORKFLOW.md §1c** — "Using Subagents with Modern Agents" added after §1b (gstack), with phase-by-phase guidance, recommended pattern, Phase 7 example, and key rule. Phase 1 playbook updated with native plan mode + `getPlanModePatterns` cross-ref.

2. **MCP content tools** — `getPlanModePatterns`, `getAgentIntegrationGuide` (grok | claude | cursor | generic), `getForgeKitSkill` registered in `index.ts`; startup hints updated.

3. **Agent integration guides** — `AGENT_INTEGRATION_generic.md`, `AGENT_INTEGRATION_cursor.md`, `AGENT_INTEGRATION_claude.md` (grok guide already present).

4. **`validateTracking` deepened** — `mcp-server/src/trackingValidate.ts`: MCP + Lite phase ids, phase object shape, exit-criteria overlap warnings, decisions/gotchas/sessions checks, optional `agentContext` and `subagentRuns`.

5. **`suggestSubagentDecomposition`** — phase classification uses full phase string + task (fixes text-only phase names defaulting to Phase 7).

6. **Bootstrap + schema** — `NEW_PROJECT_BOOTSTRAP.md` tool map and Phase 1 steps reference new tools; `TRACKING_SCHEMA.md` documents optional `agentContext` and `subagentRuns`.

**Status:** P0 follow-ups complete. P1 items still open: `ingestPlanArtifact`, spec folder canonical reorganization, structured JSON tool outputs.

---

**Date:** 2026-06-25 (P1 completion — Cursor session)

**Completed work:**

1. **`ingestPlanArtifact`** — `mcp-server/src/planIngest.ts` + MCP tool: rule-based plan section → PHASE_1_BRIEF mapping, D# / bullet decision extraction, `decisions[]` JSON, `format=json` support. Cross-refs in PLAN_MODE_PATTERNS, bootstrap, skill, `getPhaseGuidance("1")`.

2. **Spec folder canonical reorganization** — `specs/canonical/` created; `forgekit-modern-agents-evolution.md`, `forgekit-as-product.md`, `forgekit-prelaunch-review.md` moved; canonical headers updated; `specs/README.md` added.

3. **Structured JSON tool outputs** — `mcp-server/src/mcpFormat.ts`; `format=json` on `ping`, `validateTracking`, `suggestSubagentDecomposition`, `ingestPlanArtifact`; `getTemplate` / `runAudit` add `format` + `includeMetadata` (recommendedSubagentPersona on audits). `ping` reports subagent/plan-mode recommendations.

**Status:** P1 sketch complete. Next: dogfooding in live Grok/Cursor sessions, optional `ingestPlanArtifact` LLM-assisted refinement, persona assets (`mcp-server/content/personas/`).