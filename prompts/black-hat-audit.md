# Black Hat Security Audit Prompt

Use this prompt with an AI coding assistant that has full access to a project workspace. Paste or feed it as-is. The assistant will perform a comprehensive manual code review and produce a structured security report.

Save the output to `docs/BLACK_HAT_REPORT.md` using the template from `_forgetrail/docs/BLACK_HAT_REPORT.md`. After generating, triage all findings into `docs/TODO.md` with P0/P1/P2 priority.

---

## The Prompt

```
You are an expert penetration tester and application security engineer. Perform a comprehensive black hat security audit of this application. Assume the mindset of a motivated attacker with access to the source code (white-box). Your goal is to find every exploitable vulnerability, not just theoretical risks.

Work systematically through the following audit areas. For each area, read the actual source code — do not guess or assume. Search for patterns, trace data flows from user input to dangerous sinks, and verify whether defenses exist.

---

### AREA 0: Fix efficacy — do existing defenses actually block?

Run this area **first** on any codebase that has been audited before. The most dangerous finding is a defense everyone believes in that does not hold. Read the previous report (`docs/BLACK_HAT_REPORT.md`) and treat every "remediated" item as **unverified** until you prove it blocks.

For each guard, sanitizer, escaper, or allowlist: **enumerate concrete bypass inputs and check them against the code line by line.** Where the project has a test runner, write a regression test with those inputs; a fix without a test that fails on the old code is not verified.

Known failure modes to check by name:

- **Exact match where a range is meant.** `host === '127.0.0.1'` leaves the rest of `127.0.0.0/8`; `=== '::1'` leaves `::ffff:127.0.0.1`. Compute ranges numerically instead of prefix-matching strings.
- **Missing hostname normalization.** Trailing FQDN dot (`localhost.`, `metadata.google.internal.`), uppercase, IPv6 brackets, IPv4-mapped and NAT64-embedded IPv6 (`::ffff:7f00:1`, `64:ff9b::7f00:1`), decimal/hex/short IPv4 (`2130706433`, `0x7f000001`, `127.1`). Check what the platform's URL parser normalizes for you and what it leaves alone.
- **Dead branches inside the guard.** A regex or condition that can never match the real input format (wrong number of leading colons, wrong case, checked before normalization). Prove each branch fires with a test input.
- **Escape scheme mismatch.** Verify the escaping matches the **downstream parser**, not a familiar one from another system: SQL-style doubled quotes in a parser that uses backslash escapes will both fail to escape (trailing `\` eats the closing quote) and corrupt legitimate values. Compare against the vendor SDK's own escaping helper.
- **Chained `.replace()` sanitization.** Sequential replaces re-scan their own output: an entity decoder that expands `&#38;` before named entities still double-decodes. Prefer a single pass over the whole string, and iterate to a fixed point when stripping nested constructs.
- **Guard exists but call sites skip it.** Grep for the raw sink (`fetch(`, `exec(`, `innerHTML`, raw filter interpolation) and diff that list against the guard's callers. Every unguarded call site is a finding, even when a helper is "the pattern."
- **Validated value not the one used.** Check the URL/path/ID validated is the exact value passed to the sink (no re-parse, re-concat, or original-string fallback in between).
- **Check-then-use gaps.** Redirect following, DNS re-resolution, and second reads after a check (TOCTOU). Note which are closed and which are only narrowed.

Report each broken defense as a normal finding at the severity of the **underlying vulnerability it was supposed to close**, not as a documentation nit.

---

### AREA 1: Authentication & Session Management

Read all auth-related routes (login, signup, logout, password reset, OAuth) and session/cookie handling code (middleware, hooks, interceptors).

Check for:
- Password policy: minimum length, complexity requirements, common password blocking
- Login brute force protection: per-endpoint rate limiting (not just global), account lockout, exponential backoff
- Session token security: httpOnly, secure, sameSite flags on all auth cookies
- Session fixation: are sessions regenerated after login?
- Session invalidation: are all sessions revoked on password change or logout?
- Logout completeness: are all cookies and tokens properly cleared? Are clearing cookies set with correct flags?
- OAuth state parameter: validated on callback? Cookies for state/verifier have proper flags?
- User enumeration: do login vs. signup errors reveal whether an account exists? Timing side-channels?
- Auth token refresh: is it happening too aggressively (DoS amplification)?
- Cookie lifetime: are session cookies excessively long-lived?

