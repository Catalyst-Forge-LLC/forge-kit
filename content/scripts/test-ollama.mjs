#!/usr/bin/env node
/**
 * Isolated Ollama completion smoke test — no app required.
 * Copy to app repo scripts/test-ollama.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadEnv, ollamaBaseUrlFromEnv, repoRootFromImportMeta } from "./forgetrail-env.mjs";

const repoRoot = repoRootFromImportMeta(import.meta.url);
const stampPath = join(repoRoot, ".forgetrail", "ollama-model.txt");

function fail(msg) {
  console.error(`Ollama check: FAIL — ${msg}`);
  process.exit(1);
}

function resolveModel(env) {
  if (env.OLLAMA_MODEL?.trim()) return env.OLLAMA_MODEL.trim();
  if (existsSync(stampPath)) return readFileSync(stampPath, "utf8").trim();
  return "ibm/granite4.1:3b";
}

async function main() {
  const env = loadEnv(repoRoot);
  const base = ollamaBaseUrlFromEnv(env);
  const model = resolveModel(env);

  let version;
  try {
    const res = await fetch(`${base.origin}/api/version`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) fail(`Ollama not reachable at ${base.origin} (HTTP ${res.status}). Run setup-ollama first.`);
    version = await res.json();
    console.log(`Ollama check: server OK — ${JSON.stringify(version)}`);
  } catch (e) {
    fail(`${base.origin} — ${e.message || e}. Install/start Ollama (setup-ollama.bat).`);
  }

  const tagsRes = await fetch(`${base.origin}/api/tags`, { signal: AbortSignal.timeout(5000) });
  const tags = tagsRes.ok ? await tagsRes.json() : { models: [] };
  const names = (tags.models || []).map((m) => m.name || m.model).filter(Boolean);
  const hasModel = names.some((n) => n === model || n.startsWith(`${model}:`) || n.includes(model));
  if (!hasModel) {
    console.warn(`Model "${model}" not in local list (${names.slice(0, 5).join(", ")}…). Run setup-ollama.`);
  }

  const prompt = "Reply with exactly one word: pong";
  console.log(`Completion test (${model})…`);
  const genRes = await fetch(`${base.origin}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: { num_predict: 16, temperature: 0 },
    }),
    signal: AbortSignal.timeout(120000),
  });
  if (!genRes.ok) {
    const errText = await genRes.text().catch(() => "");
    fail(`generate failed HTTP ${genRes.status}${errText ? `: ${errText.slice(0, 200)}` : ""}`);
  }
  const out = await genRes.json();
  const text = (out.response || "").trim();
  if (!text) fail("empty completion — model may still be loading; retry in a minute.");
  console.log(`Ollama check: OK — model responded: "${text.slice(0, 80)}${text.length > 80 ? "…" : ""}"`);
  console.log(`Use OLLAMA_BASE_URL=${base.origin}  OLLAMA_MODEL=${model} in .env for runtime LLM routes.`);
}

main().catch((e) => fail(e.message || String(e)));
