# [App Name]: Security Audit Report

_Comprehensive black hat security audit performed against the codebase. White-box approach: full source code access, attacker mindset._

_For code quality findings (type safety, error handling, consistency), see [CODE_QUALITY.md](CODE_QUALITY.md). For deployment readiness, see [DEPLOYMENT.md](DEPLOYMENT.md)._

_Instructions: Generate this document during Phase 7 (Hardening) by running the black hat audit prompt from `_forgetrail/prompts/black-hat-audit.md`. This is separate from CODE_QUALITY.md — that doc covers engineering quality; this doc covers exploitable security vulnerabilities. After generating, triage all findings into TODO.md with P0/P1/P2 priority. Annotate each finding here with its TODO status._

---

> 💡 **Lesson learned:** Splitting security audit (BLACK_HAT_REPORT.md) from code quality review (CODE_QUALITY.md) is worth the extra file. They have different audiences and urgency:
> - BLACK_HAT_REPORT is "what can an attacker exploit?" — findings are prioritized by exploitability and impact. Fix before launch.
> - CODE_QUALITY is "what will bite us during maintenance?" — findings are prioritized by tech debt and reliability.
>
> The audit prompt (prompts/black-hat-audit.md) covers 11 areas systematically. Running it with 2-3 subagents in parallel produces better coverage than a single pass because each agent can focus deeply on a subset of areas.
>
> After generating the report:
> 1. Add ALL actionable findings to TODO.md under a "Security Audit" section, organized by priority (P0/P1/P2)
> 2. Annotate each finding in this report with `→ *Added to TODO (Pn)*`
> 3. As fixes are implemented, update both the finding status here AND the TODO checkbox

## Executive Summary

**Audit Date:** [date]
**Auditor:** [AI model + human reviewer]
**Scope:** Full application codebase (white-box)

| Severity  | Count |
| --------- | ----- |
| CRITICAL  |       |
| HIGH      |       |
| MEDIUM    |       |
| LOW       |       |
| INFO      |       |
| **Total** |       |

**Key findings:** [2-3 sentence summary of the most impactful issues]

**Overall posture:** [Assessment: strong/moderate/needs-work. What's the biggest systemic risk?]

## Critical Findings

_Directly exploitable. Fix before any public exposure._

### C1: [Finding Title]

**Area:** [Auth / IDOR / Injection / SSRF / Business Logic / etc.]
**File:** `[path/to/file.ts]:[line]`
**Impact:** [What an attacker can achieve]

**Vulnerability:**
[Description with code snippet if helpful]

**Attack Scenario:**

1. [Step-by-step exploitation]

**Fix:**
[Specific remediation with code example]

**Status:** [ ] Not started → _Added to TODO (P0)_

## High Findings

### H1: [Finding Title]

**Area:** [area]
**File:** `[path]`
**Impact:** [impact]

**Vulnerability:**
[Description]

**Fix:**
[Remediation]

**Status:** [ ] Not started → _Added to TODO (P0/P1)_

## Medium Findings

### M1: [Finding Title]

**Area:** [area]
**File:** `[path]`
**Impact:** [impact]

**Vulnerability:**
[Description]

**Fix:**
[Remediation]

**Status:** [ ] Not started → _Added to TODO (P1/P2)_

## Low Findings

### L1: [Finding Title]

**Area:** [area]
**File:** `[path]`

**Issue:**
[Description]

**Fix:**
[Remediation]

**Status:** [ ] Not started → _Added to TODO (P2)_

## Informational

### I1: [Finding Title]

**Observation:**
[Description. Not exploitable, but worth noting.]

## What's Done Well

_Security practices already in place. Replicate these patterns._

| Practice        | Where       | Notes                     |
| --------------- | ----------- | ------------------------- |
| [good practice] | [file/area] | [what makes it effective] |

## Remediation Priority

### Immediate (Before Launch)

| ID   | Finding | Fix Description        |
| ---- | ------- | ---------------------- |
| [C1] | [title] | [one-line fix summary] |

### Short-Term (Next Sprint)

| ID   | Finding | Fix Description        |
| ---- | ------- | ---------------------- |
| [H1] | [title] | [one-line fix summary] |

### Backlog

| ID   | Finding | Fix Description        |
| ---- | ------- | ---------------------- |
| [M1] | [title] | [one-line fix summary] |
