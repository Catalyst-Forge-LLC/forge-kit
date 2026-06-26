# [APP NAME] — Manual Test Plan

Last updated: [DATE]

This document is a walkthrough a tester can follow to exercise every major feature of the app. Each section lists preconditions, steps, and expected results. Work through it top to bottom; later sections assume earlier ones passed.

> 💡 **Lesson learned:** A manual test plan is essential even for solo projects.
> Automated tests are great for regressions, but a structured manual walkthrough catches
> UX issues, flow breakages, and integration failures that unit tests miss. This plan
> should be runnable end-to-end in 30-60 minutes and cover every user-facing feature.

---

## 0. Environment Setup

**Preconditions**

- Database running locally ([DATABASE] on default port)
- `.env` populated with all required vars (see `.env.example`)
- Dev server running (`pnpm dev`)
- Payment provider test-mode keys configured (if applicable)
- At least one OAuth provider configured (if applicable)

**Verify**

- [ ] App loads at `http://localhost:[PORT]` without errors
- [ ] Database admin UI is accessible
- [ ] Browser console is free of CSP violations and JS errors

---

## 1. Authentication

### 1.1 Email Signup

- [ ] Navigate to signup page
- [ ] Fill in required fields (name, email, password)
- [ ] Password validation feedback appears while typing
- [ ] Click "Create Account"
- [ ] Redirected to main dashboard
- [ ] User record created in database with correct defaults (plan, trial dates, etc.)

### 1.2 Email Login

- [ ] Log out
- [ ] Redirected to login page
- [ ] Enter credentials from 1.1
- [ ] Click "Sign In"
- [ ] Redirected to dashboard; user data loads correctly

### 1.3 OAuth Login (if configured)

- [ ] Enabled providers show as buttons on the login page
- [ ] Clicking a provider redirects to the OAuth flow
- [ ] After authorizing, redirected back to dashboard
- [ ] User record created/updated in database

### 1.4 Session Persistence

- [ ] Hard-refresh the page while logged in
- [ ] User remains authenticated (no redirect to login)

### 1.5 Logout

- [ ] Click sign out
- [ ] Redirected to login page
- [ ] Navigating to protected routes redirects back to login

### 1.6 Transactional outbound email (if applicable)

**Preconditions:** Provider API key and From address set in server env; sending domain verified per provider (SPF/DKIM/DMARC in DNS).

- [ ] After **email/password signup** (or equivalent), the inbox receives the expected **welcome** message (or verify delivery in the provider dashboard).
- [ ] After **password change**, a **security notice** arrives if your app sends one.
- [ ] If **billing webhooks** trigger mail (subscription active, payment failed), exercise test-mode checkout / failure paths and confirm one message per event (no duplicates on webhook retry when idempotency is implemented).

### 1.7 Credential refresh (password change, token rotation) (if applicable)

- [ ] Change password (or equivalent credential rotation) from in-app settings.
- [ ] After success, **main lists / boards / pipelines** show **expected rows** — not an empty shell from stale client cache or aborted parallel fetches until hard refresh.
- [ ] If the app uses **parallel list loads** on one data route, spot-check that re-auth did not leave **cancelled** requests rendering as blank (see **CONTEXT_PROMPT** list-route patterns).

### 1.8 External identity URLs — profile / contact links (if applicable)

_Use when users store **portfolio or professional-network URLs** used for linking, prompting, or exports._

- [ ] Paste a URL **with tracking query params** or alternate host casing — saves as **canonical** form per server rules where applicable.
- [ ] Broken or non-HTTPS URLs behave per policy (reject vs normalize) with readable errors.
- [ ] **Data export** treats these fields consistently with **PII** policy (included, redacted, or separate appendix).

---

## 2. [CORE FEATURE AREA 1]

### 2a. Multi-record or bulk import (if applicable)

_Use when users can paste, upload, or import many external URLs or rows in one action (e.g. jobs, bookmarks, listings)._

**Preconditions:** At least one record already exists from the single-import path (for duplicate comparison).

