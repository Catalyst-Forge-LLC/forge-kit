# Engineering Skill Library (Principal-Engineer Handoff)

Produce a **skill library**: a set of mentoring-style documents that capture the **expert judgment, design rationale, and hard-won lessons** behind a mature codebase, so that a new engineer — or a lower-context / cheaper AI model — can continue the work effectively without re-learning everything the expensive way.

Think of it as the handoff a **retiring principal engineer** would write: not "what the code does" (the code shows that) but **why it's built this way, how to decide when the docs run out, and what goes wrong when the conventions are ignored.**

Use this when a project has matured enough to have real conventions, real scars, and real judgment worth preserving — typically before a beta/launch, before handing the project to someone else (human or agent), or when onboarding keeps costing the same explanations. It complements the reference docs (`TECHNICAL_REFERENCE.md`, `CONTEXT_PROMPT.md`): where those say *what* and *where*, the skill library says *why* and *what breaks*.

> **Companion prompts:** `ux-cohesion-audit.md` and `panel-usability-audit.md` read the *product experience*; `black-hat-audit.md` and the `CODE_QUALITY.md` pass read for *findings to fix*. This prompt reads for *judgment to preserve*. Its output is durable teaching material, not a findings backlog.

---

## How to Use

1. Give this prompt to an AI assistant with **full codebase access**.
2. Optionally set `[SCOPE]` (default: the whole app) and `[SKILL_COUNT]` (default: 10–16 documents).
3. The assistant audits the repo, then writes one Markdown file per skill under `[docs/skills/]` (or a location you name), plus a short `README.md` index.
4. Review, then commit. Keep the library next to the code; when a doc contradicts the code later, the **code is newer** — fix the doc in the same change set.

---

## Instructions

You are a **retiring principal engineer** writing a handoff library so the next person or model can operate with your judgment. Ground **everything** in the actual code — real file paths, real function names, real snippets, real past incidents. Generic advice that could apply to any codebase is worthless here; the value is in *this* system's specific decisions and scars.

### Step 1 — Audit before you write

Do a genuine, broad audit first. Do **not** write from memory or the conversation summary. Read, in parallel where possible:

- **Core shared modules** — the server/lib layer, the cross-cutting helpers (auth, data access, validation, LLM/AI calls, file handling, entitlements/billing). These encode the conventions.
- **The convention/rules files** — `AGENTS.md` / `CLAUDE.md`, `.cursor/rules/*`, `CONTEXT_PROMPT.md`, contributing docs. Each rule usually exists because of a bug; find the bug.
- **The failure record** — bug logs, `CODE_QUALITY.md` / security reports, `TODO.md` / `IDEAS.md`, and **`git log`** for fix/regression themes. This is the single richest source of "lessons from costly mistakes."
- **The specs / decision log** — `specs/` (completed and in-flight) for *why* features are shaped as they are and what tradeoffs were weighed.
- **Route/component conventions** — pick 2–3 representative examples of each layer and note the repeated shape.

> 🔧 **Guidance:** For a large repo, parallelize the audit across sub-areas (server core, docs/failures, each major pipeline, specs, routes) and reconcile the findings before writing. Verify any code snippet you quote against the current file — stale line numbers and imagined APIs destroy trust in a handoff doc.

### Step 2 — Choose the skill set

Aim for `[SKILL_COUNT]` focused documents. Cover these categories (merge or split to fit the project; not every project needs all of them):

1. **Architecture & key design decisions** — the one-page mental model plus the load-bearing decisions *with rationale* (what was chosen, what was rejected, why).
2. **One document per hairy subsystem** — the data layer, the AI/LLM integration, any document/format pipeline, any scraping/import pipeline, auth/permissions, billing/entitlements. One per subsystem that has real depth or real footguns.
3. **Debugging playbooks** — symptom-first guides to the recurring and expensive failures ("works locally, fails in prod" and friends), each with the non-obvious root cause.
4. **Security / review checklist** — the standing defenses and the open findings, framed as a pre-ship gate.
5. **Testing & verification** — what's automated, what's *deliberately* manual, known-failing tests and why, the pre-commit gate.
6. **Process** — spec/workflow lifecycle, git discipline, how work gets planned and finished here.
7. **Judgment calls & decision frameworks** — the capstone: "how I decide when the docs don't cover it," the prime directive, and the failure patterns that repeat. This is the highest-value document; write it last, after the others surface the throughlines.

### Step 3 — Write in a mentoring voice

- **Lead with the decision and its rationale**, then the mechanics. A handoff doc that only describes mechanics is just slower-to-read source code.
- **Every convention gets its WHY and its scar.** "Always use `[helper]`" is weak; "Always use `[helper]` — we shipped ~N raw `[unsafe pattern]` before the audit caught it, and here's the exact class of bug it prevents" is a lesson that survives.
- **Capture anti-patterns and war stories.** The thing someone tried that *didn't* work, and the specific incident, are often more valuable than the positive rule. Name the symptom so a future reader recognizes it.
- **Include real code references** (path + a short snippet) for the most instructive kernels, and cross-link between skill docs.
- **Write for less context than you have.** The reader — human or a cheaper model — did not watch the codebase evolve. Spell out the terms; don't rely on shorthand only you know.
- Keep each doc focused and skimmable (headings, tables, checklists). A skill library people actually re-read beats an exhaustive one they don't.

### Step 4 — Index and verify

- Write a `README.md` for the library: a "read this first" order, a "read X when you're about to do Y" table, and the unchanging ground rules.
- Re-check quoted snippets against the current code. Fix anything stale.
- Note where a skill doc reveals that an existing convention doc (`AGENTS.md`, `CONTEXT_PROMPT.md`) is **wrong or out of date** — flag it (or fix it) rather than faithfully repeating stale guidance.

### Step 5 — Report

List the documents you created, one line each, and call out: the biggest design decisions you captured, any convention-doc contradictions you found, and anything you judged too app-specific to generalize.

---

## Notes

- This library is **teaching material, not a spec or a findings report.** Don't turn it into a TODO backlog; link to the backlog instead.
- It pairs naturally with `propagate-to-forgetrail.md`: once the library exists, the *generalizable* lessons inside it are strong propagation candidates for ForgeTrail templates.
- Revisit after major architectural shifts. A stale handoff library is worse than none, because it teaches confidently wrong things — treat drift as a bug, same as any doc.
