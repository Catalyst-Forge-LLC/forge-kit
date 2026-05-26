# [APP NAME] — Growth Plan

_Post-launch growth strategy. This plan activates after initial traction confirms product-market fit._

> 💡 **Lesson learned:** Separate launch marketing from growth marketing.
> Launch is about getting the first 50-100 users through personal outreach and hustle.
> Growth is about scalable channels that work without you personally in the loop.
> Don't spend money on growth channels until organic traction confirms product-market fit.

---

## Prerequisites

This plan activates after launch has established:

- [N]+ paying users with [N]+ testimonials from target persona
- At least [N] active referral partners/affiliates (if applicable)
- A proven organic channel generating measurable signups
- Clear signal on which messaging resonates

Do not spend money on growth channels until organic traction confirms product-market fit.

---

## Competitive intelligence: paid social screenshots (optional)

> 🔧 **Guidance:** Use this when competitors in your category run heavy **paid social** (Meta, LinkedIn, TikTok, etc.) and you need grounded positioning — not guesswork.

**Pattern:**

1. **Archive a dated corpus** — e.g. `screenshots/ads/` with mobile/desktop captures and rough date range in a README or spec header.
2. **Pair with a project prompt** — instructions for an agent to read each image, extract brand, headline, CTA, **numeric claims**, and assign each ad to a **small taxonomy** (e.g. automation-at-scale vs. coaching vs. agency vs. lead-magnet quiz vs. contrarian teardown).
3. **Write a landscape spec** — what narratives are saturating the feed, what your product already displaces, what is **honest whitespace** for the roadmap, and a **copy guardrail list** (patterns to avoid echoing in your own marketing — unsourced statistics, guaranteed outcomes, superiority tropes your ICP distrusts).
4. **Feed outputs into** `BRAND_AND_PRODUCT.md`, FAQ, and in-app tips — without treating competitor hype as fact.
5. **Optional: stakeholder-facing mirror in `docs/`** — If the full analysis lives under `specs/` (long tables, screenshot inventory), add a **`docs/COMPETITIVE_LANDSCAPE.md`** (or similar) that stays **synced** from the spec via a tiny script + `pnpm` script. Rewrite relative links when the output file sits in a different folder. Instruct your competitive-review prompt (and humans) to **update the spec and re-run sync** so founders and marketing read `docs/` without forking content by hand.

**Why:** Scroll-feed creative shows what buyers are being trained to expect. You differentiate more clearly when you name those narratives and consciously **don't** recycle their weakest tactics.

> 💡 **Lesson learned:** Re-run the review when you add a batch of new screenshots; append to the spec or version the summary so positioning stays current as ad land shifts.

---

## In-product education (contextual tips)

> 🔧 **Guidance:** Competitive and positioning research often yields **high-signal, low-hype** lessons (e.g. precision over volume, when to use automation vs judgment). Those belong in **`BRAND_AND_PRODUCT.md`** and landing copy — and can also ship **inside the product** so active users benefit.

**Pattern:**

- **Contextual tips:** Short messages when a surface is empty, first-time, or after a key action; **dismiss** with optional per-tip expiry stored server-side or in `localStorage` so power users aren’t nagged.
- **Cadence surface:** A weekly digest or in-app summary can rotate tips plus **next suggested actions** without turning the product into a course.
- **Tone:** Factual and calm; never import competitor **fear or unverifiable stats** from ad creative. Cross-check new tip copy against your **“fluff to avoid”** list from the competitive spec.

**Why:** Educated users get more value from the same features; in-app education is how positioning survives after signup.

---

## Personal Beta Outreach (Pre-Launch / Launch)

> 💡 **Lesson learned:** Personal network outreach is the highest-converting launch channel, but a single generic message wastes goodwill. The fix is **relationship-warmth buckets** (not job titles) that control tone, length, and offer. Six primary buckets cover most networks: Inner circle (A), Strong professional (B), Warm acquaintance (C), Light/casual (D), **Alumni / former org (E)** when shared employer, program, or cohort **anchors** the message, and Connector (F). Classify on **how the message would land today**, not historical closeness or the person's prestige.

**Key patterns:**

- **Shared skeleton, varied execution:** Every message follows the same 5-part spine (opener, product sentence, beta ask, optional promo, easy out), but the weight of each part shifts by bucket. A is shortest; C is often longest; **E** flexes with how warm the tie is.
- **Product one-liner variants:** Write 4 phrasings of your product in one sentence (full value stack, short/text-friendly, latent-user angle, positioning angle). Use different ones across messages so recipients who compare notes don't see the same rehearsed pitch.
- **AI-tell checklist:** Before sending, scan for sincerity adverbs ("genuinely"), filler openings ("I wanted to reach out"), repeated flattery formulas, identical value-stack lists across messages, three-part feedback requests, brand-doc copy leaking into personal messages, and structural parallelism across buckets. These are consistent tells that recipients recognize as template-generated.
- **Promo code per bucket:** One distinct code per bucket (or per bucket x month) for attribution. Most generous trial extension for A, most conservative for D. Tighten caps/expiry for buckets where codes might spread.
- **Connector bucket (F):** De-emphasize personal trial ("more about your network than about you personally"). Offer a brief walkthrough. Make forwarding frictionless.
- **Forwardable blurb:** Provide a stripped-down, no-personal-framing version suitable for anyone to forward to a stranger. Include product pitch, audience line, trial link, and code.

