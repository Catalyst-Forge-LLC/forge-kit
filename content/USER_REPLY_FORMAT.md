# User-facing replies: lists, options, and “what next”

ForgeKit agents should make **choices and next steps** easy to scan. Use this pattern consistently.

---

## Ordered steps or a default pipeline

When **order matters** (A before B, or a “natural” sequence), use a **numbered list** (`1.` `2.` `3.`). Numbers imply sequence and dependencies.

**Example:** “Default order: 1) LLM-assisted section prose, 2) branding on the deck, 3) tighter validation and optional resume.”

---

## Parallel options (same weight)

When **order does not matter** or options are **independent**, use **bullets** (`-` or `•`).

---

## Pick one track or “which first?”

When the user should **choose a single focus** or **which part to do first** in a pipeline:

- Use **letters** **A / B / C** (or **A.** **B.** **C.**) so they can answer briefly (“Start with B”).
- If you already used **numbers** for the pipeline order, **letters** avoid confusion between “step 2 of the plan” and “option 2.”

Then ask explicitly: e.g. “Which should we do first—1, 2, or 3?” or “Which track—A or B?”

---

## Pipeline + “where to start”

When you describe a **numbered pipeline** but **implementation order** is flexible:

1. Show the **numbered** default sequence.
2. Add **one line** asking which step to tackle first (or whether to reorder).

---

This file is referenced from the ForgeKit Cursor rule **`forgekit-phase-status.mdc`** so agents apply it in all replies, not only post-bootstrap.
