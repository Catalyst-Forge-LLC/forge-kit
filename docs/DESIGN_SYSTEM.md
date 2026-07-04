# [App Name]: Design System & Visual Philosophy

_For brand voice and copy guidelines, see [BRAND_AND_PRODUCT.md](BRAND_AND_PRODUCT.md). For technical implementation, see [TECHNICAL_REFERENCE.md](TECHNICAL_REFERENCE.md)._

_Instructions: Create this document during Phase 6 (Strategic Review) or whenever your visual language has solidified enough to codify. It serves two purposes: (1) guidance for Claude when building new components, and (2) a reference to prevent visual drift across sessions. Update when the design matures, but it should stabilize relatively early._

---

## Design Sensibility

_3-5 sentences that describe the emotional register of the interface. What should it FEEL like to use? What should it NOT feel like?_

[Describe the intended emotional quality. Reference analogies if helpful — "like a well-appointed workspace" or "like a professional's private notebook."]

### Guiding Principles

1. **[Principle]:** [How it manifests in visual decisions]
2. **[Principle]:** [How it manifests in visual decisions]
3. **[Principle]:** [How it manifests in visual decisions]

> 📝 **Example:**
> 1. Earned restraint over gratuitous polish — every visual flourish must serve a purpose (signaling status, guiding attention, reinforcing hierarchy)
> 2. Felt, not seen — the best details register subconsciously. Shadows, tints, micro-animations. Users should feel "this is polished" without pinpointing why.
> 3. Warmth over sterility — warm neutrals and soft shadows prevent the clinical feel of most SaaS
> 4. Accent as punctuation — the brand color appears sparingly, like a signature pen on a handwritten note. Overuse dilutes it.
> 5. Density without clutter — the audience is information-literate. Organize density with clear hierarchy, don't hide it behind progressive disclosure.

---

## Color System

### Light Theme

| Token                  | Value   | Role                        |
| ---------------------- | ------- | --------------------------- |
| `--app-bg`             | [color] | Page background             |
| `--app-surface`        | [color] | Cards, panels, raised areas |
| `--app-surface-hover`  | [color] | Interactive hover states    |
| `--app-surface-raised` | [color] | Highest elevation (modals)  |
| `--app-border`         | [color] | Primary borders             |
| `--app-text`           | [color] | Primary text                |
| `--app-text-muted`     | [color] | Secondary text              |
| `--app-accent`         | [color] | Brand accent                |
| `--app-accent-hover`   | [color] | Accent interaction state    |

### Dark Theme

_Same tokens, different values. Note the deltas, not just the colors._

| Token           | Value   | Role                                                   |
| --------------- | ------- | ------------------------------------------------------ |
| `--app-bg`      | [color] | [e.g., deep navy, not black]                           |
| `--app-surface` | [color] |                                                        |
| `--app-accent`  | [color] | [e.g., lighter variant of accent for dark bg contrast] |

