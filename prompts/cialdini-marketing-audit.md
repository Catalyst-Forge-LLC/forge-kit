# Cialdini Influence Audit for Landing Page & Marketing

Audit your landing page, pricing section, and product touchpoints through the lens of Robert Cialdini's seven principles of influence (_Influence_ and _Pre-Suasion_). Produces a prioritized list of specific copy, UI, and structural changes that strengthen conversion without compromising brand authenticity.

---

## When to Run

- Before spending on paid acquisition channels
- After building your landing page but before launch
- When conversion rates plateau and you need a structured diagnostic

## Prerequisites

Read these documents fully before beginning the audit:

1. **BRAND_AND_PRODUCT.md** — voice, positioning, audience, what you're NOT
2. **BUSINESS_PLAN.md** — pricing, target segment, growth channels
3. **The landing page source code** — actual copy, layout, CTAs, pricing cards
4. **Any existing social proof** — testimonials, user counts, press mentions

## The Seven Principles — Audit Framework

For each principle, assess:

1. **Current state:** What's already in place (even partially)?
2. **Gap severity:** Critical / Medium / Low / N/A
3. **Prescriptions:** Specific, implementable changes with exact copy suggestions
4. **Implementation priority:** Effort vs. impact ranking

### 1. Social Proof

> "People follow the lead of similar others."

Check for: user counts, testimonials, logos, outcome data, case studies, activity indicators, success stories. Social proof is consistently the #1 conversion driver for SaaS landing pages.

Prescriptions to consider:

- **Aggregate proof counters** — "[N] [users] have [done X] this month." Even small numbers work if framed as curated.
- **Outcome-framed testimonials** — Quote focused on the _experience_, not the tool. Include title level, not name.
- **Peer specificity strip** — "Built for [Title A] · [Title B] · [Title C]." The titles are the proof that peers use this.
- **Activity ticker** — Real-time anonymized activity. Only show when real data exists — never fabricate.

### 2. Authority

> "People defer to credible experts."

Check for: domain expertise signals in copy, methodology framing, external validation (press, endorsements), builder credentials.

Prescriptions to consider:

- **Domain expertise in feature copy** — Name specific tools, platforms, or methods your audience recognizes. Generic descriptions like "analyzes your resume" are weaker than "shows how [specific platform] will parse your resume."
- **Methodology authority** — Frame your approach as borrowed from established practice: "The [methodology] is standard practice at [credible entities]."
- **Builder credibility** — If the founder has relevant credentials, a one-line note adds authority. Only if authentic.

### 3. Scarcity

> "People want more of what they can have less of."

Check for: trial expiration framing, loss language, natural urgency signals. For professional audiences, manufactured urgency (countdown timers, limited slots) backfires badly.

Prescriptions to consider:

- **Loss-framed trial CTA** — Name what stops working after trial, don't just say "upgrade." "After [N] days, [specific features] lock — but everything you built stays."
- **Bandwidth scarcity** (natural) — "Your [search/project/window] is finite. Every week without [your value prop] is a week of [concrete cost]."
- **Opportunity cost anchor** — Professional service comparisons placed ABOVE the pricing grid, not below. Cialdini's contrast principle requires the expensive reference point before your price.

**Do NOT do:** Fake countdown timers, limited-slot messaging, or "only X left" tactics for professional audiences.

### 4. Reciprocity

> "People feel obligated to return favors."

Check for: free value before asking for commitment, trial generosity, useful content without paywall.

Prescriptions to consider:

- **Generous trial scope** — Full access during trial (not feature-limited). Give the best experience before asking for money.
- **Free tools / content** — One genuinely useful feature or resource that works without signup.

### 5. Commitment & Consistency

> "People align with their prior commitments."

Check for: progressive engagement, micro-commitments before the purchase decision, sunk-cost visibility.

Prescriptions to consider:

- **Progress visibility** — Show users what they've built during trial. "You've created N [items], customized M [things], and researched K [entities]."
- **Friction-free trial start** — No credit card upfront. Each setup step is a micro-commitment that increases switching cost.

### 6. Liking

> "People prefer to say yes to those they like."

Check for: brand personality, visual warmth, origin story, relatability.

Prescriptions to consider:

- **Origin story** — If authentic, a brief "why I built this" narrative builds parasocial connection.
- **Visual warmth** — Warm color palettes, friendly (not clinical) UI feel. The design system itself is a liking signal.

### 7. Unity

> "People assent to those they see as 'one of us.'"

Check for: shared identity signals, in-group language, community belonging.

Prescriptions to consider:

- **Identity language** — "[You're not an applicant, you're a [identity term]]." Status-elevating self-concept.
- **Shared experience naming** — Reference specific frustrations your audience has. "You've been asked 'what's your current salary expectations?' three times this week."

## Output Format

For each principle, produce:

```markdown
### [Principle Name]

**Current state:** [What exists]
**Gap severity:** [Critical/Medium/Low]
**Prescriptions:**
| # | Tactic | Where | Copy / Detail | Priority |
| --- | --- | --- | --- | --- |
```

Then a summary section:

```markdown
## Implementation Priority

| Phase | Tactic IDs | Effort | Expected Impact |
```

## Constraints

- **Honest over manipulative.** Every persuasion tactic must be grounded in truth. Never fabricate social proof, manufacture urgency, or claim credentials that don't exist.
- **Audience-calibrated.** Professional audiences are skeptical. Tactics that work for consumer products (countdown timers, hype language) damage trust here.
- **Brand-consistent.** All copy suggestions must match the established brand voice. Read BRAND_AND_PRODUCT.md before writing any copy.
- **Actionable specificity.** Don't just say "add social proof." Say exactly what to add, where, and with what copy.
