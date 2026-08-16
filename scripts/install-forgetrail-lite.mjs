#!/usr/bin/env node

import { runInstallLite, INSTALL_LITE_HELP } from "./install.mjs";

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(INSTALL_LITE_HELP);
  process.exit(0);
}

runInstallLite(argv, { defaultToCwd: false });
