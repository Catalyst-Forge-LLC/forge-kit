#!/usr/bin/env node

import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

export const FORGEKIT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
export const MCP_SERVER_DIR = join(FORGEKIT_ROOT, "mcp-server");
export const MCP_ENTRY = join(MCP_SERVER_DIR, "dist", "index.js");
export const WORKFLOW_PATH = join(FORGEKIT_ROOT, "WORKFLOW.md");

export function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf-8"));
  } catch {
    return null;
  }
}

export function normalizePath(p) {
  if (!p || typeof p !== "string") return "";
  return resolve(p.replace(/\//g, "\\").replace(/\\/g, "/").replace(/^([A-Za-z]):/, (_, d) => `${d.toUpperCase()}:`));
}

/** Find .cursor/mcp.json starting at dir, walking up to root. */
export function findCursorMcpJson(startDir = process.cwd()) {
  let dir = resolve(startDir);
  for (;;) {
    const candidate = join(dir, ".cursor", "mcp.json");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return join(FORGEKIT_ROOT, ".cursor", "mcp.json");
}

export function analyzeCursorMcpConfig(mcpJsonPath) {
  const issues = [];
  const notes = [];
  if (!existsSync(mcpJsonPath)) {
    return {
      path: mcpJsonPath,
      found: false,
      issues: ["No .cursor/mcp.json found (checked cwd ancestors and forge-kit root)."],
      notes: [
        "Create .cursor/mcp.json with a forgekit server entry pointing at mcp-server/dist/index.js.",
        "See mcp-server/README.md or run: forgekit mcp cursor-config",
      ],
    };
  }

  const raw = readJson(mcpJsonPath);
  if (!raw?.mcpServers) {
    return { path: mcpJsonPath, found: true, issues: ["Invalid mcp.json: missing mcpServers."], notes: [] };
  }

  const forgekit =
    raw.mcpServers.forgekit ??
    raw.mcpServers["forgekit-mcp"] ??
    Object.entries(raw.mcpServers).find(([k]) => /forgekit/i.test(k))?.[1];

  if (!forgekit) {
    issues.push('No "forgekit" entry under mcpServers.');
    notes.push('Add a server named "forgekit" (Cursor shows this name in MCP settings).');
    return { path: mcpJsonPath, found: true, issues, notes, config: raw };
  }

  const args = forgekit.args ?? [];
  const entryArg = args.find((a) => typeof a === "string" && a.endsWith("index.js"));
  if (!entryArg) {
    issues.push("forgekit MCP args should include mcp-server/dist/index.js");
  } else if (!existsSync(entryArg)) {
    issues.push(`Configured server path does not exist: ${entryArg}`);
    notes.push("Run: forgekit mcp build");
  } else if (normalizePath(entryArg) !== normalizePath(MCP_ENTRY)) {
    notes.push(`Configured entry: ${entryArg}`);
    notes.push(`This repo build:   ${MCP_ENTRY}`);
  }

  if (forgekit.command && forgekit.command !== "node") {
    notes.push(`command is "${forgekit.command}" (node is typical).`);
  }

  const envRoot = forgekit.env?.FORGEKIT_ROOT;
  if (envRoot && normalizePath(envRoot) !== normalizePath(FORGEKIT_ROOT)) {
    notes.push(`FORGEKIT_ROOT in mcp.json: ${envRoot}`);
  } else if (!envRoot) {
    notes.push(
      "Optional: set env.FORGEKIT_ROOT in mcp.json if the server lives outside the default parent-of-mcp-server layout."
    );
  }

  return { path: mcpJsonPath, found: true, issues, notes, config: raw, entryArg };
}

export function staticMcpChecks() {
  const issues = [];
  const notes = [];

  if (!existsSync(WORKFLOW_PATH)) {
    issues.push(`WORKFLOW.md missing at ${WORKFLOW_PATH}`);
  }

  if (!existsSync(join(MCP_SERVER_DIR, "node_modules"))) {
    issues.push("mcp-server/node_modules missing — run: forgekit mcp build");
  }

  if (!existsSync(MCP_ENTRY)) {
    issues.push("mcp-server/dist/index.js missing — run: forgekit mcp build");
  }

  const pkg = readJson(join(MCP_SERVER_DIR, "package.json"));
  if (pkg?.version) {
    notes.push(`forgekit-mcp package version: ${pkg.version}`);
  }

  notes.push(`FORGEKIT_ROOT (default): ${FORGEKIT_ROOT}`);

  return { issues, notes };
}

export function posixPath(p) {
  return p.replace(/\\/g, "/");
}

export function mcpClientConfigObject() {
  return {
    mcpServers: {
      forgekit: {
        command: "node",
        args: [posixPath(MCP_ENTRY)],
        env: { FORGEKIT_ROOT: posixPath(FORGEKIT_ROOT) },
      },
    },
  };
}

/** Copy-paste MCP client setup — shown after `forgekit mcp build`. */
export function printMcpClientSetupBanner({ showBuildComplete = true } = {}) {
  const entry = posixPath(MCP_ENTRY);

  if (showBuildComplete) {
    console.log("\n✓ Build complete.\n");
  }

  console.log("Connect ForgeKit MCP (Cursor starts the server for you — no `mcp dev` needed):\n");
  console.log("  Cursor — project .cursor/mcp.json or Settings → MCP → add server:");
  console.log(JSON.stringify(mcpClientConfigObject(), null, 2));
  console.log("");
  console.log("  Claude Desktop — %APPDATA%\\Claude\\claude_desktop_config.json (same mcpServers block)");
  console.log(`  Claude Code — claude mcp add forgekit node ${entry}`);
  console.log("");
  console.log("  Then reload MCP in Cursor (Settings → MCP) or restart Cursor.");
  console.log("  Verify: forgekit mcp ping   |   Reprint: forgekit mcp cursor-config");
  console.log("");
  console.log('  First agent prompt: "Call ForgeKit getNewProjectKickoff and set up the project."');
  console.log("");
}

export function runMcpBuild() {
  console.log("Building ForgeKit MCP server...\n");
  const install = spawnSync("pnpm", ["install"], { cwd: MCP_SERVER_DIR, stdio: "inherit", shell: true });
  if (install.status !== 0) {
    process.exit(install.status ?? 1);
  }
  const build = spawnSync("pnpm", ["run", "build"], { cwd: MCP_SERVER_DIR, stdio: "inherit", shell: true });
  if (build.status !== 0) {
    process.exit(build.status ?? 1);
  }
  printMcpClientSetupBanner();
}

export function printCursorConfigTemplate() {
  printMcpClientSetupBanner({ showBuildComplete: false });
}
