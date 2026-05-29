# UX Cohesion Audit

Whole-app, fresh-eyes read of where a product **confuses, blocks, distracts, or fails to delight** — everything that stops a user from *falling in love* with the app. Unlike a single-surface usability pass, this audit looks at the product as **one experience** and surfaces the cross-cutting "feels like N apps stitched together" problems that are invisible when you review surfaces in isolation. Produces a prioritized findings spec that **points at existing specs instead of re-speccing them**.

Use this when an app has matured enough that individual features are solid but the *whole* doesn't yet feel like one calm, trustworthy instrument — typically before a beta/launch, after a burst of feature work, or as a periodic "is this lovable yet?" check.

> **Companion prompts:** `panel-usability-audit.md` goes deep on *one* surface; this goes wide across *all* of them. `pre-launch-audit.md` focuses on operational/launch readiness (legal, billing, backups, errors); this focuses on the *experiential* layer. Run them together for full coverage.

---

## How to Use

1. Give this prompt to an AI assistant with **full codebase access**.
2. Optionally name a focus or exclusions (`[SCOPE]` below). Default scope is the entire authenticated product experience.
3. The assistant does a read-only pass over the app shell, navigation, onboarding, every primary surface, and the existing spec/doc corpus, then writes one findings spec.
4. Save the spec at `specs/ux-cohesion-audit.md` (or `<area>-cohesion-audit.md` if scoped) and add a backlog entry.

---

## Instructions

You are a product-minded design engineer doing a **whole-app UX cohesion audit**. The goal is to find everything that could confuse, block, distract, or otherwise prevent a user from falling in love with this app — and to capture it in a single, prioritized, honestly-scoped spec.

Your north star: **"Does the whole thing feel like one calm, trustworthy instrument, or like N strong screens stitched together?"** You are looking for the gap between *competent* and *beloved*.

### Step 0 — Avoid double-work (read the existing corpus first)

Before auditing anything, inventory what's **already captured** so you do not re-spec owned work:

- Read the spec folder(s) (`specs/`, `specs/partial/`, `specs/completed/`) and any docs index (`docs/`, design system, brand/product docs, test plan, code-health, backlog).
- Build a map of which UX concerns **already have an owning spec** (e.g. visual consistency, information architecture, error handling, onboarding latency, keyboard shortcuts, save model).
- For anything already owned, you will **point at it**, not rewrite it — note only the *experiential residue* or a reprioritization, not a fresh design.

If a prior whole-app UX/cohesion audit already exists, treat this run as an **update**: reconcile against it, mark what shipped, and add only new findings.

### Step 1 — Inventory the whole experience (read-only)

Read enough to build a real mental model of the product as a user moves through it. Cover at minimum:

- **App shell** — the root layout / main page: navigation, global chrome, panel/modal launching, URL state, loading and empty states.
- **Entry & onboarding** — auth/landing, first-run wizard, the path from "signed up" to "first real artifact / first win." Note where the brand *promise* and the first-run *reality* diverge.
- **Primary surfaces** — every major panel/page/drawer and its tabs/sub-tabs. Note nesting depth (panel → panel → modal) and wayfinding cost.
- **The core object's detail view** — wherever the user spends the most time (the record/document/item workspace). Map its tabs, edit buffers, and save behavior.
- **Cross-surface flows** — links that jump between surfaces; do they stack, replace, or orphan the user?
- **System feedback** — how success, in-progress, failure, empty, and stale states are expressed across surfaces. Look specifically for **silent failures** (swallowed errors, no toast) and **inconsistent acknowledgement**.
- **Async / AI / long-running work** — anywhere the app does background work; is "where did my thing go?" answered consistently?
- **Mobile / responsive** — the top journeys at a narrow width.
- **Accessibility (cohesion-relevant)** — focus management at panel/modal depth, keyboard model, color-only signaling.

Ground everything in code: name the file, component, state variable, or template branch. Verify ambiguous claims against source.

### Step 2 — Two lenses

Analyze through **both** lenses. The first is what makes this audit different from a per-surface review.

#### Lens A — Cross-cutting themes ("feels like N apps")

These are meta-findings: individually small, collectively the difference between competent and loved. Hunt explicitly for:

1. **Inconsistent interaction models for the same job** — e.g. some edits autosave, some need a Save button, some persist instantly, with nothing signaling which. Same for confirmation patterns, error display, progress UX.
2. **Uneven or silent feedback** — operations that succeed loudly in one place and silently in another; swallowed `catch` blocks with no user signal; native `alert()`/`confirm()` next to polished dialogs.
3. **Discoverability that depends on the user opting in** — high-value capabilities only findable via tour/tooltip/help, never taught by the UI itself.
4. **Missing global affordances** — no keyboard model (`/`, new, `?`, `Esc` discipline), no command surface, for an audience that expects them.
5. **Fragmented system legibility** — background work, AI runs, or multi-step processes whose status is expressed differently everywhere, so the user never builds one mental model.
6. **Vocabulary / state drift** — the same concept (empty / loading / generating / stale / saved) rendered with different copy and chrome per surface.