- [ ] Open the bulk / multi-import entry point (e.g. export panel pairing, "import multiple" from the primary add flow).
- [ ] Paste or upload a small list with a **duplicate** of an existing URL — preview flags it; default selection skips or warns per product rules.
- [ ] Import **multiple** new URLs — each record uses the **same** pipeline as single add (visible progress, finalize, entitlements).
- [ ] Hitting plan / scrape limits mid-batch surfaces the **same** upgrade or limit UX as single add; no silent partial charge or unbounded queue.
- [ ] If the app exports **CSV** and claims re-import support, spot-check that **column headers match row fields** (no silent shift of tags, dates, or URLs into wrong columns).
- [ ] **Thin listing body:** Import a URL whose **main text omits** a field your schema requires (e.g. employer name on an aggregator). After **finalize** / enrichment, that field is still populated from **stub metadata or hints**, not cleared by an empty model value.
- [ ] **Markup drift / empty parse (if applicable):** If the product imports from **external listing or article URLs**, spot-check a host known to serve **valid HTML** in-browser where **legacy selectors** once failed: the user should see an **outcome-oriented** error or recovery (not a circular “paste the exact URL again” when the link is already canonical). If you ship **optional LLM recover** from raw HTML, toggling the disable env (if any) changes behavior predictably; **diagnostics** or support tooling reflect which stage failed (fetch vs parse vs recover).
- [ ] **Progressive import resilience (if stub + finalize are separate client calls):** After a stub succeeds, simulate or observe a finalize **failure** (offline tab, bogus proxy, or non-JSON error body). The UI should **reconcile** from a read-by-id path or surface the same **failure merge** as a dedicated error response — **not** remain forever on “in progress” with no pipeline update. Spot-check **discovery / suggestions** and **onboarding** add paths match the main modal behavior.
- [ ] **Workflow visibility:** If the product uses **status** or **column** enums for boards, seed or locate a row with a **legacy or empty** status (if plausible). It should appear in a **defined** bucket (or triage column), match **search** expectations, and keep **counts** consistent with visible columns — not vanish while still blocking duplicates.
- [ ] **Dual listing URLs (if applicable):** If records store both an **apply/source** URL and a **discovery** URL, confirm **detail UI** shows both with distinct labels; **export or CSV** includes both in stable columns; duplicate detection still behaves as documented when only one of the two repeats.


### 2b. Intent-driven discovery and deep-linked panel state (if applicable)

_Use when recommendations, search, or a stored **profile / direction** feed the same create pipeline as manual entry, and when major panels or tabs sync to URL params._

- [ ] From the **discovery or recommendations** surface, add an item — **limits, duplicates, progress, and errors** match the manual add path.
- [ ] After changing the **profile or direction** that drives suggestions, dependent lists or badges **refresh** (no stale titles until full reload).
- [ ] Copy the URL with **`tab=` / sub-panel query params** (or equivalent), open in a fresh tab or hard-refresh — the **same tab/subview** restores.
- [ ] If the product runs **trust / plausibility** checks on imported records, spot-check a posting with **structured pay** (schema, native range UI, or OG fields) — warnings should not contradict visible comp unless extraction actually failed.
- [ ] If a **named discovery** workflow is reachable from **both** top-level nav (or a marketing CTA) and an in-panel tab, both paths open the **same** view and use **consistent** labels with Help and tours.
- [ ] **Bulk add from discovery** (if applicable): Narrow the list with **quick filters** or direction/URL selection — **add selected** should only enqueue rows that match the **visible** filtered set (or the product should reset filters with explicit copy).

### 2c. Horizontally scrollable board / pipeline drag (if applicable)

_Use when primary workflow uses **native HTML5 drag** across columns inside a **horizontal** `overflow-x` container._

- [ ] Drag an item toward a column that starts **off-screen** horizontally — the container **auto-scrolls** so you can complete the drop without releasing early to scroll manually.
- [ ] After drop, the **browser console** stays clean on navigation (no SSR errors from `document` / `window` in `onDestroy` cleanup for global drag listeners).

> 🔧 **Guidance:** Add sections for each major feature area. Structure each as:
>
> ### [Feature].1 [Sub-feature Name]
>
> - [ ] Description of action to take
> - [ ] Expected result
> - [ ] Edge case to verify

---

## 3. [CORE FEATURE AREA 2]

---

## 4. AI Features (if applicable)

