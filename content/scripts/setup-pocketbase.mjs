#!/usr/bin/env node
/**
 * Reference PocketBase bootstrap — copy to app repo scripts/setup-pocketbase.mjs
 * ForgeKit: never hardcode a PocketBase version in FORGEKIT_LITE or SCAFFOLD_INSTALL alone.
 *
 * Version resolution (in order):
 * 1. POCKETBASE_VERSION in .env (semver, e.g. 0.26.2) — use when locked after a successful boot
 * 2. POCKETBASE_VERSION=latest or unset → GitHub releases/latest at install time
 *
 * Idempotent: skips download if binary exists and version file matches (unless --force).
 */
import { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { chmod, unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pipeline } from "node:stream/promises";
import { spawn } from "node:child_process";
const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const pbDir = join(repoRoot, "pocketbase");
const dataDir = join(pbDir, "pb_data");
const versionFile = join(pbDir, ".pocketbase-version");
const isWin = process.platform === "win32";
const exeName = isWin ? "pocketbase.exe" : "pocketbase";
const exePath = join(pbDir, exeName);

function loadEnv() {
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

async function resolveVersion(env) {
  const v = (env.POCKETBASE_VERSION || "latest").trim();
  if (v !== "latest") return v.replace(/^v/, "");
  const res = await fetch("https://api.github.com/repos/pocketbase/pocketbase/releases/latest", {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "forgekit-setup" },
  });
  if (!res.ok) throw new Error(`Could not resolve latest PocketBase release (${res.status})`);
  const data = await res.json();
  const tag = String(data.tag_name || "").replace(/^v/, "");
  if (!tag) throw new Error("GitHub latest release had no tag_name");
  return tag;
}

function platformAsset(version) {
  const os = isWin ? "windows" : process.platform === "darwin" ? "darwin" : "linux";
  const arch = process.arch === "arm64" ? "arm64" : "amd64";
  const ext = os === "windows" ? "zip" : "zip";
  return {
    url: `https://github.com/pocketbase/pocketbase/releases/download/v${version}/pocketbase_${version}_${os}_${arch}.${ext}`,
    os,
  };
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${res.status}: ${url}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function extractZip(zipPath) {
  if (isWin) {
    const ps = `Expand-Archive -LiteralPath '${zipPath.replace(/'/g, "''")}' -DestinationPath '${pbDir.replace(/'/g, "''")}' -Force`;
    await new Promise((resolve, reject) => {
      const p = spawn("powershell", ["-NoProfile", "-Command", ps], { stdio: "inherit", cwd: repoRoot });
      p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error(`Expand-Archive exit ${c}`))));
    });
    return;
  }
  await new Promise((resolve, reject) => {
    const p = spawn("unzip", ["-o", zipPath, "-d", pbDir], { stdio: "inherit" });
    p.on("exit", (c) => (c === 0 ? resolve() : reject(new Error(`unzip exit ${c}`))));
  });
}

async function portInUse(host, port) {
  try {
    const res = await fetch(`http://${host}:${port}/api/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function main() {
  const force = process.argv.includes("--force");
  const env = loadEnv();
  const version = await resolveVersion(env);
  const host = env.POCKETBASE_HTTP_HOST || "127.0.0.1";
  const port = env.POCKETBASE_HTTP_PORT || env.PUBLIC_POCKETBASE_PORT || "8096";

  mkdirSync(pbDir, { recursive: true });
  mkdirSync(dataDir, { recursive: true });

  if (existsSync(exePath) && existsSync(versionFile) && readFileSync(versionFile, "utf8").trim() === version && !force) {
    console.log(`PocketBase ${version} already present — skipping download.`);
  } else {
    console.log(`Installing PocketBase ${version}…`);
    const { url } = platformAsset(version);
    const zipPath = join(pbDir, "pocketbase.zip");
    await download(url, zipPath);
    await extractZip(zipPath);
    try {
      await unlink(zipPath);
    } catch {
      /* ignore */
    }
    if (!isWin) await chmod(exePath, 0o755);
    writeFileSync(versionFile, version, "utf8");
    console.log(`Installed to ${exePath}`);
  }

  if (await portInUse(host, port)) {
    console.log(`Note: something already responds on http://${host}:${port} — may be this or another PocketBase.`);
  }

  console.log(`Start with: pnpm run pocketbase  (or double-click run.bat)`);
  console.log(`Admin UI: http://${host}:${port}/_/`);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
