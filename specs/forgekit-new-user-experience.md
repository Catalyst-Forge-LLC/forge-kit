# ForgeKit — New user experience (NUX) improvement

**Spec kind:** Draft proposal (ForgeKit product / docs)

**Status:** Draft — decisions locked 2026-07-10; packaging artifacts in progress (TRY doc, sample Genesis, lite flag, issue checklist). README front-door rewrite (M1) still open.

**Scope:** How a **first-time visitor** understands what ForgeKit is, why it is worth trying, and how to prove it out in under an hour — without cloning MCP, linking a global CLI, or reading the full methodology tree. Primary prove-it path: **Genesis spec prompt + ForgeKit Lite**. Secondary paths (MCP, full install) stay available but must not dominate the front door.

**Related artifacts:**
- Root [`README.md`](../../README.md) (current front door — too dense for first contact)
- Root [`TRY_FORGEKIT.md`](../../TRY_FORGEKIT.md) (human try recipe — locked name)
- [`content/GENESIS_SPEC_PROMPT.md`](../../content/GENESIS_SPEC_PROMPT.md)
- [`content/examples/GENESIS_SAMPLE_mars-habitat-roster.md`](../../content/examples/GENESIS_SAMPLE_mars-habitat-roster.md) (fictional sample)
- [`content/FORGEKIT_LITE.md`](../../content/FORGEKIT_LITE.md)
- [`content/NEW_PROJECT_BOOTSTRAP.md`](../../content/NEW_PROJECT_BOOTSTRAP.md)
- [`.github/ISSUE_TEMPLATE/try-forgekit-checklist.md`](../../.github/ISSUE_TEMPLATE/try-forgekit-checklist.md)
- [`mcp-server/README.md`](../../mcp-server/README.md)
- [`specs/canonical/forgekit-modern-agents-evolution.md`](canonical/forgekit-modern-agents-evolution.md)

---

## 1. Problem statement

A fresh user landing on the ForgeKit README today faces:

1. **Unclear value in one glance.** The opening paragraph names a "structured development methodology" and a "compounding loop" before the reader knows what problem that solves for *them*. Comparison tables and phase matrices appear before a working "try this now" path.
2. **Too many doors, no recommended first door.** Quickstart lists MCP build/status, template-in-repo copy, global `pnpm run link:global`, full vs lite install, and optional gstack — all as peers. A newcomer cannot tell which path is the smallest proof.
3. **The easiest prove-it path is buried.** Genesis (paste a prompt in any chat app → iterate a `GENESIS.md`) and Lite (one markdown file + a coding agent) are the lowest-friction way to feel ForgeKit without Node MCP setup. They are not the hero of the README.
4. **No "weekend try" narrative.** There is no short story of the form: *idea → researched spec in ChatGPT/Claude → drop two files in a folder → tell Cursor/Claude Code to follow Lite → get a Phase 1 brief and a spine.* That story is how many solo builders actually work; the docs assume they already chose MCP or vendoring.

**What "done" looks like for this initiative:** A stranger can open the README, understand ForgeKit in ~30 seconds, pick a **Try it in 15 minutes** path that uses Genesis + Lite (no MCP required), and know when to graduate to MCP or full install — without reading WORKFLOW.md first.

---

## 2. Goals and explicit non-goals (v1 of this NUX work)

### Goals

- **G1.** Front-door clarity: what ForgeKit is, who it is for, and the one outcome it sells (disciplined AI-assisted builds with memory across sessions).
- **G2.** A single **recommended first path** that proves value with zero MCP / zero global CLI: Genesis prompt → `docs/GENESIS.md` → folder with Lite → coding agent kickoff.
- **G3.** A copy-paste **kickoff line** the user can give their coding agent after the two files are in place (so they do not invent the opener).
- **G4.** Clear **graduation ladder**: Try (Genesis+Lite) → Prefer Lite for small tools → Prefer MCP when living in Cursor/Claude with ForgeKit cloned → Full `_forgekit/` only when offline/vendored methodology is required.
- **G5.** README skim path: hero → try-it → why → phases (short) → deeper links. Optional/advanced content moves below or into linked docs.
- **G6.** Discoverability of Genesis and Lite from MCP kickoff and Lite itself (cross-links already partial; make the human path as obvious as the agent path).

### Non-goals (this NUX pass)

