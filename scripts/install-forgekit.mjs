#!/usr/bin/env node

import { runInstallForgekit, INSTALL_FULL_HELP } from "./install.mjs";

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(INSTALL_FULL_HELP);
  process.exit(0);
}

runInstallForgekit(argv, { defaultToCwd: false });