> 💡 **Lesson learned:** LLM-powered features need special test attention:
> - Progress indicators during generation (spinner, progress bar, staged labels)
> - Output persistence (does it survive tab switch and page refresh?)
> - Output quality spot-checks (tone, accuracy, format)
> - Token/usage tracking (are costs being recorded correctly?)
> - Graceful degradation if the API is down or slow

### 4.1 [AI Feature Name]

- [ ] Trigger the AI feature
- [ ] Progress indicator appears with appropriate feedback
- [ ] Results render correctly when complete
- [ ] Results persist across navigations and refreshes

### 4.2 In-tab or in-document tailoring critique (if applicable)

_Use when users run a **quality review** (heuristics, LLM audit, or checklist) on an **already-generated** tailored document tied to a **target record** (e.g. job-specific résumé)._

- [ ] Run critique — progress and completion states are clear; no perpetual “still analyzing” without a terminal outcome when the upstream key/service is unavailable.
- [ ] **Persist:** Switch tabs or reload — critique results (and approval/dismiss state) reload with the record.
- [ ] Optional **structural control** (e.g. reorder for narrative coherence): user can accept, override, or undo; exported documents reflect the chosen structure.

### 4.3 Factual grounding and programmatic veracity checks (if applicable)

_Use when the product generates tailored materials representing the user (cover letters, statements of interest, custom pitches) and programmatically audits them against a source document of record (e.g. base resume) to prevent fabrications._

- [ ] **Grounding Check:** Run document tailoring with a base resume template. Verify that the full resume text is passed to the LLM (no fabrication of technologies, metrics, or roles).
- [ ] **Automatic Veracity Pass:** Verify that a programmatic veracity check runs automatically after generation.
- [ ] **Flagged Issues:** If the tailored document contains ungrounded claims, verify that they are flagged in the UI with exact excerpts, reasons, severity levels, and suggested repairs.
- [ ] **Success State:** If all claims are grounded, verify that a success state is displayed.
- [ ] **Persist:** Switch tabs or reload — veracity results reload with the record.
- [ ] **Dismissal:** Verify that clicking "Dismiss" or "Clear audit" successfully clears the veracity results from the record.

### 4.4 Anti-self-importance and position-of-strength tone checks (if applicable)

_Use when the product generates tailored materials representing the user (cover letters, statements of interest, custom pitches) and enforces strict tone, register, and posture controls._

- [ ] **No Grandiose Framing:** Verify that routine work is stated at face value without dramatic or grandiose descriptions (e.g., "designed systems" instead of "originating products at the edge of what organizations know how to build").
- [ ] **No Visionary Self-Positioning:** Verify that there are no priority claims or timing assertions designed to establish priority (e.g., "before X was mainstream").
- [ ] **No Analytical Flattery:** Verify that the target company is not ranked or called "rare," "unique," or "the rarest environment."
- [ ] **No Name-Dropping by Negation:** Verify that no tools, frameworks, or competitors are named solely to say the candidate did not use them or built something better (e.g., "rather than using LangGraph").
- [ ] **No Performative Specificity:** Verify that there are no dense technology inventories used as arguments for fit instead of narrative.
- [ ] **No Modifier Stacking:** Verify that credential-bearing modifiers are limited to one per noun phrase.
- [ ] **Position-of-Strength Posture:**
  - Verify that the text does not mirror the job description as proof of fit ("the work you describe is the loop I have been running").
  - Verify that there are no aphorisms, maxims, or theses delivered as quotable wisdom.
  - Verify that ordinary work habits are not branded as named personal methods.
  - Verify that there is no striving or grind vocabulary (e.g., "the loop I have been running", "hold up in production", "want to keep doing").
  - Verify that there are no humble-brags that raise a hurdle only to clear it.
  - Verify that there is no rhetorical scaffolding, self-narration, or instructed interpretation (e.g., calling career periods "chapters" or "milestones").

### 4.5 Assertive product copy — no hedging *can* (if applicable)

_After marketing, help, or onboarding edits — or when adding feature descriptions._

- [ ] Grep copy modules for `\bcan\b`; fix **product capability** hedges (`can strengthen` → `strengthens`, `can suggest` → `suggests`).
- [ ] Leave **user permission** (`You can…`), **factual limits** (`what we can read…`), and **people** (`who can help`) unchanged.
- [ ] How-it-works / landing steps use present-tense direct verbs for shipped behavior.

### 4.6 Structured eligibility / requirement fit (if applicable)

