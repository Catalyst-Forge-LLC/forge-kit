# ForgeKit as a Product

**Date:** 2026-03-21  
**Status:** Draft — **superseded for distribution (2026-05-26):** the `forge-kit` repo is now **open source (Apache 2.0)**. This document remains a historical strategy sketch (MCP-paid / IP-protection framing). Current licensing and contribution expectations: [LICENSE](../LICENSE), [CONTRIBUTING.md](../CONTRIBUTING.md).

---

## Executive summary

ForgeKit is a structured development methodology (7 phases, 15 doc templates, 71 battle-tested lessons, 8 reusable prompts, and a JSON tracking system) that turns general-purpose AI coding agents into experienced build partners. There are zero direct competitors selling structured methodology for AI-assisted development as of March 2026.

**Recommended path (MCP-first, protect the IP):**

1. **MCP server** (weeks 1-6) — Cloud-hosted MCP exposing semantic lesson search, phase guidance, audit execution, and persistent project tracking. The knowledge never leaves the server; agents get contextual guidance, not raw files. **Bootstrap tools** (`getNewProjectBootstrap`, `getInitialWorkflowTracking`, `getResumeSessionInstructions`) tell agents exactly what to build and which MCP calls to make so customer repos need **no** vendored `_forgekit/` copy — only **`.forgekit/workflow_tracking.json`**, app code, and filled project docs. Free tier drives adoption; $29-79/mo paid tiers capture recurring revenue. Success gate: 200 connected agents or $10K MRR in 90 days.
2. **Platform features** (month 4+, only if warranted) — Team accounts, shared lesson libraries, project dashboards. Only build if Phase 1 shows >70% 3-month retention and users request team features.

**Why MCP-first, not template-first:** A downloadable template product (LemonSqueezy, Gumroad) hands the buyer the complete IP on day one. Nothing prevents sharing, reselling, or rebranding — a single $149 purchase could leak the entire product to a GitHub gist within weeks. Standard software licenses are unenforceable at this price point. The MCP model keeps the knowledge server-side: agents query for contextual guidance but never receive a full dump of the lesson library, templates, or cross-references. See Section 5a for a detailed IP protection analysis.

**Why this works:** The 71 lessons encode hundreds of hours of real production debugging that can't be generated from documentation. The propagation loop means the product improves itself with every project built on it. The moat is the density and interconnection of the knowledge, not any single piece of it — and the MCP model is the only delivery mechanism that preserves this moat instead of giving it away.

**Realistic 12-month target:** $15-30K MRR ($180-360K ARR) from MCP subscriptions, with a clear path to $500K+ ARR at scale. The single biggest risk is not competition — it's obscurity.

---

## 1. What we're selling: asset inventory

ForgeKit is a structured development methodology for solo developers and small teams building production apps with AI coding agents. It is not a code generator or a UI builder. It is a system that turns a general-purpose AI agent into an experienced build partner by giving it the methodology, institutional knowledge, and operational discipline that normally require years of engineering experience.

### Quantified IP

| Asset | Count | Description |
|---|---|---|
| Development phases | 7 | Empirically derived lifecycle with entry/exit criteria, playbooks, and prompt patterns |
| Doc templates | 15 | Architecture, business plan, technical reference, brand, design system, deployment, security audit, code quality, test plan, dev estimate, growth plan, bugs, backlog, ideas, README |
| Lesson-learned callouts | 71 | Hard-won implementation wisdom embedded in templates (PocketBase gotchas, Stripe patterns, LLM metering, delegation models, entitlement architecture, CSS traps, SPA rate limits, etc.) |
| Anti-patterns | 15+ | Documented failure modes with explanations of what went wrong and why |
| Reusable prompts | 8 | Security audit (11 areas), pre-launch readiness, docs alignment, brand copy editing, Cialdini marketing audit, competitor deep dive, landing page rewrite, lesson propagation |
| Tracking system | 1 | JSON schema with pre-populated exit criteria checklists, decision log, gotcha log, session history |
| Bootstrap prompts | 2 | Initial project prompt + continuation prompt that wire any agent into the methodology |
| Prompt chains | 3 | Natural sequences: brand->landing->Cialdini; black-hat->pre-launch->docs-alignment; any milestone->propagate |

### What makes it different from "a folder of templates"

The templates are not empty scaffolds. They contain deeply specific, interconnected guidance that encodes hundreds of hours of production debugging, architecture decisions, and failure recovery. Examples of lessons that would take days to discover independently:

- PocketBase `deleteRule: null` means superuser-only, not open (unintuitive, causes silent 403s)
- `backdrop-filter` on an ancestor breaks `fixed` positioning for all descendants (discovered after hours of debugging click-outside overlays)
- Two-layer LLM cost control: token-level logging for cost visibility + feature-level counters for limit enforcement, with a periodic route inventory to catch "costs money but unmetered" holes
- Hold/pause tier design: high `maxItems` to preserve data, `isHoldPlan()` to block creation, zero action limits — three independent mechanisms that must work together
- DOCX XML splits text across runs unpredictably — code must own structure, LLM provides content only

The cross-referencing is also unique. DESIGN_SYSTEM.md references pre-launch-audit.md for verification. BRAND_AND_PRODUCT.md references DESIGN_SYSTEM.md for visual implementation. CODE_QUALITY.md findings flow into TODO.md. The propagation prompt closes the loop by extracting lessons from live apps back into the templates. This interconnection means the system gets smarter with every project.

