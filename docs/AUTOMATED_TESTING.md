# Automated Testing — Specification

**Status:** Draft for implementation (ForgeKit template — child projects adapt paths and stack lines.)  
**Related:** [TEST_PLAN.md](TEST_PLAN.md) (manual QA walkthrough)  
**Provenance:** Generalized from Exec Foundry `specs/automated-testing.md` (2026-04-16).  
**Stack context (example — adjust per app):** SvelteKit 2, Vite, TypeScript, a BaaS (e.g. PocketBase), Zod validation, payments webhooks, optional LLM providers. Many apps already depend on `playwright` for scraping or screenshots without a dedicated `@playwright/test` app-QA config — this spec describes how to add one deliberately.

---

## 1. Purpose and principles

### 1.1 What this spec is for

Define a **practical** automated testing strategy that:

- Catches **regressions** in business rules, API contracts, and critical user paths before merge or deploy.
- Gives **confidence in deployment** without replacing human judgment on LLM output quality, third-party job sites, or full billing flows in every CI run.
- Stays **fast enough for daily use** (local and CI), with slower suites scheduled or opt-in.
- **Does not** optimize for coverage percentage. Coverage may be reported for discovery only, not as a merge gate.

### 1.2 What to avoid

| Anti-pattern | Why it hurts |
|--------------|--------------|
| Enforcing a coverage threshold (e.g. 80%) | Incentivizes trivial tests, noisy refactors, and testing implementation details. |
| Testing every Svelte component in isolation | High cost; many components are thin wrappers around PocketBase + LLM; value is often in integration. |
| Large E2E suites hitting real LLM / real scrapers | Flaky, slow, non-deterministic; belongs in manual TEST_PLAN or occasional staging runs. |
| Duplicating the entire TEST_PLAN in automation | Diminishing returns; automate the **highest-risk and most repetitive** checks first. |

### 1.3 What “good” looks like

- A **failed unit test** points to a specific function (e.g. wrong limit for `pro` plan after a code change).
- A **failed API test** points to a route + status code + body shape (e.g. unauthenticated request returns 401).
- A **failed E2E test** points to a broken journey (e.g. cannot log in, board does not load) after a routing or auth change.
- **Manual TEST_PLAN** remains the source of truth for exploratory QA, Stripe webhook end-to-end behavior, OAuth provider quirks, and “does the AI answer make sense?”

---

## 2. Recommended test pyramid (for this product)

```
                    ┌─────────────────┐
                    │  E2E (few)      │  Critical smoke + 1–2 journeys
                    │  Playwright     │  Mock or stub LLM/scrape where possible
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │  Integration / API tests    │  +server handlers, hooks behavior
              │  (Vitest + request mocking) │  Auth, validation, 401/402/429
              └──────────────┬──────────────┘
                             │
         ┌───────────────────┴───────────────────┐
         │  Unit tests (many, fast)               │
         │  Pure functions, Zod schemas, limits   │
         └────────────────────────────────────────┘
```

### 2.1 Unit tests (primary volume)

**Target:** Pure or nearly pure modules—no network, no PocketBase, no browser.

**High-value areas in this codebase:**

| Area | Examples | Rationale |
|------|----------|-----------|
| **Zod schemas** | `src/lib/server/validation.ts` — `signupSchema`, password rules, job IDs | Cheap to test; failures become 400s in production. |
| **Plan / entitlements math** | `src/lib/server/entitlements.ts`, `src/lib/server/planLimitValues.ts`, `src/lib/productLimits.ts` | Billing and feature gating bugs are high impact; logic is table-driven and testable. |
| **Pure utilities** | `src/lib/salary.ts`, search/filter helpers, date/trial helpers | Regression-prone when refactored. |
| **Rate-limit constants** | `src/lib/server/rateLimits.ts` | Assert documented limits (60/min general, 10/min LLM) match product intent. |

**Lower priority for unit tests:** Individual `.svelte` files unless they contain substantial client-side logic (e.g. complex state machines). Prefer E2E or thin component tests only where bugs have historically occurred.

### 2.2 Integration / API tests (medium volume)

**Target:** SvelteKit `+server.ts` handlers and shared server utilities with **controlled doubles** (mock PocketBase client, mock Stripe, or HTTP-level mocks).

**High-value behaviors:**

- **Authentication:** Routes that must return `401` without a valid session (see TEST_PLAN §13.4).
- **Validation:** `POST` with invalid JSON or invalid body → `400` with stable error shape (via `parseBody` / Zod).
- **Authorization:** User A cannot read/update user B’s job (if enforced in API—assert with mocked PB records).
- **Entitlements:** When a user record is in `expired` / `pro` state, a given action returns `402` or is allowed as documented (TEST_PLAN §9).
- **Rate limiting:** With a **test-only hook** or exported `checkRateLimit` used only in tests, assert 429 after N requests (avoid full 60-request loops in CI by testing the limiter function with injectable clock/map).

