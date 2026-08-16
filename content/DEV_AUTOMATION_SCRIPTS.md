# Dev automation scripts (app repo)

Use **small `pnpm` scripts** (backed by files under `scripts/` when needed) so new contributors and future you don’t rely on memory, long READMEs, or dozens of IDE clicks. Prefer **idempotent** commands (safe to run twice).

This guide lists **strong defaults** for a typical full-stack app. Names are examples—align with your stack.

---

## 1. Env readiness — `pnpm run env:check` (or `doctor`)

**Problem:** “App won’t start” because a variable is missing or misnamed.

**Script:** Read required keys from a single source of truth (e.g. list in `scripts/check-env.ts`, or parse `.env.example` for keys without default values). Exit **non-zero** if something required is missing. **Do not** print secret values—only names of missing vars.

**User flow:** Copy `.env.example` → `.env`, fill secrets, run `pnpm run env:check` before `pnpm run dev`.

---

## 2. Generated types / API client — `pnpm run gen:types`

**Problem:** Hand-written types drift from PocketBase collections, OpenAPI, or GraphQL.

**Script:** Regenerate TypeScript types (or a thin client) from the real schema: PocketBase export, `openapi-typescript`, codegen, etc. Commit generated files or gitignore + CI generate—pick one policy and document it in **`README.md`**.

**User flow:** After schema changes, run `pnpm run gen:types` (and commit if applicable).

---

## 3. Seed / fixture data — `pnpm run db:seed`

**Problem:** Empty DB makes every demo “first create records by hand in the admin UI.”

**Script:** Idempotent seed using the **same auth path** the app uses (user token) or admin API for dev only. Guard with `NODE_ENV=development` or an explicit `--force` so production never runs it by accident.

**User flow:** After migrations/schema apply, `pnpm run db:seed` for local demo data.

---

## 4. End-to-end test browsers — `pnpm run test:e2e:install` (or postinstall)

**Problem:** First `pnpm run test:e2e` fails with “install Playwright browsers.”

**Script:** `pnpm exec playwright install` (or `playwright install --with-deps` on CI). Optionally wire **`pnpm run test:e2e`** to depend on install, or document **`pnpm run test:e2e:install`** once per machine.

**User flow:** One command after clone or when Playwright upgrades.

---

## 5. Git hooks (lint/format on commit) — `pnpm prepare` + Husky (or similar)

**Problem:** CI catches style issues late; contributors forget to run lint.

**Script:** `pnpm prepare` runs `husky` install; `.husky/pre-commit` runs `lint-staged` or `pnpm run lint`. Keep it **fast** so people don’t `--no-verify` habitually.

**User flow:** `pnpm install` once; hooks activate automatically.

---

## PocketBase-specific (already separate)

Collection/schema apply from **`.env` admin credentials** is covered in **`POCKETBASE_SCHEMA_SCRIPT.md`** — combine with the above: bootstrap binary → schema script → env check → dev.

**Isolated check:** `pnpm run test:pocketbase` or **test-pocketbase.bat** — see **`SYSTEM_HEALTH_CHECKS.md`**.

---

## Ollama (local LLM — runtime or build-time seed)

When the brief uses **runtime LLM API** or **build-time LLM generation** with Ollama (see **FORGETRAIL_LITE** §7.1, README “LLM-backed content”):

| Script | Purpose |
|--------|---------|
| `pnpm run setup:ollama` | Install Ollama if missing, detect VRAM, pull Granite 4.1 / Gemma 3 (non-thinking default) |
| `pnpm run test:ollama` | Version + one completion — proves inference works |

**`.env`:** `OLLAMA_BASE_URL`, `OLLAMA_MODEL`. Use **`OLLAMA_USE_THINKING=1`** only when the product needs reasoning models. See **FORGETRAIL_LITE.md** §4.8.

---

## 0. One-click launchers (non-technical operators)

Before the terminal-heavy block below, agents should create **setup.bat** / **setup.sh**, **run.bat** / **run.sh**, **status.bat** / **status.sh** per **`ONE_CLICK_DEV_SETUP.md`** and **FORGETRAIL_LITE.md** §4.5–§4.6.

**README “Quick start (no terminal)”** — three double-clicks: setup → run → status.

---

## README pattern (terminal / agents)

Document a **single “first time” block** for contributors who prefer the shell:

1. `cp .env.example .env` and fill values  
2. `pnpm install`  
3. `pnpm run setup:pocketbase` (or double-click **setup.bat** — resolves **latest** PocketBase unless `POCKETBASE_VERSION` is pinned)  
4. `pnpm run pocketbase:schema` (if applicable)  
5. `pnpm run env:check`  
6. `pnpm run db:seed` (optional)  
7. `pnpm run dev` (or **run.bat**)  
8. `pnpm run forgetrail:status` — phase progress  
9. `pnpm run test:pocketbase` — PocketBase only (troubleshooting)  
10. `pnpm run setup:ollama` → `pnpm run test:ollama` — when local LLM is in scope  

Adjust order to match your stack; link to **`ONE_CLICK_DEV_SETUP.md`**, **`SYSTEM_HEALTH_CHECKS.md`**, **`POCKETBASE_SCHEMA_SCRIPT.md`**, and **`FORGETRAIL_LITE.md`** §4.2.2–§4.8 from **`CONTEXT_PROMPT.md`** so agents don’t invent one-off instructions or hardcode old PocketBase versions.