---

## 2. Who would pay

### Segment A: Solo indie hackers and SaaS builders

The Exec Foundry archetype. Technical enough to use an AI coding agent, ambitious enough to build a production SaaS, but lacking the breadth of experience across security, billing, marketing, deployment, and code quality that a senior engineering team would provide.

- **Pain:** They can get an MVP running with AI, but the gap between "it works on my machine" and "it's production-ready and doesn't embarrass me" is enormous. Security, billing edge cases, entitlement enforcement, SEO, accessibility — each of these is a multi-day rabbit hole.
- **Willingness to pay:** $19-49/mo or $149-299 one-time. This audience is cost-sensitive but understands the value of saved time. They already pay for hosting, domains, API keys.
- **Size:** Estimated 50K-200K globally (active indie hackers building with AI tools, growing fast as AI coding improves).

### Segment B: Non-technical founders using AI to build

People who can describe what they want and iterate with an AI agent, but have no engineering background. They need the methodology even more than Segment A because they can't evaluate whether the AI's architectural decisions are sound.

- **Pain:** The AI will happily build a house of cards. Without ForgeKit-style guardrails, they ship insecure, unscalable, poorly structured apps and don't know it until something breaks in production.
- **Willingness to pay:** $29-79/mo. Higher than indie hackers because the alternative (hiring a developer or consultant) costs 10-100x more.
- **Size:** Growing rapidly. Estimated 100K-500K globally as AI coding tools lower the barrier to building software.

### Segment C: Small dev teams and agencies (2-10 people)

Teams that build multiple projects and want consistency across them. The methodology provides a shared language and quality standard.

- **Pain:** Every project reinvents the wheel on architecture decisions, security review, deployment checklists, and documentation. Knowledge stays in one developer's head or one project's codebase.
- **Willingness to pay:** $99-199/mo per team. Agencies billing clients $10K+ per project can easily justify this.
- **Size:** Estimated 200K-500K small dev teams globally using AI-assisted development.

### Segment D: Enterprise standardization

Large organizations adopting AI coding agents at scale who need governance, quality standards, and auditability.

- **Pain:** 50 developers using AI agents with no shared methodology produces 50 different architectural styles, inconsistent security postures, and no institutional learning.
- **Willingness to pay:** $499-2,999/mo per team. Enterprise procurement budgets.
- **Size:** Early market. Estimated 5K-20K potential enterprise customers within 2-3 years.
- **Timing:** Not addressable at launch. Requires Segment A/B/C traction and case studies first.

---

## 3. Five product shapes

### Shape 1: Template marketplace (digital product)

Sell ForgeKit as a downloadable package on Gumroad, LemonSqueezy, or a custom site. One-time purchase with optional subscription for updates.

**How it works:** Customer downloads a zip, drops it in their project, follows the README.

| Dimension | Assessment |
|---|---|
| Build effort | Near zero — the product already exists |
| Time to first dollar | Days |
| Revenue model | One-time ($99-249) + optional update subscription ($9-19/mo) |
| Revenue ceiling | Low. One-time purchases don't compound. Update subscriptions churn when users feel "caught up." Realistic ceiling: $5-15K MRR |
| Defensibility | **Very low.** See IP risk analysis below |
| Strengths | Immediate validation of demand. Zero infrastructure. Forces clarity on positioning and messaging |
| Weaknesses | No recurring revenue moat. No network effects. No data on how people actually use it. Difficult to justify ongoing updates without a feedback loop |

**IP risk — why this shape is structurally flawed for ForgeKit:**

ForgeKit's entire value is the knowledge encoded in its files. Selling a template product means handing the buyer 100% of the IP on the first transaction. The problems:

1. **Casual sharing is trivially easy.** A buyer sends the zip to a teammate, posts it in a Discord, or drops it in a shared drive. There is no technical barrier. A license agreement is unenforceable at the $149 price point — litigation costs more than lifetime revenue from that customer.
2. **Reselling and rebranding are trivially easy.** A motivated actor can rename the files, rewrite the README, and sell it as their own product within a day. The content is markdown — there's no compiled binary, no obfuscation, no authentication to strip.
3. **A single leak destroys the entire product.** If one buyer posts the files publicly (GitHub gist, blog post, torrent), every future sale is competing against a free alternative. This is not a hypothetical — it is the default outcome for unprotected digital knowledge products.
4. **The update subscription doesn't help.** Even if buyers subscribe for updates, each update is another zip of markdown files that can be shared. The subscription doesn't create any technical lock-in.
5. **No usage telemetry.** You cannot see how people use it, which lessons are most valuable, or where the methodology breaks down. This data is critical for improving the product and is only available with a service model.

**Verdict:** Useful only as a **loss-leader or marketing artifact** — e.g., a free "ForgeKit Lite" with 10 of the 71 lessons to demonstrate the methodology's depth and funnel users toward the MCP subscription. Not viable as a primary revenue vehicle because it trades the entire IP for a single payment with no protection or retention mechanism.

### Shape 2: MCP server (cloud-hosted service)

A hosted MCP server that any AI agent (Claude, GPT, Gemini, Cursor, Windsurf, etc.) can connect to. The server exposes ForgeKit's methodology, lessons, and prompts as tools the agent can call.

**How it works:** Customer adds the ForgeKit MCP endpoint to their agent configuration. The agent can query phase guidance, search lessons by topic, run audits, update tracking state, and store project decisions — all via MCP tool calls.

