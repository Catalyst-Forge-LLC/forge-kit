#!/usr/bin/env node

/**
 * Register the forgekit CLI on PATH for pnpm global installs.
 *
 * pnpm 10: prefer `pnpm add -g .` over deprecated `pnpm link --global`.
 * Linked packages get shims under global/.../node_modules/.bin with paths
 * relative to that folder — copying them to $PNPM_HOME breaks resolution.
 * This script writes shims with absolute paths to this repo's CLI entry.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { FORGEKIT_ROOT } from "./install-lib.mjs";

const CLI_ENTRY = join(FORGEKIT_ROOT, "scripts", "forgekit-cli.mjs");
const BIN_NAME = "forgekit";

function run(cmd, args, { cwd = FORGEKIT_ROOT } = {}) {
  const r = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: true, env: process.env });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

function pnpmPath(args) {
  const r = spawnSync("pnpm", args, {
    cwd: FORGEKIT_ROOT,
    encoding: "utf-8",
    shell: true,
    env: process.env,
  });
  if (r.status !== 0) {
    console.error(`pnpm ${args.join(" ")} failed`);
    process.exit(r.status ?? 1);
  }
  return (r.stdout ?? "").trim();
}

function toPosix(p) {
  return p.replace(/\\/g, "/");
}

function writeGlobalBinShims() {
  const globalBinDir = pnpmPath(["bin", "-g"]);
  const cliPosix = toPosix(CLI_ENTRY);
  const cliWin = CLI_ENTRY.replace(/\//g, "\\");

  const shShim = `#!/bin/sh
exec node "${cliPosix}" "$@"
`;
  const cmdShim = `@ECHO off
node "${cliWin}" %*
`;
  const ps1Shim = `#!/usr/bin/env pwsh
& node "${cliWin}" @args
exit $LASTEXITCODE
`;

  const targets = [
    [join(globalBinDir, BIN_NAME), shShim],
    [join(globalBinDir, `${BIN_NAME}.CMD`), cmdShim],
    [join(globalBinDir, `${BIN_NAME}.ps1`), ps1Shim],
  ];

  for (const [path, content] of targets) {
    writeFileSync(path, content, { mode: 0o755 });
    console.log(`  wrote ${path}`);
  }

  return globalBinDir;
}

function verify(globalBinDir) {
  const r = spawnSync(process.execPath, [CLI_ENTRY, "--help"], {
    stdio: "pipe",
    encoding: "utf-8",
    env: process.env,
  });

  if (r.status !== 0) {
    console.error(`\nShim did not run. Try in a new terminal:\n  ${BIN_NAME} --help`);
    console.error(`Or:\n  node ${CLI_ENTRY} --help`);
    process.exit(1);
  }

  console.log(`\n✓ ${BIN_NAME} is available (${globalBinDir})`);
}

console.log("Registering forgekit globally (pnpm add -g .)…\n");
run("pnpm", ["add", "-g", "."]);

console.log("\nWriting PATH shims (absolute paths)…");
const globalBinDir = writeGlobalBinShims();

console.log("\nVerifying…");
verify(globalBinDir);

console.log("\nFrom any project folder:");
console.log("  forgekit install --lite");
console.log("  forgekit install");
