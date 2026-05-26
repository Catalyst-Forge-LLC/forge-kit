# Personal Beta Outreach Playbook

Generate a structured outreach plan for inviting personal contacts to try your product during beta. Produces audience buckets, classification rules, per-bucket message templates, promo/offer policy, and a writing quality checklist to avoid AI-written and mass-email tells.

---

## Context

**Your app** is in beta (or approaching launch). You have a personal network spanning close friends, professional contacts, casual connections, and people who know people. You need to invite them to try the product and give feedback -- but a single generic message wastes the warmth of close relationships and feels presumptuous for distant ones.

This prompt produces an **operational playbook** -- not product code.

**Prerequisites:**

- `docs/BRAND_AND_PRODUCT.md` exists (voice, positioning, audience)
- `docs/BUSINESS_PLAN.md` exists (pricing, trial length, promo code capabilities)
- `docs/MARKETING_LAUNCH.md` exists (launch channel strategy, messaging framework)

---

## Instructions

Read the project's brand doc, business plan, and marketing launch doc to understand: the product's one-sentence value prop, the target audience, the trial/pricing model, the promo code system capabilities, and the brand voice.

Then produce a playbook covering all sections below. **Generalize** the audience buckets and message architecture; **customize** the templates with [BRACKETED] product-specific details.

---

## 1. Audience Buckets

Define **6 mutually exclusive primary buckets** (A--F). Buckets mix **relationship warmth** with one **context-first** category:

| ID | Bucket | Who belongs here | Relationship signal |
|----|--------|------------------|---------------------|
| **A** | Inner circle | Close friends/family; high trust, low formality | You'd ask a blunt favor without a pitch |
| **B** | Strong professional | People you know well through work, not necessarily socially | Real conversations and mutual help |
| **C** | Warm acquaintance | Met more than once or had a real exchange | They'd recognize your name without checking |
| **D** | Light / casual | Thin relationship; mostly weak ties | Little or no 1:1 history |
| **E** | Alumni / former org | Shared employer, program, school, or cohort is a **genuine** hook you'd **lead with** or **center** | You'd anchor the message on that shared context -- warmth may range from strong to thin |
| **F** | Connector | May introduce others even if they don't use the product themselves | Primary value is intros, not personal trial |

### Tie-breaker rule

If stuck between two buckets, choose the **cooler** one (shorter copy, softer CTA, more conservative offer). Classify on **how the message would land today**, not the person's title or fame.

### E vs B/C (when shared context matters)

Use **E** when the message would **start or hinge** on alumni/org/cohort. Use **B** or **C** when you'd lead with the **person** and mention org second. Use **A** for true inner circle (org is color only). Use **F** when intros are the main ask.

### Edge cases

Include classification shortcuts for:

- **Weak professional** (title overlap, little real relationship) -- default **D**; promote to **C** only with a specific remembered moment; **E** if shared org/cohort is still the honest anchor for the outreach.
- **Dormant strong professional** ("used to be B, years since contact") -- classify by **current** warmth, not historical closeness. Often **E** if a **named** org/era is the reconnect hook; **C** if warmth is primary; **D** if the old bond is generic in memory. The opener can honor history while keeping structure honest.
- **Senior / time-poor** -- bucket unchanged; set a flag; shorter copy, one clear ask.
- **Former manager / direct report** -- use real warmth + recency, not org-chart position. Avoid A-level casual unless you're actually friends.
- **Might share code widely** -- bucket unchanged; tighten promo caps/expiry.
- **Between C and D** -- if you'd feel silly citing a shared memory, you're D. If you have one true sentence, you're C.

---

## 2. Classification Workflow

Per contact, record:

1. Name and **channel** (email, text, LinkedIn DM, etc.)
2. **Primary bucket** (A--F)
3. **Last meaningful touch** (this month / this year / years ago)
4. **Optional flags:** time-poor, privacy-sensitive, might share widely

**Tracking columns:** `Name | Channel | Bucket | Last touch | Promo code | Date sent | Reply | Signed up | Notes`

---

## 3. Message Architecture

### Shared spine (all buckets)

Every message follows a five-part skeleton. Weight shifts by bucket -- A is shortest; C is often longest; **E** flexes with how warm the tie is.

1. Short **personal opener** (one line) -- why them or recent context
2. **One sentence** on what [APP_NAME] helps with (outcome-oriented, not feature-list)
3. **Beta ask:** you'd value their **feedback**
4. **Optional:** extended trial via **promo code**
5. **Easy out** -- no pressure; invite questions

### Tone by bucket

| Bucket | Length | Tone | CTA strength |
|--------|--------|------|----------------|
| A | Shortest | Warm, direct; humor OK | Strong ("try it," "be brutal") |
| B | Short--medium | Professional-warm | Strong on feedback; moderate on trial |
| C | Medium | Polite; specific memory if real | Moderate |
| D | Short | Respectful; low assumption of time | Soft ("if it's relevant") |
| E | Short--medium (flex) | Lead with shared org/cohort; tone matches actual warmth | Moderate; cooler **E** can match **D**-soft |
| F | Short | Gratitude; focus on intros | Very soft on personal trial |