| Dimension | Assessment |
|---|---|
| Build effort | Medium. MCP server implementation, auth, lesson database, API design, hosting. 4-8 weeks for an MVP |
| Time to first dollar | 1-2 months |
| Revenue model | Subscription ($19-79/mo per project or per seat) |
| Revenue ceiling | High. Recurring revenue compounds. Can scale to $50K-500K+ MRR with adoption |
| Defensibility | Medium-high. The lesson database is the moat. The MCP protocol is open, but the curated knowledge + cross-referencing + continuous updates from real projects is hard to replicate |
| Strengths | Agent-agnostic (works with any MCP-compatible tool). Recurring revenue. Natural telemetry on usage patterns. Can add community features (shared lessons, prompt marketplace). Positions ForgeKit in the emerging AI tooling ecosystem |
| Weaknesses | MCP adoption is still early (2026). Requires infrastructure and ops. Cold start: agents need to be configured to use it. Competes with "just paste the files into context" |

**Verdict:** The most interesting long-term play. Natural fit for the content. Requires Phase 1 traction to justify the build investment.

### Shape 3: CLI + cloud hybrid

A command-line tool (`forgekit init`, `forgekit audit`, `forgekit status`) backed by a cloud service that stores lessons, tracking state, and provides the MCP protocol.

| Dimension | Assessment |
|---|---|
| Build effort | Medium-high. CLI tool + cloud backend + MCP server. 6-10 weeks |
| Time to first dollar | 2-3 months |
| Revenue model | Freemium CLI (basic init/status free) + paid cloud ($29-79/mo for full lesson library, tracking sync, MCP) |
| Revenue ceiling | Same as MCP, with better developer UX for the initial setup flow |
| Defensibility | Same as MCP, slightly better because the CLI creates habit |
| Strengths | Developer-friendly entry point. CLI is familiar. Local-first with cloud enhancement. Can gate premium prompts behind subscription |
| Weaknesses | Two surfaces to maintain (CLI + cloud). Developers are wary of CLI tools that phone home. The CLI adds complexity without fundamentally changing the value proposition vs. pure MCP |

**Verdict:** Adds UX polish but not enough incremental value over Shape 2 to justify the extra build effort. Consider as a Phase 3 enhancement to the MCP server, not a standalone product.

### Shape 4: IDE extension (Cursor / VS Code)

A Cursor or VS Code extension with a panel showing current phase, exit criteria progress, available prompts, and a "run audit" button.

| Dimension | Assessment |
|---|---|
| Build effort | High. Extension API, custom UI panels, state management, integration with editor context. 8-16 weeks |
| Time to first dollar | 3-4 months |
| Revenue model | Subscription ($19-49/mo) via extension marketplace or direct |
| Revenue ceiling | Medium. Limited to users of specific IDEs. Cursor marketplace is new and revenue models are uncertain |
| Defensibility | Medium. The UI is easy to copy; the content is the moat |
| Strengths | Deepest integration with the developer's workflow. Visual progress tracking. One-click prompt execution. Could read open files to provide contextual guidance |
| Weaknesses | Tied to specific IDE (Cursor vs. VS Code vs. Windsurf). Extension marketplace economics are unclear. High maintenance burden as IDEs evolve. The actual value (the lessons and methodology) doesn't require an extension — it works fine as files the agent reads |

**Verdict:** High effort, unclear distribution economics, and the core value doesn't require IDE integration. Consider only after the methodology is proven at scale and there's demand for a richer UI.

### Shape 5: Full SaaS platform

A web application where users manage projects, track phases, run audits, browse the lesson library, collaborate with team members, and connect their AI agents.

| Dimension | Assessment |
|---|---|
| Build effort | Very high. Full-stack web app, auth, billing, project management, collaboration, MCP integration. 3-6 months |
| Time to first dollar | 4-6 months |
| Revenue model | Subscription ($29-199/mo per team) |
| Revenue ceiling | Highest. Platform effects, team collaboration, enterprise features |
| Defensibility | High. Platform lock-in, team data, workflow integration |
| Strengths | Richest experience. Team features unlock Segment C/D. Dashboard for project health across multiple builds. Could visualize lesson usage and phase progression |
| Weaknesses | Massive build investment before validation. Competes with every project management tool. The core value is the methodology, not the dashboard — risk of building features nobody uses around content everybody wants |

**Verdict:** Phase 3 at earliest. Only build this if Shapes 1+2 prove that people want a richer experience than files + MCP. The "build a platform" instinct is the most common trap for developer tools.

---

## 4. Recommended path

### Phase 1: MCP server (weeks 1-6)

**Goal:** Recurring revenue, IP protection, agent ecosystem positioning, usage telemetry.