> 💡 **Lesson learned:** Avoid pure white (#ffffff) or pure black (#000000) for backgrounds. Warm palettes (parchment light, deep navy dark) create emotional warmth that users register subconsciously. The difference between "generic SaaS" and "this feels premium" is often just 10-15 degrees of hue shift in the neutrals.
>
> Also expose the accent color as an `--app-accent-rgb` variable (e.g., `55, 48, 163`) so it can be used in `rgba()` functions throughout the CSS for opacity-controlled accent washes without hardcoding the color value everywhere.

---

## Shadow System

| Token                 | Purpose             | Light Theme Value |
| --------------------- | ------------------- | ----------------- |
| `--shadow-sm`         | Navbar, subtle lift | [value]           |
| `--shadow-md`         | Moderate cards      | [value]           |
| `--shadow-lg`         | Dropdowns, overlays | [value]           |
| `--shadow-xl`         | Tooltips, popovers  | [value]           |
| `--shadow-card`       | Item cards at rest  | [value]           |
| `--shadow-card-hover` | Cards on hover      | [value]           |
| `--shadow-panel`      | Slide-out panels    | [value]           |

> 💡 **Lesson learned:** Card hover shadows and panel shadows should carry a barely perceptible accent tint (rgba(accent, 0.04) outer glow). Combined with gradient backgrounds, this makes the brand color feel ambient — it's everywhere but nowhere specific.

---

## Accent Hierarchy

_Define three intensity tiers for the brand accent color. This prevents both overuse and underuse._

### Strong (clearly visible)

- Primary CTA buttons
- Active tab underlines
- Status badges and active filter pills

### Medium (noticeable on attention)

- Icon containers (`bg-accent/10 text-accent`)
- Card/modal top-borders (`border-t-2 border-t-accent/40-50`)
- Panel left-edge borders on emphasis elements

> 💡 **Lesson learned:** An accent top-border on a component flush with the browser viewport edge (e.g. a full-height side panel anchored to `top-0`) is effectively invisible — the thin line blends into the window chrome. Move the accent to a bottom-border on headers or a visible inset edge instead. Reserve top-borders for cards and modals that have clear visual space above them.

### Subtle (felt, not seen)

- Card hover shadow accent tint (`rgba(accent, 0.04)`)
- Panel left-edge shadow glow
- Active tab background wash (`bg-accent/[0.04]`)
- Grid/pattern backgrounds at 2-3% opacity
- **Gradient backgrounds on surfaces** — layered `radial-gradient()` over `var(--color-surface)` at 3-7% opacity

> 💡 **Lesson learned:** The subtle tier is the most important. It's what makes the difference between "clean but generic" and "this feels intentional." Define reusable CSS classes: `.modal-gradient` (radial-gradient from accent at top-left, over surface), `.panel-gradient` (radial-gradient from left-edge + linear-gradient top-fade, over surface). Apply to ALL modals and panels uniformly. Use slightly higher opacity in dark mode (5-7%) than light mode (3-5%) because dark backgrounds absorb more of the color. Keep the Tailwind `bg-surface` class alongside the gradient class as a fallback.

---

## Layout Patterns

### Slide-Out Panels — Width Tiers

_Define standard panel widths for consistency. Not every panel needs to be unique._

| Tier     | Width                | Use Cases                          |
| -------- | -------------------- | ---------------------------------- |
| Standard | `max-w-2xl` (672px)  | Profile, settings, content editing |
| Medium   | `max-w-3xl` (768px)  | Lists, help, moderate detail       |
| Large    | `max-w-5xl` (1024px) | Detail views, dashboards, admin    |

All panels share: `fixed right-0 top-0 bottom-0`, entrance animation, `bg-surface [panel-gradient]`, `border-l`, backdrop with click-outside.

### Panel interior: compact hero band (workspace panels)

_Use inside slide-out panels when the top of the surface is **list + search + filters + primary content** — not a rich “default selection” or preview row._

Dense workspace panels (e.g. a **[Resource] library**, **[Entity] bank**, or categorized **list + master–detail** layout) often need a short blurb and status chips but **not** a large icon circle: the panel header already carries the icon and title. Prefer a **compact hero** — still `card-elevated card-elevated-no-hover` with `border-t-2 border-t-accent/35`, but:

- **Inline icon** — `w-5 h-5 text-accent shrink-0` instead of a ~5rem circle and sub-label.
- **One row** — blurb (`text-xs text-text-muted leading-snug`, `min-w-0 flex-1`) plus optional **status chips** (`flex flex-wrap gap-2`) and **kebab / overflow actions** top-right (`shrink-0 self-start`); keep overflow actions out of the panel header.
- **Search and filter chips inside the same card** — full-width search under that row; horizontal filter chips below when needed (reuse the same pill/chip patterns as elsewhere in the product).
- **Tighter padding** — inner `px-4 py-2 space-y-2`; outer band around the card `shrink-0 px-5 pt-2 pb-2 space-y-2` (vs looser padding when using a **full** hero with a large circle and extra stacked rows).

**When to use a full hero instead** — The panel needs a strong visual anchor for first-time orientation (e.g. current default selection, readiness state, live preview). Use **compact** when the user should reach the list or editor quickly.

> 💡 **Lesson learned:** Merging search, filters, and the blurb into one **compact hero** card removes dead vertical gaps between separate blocks. Pick **compact** for workspace panels where the panel header already identifies the surface; document both patterns in your living design spec so new panels default to the right variant.

> 💡 **Lesson learned:** **Run a systematic vertical density pass** across all panels and tabs once the feature set stabilizes. Common wins: remove redundant section headers that duplicate the tab label, collapse instructional text into the textarea placeholder or a tooltip, tighten `gap-*` and `py-*` from generous early-development spacing (e.g., `gap-6` → `gap-3`, `py-6` → `py-3`), and eliminate per-section intro paragraphs when the panel header or tab name already communicates the purpose. A canonical spec (e.g., `specs/canonical/panel-vertical-density.md`) with shared CSS class tokens and before/after spacing conventions keeps the pass consistent across panels. **Why:** Every unnecessary line of chrome above the primary input area costs the user a scroll; density is especially critical on slide-over panels where vertical space is limited.

### Panel navigation model (side-tab rail)

_Use when a slide-out panel has **≥ 3 co-equal sections** (settings groups, feature areas, workflow stages) that today live as a top tab strip, nested tab bars, or a long accordion._

Once a panel grows past two modes, a **section rail** reads calmer than stacked cards or a crowded tab strip. The canonical shape has four rules:

1. **Persistent header card.** The panel's primary object (the file, the record, the summary) renders **once at the top** and stays visible across every section — it is not a section you can navigate away from.
2. **A section rail, not stacked cards.** Sections are a **vertical rail on wide screens** (`lg:` and up, `lg:sticky lg:top-0`) and a **horizontal scrollable pill strip on narrow screens**. One click reaches any section.
3. **One scroll.** The panel body is the **only** `overflow-y-auto` region; content panes do not add a second nested scrollbar in the same column (see the single-scroll anti-pattern in `CONTEXT_PROMPT.md`).
4. **One content pane at a time**, chosen by a single `*Section`/`activeTab` state with a reset effect when the panel/tab closes.

> 🔧 **Guidance:** Adopt a rail at **≥ 3 sections**; panels with **≤ 2 modes** keep a plain top tab strip (a rail adds chrome without payoff). **Exception — master-detail panels** (an entity list you pick from: contacts, stories, saved records) keep their own list rail and its independent list scroll; they borrow only rules 1 and 3 (persistent header, no nested scroll **inside the detail pane**). Extract two shared primitives so the model does not re-multiply chrome: a **`PanelShell`** (backdrop, fixed-right column, entrance animation, header slot, optional non-scrolling `belowHeader` slot for tab strips/search, single scroll body, built-in width toggle) and a **`PanelSideNav`** (responsive rail driven by a typed `{ id, icon, label, statusLabel?, disabled? }[]`). Record the model in a living design/spec doc so new panels default to it. **Why:** Every panel that reinvents its own interior wayfinding is a "feels like N stitched-together apps" cohesion tell; a shared shell + rail makes wayfinding identical everywhere and removes duplicated backdrop/scroll markup.

### Modals

- Centered with backdrop
- Entrance animation (scale-up, 200ms)
- Accent top-border (`border-t-2 border-t-accent/50`)
- `bg-surface [modal-gradient]`
- `shadow-2xl`
- For modals with many inputs: use `flex-col md:grid md:grid-cols-2 gap-4` for responsive two-column layout at `md:` breakpoint

> 💡 **Lesson learned:** Modals with 4+ input fields benefit from a two-column layout at desktop widths. Put primary inputs (the "what") in the left column, supplementary context (the "extra") in the right. Merge mode toggles into the header row as compact segmented pills to save vertical space. The container uses `max-w-lg md:max-w-4xl` for responsive breakpoint switching. Mobile falls back to single-column automatically.

> 💡 **Lesson learned:** **Avoid cloning state variables and form logic between a modal dialog wrapper and an inline tab form.** If a creation/editing form is exposed both as a standalone modal (e.g., an "Add Connection" modal from a dashboard) and as an inline tab (e.g., "Add Connection" within a detail tab), do not duplicate the state and controllers. Extract the entire form (input bindings, search, clipboard parsing, and validations) into a reusable form component (`[Entity]Form.svelte`). The modal (`[Entity]Modal.svelte`) then acts as a pure modal layout boundary wrapping `<[Entity]Form>`, keeping the modal script extremely lean and making fields easily maintainable in one place.

> 💡 **Lesson learned:** **Extract inline add/create forms into standalone modals when the form grows beyond 2-3 fields or appears in multiple contexts.** Inline forms inside tabs or panels compete for scroll space with the content they create, and they can't be reused from other entry points (quick-add buttons, onboarding, bulk flows). Extract to a dedicated modal component; give the modal a focused layout (icon + title header, consolidated field rows for density, mode toggles as compact pills). The parent tab becomes a trigger + list, gaining vertical real estate. **When to keep inline:** Single-field "quick add" (e.g., paste a URL) where the modal overhead would slow the user down.

### Navbar

- Sticky `top-0`, `z-30` (use `z-50` on landing/marketing pages where the nav must sit above hero content)
- `backdrop-blur-sm` (or `backdrop-blur-md` for marketing pages) with slight transparency (`bg-bg/80`)
- Subtle accent shadow below
- On marketing/landing pages, pull the `<nav>` out of the hero `<section>` into its own top-level element so sticky positioning works correctly (a nav inside a hero section scrolls away with it)
- The nav logo should be a clickable link (e.g., `<a href="/start">`) — not a static image

> 💡 **Lesson learned:** If the bar **stays visible** while the page scrolls **and** its **height changes** (smaller logo, tighter padding on scroll), **`position: sticky` alone is often the wrong tool**: parent overflow and layout can prevent a reliable “pinned” feel. Prefer **`position: fixed`** on the bar plus a **non-interactive spacer** in normal document flow whose height **matches** the bar’s expanded vs compact size (transition both together). **Why:** A shrinking bar changes layout height; that nudges scroll position and can flip a “scrolled” threshold back and forth → visible **jitter**. Pair the spacer with **hysteresis** on scroll (switch to compact only after `scrollY` passes a higher value, switch back only below a lower value) so the state doesn’t oscillate at the boundary.

### Full-height main shell (app chrome)

For logged-in layouts with a persistent top bar and a main region below it, **avoid** stacking `min-h-screen` with a hand-tuned `calc(100vh − [nav height])` unless the nav height is provably identical at every breakpoint. A few pixels of mismatch introduces a **permanent page-level vertical scrollbar** and erodes polish.

> 💡 **Lesson learned:** Prefer a **flex column** on the outer shell (`h-screen` / `min-h-0` discipline), navbar `shrink-0`, main area `flex-1 min-h-0` with overflow where scrolling belongs. **Why:** Flex distributes remaining height without fragile viewport math; margin on inner sections inside a height-bounded flex child can still add to overflow—prefer padding inside scroll regions.

### Admin and internal tools: master–detail tables

_Use when **operators** manage **accounts, billing, or tenants** in a data-dense UI._

> 💡 **Lesson learned:** Avoid **twelve** visible columns of mixed criticality. Prefer a **readable row** (identity, plan, lifecycle state) plus **expand** or **slide-over detail** for seldom-used fields (internal notes, promo codes, deep links to billing provider). Keep **header column count** aligned with body rows when using **colspan** for expanded content — misalignment reads as a broken table.
>
> 🔧 **Guidance:** Establish visual hierarchy: primary actions in the row or kebab, destructive actions behind confirm. If **impersonation** exists, use a **persistent banner** or shell token so it is obvious which principal will receive mutations.
>
> 💡 **Lesson learned:** **Use a shared badge/chip class for role and status indicators.** When admin tables display multiple chip types (Admin, Demo, Trial, Plan tier), inconsistent sizing, colors, or borders make the table look unpolished. Define one constant (e.g., `CHIP_BADGE = "text-[10px] uppercase tracking-wide px-1 py-0.5 rounded border ..."`) and apply it to all chips, varying only the color accent. **Admin bypass in trial/plan columns:** Show a neutral placeholder ("—") with an explanatory tooltip instead of repeating the same urgency labels non-admin users see. WHY: Admin rows flagged "Expired" in a triage list create false alarms.

### Dropdown menus: secondary flyouts (hover sub-panels)

When a main menu opens a **second** panel to the side (account switcher, admin links, long pickers), share **visual chrome** (surface, border, radius, shadow) via one CSS class so spacing stays intentional.

> 💡 **Lesson learned:** **`position: absolute` + `right-full` (or equivalent) is measured from the flyout trigger’s containing block.** If one section of the menu wraps rows in **horizontal padding** and another does not, the same utility produces **different gaps** relative to the dropdown edge—test “inset” rows vs “full width” footer rows side by side. Compensate with a calculated offset for padded ancestors, or restructure so `.relative` wrappers share width context.

Large scrollable flyouts anchored near the **bottom** of the menu should not use only `bottom: 0` growth (content clips off the top of the viewport). **Vertically center** the panel on the trigger row (or clamp between top/bottom margins) with `max-height` and internal scroll; compute `top` from `getBoundingClientRect()` on the trigger wrapper if needed. **Keep horizontal** alignment consistent with sibling flyouts (same margin from the parent column)—do not switch to hand-tuned viewport `right` for vertical fixes; that drifts from `absolute` alignment and widens the perceived gap.

> 💡 **Lesson learned:** **Hover flyout state** needs an **identity** per sub-panel. Reset all flags when the **shell** (main menu) closes, not on every `mouseenter`. If opening a flyout runs “close everything” synchronously, re-entering the same trigger after crossing a **pixel gap** between row and panel fires `mouseenter` again and **kills** the panel before the pointer reaches it. Track which flyout is active; if the user re-enters the **same** id, only cancel pending close timers.

---

## Typography

- **Font family:** [e.g., Inter with system-ui fallback]
- **Base letter-spacing:** [e.g., -0.011em]
- **Heading letter-spacing:** [e.g., -0.025em tighter for authority]
- **Body line-height:** [e.g., 1.6]

**Chrome vs. reading:** Use one stack for **navigation, filters, short labels, and dense UI chrome** (typically sans-serif). Use a **distinct reading stack** for long narrative or interview-prep style content if the product mixes structure with prose—intentional font pairing reads as craft; a single family everywhere reads as generic.

> 💡 **Lesson learned:** **Interactive controls** (buttons, inputs, pills, small targets) should share **one default radius**—mixed `rounded` / `rounded-md` / `rounded-lg` reads accidental. Cards and modals can use a larger token deliberately; the hierarchy should be documented, not improvised per screen.

---

## Animations

_Define named keyframes in `app.css` and expose as utility classes._

| Class                  | Animation           | Duration | Use               |
| ---------------------- | ------------------- | -------- | ----------------- |
| `.animate-panel-in`    | Slide in from right | 260ms    | Slide-out panels  |
| `.animate-modal-in`    | Scale up from 95%   | 200ms    | Centered modals   |
| `.animate-backdrop-in` | Fade in             | 200ms    | Overlay backdrops |
| `[custom]`             | [describe]          | [ms]     | [use case]        |
| `transition:slide`     | Height slide         | 200ms    | Auth mode switch, accordions |

> 💡 **Lesson learned:** CSS-only animations (no JS, no per-component imports) are the right default. Define once in app.css, apply via class on any `{#if}`-mounted element. Spring easing (cubic-bezier) feels more natural than linear or ease-in-out for panel slides.
>
> Also useful: a `.reminder-highlight` animation class (2s amber glow pulse via box-shadow + background-color change) for drawing attention to a specific item after navigation. Auto-clear the highlight state after 2.5s to prevent permanent visual noise.

---

## Accessibility Patterns

> 💡 **Lesson learned:** Accessibility isn't a separate phase — it's cheapest when baked into the initial build. These patterns emerged from a landing page audit and apply to every public-facing page.

### Skip-to-Content Link

Every page with a sticky nav should include a visually-hidden "Skip to content" anchor as the first focusable element in the `<body>`. It becomes visible on keyboard focus and jumps past the navigation to `#main-content`. This is a baseline WCAG requirement and trivial to implement — a single `<a>` with `sr-only focus:not-sr-only` classes.

### Headingless Sections

Every visible content section should have a heading — even "atmospheric" blocks like empathy quotes, testimonial callouts, or transition copy between major sections. A section without a heading:

- Is invisible to screen readers navigating by landmark or heading list.
- Hurts scannability for fast readers who jump section-to-section.

Fix: add a visible micro-heading (e.g., small muted uppercase text like "The quiet part") or at minimum an `sr-only` heading. Prefer visible headings — they improve the page rhythm and give the reader an anchor.

### Page Landmarks

- Wrap all content between `<nav>` and `<footer>` in a `<main id="main-content">` element.
- Give every `<section>` an `aria-labelledby` pointing at its heading's `id`. Anonymous sections are invisible to screen readers navigating by landmark.
- The primary `<nav>` should have `aria-label="Main"` to distinguish it from any footer or sidebar navigation.

### Password Visibility Toggles

Every password input should have a show/hide toggle button positioned inside the input field (absolutely positioned, right-aligned). Key details:

- Use a `<button type="button">` (not a checkbox or anchor) to prevent form submission.
- Toggle the input's `type` between `'text'` and `'password'`.
- Include `aria-pressed` reflecting the current state, `aria-controls` pointing at the input's `id`, and `aria-label` ("Show password" / "Hide password").
- Use an eye / eye-off icon pair. Mark the icon `aria-hidden="true"` since the button label already conveys meaning.
- On form reset, set all visibility states back to hidden.

### Focus-visible and composite widgets

> 💡 **Lesson learned:** **`focus-visible` rings** should clarify **keyboard-linear** navigation (links, primary buttons, standard inputs). **Composite** editors — pill/tag inputs, multi-value chips, nested micro-buttons — often shouldn’t show a heavy ring on every **pointer** click, or the chrome feels noisy. Use **roving `tabindex`**, `aria-*` on the composite, and scope rings to real tab stops; reserve `outline-none` for inner pieces that aren’t meant to be separate focus destinations.

### Modal and dialog focus trap

> 💡 **Lesson learned:** Every modal and centered dialog should **trap focus** while open and **return focus to the trigger** on close. Implement once as a reusable action or hook (`use:focusTrap`): on mount, remember `document.activeElement`, move focus to the dialog (or a `[data-autofocus]` target inside it), cycle Tab / Shift+Tab within focusable descendants, and on teardown call `.focus()` on the remembered element if it is still in the document. **Do not** have the trap action also handle Escape — each layer keeps its own Escape handler (see *Global keyboard shortcuts* → minimal-safe `Esc`). WHY: Without trap + return, keyboard users tab into the page behind the overlay; without deferring Escape, global and modal handlers fight.

---

## Tooltip Usage Guidelines

> 💡 **Lesson learned:** Tooltips add value when they reveal information the user can't get from the visible UI. They become noise when they restate what's already obvious. Audit tooltip density after building a page — a first pass often over-explains.

> 💡 **Lesson learned:** **Avoid creating dedicated Svelte components for individual icon-only buttons (e.g., `AddRowIconButton.svelte`, `EditIconButton.svelte`) that share identical typescript props and tooltip wrappers.** This copy-pastes visual layout code across multiple files. Instead:
> 1. Create a unified, generic `IconButton.svelte` that accepts props for `icon` (e.g. `'lucide:plus'`, `'lucide:pencil'`), `ariaLabel`, `onclick`, and optional `tooltipTitle` / `tooltipPlacement`.
> 2. For backward compatibility or semantic clarity, have the old specific files simply wrap `<IconButton icon="[icon-name]" {...$props} />` as thin, single-line pass-throughs.
> This retains clear import names (making components easy to find and grep) while concentrating 100% of the visual styling, tooltip lifecycle, and button padding inside a single generic component.

**When tooltips help:**

- Defining domain-specific terms the user may not know (e.g., status labels like "Stealth" or "Hold")
- Explaining non-obvious icon-only buttons
- Showing keyboard shortcuts
- Providing context on constrained UI (chips, badges, truncated text)

**When to remove them:**

- The tooltip restates the button label or surrounding heading (e.g., "Start Free Trial" tooltip on a button labeled "Start Free Trial")
- The section context already explains the information (e.g., a "10-day free trial" tooltip when the pricing header already says "10-day free trial")
- The tooltip explains something users already understand (e.g., "You'll briefly leave this page" on OAuth buttons)

**Guideline:** After building a page, count your tooltips. If there are more than ~8 on a single view, audit each one against the criteria above. In Exec Foundry's landing page, 15 tooltips were pruned to 7 — every removal reduced noise without losing information.

---

## Global keyboard shortcuts

> 💡 **Lesson learned:** **App-wide shortcuts** (jump to board, open panel, command palette): Centralize registration (e.g. root layout) and **ignore** the shortcut when focus is inside an editable control (`input`, `textarea`, `select`, `[contenteditable]`) unless the action is explicitly for composing text — otherwise you steal keys from data entry. Prefer combos that don’t fight the browser (`Cmd+L`, `Cmd+K` unless you intentionally mirror omnibar behavior). Surface shortcuts in **tooltips** or a **Help → Shortcuts** sheet so power users discover them without guessing.

> 💡 **Lesson learned:** Ship the **smallest credible set first** — focus search, create-new, open help (`?`), and a disciplined Escape — rather than a full power-user system. For an audience used to Gmail/Linear/Superhuman, the *absence* of these reads as "not a serious tool"; the minimal set is a **cohesion win**, not a luxury. Implementation guardrails that keep it safe: (1) a shared `isTypingContext(target)` + IME-composition guard so printable keys never fire mid-entry; (2) fire single-letter shortcuts **only on the bare primary surface** (no record drawer, modal, menu, or tour open) so they cannot clash with scoped shortcuts elsewhere; (3) a discoverable **help overlay** that lists both global and context (record-detail) keys.

> 💡 **Lesson learned:** A **global `Esc` handler must defer to whatever layer already owns Escape.** Record drawers, confirm dialogs, and connectivity modals each register their own `keydown` listener; if a new app-level handler also acts on `Esc`, you get double-handling (two layers close at once) or stolen intent. Safe layering: the global handler returns early when a record panel or any modal/overlay is open (`if (selectedRecord || blockingOverlayOpen) return`), and otherwise closes the open slide-over/menu. **Full stacking precedence** (a single "close the topmost layer" stack) is a larger build — defer it and ship the minimal-safe version that only acts when nothing else owns the key.

---

## Long-Running Operations (progress)

> 💡 **Lesson learned:** Any user-triggered flow that often exceeds **~3 seconds** (bundled export, multi-step document build, external search, batch LLM) should show **staged progress**: short phase labels that advance (**Gathering…** → **Building…** → **Compressing…**) plus a **determinate or indeterminate** bar. Reuse one small progress helper/component so copy and timing cues stay consistent. WHY: Prevents “frozen app” anxiety and reduces support pings; pairs well with entitlements messaging when exports are gated.

> 💡 **Lesson learned:** **Align visible milestones with real backend phases**, not only decorative labels. When generation spans distinct server steps (retrieval, structuring, persistence), expose **phase keys or statuses** from the API (or poll a job record) and map each to copy users recognize. Generic rotating messages while the server sits in one slow step feel dishonest and erode trust; jumping straight to “Done” without an intermediate milestone hides real latency spikes. WHY: Users tolerate longer waits when progress honestly reflects work underway.

---

## First-load skeletons (shape over spinner)

> 💡 **Lesson learned:** For a **data-heavy primary surface** (board, list, dashboard), a **skeleton shaped like the destination** beats a centered spinner: it reads as "your content is arriving," anchors layout so nothing jumps when data lands, and *feels* faster. Build a small placeholder component that mirrors the real structure (e.g. a few columns of pulsing card outlines for a kanban; rows for a table) and mark it `aria-hidden`. Reserve plain spinners for **small, bounded** inline waits. WHY: A spinner over a large empty region implies "stuck"; a skeleton implies "loading the thing you expect."

---

## Canonical empty-state component

> 💡 **Lesson learned:** Route **every** empty state through **one component** with a few variants rather than bespoke markup per surface — otherwise icon size, heading scale, body width, and CTA placement drift into "25 apps" inconsistency. A workable variant set: `wrapper` (dashed inline card inside a panel section), `centered` (no box, for "no results" inside an already-decorated surface), and `hero` (large first-run state for the most-seen empty screens — bigger icon, `<h2>` headline, free-form body, plus `actions` and `footnote` slots). Drive first-run copy from the user's onboarding/search stage so the empty screen *teaches the next step* instead of just stating absence. WHY: One component makes consistency the default and a redesign a single edit.

---

## Save acknowledgement (auto-save feedback)

> 💡 **Lesson learned:** Wherever fields **save on blur** (Tier-A scratchpad inputs), give the surface **one shared, three-phase acknowledgement** — `Saving…` → `✓ Saved` → `Couldn't save — try again` — with a ~2s fade on success and a longer hold on error. Two failure modes to avoid: a **success-only** ack (no in-flight or error state) lets a rejected save look saved; and an ack on **some** fields but not others reads as flaky. Prefer a single indicator in the panel chrome that **every** field feeds, over a separate spinner per input. Do **not** invent a second spinner style for the same job. (Architecture for bubbling child saves into one indicator lives in `CONTEXT_PROMPT.md` → Patterns to Follow.) WHY: Predictable, ubiquitous "Saved" feedback does more for trust than almost any single feature.

---

## First-run hints (dismissible coach marks)

> 💡 **Lesson learned:** When a dense surface (a multi-tab record detail, a complex panel) has **no obvious "start here,"** a **one-time, dismissible inline hint** on first open ("New here? Start with X, then Y") cuts the wayfinding tax without the weight of a full tour. Keep it subtle (a thin accent-tinted strip, not a modal), make it explicitly dismissible, and persist dismissal **per user** (e.g. `localStorage` keyed by user id) so it never re-nags and so coach/delegate accounts don't inherit each other's state. WHY: Discoverability that relies on the user *choosing* a tour leaves most users lost; a calm inline cue teaches in place.

---

## Board-level "next best move" (recommendation strip)

> 💡 **Lesson learned:** Distinct from the **inline first-run hint** on a dense panel: when you already compute **prioritized follow-ups or reminders** server-side, elevate the **single highest-leverage item** into a calm board-level **"Start here"** strip — one click opens the target in context, with an "{N} more" affordance that expands the full list unchanged. Frame it as a **recommendation**, not a notification count; use the same priority sort you already trust. WHY: Overwhelmed users on a data-heavy primary surface need one obvious next move at the *board* level, not only per-card nudges or a collapsed "3 follow-ups" toggle.

---

## First successful artifact moment

> 💡 **Lesson learned:** The first time a user completes your core **generated output** (tailored documents, compiled report, assembled bundle — whatever is the product's "wow"), don't let it silently appear. Show a **one-time, dismissible orientation overlay**: what was built, where each piece lives in the UI, and a primary action to view it. Calm and senior in tone — orientation, not confetti. Persist dismissal **per user**; trigger off a stable completion signal (e.g. a running total from the server, or a domain event with `count === 1`). WHY: The wow converts to understanding only when the user knows where to find the output next time.

---

## AI-generated section lifecycle (empty / generating / ready / stale)

> 💡 **Lesson learned:** Multiple AI surfaces on one record (alignment map, research dossier, personalized brief, document transformation) often express the **same four concepts** with different copy and chrome: **empty** (never run — invite first generation), **generating** (in flight — spinner or staged progress), **ready** (content exists), **stale** (inputs changed since last run — non-blocking refresh, never auto-regen). Centralize a **shared vocabulary module** (sentence structure + refresh labels) and a **canonical stale banner** (amber strip + "Refresh now" / "Refreshing…"). Each surface keeps its own generate-verb ("draft", "map", "build") for voice; the *structure* stays one product behavior. Stale requires **server-side input-hash** (or equivalent) — don't show a stale banner until you can detect drift honestly.

---

## Factual grounding and veracity cards (human-in-the-loop safety net)

> 💡 **Lesson learned:** When displaying programmatic veracity or factual grounding audit results, use a structured card component that balances reassurance and caution.
> - **Visual Hierarchy:** Use a distinct border and background color depending on the veracity state (e.g., green for fully grounded, amber/red for flagged issues).
> - **Clear Structure:** Show a header identifying the audit (e.g., "Factual Grounding Audit"), a summary of issues, a toggle to expand/collapse details, and a dismiss button.
> - **Detailed Issue Cards:** For each flagged issue, render:
>   - A severity badge (`high` in red, `medium` in amber, `low` in blue).
>   - The exact excerpt from the generated text in a blockquote with a monospaced font and a distinct left border.
>   - A plain-language explanation of why it was flagged.
>   - A suggested repair in a monospaced font inside a subtle dark container.
> - **Outcome-Oriented Copy:** Keep copy focused on factual correctness and trust. Avoid technical jargon like "LLM hallucination" or "regex parsing" in user-facing text.

---

## Long-form generated reading (outline & navigation)

> 💡 **Lesson learned:** AI-generated or imported **long reports** (research dossiers, compliance summaries, interview briefs) need **in-document navigation**, not only vertical scroll. A **sticky outline** (heading hierarchy from markdown or structured sections) plus **scroll-spy** or active-section highlighting lets users jump without losing context. Include **subsection headings** in the outline when mid-document anchors matter; support **deep links** (`#section-slug`) from reminders, email, or internal cross-references. Test **keyboard focus** when activating outline links (skip links or move focus to content). Collapse or drawer the outline on narrow viewports so the reading column stays primary.

---

## FAQ / Accordion Pattern

> 💡 **Lesson learned:** A 5-7 item FAQ section placed just before the signup form is a high-value, low-effort conversion tool. It catches objections at the moment of decision and provides long-tail SEO content.

**Structure:**

- Use a simple array of `{ q: string, a: string }` objects for content.
- Track the open item index in a single state variable (only one item open at a time, or `null` for all closed).
- Use a `slide` transition (or equivalent height animation) on the answer panel for smooth expand/collapse.
- Each question is a `<button>` with a chevron indicator that rotates on open.
- **Large FAQ sets:** If questions span multiple themes, add **category tabs** or grouped sections so users aren’t scrolling through one long stack. Prefer **always-visible answers** or a stable “all open” mode when SEO or skimming matters; if you use tabs, support a **shareable** `?category=` (or hash) so a single answer can be linked from Help or support mail.

**Content strategy:**

- Lead with the question the target buyer is most likely to have (security/privacy for sensitive data apps, pricing for SaaS).
- Include "Can I cancel anytime?" — it reduces friction even when the answer is obvious.
- Include a differentiator question ("How is this different from [alternative]?") — it's a chance to restate your positioning in a format that matches how prospects actually think.
- Avoid internal jargon in answers. If the user hasn't signed up yet, they don't know your feature names.

---

## Terminology & Tone in the UI

_User-facing labels carry emotional weight. Define conventions here._

> 💡 **Lesson learned:** Terminology for negative outcomes deserves careful attention. "Not Selected" instead of "Rejected" — factual and neutral without implying personal failure. "On Hold" instead of "Paused" or "Frozen." Keep the internal enum key unchanged for backward compatibility; only map the display label. This is a design system concern, not just a code concern, because the word choice IS the brand expression.

- Negative outcomes: [use neutral, factual language]
- Blocked states: [reframe as "safe-keeping" or "preserved," not "locked out"]
- CTAs to resume: [use "Resume" or "Continue," not "Upgrade" when the user is returning, not new]