---

### AREA 2: Authorization & Access Control (IDOR)

Read EVERY API route/endpoint in the application. For each one, verify:

- Is authentication checked? (reject unauthenticated requests)
- Is ownership verified? (user can only access/modify their OWN records)
- For admin-only routes: is admin/role status checked?
- For delegation/impersonation systems: are delegates properly constrained? Can they access admin functions?
- For multi-tenant systems: can tenant A access tenant B's data?

Specifically look for the pattern where a route parameter (like an ID) is used to fetch/modify a record WITHOUT verifying the record belongs to the requesting user. This is IDOR — the most common and most dangerous access control flaw.

Check:
- Every GET endpoint: can users read other users' data by changing IDs?
- Every PATCH/PUT endpoint: can users modify other users' records?
- Every DELETE endpoint: can users delete other users' records?
- List/search endpoints: are results filtered by the current user?
- File download endpoints: is file ownership verified before serving?
- Nested resources (e.g., /users/:id/files/:fileId): is the parent resource's ownership checked?

---

### AREA 3: Injection Attacks

#### 3a. SQL / ORM / Database Query Injection
- Search for raw query construction using string concatenation or template literals WITHOUT parameterization
- Check if the ORM or query builder is used safely everywhere
- Look for any raw SQL, raw MongoDB queries, or raw filter strings built from user input
- If a custom sanitization function exists (like a tagged template for queries), verify it's used consistently — search for cases where it's NOT used

#### 3b. XSS (Cross-Site Scripting)
- Search for patterns where HTML is rendered without sanitization: dangerouslySetInnerHTML (React), {@html} (Svelte), v-html (Vue), [innerHTML] (Angular), raw HTML template insertion
- For each instance: trace the data source. Is it user input, LLM output, scraped content, or database content?
- Check if sanitization (DOMPurify, sanitize-html) is applied. Does it work on BOTH server-side rendering AND client-side?
- Look for SSR-specific XSS: content sanitized client-side but rendered raw during server-side rendering

#### 3c. Command Injection
- Search for child_process, exec, spawn, system(), popen, subprocess, eval(), Function(), new Function
- Check if any user input reaches these sinks

#### 3d. LLM Prompt Injection (if applicable)
- Check if user-supplied content is passed to LLM prompts
- Look for prompt injection guards (system prompts, XML boundary tags, content wrapping)
- Check if LLM output is rendered as HTML without sanitization (connects to XSS)

---

### AREA 4: SSRF (Server-Side Request Forgery)

Search for any server-side code that makes HTTP requests based on user-supplied URLs:
- URL scraping, link preview, webhook delivery, image proxying, file import from URL, RSS feed fetching

For each instance, check:
- Is the URL scheme restricted to http/https?
- Are internal/private IP ranges blocked? (127.0.0.1, 10.x, 172.16-31.x, 192.168.x, 169.254.169.254, ::1, localhost, *.local, *.internal)
- Does the code follow redirects? Can a redirect bounce to an internal host?
- Is DNS rebinding considered?

---

### AREA 5: CSRF (Cross-Site Request Forgery)

- How are state-changing requests protected? (CSRF tokens, Origin header checking, SameSite cookies)
- Are there edge cases where protection is skipped? (missing Origin header, specific routes exempted)
- Are webhook/callback endpoints properly exempted from CSRF but protected by signature verification instead?

---

### AREA 6: File Handling

#### Upload:
- File type validation (extension, MIME type, magic bytes)
- File size limits
- Path traversal prevention (can filenames contain ../ or absolute paths?)
- Where are files stored? (local filesystem = dangerous, object storage = safer)
- Are uploaded files served with proper Content-Type and Content-Disposition headers?

#### Download/Export:
- Zip slip: if ZIP files are created, are filenames sanitized to prevent path traversal?
- Are file downloads gated by ownership checks?
- Can exported data leak other users' information?

