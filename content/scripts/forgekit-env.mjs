#!/usr/bin/env node
/**
 * Shared env + repo root helpers for ForgeKit reference scripts.
 * Copy to app repo scripts/forgekit-env.mjs alongside other forgekit scripts.
 */
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export function repoRootFromImportMeta(importMetaUrl) {
  return join(dirname(fileURLToPath(importMetaUrl)), "..");
}

export function loadEnv(repoRoot) {
  const envPath = join(repoRoot, ".env");
  if (!existsSync(envPath)) return {};
  const out = {};
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 1) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  return out;
}

export function pocketBaseUrlFromEnv(env) {
  const raw =
    env.PUBLIC_POCKETBASE_URL ||
    env.POCKETBASE_URL ||
    (env.POCKETBASE_HTTP_HOST && env.POCKETBASE_HTTP_PORT
      ? `http://${env.POCKETBASE_HTTP_HOST}:${env.POCKETBASE_HTTP_PORT}`
      : "");
  if (!raw) return null;
  try {
    const u = new URL(raw.startsWith("http") ? raw : `http://${raw}`);
    return u;
  } catch {
    return null;
  }
}

export function ollamaBaseUrlFromEnv(env) {
  const raw = env.OLLAMA_BASE_URL || env.OLLAMA_HOST || "http://127.0.0.1:11434";
  try {
    return new URL(raw.startsWith("http") ? raw : `http://${raw}`);
  } catch {
    return new URL("http://127.0.0.1:11434");
  }
}
