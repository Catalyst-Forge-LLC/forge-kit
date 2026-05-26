#!/usr/bin/env node
/**
 * Isolated PocketBase health check — no app dev server required.
 * Copy to app repo scripts/test-pocketbase.mjs
 *
 * Usage: node scripts/test-pocketbase.mjs
 * Exit 0 = healthy; non-zero = failure with actionable message.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { loadEnv, pocketBaseUrlFromEnv, repoRootFromImportMeta } from "./forgekit-env.mjs";

const repoRoot = repoRootFromImportMeta(import.meta.url);
const env = loadEnv(repoRoot);
const pbUrl = pocketBaseUrlFromEnv(env);

function fail(msg, code = 1) {
  console.error(`PocketBase check: FAIL — ${msg}`);
  process.exit(code);
}

function ok(msg) {
  console.log(`PocketBase check: OK — ${msg}`);
}

async function fetchHealth(origin) {
  const res = await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(5000) });
  if (!res.ok) throw new Error(`health returned ${res.status}`);
  const body = await res.json().catch(() => ({}));
  return body;
}

async function tryStartLocalPb() {
  const pbDir = join(repoRoot, "pocketbase");
  const isWin = process.platform === "win32";
  const exe = join(pbDir, isWin ? "pocketbase.exe" : "pocketbase");
  if (!existsSync(exe)) return false;
  const host = env.POCKETBASE_HTTP_HOST || "127.0.0.1";
  const port = env.POCKETBASE_HTTP_PORT || env.PUBLIC_POCKETBASE_PORT || "8096";
  console.log(`Starting local PocketBase (${host}:${port}) for this test…`);
  const child = spawn(exe, ["serve", `--http=${host}:${port}`], {
    cwd: pbDir,
    detached: true,
    stdio: "ignore",
  });
  child.unref();
  for (let i = 0; i < 15; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      await fetchHealth(`http://${host}:${port}`);
      return `http://${host}:${port}`;
    } catch {
      /* retry */
    }
  }
  return false;
}

async function main() {
  let origin = pbUrl?.origin;
  if (!origin) {
    fail(
      "Set PUBLIC_POCKETBASE_URL (or POCKETBASE_HTTP_HOST + POCKETBASE_HTTP_PORT) in .env — see .env.example."
    );
  }

  let health;
  try {
    health = await fetchHealth(origin);
    ok(`${origin} — ${JSON.stringify(health)}`);
  } catch (e) {
    console.log(`No response at ${origin} (${e.message || e}).`);
    const started = await tryStartLocalPb();
    if (!started) {
      fail(
        `Nothing listening at ${origin}. Run setup.bat / pnpm run setup:pocketbase, then pnpm run pocketbase or run.bat.`
      );
    }
    origin = started;
    health = await fetchHealth(origin);
    ok(`${origin} (started for test) — ${JSON.stringify(health)}`);
  }

  const email = env.POCKETBASE_ADMIN_EMAIL;
  const password = env.POCKETBASE_ADMIN_PASSWORD;
  if (email && password) {
    try {
      const res = await fetch(`${origin}/api/admins/auth-with-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity: email, password }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) {
        console.log("Admin auth: OK (POCKETBASE_ADMIN_* credentials accepted).");
      } else {
        console.warn(`Admin auth: HTTP ${res.status} — check POCKETBASE_ADMIN_EMAIL / POCKETBASE_ADMIN_PASSWORD.`);
      }
    } catch (e) {
      console.warn(`Admin auth: skipped (${e.message || e}).`);
    }
  } else {
    console.log("Admin auth: skipped (set POCKETBASE_ADMIN_EMAIL + POCKETBASE_ADMIN_PASSWORD in .env to test).");
  }

  console.log(`Admin UI: ${origin}/_/`);
}

main().catch((e) => fail(e.message || String(e)));
