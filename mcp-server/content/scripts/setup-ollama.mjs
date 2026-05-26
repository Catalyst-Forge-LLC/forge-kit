#!/usr/bin/env node
/**
 * Install Ollama when possible, detect GPU VRAM, pull a non-thinking local model.
 * Copy to app repo scripts/setup-ollama.mjs
 *
 * Policy: default to instruction models (Granite 4.1, Gemma 3) — NOT reasoning/thinking
 * families unless OLLAMA_USE_THINKING=1 in .env.
 *
 * Env: OLLAMA_MODEL (override), OLLAMA_PREFER_GEMMA=1, OLLAMA_USE_THINKING=1,
 *      OLLAMA_BASE_URL, SKIP_OLLAMA_INSTALL=1
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { loadEnv, repoRootFromImportMeta } from "./forgekit-env.mjs";

const repoRoot = repoRootFromImportMeta(import.meta.url);
const stampPath = join(repoRoot, ".forgekit", "ollama-model.txt");
const isWin = process.platform === "win32";

const THINKING_MODEL_RE =
  /(^|:|\/)?(deepseek-r1|qwq|qwen3-thinking|o1|o3|reasoning|think\b|-think)/i;

/** Approximate pull sizes (MB) for VRAM budgeting — leave ~2GB headroom for context/KV. */
const MODEL_VRAM_MB = {
  "gemma3:1b": 1200,
  "ibm/granite4.1:3b": 2500,
  "gemma3:4b": 4000,
  "ibm/granite4:3b": 3500,
  "ibm/granite4.1:8b": 6000,
  "gemma3:12b": 9000,
  "gemma3:27b": 18000,
};

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: isWin, ...opts });
    p.on("error", reject);
    p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error(`${cmd} exited ${c}`))));
  });
}

function runCapture(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { shell: isWin });
    let out = "";
    p.stdout?.on("data", (d) => (out += d));
    p.stderr?.on("data", (d) => (out += d));
    p.on("error", () => resolve(""));
    p.on("exit", () => resolve(out.trim()));
  });
}

async function hasOllama() {
  const out = await runCapture("ollama", ["--version"]);
  return /ollama/i.test(out);
}

async function detectVramMb() {
  if (isWin) {
    const nvidia = await runCapture("nvidia-smi", [
      "--query-gpu=memory.total",
      "--format=csv,noheader,nounits",
    ]);
    const m = nvidia.match(/(\d+)/);
    if (m) return Number(m[1]);
  } else {
    const nvidia = await runCapture("nvidia-smi", [
      "--query-gpu=memory.total",
      "--format=csv,noheader,nounits",
    ]);
    const first = nvidia.split(/\r?\n/)[0]?.match(/(\d+)/);
    if (first) return Number(first[1]);
  }
  return 0;
}

function assertNotThinking(model, env) {
  if (env.OLLAMA_USE_THINKING === "1") return;
  if (THINKING_MODEL_RE.test(model)) {
    throw new Error(
      `Model "${model}" looks like a reasoning/thinking model. Set OLLAMA_USE_THINKING=1 only if the brief requires it. Default: Granite 4.1 or Gemma 3 instruct variants.`
    );
  }
}

function pickModel(vramMb, env) {
  if (env.OLLAMA_MODEL?.trim()) {
    const m = env.OLLAMA_MODEL.trim();
    assertNotThinking(m, env);
    return m;
  }
  const preferGemma = env.OLLAMA_PREFER_GEMMA === "1";
  const tier = (m) => {
    assertNotThinking(m, env);
    return m;
  };
  if (vramMb >= 10000) {
    return tier(preferGemma ? "gemma3:12b" : "ibm/granite4.1:8b");
  }
  if (vramMb >= 6000) {
    return tier(preferGemma ? "gemma3:4b" : "ibm/granite4.1:8b");
  }
  if (vramMb >= 4000) {
    return tier(preferGemma ? "gemma3:4b" : "ibm/granite4.1:3b");
  }
  if (vramMb > 0) {
    return tier("gemma3:4b");
  }
  return tier(preferGemma ? "gemma3:4b" : "ibm/granite4.1:3b");
}

async function installOllama() {
  console.log("Ollama not found — attempting install…");
  if (isWin) {
    try {
      await run("winget", ["install", "-e", "--id", "Ollama.Ollama", "--accept-package-agreements", "--accept-source-agreements"]);
      return true;
    } catch {
      console.log("winget install failed. Download from https://ollama.com/download/windows and re-run setup-ollama.");
      return false;
    }
  }
  if (process.platform === "darwin") {
    try {
      await run("brew", ["install", "ollama"]);
      return true;
    } catch {
      console.log("brew install failed. Run: curl -fsSL https://ollama.com/install.sh | sh");
      return false;
    }
  }
  try {
    await run("sh", ["-c", "curl -fsSL https://ollama.com/install.sh | sh"]);
    return true;
  } catch {
    console.log("Install script failed. See https://ollama.com/download");
    return false;
  }
}

async function ensureOllamaServe() {
  try {
    const res = await fetch("http://127.0.0.1:11434/api/version", { signal: AbortSignal.timeout(2000) });
    if (res.ok) return;
  } catch {
    /* start below */
  }
  console.log("Starting Ollama service in background…");
  const child = spawn("ollama", ["serve"], { detached: true, stdio: "ignore", shell: isWin });
  child.unref();
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await fetch("http://127.0.0.1:11434/api/version", { signal: AbortSignal.timeout(2000) });
      if (res.ok) return;
    } catch {
      /* retry */
    }
  }
  throw new Error("Ollama did not become ready on http://127.0.0.1:11434 — open the Ollama app (Windows/Mac) and retry.");
}

async function main() {
  const env = loadEnv(repoRoot);
  if (env.SKIP_OLLAMA_INSTALL === "1") {
    console.log("SKIP_OLLAMA_INSTALL=1 — skipping Ollama setup.");
    process.exit(0);
  }

  let installed = await hasOllama();
  if (!installed && env.SKIP_OLLAMA_AUTO_INSTALL !== "1") {
    installed = await installOllama();
  }
  if (!installed) {
    console.error("Ollama is not installed. Install from https://ollama.com then run: pnpm run setup:ollama");
    process.exit(1);
  }

  await ensureOllamaServe();

  const vramMb = await detectVramMb();
  const model = pickModel(vramMb, env);
  const needMb = MODEL_VRAM_MB[model] || 5000;
  console.log(
    vramMb
      ? `Detected GPU VRAM ≈ ${vramMb} MB — selected ${model} (needs ~${needMb} MB).`
      : `No NVIDIA VRAM detected — using CPU-friendly ${model}. First run may be slow.`
  );

  if (existsSync(stampPath) && readFileSync(stampPath, "utf8").trim() === model && !process.argv.includes("--force")) {
    console.log(`Model ${model} already recorded — skipping pull (use --force to re-pull).`);
  } else {
    console.log(`Pulling ${model}…`);
    await run("ollama", ["pull", model]);
    mkdirSync(join(repoRoot, ".forgekit"), { recursive: true });
    writeFileSync(stampPath, model, "utf8");
  }

  console.log("\nNext: node scripts/test-ollama.mjs  (or double-click test-ollama.bat)");
  console.log(`Set in .env: OLLAMA_BASE_URL=http://127.0.0.1:11434  OLLAMA_MODEL=${model}`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
