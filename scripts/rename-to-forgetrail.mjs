#!/usr/bin/env node
/**
 * Mechanical ForgeKit → ForgeTrail rename for a repo root.
 * Skips this file. Protects GitHub slug Catalyst-Forge-LLC/forge-kit
 * and local clone paths under workspace/forge-kit.
 *
 * Usage: node scripts/rename-to-forgetrail.mjs --root /path/to/repo
 */

import { existsSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const SELF = fileURLToPath(import.meta.url);
const SKIP_DIRS = new Set([
  ".git",
  "node_modules",
  "dist",
  ".svelte-kit",
  "build",
  "coverage",
  "pb_data",
  "__ARCHIVE",
]);

const TEXT_EXT = new Set([
  ".md",
  ".mdc",
  ".txt",
  ".json",
  ".jsonc",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".html",
  ".css",
  ".yml",
  ".yaml",
  ".toml",
  ".sh",
  ".bat",
  ".ps1",
  ".svg",
  ".xml",
  ".gitignore",
  ".npmignore",
]);

const FILE_RENAMES = [
  ["TRY_FORGEKIT.md", "TRY_FORGETRAIL.md"],
  ["FORGEKIT_LITE_UPDATES.md", "FORGETRAIL_LITE_UPDATES.md"],
  ["FORGEKIT_LITE.md", "FORGETRAIL_LITE.md"],
  ["FORGEKIT_PROGRESS.md", "FORGETRAIL_PROGRESS.md"],
  ["forgekit-workspace-README.md", "forgetrail-workspace-README.md"],
  ["propagate-to-forgekit.md", "propagate-to-forgetrail.md"],
  ["Propagate to ForgeKit.md", "Propagate to ForgeTrail.md"],
  ["try-forgekit-checklist.md", "try-forgetrail-checklist.md"],
  ["forgekit-cli.mjs", "forgetrail-cli.mjs"],
  ["install-forgekit-lite.mjs", "install-forgetrail-lite.mjs"],
  ["install-forgekit.mjs", "install-forgetrail.mjs"],
  ["forgekit-dev-launcher.mjs", "forgetrail-dev-launcher.mjs"],
  ["forgekit-env.mjs", "forgetrail-env.mjs"],
  ["forgekit.html", "forgetrail.html"],
  ["forgekit-as-product.md", "forgetrail-as-product.md"],
  ["forgekit-modern-agents-evolution.md", "forgetrail-modern-agents-evolution.md"],
  ["forgekit-prelaunch-review.md", "forgetrail-prelaunch-review.md"],
  ["forgekit-new-user-experience.md", "forgetrail-new-user-experience.md"],
  ["forgekit-no-trailer.mdc", "forgetrail-no-trailer.mdc"],
  ["forgekit-updates-log.mdc", "forgetrail-updates-log.mdc"],
  ["forgekit-phase-status.mdc", "forgetrail-phase-status.mdc"],
  ["forgekit-lessons-gate.mdc", "forgetrail-lessons-gate.mdc"],
  ["forgekit-lessons-mcp.mdc", "forgetrail-lessons-mcp.mdc"],
  ["forgekit-propagation.mdc", "forgetrail-propagation.mdc"],
];

const DIR_RENAMES = [
  [".forgekit", ".forgetrail"],
  ["_forgekit", "_forgetrail"],
];

const OLD = "ForgeKit";
const NEW = "ForgeTrail";
const oldLower = OLD.toLowerCase();
const newLower = NEW.toLowerCase();
const OLD_UP = OLD.toUpperCase();
const NEW_UP = NEW.toUpperCase();

const REPLACEMENTS = [
  [`get${OLD}CursorLessonsRules`, `get${NEW}CursorLessonsRules`],
  [`get${OLD}CursorPhaseRule`, `get${NEW}CursorPhaseRule`],
  [`get${OLD}LiteUpdates`, `get${NEW}LiteUpdates`],
  [`get${OLD}Lite`, `get${NEW}Lite`],
  [`get${OLD}Skill`, `get${NEW}Skill`],
  [`strip${OLD}TemplateToShell`, `strip${NEW}TemplateToShell`],
  [`runInstall${OLD}`, `runInstall${NEW}`],
  [`${OLD_UP}_TEMPLATE_DEFAULT_MODE`, `${NEW_UP}_TEMPLATE_DEFAULT_MODE`],
  [`${OLD_UP}_LITE_UPDATES`, `${NEW_UP}_LITE_UPDATES`],
  [`${OLD_UP}_PROGRESS`, `${NEW_UP}_PROGRESS`],
  [`${OLD_UP}_LITE`, `${NEW_UP}_LITE`],
  [`${OLD_UP}_ROOT`, `${NEW_UP}_ROOT`],
  [`${OLD_UP}_TARGET`, `${NEW_UP}_TARGET`],
  [`TRY_${OLD_UP}`, `TRY_${NEW_UP}`],
  [`try-${oldLower}`, `try-${newLower}`],
  [`propagate-to-${oldLower}`, `propagate-to-${newLower}`],
  [`Propagate to ${OLD}`, `Propagate to ${NEW}`],
  [`${oldLower}-workspace-README`, `${newLower}-workspace-README`],
  [`${oldLower}-dev-launcher`, `${newLower}-dev-launcher`],
  [`${oldLower}-phase-status`, `${newLower}-phase-status`],
  [`${oldLower}-lessons-gate`, `${newLower}-lessons-gate`],
  [`${oldLower}-lessons-mcp`, `${newLower}-lessons-mcp`],
  [`${oldLower}-no-trailer`, `${newLower}-no-trailer`],
  [`${oldLower}-updates-log`, `${newLower}-updates-log`],
  [`${oldLower}-propagation`, `${newLower}-propagation`],
  [`install-${oldLower}-lite`, `install-${newLower}-lite`],
  [`install-${oldLower}`, `install-${newLower}`],
  [`install:${oldLower}`, `install:${newLower}`],
  [`${oldLower}:status`, `${newLower}:status`],
  [`${oldLower}-cli`, `${newLower}-cli`],
  [`${oldLower}-env`, `${newLower}-env`],
  [`${oldLower}-mcp`, `${newLower}-mcp`],
  [`user-${oldLower}`, `user-${newLower}`],
  [`skills/${oldLower}`, `skills/${newLower}`],
  [`.${oldLower}`, `.${newLower}`],
  [`_${oldLower}`, `_${newLower}`],
  [OLD, NEW],
  [OLD_UP, NEW_UP],
  [oldLower, newLower],
];

const GH_SLUG = "Catalyst-Forge-LLC/forge-kit";
const GH_TOKEN = "@@GH_SLUG@@";
const PATH_PROTECT = [
  ["Z:/workspace/forge-kit", "@@P1@@"],
  ["Z:\\workspace\\forge-kit", "@@P2@@"],
  ["/z/workspace/forge-kit", "@@P3@@"],
  ["z:/workspace/forge-kit", "@@P4@@"],
];

function parseArgs(argv) {
  let root = dirname(SELF) + "/..";
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--root") root = argv[++i];
  }
  return { root };
}

