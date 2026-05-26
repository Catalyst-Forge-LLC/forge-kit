# Product Feedback to Spec

Turn raw user product feedback (notes, quotes, bullets, or a transcript) into a concise, implementation-ready spec. Use this when you have feedback from a user interview, support ticket, or internal review and need a structured document engineers and PM can act on.

---

## How to Use

1. Paste this entire file (or from **Instructions** downward) into an AI assistant.
2. Append the raw feedback under **Input**, or paste it after the prompt in the same message.
3. Save the resulting spec under `[specs/]` (e.g. `[specs/product_feedback_YYYY-MM-DD_<short-name>.md]`) if you want it tracked in-repo.

---

## Instructions

You are a product-minded engineer. The user will provide raw product feedback below.

Your job is to produce a **concise implementation-ready spec**, not a summary essay.

### Output structure (use these headings)

1. **Source** — One line: who/when/context if given; otherwise `Unattributed`.
2. **Problem statement** — What is broken, missing, or confusing? One tight paragraph.
3. **User goal** — What the user is trying to accomplish in their own terms (1–3 sentences).
4. **Scope**
   - **In scope** — Bullets: what we should change or add.
   - **Out of scope** — Bullets: what we explicitly won’t do in this iteration.
5. **Proposed behavior** — Step-by-step or bullet “when user does X, system does Y.” Be specific enough to implement.
6. **Acceptance criteria** — Numbered, testable checks (Given/When/Then or checkbox style).
7. **Edge cases & risks** — Short list (empty states, permissions, performance, abuse, copy/legal if relevant).
8. **Open questions** — Numbered questions for PM/design/engineering; mark **Blocking** where needed.
9. **Suggested priority** — P0 / P1 / P2 with one-line rationale.

### Rules

- Prefer **decisions** over vague options; if the feedback is ambiguous, state assumptions in **Open questions** and still propose a default.
- Separate **facts from the feedback** vs **your inference**; label inference when it matters.
- If the feedback touches multiple features, split into **Spec A / Spec B** or **Primary / Follow-up**.
- Keep the whole doc skimmable: short paragraphs, bullets, no filler.

---

## Multi-Source Feedback Analysis (brainstorm then bucket)

_Use this when you have feedback from multiple users, interviews, or sources and need to identify patterns before writing individual specs. This is affinity mapping formalized as a repeatable process._

**Step 1: Generate the observation inventory.** From all feedback sources (interview transcripts, support tickets, NPS comments, user testing notes, app store reviews), extract every distinct observation — a quote, a behavior, a complaint, a request, a confusion, a delight. One observation per line. Do not filter or interpret yet. Aim for 50-200 observations depending on the volume of source material.

> 📝 **Example prompt:** "Here are transcripts from [N] user interviews about [product/feature]. Extract every distinct observation — things users said, did, struggled with, requested, praised, or got confused by. One observation per line. Include the source (User 1, User 2, etc.) for traceability. Do not summarize or group yet."

**Step 2: Bucket against hypothesized themes.** Define 5-8 themes that represent your hypotheses about what users care about. These might be:

- User goals (what they are trying to accomplish)
- Pain points (what frustrates them)
- Feature requests (what they explicitly ask for)
- Mental model gaps (where their expectations diverge from the product's behavior)
- Delights (what they value and don't want to lose)
- Workflow context (what they do before and after using your product)

Score each observation against the themes. An observation may land in multiple themes.

**Step 3: Review for research signals.**

- **Observations that land in 3+ themes** — these represent core user needs that cut across concerns; they often point to the most impactful product changes
- **Themes with many observations** — these are validated concerns worth acting on
- **Themes with few observations** — either you didn't ask about them (probe in the next round) or they are not real user priorities (deprioritize)
- **Observations that don't fit any theme** — the most valuable output of this step. These are signals your hypotheses missed. Cluster the unfitted observations and ask: is there a theme here you didn't anticipate?

**Step 4: Feed into specs.** Each theme with sufficient signal becomes a spec (use the output structure above). Themes with weak signal become hypotheses for the next research round. Cross-theme observations inform architectural decisions (they suggest interconnected features, not isolated fixes).

---

## Input

[PASTE RAW FEEDBACK HERE]
