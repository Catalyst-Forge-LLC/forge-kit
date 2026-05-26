# Competitor Deep Dive

A reusable prompt for producing a structured competitive analysis document. Takes a competitor URL, researches their product thoroughly, compares it against your own positioning and features, and outputs a strategic comparison doc. Works for any product-to-product comparison where you have brand, business, and feature documentation.

---

## When to Run

- When you discover a direct or adjacent competitor
- Before major positioning or pricing decisions
- When prospects ask "how are you different from X?"

## Prerequisites

Provide:

1. **The competitor's URL** — the public website to research.
2. **BRAND_AND_PRODUCT.md** — your product's voice, positioning, audience, and emotional framing.
3. **BUSINESS_PLAN.md** — your product's pricing, growth strategy, and market positioning.
4. **The product feature source** — the component, doc, or spec that lists all current features with descriptions.
5. **USER_PITCH.md or equivalent** — the narrative framing used to describe your product to prospects.

Read all internal docs fully before beginning competitor research.

---

## The Prompt

You are a product strategist and competitive intelligence analyst. You are about to produce a deep-dive competitor comparison document.

### Phase 1: Competitor Research

Fetch and analyze the competitor's public-facing pages. At minimum:

- **Homepage** — tagline, hero copy, value proposition, social proof claims, testimonial titles/industries
- **Pricing page** — all tiers, prices, billing cadence, feature gating, free tier details
- **Features page** (if separate) — full feature list with descriptions
- **How-it-works flow** — what the user does vs. what the product does
- **Footer links** — look for "For Business," "Partners," "Comparisons," "About Us" for additional positioning signals

Extract and organize:

| Data Point                 | What to Capture                                                                 |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Tagline / hero claim**   | Exact text                                                                      |
| **Core value proposition** | One-sentence summary of what they promise                                       |
| **Target audience**        | Inferred from testimonials, copy, pricing, and use cases                        |
| **Pricing**                | All tiers with prices and key limits — normalize to monthly for comparison      |
| **Feature list**           | Every distinct feature with a one-line description                              |
| **Social proof**           | User counts, press mentions, testimonial job titles                             |
| **Philosophy**             | Implicit product philosophy (automation vs. strategy, volume vs. quality, etc.) |
| **What they DON'T do**     | Gaps, missing categories, explicit disclaimers                                  |

### Phase 2: Internal Product Catalog

From the internal docs, build the equivalent catalog for your own product:

- Target audience (titles, seniority, context)
- Pricing tiers with limits and key differences
- Complete feature list organized by category
- Product philosophy and explicit non-goals
- Current social proof assets (or lack thereof)

This side of the comparison should be **factual and current** — based on what's shipped, not what's planned.

### Phase 3: Positioning Comparison

Write a side-by-side positioning table that captures the strategic differences:

| Dimension            | Questions to Answer                                              |
| -------------------- | ---------------------------------------------------------------- |
| **Tagline**          | What does each product lead with?                                |
| **Core promise**     | What outcome does each product sell?                             |
| **Philosophy**       | Volume vs. quality? Automation vs. control? Speed vs. depth?     |
| **Automation model** | What does the product do autonomously vs. what does the user do? |
| **User's role**      | Passive (set-and-forget) vs. active (judgment-centric)?          |
| **Input required**   | What does the user provide, and how often?                       |
| **Output delivered** | What does the user get back?                                     |

### Phase 4: Feature Matrix

Build a detailed feature comparison organized by functional category. Adapt categories to the actual products being compared.

For each feature:

- ✅ = core feature, available on most/all plans
- ⚡ = available but gated (higher tier only)
- ❌ = not offered
- Add a brief note where implementations differ meaningfully

Don't inflate your product's capabilities or minimize the competitor's. Honest assessment builds trust with anyone reading this doc internally.

### Phase 4b: Feature/Positioning Vocabulary Expansion (brainstorm then bucket)

_Optional enrichment step. Run this after the feature matrix to discover comparison dimensions you missed._

**Step 1: Generate a capabilities vocabulary.** From both products, the broader market, and adjacent categories, generate a flat list of 80-120 capabilities, claims, and positioning concepts — not just features, but also claims about outcomes, philosophies, and audience signals. Include capabilities neither product has but that buyers might expect.

> Example: For a career tool comparison, this list would include not just "resume tailoring" and "ATS scoring" but also "employer branding signals," "salary benchmarking," "interview scheduling," "alumni network access," "executive presence coaching," "board placement" — capabilities that define the edges of the competitive space.

