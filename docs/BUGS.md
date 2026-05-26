# [App Name] - Bug Tracker

_Raw bugs triaged and routed to TODO.md. This is the intake form, not the backlog._

_Instructions: Log bugs here as they're discovered. Each entry gets a severity, a one-line description, and a reproduction path. Once triaged (severity assessed, root cause identified), create a proper TODO entry and check it off here with a cross-reference. Don't let this list grow unbounded — triage weekly._

> 💡 **Lesson learned:** Bugs and ideas are different workflows. IDEAS.md is a parking lot for future possibilities — low urgency, evaluated in batches during strategic review. BUGS.md is an intake queue for things that are broken NOW — higher urgency, triaged as they arrive. Mixing them in one file causes bugs to get lost in a sea of ideas, or ideas to feel like emergencies.
>
> Triage workflow:
> 1. Log the bug here with severity and repro steps
> 2. Investigate root cause (or ask Claude to)
> 3. Create a TODO entry under the appropriate section (Foundation > Robustness, or the relevant value pillar)
> 4. Check it off here with a cross-reference to the TODO entry
> 5. Fix in priority order from TODO, not from this list
>
> Severity guide:
> - P0 (Critical): Data loss, security vulnerability, payment failure, app crash. Fix immediately.
> - P1 (High): Core workflow broken, major UX failure, affects most users. Fix this sprint.
> - P2 (Medium): Feature partially broken, workaround exists, affects some users. Schedule fix.
> - P3 (Low): Cosmetic, edge case, minor annoyance. Fix when convenient.

## Batch Error Triage (brainstorm then bucket)

_Use this when facing a large batch of errors — e.g. from an error tracking tool (PostHog, Sentry, Datadog), a QA pass, or a production incident. The standard one-at-a-time triage (above) works for steady-state; this process works when you need to make sense of 20+ errors at once._

**Step 1: Generate the error inventory.** Export or list every distinct error message, stack trace signature, or failure pattern from your error source. Include metadata: frequency (volume/occurrences), recency, affected users/sessions, and the component/file where the error originates. Do not filter or prioritize yet — capture everything.

**Step 2: Bucket against root-cause categories.** Define 4-8 root-cause categories based on your codebase and common failure modes. Score each error against the categories. Examples:

- **Reference errors** — undefined variables, missing imports, stale reactive state (e.g. Svelte `$effect` referencing unmounted state)
- **Null/undefined access** — null dereference, optional chaining gaps, data loaded before component expects it
- **Network failures** — fetch failures, timeouts, API errors, offline handling
- **Browser quirks** — ResizeObserver, intersection observer, vendor-specific bugs
- **Third-party library** — errors originating in dependency chunks, not your code
- **Data integrity** — unexpected data shapes, missing fields, schema mismatches
- **Timing/race conditions** — component mounts before data, concurrent writes, stale closures

**Step 3: Review for triage signals.**

- **Errors that land in multiple categories** — often the most complex bugs; prioritize investigation
- **Categories with high error volume but few distinct errors** — one root cause is producing many symptoms; fix the root cause, not the symptoms
- **Categories with many distinct errors but low volume each** — systemic code pattern issue (e.g. missing null guards across many components); address with a codebase-wide sweep, not one-off fixes
- **Errors that don't fit any category** — potential new failure mode worth adding to your monitoring

**Step 4: Feed into triage priorities.** Within each category, rank by (volume × recency × user impact). Categories with the highest aggregate score get triaged first. Create TODO entries by category, not by individual error — this prevents the backlog from exploding into dozens of single-error tickets when a pattern fix would resolve many at once.

---

## Active Bugs

_Untriaged or in-progress. Move to Triaged once routed to TODO._

| #   | Severity | Description     | Repro / Location                | Reported |
| --- | -------- | --------------- | ------------------------------- | -------- |
| 1   | [P0-P3]  | [What's broken] | [How to reproduce or file:line] | [Date]   |

## Triaged

_Routed to TODO.md. Check off when the TODO entry is created._

- [x] **#N** [P1] [Description] → TODO > [Section] > [Item name]
- [ ] **#N** [P2] [Description] → _(needs triage)_