**Implementation options (pick one primary approach):**

1. **Vitest + `import` of handler + `Request`/`Response` mocks** — Good for validation-only routes.
2. **Vitest + `@sveltejs/kit` test utilities** — If available for your Kit version; exercise `GET`/`POST` with a fake `RequestEvent`.
3. **PocketBase test instance** — Docker or local binary with a **seed script** for users/jobs. Heavier setup; use for a small “golden path” subset.

**Stripe webhooks:** Do **not** rely on live Stripe in default CI. Prefer:

- Unit tests for **signature verification** and **idempotency** logic with fixture payloads; or
- Stripe CLI in a **manual** or **nightly** job; or
- Recorded webhook fixtures (JSON) processed by the handler in isolation.

### 2.3 End-to-end tests (small, stable set)

**Tool:** `@playwright/test` (already in `package.json`). Add `playwright.config.ts` at repo root for **app** testing (separate from `scripts/screenshots.ts` usage).

**Scope:**

1. **Smoke (every PR or every push to `main`):**
   - App responds (e.g. `GET /` or `/start` returns 200).
   - `GET /api/health` returns 200 when PocketBase is up (or skip in CI without PB—see §5).

2. **Auth shell (optional second phase):**
   - With a **test user** in a seeded PocketBase: login → land on dashboard → session cookie present.
   - Avoid testing full signup email verification unless PB test mode supports it.

3. **One data journey (optional third phase):**
   - Create job via API or minimal UI flow with **LLM mocked** (route interception or env flag that returns stub JSON)—so CI does not call Anthropic.

**Explicitly out of default E2E:** Full resume DOCX pipeline, job scraping from real URLs, Stripe Checkout redirect, OAuth redirects, NPS timing tied to real tailoring counts.

---

## 3. Mapping TEST_PLAN sections to automation

_The rows below mirror one product’s TEST_PLAN outline; **replace section labels** when your manual plan differs._

| TEST_PLAN area | Automation suggestion | Notes |
|----------------|----------------------|--------|
| §0 Environment | Documented in CI §5; optional smoke script | Keep README / TEST_PLAN / `package.json` dev port consistent to avoid flaky local E2E. |
| §1 Auth | E2E login smoke + API 401 tests | OAuth stays manual. |
| §2 Resume & Documents | Mostly manual; optional API test for upload validation (reject non-DOCX) | LLM steps stay manual or stubbed. |
| §3 Job pipeline | E2E stubbed “add job” OR API integration with mock scrape | Real scraping is flaky. |
| §4 AI features | Stub LLM responses in integration tests | Assert UI/API contract, not prose quality. |
| §5–8 People, filters, STAR, branding | Selective API + occasional E2E | Prioritize duplicate detection and filter persistence (localStorage) if tested at all. |
| §9 Billing | Webhook unit tests + manual Stripe | Full checkout E2E in staging only. |
| §10 Delegation | API tests if routes are isolated | Complex; lower priority. |
| §11 Analytics | API/auth gating tests | Chart correctness manual. |
| §12 UI | Playwright visual smoke only if needed | Theme/responsive: manual or periodic. |
| §13 Security | API tests for CSRF/auth; rate limit unit tests | CSP: optional lint or Playwright console listener in one E2E. |
| §14–16 Admin / feedback / NPS | API tests for admin-only routes + NPS 409 behavior | Survey timing: manual. |

---

## 4. Tooling choices

### 4.1 Test runner: Vitest

- Aligns with Vite; fast cold start; native ESM; good TypeScript support.
- **Add:** `vitest`, `@vitest/coverage-v8` (optional, **report-only**).
- **Config:** `vitest.config.ts` with `environment: 'node'` for server tests; use `pool: 'forks'` if any PB-related flakiness appears.

### 4.2 Component tests (optional, low priority)

- If needed: `@testing-library/svelte` + `jsdom` environment for specific components.
- Use sparingly—prefer unit tests on extracted logic or E2E for critical UI.

### 4.3 E2E: Playwright

- **Config:** `playwright.config.ts` — `baseURL: 'http://127.0.0.1:5151'` (or env `PLAYWRIGHT_BASE_URL`), `webServer` command: `pnpm dev` with reuse for local dev.
- **Artifacts:** `test-results/`, traces on failure, HTML report in CI as downloadable artifact.

### 4.4 Lint / typecheck (already valuable)

- Keep **`pnpm check`** (svelte-check) in CI as a **static** gate—it catches many regressions without being “tests” in the coverage sense.

