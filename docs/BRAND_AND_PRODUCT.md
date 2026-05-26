# [App Name]: Brand Story & Product

**[Tagline: one line that captures the essence]**

_For technical feature documentation, see [TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md). For business model and growth strategy, see [BUSINESS_PLAN.md](BUSINESS_PLAN.md)._

_Instructions: This document defines WHO your product is for, WHY it matters, and HOW it's different. It's the reference for all marketing copy, product decisions, and feature prioritization. Write it after your core features work (Phase 6: Strategic Review), then use it to pressure-test every feature against your brand promise._

---

## The Problem

_What pain exists in the world that your product addresses? Be specific about who feels this pain and when._

### The Surface Problem

[What users would say if you asked them what's broken. The obvious complaint.]

### The Deeper Problem

[The emotional or structural reality underneath the surface problem. This is what your product actually solves.]

> 📝 **Example:**
> Surface: "Applying to jobs takes too long and my materials are generic."
> Deeper: "Job search at the senior level is emotionally destabilizing. Every tool adds more systems to manage, increasing the burden instead of reducing it. The real failure point isn't finding jobs—it's converting preparation into compelling, role-specific materials."

### Why Existing Solutions Fail

[What's wrong with the current alternatives? Be specific about which alternatives and which failure modes.]

> 📝 **Example:** "Full automation (auto-apply to hundreds of roles) is a dealbreaker at senior levels. Hiring managers detect spray-and-pray instantly. Generic templates lose the candidate's differentiated value."

## Who It's For

### Primary User

[Demographic, psychographic, and behavioral description. Not "everyone." Be narrow enough to be useful.]

> 📝 **Example:** "Director/VP/C-level professionals in active job search. Technical enough to use a SaaS tool, senior enough that their resume needs strategic positioning, not just formatting."

### Who It's NOT For

[Equally important. Who should you turn away? What use cases does this product explicitly not serve?]

## The Product

### What It Is

[One paragraph. What does the product actually do?]

### What Makes It Different

_Use "We are X, not Y" framing to draw clear lines._

- We are [X], not [Y].
- We are [X], not [Y].
- We are [X], not [Y].

> 📝 **Example:**
> - We are a command center, not a job board.
> - We are a preparation system, not an automation tool.
> - We are human-in-the-loop, not auto-submit.

### The Promise

[What can the user expect? Set appropriate expectations. What do you NOT promise?]

### Core Value Pillars

_These become the organizing structure for your TODO.md and feature prioritization. Each feature should map to a pillar._

1. **[Pillar Name]:** [What it means for the user. What features serve this pillar.]
2. **[Pillar Name]:** [What it means for the user.]
3. **[Pillar Name]:** [What it means for the user.]
4. **[Pillar Name]:** [What it means for the user.]
5. **[Pillar Name]:** [What it means for the user.]

> 📝 **Example:**
> 1. Preparation Quality: Intersections, selling points, readiness scoring
> 2. Tailoring Precision: Resume/cover letter customization per role
> 3. Pursuit Management: Kanban pipeline, status tracking, deadlines
> 4. Network Execution: Contact management, outreach tracking, relationship mapping
> 5. Operational Intelligence: Analytics, activity feeds, progress visualization

## Brand Voice

### Tone

[3-6 adjectives that define how the product speaks.]

> 📝 **Example:** "Sharp. Competent. Honest. Direct. Grounded. Prepared."

### We Say / We Don't Say

| We Say                             | We Don't Say                   |
| ---------------------------------- | ------------------------------ |
| [language that reflects the brand] | [language that contradicts it] |

> 📝 **Example:**
> | "You're prepared" | "We got you the job" |
> | "Command center" | "Dashboard" |
> | "Contender" | "Applicant" |

### Voice Vocabulary Expansion (brainstorm then bucket)

_Optional but high-value. Run this after the "We Say / We Don't Say" table is established, to enrich the voice palette beyond hand-curated pairs._

**Step 1: Generate audience language.** Collect 100-150 words and phrases your target audience actually uses — from support tickets, LinkedIn posts in your space, competitor landing pages, industry jargon, community forums, job descriptions, and review sites. Cast wide: include formal and informal registers, technical and emotional language, aspirational and frustrated language.

> 📝 **Example prompt:** "Generate 150 words and short phrases that [your target audience — e.g. C-suite executives in active job search] actually use when talking about [your product's domain — e.g. the job search process, career transitions, professional preparation]. Include formal language, casual language, emotional language, and industry jargon. Mix nouns, verbs, adjectives, and idiomatic phrases."

**Step 2: Bucket against tone keywords.** Score each word/phrase against your tone keywords (e.g. Sharp, Competent, Honest, Direct, Grounded, Prepared). For each, ask: does this word/phrase **reinforce** the tone, **contradict** it, or sit **neutral**?

- **Reinforces** → candidate for the "We Say" column or in-app copy
- **Contradicts** → candidate for the "We Don't Say" column (catches phrasing you might accidentally use)
- **Neutral** → discard or note for later

**Step 3: Review for surprises.** Look for:

- Phrases that reinforce your voice but you would never have written yourself — these are gold for authentic-sounding copy
- Phrases that *seem* on-brand but carry a subtle wrong connotation when you examine them closely — add to "We Don't Say"
- Emotional-register words that capture how your user *feels* during the process (not just what they do) — these belong in origin stories and empathy copy
- Jargon your audience uses that you could adopt or explicitly avoid

**Step 4: Feed into copy surfaces.** Update "We Say / We Don't Say" with the strongest additions. Use high-overlap words (reinforcing 3+ tone keywords) in signature lines and tagline candidates. Use emotional-register words in origin story and empathy sections of marketing copy.

### Signature Lines

_Recurring phrases that reinforce the brand. Use these in UI copy, marketing, and onboarding._

- [Line]: [Where/when to use it]

## Feature Scope Boundaries

### The Product Layer

[Where does your product sit in the user's workflow? What layer of the problem do you own?]

### Explicitly Out of Scope

[What does this product NOT do, even if users ask for it? Why?]

> 📝 **Example:**
> "We stay in the preparation layer (before submission). We don't submit applications, send follow-ups, or negotiate offers. Crossing into post-submission creates liability and dilutes focus."

---

## Copy & Messaging Lessons

> 🔧 **Guidance:** These are hard-won lessons about what works and what doesn't in marketing and product copy. Patterns to follow when writing for any ForgeKit-derived product.

### Landing Page Callout Boxes

A callout box immediately following a pitch paragraph should NOT restate the pitch in different words. It should answer the natural next question the pitch raises.

Pattern: the pitch paragraph delivers the emotional "why" (instant momentum, break through the barrier); the callout box delivers the "how" (numbered steps — what to do first, what happens next, what you get).

Duplicate callout copy reads as filler and dilutes both elements. If the callout says the same thing as the paragraph above it, ask: what's the reader's next question? Answer that instead.

### Marketing Prerequisite Clarity

When your core feature requires a prerequisite step (e.g., "upload your resume" before "paste a URL"), surface that prerequisite in reference docs and pitch docs — but NOT necessarily in the hero marketing copy.

- **Hero copy**: selling the outcome. Omitting a setup detail here is appropriate scope, not misleading.
- **Reference docs, how-it-works sections, CTAs**: these are read by prospects who are closer to converting. Omitting the prerequisite here IS misleading because it leaves them unprepared.

Rule: Every "one-liner" hook that skips a required step needs a longer companion version in adjacent reference material that includes it.

### Error Messages as Brand Expression

User-facing error messages are copy, not code. Two rules:

1. **Never leak backend service names.** If your backend is PocketBase, Supabase, or anything else, the user should never see that name. "Network error. Is PocketBase running?" becomes "Something went wrong. Check your connection and try again." Internal names confuse users and expose implementation details.

2. **Match the error to the user's mental model.** A signup failure should say "Something went wrong" not "Request failed with status 500." Catch blocks in authentication flows are especially visible — they're the first impression for new users.

> 💡 **Lesson learned:** Grep for your backend service name (e.g., "PocketBase", "Supabase", "Firebase") in all user-facing strings. Every hit is a leak. Replace with plain-language alternatives that describe the outcome, not the cause.

### Security Claim Precision

Don't overstate security in marketing copy. Be specific about what protections actually exist:

- **Bad:** "Your data is encrypted and secure." (Implies encryption at rest, which may not be true.)
- **Good:** "All connections are encrypted in transit, and your data is stored on private infrastructure with access restricted to your account."

If your database doesn't encrypt documents at rest (e.g., default PocketBase, SQLite), don't imply it does. Users in regulated industries (finance, healthcare) will notice. State what IS true — TLS in transit, access controls, no third-party sharing — and leave out what isn't.

> 💡 **Lesson learned:** Have someone with security knowledge review FAQ security answers before launch. A single overclaim discovered by a technical user erodes trust far more than a modest but accurate claim builds it.

### Generated letters and long-form outbound copy (LLM)

When the product produces **cover letters**, **outreach**, or other **persuasive prose** for a specific opportunity, prompt and post-process for **human register** — especially for senior buyers: avoid **self-important** openings, **density packing** (keyword stuffing that reads as AI), and **redundant** motifs across opening, body, and closing. **Why:** Recruiters and hiring managers pattern-match “LLM voice” quickly; repetition across paragraphs reads as broken, not thorough.

> 💡 **Lesson learned:** **Email and attachment cover letters** usually do not need a **city/state line** or mailed-letter dateline block (`[City, State]` above the date, employer address block, etc.). Drop those placeholders from the **base template** and from LLM “do not change” blocks — they survive tailoring as obvious non-personalized cruft. Start with name, contact line (email/phone/LinkedIn), date if needed, then salutation and body.
>
> 💡 **Lesson learned:** Encode **deduplication and register** rules in **shared prompt fragments** or server-side passes so every surface that generates the same artifact class (tailoring tab, assistant, batch flows) stays aligned — not three different ad-hoc prompts that drift.

### Name Competitors in Differentiator Copy

In FAQ or comparison sections, name the specific tools your buyer is already evaluating — don't hide behind vague "other tools" or "existing solutions."

- **Bad:** "How is this different from other tools?"
- **Good:** "How is this different from ChatGPT, Claude, or a resume builder?"

Naming competitors directly does three things: (1) it matches the exact query prospects type into search engines, (2) it signals confidence that you can withstand the comparison, and (3) it meets the buyer where they already are in their evaluation process. If you're afraid to name a competitor, that's a product problem, not a copy problem.

### Pricing Copy Clarity

Pricing feature lists often contain internal jargon that means nothing to a prospect who hasn't used the product yet. Audit each line item from the perspective of someone reading it for the first time.

- **Bad:** "30 prep generations/mo" — "prep generations" is internal terminology.
- **Good:** "30 interview & strategy prep runs/mo" — uses words the buyer already understands.
- **Bad:** "Resume Forge access" — the feature's brand name hasn't been introduced yet.
- **Good:** "AI-tailored resumes" — describes the outcome.

If a line item requires explanation, either rewrite it in plain language or add a tooltip (see DESIGN_SYSTEM.md > Tooltip Usage Guidelines).

### Action verbs over generic "Generate" (in-app copy)

This is **not** the same lesson as "remove internal jargon" (e.g. billing counters, backend names). **Generate** is precise for engineers but **vague for users**: it implies a black box and trains people to think every AI action is the same kind of magic.

**Pattern:** Prefer verbs that describe the **outcome** or the **user's next artifact**:

| Instead of (generic) | Prefer (when it fits) |
| -------------------- | ---------------------- |
| Generate / Generating | **Map** (intersections, overlaps), **Build** (selling points, dossier, export bundle), **Draft** (answers, thank-yous, outreach), **Create** (Word files, variant templates), **Refresh** / **Re-create** (re-run after edits), **Tailor** / **Re-Tailor** (full per-job document rebuild from base) |

**Acronyms:** Expand once per surface where it helps (**ATS** = applicant tracking systems; **STAR** = Situation, Task, Action, Result). Keep the acronym after the first expansion.

**Propagation:** When you settle terminology in a customer project, capture it in a **project-owned spec** (e.g. `specs/UI_UX_COPY_CONSISTENCY_SPEC.md`) and **lift generalizable rules back into ForgeKit** here so the next product inherits the pattern. Grep periodically for `Generate` / `Generating` in user-visible `*.svelte` strings; API route names and analytics event keys can stay technical.

> 💡 **Lesson learned:** Jargon removal fixes *what* users read (opaque nouns). Verb choice fixes *how* they understand *what the software is doing* and reduces "everything is just generate" fatigue. Do both.

### Plain language for profile and priority labels

Structured intent editors (direction, emphasis areas, constraints) often ship with **implementation-flavored** labels. Users read those strings literally.

> 💡 **Lesson learned:** **Schema keys and editorial vocabulary can diverge.** If research shows confusion with an early label, ship the **clearer plain-language word** in UI, Help, tours, FAQ, and exports first; rename persistence when you are ready for migration. Reconcile **all** surfaces in one pass — otherwise onboarding describes a concept the primary editor no longer shows.

> 🔧 **Guidance:** After any rename of a user-visible concept, grep **tours**, **onboarding**, **empty states**, and **download titles** — not only the main form component.

### URL ingestion wording (customer-facing)

**Pattern:** In UI, Help, and lifecycle email, prefer **Import**, **Add from link**, or **Analyze posting** over **Scrape** when describing automated URL fetch. Many professional buyers read "scrape" as adversarial, technical, or low-trust.

**Why:** Same pipeline under the hood; the label should match how you want the relationship with third-party sites and the user’s self-image to feel.

### Duplicate and variant flows: plain language

**Pattern:** For flows where users **copy an entity to start a variant** (second application from a template, new draft from an old record), label the action **Carry forward**, **Start from…**, **Duplicate**, or **New … from copy** — not developer idioms (**fork**, **branch**, **rebase**) unless your ICP is engineers.

**Why:** Same behavior under the hood; wording should signal intent (continue my work), not toolchain.

### Default to Signup, Not Sign-In

On landing pages, set the authentication form's default mode to **signup** (not sign-in). First-time visitors — the majority of landing page traffic — should see the path of least resistance to starting. Returning users know to click "Sign In." This is a simple state default change with measurable conversion impact.

### Elevate Audience Targeting

If your product targets a specific seniority band or persona, don't bury that in small muted text. Elevate it to a prominent visual element near the hero CTA — badge rows, styled pills, or a dedicated one-line callout. The right visitor should see "that's me" within 3 seconds of landing. Example: moving a seniority line from muted footer copy to a badge row above the CTA made targeting unmissable.

### Keep in-app marketing surfaces aligned with the public landing

If you ship a **public marketing route** (e.g. `/start`, marketing home) and an **in-app story surface** (About panel, Help introduction, settings blurb), treat the **landing page as canonical** for positioning: hero promise, supporting lines, section titles, taglines, and **customer-facing feature names** on cards or accordions.

**Why:** Users who converted read the landing first. When About or Help still says an old tagline, a different timing claim ("five minutes" vs "in minutes"), or internal naming ("Resume Score" vs the marketing label "ATS scoring & fixes"), it feels like a different product — worse than a small inconsistency in tone.

**Pattern:** When landing copy changes, audit paired in-app surfaces in one pass. Match differentiator headings and empathy blocks; keep "how it works" steps aligned (secondary paths like manual entry or recruiter paste can live in the same bullet as a clause). **Adapt** signup-only eyebrows and CTAs for logged-in users (e.g. drop "no credit card" where it no longer applies) without contradicting the core promise.

**Anti-pattern:** Letting the in-app About panel drift while marketing iterates, or maintaining three long prose blocks that all describe the product without a checklist of surfaces to sync.

> 💡 **Lesson learned:** Add "landing + About (or equivalent)" to your pre-launch or release checklist when you change marketing copy. One grep pass for the old hero sentence often catches stragglers in `*Panel.svelte` or Help JSON.

### New primary hubs and navigation pillars

When you ship a **new top-level area** (main-nav section, multi-tab hub, or “command center” family) that reframes how users work, treat it like a **positioning change**, not only a route.

**Why:** Logged-in users learn new names and tabs while prospects still read marketing that describes the old map. Word-of-mouth and support use language that the public site never reflects.

**Pattern:** In the same release train, update **landing feature grids, About, Help, and FAQ groupings** so the **category of value** the hub represents is discoverable without opening the app. Avoid internal codenames on customer-facing surfaces; align with the abstraction level you use elsewhere (see *Describe features at the right level of abstraction*).

### Single module for landing SEO and on-page marketing copy

**Pattern:** Drive `<title>`, `<meta name="description">`, Open Graph, Twitter Card fields, and JSON-LD `description` from the **same content module** (or the same string constants) you use for the hero, subheads, and feature grid — not a parallel set of strings maintained only in the route’s `<svelte:head>`.

**Why:** Social previews and search snippets are part of the same promise as the visible page. When meta says one audience framing and the hero or schema says another, positioning drifts silently because engineers update the module but forget hardcoded tags.

**Anti-pattern:** Duplicating audience or value language only inside `<meta>` and structured data while the hero imports from elsewhere — two sources of truth that diverge on the next copy pass.

> 💡 **Lesson learned:** Keep **who the product is for** spelled the **same way** in hero intro, meta descriptions, and `SoftwareApplication` schema (e.g. explicit band + seniority), not a generic shorthand in one place and a precise ICP phrase in another.

### Audit for invisible features (the marketing gap)

A built-and-shipped feature that is absent from the landing page, About panel, and Help guide might as well not exist for prospects. This happens naturally: engineering ships a feature, copy lags behind, and the marketing surfaces silently drift from what the product actually does.

**Pattern:** After each release cycle, diff the set of user-facing capabilities against the set of features named on public marketing surfaces. Any capability with zero marketing presence is an "invisible feature" that needs a card, bullet, or mention. Prioritize features that address a buyer's top objections or map to competitor differentiators.

> 💡 **Lesson learned:** A personal branding tool (LinkedIn profile generation) and a full job-posting trust scan (six-category LLM analysis) were both fully implemented but completely absent from the landing page and About panel. Adding two feature cards and two About entries took minutes but made the product look materially more capable to prospects. Schedule a feature-vs-marketing parity check whenever you update landing copy.

### Describe features at the right level of abstraction

Marketing copy that enumerates every sub-feature ("generates a headline, an About section, and an application summary") becomes stale the moment you add a new output type. Describe the *category of value* the feature provides ("tailored LinkedIn profile content built from your actual resume") so the copy survives feature evolution without requiring a marketing update for every iteration.

**Anti-pattern:** Listing every specific deliverable in hero or card copy — forces a copy edit for every feature addition and trains users to expect only the listed outputs.

> 💡 **Lesson learned:** A branding feature card originally listed "headline, About section, and application summary." Rewriting to "tailored LinkedIn profile content" kept the promise accurate as new content types were added, without touching the landing page again.

### Personal outreach copy: avoid AI tells in founder-written messages

When drafting personal beta outreach (or any founder-to-contact message), AI-assisted drafts carry consistent tells that recipients -- especially senior professionals -- recognize instantly. The message doesn't need to be worse; it needs to not read as generated.

**Signals to audit before sending:**

- **Sincerity adverbs** ("genuinely," "truly") undermine sincerity. The ask itself signals you care; the adverb signals a template trying to sound like it cares.
- **Filler openings** ("I wanted to reach out," "I hope this finds you well") are meta-announcements. Start with substance.
- **Flattery formulas** ("people whose judgment I trust") repeated across multiple messages become visible templates when recipients compare notes.
- **Identical product descriptions** across all messages. Write 3--4 variant one-liners and rotate.
- **Three-item lists** for feedback asks ("what resonates, what feels off, anything you'd want to see") are an AI fingerprint. Pick one or two.
- **Pitch-deck language** in personal messages. If a sentence could appear on a slide, rewrite it to sound spoken.
- **Structural parallelism** across messages. If every recipient gets the same paragraph order, the architecture shows even when no single phrase is wrong.

> 💡 **Lesson learned:** The structural similarity across bucket templates is the hardest tell to catch because each message looks fine in isolation. The fix: rearrange the skeleton per contact -- sometimes lead with product, sometimes bury it after a personal opening -- and use different product one-liners. Two recipients comparing messages should see family resemblance, not identical twins.

### Don't echo competitor ad tropes (especially after a screenshot review)

If you study **paid social** or display creative in your category, use it for **positioning and roadmap** — not as a style guide. Competitor ads often lean on:

- **Unsourced statistics** ("70% of jobs never…") — same trust failure as overprecise security claims.
- **Guaranteed timelines or outcomes** — invites regulatory and reputation risk; senior buyers discount it anyway.
- **Volume-as-hero** ("100 applications/week") when your ICP optimizes for **fit and narrative**, not throughput.

**Pattern:** Maintain a short **"fluff to avoid"** list in your brand doc or competitive spec and check new landing, FAQ, and in-app copy against it. **Substance to keep** is usually calm: signal over noise, relationships and timing, verifiable mechanics (e.g. how ATS parsing works), runway awareness without panic UX.

**Bundled marketing exports:** If users download **Word/PDF appendices** built from the same narrative as About or landing (e.g. personal data ZIP), drive body copy from a **single shared module** and **verify every CTA URL** exists on your public site. Dead or aspirational routes in an archive undermine trust when someone opens it months later.

### FAQ as a Conversion and SEO Tool

A short FAQ section (5-7 items) placed just before the signup form serves dual purposes:

1. **Conversion:** It catches last-moment objections ("Is my data secure?", "Can I cancel?") right where the user is about to decide. Each answered question removes a reason to leave.
2. **SEO:** FAQ content matches long-tail search queries ("is [product] secure", "[product] vs [competitor]") and can be enhanced with FAQ structured data (JSON-LD) for rich search results.

Structure the FAQ as an accordion with a single open item at a time. Lead with the question your buyer is most anxious about. Include a differentiator question to restate your positioning in a conversational format.

### Visual Design as Brand Expression

> 💡 **Lesson learned:** Create a dedicated DESIGN_SYSTEM.md document (see template) as the single reference for visual decisions. Key patterns worth replicating:
>
> 1. Accent hierarchy: Define three intensity tiers — strong (CTAs, active states), medium (borders, icon containers), and subtle (hover shadows, gradient washes, active tab background at 4% opacity). The subtle tier is the most powerful because it registers subconsciously — users feel "this is polished" without being able to point to why.
>
> 2. Gradient polish: Layer subtle accent-tinted `radial-gradient()` over surface colors on modals and panels. Use the accent color at 3-5% opacity in light mode, 5-7% in dark. Modals get a top-left radial glow (where the eye enters); panels get a left-edge glow (from the panel border). Define as reusable CSS classes (`.modal-gradient`, `.panel-gradient`) with `[data-theme="dark"]` variants. This creates brand cohesion at such a subtle level that removing it makes everything feel flat, but no user could articulate what's different.
>
> 3. Shadow system: Card hover shadows and panel shadows should carry a barely perceptible accent tint (`rgba(accent, 0.04)` outer glow). Combined with accent gradients, this makes the brand color feel ambient in the interface.
>
> 4. Warm color foundations: Avoid the sterile blue-grey of typical SaaS. Use warm neutrals — parchment-toned light themes, deep navy (not pure black) dark themes. The difference is subtle but emotionally significant, especially for products targeting professionals.
>
> 5. Terminology care: User-facing labels for negative outcomes deserve attention. "Not Selected" instead of "Rejected." "On Hold" instead of "Paused." The word choice is brand expression.
