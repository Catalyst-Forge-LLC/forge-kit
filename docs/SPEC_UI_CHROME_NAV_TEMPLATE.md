# Spec: UI Chrome, Layout & Nav Flyouts (template)

_Copy this file into your app as e.g. `docs/SPEC_UI_CHROME_NAV.md` when you ship substantial nav, typography, or nested-menu work. Fill `[BRACKETED]` placeholders and remove this header._

**Purpose:** Capture **invariants** for typography roles, app shell height, interactive rounding, and nested dropdown flyouts so future sessions do not re-litigate the same layout and hover bugs.

---

## Typography

- **Chrome / UI:** `[sans stack]` — nav, filters, column headers, short labels.
- **Reading / long-form:** `[serif or alternate stack]` — `[where it applies: e.g. narrative panels, prep content]`.

---

## App shell

- Outer: `[e.g. flex flex-col h-screen overflow-hidden]`
- Nav: `shrink-0`
- Main: `flex-1 min-h-0` + scroll **inside** main where needed  
**Invariant:** Avoid `[calc(100vh − X)]` unless `[nav height]` is verified per breakpoint.

---

## Interactive controls

- Default radius for buttons/inputs/pills: `[e.g. rounded-lg]`
- Document exceptions (cards, modals) explicitly.

---

## Nested menu flyouts

| Topic | Rule |
|-------|------|
| Shared chrome | One CSS class for surface/border/shadow on secondary panels |
| Padding context | `[Describe: padded vs full-width menu rows]` — `absolute` children measure from different boxes; test gaps side by side |
| Large panels | Center vertically on trigger + `max-height` + internal scroll; do not clip off-screen with `bottom: 0` only |
| Hover state | Stable **id** per flyout; re-enter same id → cancel timers only; reset all when **parent menu** closes |
| Anti-pattern | Do not clear all flyouts on every `mouseenter` |

---

## Revision history

| Date | Notes |
|------|--------|
| `[ISO date]` | Initial spec |
