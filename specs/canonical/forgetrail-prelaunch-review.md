# ForgeTrail pre-use review — findings & next steps

**Spec kind:** Canonical reference (implemented review record)

**Status:** Implemented (2026-06-01) — all findings addressed (H1/H2, M1–M4, L1–L4).
**Scope:** Whole-kit pass before adopting ForgeTrail on a new project, with extra focus on **`content/FORGETRAIL_LITE.md`** (the standalone, no-MCP path the maintainer uses most).
**Reviewer:** agent pass over `FORGETRAIL_LITE.md`, `README.md`, `WORKFLOW.md`, `mcp-server/README.md`, and the reference scripts in `content/scripts/`.

---

## 1. Verdict

ForgeTrail is in good shape and **ready for a new project**. The Lite file is unusually complete for a single-file protocol: preflight, phase gates, default stacks, content-generation patterns, one-click launchers, and a strong anti-pattern list. Prelaunch review fixes (2026-06-01) addressed the status-launcher schema bug, `.forgetrail/` git policy clarity, §4 navigation, MCP Lite retrieval, and cross-doc maintenance notes.

---

## 2. Findings — High (fix before next project)

### H1. The dev launcher's `status` command is broken for Lite projects (schema mismatch)

**Status:** Fixed (2026-06-01) — `forgetrail-dev-launcher.mjs` reads Lite `exitCriteria` booleans and MCP array shapes.

**Where:** `content/scripts/forgetrail-dev-launcher.mjs` (`renderProgress()`) vs `FORGETRAIL_LITE.md` §11 starter tracking.

**Problem:** Lite §11 writes `phases["1"].exitCriteria` as an **object of booleans** (`{ phase1BriefLocked: false, ... }`) with `schemaVersion: "lite-1"`. The launcher's `renderProgress()` instead reads:
- `PHASE_LABELS` keyed `"1-architecture"`, `"2-scaffolding"`, … (the **MCP/full** schema keys), and
- `phaseBlock.exitCriteriaRemaining` / `exitCriteriaMet` as **arrays**.

For a Lite-bootstrapped repo, `exitCriteriaRemaining`/`exitCriteriaMet` are always `undefined` → empty arrays, so `status.bat` / `pnpm run forgetrail:status` **always prints "Exit criteria for this phase look complete (confirm before advancing)"** even in a fresh Phase 1 with nothing done. The phase label only survives by accident via the `phaseBlock?.name` fallback.

**Why it matters:** §4.5–§4.6 explicitly target **non-technical operators** who rely on `status.bat` for ground truth. Silently telling them a phase "looks complete" is the worst failure mode for that audience.

**Suggested fix (pick one):**
- Make `renderProgress()` handle **both** shapes: if `exitCriteria` is an object, derive `met` = keys where value is truthy and `remaining` = keys where falsy; keep the array path for the MCP schema. Also fall back to `phaseBlock.name` for the label (already partially there) and stop assuming `1-architecture` keys.
- Or ship a **Lite-specific** launcher variant and have §4.5 point Lite users at it.

The object-shape handling is ~6 lines and makes one script correct for both schemas — preferred.

### H2. `.forgetrail/` "must be gitignored" contradicts "you may commit it" — and breaks the bootstrap commit

**Status:** Fixed (2026-06-01) — §1.5 commit-vs-gitignore table; §4.2 steps 2 and 5 aligned.

**Where:** Lite §1.5 ("**`.gitignore` must include:** `.forgetrail/`"), §4.2 step 2 (minimal `.gitignore` includes `.forgetrail/`), §4.2 step 5 (first commit `git add -A && git commit -m "chore: ForgeTrail Lite bootstrap"`), and §14 + the "who creates what" table (which say committing `.forgetrail/` under Apache 2.0 is fine).

**Problem:** Two issues compound:
1. **Contradiction:** §1.5 states a flat "**must** include `.forgetrail/`", while the same section, §14, and the table all say committing `.forgetrail/` is an equally valid choice. A first-time reader can't tell which is the rule.
2. **Ordering bug:** If the agent follows §4.2 step 2 literally (gitignore `.forgetrail/` first) and then makes the step-5 "bootstrap" commit, the commit captures **nothing from `.forgetrail/`** — the tracking file, `AGENTS.md`, and rule files are all untracked. The commit message implies a bootstrap was saved when effectively only `.gitignore` was.

**Suggested fix:** Reframe as an explicit either/or up front: "**Decide once:** commit `.forgetrail/` (default for a self-contained history) **or** gitignore it (cleaner public repo / MCP-served methodology). If gitignoring, the step-5 bootstrap commit will only contain `.gitignore` + any files you copied to `.cursor/rules/` — that's expected." Remove the absolute "must" or scope it to the gitignore-it branch only. Make step 2 and step 5 consistent with whichever branch is chosen.

---

## 3. Findings — Medium (worth doing)

### M1. `§4` sub-section ordering is scrambled

**Status:** Fixed (2026-06-01) — §4 map added; 4.1.1 before 4.1.2; 4.3/4.4 before 4.5.

**Where:** Lite §4. Order on the page is: 4.1 → **4.1.2** → **4.1.1** → 4.2 → 4.2.1 → 4.2.2 → **4.5 → 4.6 → 4.7 → 4.8** → **4.3 → 4.4**.