_Use when jobs or listings store structured requirements compared to user profile status (education, clearance, license, work authorization, etc.)._

- [ ] Import + refresh populate requirement fields; regex fallback when LLM omits.
- [ ] User declares status in profile/onboarding; optional inference from resume text.
- [ ] Card badge + detail Logistics row + board filter use shared mismatch/match helpers (filter counts align with board).
- [ ] Fit scoring and tailoring/prep prompts include requirement context block.
- [ ] PATCH / API field maps include requirement fields (grep `fieldMap` / config schema).
- [ ] Unit tests: extraction regex samples, `hardMismatch` / filter predicates.

---

## 5. Billing & Entitlements (if applicable)

> 💡 **Lesson learned:** Test the full billing lifecycle end-to-end:
> signup → trial → hit limits → upgrade → downgrade → cancel.
> Pay special attention to what happens at tier boundaries and trial expiry.
> Silent failures here erode trust faster than any other bug category.

### 5.1 Trial/Free Tier Limits

- [ ] New user gets correct default plan/trial
- [ ] Exceeding a limit shows appropriate upgrade prompt
- [ ] All gated features are correctly locked

### 5.2 Payment Flow

- [ ] Click upgrade; redirected to payment provider (test mode)
- [ ] Complete payment with test credentials
- [ ] Webhook fires; user plan updated
- [ ] Usage counters reset; new limits in effect

### 5.3 Subscription Management

- [ ] Can view invoices, update payment method, cancel
- [ ] Cancellation downgrades user at period end
- [ ] Usage limits revert correctly

---

## 6. Filtering, Search & Navigation

- [ ] Search/filter UI works correctly
- [ ] Filters combine correctly (AND/OR logic as designed)
- [ ] Filter state persists across page refreshes
- [ ] Empty states show helpful messages

---

## 7. UI & UX

### 7.1 Theme

- [ ] Toggle dark/light mode
- [ ] All components render correctly in both themes
- [ ] Preference persists across sessions

### 7.2 Responsive Layout

- [ ] Key layouts work on mobile viewport
- [ ] Panels/modals behave correctly at small sizes
- [ ] No horizontal overflow or broken layouts

### 7.3 Icons & Assets

- [ ] All action buttons display their icons correctly
- [ ] No broken icon placeholders or CSP violations
- [ ] Favicon renders in browser tab

### 7.4 Loading States

- [ ] App loads with proper skeletons/spinners (no flash of empty state)
- [ ] Data-heavy primary surface uses a **skeleton shaped like the destination** (not a centered spinner); layout does not jump when data lands
- [ ] Failed data loads show retry/refresh indication

### 7.4a Global keyboard shortcuts (if applicable)

- [ ] Minimal set works on the bare primary surface: focus search, create-new, open help (`?`)
- [ ] Shortcuts **do not** fire while typing in an input/textarea/select/contenteditable, or during IME composition
- [ ] `?` opens a help overlay listing global **and** context (record-detail) shortcuts
- [ ] `Esc` closes an open flyout/menu, but **defers** to a record drawer or modal that owns Escape (no double-close)
- [ ] Create-new shortcut respects gating (read-only/viewer/expired) the same way the button does

### 7.4b First-run hints (if applicable)

- [ ] A one-time "start here" hint appears on first open of a dense surface and is dismissible
- [ ] Dismissal persists per user across reloads (and does not leak across delegate/coach accounts)

### 7.4c Modal focus trap (if applicable)

- [ ] Opening a modal moves focus inside the dialog (or `[data-autofocus]` target)
- [ ] Tab / Shift+Tab cycle within the dialog only; focus does not reach the page behind
- [ ] Closing the modal returns focus to the element that opened it
- [ ] Escape is handled by the modal layer; global Escape defers when a modal is open

### 7.4d First-artifact orientation (if applicable)

- [ ] First successful completion of the core generated bundle shows a one-time orientation overlay
- [ ] Overlay lists what was built and where each piece lives; primary action opens the output surface
- [ ] Dismissal persists per user; overlay does not re-fire after dismissal

### 7.4e Board "Start here" recommendation (if applicable)

- [ ] When prioritized follow-ups exist, the collapsed bar highlights the single top item as "Start here" (one click opens in context)
- [ ] Expanded view still shows the full list and quick actions unchanged