function isTextFile(name, filePath) {
  const dot = name.lastIndexOf(".");
  if (dot !== -1) return TEXT_EXT.has(name.slice(dot));
  try {
    const buf = readFileSync(filePath);
    return !buf.includes(0) && buf.length < 512_000;
  } catch {
    return false;
  }
}

function walk(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const ent of entries) {
    if (SKIP_DIRS.has(ent.name)) continue;
    const full = join(dir, ent.name);
    if (ent.isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

function protect(text) {
  let out = text.split(GH_SLUG).join(GH_TOKEN);
  for (const [from, token] of PATH_PROTECT) out = out.split(from).join(token);
  return out;
}

function unprotect(text) {
  let out = text.split(GH_TOKEN).join(GH_SLUG);
  for (const [from, token] of PATH_PROTECT) out = out.split(token).join(from);
  return out;
}

function replaceContent(text) {
  let out = protect(text);
  for (const [from, to] of REPLACEMENTS) out = out.split(from).join(to);
  return unprotect(out);
}

function renamePairs(root, pairs, dirs) {
  const found = [];
  const visit = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      if (SKIP_DIRS.has(ent.name)) continue;
      const full = join(dir, ent.name);
      if (ent.isDirectory()) {
        visit(full);
        if (dirs && pairs.some(([oldName]) => ent.name === oldName)) found.push(full);
      } else if (!dirs && pairs.some(([oldName]) => ent.name === oldName)) {
        found.push(full);
      }
    }
  };
  visit(root);
  if (dirs) {
    for (const [oldName] of pairs) {
      const candidate = join(root, oldName);
      if (existsSync(candidate) && !found.includes(candidate)) found.push(candidate);
    }
  }
  found.sort((a, b) => b.length - a.length);
  for (const from of found) {
    const name = from.split(/[/\\]/).pop();
    const pair = pairs.find(([oldName]) => oldName === name);
    if (!pair) continue;
    const to = join(dirname(from), pair[1]);
    if (existsSync(to)) {
      console.warn(`skip exists: ${relative(root, to)}`);
      continue;
    }
    renameSync(from, to);
    console.log(`mv ${relative(root, from)} → ${relative(root, to)}`);
  }
}

function main() {
  const { root } = parseArgs(process.argv.slice(2));
  if (!existsSync(root) || !statSync(root).isDirectory()) {
    console.error(`Not a directory: ${root}`);
    process.exit(1);
  }
  console.log(`Rename root: ${root}`);
  renamePairs(root, DIR_RENAMES, true);
  renamePairs(root, FILE_RENAMES, false);

  const skillOld = join(root, "content", "skills", oldLower);
  const skillNew = join(root, "content", "skills", newLower);
  if (existsSync(skillOld) && !existsSync(skillNew)) {
    renameSync(skillOld, skillNew);
    console.log(`mv content/skills/${oldLower} → content/skills/${newLower}`);
  }

  let changed = 0;
  for (const file of walk(root)) {
    if (file === SELF) continue;
    const name = file.split(/[/\\]/).pop();
    if (!isTextFile(name, file)) continue;
    let raw;
    try {
      raw = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    const next = replaceContent(raw);
    if (next !== raw) {
      writeFileSync(file, next);
      changed += 1;
    }
  }
  console.log(`Updated ${changed} files`);
}

main();