**Prompt:** See `prompts/personal-beta-outreach.md` for a full playbook generator.

---

## Growth Audiences

### Primary: [Your Core Buyer — Scaling Acquisition]

Same audience as launch, now reached through scalable channels instead of personal outreach.

### Secondary: [Channel Partners / Affiliates — Scaling the Pipeline]

> 💡 **Lesson learned:** For B2C products targeting professionals,
> career coaches, outplacement firms, and industry consultants can be powerful
> distribution partners. The key is giving them a dashboard so they can see ROI.
> Identify the professional who already serves your buyer and make them a partner.

- Expand from initial partners to [N]+ active affiliates
- Build a partner dashboard (partners need to see ROI)
- Target industry conferences, professional associations, certification programs

### Tertiary: [Adjacent Audience]

- **Who:** [Describe the audience that's one step away from your core buyer]
- **Acquisition channels:** [Where they hang out]
- **Note:** [Why they matter — often they grow into the primary segment]

### Opportunity: [B2B / Enterprise Angle] (if applicable)

> 💡 **Lesson learned:** B2B opportunities often emerge from B2C products.
> A company buying 50 seats at $89/seat/month is $53K ARR from a single sales conversation.
> But wait until Month 6+ when you have individual user testimonials and case studies.

- **Who:** [Business buyers who would purchase for their team/employees]
- **Pain:** [What they currently pay for and why your product is better]
- **Conversion trigger:** [Free pilot, case study, ROI calculator]
- **Timing:** Month 6+, once individual user proof exists

---

## Growth Channels

### 1. Content Marketing & SEO (Month 3+)

**Goal:** Rank for queries your target buyer actually types.

**Target keywords:**

> 💡 **Lesson learned:** Research keywords at each stage of the buyer journey:
> - Problem-aware: "how to [solve problem]" (highest volume, broadest)
> - Solution-aware: "[specific solution] for [audience]" (medium volume, higher intent)
> - Comparison: "[your category] vs [alternative]" (lower volume, highest intent)
> - Emotional: "[frustration/pain point]" (surprisingly high volume, low competition)

- "[Problem-aware keyword]" (~volume/mo)
- "[Solution-aware keyword]" (~volume/mo)
- "[Comparison keyword]" (~volume/mo)
- "[Emotional/pain keyword]" (~volume/mo)

**Content cadence:** Start biweekly, scale to weekly by Month 4.

#### Content Topic Expansion (brainstorm then bucket)

_Run this before building your editorial calendar. The goal is to surface content topics you would not have generated from your pillars alone._

**Step 1: Generate a domain keyword vocabulary.** Produce 100-150 keywords, phrases, and questions related to your product's domain. Include all stages of the buyer journey:

- Problem-aware queries ("how to manage a senior job search")
- Solution-aware queries ("executive resume tailoring tool")
- Comparison queries ("[your product] vs [alternative]")
- Emotional queries ("job search burnout at senior level")
- Tactical queries ("how to follow up after executive interview")
- Aspirational queries ("career transition at 50")

> 📝 **Example prompt:** "Generate 150 keywords, phrases, and questions that [your target audience] might type into Google, ask on LinkedIn, or discuss in professional communities about [your domain]. Cover the full range: practical how-to, emotional/frustration, comparison/evaluation, aspirational, tactical, and strategic."

**Step 2: Bucket against content pillars.** Define 4-6 content pillars that map to your value propositions (e.g. Preparation Strategy, Tailoring & Documents, Networking Execution, Interview Mastery, Search Management, Emotional Resilience). Score each keyword/phrase against the pillars. A keyword may land in multiple pillars.

**Step 3: Review for editorial signals.**

- **Cross-pillar keywords** (3+ pillars) — strong candidates for pillar pages or cornerstone content that links to multiple articles
- **Pillar-starved topics** — pillars with few keywords need either a narrower scope or a follow-up keyword generation pass
- **Emotional keywords** — often overlooked in B2B content but high-value for SEO (low competition, high resonance)
- **Keywords that don't fit any pillar** — potential new content category or a signal that a pillar is missing

**Step 4: Feed into editorial calendar.** Map topics to buyer journey stages and assign to the publication cadence. Prioritize cross-pillar keywords (they earn backlinks from multiple internal pages) and emotional keywords (they earn social shares and low-competition rankings).

### 2. Product Hunt & Hacker News (Month 3–4)

> 💡 **Lesson learned:** These are one-shot channels. Preparation matters more than timing.
> Product Hunt: Need 20+ users willing to upvote/comment on launch day, 3 demo GIFs, active founder in comments.
> Hacker News: Lead with the personal story + technical angle. HN respects both.

**Product Hunt:**

- Timing: Tuesday–Thursday, early AM Pacific
- [N]+ users willing to comment and upvote on launch day
- 3 demo GIFs showing the core value proposition
- Active founder presence in comments throughout launch day

**Hacker News "Show HN":**

- Angle: [Personal story + technical story combined]
- Lead with the core value proposition in one sentence

### 3. Podcast Guest Appearances (Month 3+)

**Target podcasts:**

- [Industry-specific podcasts for your target buyer]
- [Adjacent-topic podcasts with overlapping audiences]
- [Indie hacker / bootstrapper podcasts for the founder story]

**Cadence:** 2–3 per month once the pipeline is warm.

### 4. Community Participation (Ongoing)

> 💡 **Lesson learned:** Reddit and niche communities are credibility channels,
> not acquisition channels. Worth maintaining a presence, not worth significant time.
> Never post promotionally. Share expertise, and users will find the product through
> your profile history if the content is good enough.

**Target communities:**

- [Subreddits, forums, Slack/Discord communities]

**Tactics:**

- Answer questions with real depth — share your framework without plugging the tool
- No promotional posts. Let the product speak through your expertise.

### 5. Paid Advertising (Month 4+ — First Experiment)

> 💡 **Lesson learned:** Only run paid after:
> 1. Organic content has proven which messages get highest engagement
> 2. Landing page conversion rate is measurable
> 3. At least 5 testimonials are on the landing page
> Start with $500 test budget and measure CPA before scaling.

**Budget:** $500 initial test, measure CPA before scaling.

**Platform:** [Best platform for your audience's targeting options]

**Creative:** Lead with the core value proposition.

**Only run paid after:**

- Organic content has proven which messages resonate
- Landing page conversion rate is measurable
- At least 5 testimonials are on the landing page

### 6. Conferences & Events (Month 6+ — if applicable)

- Attend [relevant industry conferences]
- Free pilot offers for enterprise prospects
- Case study content from early adopters

### 7. Product-Led Growth Loops (When Built)

> 💡 **Lesson learned:** Identify the natural "share moment" in your product.
> For Exec Foundry, it was a shareable stats card showing anonymized search progress.
> For other products, it might be an invite flow, a public profile, or an embed widget.
> The best virality loops make sharing a natural part of the user's workflow, not a separate ask.

- [Browser extension / integration that surfaces the product in context]
- [Shareable artifact that creates organic social proof]
- [Referral program with clear incentive structure]

---

## Key Differentiators vs. Competition

> 💡 **Lesson learned:** A feature comparison matrix makes your positioning
> concrete. List the 8-12 features that matter most to your buyer and show where
> competitors fall short. This informs both marketing copy and product roadmap.

| Feature         | [Your App] | [Competitor 1] | [Competitor 2] | [Competitor 3] |
| --------------- | ---------- | -------------- | -------------- | -------------- |
| [Key feature 1] |            |                |                |                |
| [Key feature 2] |            |                |                |                |
| [Key feature 3] |            |                |                |                |

---

## Launch Sequence

### Phase 2 — Growth Push (Months 3–6)

- [ ] Product Hunt launch
- [ ] Hacker News "Show HN" post
- [ ] Scale content to weekly cadence
- [ ] First podcast guest appearances
- [ ] First paid experiment ($500 test budget)
- [ ] Collect and publish case studies
- [ ] Expand partner network

### Phase 3 — Scale (Months 6–12)

- [ ] Launch B2B outreach (if applicable)
- [ ] Product-led growth features live
- [ ] Expand partner network to [N]+
- [ ] Evaluate paid search for high-intent keywords
- [ ] Explore podcast sponsorships

---

## Metrics & Goals

| Metric          | Month 3 | Month 6 | Month 12 |
| --------------- | ------- | ------- | -------- |
| Signups         |         |         |          |
| Paying users    |         |         |          |
| MRR             |         |         |          |
| Blended ARPU    |         |         |          |
| Partners active |         |         |          |
| Organic traffic |         |         |          |
| NPS             |         |         |          |

---

## Budget Allocation (Monthly)

| Channel           | Months 3–6 | Months 6–12 |
| ----------------- | ---------- | ----------- |
| Content writing   |            |             |
| Email platform    |            |             |
| Paid ads          |            |             |
| Conference travel |            |             |
| Tools / misc      |            |             |
| **Total**         |            |             |

No paid ads without a proven CAC benchmark from organic.
