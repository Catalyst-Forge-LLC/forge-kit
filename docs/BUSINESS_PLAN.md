# [App Name]: Business Plan

_Market analysis, pricing, monetization strategy, customer acquisition, virality playbook, and payment implementation._

_For brand positioning, see [BRAND_AND_PRODUCT.md](BRAND_AND_PRODUCT.md). For technical reference, see [TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md). For deployment, see [DEPLOYMENT.md](DEPLOYMENT.md)._

_Instructions: Write this document when you're thinking about other people using your app (Phase 7: Hardening, or earlier if you need to validate business viability). This is where you prove the business works on paper before building payment flows. Every section should be grounded in numbers, not hopes._

---

## Market Sizing

### Total Addressable Market (TAM)

[How many people have the problem you solve? Cite sources.]

### Serviceable Addressable Market (SAM)

[How many of those people would realistically use a SaaS tool for this? Filter by: tech literacy, willingness to pay, accessibility, geography.]

### Initial Target Segment

[Who are your first 100 users? Be specific. Where do they hang out? What do they already use?]

> 💡 **Lesson learned:** Don't just cite total market numbers. Apply realistic filters. 13-14M total job seekers → only 500K-1M realistically reach a paid SaaS tool for this.

## Unit Economics

### Cost Per Action

[What does it cost you to serve one user action? For AI-powered apps, this is your API cost per call.]

| Action   | Model/Service | Input Cost | Output Cost | Total Per Action |
| -------- | ------------- | ---------- | ----------- | ---------------- |
| [action] | [model]       | [$X]       | [$X]        | [$X]             |

### Typical User Cost Profile

[How much does a typical active user cost you per month?]

| Metric                               | Value    |
| ------------------------------------ | -------- |
| [Actions] per active user/month      | [N]      |
| Average cost per [action]            | [$X]     |
| Total API cost per active user/month | [$X]     |
| Infrastructure cost per user/month   | [$X]     |
| **Total cost per active user/month** | **[$X]** |

### Margin Analysis

