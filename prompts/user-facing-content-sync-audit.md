# User-Facing Content Sync Audit

Run this audit periodically (monthly, or after any week with 3+ shipped features) to ensure **every user-facing discovery surface stays current with what the product actually does**. It catches stale copy, missing features, broken information architecture, and naming drift across marketing, help, onboarding, and in-app panels — before a user does.

This complements [Docs Alignment Audit](./docs-alignment-audit.md) (accuracy vs. code) by focusing on **completeness and discoverability** of the product's public story.

For **where strings live in code** (inline Svelte → `$lib/content/*Copy.ts`, export scripts, duplication policy), see [Microcopy Centralization](./microcopy-centralization.md).

---

## How to Use

Give this prompt to an AI coding assistant with full codebase access. Provide:

1. The **date range** to audit (e.g. "last 4 weeks" or "since 2026-03-25").
2. Any **recently shipped features** the assistant should pay special attention to (or say "check the product journal / changelog").
3. Whether you want the assistant to **implement fixes** or only **report findings**.

```
Run a User-Facing Content Sync Audit using the checklist in [path to this file].
Date range: [last N weeks / since YYYY-MM-DD].
Recently shipped: [list features, or "check changelog"].
Mode: [report only / report and fix].
```

---

## Instructions

You are auditing the product's user-facing content surfaces for completeness, accuracy, and discoverability. Your job is to answer: **if a new user explored every surface of this app today, would they find clear, current, consistent information about everything the product can do?**

### Step 0 — Establish the source of truth

Read these files first to build a complete picture of what the product does *right now*:

- **Changelog / product journal** — recent changes; focus on the date range
- **Feature catalog** (if maintained) — comprehensive inventory of shipped features
- **Brand and product doc** — positioning, voice, canonical feature names
- **TODO / backlog** — what is checked `[x]` = shipped; `[ ]` = not yet

> 💡 **Guidance:** The source of truth is always what shipped in code, not what a doc *claims*. When in doubt, check the codebase.

From these, compile a **feature checklist** — every shipped capability that should appear *somewhere* in user-facing content. This is the "truth" you audit against.

### Step 1 — Audit each surface

For each surface below, compare what is present against your feature checklist. Flag:

- **Missing** — a shipped feature has no mention on this surface (and should).
- **Stale** — copy describes an old version of the feature, uses a deprecated name, or references a UI path that no longer exists.
- **Misleading** — copy implies a capability the product does not have, or understates what it does.
- **Discoverable?** — would a user browsing this surface find what they need, or is it buried / misordered?

#### 1.1 Landing page / marketing site

- [ ] **Hero / value prop** — does it reflect the product's current scope?
- [ ] **Feature cards or sections** — is every major capability represented (or deliberately excluded for focus)?
- [ ] **"How it works" steps** — do they match the actual onboarding flow?
- [ ] **FAQ** — are all common "what can it do?" questions covered? Are answers accurate?
- [ ] **Pricing table** — do plan names, limits, and feature access match the entitlements code?
- [ ] **SEO metadata** — does the `<title>`, meta description, and OG copy match the current product?
- [ ] **Secondary CTAs** — do they mention what lower-tier or pre-signup users can do?

#### 1.2 About / features panel (if applicable)

- [ ] **Features list** — is every shipped feature listed? Are descriptions current? Is the ordering / grouping logical for browsing?
- [ ] **What's New / changelog** — does it include features shipped in the audit date range? Are oldest items rotated out or dated so they don't feel stale?
- [ ] **About / overview** — is copy consistent with the landing page?

#### 1.3 Help panel / docs / knowledge base

- [ ] **Coverage** — does every major feature have a help section or topic? (Cross-reference feature checklist.)
- [ ] **Feature elevation** — does every feature that has its own **nav-menu entry and standalone panel** also have its own **top-level help section** (not buried as a topic inside another section)? A feature with its own icon in the menu deserves its own section in help.
- [ ] **Section grouping** — are help sections assigned to logical groups? Do the group names align with how the landing page and feature guide group features?
- [ ] **Topic accuracy** — do topic descriptions match current UI paths, tab names, and feature behavior?
- [ ] **Cross-links** — do topics that reference other features point to the correct surface / panel name?

#### 1.4 Guided tours / walkthroughs

- [ ] **Coverage** — is there a tour for every major workflow? Are new features covered?
- [ ] **Tour order and categories** — do categories match actual product areas? Are there empty categories?
- [ ] **Step copy** — does tour text match current UI (tab names, button labels, panel names)?
- [ ] **Welcome / overview tour** — does it mention all the major product areas a new user should know about?

#### 1.5 Onboarding flow

- [ ] **Step flow** — does the onboarding guide users through the current recommended getting-started sequence?
- [ ] **Feature references** — does onboarding copy use current feature names and descriptions?
- [ ] **Post-setup nudges** — after completing onboarding, are users pointed to the most valuable next actions?

#### 1.6 Navigation / information architecture

- [ ] **Entry completeness** — does every major feature surface have a nav entry? Are new features reachable without knowing a hidden path?
- [ ] **Grouping** — are nav items grouped logically?
- [ ] **Labels** — do nav labels match the canonical feature names?

