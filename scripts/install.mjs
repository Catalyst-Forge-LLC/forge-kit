#!/usr/bin/env node

/**
 * Shared install logic — full template-in-repo and Lite bootstrap.
 */

import { join } from "node:path";
import {
  FORGEKIT_ROOT,
  copyContentDir,
  copyPath,
  ensureDir,
  parseInstallArgs,
  resolveTarget,
} from "./install-lib.mjs";

const ROOT_FILES = [
  "WORKFLOW.md",
  "TRACKING_SCHEMA.md",
  "workflow_tracking.json",
  "INITIAL_PROMPT.md",
  "CONTINUATION_PROMPT.md",
  "LICENSE",
];

const LITE_FILES = [
  ["FORGEKIT_LITE.md", "FORGEKIT_LITE.md"],
  ["forgekit-workspace-README.md", "README.md"],
  ["FORGEKIT_LITE_UPDATES.md", "FORGEKIT_LITE_UPDATES.md"],
];

const LITE_CURSOR_RULES = [
  "forgekit-no-trailer.mdc",
  "forgekit-updates-log.mdc",
  "specs-and-todo.mdc",
  "spec-completion.mdc",
];

export function runInstallForgekit(rawArgv, { defaultToCwd = false } = {}) {
  const args = parseInstallArgs(rawArgv);
  if (args.help) return { help: INSTALL_FULL_HELP };

  const target = resolveTarget(args.target, { defaultToCwd });
  const opts = { force: args.force, dryRun: args.dryRun };
  const forgekitDir = join(target, "_forgekit");
  const contentSrc = join(FORGEKIT_ROOT, "content");
  const contentDest = join(forgekitDir, "content");

  console.log(`ForgeKit full install → ${forgekitDir}`);
  if (args.dryRun) console.log("(dry run)\n");

  ensureDir(forgekitDir, args.dryRun);

  for (const file of ROOT_FILES) {
    copyPath(join(FORGEKIT_ROOT, file), join(forgekitDir, file), opts);
  }

  copyPath(join(FORGEKIT_ROOT, "docs"), join(forgekitDir, "docs"), opts);
  copyPath(join(FORGEKIT_ROOT, "prompts"), join(forgekitDir, "prompts"), opts);
  copyContentDir(contentSrc, contentDest, opts);

  if (!args.skipTracking) {
    copyPath(
      join(FORGEKIT_ROOT, "workflow_tracking.json"),
      join(target, ".forgekit", "workflow_tracking.json"),
      { ...opts, force: args.force }
    );
  }

  console.log("\nDone.");
  console.log("  Methodology:  _forgekit/WORKFLOW.md");
  console.log("  First chat:   _forgekit/INITIAL_PROMPT.md");
  console.log("  Tracking:     .forgekit/workflow_tracking.json");
  return { target, mode: "full" };
}

export function runInstallLite(rawArgv, { defaultToCwd = false } = {}) {
  const args = parseInstallArgs(rawArgv);
  if (args.help) return { help: INSTALL_LITE_HELP };

  const target = resolveTarget(args.target, { defaultToCwd });
  const opts = { force: args.force, dryRun: args.dryRun };
  const contentDir = join(FORGEKIT_ROOT, "content");
  const forgekitDir = join(target, ".forgekit");

  console.log(`ForgeKit Lite install → ${forgekitDir}`);
  if (args.dryRun) console.log("(dry run)\n");

  ensureDir(forgekitDir, args.dryRun);
  ensureDir(join(forgekitDir, "cursor", "rules"), args.dryRun);

  for (const [src, dest] of LITE_FILES) {
    copyPath(join(contentDir, src), join(forgekitDir, dest), opts);
  }

  for (const rule of LITE_CURSOR_RULES) {
    copyPath(
      join(contentDir, "cursor-rules", rule),
      join(forgekitDir, "cursor", "rules", rule),
      opts
    );
  }

  if (!args.skipTracking) {
    copyPath(
      join(contentDir, "LITE_WORKFLOW_TRACKING.json"),
      join(forgekitDir, "workflow_tracking.json"),
      opts
    );
  }

  if (args.withGenesisStub) {
    const genesisDest = join(target, "docs", "GENESIS.md");
    ensureDir(join(target, "docs"), args.dryRun);
    copyPath(join(contentDir, "GENESIS_STUB.md"), genesisDest, opts);
  }

  console.log("\nDone.");
  console.log("  Protocol:  .forgekit/FORGEKIT_LITE.md");
  console.log("  Tracking:  .forgekit/workflow_tracking.json (lite-1 schema)");
  if (args.withGenesisStub) {
    console.log("  Genesis:   docs/GENESIS.md (stub — replace with your spec)");
    console.log("  Next:      see TRY_FORGEKIT.md in the forge-kit repo");
  }
  return { target, mode: "lite", withGenesisStub: !!args.withGenesisStub };
}

export const INSTALL_FULL_HELP = `
ForgeKit template-in-repo install (offline / no MCP server required)

Usage:
  forgekit install [options]          (from your project folder, after global link)
  pnpm run install:forgekit -- [options]

Options:
  --path, -p <dir>   Target project root (default: current directory for \`forgekit\` CLI)
  --force, -f        Overwrite existing files
  --skip-tracking    Do not create .forgekit/workflow_tracking.json
  --dry-run          Print actions only

Installs:
  <target>/_forgekit/   WORKFLOW, templates, prompts, content/ (curated)
  <target>/.forgekit/   workflow_tracking.json starter (unless skipped)
`.trim();

export const INSTALL_LITE_HELP = `
ForgeKit Lite install (portable protocol, no MCP)

Usage:
  forgekit install --lite [options]
  pnpm run install:lite -- [options]

Options:
  --path, -p <dir>        Target project root (default: current directory for \`forgekit\` CLI)
  --force, -f             Overwrite existing files
  --skip-tracking         Do not create workflow_tracking.json starter
  --with-genesis-stub     Also create docs/GENESIS.md stub (for the Try path)
  --dry-run               Print actions only

Installs into <target>/.forgekit/ (FORGEKIT_LITE.md, tracking starter, cursor rules).
With --with-genesis-stub, also writes docs/GENESIS.md from content/GENESIS_STUB.md.
See TRY_FORGEKIT.md in the forge-kit repo for the no-MCP prove-it recipe.
`.trim();
