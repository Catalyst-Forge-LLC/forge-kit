# GENESIS.md (stub)

Replace this file with your **what, not how** build spec.

## How to fill it

1. Open the ForgeKit Genesis prompt: in a clone of forge-kit see `content/GENESIS_SPEC_PROMPT.md`, or use the MCP tool `getGenesisSpecPrompt`.
2. Paste the copy-paste section into any LLM chat (ChatGPT, Claude, Grok, Ollama UI, …).
3. Iterate until you trust the markdown, then **overwrite this file** with the result.
4. Optional shape reference (fiction): `content/examples/GENESIS_SAMPLE_mars-habitat-roster.md` in the forge-kit repo.

## Then kick off your coding agent

See **TRY_FORGEKIT.md** in the forge-kit repo for the full recipe. Short version:

> Follow `.forgekit/FORGEKIT_LITE.md` as the project protocol. Treat `docs/GENESIS.md` as the product spec (what, not how). Create `.forgekit/workflow_tracking.json` and draft `docs/PHASE_1_BRIEF.md` from the Genesis file, asking me only about gaps. Do not scaffold application code until I explicitly approve the Phase 1 brief.

Keep this file at **`docs/GENESIS.md`** (this path). Do not move it to the repo root.