### 7.4f AI section lifecycle states (if applicable)

- [ ] Empty, generating, ready, and stale (when input-hash exists) use consistent refresh labels across AI sections on one record
- [ ] Stale state shows a non-blocking banner with user-initiated refresh only — no silent auto-regen on input change
- [ ] Generating state does not leave a perpetual placeholder if the server returns a terminal error

### 7.5 Persistent assistant or copilot shell (if applicable)

_Use when a **dock, rail, or side panel** hosts ongoing AI conversation scoped to optional **record context**._

- [ ] With **no record** selected (or cleared), assistant shows grounded empty state — **not** stale context from the previous selection.
- [ ] **Streaming** has clear progress and terminal outcomes (completion, cancellation, structured error).
- [ ] Metering / entitlements mirror **other** LLM surfaces for comparable actions.

### 7.6 Multi-lens detail views (if applicable)

_Use when one **detail** screen has tabs or panels for **distinct persisted** analytic or AI outputs on the **same entity**._

- [ ] Regenerating one lens does not overwrite another unless intentionally architected that way (document which).
- [ ] **Exports / bundles** include or exclude each lens per product policy.

### 7.7 Admin master–detail tables (if applicable)

_Use when operators manage users, billing, or tenants in **dense** tables with **expand** or **secondary** panes._

- [ ] Expanded row **colspan** matches table structure; no header/body column drift.
- [ ] If **impersonation** exists, visual guardrails make the **active principal** obvious before destructive or billing actions.
- [ ] Gated server-side proxy route is strictly restricted to administrator sessions (non-admins get 401/403).
- [ ] Service credentials (e.g. `[SERVICE]_TOKEN`) are completely withheld from the client-side browser payload.
- [ ] Network topography, connection hosts, or passwords inside connection strings are resolved on the server and stripped from the returned response.
- [ ] The proxy route implements a strict timeout (e.g., 10s) and handles edge node offline/down states gracefully without throwing uncaught 500 errors.

### 7.8 Long-form generated reading (if applicable)

_Use when the UI renders **long structured reports** (AI dossiers, markdown bodies, multi-section briefs)._

- [ ] Sticky outline lists major headings (and subsections where useful); clicking an item scrolls to the anchor
- [ ] Scroll-spy or equivalent highlights the section currently in view
- [ ] Deep links (`#slug`) open the correct section; browser back/forward behave predictably
- [ ] Mobile: outline collapses into drawer or compact control so reading width is preserved
- [ ] Outline links are keyboard-accessible (focus management acceptable for product policy)

---

## 8. Security & Edge Cases

### 8.1 CSP Headers

- [ ] Browser console free of Content-Security-Policy violations
- [ ] All external resources (CDN, fonts, scripts) allowed by CSP

### 8.2 CSRF Protection

- [ ] POST/PATCH/DELETE requests include proper Origin header
- [ ] Cross-origin state-changing requests are rejected

### 8.3 Rate Limiting

- [ ] General API: [X] requests/minute per IP
- [ ] Expensive routes (LLM, etc.): [Y] requests/minute per IP
- [ ] Exceeding limits returns 429 with retry-after header

### 8.4 Auth Guards

- [ ] All API routes return 401 for unauthenticated requests
- [ ] Users cannot access other users' data
- [ ] Admin-only routes reject non-admin users

### 8.5 Input Validation

- [ ] Submit forms with empty/invalid fields → validation errors shown
- [ ] Submit malformed input to API → appropriate error returned
- [ ] File upload accepts only allowed types; rejects oversized files

### Resume / cover-letter upload — LLM JSON resilience (if product maps uploads via structured JSON)

_Use when DOCX or PDF resume import runs an LLM “map to skeleton” step before saving a template._

- [ ] Upload a **.docx** whose bullets or role blurbs contain **soft line breaks** (Shift+Enter) or multi-line table cells — import should **succeed** (not “could not parse structure” with `server_failure_llm_parse` / `Bad control character in string literal`).
- [ ] If import still fails, confirm UI shows a **Support ID** and PostHog `server_failure_llm_parse` or `server_failure_llm_call` includes matching `debugId` + `errorMessage`.
- [ ] Re-upload the same file after flattening line breaks in Word — should succeed even without server fix (sanity check for content vs infra).