[At your planned price point, what's the margin?]

> 💡 **Lesson learned:** API costs were $0.03/tailoring run, ~$2.50/active user/month. At $119/month pricing, that's 95% margin. Unit economics were bulletproof. Validate this early; if margins are thin, your pricing model needs rethinking before you build payment flows.

## Pricing Model

### Pricing Philosophy

[Why this pricing structure? What behavior does it incentivize? What does it discourage?]

> 💡 **Lesson learned:** Monthly-only pricing matched the natural use cycle (6-9 month executive-level job searches). Annual plans would create churn friction.
>
> 💡 **Also:** Pure job-count limits feel arbitrary. Hybrid models (credits + job count) let power users self-select into higher tiers without feeling punished.
>
> 💡 **Also:** Consider eliminating the free tier entirely. After a time-limited trial (e.g., 7 days of full access), accounts expire to an "expired" state with ALL limits at zero. This forces a clear decision: subscribe, downgrade to Hold, or lose access. A persistent free tier creates a leaky bucket where users never convert. A 30-day data retention window after expiration creates urgency without being punitive. The Hold tier ($10/mo) becomes the only way to preserve data indefinitely without an active subscription.
>
> 💡 **Also:** Bridge tiers fill pricing cliffs. If your pricing jumps from a low-cost pause tier ($10/mo) to a full-featured tier ($120/mo), users who've finished their trial but aren't ready for full commitment will churn. A mid-price "bridge" tier ($40/mo) that gives meaningful ongoing value (e.g., profile editing, research, content creation) without the full pipeline (e.g., no per-item AI operations, no export) catches post-trial users and keeps them invested. When they're ready, they upgrade having already built their foundation. Model the bridge tier as: full access to X (the durable value), restricted from Y (the per-action AI cost center).
>
> 💡 **Also:** Trial design — usage caps create natural conversion moments. Instead of just a time limit (N days of full access), add a usage cap on the most valuable action (e.g., "download tailored documents for up to 5 items during trial"). Users get enough value to see the product's worth, then hit a clear conversion moment. Track usage with a JSON array field on the user record. Combined with a longer trial (10 days instead of 7), this gives users more time to explore while still creating purchase urgency at the moment they need the product most.

### Tiers

| Tier     | Price   | Includes                         | Target User                    |
| -------- | ------- | -------------------------------- | ------------------------------ |
| Expired  | $0      | All blocked                      | Post-trial default             |
| Hold     | $[X]/mo | Data preserved, features blocked | Users who completed their goal |
| [Tier 2] | $[X]/mo | [includes]                       | [who this serves]              |
| [Tier 3] | $[X]/mo | [includes]                       | [who this serves]              |

### Entitlement Enforcement

[Which API routes need to check entitlements? How does enforcement work technically?]

> 💡 **Lesson learned:** Entitlements must be enforced on every LLM-consuming API route (12+ routes). A shared middleware or utility function prevents inconsistency. Client-side limits are for UX; server-side limits are for revenue protection.

## Customer Acquisition

### Channels (Ranked by Expected ROI)

1. **[Channel]:** [Why this channel, expected CAC, how to execute]
2. **[Channel]:** [Why this channel, expected CAC]
3. **[Channel]:** [Why this channel, expected CAC]

> 💡 **Lesson learned:** Pre-launch marketing optimization — run a systematic Cialdini influence audit on your landing page and pricing section before spending on paid channels. The seven principles (Social Proof, Authority, Scarcity, Reciprocity, Commitment/Consistency, Liking, Unity) provide a structured framework for identifying conversion gaps. Key findings:
>
> 1. Social Proof: The #1 conversion driver for SaaS. Don't launch with zero proof. Even aggregate counters ("N users have done X this month") work. Title-level specificity ("Built for VPs, Directors, and C-suite") is proof by association.
> 2. Authority: Domain expertise signals in feature copy (naming specific tools/platforms your audience uses) outperform generic descriptions.
> 3. Scarcity: For professional audiences, loss-framing ("After trial, AI features lock — but everything you built stays") outperforms urgency timers. Name what stops working, don't just say "Upgrade now."
> 4. Pricing layout: Cost anchors (competitor pricing, alternative costs) MUST appear above the price grid, not below it. Visitors anchor on the first number they see. Place the expensive reference point before your price.
>
> Run the audit as a reusable prompt (see prompts/cialdini-marketing-audit.md if available). Score each principle, prescribe specific copy/UI changes, and prioritize by implementation effort.

### CAC/LTV Framework

| Metric                      | Value      | Basis              |
| --------------------------- | ---------- | ------------------ |
| Target CAC                  | $[X]       | [how derived]      |
| Average subscription length | [N] months | [basis]            |
| LTV at [Tier]               | $[X]       | [price] x [months] |
| LTV:CAC ratio               | [X]:1      | [target >3:1]      |

## Churn Analysis

### Expected Churn Pattern

[Is churn a failure signal or a success signal in your business? How does the natural lifecycle of your users affect churn?]

> 💡 **Lesson learned:** Job search tool churn is SUCCESS (user landed a job). This reframes economics: every churned user becomes word-of-mouth, a boomerang customer (job changes every 2-3 years), and an emotional testimonial. Anti-churn features should celebrate success, not cling to subscriptions.

### Anti-Churn / Re-Engagement

[What brings users back? What creates repeat revenue?]

> 💡 **Lesson learned:** Consider a low-cost "Hold" or "Pause" tier ($10/mo) for users who complete their goal but may return. Key insights:
> - Data preservation is the differentiator vs. expiration. Pair hold with a data retention limit on expired accounts (e.g., 30 days inactive → archived). No persistent free tier — expired accounts have zero limits, making Hold the only path to preserve data without a full subscription.
> - Hold should block all expensive actions (AI, adding new items) but allow viewing everything. Sets maxActiveJobs high (preserve existing) but blocks new creation via a plan-level check.
> - One-click resume to any paid tier. The resume path should go through Stripe Checkout, not require re-onboarding.
> - Revenue math: $10/mo × 12 months of hold = $120 from a user who'd otherwise generate $0. If even 20% of churning users choose hold instead of cancel, that's meaningful recurring revenue.
> - Implementation: same Stripe product/price/webhook pattern as other tiers. Just another entry in PLAN_LIMITS with zeros for all AI counters.

## Virality Playbook

_Features that create organic sharing should be designed into the product, not bolted on as marketing._

### Built-In Sharing Triggers

[What in-product moments naturally lead to sharing?]

> 📝 **Example:**
> - "I Landed" celebration creates a shareable moment
> - Pipeline stats cards are inherently visual/shareable
> - Resume diff views demonstrate value visually

### Network Effects

[Does the product get more valuable as more people use it? How?]

### Content Virality

[Does the product create content that attracts new users?]

## Cost Estimates

| Category               | Monthly Cost        | Notes                  |
| ---------------------- | ------------------- | ---------------------- |
| Infrastructure         | $[X]                | [provider, spec]       |
| API/AI costs           | $[X] per [N] users  | [model, usage pattern] |
| Payment processing     | [X]% + $[X] per txn | [provider]             |
| Domain/DNS             | $[X]                |                        |
| Monitoring             | $[X]                |                        |
| **Total at [N] users** | **$[X]**            |                        |

## Payment Implementation

_Technical architecture for Stripe (or alternative). Fill in during Phase 7: Hardening._

### Required Schema Changes

[What database tables/fields need to exist for billing?]

### Stripe Integration Points

[Products, prices, checkout sessions, webhooks, customer portal. What needs to be built?]

### Promo Code / Discount Strategy

> 💡 **Lesson learned:** Promo codes as a growth lever:
>
> 1. Use cases to plan for:
>    - Launch discounts (% off first N months)
>    - Referral codes (fixed discount for referrer and referee)
>    - Trial extensions (extra free days for specific audiences)
>    - Partner/influencer codes (tracked via unique codes for attribution)
>    - Win-back codes (for churned users, sent via email campaigns)
>
> 2. Unit economics check: Before offering discounts, model the impact.
>    - A 50% discount at $119/mo = $59.50/mo. If API cost is $2.50/user/month, margin is still 96%. Safe.
>    - But a 50% discount at $19/mo = $9.50/mo. If API cost is $5/user/month, margin is 47%. Risky.
>    - Model your worst case: highest-discount code × heaviest-usage user × lowest-price tier.
>
> 3. Redemption limits prevent abuse:
>    - Per-code max redemptions (e.g., "first 100 users")
>    - Per-user single-use (promo_redemptions table)
>    - Expiration dates on all promotional codes
>    - Active/inactive flag for immediate kill-switch
>
> 4. Stripe mapping: Percent and fixed discounts map to Stripe Promotion Codes. Trial extensions map to Checkout Session trial_period_days. Don't mix — each discount type has its own Stripe mechanism.
>
> 5. For technical implementation details, see TECHNICAL_REFERENCE.md > Promo Code System.

[What promo code types will you support? What's the discount budget? How will codes be distributed?]

### Dynamic Pricing

> 💡 **Lesson learned:** Never hardcode prices in UI components. Fetch prices from Stripe at runtime via stripe.prices.retrieve(), cache server-side (e.g., 1 hour TTL), and pass to components through layout data. This lets you change prices in the Stripe Dashboard without redeploying. Components should have hardcoded fallback values for when Stripe is unreachable, but the live values should always come from Stripe.

[How will display prices be kept in sync with Stripe? Options: (1) fetch from Stripe and cache server-side (recommended), (2) public env vars (requires restart), (3) shared config file (requires redeploy).]

### Implementation Phases

[Break payment work into sequential phases with dependencies.]

## Product Analytics & Success Metrics

_Instrument your app to prove it works. Without analytics, you're guessing._

> 💡 **Lesson learned:** PostHog Cloud (free tier: 1M events/month) is the right tool for early-stage product analytics. It covers funnels, retention cohorts, feature adoption, and session replay in one tool. Plausible/Umami are web analytics (pageviews) — they don't give you funnels or custom events. Rolling your own event capture is easy; building the analysis UI is weeks of work.
>
> Key pattern: Create a thin wrapper module ($lib/posthog.ts) that exports initPostHog(), identifyUser(), trackEvent(), trackPageView(). Initialize in root layout onMount. If the API key isn't set, all calls silently no-op (safe for local dev). Track SPA page views via afterNavigate, not PostHog's automatic capture (which double-counts in SPA frameworks).

### SM0: Does The Product Work?

[Define your core workflow funnel. What sequence of actions proves a user got value? Instrument each step.]

| Event        | When It Fires | What It Proves             |
| ------------ | ------------- | -------------------------- |
| [event_name] | [trigger]     | [what this step validates] |

### SM1: Net Promoter Score

[When will you survey users? At what product moments? How will you use qualitative feedback?]

> 💡 **Lesson learned:** NPS is most useful when triggered at moments of realized value, not random intervals.
>
> Implementation pattern:
> 1. Identify 2-3 "value moments" — points where the user has received enough value to form an opinion (e.g., 3rd use of a core feature, first success outcome). Don't survey on first use.
> 2. Build an in-app toast/bottom-sheet, NOT an email. Email NPS has low response rates. In-app catches the user in context.
> 3. Standard 0-10 scale → follow-up qualitative question. Tailor the question to the score:
>    - Detractors (0-6): "What's not working for you?"
>    - Passives (7-8): "What would make this a 10?"
>    - Promoters (9-10): "What do you love most?"
> 4. Store responses in a dedicated collection (user, score, reason, trigger, created). Make records immutable (no update/delete) for audit integrity.
> 5. Wire triggers via window events (CustomEvent) so components stay decoupled. The NPS component listens; feature components just dispatch events when milestones hit.
> 6. Check server-side whether the user already responded for a given trigger before showing. One survey per trigger per user.
> 7. Track nps_submitted and nps_dismissed in PostHog for response rate analysis.
> 8. Target: NPS ≥ 40 before investing in retention/growth (SM2+).

### SM2: Retention

[What does healthy retention look like for your product? Is churn a failure signal or a success signal?]

### SM3: CAC Doubling Time

[How will you track acquisition cost and viral loops? What's your K-factor formula?]

> 🔧 **Guidance:** These Success Metrics (SM0-SM4) are from Pablo Cruz's Venture Building framework (via Tim Connors, ex-Sequoia). They're sequential: don't optimize NPS before the product works, don't pour money into CAC before retention proves the product holds users. See: https://www.pscruz.com/p/venture-building-success-metrics
