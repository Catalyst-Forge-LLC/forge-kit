#!/usr/bin/env node

/**
 * Curated template-in-repo install → <target>/_forgekit/
 *
 * Copies methodology, templates, prompts, and offline operational content.
 * Does NOT copy: specs/, mcp-server TypeScript source, MCP-only bootstrap docs,
 * marketing HTML, or the full upstream repo.
 *
 * Also seeds <target>/.forgekit/workflow_tracking.json (MCP shape) unless
 * --skip-tracking or file already exists.
 */

import { join } from "node:path";
import {
  FORGEKIT_ROOT,
  copyContentDir,
  copyPath,
  ensureDir,
  parseInstallArgs,
  requireTarget,
} from "./install-lib.mjs";

const HELP = `
ForgeKit template-in-repo install (offline / no MCP server required)

Usage:
  pnpm run install:forgekit -- --path <project-root>
  FORGEKIT_TARGET=<project-root> pnpm run install:forgekit

Options:
  --path, -p <dir>   Target project root (required)
  --force, -f        Overwrite existing files
  --skip-tracking    Do not create .forgekit/workflow_tracking.json
  --dry-run          Print actions only

Installs:
  <target>/_forgekit/     WORKFLOW, TRACKING_SCHEMA, docs/, prompts/, session prompts,
                          mcp-server/content/ (curated — no MCP-only bootstrap files)
  <target>/.forgekit/     workflow_tracking.json starter (unless skipped / exists)

Next: paste INITIAL_PROMPT.md into your agent, or read _forgekit/WORKFLOW.md.
`;

const ROOT_FILES = [
  "WORKFLOW.md",
  "TRACKING_SCHEMA.md",
  "workflow_tracking.json",
  "INITIAL_PROMPT.md",
  "CONTINUATION_PROMPT.md",
  "LICENSE",
];

function main() {
  const args = parseInstallArgs(process.argv.slice(2));
  if (args.help) {
    console.log(HELP.trim());
    process.exit(0);
  }

  const target = requireTarget(args.target);
  const opts = { force: args.force, dryRun: args.dryRun };
  const forgekitDir = join(target, "_forgekit");
  const contentSrc = join(FORGEKIT_ROOT, "mcp-server", "content");
  const contentDest = join(forgekitDir, "mcp-server", "content");

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
    const trackingDest = join(target, ".forgekit", "workflow_tracking.json");
    copyPath(
      join(FORGEKIT_ROOT, "workflow_tracking.json"),
      trackingDest,
      { ...opts, force: args.force }
    );
  }

  console.log("\nDone.");
  console.log("  Methodology:  _forgekit/WORKFLOW.md");
  console.log("  First chat:   _forgekit/INITIAL_PROMPT.md");
  console.log("  Tracking:     .forgekit/workflow_tracking.json");
  console.log("\nTip: use `pnpm run install:lite` for a `.forgekit/` Lite-only bootstrap (no _forgekit/ tree).");
}

main();
