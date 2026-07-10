# GENESIS.md — Mars Habitat Duty Roster (sample)

> **Fiction.** This is a made-up product for ForgeKit demos. It is not a real NASA/SpaceX tool. The *problem shape* is deliberately ordinary: shared household / shift scheduling, with a Mars habitat skin so it is memorable.

**Status:** sample for shape reference  
**Canonical path in a real project:** `docs/GENESIS.md`

---

## Problem statement

Six people share a pressurized habitat on Mars. Every sol (Martian day) someone must cover **galley**, **greenhouse**, **life-support walkthrough**, and **EVA prep**. Today the crew tracks this in a shared spreadsheet plus a group chat. Swaps happen in chat and never make it back into the sheet. Newcomers cannot tell who is on deck for the next three sols without pinging the commander.

**Manual workaround today:** export the sheet to CSV, paste into a second tab labeled "truth," and argue in chat when the two disagree.

---

## Goals and explicit non-goals (v1 scope)

**Goals**

- One shared duty roster per habitat, visible to all crew.
- Assign people to duty slots by sol; show the next 7 sols at a glance.
- Request and accept a swap without leaving the app.
- Keep a short audit trail of who changed what (name + sol + duty).

**Non-goals (v1)**

- No payroll, time clocks, or Earth-timezone conversion.
- No integration with real habitat telemetry or suit systems.
- No multi-habitat fleet management.
- No mobile native apps (responsive web is enough).
- No AI that auto-assigns duties (humans assign; the tool remembers).

---

## Required background on the underlying data / file format

v1 is **local-first**. The builder may choose how to persist, but the domain export format is locked for handoff and backup:

- **Export/import:** a single UTF-8 JSON file, `roster-export.json`.
- **Top-level keys:** `habitatId` (string), `crew` (array), `duties` (array of duty type ids), `assignments` (array), `swapRequests` (array), `schemaVersion` (semver string, start at `"1.0.0"`).
- **Assignment row:** `{ "sol": number, "dutyId": string, "personId": string, "updatedAt": ISO-8601, "updatedBy": string }`.
- **Idempotent import:** importing a file replaces the local roster only after a confirmation step; never silent overwrite.
- **No binary formats** in v1. Spreadsheet import is out of scope; CSV export of the current 7-sol view is nice-to-have, not required.

Builders should document any chosen on-disk layout (e.g. one JSON file in the user data dir) in the Phase 1 brief; this Genesis only constrains the **portable** export shape.

---

## Core domain concepts / model

- **Habitat** — one roster context (name + id).
- **Crew member** — person with display name and optional role tag (commander, specialist, …). Role tags are labels only in v1.
- **Duty type** — named slot kind (galley, greenhouse, life-support, eva-prep). Fixed list in v1; editable list is v2.
- **Sol** — integer day index for the mission; the UI shows "Sol N" not Earth dates.
- **Assignment** — one person on one duty type for one sol.
- **Swap request** — from person A to person B for a specific assignment; states: `pending`, `accepted`, `declined`, `cancelled`.

---

## Functional requirements

### 1. Roster board

1.1 Show the next 7 sols as columns and duty types as rows (or equivalent clear grid).  
1.2 Each cell shows the assigned person or "Unassigned."  
1.3 Commander (or any crew in v1: no ACL yet) can set or clear an assignment in two clicks or fewer.  
1.4 Changing an assignment appends an audit entry.

### 2. Crew and duty setup

2.1 Add / rename / deactivate crew (deactivated people cannot receive new assignments; historical cells stay).  
2.2 Duty types ship as the four defaults above; renaming labels is allowed; adding/removing types is out of scope for v1.

### 3. Swaps

3.1 Assignee can request a swap with another crew member for one cell.  
3.2 Target can accept or decline.  
3.3 On accept, assignments swap and both sides see an audit entry.  
3.4 Pending requests appear in a simple list; no email/push required for v1 (in-app only).

### 4. Export / import

4.1 Export current roster to `roster-export.json` matching the schema above.  
4.2 Import with explicit confirm; reject unknown `schemaVersion` with a clear message.  
4.3 Never modify the import file on disk.

### 5. Empty and first-run states

5.1 First launch offers "Create habitat" with name + add at least two crew before the board unlocks.  
5.2 Unassigned cells are obvious; do not invent placeholder names.

---

## Non-functional requirements

- **Local-only:** no accounts, no cloud sync in v1.  
- **Privacy:** roster data stays on the device; no analytics.  
- **Safety:** import never runs without confirmation; export is read-only relative to source data.  
- **Performance:** board for 6 crew × 4 duties × 7 sols must feel instant on a mid-range laptop.  
- **Platform:** desktop web or desktop-capable responsive UI; keyboard usable for assignment changes.

---

## Edge cases

- Two people edit different cells "at once" on one shared machine (last write wins; audit shows both).  
- Swap target is deactivated after request was sent → auto-cancel with message.  
- Import file missing `assignments` array → reject with field path in the error.  
- Sol numbers are not contiguous (crew skipped a sol in the sheet) → allow gaps; board still shows a 7-sol window from "today's sol" setting.  
- Same person assigned to two duties on one sol → **allowed** in v1 (habitat life is busy); show both cells normally.  
- Duplicate `personId` in import → reject.  
- Very long display names → truncate in grid, full name in detail.  
- User clears the only commander tag → allowed; tags are cosmetic.  
- Browser refresh mid-swap → pending request must still be present after reload (persist before ack UI).  
- Export while a pending swap exists → include `swapRequests` as-is.

---

## Suggested milestones

- **M1.** Create habitat, crew, duty labels, 7-sol board, assign/clear, persist locally, audit log.  
- **M2.** Swap request / accept / decline.  
- **M3.** JSON export / import with confirmation.  
- **M4.** Polish empty states + one-page README for crew.

---

## Acceptance criteria

- Given a habitat with 6 crew and default duties, when I assign "Alex" to galley on Sol 104, then the board shows Alex in that cell after reload.  
- Given Alex is on galley Sol 104, when Alex requests a swap with Sam and Sam accepts, then Sam is on galley Sol 104 and Alex is not.  
- Given a valid `roster-export.json`, when I import it into an empty app and confirm, then the board matches the file.  
- Given a file with `schemaVersion` `"99.0.0"`, when I import, then the app refuses and explains that the version is unsupported.  
- Given I never confirm an import, when the file is selected, then on-disk app data is unchanged.

---

## Open questions

| # | Question |
|---|----------|
| 1 | What is "today's sol" at first launch: user-entered mission sol, or start at 0? |
| 2 | Should v1 allow printing a one-page "next 7 sols" view? |
| 3 | Is a single shared browser profile enough, or do we need a simple device PIN? |

---

## Constraints

- Local-only; no cloud accounts.  
- Never overwrite local data on import without an explicit confirm step.  
- No real spacecraft systems; this is a crew coordination toy with a Mars skin.