**Problem:** 4.1.1 appears after 4.1.2, and 4.3/4.4 (seed data, web search) appear *after* 4.5–4.8 (launchers, health checks, Ollama). For a document that agents read top-to-bottom once, the out-of-order numbering makes it easy to miss a step or assume a section is absent.

**Suggested fix:** Renumber into reading order, or at minimum move 4.1.1 above 4.1.2 and relocate 4.3/4.4 ahead of 4.5. A short "§4 map" list at the top of §4 would also help.

### M2. Inconsistent cross-reference notation for §8 rules vs real subsections

**Status:** Fixed (2026-06-01) — numbered rules cited as §8 rule N; §8.9 reserved for the subsection.

**Where:** Throughout Lite, e.g. §0 ("Full rule: §8.6"), §5 ("overrides the §8.5 convention"), vs the genuine subsection header **§8.9**.

**Problem:** `§8.5` and `§8.6` are meant as "rule 5 / rule 6 inside §8," but `§8.9` *is* a real `###` subsection. Same dotted notation, two different meanings — a reader chasing "§8.5" finds no such header and may think a section is missing.

**Suggested fix:** Standardize: write "§8 rule 5" / "§8 rule 6" for the numbered rules, and reserve `§8.x` for actual subsection headers (only §8.9 today). Apply the same anywhere §4 rules are cited.

### M3. Lite is not retrievable through the MCP server

**Status:** Fixed (2026-06-01) — `getForgeTrailLite` and `getForgeTrailLiteUpdates` MCP tools.

**Where:** `mcp-server/src/index.ts` exposes no `FORGETRAIL_LITE` tool (grep: no matches); `mcp-server/README.md` tool table has no Lite entry.

**Problem:** This is *mostly* by design (Lite is the no-MCP on-ramp), but an MCP-connected agent that wants the portable single-file protocol must be told to read it from disk; there's no `getForgeTrailLite` parity with `getTemplate`. The Lite footer also pitches "graduate to MCP" but there's no symmetric "get Lite from MCP."

**Suggested fix (optional):** Add a small `getForgeTrailLite` tool (and/or `getForgeTrailLiteUpdates` template) so the MCP path can emit the Lite file when a user wants the standalone artifact. Low priority; document the intent either way.

### M4. Version is hand-maintained in 4 places with no single source

**Status:** Fixed (2026-06-01) — release checklist in `update-log.md`; canonical version = Lite header line.

**Where:** `v1.3.0` appears in Lite line 3, line 937 (AGENTS.md snippet), and line 1128 (footer); `schemaVersion: "lite-1"` at line 889; plus `update-log.md`.

**Problem:** Bumping the Lite version means editing 3 in-file locations by hand; easy to let them drift (the AGENTS.md snippet version is especially easy to forget since it's copied into downstream repos).

**Suggested fix:** Note the canonical version location (line 3) and add a release checklist line to `update-log.md` / a `prompts/propagate-*` step: "bump all three `v#.#.#` strings + `schemaVersion` if the tracking shape changed." If the build ever templates Lite, inject the version from `package.json`.

---

## 4. Findings — Low / polish

- **L1. `decisions[]` shape inconsistency.** **Fixed** — canonical Lite shape: `{ date, phase, decision, why, alternatives }` in §7, §11, §15; brief §9 points at tracking.
- **L2. Restated content between Lite and README/WORKFLOW.** **Fixed** — maintainer note in Lite header; triplicate checklist in `update-log.md` + `propagate-to-forgetrail.md`.
- **L3. Phase-name vocabulary differs by file.** **Fixed** — phase ID map in `TRACKING_SCHEMA.md`; Lite §11 cross-ref; launcher maps both schemas.
- **L4. WORKFLOW.md still opens "built with Claude."** **Fixed** — intro now "AI coding agents"; `TRACKING_SCHEMA.md` intro agent-agnostic.

---

## 5. Strengths worth preserving (don't regress these)

- **§0 "Critical — do not" block** up top is excellent; keep it first.
- **Stack-by-type picker (§7)** with the A-local vs A-persistent sub-question is a genuinely good default-reduction.
- **Anti-patterns (§13)**, especially the *curl-first opaque-backend* and *Windows Unix-tool PATH-shadowing* entries — these are hard-won and specific.
- **"Who creates what" table (§2)** prevents the common "agent asks the human to hand-write tracking" failure.
- **Trailer / Git-version handling (§8.9)** is now correctly framed as policy, not Git breakage.

---

## 6. Suggested next steps (ordered)

All items below are **done** as of 2026-06-01. Use this list as a validation checklist for the next greenfield boot:

1. ~~**Fix H1**~~ — status launcher reads Lite `exitCriteria` booleans and MCP arrays.
2. ~~**Fix H2**~~ — `.forgetrail/` commit-vs-gitignore policy explicit in §1.5 / §4.2.
3. ~~**M1 + M2**~~ — §4 reading order + §8 rule notation.
4. ~~**M4 + L1**~~ — release checklist; unified `decisions[]` shape.
5. ~~**M3 + L2/L3/L4**~~ — MCP Lite tools; cross-doc sync notes; phase ID map; WORKFLOW wording.

**Validation before next project:** bootstrap a throwaway repo from Lite, run `status.bat` in a fresh Phase 1 and confirm it reports open exit criteria (not "looks complete"); confirm the bootstrap commit contains what the chosen `.forgetrail/` policy says it should.