### Product in one sentence (vary per bucket)

Write **4 variants** of a one-sentence product description. Use different ones across messages so recipients who compare notes don't see the same rehearsed pitch:

- **Full value stack** -- what the product produces from a single input
- **Short / text-friendly** -- casual, compressed
- **Latent user angle** -- for people who haven't started yet ("makes starting take five minutes, not a weekend")
- **Positioning angle** -- what it is and what it's not

### Promo code snippets

Write 3 formality levels: casual (A/B), standard (C/D/E -- match warmth for **E**), connector (F).

---

## 4. Writing Quality Checks (AI-Tell Avoidance)

> 💡 **Lesson learned:** Personal outreach messages drafted by AI or assembled from templates carry consistent tells that recipients -- especially senior professionals -- recognize instantly. The following checklist was developed by writing templates, then auditing them for patterns that read as "generated" rather than "written by a person."

**Before sending, scan every message for:**

- **Sincerity adverbs** ("genuinely," "truly," "honestly") -- cut them. Real sincerity comes from the ask, not the adverb.
- **"I wanted to reach out"** -- filler. The recipient already knows you're contacting them.
- **Repeated flattery formula** -- if "people whose judgment I trust" appears across multiple messages, it's a visible template. Vary or cut.
- **Identical value-stack list** -- don't paste the same comma-separated product summary into every message. Use the variant one-liners (section 3) to diversify.
- **Three-part feedback request** ("what resonates, what feels off, anything you'd want to see") -- pick one or two. Three-item lists are an AI fingerprint.
- **Brand-doc phrasing in personal messages** -- if a sentence could appear on a pitch deck, rewrite it to sound like something you'd say out loud.
- **"I hope this finds you well"** -- the most parodied email opener in professional communication.
- **Structural parallelism across buckets** -- if all messages follow the same paragraph order with the same transitions, the architecture shows. Move pieces around per contact.

**Anti-pattern:** Using AI to draft all five bucket templates, then sending them unchanged with only the name swapped. The structural similarity is the tell, even when no single phrase is wrong.

**Pattern:** Use the templates as raw material. Per contact, rearrange the skeleton, pick a different product one-liner, and write the opener from a real memory. The goal is that two recipients who compare messages see family resemblance, not identical twins.

---

## 5. Template Messages

Write one template per bucket (A, B, C, D, E, F) with:

- Recommended **channel** and **tone** note
- **Subject line** (for email buckets)
- Message body using `[BRACKETED]` placeholders (for **E**, include `[SHARED_ORG_OR_ERA]` and an opener that centers shared context)
- Brief **"why it works"** annotation

Also produce:

- A **shorter text/WhatsApp variant** for A
- A **forwardable blurb** (stripped of personal framing, suitable for a stranger)

### Template guidance by bucket

| Bucket | Key characteristics |
|--------|-------------------|
| **A** | No formality, strong feedback ask ("be brutal"), acknowledge they may not be the target user |
| **B** | Name a time investment ("20 minutes"), specify what feedback you want, include a forward option as secondary CTA |
| **C** | More product context (less shared background to lean on), clear easy-out, forward/intro as natural secondary ask |
| **D** | Shortest, low assumption, forward is the real CTA, promo code optional |
| **E** | Opener anchors shared employer/program/cohort; body flexes between B- and C-like; include warmer vs cooler **E** notes |
| **F** | "About your network, not you personally," offer a walkthrough, make forwarding frictionless |

---

## 6. Offer Tiers (Promo Mapping)

Map **one promo code per bucket** (or per bucket x month) so redemptions are trackable. For each bucket, decide:

- **Trial extension** (extra days beyond standard)
- **Discount** (if any) and duration
- **Redemption cap** and **expiry** -- tighten for buckets where codes might spread (C, D, E)

General principle: **most generous for A** (highest trust), **most conservative for D** (weakest tie). **E** usually tracks **B**/**C** economics depending on warmth. F gets standard or nothing -- the reward is the relationship.

---

## 7. Guardrails

- **1:1 feel** -- especially for D, avoid blast tone
- **Beta honesty** -- rough edges OK to mention for A/B; keep D more polished
- **Founder alignment** -- if multiple people send, use the same bucket definitions and code map
- **No internal jargon** -- outreach copy should not reference spec filenames, internal feature names, or engineering terminology

---

## 8. Channel Notes

| Channel | Guidance |
|---------|----------|
| **Text / WhatsApp** | Under ~150 words. No subject line, no sign-off. Link on its own line for clean preview. |
| **Email** | Subject line personal, not marketing ("Something we built" > "Introducing [APP_NAME]"). Plain text preferred. |
| **LinkedIn DM** | ~300-char preview truncation. Hook in first two sentences. If not connected, send connection request first. |

---

## Output

Produce a single markdown document containing all sections above, customized to [APP_NAME] with specific product details filled in. The document should be usable as an operational playbook -- something the founders can open alongside their contact list and start sending from.
