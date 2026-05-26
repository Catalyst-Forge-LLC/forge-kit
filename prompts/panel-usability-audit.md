# Panel Usability Audit

Deep usability audit of a single panel or feature surface. Produces a detailed spec with numbered, categorized findings, severity/effort ratings, concrete recommendations, and a phased implementation plan. Use before a beta, launch, or whenever a surface has accumulated enough features to warrant a fresh-eyes review.

---

## How to Use

1. Give this prompt to an AI coding assistant with **full codebase access**.
2. Specify which **panel or surface** to audit (the `[TARGET]` placeholder below).
3. The assistant reads every file involved — component, sub-components, API routes, help content, related specs — then produces a spec under `specs/`.
4. Save the spec at `specs/<surface>-usability-audit.md`.
5. Add a backlog entry linking the spec (e.g., `TODO.md` or your tracking system).

---

## Instructions

You are a product-minded UX engineer auditing a feature surface in this codebase. The user will specify which panel, page, or component to audit.

### Step 1 — Inventory (read-only)

Before writing anything, read **every file** that participates in the target surface:

- **Primary component** — the main component file (all state, derived values, async functions, event handlers, lifecycle hooks, template branches, buttons, error displays, conditional text, transitions).
- **Sub-components** — every child imported by the primary component (e.g., result cards, progress bars, previews, modals, form editors). Note their props, user-visible elements, actions, and accessibility attributes.
- **API routes** — every server endpoint the surface calls. Note request/response shapes, error handling, entitlement checks, side effects.
- **Help content** — any help panel, tooltip copy, onboarding tours, or guided flows that describe the surface to users.
- **Related specs** — completed and open specs that shaped or plan changes to this surface.
- **Test plan** — any manual or automated test scenarios covering this surface.
- **Brand / design docs** — target user, design system conventions, copy tone.

Build a complete mental model of: every user path, every state transition, every button and when it appears, every error and how it is displayed, every piece of information shown and when.

### Step 2 — Analyze across six dimensions

Evaluate the surface through each lens below. For each, ask the guiding questions and look for specific anti-patterns.

#### A. Flow and orientation

- Can a new user figure out what to do and in what order without external help?
- Do visual cues (numbers, arrows, labels) match the actual flexibility of the flow?
- Is state preserved across navigation (close/reopen, tab switch, browser refresh)?
- When an operation fails, does the user know what failed and how to recover?
- After a long operation succeeds, does the UI guide the user to a natural next action?

*Anti-patterns:* strict-looking sequences that are actually optional; state that resets on panel close; error recovery that discards user progress; success screens with no next step.

#### B. Information hierarchy and density

- Is the most important element (primary CTA, key result) visible without scrolling at each state?
- Does long content (AI output, lists, markdown) push primary actions below the fold?
- Is the same information rendered in multiple places with slightly different styling?
- Do secondary surfaces (history, logs, metadata) compete for visual weight with primary workflows?

*Anti-patterns:* CTA buried under 3+ scroll heights of output; duplicated rendering with drift; "always visible" sections that are rarely needed.

#### C. Error handling and recovery

- Does the error state tell the user what went wrong, whether retrying makes sense, and what action to take?
- Are errors categorized (transient, parse/model, permanent/user) with different recovery paths?
- Are secondary failures (background saves, list loads, deletes) surfaced or silently swallowed?
- Does error recovery preserve user context or reset everything?

*Anti-patterns:* generic "Try Again" that resets all state; silent failures that look like empty results; identical error display for all error types.

#### D. Missing affordances

- At each state, what does the user want to do that no button or link offers?
- Can the user preview results, compare before/after, or undo a destructive action?
- Is plan usage / cost communicated before an action that consumes a limited resource?
- Are there actions the user has to perform outside the surface that could be brought in-line?

*Anti-patterns:* no preview after a transformation; no undo or revert; cost/usage hidden until the limit is hit; recovery requires download + re-upload instead of a single action.

#### E. Consistency and patterns