---

### AREA 7: Business Logic Vulnerabilities

- Race conditions: look for non-atomic read-then-write patterns (TOCTOU). Common in: counters, usage limits, inventory, promo/coupon redemption, seat limits
- Entitlement bypass: are paid features enforced server-side? Can a free user call paid API endpoints directly?
- Promo/discount abuse: can codes be reused? Are max-redemption limits atomic? Can signup be raced to bypass per-user limits?
- Payment/billing: are webhook signatures verified? Can subscription status be forged? Are success/cancel URLs controlled server-side?
- Limit enforcement: if there are usage quotas, are they checked AND decremented atomically?

---

### AREA 8: Data Exposure

- API responses: do they include sensitive fields that shouldn't be exposed? (password hashes, internal IDs, tokens, other users' data, full error stacks)
- Error handling: do error responses include stack traces, library names, file paths, or SQL queries?
- Logging: are secrets, tokens, or PII logged?
- Source maps: are they enabled in production builds?
- Environment variables: are any secrets exposed to the client via public env var prefixes (NEXT_PUBLIC_, VITE_, REACT_APP_)?

---

### AREA 9: Rate Limiting & DoS

- Is rate limiting implemented? Per-IP? Per-user? Per-endpoint?
- Are expensive operations (LLM calls, file processing, scraping) separately rate-limited?
- Is the rate limiter in-memory (won't scale across instances) or shared (Redis)?
- Can an attacker amplify requests? (e.g., one request triggers multiple downstream requests)
- Are there unbounded loops, unlimited pagination, or missing timeouts?

---

### AREA 10: Secrets & Configuration

- Search for hardcoded secrets, API keys, passwords in source code
- Check if .env files are committed to version control (git ls-files .env)
- Check .gitignore for proper exclusion of secret files
- Review environment variable usage: are secrets only accessed server-side?
- Check for default credentials in setup scripts or seed data

---

### AREA 11: Dependencies

- Check package.json / requirements.txt / go.mod for known vulnerable packages
- Note any unmaintained or deprecated dependencies
- Check for overly permissive version ranges that could pull in compromised packages

---

## OUTPUT FORMAT

Produce a structured markdown report with:

### 1. Executive Summary
- Total findings count by severity (CRITICAL / HIGH / MEDIUM / LOW / INFO)
- 2-3 sentence summary of the most impactful issues
- Overall security posture assessment

### 2. Findings (grouped by severity)
For each finding:
- **ID**: Severity-prefixed sequential ID (C1, C2, H1, H2, M1, etc.)
- **Title**: Concise description
- **File**: Path and line numbers
- **Impact**: What an attacker can achieve
- **Code snippet**: The vulnerable code
- **Attack scenario**: Step-by-step exploitation
- **Fix**: Specific, actionable remediation with code example

### 3. Positive Findings
Table of what's done well — give credit for good security practices. This helps the developer understand which patterns to replicate.

### 4. Remediation Priority
Group fixes into:
- **Immediate** (before launch / this week): anything directly exploitable
- **Short-term** (next sprint): defense-in-depth, hardening
- **Backlog**: nice-to-haves, future-proofing

---

## RULES

- Read actual source code for every finding. Do not hallucinate file paths or code that doesn't exist.
- Verify each finding. If a defense exists, note it. Don't report mitigated issues as vulnerabilities.
- A defense counts as effective only when you can name the inputs it rejects. Prefer a regression test (one that fails against the pre-fix code) over prose; cite it in the report.
- Never mark a prior finding remediated because a fix was committed. Re-read the current code and re-run the bypass inputs.
- Include severity justification based on exploitability and impact, not just theoretical risk.
```

---

## Usage Notes

- For large codebases, consider running 2-3 subagents in parallel, each covering a subset of audit areas. This produces better coverage than a single pass.
- After generating the report, use the `BLACK_HAT_REPORT.md` template to structure the output.
- Triage findings into TODO.md immediately: P0 (Critical + exploitable High), P1 (defense-in-depth High + critical-path Medium), P2 (remaining Medium + Low + Info).
- Re-run the audit after major feature additions or when preparing a new release.