- Rewriting the 7-phase methodology or Lite protocol content itself (except thin "how humans start" framing).
- Building a hosted/cloud ForgeKit product or interactive web onboarding.
- Replacing MCP as the long-term recommended path for power users who already clone the repo.
- A video course, interactive tutorial app, or sample app monorepo (nice later; not required to ship NUX v1).
- Changing install CLI behavior beyond what packaging the try-it path needs (`--with-genesis-stub` is in scope; a new SaaS signup is not).

---

## 3. Required background (what exists today)

| Asset | Role today | Gap for NUX |
|-------|------------|-------------|
| **README Quickstart** | Leads with `mcp:build` / Cursor MCP | Assumes clone + Node + Cursor MCP config before any product feeling |
| **`GENESIS_SPEC_PROMPT.md`** | Pre-Phase-1 external LLM prompt; MCP tool `getGenesisSpecPrompt` | Documented for agents; not a human "start here" story on the README |
| **`FORGEKIT_LITE.md`** | Single-file protocol; `forgekit install --lite` | Excellent for agents; human still needs to know *to* drop it next to a genesis spec |
| **`getNewProjectKickoff` / MCP** | Best in-IDE experience once configured | High setup cost for "just trying" |
| **Full install / `_forgekit/`** | Self-contained methodology tree | Heavy for first proof; competes with Lite for attention |
| **Comparison table** | Differentiates Spec Kit / BMAD / OpenSpec | Useful *after* the reader cares; currently early |

**Intended prove-it flow (author intent):**

1. User pastes the Genesis prompt into their favorite AI chat (ChatGPT, Claude, Grok, Ollama UI, …), or starts from the Mars sample as a shape reference.
2. They iterate until they have a solid `docs/GENESIS.md` (what, not how).
3. They create an empty project folder, add `docs/GENESIS.md` and `.forgekit/FORGEKIT_LITE.md` (copy files, or `forgekit install --lite --with-genesis-stub` if they have the CLI).
4. They open that folder in their coding agent and paste the kickoff line from `TRY_FORGEKIT.md`.
5. The agent follows Lite: git init if needed, tracking, intake informed by Genesis, Phase 1 brief, then scaffold when approved.

MCP and full install remain **graduation** options once the user wants always-fresh methodology or Cursor-native tools.

---

## 4. Core concepts

- **Front door** — README (and GitHub repo description / About blurb) as the only required human entry.
- **Try path** — Genesis + Lite, no MCP, no global link required if the user can download or copy two files. Documented in **`TRY_FORGEKIT.md`**.
- **Kickoff line** — One short user→agent message that cites Lite + Genesis and forbids premature scaffolding.
- **Graduation ladder** — Ordered recommendations by commitment level.
- **Time-to-first-aha** — Metric for success: user has either a locked Phase 1 brief *or* a clear "this is better than raw chat" moment within one sitting.

---

## 5. Functional requirements

### 5.1 README front door

1.1 Opening must answer, in order: **what** (one sentence), **who** (solo / small-team builders using AI coding agents), **why** (phases + memory + lessons so the agent does not thrash), **how to try** (link to `TRY_FORGEKIT.md`).
1.2 "Compounding loop," comparison table, gstack, PocketBase/Ollama optionals, and "what's in the box" tree must not appear before the Try path (or must be collapsed behind a short "Why ForgeKit" / "Deeper" section).
1.3 Quickstart must label paths: **Try (no MCP)** | **MCP (Cursor power users)** | **Full / vendored** — with Try first.
1.4 Repo GitHub description / topics updated in the **same PR as the README rewrite (M1)**. Blurb text is locked in §10 decisions (Q2).

### 5.2 Try path: Genesis + Lite

2.1 Document a numbered human recipe in **`TRY_FORGEKIT.md`** (≤10 steps) that does not require `pnpm`, MCP, or `forgekit` on PATH.
2.2 Provide a **downloadable or copyable** pair: Genesis prompt text + Lite file (or clear links to raw GitHub / `content/` paths), plus the fictional sample under `content/examples/`.
2.3 Provide a **canonical kickoff line** in `TRY_FORGEKIT.md` for the coding agent.
2.4 State success criteria for the try: e.g. `.forgekit/workflow_tracking.json` exists, `docs/PHASE_1_BRIEF.md` drafted from Genesis, user asked for approval before scaffold.
2.5 State failure modes: agent ignores Lite; agent scaffolds immediately; user never produces Genesis — with one-line recoveries.
2.6 Canonical Genesis path is **`docs/GENESIS.md`** (not repo root).