- Do similar actions use the same confirmation pattern (all inline, or all dialog, or all none)?
- Is button visual weight (primary, secondary, text link) proportional to importance in every state?
- Are shared UI patterns (upload, progress, preview, error) rendered from shared code or duplicated?
- Do labels, icons, and placement follow the same vocabulary across states?

*Anti-patterns:* mix of native `confirm()` and inline confirmations; primary-weight buttons for secondary actions; duplicated markup for the same pattern in different branches.

#### F. Accessibility

- Do progress indicators have ARIA roles and live-region attributes?
- Do icon-only buttons have accessible labels (`aria-label` or visually hidden text)?
- Are modals/panels keyboard-navigable (Escape to close, focus trap, tab order)?
- Are decorative vs interactive elements correctly marked?

*Anti-patterns:* `<div>` with `onclick` but no keyboard handler or role; icon buttons with no label; progress bars with no `role="progressbar"`.

### Step 3 — Write the spec

Produce a spec with this structure:

```
# [Surface Name] — Usability Audit

**Status:** Proposed
**Audience:** Product and engineering
**Related:** [links to prior specs, design docs]

---

## 1. Problem
[1-2 paragraphs: what this surface does, why an audit is warranted, and a bullet summary of the issue categories found.]

## 2. Goals
[Numbered list: what "good" looks like after fixes are applied.]

## 3. Non-goals
[Bullet list: what is explicitly out of scope.]

---

## 4. Findings

[Rating key:]
> Severity: **High** = blocks or confuses most users; **Medium** = friction for some users or edge cases; **Low** = polish or minor annoyance.
> Effort: **S** = < 1 hour, localized change; **M** = 1–4 hours, touches multiple places; **L** = half-day+, new component or significant restructure.

### A. Flow and orientation
#### A1. [Finding title]
**Severity:** X | **Effort:** X
[Description: what is wrong, why it matters, who it affects.]
**Recommendation:** [Concrete fix. Name the function, component, or UI element to change. Offer alternatives if relevant.]

[... repeat for each finding across all six categories A–F ...]

---

## 5. Implementation phases

### Phase 0: Quick wins (S effort, high impact) — target before [milestone]
| # | Finding | Change |
|---|---------|--------|
[table rows]

### Phase 1: [Theme] (M effort, high impact) — target for [milestone]
[table]

### Phase 2: [Theme] (M effort, medium impact) — [timeline]
[table]

### Phase 3: [Theme] (L effort) — [timeline]
[table]

---

## 6. Files affected (Phase 0–1 scope)
| File | Changes |
|------|---------|
[table rows with specific file paths and one-line change descriptions]

---

## 7. Open questions
[Numbered list of decisions that need product/design input before implementation.]
```

### Rules

- **Ground every finding in code.** Name the specific state variable, template branch, function, or component. Do not write vague "the UX could be better" observations.
- **Be concrete in recommendations.** Say "add a button that calls `togglePreview('resume')`" not "consider adding a preview."
- **Include severity AND effort.** Readers use these to prioritize; omitting either makes the spec less actionable.
- **Phase the work.** Group by effort and impact so the team can ship quick wins before larger restructures.
- **List affected files.** For at least Phase 0–1, enumerate every file that needs a change.
- **Flag open questions.** If a recommendation has meaningful alternatives or needs product input, say so — do not bury ambiguity in the recommendation text.
- **Do not conflate audit with redesign.** The spec identifies and recommends fixes; it does not propose a full UI overhaul unless the findings demand one.
- **Stay honest.** If something works well, do not manufacture a finding. If the surface is in good shape, say so and keep the spec short.

---

## Input

```
[TARGET]: The panel or surface to audit. Examples:
  - "ProfilePanel.svelte (Settings tab)"
  - "JobDetailPanel.svelte (all tabs)"
  - "The onboarding flow (signup + first import)"

Audit [TARGET] using the methodology above. Save the spec at specs/<target>-usability-audit.md
and add a backlog entry linking to it.
```

---

## Run Logging

After completing the audit, add a backlog entry (e.g., `TODO.md`) under the most relevant section with:

- `[ ]` checkbox (open — the audit is proposed, not implemented)
- Title: **`[Surface] usability audit`**
- One-line summary of finding count and key themes
- Link to the spec