---

## 5. CI and local workflows

### 5.1 Proposed npm/pnpm scripts

| Script | Purpose |
|--------|---------|
| `test` | Run Vitest unit + integration |
| `test:unit` | Fast subset (e.g. `src/lib/**/*.test.ts`) |
| `test:e2e` | Playwright |
| `test:e2e:smoke` | Single smoke project/tag |
| `test:all` | `check` + `test` + `test:e2e` (optional locally) |

### 5.2 GitHub Actions layout

**Option A — Single workflow (simplest):**

- **On PR + push to `main`:** `pnpm install`, `pnpm check`, `pnpm test`, optionally `pnpm test:e2e:smoke` with services.

**Option B — Split:**

- **`ci.yml`:** `check` + Vitest (always).
- **`e2e.yml`:** Playwright on schedule or on `main` only (saves minutes).

### 5.3 Services in CI

| Dependency | Approach |
|------------|----------|
| PocketBase | Run official Docker image; run `scripts/setup-pocketbase.js` or a minimal seed; health wait then tests. **Or** skip PB-dependent E2E on PR and run nightly. |
| Anthropic / Ollama | Never required in CI; use mocks. |
| Stripe | Fixtures only. |

### 5.4 Deploy pipeline (`deploy.yml`)

Today: build + deploy, no tests. **Recommendation:** Add a **`ci`** job (or prerequisite workflow) that runs `pnpm check` and `pnpm test` before deploy. Optionally require `main` to be green from PR checks.

**Playwright browsers on deploy:** Production already installs Chromium for scraping; E2E does not need to run **on the droplet**—only in GitHub Actions.

---

## 6. Directory and naming conventions

```
prime-contender/
├── playwright.config.ts          # E2E config
├── vitest.config.ts
├── e2e/                          # or tests/e2e/
│   ├── smoke.spec.ts
│   └── auth.spec.ts
├── src/
│   └── lib/
│       └── server/
│           ├── entitlements.ts
│           └── entitlements.test.ts   # colocated, or **/__tests__/
```

- **Colocate** unit tests next to modules (`*.test.ts`) or under `src/lib/**/__tests__/` — pick one and stay consistent.
- **E2E** lives outside `src/` so it is clearly not bundled.

---

## 7. Coverage policy

- **Do not** gate merges on line coverage.
- Optional: generate **HTML or lcov** in CI for human review after refactors.
- Focus on **critical paths** listed in §2.1–2.2.

---

## 8. Test data and secrets

- **CI secrets:** None for default unit tests. E2E with PB may need `PUBLIC_POCKETBASE_URL` and a test admin user created in seed.
- **Never** commit real API keys; use `.env.example` and CI secrets for optional integration jobs.
- **User IDs:** Tests should use fixed seed IDs from PB test data for predictable assertions.

---

## 9. Phased rollout (recommended)

| Phase | Deliverables | Exit criteria |
|-------|--------------|---------------|
| **0** | `vitest.config.ts`, `pnpm test`, first tests for `validation.ts` schemas + one entitlements case | CI runs Vitest + `check` on PR |
| **1** | Tests for `planLimitValues` / entitlements edge cases; rate limit helper tests | No coverage gate; team agrees tests are readable |
| **2** | `playwright.config.ts` + `e2e/smoke.spec.ts` (health + home) | CI runs smoke with or without PB (document which) |
| **3** | API tests for 401/400 on selected routes with mocks | Regression suite for security checklist §13 |
| **4** | Seeded PB + login E2E **or** Stripe webhook unit tests | Staging/manual still required for full billing |

---

## 10. Maintenance

- When **TEST_PLAN** gains a new critical path, ask: “Would a unit or API test have caught this?” If yes, add automation.
- **Review quarterly:** Drop flaky E2E; fix or replace with lower-level tests.
- Keep **manual TEST_PLAN** updated when product behavior changes; automation spec should reference it, not duplicate step-by-step prose.

---

## 11. Open decisions (to resolve during implementation)

1. **Single vs split CI workflows** for cost vs feedback speed.
2. **PocketBase in CI** for every PR vs nightly only (cost/complexity tradeoff).
3. **Whether to extract** small pure functions from large Svelte components for testability vs E2E-only—case by case.

---

## 12. Summary

The best combination for most ForgeKit-derived apps is **many fast unit tests** on validation and entitlements (or equivalent business rules), **targeted API/integration tests** for auth and error contracts, and **a small Playwright smoke suite** for regressions that only appear in a real browser. **Coverage is not a goal.** The manual **TEST_PLAN** remains essential for LLM quality, billing, OAuth, and third-party integrations. This division maximizes future development speed and deployment confidence without gaming metrics.