### 5.3 Packaging / discoverability

3.1 Genesis prompt remains available via MCP (`getGenesisSpecPrompt`) **and** as a first-class human artifact (README link + `TRY_FORGEKIT.md`).
3.2 Lite install supports **`--with-genesis-stub`**: creates `docs/GENESIS.md` stub (pointer to prompt + sample) alongside `.forgekit/` Lite files.
3.3 MCP bootstrap / kickoff continues to offer Genesis as step 0 when the user has only an idea — keep aligned with README / TRY language.
3.4 Sample Genesis: fictional but plausible **Mars habitat duty roster** tool (relatable shared-schedule problem, sci-fi setting).

### 5.4 Graduation ladder (documented)

4.1 After Try works, document when to add MCP (always-current tools, Cursor green check, `ingestPlanArtifact` automation).
4.2 Document when full `_forgekit/` install is warranted (air-gapped, no MCP, want full template tree on disk).
4.3 Do not present all three as equal "Quickstart" bullets without ranking.

### 5.5 Messaging consistency

5.1 Same Try narrative in README, `TRY_FORGEKIT.md`, Lite §1 (human skim), and Genesis "After you have GENESIS.md".
5.2 Avoid jargon in the first screenful (no "stdio," "FORGEKIT_ROOT," "pnpm link" until MCP section).

### 5.6 First-timer feedback

6.1 Ship a short GitHub issue template checklist so first-time reporters can confirm they completed the Try path (or where they stuck).

---

## 6. Non-functional requirements

- **Time:** A motivated user with an idea and any LLM chat + any coding agent should reach "agent is following Lite against my Genesis" in **≤15 minutes** of reading/setup (excluding time spent iterating the Genesis content itself).
- **Dependencies for Try:** Zero required beyond a browser LLM and a coding agent that can read files. Git/Node/pnpm appear only when the *agent* starts Phase 2, per Lite preflight — not as README blockers for the Try path.
- **Maintenance:** Try path docs must not fork Lite or Genesis content; link or thin wrappers only. The Mars sample is illustrative and may lag real projects; label it clearly as fiction.
- **Tone:** Outcome-oriented US English; assertive capability copy for what ForgeKit does; no em dashes in user-facing README/Try copy (per project rules).
- **Accessibility of proof:** Works for Cursor, Claude Code, Codex, and "paste Lite into chat" Option B — not Cursor-only.

---

## 7. Edge cases

- User has **no idea yet** — Try path should still offer "use Genesis with a vague one-liner," "start from the Mars sample as a shape reference," or "skip Genesis and use Lite §5 intake only."
- User already has a **long PRD / Notion dump** — map to "save as `docs/GENESIS.md`; optionally run Genesis prompt only for gaps / prior-art / format research."
- User lands wanting **MCP only** — graduation ladder still lists MCP second, not hidden; power users must not feel demoted.
- **Windows / Git Bash PATH** issues with `forgekit` CLI — Try path must not depend on global link (copy files or raw GitHub URLs).
- Agent **cannot fetch** GitHub raw — user must be able to copy-paste from README / opened files.
- Genesis output is **weak or how-heavy** — kickoff line should tell the agent to preserve what-not-how and push stack choices into Phase 1 decisions, not invent a stack from the Genesis file alone unless the user locked one.
- User tries Try path **inside the forge-kit clone** by mistake — warn: use a **new empty project folder**, not the methodology repo.
- Lite vs full install confusion after Try — ladder must say Lite is enough until they need MCP tools or full templates.
- **`--with-genesis-stub` without `--force`** — must not overwrite an existing `docs/GENESIS.md`.

---

## 8. Suggested milestones

| Milestone | Outcome | Approx. effort |
|-----------|---------|----------------|
| **M1** | README rewrite: hero + link to `TRY_FORGEKIT.md` + ranked Quickstart; MCP/full demoted but linked; GitHub About/topics updated in same PR | Docs + repo metadata |
| **M2** | `TRY_FORGEKIT.md` with 15-minute recipe + kickoff line; cross-links from Genesis + Lite §1 | Docs |
| **M3** | Mars sample Genesis + `forgekit install --lite --with-genesis-stub`; raw file links verified | Packaging |
| **M4** | Align MCP kickoff / bootstrap wording with TRY narrative; first-timer issue checklist | Docs + `.github` |
| **M5** | (Later) Link a real public project that used the path, if one exists | Optional social proof |

---

## 9. Acceptance criteria