#### Lens B — Surface-by-surface findings

Walk the product and capture concrete issues, organized by area (onboarding & first run; navigation & wayfinding; the core detail view; feedback/errors/trust; loading/empty/in-between states; visual & interaction craft; mobile; accessibility; **delight**). For each, ask:

- **Confuse:** would a capable new user be unsure what to do or where they are?
- **Block:** is there a dead end, a lost-work risk, or a step that fails without recovery?
- **Distract:** does something pull attention from the task (noise, redundant info, competing weight)?
- **Delight gap:** is there a moment the app *sets up* but doesn't cash in (first artifact, a milestone, "your single next best move")?

### Step 3 — Severity & effort

Rate every finding:

- **Critical** — actively blocks, breaks trust, or makes the app feel broken/unsafe. Fix before broad beta.
- **High** — recurring friction/confusion that erodes the product's core promise.
- **Medium** — polish that compounds; the "good → loved" gap.
- **Low** — nice-to-have / future delight.
- **Effort:** XS / S / M / L.

Treat **delight** as first-class, not filler: a few "turn good into loved" opportunities belong in every cohesion audit.

### Step 4 — Write the spec

Produce one spec with this shape (adapt headings to the app; keep it honest and skimmable):

```
# UX Cohesion Audit — friction, confusion, and delight gaps

**Status:** Draft — not started
**Audience:** Product + engineering — a whole-app read of where the experience
confuses, blocks, distracts, or fails to delight.
**Related:** [link every owning spec/doc you found in Step 0]

## 1. Why this spec exists
[What the app is, the cohesion risk, and that this catalogs gaps NOT already owned
by other specs, plus cross-cutting themes. State the method.]

## 2. How to read the severity
[The Critical/High/Medium/Low + effort key.]

## 3. Cross-cutting themes (the "feels like N apps" problem)
[T1..Tn — the Lens A meta-findings. For each: what, why it matters, current state,
recommendation. Where a theme is partly owned by another spec, say so and add only
the residue.]

## 4..N Surface areas
[One section per area from Lens B. Each finding: ID, severity, what, why it matters,
current state (with file/component references), recommendation, effort.]

## Delight
[D1..Dn — opportunities to convert "good" into "loved."]

## Prioritized plan
[Three tiers as tables: pre-beta (trust / "not broken") → early beta (cohesion) →
beta iteration (loved). Each row: finding, effort.]

## Relationship to existing specs (no double-spec)
[Table: theme here | owned by | what this audit ADDS. Critical for not re-speccing.]

## Open questions
[Decisions needed before implementation: scope of first pass, ambition level,
ownership of "addition" items, etc.]
```

### Rules

- **Point, don't duplicate.** If a concern already has an owning spec, link it and add only the experiential residue or a reprioritization. The "Relationship to existing specs" table is mandatory.
- **Ground every finding in code.** Name the file/component/state/branch. No vague "the UX could be better."
- **Concrete recommendations.** Say what to change and roughly how, not "consider improving."
- **Severity AND effort on every finding.** Readers prioritize with both.
- **Lens A is the point.** A per-surface bug list alone is the *other* prompt; this one must surface the cross-cutting themes.
- **Delight is required.** Include a few honest "good → loved" opportunities.
- **Stay honest.** Don't manufacture findings; if a surface is strong, say so. If the app is in good shape overall, keep the spec short.
- **Don't conflate audit with redesign.** Identify and recommend; do not propose a full UI overhaul unless findings demand it.
- **Keep internal references out of UI copy.** Recommendations for user-facing text must not leak internal spec names or file paths into the product.

---

## Input

```
[SCOPE] (optional): default = entire authenticated product experience. Narrow if
  desired, e.g. "everything except admin panels" or "the primary pipeline flows."

Run the UX cohesion audit using the methodology above. Read the existing spec/doc
corpus FIRST (Step 0) so you point at owned work instead of re-speccing it. Save the
spec at specs/ux-cohesion-audit.md (or specs/<area>-cohesion-audit.md if scoped) and
add a backlog entry linking it.
```

---

## Run Logging

After completing the audit:

- Add a backlog entry (e.g. `TODO.md`, open `[ ]`): title **`UX cohesion audit`**, a one-line summary of the cross-cutting themes + top pre-beta items, and a link to the spec.
- A brand-new audit spec lands in `specs/` (drafts). Once any finding is implemented, move it to `specs/partial/` per your spec-lifecycle convention.
- If this run produced a generally-reusable lesson (a new cross-cutting pattern worth enforcing), consider running `propagate-to-forgekit.md`.