#### 1.7 Exports and downloads (if applicable)

- [ ] **Document titles / headings** — do exported documents use current feature names?
- [ ] **Branding in exports** — if the product includes "about" content in exports, is it current?

### Step 2 — Information architecture review

Look across all surfaces as a whole:

- [ ] **Grouping consistency** — are features grouped the same way across landing page, About/features panel, help, and tour categories? Flag mismatches.
- [ ] **Prominence matches importance** — are the product's most valuable features (the ones users sign up for) prominent on the landing page, early in help, and covered by tours? Or are they buried?
- [ ] **First-class parity** — does every feature with its own **standalone panel in the navigation menu** have equal treatment across all discovery surfaces: its own help section, its own feature-guide entry, tour coverage, and onboarding mention where appropriate? Features that are nav peers in the app should be content peers in help and marketing.
- [ ] **New feature elevation** — do recently shipped features have adequate visibility, or are they hidden behind existing UI with no mention in marketing / help / tours?
- [ ] **Dead ends** — are there help topics, tour steps, or FAQ answers that reference removed or renamed features?

### Step 3 — Naming and branding pass

- [ ] **Feature names** — do all surfaces use the same canonical name for each feature? (Check the brand doc for the official name.)
- [ ] **Branded features** — do features that have branded names use those names consistently?
- [ ] **New features needing names** — are there recently shipped capabilities that are described generically and would benefit from a branded name?

### Step 4 — Freshness signals

- [ ] **What's New / changelog** — is the most recent entry less than 2 weeks old? If older, the section feels stale.
- [ ] **Version numbers** — if a panel or footer has a version string, does it reflect recent work?
- [ ] **"Coming soon" / "planned" language** — are there any user-visible strings promising features that have since shipped (or been cut)?
- [ ] **Date references** — are there hardcoded dates or "last updated" strings that are stale?

---

## Output Format

### 1. Feature checklist (source of truth)

Bullet list of every shipped feature the audit covers, with canonical name and one-line description.

### 2. Surface audit table

For each surface, a table:

| Surface | Finding | Type (Missing / Stale / Misleading / Discoverable) | Severity (High / Medium / Low) | Suggested fix |
|---------|---------|------|----------|---------------|

### 3. Information architecture findings

Bullet list of cross-surface consistency issues, prominence mismatches, and dead ends.

### 4. Naming and freshness findings

Bullet list of naming drift and stale signals.

### 5. Recommended actions (prioritized)

Ordered list of changes, grouped by file, with estimated scope (one-liner / paragraph / new section / new file).

---

## When to run

| Trigger | Scope |
|---------|-------|
| **Monthly cadence** | Full audit (all surfaces, full feature checklist) |
| **After a big feature ships** | Targeted — focus on the new feature across all surfaces |
| **After a rename or rebrand** | Naming pass (Step 3) + targeted surface checks |
| **Before a launch or marketing push** | Full audit with extra attention to landing page and FAQ |
| **After a batch of small changes** (3+ features in a week) | Full audit — small changes are the ones most likely to be missed |

---

## Tips for a thorough audit

1. **Start from the source of truth, not from the surfaces.** Build your feature checklist from what shipped, then check each surface against it. This catches *omissions*. Starting from the surfaces only catches *inaccuracies*.

2. **Read surfaces as a new user would.** Open the landing page, about panel, and help in sequence. Is the story coherent? Does the help answer questions the landing page raises?

3. **Check ordering, not just presence.** A feature can be "mentioned" in help but buried as item #18 of 20. If it is a primary capability, it should be near the top.

4. **Look for orphaned content.** After renames, old help topics or tour steps may reference features by their old name or old UI path. These are confusing for users even if the feature still exists.

5. **Cross-check the onboarding flow.** Onboarding is the user's first impression. If it mentions features that no longer exist, or skips features that are now central, the first experience is misleading.

6. **Consider feature grouping holistically.** If the landing page groups features into themes, the features panel, help sections, and tour categories should use compatible groupings — not identical, but not contradictory.

7. **Watch for features buried as subtopics.** When a feature graduates from being a tab inside another panel to being a standalone panel with its own nav entry, update help and feature-guide content to match. A top-level nav citizen deserves a top-level help section — not a paragraph inside another feature's section. This is the most commonly missed elevation step.

8. **Don't forget exports.** If the product generates downloadable documents (DOCX, PDF, ZIP), those documents carry the product's brand into the user's filesystem. Stale headings or descriptions in exports are just as visible as stale help text.

9. **Flag candidates for new tours or help topics.** If a feature is complex enough to need explanation but has no tour or help topic, that is a finding — not just "nice to have."

---

## Run Logging

After completing the audit (and any remediation), append an entry to `docs/AUDIT_LOG.md` (create if needed) under a new date heading:

- **Audit type:** User-Facing Content Sync Audit
- **Date range covered:** [start] – [end]
- **Surfaces audited:** (list)
- **Feature checklist size:** N features checked
- **Findings:** N missing / N stale / N misleading / N discoverability issues
- **Remediated in session:** N (list key fixes)
- **Deferred:** N (list with reason)

This keeps a dated history so the next audit can focus on the delta.