- **AC1.** Given a reader who has never heard of ForgeKit, when they read only the first screenful of the README, then they can state what it is, who it is for, and the recommended first action (`TRY_FORGEKIT.md`) without scrolling past the Try section.
- **AC2.** Given a user with an idea and no Node/MCP setup, when they follow `TRY_FORGEKIT.md`, then they can place `docs/GENESIS.md` + Lite in a new folder and paste a single kickoff line into their coding agent without running `mcp:build` or `link:global`.
- **AC3.** Given that kickoff, when the agent follows Lite, then it does not scaffold app code before Phase 1 brief approval (or `TRY_FORGEKIT.md` explicitly tells the user to stop the agent if it does).
- **AC4.** Given a power user who wants MCP, when they skip Try, then they still find MCP setup within one click/section from the README Quickstart.
- **AC5.** Given maintainers update Genesis or Lite, when they follow existing sync rules, then `TRY_FORGEKIT.md` does not require maintaining a third full copy of either document.
- **AC6.** Given the graduation ladder, when a user finishes a successful Try, then the docs tell them the next upgrade (MCP or stay on Lite) in one short paragraph.
- **AC7.** Given `forgekit install --lite --with-genesis-stub`, when the target has no `docs/GENESIS.md`, then a stub is created at that path; existing files are left alone unless `--force`.
- **AC8.** Given a first-time reporter, when they open the Try checklist issue template, then they can mark which Try steps they completed.

---

## 10. Decisions (locked 2026-07-10)

| # | Decision | Detail |
|---|----------|--------|
| **D1 (Q1)** | Human try doc is **`TRY_FORGEKIT.md`** at repo root | Filename itself reminds users what it is; durable share URL next to README |
| **D2 (Q2)** | Update GitHub About / topics in the **same PR as M1** | Description (draft): *Structured 7-phase methodology for solo builders using AI coding agents. Try without MCP: Genesis spec + ForgeKit Lite.* Topics (draft): `ai-agents`, `methodology`, `cursor`, `mcp`, `spec-driven-development`, `solo-developer` |
| **D3 (Q3)** | Ship a **fictional but plausible** sample Genesis | Mars-themed, relatable problem: habitat duty roster / shared shift schedule. Path: `content/examples/GENESIS_SAMPLE_mars-habitat-roster.md` |
| **D4 (Q4)** | **`forgekit install --lite --with-genesis-stub`** | Creates `docs/GENESIS.md` stub (does not overwrite without `--force`) |
| **D5 (Q5)** | Canonical Genesis path is **`docs/GENESIS.md`** | Aligns kickoff line, ingestPlanArtifact guidance, and Lite intake |
| **D6 (Q6)** | Short **GitHub issue checklist** for first-timers | `.github/ISSUE_TEMPLATE/try-forgekit-checklist.md` |

---

## 11. Constraints

- Keep Apache 2.0 / OSS distribution model; no paid onboarding wall.
- Do not weaken MCP as the recommended path **after** the user has cloned ForgeKit and lives in Cursor — only reorder first contact.
- User-facing copy: US English; no em dashes; assertive product capability language where describing shipped behavior.
- Prefer linking to `content/GENESIS_SPEC_PROMPT.md` and `content/FORGEKIT_LITE.md` over duplicating their bodies in the README or `TRY_FORGEKIT.md`.

---

## 12. Implementation notes

Prefer shipping M2–M4 packaging (TRY doc, sample, flag, issue template) ahead of or alongside M1 README rewrite. Move this file to `specs/partial/` when M1 starts, then `specs/completed/` when AC1–AC8 pass. Update [`specs/README.md`](README.md) index when status changes.

**Canonical kickoff line (locked for `TRY_FORGEKIT.md`):**

> Follow `.forgekit/FORGEKIT_LITE.md` as the project protocol. Treat `docs/GENESIS.md` as the product spec (what, not how). Create `.forgekit/workflow_tracking.json` and draft `docs/PHASE_1_BRIEF.md` from the Genesis file, asking me only about gaps. Do not scaffold application code until I explicitly approve the Phase 1 brief.

---

## 13. Why this spec exists

ForgeKit's depth is a strength for returning builders and a barrier for first contact. Genesis + Lite already form a complete "prove it without MCP" loop; the gap is **presentation and sequencing**, not missing methodology. This document locks that product intent so README and packaging work can be reviewed against explicit acceptance criteria instead of another ad-hoc docs pass.
