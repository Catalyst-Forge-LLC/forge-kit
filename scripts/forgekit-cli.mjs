#!/usr/bin/env node

import { cwd } from "node:process";
import {
  INSTALL_FULL_HELP,
  INSTALL_LITE_HELP,
  runInstallForgekit,
  runInstallLite,
} from "./install.mjs";

const CLI_HELP = `
ForgeKit — bootstrap a project folder (no MCP required)

Usage:
  forgekit install [--lite] [options]

Global link (one-time, from your forge-kit clone):
  pnpm link --global

Then from any project folder:
  cd /path/to/your-app
  forgekit install --lite
  forgekit install

Options:
  --lite             Lite protocol only (.forgekit/FORGEKIT_LITE.md)
  --force, -f        Overwrite existing files
  --dry-run          Preview without writing
  --skip-tracking    Skip workflow_tracking.json starter
  --path, -p <dir>   Install elsewhere (default: current directory)
  --help, -h         Show help
`.trim();

function main() {
  const argv = process.argv.slice(2);

  if (argv.length === 0 || (argv.includes("--help") || argv.includes("-h")) && !argv.includes("install")) {
    console.log(CLI_HELP);
    process.exit(0);
  }

  if (argv[0] !== "install") {
    console.error(`Unknown command: ${argv[0] ?? "(none)"}`);
    console.error("Run forgekit --help");
    process.exit(1);
  }

  const rest = argv.slice(1);
  const lite = rest.includes("--lite");
  const passArgv = rest.filter((a) => a !== "--lite");

  if (passArgv.includes("--help") || passArgv.includes("-h")) {
    console.log(lite ? INSTALL_LITE_HELP : INSTALL_FULL_HELP);
    process.exit(0);
  }

  console.log(`Target: ${cwd()}\n`);

  if (lite) {
    runInstallLite(passArgv, { defaultToCwd: true });
  } else {
    runInstallForgekit(passArgv, { defaultToCwd: true });
  }
}

main();
