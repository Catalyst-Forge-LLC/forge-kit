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

export function runMcpBuild() {
  console.log("Building ForgeKit MCP server...\n");
  const install = spawnSync("pnpm", ["install"], { cwd: MCP_SERVER_DIR, stdio: "inherit", shell: true });
  if (install.status !== 0) {
    process.exit(install.status ?? 1);
  }
  const build = spawnSync("pnpm", ["run", "build"], { cwd: MCP_SERVER_DIR, stdio: "inherit", shell: true });
  process.exit(build.status ?? 0);
}

export function printCursorConfigTemplate() {
  const template = {
    mcpServers: {
      forgekit: {
        command: "node",
        args: [MCP_ENTRY.replace(/\\/g, "/")],
        env: {
          FORGEKIT_ROOT: FORGEKIT_ROOT.replace(/\\/g, "/"),
        },
      },
    },
  };
  console.log(JSON.stringify(template, null, 2));
  console.log("\nSave to .cursor/mcp.json (project) or Cursor global MCP settings.");
  console.log("Then restart Cursor or reload MCP servers in Settings → MCP.");
}