### 8.6 List APIs + nested BaaS reads (manual)

> 💡 **Lesson learned:** If a **GET list** route loads a parent collection then **parallel-fetches** related rows per parent through a single BaaS SDK client, verify **full page reload**: nested data (e.g. child records, flags derived from another collection) still appears. Regressions here often show up as empty nested arrays with **no user-facing error** when the SDK auto-cancels concurrent same-collection requests server-side.

- [ ] Create or attach nested data, reload the app: list and detail views still show the nested data
- [ ] Server logs: no repeated “aborted” / “auto-cancelled” errors on list enrichment during normal load

---

## 9. Deployment Verification

> 💡 **Lesson learned:** Run a subset of this plan against the production
> deployment, not just localhost. Differences in environment (reverse proxy, HTTPS,
> DNS, environment variables) cause bugs that never appear in dev.

- [ ] Production URL loads correctly
- [ ] Auth flow works end-to-end
- [ ] Core feature works with real data
- [ ] No mixed content warnings (HTTP/HTTPS)
- [ ] Error pages render correctly (404, 500)

---

## 10. Client Fetch and Polling Resilience

> 💡 **Lesson learned:** Bulk operations are the stress test for client-side polling. A single-item import may work perfectly, but importing 20+ items can spawn dozens of concurrent `setInterval` polling loops that collectively overwhelm the server's rate limiter, triggering 429 cascades that corrupt UI state when error responses are parsed as data.

- [ ] Bulk import 20+ items: no 429 storms in the console; no UI freeze
- [ ] During bulk import, individual job polling is suppressed (check Network tab for request volume)
- [ ] Rate-limited (429) polling loops back off exponentially instead of retrying every tick
- [ ] Navigate away from a page while polling is active: no orphaned fetch requests continue in the background
- [ ] Open a detail panel, switch to a different record while an async operation is running: no stale data from the previous record appears on the new one
- [ ] Toggle a star/favorite while offline or with simulated server error: star reverts to original state
- [ ] Save notes or tweaks with a simulated server failure: the shared indicator shows the **error** phase ("Couldn't save…"), not a false "Saved"
- [ ] Blur-save fields show the full ack lifecycle: `Saving…` while the request is in flight, then `✓ Saved` (auto-clears) on success
- [ ] Every Tier-A blur-save field (parent **and** child tabs) feeds the **same** shared indicator — no field persists silently with no acknowledgement
- [ ] Delete a record with a simulated server failure: confirmation dialog stays open (does not close as if succeeded)
- [ ] `res.ok` is checked before `.json()` on all interactive `fetch` calls (code review)
- [ ] Long-running **generation or research** routes: simulate HTML/plain-text error responses — UI shows a clear message without crashing; server returns JSON errors when `Accept: application/json` (when applicable)

---

## 11. Record-Level Activity / Event Timeline (if applicable)

- [ ] Create a manual timeline event: appears in the timeline with correct timestamp and body
- [ ] Edit an existing event: changes persist after reload
- [ ] AI-generated triage/note: marked distinctly from user-created entries
- [ ] Status change creates exactly one event (no duplicates from optimistic UI + server hook)
- [ ] Markdown body renders correctly; external links open in new tabs
- [ ] Quick-log from a reminder or dashboard surface: event appears in the main timeline

---

## 12. User-Facing Copy Hygiene (optional — when copy modules are adopted)

**Preconditions**

- App uses centralized copy under `$lib/content/` (or equivalent) with `export:copy` and `audit:inline-copy` scripts

**Verify**

- [ ] `pnpm export:copy` completes without errors; writer catalogs updated
- [ ] `pnpm audit:inline-copy` reports **0 UI prose not in export** (terms/CSS/noise may remain)
- [ ] `pnpm audit:copy` — no unintended duplicate prose in export (or duplicates documented as intentional)
- [ ] Run **`user-facing-content-sync-audit.md`** — every shipped feature appears on landing, help, and tours where appropriate
- [ ] Help panel and onboarding strings do **not** mention internal spec paths or backend service names
- [ ] New panel added in this release has a corresponding `*Copy.ts` module (no new product prose left inline)

---

## Notes

> 🔧 **Guidance:** Add test-specific notes, known issues, or environment-specific workarounds here.
