# npm distribution — should ForgeTrail be a package?

**Spec kind:** Delivery  
**Status:** Implemented  
**Date:** 2026-08-20  
**Related:** [TODO.md](../../TODO.md), [docs/NPM.md](../../docs/NPM.md), [TRY_FORGETRAIL.md](../../TRY_FORGETRAIL.md), [specs/completed/forgetrail-new-user-experience.md](../completed/forgetrail-new-user-experience.md), [specs/canonical/forgetrail-as-product.md](../canonical/forgetrail-as-product.md)  
**Surfaces:** root `package.json`, `mcp-server/package.json`, `scripts/forgetrail-cli.mjs`, `scripts/publish-gate.mjs`, README / Try / site install copy

---

## 1. Problem

**What is painful today:**

ForgeTrail is a **methodology plus tools**, not a library you import. New users reach it by cloning GitHub, copying raw files, or globally linking a local clone. That works for the house and for a 15-minute Try, but it is a weak default for anyone who already has Node and expects `npx <name>`.

README and Try now document `npx forgetrail install --lite` as an optional shortcut. The packages are prepared (`forgetrail` 0.3.0, `forgetrail-mcp` 0.2.2`). Nothing is on the registry until you publish. Until then, those `npx` paths 404.

**Friction / current workaround:**

- Try: copy `FORGETRAIL_LITE.md` from GitHub into `.forgetrail/`.
- CLI: `pnpm run link:global` from a clone, or `node …/forgetrail-cli.mjs`.
- MCP: clone, `pnpm run mcp:build`, point Cursor at `mcp-server/dist/index.js`.

Those remain valid. The open question is whether npm should be a first-class channel, the only channel, or skipped.

---

## 2. Goals

1. Decide **what** ForgeTrail is on npm (installer + MCP bins vs a runtime library).
2. Weigh npm against clone-only, raw GitHub, and other registries.
3. Recommend a phased plan that does not break the no-Node Try path.
4. Lock versioning and “do not publish” rules so a first release is boring and reversible.

### Non-goals

- Making consumer apps add `forgetrail` as a runtime dependency or `import` it.
- Publishing `site/`, `specs/`, or `.cursor/`.
- Replacing GitHub as the source of truth.
- A paid registry, scoped org-only package, or Homebrew/Scoop tap in this pass.
- Changing the Lite / MCP / full-install graduation ladder.

---

## 3. Background / current state

| Piece | State |
| ----- | ----- |
| Root package `forgetrail` | `private: false`, bin `forgetrail`, `files` lists CLI + `content/` + methodology docs. Gate: `pnpm run pack:check`. |
| Nested package `forgetrail-mcp` | Bin `forgetrail-mcp`, publishes `dist/` only. Resolves methodology via `FORGETRAIL_ROOT`, parent of `mcp-server/`, or an installed `forgetrail` package. |
| Try path | No Node required. Copy Lite + Genesis. |
| Docs | [docs/NPM.md](../../docs/NPM.md) is maintainer publish steps. User has not published. |
| OSS model | [forgetrail-as-product.md](../canonical/forgetrail-as-product.md): Apache-2.0 from GitHub is the shipping model. npm would be a **mirror of installable bits**, not a product pivot. |

Sibling house tools (FilePress, LocalBerth, FineTuna) already ship on npm. That is the discovery pattern agents and humans already use.

---

## 4. Core concepts / definitions

| Term | Meaning |
| ---- | ------- |
| **Methodology** | Files the agent reads in the *app* repo: `.forgetrail/FORGETRAIL_LITE.md`, `docs/GENESIS.md`, tracking JSON, optional `_forgetrail/` tree. |
| **Installer** | CLI that *writes* those files into an app. Not imported by app code. |
| **MCP server** | Long-running stdio process. Needs the methodology tree at runtime (`WORKFLOW.md` + `content/`). |
| **Runtime library** | Something an app `import`s. ForgeTrail is **not** this. |
| **Channel** | How a human or agent *obtains* the installer or MCP. npm is one channel. GitHub clone is another. |

---

## 5. Proposed approach / Design

### 5.1 Recommendation

**Yes: publish two public unscoped packages.** Treat npm as a **delivery channel for the installer and the MCP bin**, not as “ForgeTrail is an npm library.”

Keep Try as the front door (copy files, no Node). Offer npm as the shortcut on the graduation ladder:

```text
Try (copy Lite)  →  npx forgetrail install --lite  →  npx -y forgetrail-mcp  →  full install / clone
```

Do **not** tell app repos to `pnpm add forgetrail` unless they are vendoring the installer on purpose. The trail lives in the app’s files. A dependency entry would lie about what the app is.

### 5.2 Options considered

#### A. Do not publish (clone + raw GitHub only)

| Pros | Cons |
| ---- | ---- |
| No registry account, version theater, or stale tarballs | `npx forgetrail` in README stays broken |
| Clone is always current | MCP setup stays “clone then build” |
| Names can be taken by someone else | Agents already reach for npm; we look unfinished |

**Verdict:** Fine as a *temporary* state. Weak as a lasting default once the site and Try checklist go public.

#### B. One package (`forgetrail`) with both bins

| Pros | Cons |
| ---- | ---- |
| One `npx`, one version | MCP deps (`@modelcontextprotocol/sdk`, `zod`) land on every CLI-only install |
| Simpler docs | Harder to run MCP without pulling the whole methodology tree into the same tarball |

**Verdict:** Worse than the current split. Keep two packages.

#### C. Two packages (current design) — **preferred**

| Package | Job |
| ------- | --- |
| `forgetrail` | CLI + Lite + templates + `WORKFLOW.md` / `content/` |
| `forgetrail-mcp` | Compiled MCP server. Finds content via env, clone layout, or a sibling `forgetrail` install |

| Pros | Cons |
| ---- | ---- |
| Matches how people already install MCP (`npx -y <server>`) | Two versions to bump |
| CLI users do not download MCP runtime deps | `forgetrail-mcp` alone needs `FORGETRAIL_ROOT` or `forgetrail` beside it |
| Names reserved; pack gate already exists | Published methodology can lag `main` until the next bump |

**Verdict:** Ship this.

#### D. npm *and* require it for Try

| Pros | Cons |
| ---- | ---- |
| One blessed command | Breaks the 15-minute no-Node prove-it path |
|  | Conflicts with [forgetrail-new-user-experience.md](../completed/forgetrail-new-user-experience.md) |

**Verdict:** Reject. npm is optional.

#### E. Other channels (later, not instead)

GitHub Releases / raw URLs already work for Lite. Cursor marketplace, `grok mcp add`, Homebrew: useful *after* npm exists, because those tools usually wrap an npm bin. Do not block first publish on them.

### 5.3 Behavior (once published)

When a builder has Node 20+:

1. `npx forgetrail install --lite` (or `--lite --with-genesis-stub`) writes Lite into the current app folder.
2. `npx forgetrail install` writes the full vendored tree when they ask for it.
3. Cursor / Claude MCP config uses `npx -y forgetrail-mcp`. If `forgetrail` is not resolvable, they set `FORGETRAIL_ROOT` to a clone or to the `forgetrail` install path.
4. Try docs still lead with copy-from-GitHub. npm is listed as “if you already have Node.”

When a builder does **not** have Node: unchanged Try path.

### 5.4 Versioning policy

- **GitHub `main`** is current methodology.
- npm versions are **snapshots**. Bump `forgetrail` when Lite, CLI, or shipped templates change in a way installers would copy.
- Bump `forgetrail-mcp` when the server API or its published `dist/` changes. Independent versions are OK (already 0.3.0 vs 0.2.2).
- Do not auto-publish every commit. Human runs `pnpm publish` per [docs/NPM.md](../../docs/NPM.md).
- First public numbers stay **0.x** until the Try + npm paths have been walked by someone who is not the author.

### 5.5 Files (this delivery)

| New | Modified (when M1–M2 land) |
| --- | -------------------------- |
| This spec | [docs/NPM.md](../../docs/NPM.md) (keep as maintainer runbook) |
| | README / TRY / `site/pages/try.md` (npm as optional shortcut, not the lead) |
| | [TODO.md](../../TODO.md) |

No new runtime code is required for M1. The packages are already publishable.

---

## 6. Edge cases and risks

- Someone runs `npx forgetrail install` **inside this methodology repo**. CLI and Try already warn: use a new empty app folder.
- `npx -y forgetrail-mcp` without `forgetrail` or `FORGETRAIL_ROOT` starts but cannot find `WORKFLOW.md`. Docs must show the env or the sibling install.
- A published tarball older than `main` is what agents get via `npx`. Mitigation: pin in power-user docs when needed (`npx forgetrail@0.3.0`); keep Try on GitHub raw for “latest file.”
- Name squat if we delay. Mitigation: M1 is the name reservation.
- App authors add `forgetrail` to `dependencies` and expect imports. Mitigation: README one-liner: installer, not a library.

| Risk | Mitigation |
| ---- | ---------- |
| Stale methodology on npm | Human publish; 0.x; Try stays on GitHub files |
| MCP without content root | Document `FORGETRAIL_ROOT`; resolve installed `forgetrail` |
| Accidental publish of site/specs | Existing `publish-gate.mjs` / `files` allowlist |
| Two-package version drift | Independent bumps; note both versions on each release |

---

## 7. Milestones / phasing

| Milestone | Outcome |
| --------- | ------- |
| **M1 — Publish** | Maintainer: `pnpm run pack:check`, dry-run, then publish `forgetrail` and `forgetrail-mcp` per [docs/NPM.md](../../docs/NPM.md). Verify `npx forgetrail --help` and `npx forgetrail install --lite --dry-run`. |
| **M2 — Copy** | README, TRY, site Try page: npm is the optional CLI/MCP shortcut. Lead remains copy-paste Lite. One MCP snippet that uses `npx -y forgetrail-mcp`. |
| **M3 — Walkthrough** | Install Lite into a throwaway folder via `npx` (not a clone). Register MCP with `npx` once. File any CLI/root-resolution bugs. |
| **M4 — Optional later** | Cursor/Grok one-liners, skill wrapper, tighter default so MCP finds content without env when both packages are present. Not required to call npm “done.” |

---

## 8. Acceptance criteria

1. Given the decision in this spec, when someone asks “is ForgeTrail an npm package?”, then the answer is: **two installer/MCP packages, not a library; Try does not require npm.**
2. Given M1 is done, when a machine with Node 20+ and no local clone runs `npx forgetrail --help`, then the CLI help prints (not 404 / not-found).
3. Given M1, when they run `npx forgetrail install --lite --dry-run` in an empty folder, then the dry-run lists Lite files and writes nothing.
4. Given M2, when a new user opens Try (README or site), then the first recipe still works with copy-from-GitHub only; npm appears as an optional shortcut.
5. Given a published `forgetrail-mcp`, when Cursor is configured with `npx -y forgetrail-mcp` and a valid content root, then `ping` succeeds.
6. Given `pnpm run pack:check`, when the allowlist is intact, then `site/` and `specs/` are not in the root tarball.

M1 is maintainer-action. This spec is **accepted** when the decision and plan are locked. It is **implemented** when M1–M2 pass (M3 is verification; M4 is follow-on).

---

## 9. Open questions

| # | Question | Blocking? | Owner |
| - | -------- | --------- | ----- |
| 1 | npm account that can publish unscoped `forgetrail` / `forgetrail-mcp` (Catalyst Forge vs personal)? | No (published 2026-08-20) | Maintainer |
| 2 | First publish now, or after forgetrail.dev is live? | No (live 2026-08-20) | Maintainer |
| 3 | Should MCP’s default `npx` config install `forgetrail` automatically so `FORGETRAIL_ROOT` is optional? | No (M4) | — |

---

## 10. Decisions

**D1.** Publish. npm is a channel for the **CLI and MCP**, not the product identity and not a runtime library.

**D2.** Keep **two** packages: `forgetrail` and `forgetrail-mcp`.

**D3.** Try / Genesis+Lite remains the **no-Node** front door. npm must not become required for first contact.

**D4.** GitHub `main` stays canonical. npm versions are snapshots published by a human.

**D5.** Do not instruct app repos to add `forgetrail` as an application dependency.

---

## Progress (while Partial)

- `2026-08-20:` M2 copy landed. M1 published: `forgetrail@0.3.0`, `forgetrail-mcp@0.2.2`. MCP publish must run from `mcp-server/` (npm 12 + `pnpm --dir` EUSAGE). M3: `pnpm dlx forgetrail@0.3.0 --help` and `install --lite --dry-run` succeeded. Windows `npx forgetrail --help` (npm 12) failed to spawn the bin; use `pnpm dlx`.

---

## Implementation summary

_Required when moving this delivery spec to `specs/completed/`._

**Implemented:** 2026-08-20

1. Two public packages: `forgetrail` (CLI + Lite + templates) and `forgetrail-mcp` (MCP bin).
2. Try/README/site treat npm as an optional shortcut, not the front door.
3. Maintainer runbook: [docs/NPM.md](../../docs/NPM.md) (publish from `mcp-server/` cwd).

**Verification:** `npm view forgetrail@0.3.0` and `npm view forgetrail-mcp@0.2.2`. `pnpm dlx forgetrail@0.3.0 --help`. `pnpm dlx forgetrail@0.3.0 install --lite --dry-run` listed Lite files and wrote nothing.
