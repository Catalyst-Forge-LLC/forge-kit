#!/usr/bin/env node

/**
 * ForgeKit Lite install → <target>/.forgekit/
 *
 * Copies the portable single-file protocol plus workspace helpers.
 * No _forgekit/ methodology tree — agent follows FORGEKIT_LITE.md.
 */

import { join } from "node:path";
import {
  FORGEKIT_ROOT,
  copyPath,
  ensureDir,
  parseInstallArgs,
  requireTarget,
} from "./install-lib.mjs";

const HELP = `
ForgeKit Lite install (portable protocol, no MCP)

Usage:
  pnpm run install:lite -- --path <project-root>
  FORGEKIT_TARGET=<project-root> pnpm run install:lite

Options:
  --path, -p <dir>   Target project root (required)
  --force, -f        Overwrite existing files
  --skip-tracking    Do not create workflow_tracking.json starter
  --dry-run          Print actions only

Installs:
  .forgekit/FORGEKIT_LITE.md
  .forgekit/README.md              (workspace guide)
  .forgekit/FORGEKIT_LITE_UPDATES.md
  .forgekit/workflow_tracking.json (lite-1 starter, unless skipped)
  .forgekit/cursor/rules/          (no-trailer + updates-log rules)

Next: tell your agent to follow .forgekit/FORGEKIT_LITE.md (§5 intake before code).
`;

const CONTENT = join(FORGEKIT_ROOT, "mcp-server", "content");

const LITE_FILES = [
  ["FORGEKIT_LITE.md", "FORGEKIT_LITE.md"],
  ["forgekit-workspace-README.md", "README.md"],
  ["FORGEKIT_LITE_UPDATES.md", "FORGEKIT_LITE_UPDATES.md"],
];

const LITE_CURSOR_RULES = ["forgekit-no-trailer.mdc", "forgekit-updates-log.mdc"];

function main() {
  const args = parseInstallArgs(process.argv.slice(2));
  if (args.help) {
    console.log(HELP.trim());
    process.exit(0);
  }

  const target = requireTarget(args.target);
  const opts = { force: args.force, dryRun: args.dryRun };
  const forgekitDir = join(target, ".forgekit");

  console.log(`ForgeKit Lite install → ${forgekitDir}`);
  if (args.dryRun) console.log("(dry run)\n");

  ensureDir(forgekitDir, args.dryRun);
  ensureDir(join(forgekitDir, "cursor", "rules"), args.dryRun);

  for (const [src, dest] of LITE_FILES) {
    copyPath(join(CONTENT, src), join(forgekitDir, dest), opts);
  }

  for (const rule of LITE_CURSOR_RULES) {
    copyPath(
      join(CONTENT, "cursor-rules", rule),
      join(forgekitDir, "cursor", "rules", rule),
      opts
    );
  }

  if (!args.skipTracking) {
    copyPath(
      join(CONTENT, "LITE_WORKFLOW_TRACKING.json"),
      join(forgekitDir, "workflow_tracking.json"),
      opts
    );
  }

  console.log("\nDone.");
  console.log("  Protocol:  .forgekit/FORGEKIT_LITE.md");
  console.log("  Tracking:  .forgekit/workflow_tracking.json (lite-1 schema)");
  console.log("\nTip: use `pnpm run install:forgekit` for full _forgekit/ templates + WORKFLOW.md.");
}

main();