- Build a hosted MCP server exposing ForgeKit tools (see Section 5 for deep dive, Section 5a for IP protection model)
- Free tier: phase guidance + 5 lesson queries/day + 1 project (demonstrates value, no full IP exposure)
- Pro tier ($29/mo): full lesson library, unlimited queries, 5 projects, tracking persistence, all audit prompts
- Team tier ($79/mo): shared lessons, team tracking, 20 projects
- Landing page (use ForgeKit's own `landing-page-rewrite.md` prompt to build it)
- Launch on Product Hunt, Hacker News "Show HN", indie hacker communities
- Content marketing: write 3-5 posts about specific lessons that demonstrate the methodology's depth without giving away the full content
- Optional: publish a free "ForgeKit Lite" PDF/repo with 10 curated lessons as a demand-validation and funnel artifact

**Success criteria to advance:** 200+ connected agents OR $10K MRR in 90 days. Qualitative signal: users keeping MCP connected across multiple projects (retention > 3 months).

**Revenue projection:** $5-15K MRR within 90 days.

### Phase 2: Platform features (month 4+, only if warranted)

**Goal:** Team features, enterprise readiness, higher ARPU.

- Add team/org accounts with shared lesson libraries
- Project dashboard (phase progress, audit history, decision log)
- Custom lesson contribution (teams add their own stack-specific lessons)
- CLI tool for local workflow enhancement
- Enterprise SSO, audit logs, compliance features

**Only build if:** Phase 1 shows retention > 70% at 3 months AND users request team features.

---

## 5. MCP server deep dive

### Tools the MCP would expose

```
forgekit.getPhaseGuidance(phase_id)
  Returns: entry/exit criteria, playbook, prompt patterns, anti-patterns for the specified phase

forgekit.getCurrentPhase(project_id)
  Returns: current phase, exit criteria progress, suggested next actions

forgekit.advancePhase(project_id, target_phase)
  Returns: validation result (are exit criteria met?), blockers if not

forgekit.searchLessons(query, tags?, category?)
  Returns: relevant lessons ranked by relevance, with source template and context

forgekit.getLesson(lesson_id)
  Returns: full lesson content, related anti-patterns, cross-references

forgekit.runAudit(project_id, audit_type)
  Audit types: security, pre-launch, docs-alignment, brand-copy, cialdini, competitor
  Returns: the full audit prompt with project context injected

forgekit.getTemplate(template_name)
  Returns: the doc template content for the agent to fill in

forgekit.updateTracking(project_id, updates)
  Updates: phase transitions, exit criteria, decisions, gotchas, session notes
  Returns: updated tracking state

forgekit.addLesson(project_id, lesson)
  Adds a project-specific lesson to the user's lesson library
  Returns: confirmation + suggested tags

forgekit.getPromptChain(chain_name)
  Chain names: go-to-market, release-readiness, framework-maintenance
  Returns: ordered list of prompts with dependency notes
```

### Architecture

```
                    +-------------------+
                    |   AI Agent        |
                    | (Claude, GPT,     |
                    |  Cursor, etc.)    |
                    +--------+----------+
                             |
                         MCP Protocol
                             |
                    +--------v----------+
                    |  ForgeKit MCP     |
                    |  Server           |
                    |                   |
                    |  - Auth (API key) |
                    |  - Rate limiting  |
                    |  - Tool routing   |
                    +--------+----------+
                             |
              +--------------+--------------+
              |              |              |
     +--------v---+  +------v------+  +----v-------+
     | Lesson DB  |  | Tracking DB |  | Template   |
     | (Postgres) |  | (per-user   |  | Store      |
     |            |  |  per-project)|  | (static +  |
     | - Curated  |  |             |  |  versioned)|
     | - User     |  | - Phases    |  |            |
     | - Tagged   |  | - Decisions |  |            |
     | - Versioned|  | - Gotchas   |  |            |
     +------------+  +-------------+  +------------+
```

**Key design decisions:**

- **Stateless MCP server** with external storage. Scales horizontally. Each request includes project_id and auth token.
- **Lesson database** is the core IP. Curated lessons (from ForgeKit) are read-only and versioned. User lessons are per-account and can be tagged, searched, and optionally shared.
- **Tracking is per-project, per-user.** Users can have multiple projects. Each project has its own phase state, decisions, and gotchas.
- **Templates are versioned.** When ForgeKit updates a template, existing projects keep their version. Users can diff and merge updates.
- **Auth is API-key based.** Simple, works with any MCP client. Keys scoped per-project or per-account.

### Lesson database design

The lesson database is the most defensible asset. Structure:

| Field | Type | Description |
|---|---|---|
| id | uuid | Unique lesson identifier |
| content | text | The lesson text (3-8 lines typically) |
| category | enum | stack-gotcha, architecture, security, billing, ux, copy, deployment, testing, performance |
| tags | text[] | Searchable tags (e.g., "pocketbase", "svelte", "stripe", "css", "lllm") |
| source_template | text | Which ForgeKit template it lives in |
| cross_references | uuid[] | Related lessons |
| anti_pattern | text | The "don't do this" counterpart, if any |
| stack | text[] | Which tech stacks it applies to (e.g., ["sveltekit", "pocketbase"] or ["any"]) |
| difficulty | enum | gotcha (easy to hit), pattern (useful to know), architecture (design-level) |
| origin | enum | curated (ForgeKit team), community (user-contributed), project (user's own) |
| version | int | Incremented on updates |
| created_at | timestamp | |

**Search** is semantic (embeddings) + keyword (tags + full-text). When an agent calls `searchLessons("how should I handle subscription cancellation?")`, it gets back lessons about expired states, Hold tiers, webhook handling, and entitlement enforcement — even though none of those lessons contain the word "cancellation."

### Community contribution model

Phase 2+. Users who add lessons to their own projects can optionally submit them for community review. Curated community lessons become part of the shared library. Contributors get credit and potentially free months of service.

This creates a **flywheel**: more users -> more lessons -> more value -> more users.

The propagation prompt (`propagate-to-forgekit.md`) already encodes the methodology for extracting reusable patterns. The MCP version automates this: when a user adds a project-specific lesson, the system can suggest generalizing it for community submission.

---

## 5a. IP protection: how the MCP model safeguards the secret sauce

The core question: if ForgeKit's value is its knowledge, and any delivery mechanism must eventually transmit that knowledge to the user's agent, how does the MCP model protect anything?

### The fundamental tradeoff

Every product model sits on a spectrum between **full disclosure** (hand over the files) and **full opacity** (never reveal the content). Neither extreme works:

- Full disclosure (template product): the buyer has everything and can share/steal it
- Full opacity: the agent can't use knowledge it never receives, making the product useless

The MCP model works because it can operate anywhere on this spectrum per-request, per-tool, and per-tier. The goal is to be **useful enough to justify the subscription while opaque enough that no single session or scraping campaign can extract the full IP.**

### How the MCP protects IP: seven mechanisms

**1. Contextual delivery, not bulk access**

The agent never receives the full lesson database, template library, or cross-reference graph. It receives answers to specific questions about its current project.

When an agent calls `forgekit.searchLessons("PocketBase auth rules")`, it gets back 3-5 relevant lessons with context — not a dump of all 71 lessons. The agent gets what it needs; the user never sees the other 66 lessons in that session. Over time, a power user's agent will have queried many lessons, but each is served in isolation without the cross-references and structural context that make the system valuable as a whole.

Template content is **single-source** in `docs/*.md`. The MCP applies a **stripping function** for `getTemplate(..., mode: "shell")`: enrichment lives in blockquotes that start with 💡 / 📝 / 🔧; shell mode removes those runs so the wire payload is mostly structure and placeholders. `mode: "full"` returns the complete file for agents that need every lesson. The agent still writes the project-specific content in the user's repo.

**2. Synthesis over transcription**

The MCP server doesn't need to return raw lesson text verbatim. It can return synthesized guidance that applies the lesson to the user's specific context.

Raw lesson (never returned):
> "PocketBase `deleteRule: null` means superuser-only, not open. Causes silent 403s in user-scoped contexts."

Synthesized response (what the agent receives):
> "Your `jobs` collection's delete rule is set to `null`. In PocketBase, this means only superusers can delete — regular user tokens will get a 403. If users should be able to delete their own jobs, set the rule to `@request.auth.id = user`."

The synthesized version is more useful (it's project-specific) and less stealable (it's not a reusable lesson — it's advice about _their_ schema). A competitor can't reconstruct the lesson library from thousands of contextualized responses.

**3. Rate limiting and query budgets**

| Tier | Lesson queries/day | Audit runs/mo | Template requests/day |
|---|---|---|---|
| Free | 5 | 0 | 2 |
| Pro | Unlimited | 10 | Unlimited |
| Team | Unlimited | 30 | Unlimited |

Even on the Pro tier, the rate limiting serves an anti-extraction purpose. Automated scraping would need to generate plausible project contexts for each query (because responses are contextual), submit thousands of diverse queries to cover the full lesson space, and then reconstruct the lesson graph from fragments. This is vastly more effort than building the knowledge from scratch.

**4. Tiered depth: free tier as funnel, not giveaway**

The free tier serves phase guidance (the structural skeleton — not defensible) and a handful of lesson queries per day. This is enough to demonstrate value but not enough to extract meaningful IP. The free tier is a marketing channel, not a product.

The paid tier unlocks the depth: full lesson search, audit execution, tracking persistence, cross-references. But even here, lessons are served contextually, not as a downloadable database.

**5. Invisible cross-references**

A key part of ForgeKit's value is the interconnection between documents. DESIGN_SYSTEM.md references pre-launch-audit.md; BRAND_AND_PRODUCT.md references DESIGN_SYSTEM.md; CODE_QUALITY.md findings flow into TODO.md. In the MCP model, these cross-references are resolved server-side and served as unified guidance.

The agent asks about navbar design; the response integrates lessons from DESIGN_SYSTEM.md, pre-launch-audit.md (accessibility checks), and CONTEXT_PROMPT.md (Svelte gotchas) — without exposing that three separate documents were consulted. The cross-referencing logic is never transmitted.

**6. Server-side prompt execution**

Audit prompts (security, pre-launch, brand copy, etc.) are some of ForgeKit's most valuable assets. In the template model, these are full markdown files the buyer owns forever. In the MCP model, `forgekit.runAudit("security")` executes the audit server-side, applying the prompt to the user's project context and returning findings — not the prompt itself.

The user gets: "Your PocketBase delete rules on 3 collections allow unauthenticated deletion. Here's how to fix them..."
The user does not get: the 2,000-word security audit prompt that generated that finding.

**7. Continuous evolution**

The lesson database is updated continuously. New lessons from community contributions, new projects, and new framework versions mean the current snapshot is always depreciating. Even if someone extracted the full lesson database today, it would be stale within weeks. The MCP subscription is the only way to stay current.

### What the MCP model does NOT protect

Honest assessment of the limits:

| Threat | Protection level | Why |
|---|---|---|
| A user manually copying individual lessons from agent responses into their own notes | **Low.** Each response contains real guidance. A disciplined user could manually build a lesson library over months. | This is acceptable — they're paying for the subscription and the effort to reconstruct is significant. They can't share the "service" even if they share notes. |
| A user asking the agent to "dump everything ForgeKit told you" | **Medium.** The agent only has the lessons from the current session. Rate limits cap how much is returned per day. Synthesis means the "dump" is project-specific, not reusable templates. | Contextual delivery is the primary defense. The dump is useful to that user for that project, not as a competing product. |
| Automated extraction via scripted MCP queries | **Medium-high.** Rate limiting, contextual delivery (queries need plausible project context), and response synthesis make bulk extraction expensive and noisy. | Detectable via usage patterns. Accounts showing extraction behavior can be suspended. |
| A well-funded competitor reverse-engineering the methodology from public content + user reports | **Medium.** Blog posts, landing page, and user discussions reveal the structural approach. | The structure is not the moat — the density of the 71+ lessons is. A competitor knowing "ForgeKit has a 7-phase methodology with security audits" doesn't give them the lessons. |
| An insider or early team member leaking the full database | **Low.** This is a people problem, not an architecture problem. | Standard employment agreements, limited access scope, audit logging. Same risk as any knowledge business. |

### Net assessment: is the MCP model "leak-proof"?

No. No knowledge business is leak-proof. The MCP model is **leak-resistant**, which is a categorically different position than the template model (which is leak-guaranteed).

The practical protection comes from stacking the seven mechanisms. Any one mechanism can be circumvented; circumventing all seven simultaneously requires more effort than the knowledge is worth to steal. And the continuous evolution means any successful extraction is a depreciating asset.

The template model fails the first test: one purchase = full IP transfer with zero friction. The MCP model passes a much harder test: the only way to get the full value is to remain a subscriber.

### Comparison: IP exposure by product shape

| Shape | IP exposed on day 1 | Extraction effort | Ongoing protection |
|---|---|---|---|
| Template product | 100% | Zero — buyer has everything | None |
| Agent skill (SKILL.md) | 100% | Zero — it's a file | None |
| MCP server | 5-15% per session | High — requires sustained querying, diverse contexts, reconstruction | Strong — continuous updates, contextual delivery, rate limits |
| CLI + cloud | Same as MCP (backend is the same) | Same as MCP | Same as MCP |
| Full SaaS platform | Same as MCP (backend is the same) | Same as MCP + UI adds switching costs | Strong — platform lock-in adds to retention |

---

## 6. Competitive landscape

### Direct competitors (methodology for AI-assisted development)

**There are none.** As of March 2026, no product sells a structured development methodology specifically designed for AI coding agents. The space is wide open.

### Adjacent competitors

| Product/Approach | What it does | Why it's not ForgeKit |
|---|---|---|
| **.cursorrules / AGENTS.md** | Per-project rule files for Cursor/Copilot agents | Single file of rules, no lifecycle, no lessons, no prompts, no tracking. ForgeKit is 100x more content. These are compatible with ForgeKit, not competitive — ForgeKit can generate better .cursorrules |
| **Cursor / Windsurf / Copilot** | AI coding IDEs | The coding agent, not the methodology. ForgeKit makes these tools more effective. Complementary, not competitive |
| **Bolt / v0 / Lovable** | AI UI/app generators | Generate code from prompts. No methodology, no production hardening, no business strategy. Different category entirely |
| **Aider / Claude Code / Codex** | CLI-based AI coding agents | Same as above — the agent, not the methodology |
| **gstack** (Garry Tan) | 28 slash-command skills for Claude Code — virtual team roles (eng review, QA, security, deploy, design) for sprint execution. Persists design docs, retro snapshots, review overrides, and skill analytics across sessions | Sprint-level execution with some cross-session artifacts, but no lifecycle methodology. No phase management, no decision rationale log, no architecture context document, no progressive docs, no lesson database, no business/brand strategy. **Complementary to ForgeKit** — gstack accelerates the inner loop within ForgeKit phases. See WORKFLOW.md §1b for integration guide |
| **Boilerplate repos / starter kits** | Pre-built project templates (T3 stack, SaaS starters) | Code scaffolding, not methodology. No lessons, no phase management, no audits. ForgeKit is stack-agnostic methodology that works alongside any starter kit |
| **Development consulting** | Hire an expert to guide your build | The human version of ForgeKit. $150-300/hr. ForgeKit delivers similar guidance at $19-79/mo |

### The positioning gap

Every tool in the AI coding space focuses on **generating code faster**. Nobody focuses on **generating better projects**. ForgeKit occupies the gap between "I can get AI to write code" and "I shipped a production app I'm proud of." This gap is widening as AI coding tools get more powerful — more people can start projects, but the failure rate from MVP to production remains high.

**gstack is the closest adjacent tool** — it adds team-role structure to sprints, which is genuinely useful. gstack does persist some artifacts across sessions: design docs from `/office-hours` (in `~/.gstack/projects/`), retro snapshots for trend tracking (`.context/retros/`), review gate overrides per branch, eureka moment logs, and skill usage analytics. It also maintains `CLAUDE.md` for project config and `TODOS.md` for backlog. However, it has **no lifecycle phases**, **no decision rationale log**, **no gotcha capture**, **no architecture context document** (no equivalent of `CONTEXT_PROMPT.md`), **no progressive documentation**, **no business/brand strategy**, and **no persistent lesson database**. A gstack user who adopts ForgeKit gets the lifecycle and architectural memory their sprints have been missing; a ForgeKit user who installs gstack gets faster execution within each phase. The combination is strictly additive.

---

## 7. Pricing models

### MCP server (primary product)

| Tier | Price | What's included | IP exposure |
|---|---|---|---|
| Free | $0 | Phase guidance, 5 lesson queries/day, 1 project, no audits | Structural skeleton only — no deep lessons |
| Pro | $29/mo | Full lesson library (contextual), unlimited queries, 5 projects, tracking persistence, all audit prompts | Lessons served contextually per query |
| Team | $79/mo (up to 5 seats) | Everything in Pro + shared lessons, team tracking, 20 projects | Same per-query exposure, shared across team |
| Enterprise | $299/mo (up to 25 seats) | Everything in Team + custom lesson libraries, SSO, priority support, unlimited projects | Same, plus admin analytics |

**Revenue projections:**

| Metric | 100 subscribers | 1,000 subscribers | 5,000 subscribers |
|---|---|---|---|
| Blended ARPU | $35/mo | $40/mo | $50/mo |
| MRR | $3,500 | $40,000 | $250,000 |
| ARR | $42,000 | $480,000 | $3,000,000 |

The blended ARPU increases at scale because larger customers (Team/Enterprise) represent a higher share as the product matures.

### Free content funnel (replaces template product)

Instead of selling the full IP as a downloadable product, use free content strategically to drive MCP subscriptions:

| Asset | Purpose | IP exposure |
|---|---|---|
| "ForgeKit Lite" blog series | 10 curated lessons published as blog posts demonstrating depth | ~14% of lessons, no cross-references, no prompts, no tracking |
| Open-source phase skeleton | The 7 phase names, entry/exit criteria headings (no lesson content) | Structure only — the "table of contents" without the book |
| Demo video / walkthrough | Shows the MCP in action on a real project | Visual demo, no extractable content |
| Newsletter | Weekly lesson spotlight (one lesson, explained) | Slow drip, one lesson per week |

This approach validates demand (if nobody reads the free content, nobody would buy the template product either) while keeping the full IP server-side.

Realistic 12-month target: $15-30K MRR ($180-360K ARR) from MCP subscriptions.

---

## 8. Moat and defensibility

### Hard to replicate

| Asset | Why it's defensible |
|---|---|
| **71+ curated lessons** | Each encodes hours of real debugging and architecture work. A competitor would need to build multiple production apps to discover the same insights. You can't generate these from documentation — they come from failure |
| **Cross-referencing system** | Templates reference each other, prompts check each other's output, the propagation loop keeps everything in sync. This interconnection took dozens of iterations to get right |
| **The propagation methodology** | ForgeKit improves itself with every project. Each new app built with ForgeKit generates new lessons that flow back into the templates. This compounds over time |
| **Prompt engineering depth** | The 8 prompts encode specific, tested methodologies (11-area security audit, Cialdini-based marketing audit, 7-phase competitor analysis). Each was refined through real use |
| **Phase methodology** | Derived from empirical observation of how real projects actually progress, not theoretical software engineering. The entry/exit criteria and anti-patterns are battle-tested |

### Easy to copy

| Asset | Why it's vulnerable |
|---|---|
| **File structure** | Anyone can create a folder of markdown templates |
| **Phase names and descriptions** | The concept of phased development is not novel |
| **Individual tips** | Any single lesson can be found eventually through experience or Stack Overflow |
| **Template formats** | The blank scaffolds (heading structure, placeholder syntax) are trivial to recreate |

### Net assessment

The moat is the **density and interconnection of the knowledge**, not any single piece of it. A competitor could copy the file structure in an afternoon, but replicating the 71 lessons, the cross-references, the prompt chains, and the continuous improvement loop would take months of real production development. The defensibility increases over time as the lesson database grows.

The MCP delivery model adds three additional moat layers that a template product cannot provide:

1. **IP retention.** The knowledge stays server-side. Users receive contextual guidance, not raw files. See Section 5a for the detailed analysis.
2. **Switching costs.** Once a team's agents are configured to use ForgeKit MCP and their project tracking, decisions, and gotcha log lives there, moving to a competitor means migrating state and retraining habits.
3. **Network effects.** Community-contributed lessons increase the value for all subscribers. This flywheel cannot exist with a downloadable product — it requires a shared service.

---

## 9. Risks and mitigations

### Risk 1: "I can just paste files into my context window"

**Severity:** Medium (reduced from High — no template product to cannibalize)
**Description:** Some users will argue they can replicate ForgeKit's value by pasting their own notes into agent context. A few will try to reconstruct the methodology from the free content (blog posts, ForgeKit Lite, demo videos).

**Mitigation:** The free content deliberately shows the structure and ~14% of lessons, enough to prove the methodology works but not enough to replace it. The MCP server adds value that files cannot replicate: (a) semantic search across the full lesson graph (the agent doesn't need to scan 15 files — it asks a question and gets cross-referenced answers), (b) persistent tracking across sessions without manual file management, (c) synthesized, project-specific guidance rather than generic templates, (d) continuous updates that don't require re-downloading anything, (e) community lessons from other users' projects. The effort to reconstruct ForgeKit from free content would take longer than just subscribing.

### Risk 2: MCP adoption stalls

**Severity:** Medium
**Description:** MCP is an emerging protocol. If major AI tools don't widely adopt it, or if a competing protocol wins, the MCP server becomes a stranded asset.

**Mitigation:** The MCP server can also expose a REST API. The lesson database and tracking system work regardless of protocol. If MCP stalls, pivot to a REST API that IDE extensions or CLI tools consume. The content is protocol-agnostic; only the delivery mechanism changes.

### Risk 3: AI agents get good enough to not need methodology

**Severity:** Low-medium (long-term)
**Description:** As AI models improve, they may internalize the kind of guidance ForgeKit provides, making external methodology unnecessary.

**Mitigation:** Models improve at code generation, but architectural judgment, business strategy, security auditing, and cross-project learning are higher-order capabilities that improve more slowly. ForgeKit's value is not "write this code" but "here's what to build, in what order, and what pitfalls to avoid based on real experience." This remains valuable even with more capable models. Additionally, the lesson database grows with the community — it's always ahead of what's baked into any model's training data.

### Risk 4: Large competitor enters the space

**Severity:** Medium
**Description:** Cursor, GitHub, or Anthropic could build a "project methodology" feature into their tools, leveraging their existing user base and distribution.

**Mitigation:** Large companies optimize for broad appeal; ForgeKit optimizes for depth. A built-in methodology feature would be generic. ForgeKit's value is specificity — 71 lessons about real gotchas, not abstract best practices. The community lesson database creates a network effect that a built-in feature can't match. Also: if Cursor adds a "methodology" feature, ForgeKit can be the content provider behind it (partnership opportunity).

### Risk 5: Low willingness to pay for "just documentation"

**Severity:** Low-medium (mitigated by MCP-first model)
**Description:** Developers are accustomed to free documentation. Convincing them to pay for what they perceive as "markdown files" requires a strong value narrative.

**Mitigation:** The MCP-first model inherently addresses this perception. Users are not paying for files — they're paying for a service that makes their agent smarter in real time. The value frame is "ForgeKit saved me 40 hours on my last project" and "my agent caught 12 security issues I wouldn't have found," not "I bought 15 markdown templates." The free content funnel demonstrates the depth; the MCP subscription delivers it as an ongoing service. This is closer to paying for a senior consultant on retainer than buying a book.

---

## 10. Go-to-market

### Pre-launch / MCP build phase (weeks 1-4)

Build audience while the MCP server is under development:

- Write 3-5 blog posts / Twitter threads demonstrating ForgeKit's depth without giving away the full content:
  - "I audited my SaaS security with an AI agent and a 2,000-word prompt. Here's what it found." (shows the audit's output and methodology, not the prompt itself)
  - "The 7 phases of building a production app with AI — what actually works." (gives the phase structure, not the lesson content)
  - "71 lessons I learned building a SaaS with Claude. Here are 5 of them." (proves depth, whets appetite for the rest)
- Publish "ForgeKit Lite" — the open-source phase skeleton (names, entry/exit criteria headings) and ~10 selected lessons. This serves as proof of quality and a funnel to the paid MCP service.
- Build the landing page using ForgeKit's own landing-page-rewrite prompt (meta-demonstration)
- Collect email waitlist signups for MCP launch
- Create a short demo video (3-5 min) showing a real agent using ForgeKit MCP to bootstrap a project

### MCP launch (weeks 5-6)

- Product Hunt launch (use ForgeKit's own Cialdini marketing audit to optimize the listing)
- Hacker News "Show HN" post leading with the personal story + technical depth
- Post in r/SideProject, r/indiehackers, r/sveltejs, r/webdev
- Direct outreach to 20-30 indie hackers who have publicly discussed building with AI
- Free tier drives adoption; conversion to paid from power users who hit the 5-query/day limit

### Post-launch growth (months 2-4)

- Collect testimonials and case studies from early users
- Weekly content: one new lesson spotlight (blog/newsletter) sourced from ongoing Exec Foundry development or community feedback
- Partner outreach: AI coding tool creators (Cursor, Windsurf) for integration or co-marketing
- Usage telemetry guides product development: which lessons are queried most, where users get stuck, which audits drive the most value

### Ongoing

- Every new project built with ForgeKit generates content (new lessons, new case studies)
- The propagation loop means the product literally improves itself with use
- Community contributions create a flywheel of increasing value
- The free content funnel (blog posts, newsletter, ForgeKit Lite) continuously feeds MCP subscriptions

---

## 11. Summary: why this is a real business

ForgeKit sits at the intersection of three trends:

1. **AI coding tools are mainstream.** Millions of developers use AI agents daily. The tools are powerful but undirected.
2. **The gap between "it works" and "it's production-ready" is widening.** As AI makes it easier to start projects, more people hit the wall between MVP and production. The wall doesn't get lower — security, billing, accessibility, performance, and deployment complexity remain constant.
3. **Knowledge compounds.** Every project built with ForgeKit generates lessons that make the next project better. No competing product has this flywheel.

The MCP-first model is the only product shape that simultaneously solves the three hardest problems in knowledge businesses: **monetization** (recurring subscriptions, not one-time sales), **IP protection** (knowledge stays server-side, served contextually, never bulk-transferred), and **continuous improvement** (usage telemetry + community contributions create a flywheel that a static file product cannot achieve).

The business starts generating revenue within 6 weeks of build start (MCP launch with free/paid tiers) and has a clear path to $500K+ ARR within 18 months if execution is strong. It requires modest infrastructure (a hosted MCP server, a Postgres-backed lesson database, basic auth) and gets more defensible over time as the lesson database grows and switching costs accumulate.

The single biggest risk is not competition or IP theft — it's obscurity. The product needs to be discovered by the right audience. The go-to-market plan addresses this through free content that demonstrates the depth of knowledge without transferring the full IP: blog posts, a ForgeKit Lite open-source skeleton, and a demo video showing the MCP in action on a real project.
