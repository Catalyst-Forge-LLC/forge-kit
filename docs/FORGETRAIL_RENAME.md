# ForgeTrail rename and copy guide

**Status:** Name selected. Domain: [forgetrail.dev](https://forgetrail.dev)  
**Former name:** ForgeTrail  
**Canonical spelling:** `ForgeTrail` (one word, camel case). Folder and CLI form: `forgetrail`.  
**Related:** [BRAND_AND_PRODUCT.md](BRAND_AND_PRODUCT.md), [README.md](../README.md)

This document is the source of truth for the rename. Use it when changing identifiers, rewriting copy, or updating a project that still says ForgeTrail.

---

## 1. What the name means

ForgeTrail is not a tracking or logging product. It is a **persistent development system for building software with AI agents**.

**Trail** is the right word because it names several things the system does at once:

- the **path** through the development lifecycle
- the **record** of where the project has been
- **decisions and gotchas** left behind
- **breadcrumbs** for resuming work
- **lessons** that future projects can follow
- the act of **blazing a better trail** through AI-native development

The distinctive feature is not merely workflow. The work leaves behind **structured knowledge** that improves what comes next. A loop describes a mechanism. A trail describes the **artifact of accumulated experience**.

### Double reading (keep this)

`Forge` works two ways, and both are useful:

| Reading | Sense | Use in copy |
|---------|--------|-------------|
| **Noun** | Forge Trail: the path, record, or methodology left by the work | "Keep the trail." "The development trail." |
| **Verb** | forge a trail: create a new path forward | "Forge the path." Agents and developers forge a trail through a project while preserving the trail behind them. |

Word order matters. **ForgeTrail**, not TrailForge. ForgeTrail reads as the trail associated with the forge, and as the verb phrase *forge a trail*. TrailForge sounds like a tool that manufactures trails.

Someone seeing the name with zero context will not immediately know it is developer infrastructure. That is acceptable. The **descriptor** does that job. Once the concept is explained, the name gets richer. That is a good sign.

---

## 2. Category first, metaphor second

**Caution:** "trail" can sound like project tracking, audit logs, or observability. The first subtitle or sentence must establish the category.

**Do this:** name + category line, then let "trail" deepen.

```
ForgeTrail
A persistent development system for building software with AI agents.
```

**Then** the name earns its meaning: the path forward, the decisions made, the lessons learned, and the durable record left behind.

**Do not** lead with trail-as-log, trail-as-ticket-tracker, or trail-as-observability. Those readings are the failure mode.

---

## 3. Signature lines

Use these. Prefer the first when you need one line that teaches the name.

| Line | When to use |
|------|-------------|
| **Forge the path. Keep the trail.** | Default tagline. Gives the name meaning almost instantly. |
| **A persistent development system for building software with AI agents.** | Category subtitle. Use under the name on first contact (landing, README hero, About). |
| **A persistent development trail for AI-native software.** | When the reader already knows it is a dev system and you want the metaphor. |
| **Build. Learn. Leave a better trail.** | Learning-loop emphasis. The work improves what comes next. |
| **Build with AI. Preserve what you learn.** | Product-oriented, less metaphorical. Good for skeptical or enterprise readers. |
| **The development trail for AI-native software.** | Short category + metaphor in one line. |

Do not invent a new tagline for a one-off surface if one of these fits.

---

## 4. Copy principles

### What to emphasize

- **Persistence:** phase state, decisions, and gotchas live in the repo, not in a chat.
- **Resume:** breadcrumbs so the next session continues the same trail.
- **Compounding:** lessons leave the project and improve the next one.
- **Path + record:** forward motion and the history behind it, together.
- **Structured knowledge:** not a diary, not a log dump. Decisions, gotchas, and playbooks others can follow.

### What to de-emphasize or avoid

| Avoid | Why | Prefer |
|-------|-----|--------|
| "kit", "toolbox", "starter pack" as the product identity | Old name energy. Undersells the durable record. | system, playbook, trail, methodology |
| "loop" as the hero metaphor | Loop is the mechanism. Trail is the artifact. | trail, record, path, lessons left behind |
| "tracking", "logging", "observability", "audit trail" as the first frame | Sounds like a monitoring product. | development system, lifecycle, persistent record |
| Hedging *can* on shipped capabilities | Weakens a direct product voice. | Direct verbs: keeps, leaves, preserves, strengthens |
| Explaining the name before the product | Adds friction. | Category line first; the name then clicks |

### Voice for the rename

- Direct. Outcome-oriented. US English.
- State what the product **does**, not what it can do.
- No em dashes in user-facing copy.
- "ForgeTrail" in prose. Backticks for identifiers: `` `.forgetrail/` ``, `` `forgetrail` ``.

### Phrase swaps (old → new)

| Old habit | New habit |
|-----------|-----------|
| ForgeTrail keeps phase state | ForgeTrail keeps the trail: phase state, decisions, and gotchas |
| feed lessons back into the kit | leave lessons on the trail / feed lessons back so the next project starts smarter |
| remember decisions across sessions | keep the trail of decisions across sessions |
| compounding loop | compounding trail / leave a better trail |
| the kit | ForgeTrail, the trail, or the system (pick one; do not say "the kit") |
| Try ForgeTrail | Try ForgeTrail |
| ForgeTrail Lite | ForgeTrail Lite |
| `_forgetrail/` vendored tree | `_forgetrail/` vendored tree |
| `.forgetrail/` workspace | `.forgetrail/` workspace |

---

## 5. Identifier map

Use this table for mechanical renames. Do not leave mixed old/new identifiers in a consumer project.

| Kind | Old | New |
|------|-----|-----|
| Product name | ForgeTrail | ForgeTrail |
| Domain | (none owned) | forgetrail.dev |
| CLI / npm bin | `forgetrail` | `forgetrail` |
| Package | `forgetrail`, `forgetrail-mcp` | `forgetrail`, `forgetrail-mcp` |
| MCP server key | `forgetrail` | `forgetrail` |
| Env | `FORGETRAIL_ROOT`, `FORGETRAIL_TARGET`, `FORGETRAIL_TEMPLATE_DEFAULT_MODE` | `FORGETRAIL_ROOT`, `FORGETRAIL_TARGET`, `FORGETRAIL_TEMPLATE_DEFAULT_MODE` |
| App workspace | `.forgetrail/` | `.forgetrail/` |
| Vendored tree | `_forgetrail/` | `_forgetrail/` |
| Lite file | `FORGETRAIL_LITE.md` | `FORGETRAIL_LITE.md` |
| Progress doc | `FORGETRAIL_PROGRESS.md` | `FORGETRAIL_PROGRESS.md` |
| Skill | `content/skills/forgetrail/` | `content/skills/forgetrail/` |
| Cursor rules | `forgetrail-*.mdc` | `forgetrail-*.mdc` |
| MCP tools | `getForgeTrailLite`, `getForgeTrailSkill`, … | `getForgeTrailLite`, `getForgeTrailSkill`, … |
| pnpm scripts | `forgetrail:status`, `install:forgetrail` | `forgetrail:status`, `install:forgetrail` |

**Leave unchanged unless the host is actually renamed:**

- GitHub repo path `Catalyst-Forge-LLC/forge-kit` (repo slug is a separate publish step)
- Local clone folder `forgetrail` on disk
- Historical dates and quotations that are explicitly about the former name (say "formerly ForgeTrail" once, then use ForgeTrail)

When you mention the old name, do it once as provenance, not as a parallel brand.

---

## 6. Surfaces to update (checklist)

Run this list for the methodology repo and for every consumer project.

- [ ] README / landing hero: name, tagline, category line
- [ ] Try path, Lite file, kickoff and resume prompts
- [ ] MCP server name, tool names, env vars, `mcp.json`
- [ ] CLI bin, install scripts, package.json
- [ ] `.forgetrail/` (rename the directory, not only the strings)
- [ ] Cursor rules and skill filenames
- [ ] Spec titles and `specs/README.md` links
- [ ] Issue templates and GitHub links that embed the old file name
- [ ] Sibling / dependent repos that copy Lite, rules, or scripts
- [ ] In-app or site listings that describe this product

After a copy pass, grep for `ForgeTrail`, `forgetrail`, `FORGETRAIL`, `.forgetrail`, `_forgetrail`, and `forgetrail` (except the GitHub slug and local folder).

---

## 7. Worked examples

**README open:**

> **ForgeTrail**  
> Forge the path. Keep the trail.  
>  
> A persistent development system for building software with AI agents.  
> ForgeTrail gives solo developers and small teams a 7-phase playbook so agents plan before they build, keep the trail of decisions across sessions, and leave structured knowledge that improves the next project.

**Why it works:**

> Most AI chats forget. ForgeTrail keeps **phase state**, **decisions**, and **gotchas** in the repo, and leaves a trail of lessons that the next build can follow.

**Site listing:**

> ForgeTrail  
> A persistent development system for building software with AI agents.  
> Most AI coding sessions forget everything the moment you close the tab. ForgeTrail keeps the phase you are in, the decisions you made, and the gotchas you hit inside the repo, so the next session picks up the trail.

**Do not write:**

> ForgeTrail is a project-tracking trail for your logs.  
> ForgeTrail can help agents remember things.  
> TrailForge keeps an audit trail of development.