**Step 2: Bucket against your differentiator categories.** Score each capability against your product's core differentiator dimensions (from BRAND_AND_PRODUCT.md "What Makes It Different" and the Phase 3 positioning comparison). For each capability, ask: which differentiator dimension(s) does this serve?

**Step 3: Review for strategic signals.**

- **Capabilities that land in multiple differentiator dimensions** — these are high-leverage features worth building or emphasizing
- **Differentiator dimensions with very few capabilities** — either the dimension is thin (reconsider it) or there is genuine whitespace (opportunity)
- **Capabilities that don't fit any dimension** — potential new competitive axes or features to explicitly declare out of scope
- **Capabilities the competitor has that you bucketed into YOUR differentiator** — these threaten your positioning and deserve attention in the threat assessment

**Step 4: Feed into Phases 5-7.** The enriched capability map makes the strengths analysis (Phase 5) and strategic implications (Phase 7) more complete. Capabilities you discovered in this step that neither product offers become roadmap candidates or explicit non-goals.

### Phase 5: Competitive Strengths

Two sections:

#### Where the Competitor Wins

List 5–8 genuine advantages the competitor has. For each:

- State the advantage concretely
- Note why it matters to their target audience
- Assess whether it matters to YOUR target audience (it may not)

#### Where You Win

List 5–8 genuine advantages your product has. For each:

- State the advantage concretely
- Note why it matters to your target audience
- Assess whether the competitor could close this gap easily (incremental improvement vs. architectural rebuild)

### Phase 6: Threat Assessment

#### Direct Competition Risk

Rate as **High**, **Medium**, or **Low** with a one-paragraph justification. Consider:

- Audience overlap (do you fight for the same users?)
- Feature substitutability (could one replace the other?)
- Price comparison (does the cheaper one cannibalize the expensive one?)
- Switching costs (how easy is it to move between them?)

#### Indirect Risks

| Risk                     | Severity | Notes                                                  |
| ------------------------ | -------- | ------------------------------------------------------ |
| Category confusion       | ?        | Will prospects lump you together and compare on price? |
| Feature creep from below | ?        | Could they incrementally add your differentiators?     |
| SEO / discoverability    | ?        | Do they dominate your keyword space?                   |
| Social proof gap         | ?        | Do they have stronger credibility signals?             |
| Upstream platform risk   | ?        | Do they control a distribution channel you depend on?  |

#### Non-Threats

Explicitly list competitive scenarios that look scary on the surface but aren't real risks — and explain why. Prevents reactive decision-making.

### Phase 7: Strategic Implications

Organize recommendations into three buckets:

#### Messaging

- How to frame your product when prospects have seen the competitor
- Language to use (and avoid) to prevent category confusion
- Right comparison anchor for pricing (other tools? professional services? opportunity cost?)

#### Product

- Competitor features worth building — because they serve YOUR audience, not just because the competitor has them
- Competitor features to explicitly NOT build — because they conflict with your positioning
- Where to leapfrog instead of matching

#### Go-to-Market

- Search terms, content topics, and channels the competitive landscape suggests
- How testimonials and social proof need to differ from the competitor's
- Partnerships, integrations, or channels the competitor's model can't access

## Constraints

- **Accuracy over advocacy.** This is an internal strategic tool, not marketing copy. Be honest about where the competitor is stronger.
- **Evidence-based claims.** Every claim about the competitor should trace back to their public pages. Every claim about your product should trace back to shipped code or published docs. Don't compare your roadmap to their current product.
- **Audience awareness.** A feature critical for their audience may be irrelevant to yours. Always contextualize through the lens of who actually uses each product.
- **No manufactured urgency.** If the competitive threat is low, say so. The most useful output is an accurate landscape read, not an argument for panic.

## Output Format

Save as `docs/COMPETITOR_[NAME].md` with:

```
# Competitor Analysis: [Competitor] vs. [Your Product]
## Executive Summary (3–5 sentences)
## Positioning at a Glance (table)
## Target Audience (table)
## Pricing Comparison (tables with analysis)
## Feature Comparison Matrix (categorized tables)
## Competitive Strengths (two sections: theirs and yours)
## Threat Assessment (direct risk + indirect risks table + non-threats)
## Strategic Implications (messaging, product, go-to-market)
## Summary (2–3 sentence capstone)
```
