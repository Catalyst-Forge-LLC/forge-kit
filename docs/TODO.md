# [App Name] - Feature Backlog

_Organized by brand value pillars. See [BRAND_AND_PRODUCT.md](BRAND_AND_PRODUCT.md) for positioning context._

_Instructions: Start this in Session 1 as a flat list. During Phase 6 (Strategic Review), reorganize by brand pillars from BRAND_AND_PRODUCT.md. Use checkboxes for completion tracking, star ratings for leverage/priority. Process `.forgekit/IDEAS.md` entries into this backlog periodically._

---

> 💡 **Lesson learned:**
> 1. Organize by brand promise, not by technical layer. "Preparation Quality" is a better section header than "Backend Features." This keeps the backlog aligned with why features matter.
> 2. Star ratings (* or priority markers) indicate high-leverage features for the core value prop. These take priority over nice-to-haves.
> 3. Completed items stay in the list (checked off with date/notes). This creates a visible record of progress and prevents re-proposing already-shipped features.
> 4. Include a phased roadmap at the bottom. Time estimates keep the backlog grounded in reality.

## [Value Pillar 1 from BRAND_AND_PRODUCT.md]

_[One-line description of what this pillar means for the user]_

- [x] [Completed feature] _(Session N, [brief note])_
- [ ] [Planned feature] [priority marker if high-leverage]
- [ ] [Planned feature]

## [Value Pillar 2]

_[Description]_

- [ ] [Feature]
- [ ] [Feature]

## [Value Pillar 3]

_[Description]_

- [ ] [Feature]
- [ ] [Feature]

## [Value Pillar 4]

_[Description]_

- [ ] [Feature]
- [ ] [Feature]

## [Value Pillar 5]

_[Description]_

- [ ] [Feature]
- [ ] [Feature]

## Foundation

_Cross-cutting work that supports all pillars: code quality, infrastructure, documentation, security._

### Robustness & Code Quality

- [ ] [Task]. See CODE_QUALITY.md finding [ID].

### Security

- [ ] [Task]

### Security Audit ([Date])

> 💡 **Lesson learned:** After running the black hat audit (prompts/black-hat-audit.md → BLACK_HAT_REPORT.md) and code quality review (CODE_QUALITY.md), import all actionable findings here organized by priority. This creates a single, unified backlog. As fixes land, update both the TODO checkbox and the finding status in the source report.
>
> Group by priority:
> - P0 = CRITICAL + HIGH findings that are directly exploitable
> - P1 = HIGH findings for defense-in-depth + MEDIUM findings on critical paths
> - P2 = remaining MEDIUM + LOW + INFO findings

#### P0 — Immediate (fix before launch)

- [ ] [Finding ID]: [One-line description from BLACK_HAT_REPORT.md or CODE_QUALITY.md]

#### P1 — Short-term (next sprint)

- [ ] [Finding ID]: [One-line description]

#### P2 — Backlog

- [ ] [Finding ID]: [One-line description]

### Documentation

- [ ] [Task]

### Payments & Growth

- [ ] [Task]. See BUSINESS_PLAN.md.

### UX Polish

- [ ] [Task]

### Accessibility

- [ ] [Task]

---

## Phased Roadmap

_Break the backlog into time-boxed phases with clear dependencies._

### Phase 1: [Name] ([estimated time])

_Focus: [what this phase accomplishes]_

- [ ] [Task from backlog above]
- [ ] [Task]

### Phase 2: [Name] ([estimated time])

_Depends on: Phase 1_

- [ ] [Task]
- [ ] [Task]

### Phase 3: [Name] ([estimated time])

_Depends on: Phase 2_

- [ ] [Task]
- [ ] [Task]
