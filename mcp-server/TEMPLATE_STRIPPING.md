# Single-source templates + shell stripping

ForgeTrail doc templates live only in `docs/*.md`. There are **no** parallel “lessons” files.

## How stripping works

The MCP `getTemplate` tool can return:

| `mode` | Behavior |
|--------|----------|
| `full` | The markdown file exactly as authored. |
| `shell` | Removes **contiguous blockquote runs** whose **first line** matches `> 💡`, `> 📝`, or `> 🔧` (after optional whitespace). |

That matches ForgeTrail callouts: **Lesson learned**, **Example**, **Guidance**. The rest of the file (headings, tables, `[BRACKETS]`, italic instructions, non-enrichment blockquotes) is unchanged.

## Defaults

- If the tool omits `mode`, the server uses **`FORGETRAIL_TEMPLATE_DEFAULT_MODE`** (`full` or `shell`). If unset, **`shell`** (fewer tokens, less lesson text over the wire).
- Agents that need every callout should call `getTemplate({ name: "CONTEXT_PROMPT", mode: "full" })`.

## Authoring rules (for agents editing templates)

1. Start every enrichment blockquote with **`> 💡`**, **`> 📝`**, or **`> 🔧`** on the **first line** of that blockquote run so shell mode can strip it reliably.
2. Do not put non-enrichment content in a blockquote that starts with those markers (or it will be stripped in shell mode).
3. If you need a **non-stripped** blockquote, start the first line with something else (e.g. `> **Note:**` without the emoji) — rare; prefer plain paragraphs for non-IP notes.

## Implementation

- Logic: `mcp-server/src/templateStrip.ts`
- Wired in: `getTemplate` in `mcp-server/src/index.ts`
