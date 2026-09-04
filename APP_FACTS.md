---
app_facts_version: 0.1.0
name: ForgeTrail
type: spec / tooling
status: active
license: Apache-2.0
homepage: https://forgetrail.dev
repository: https://github.com/Catalyst-Forge-LLC/forgetrail
stack:
  language: "JavaScript, TypeScript"
  runtime: Node.js
  tooling: "Model Context Protocol (MCP)"
  hosting: Cloudflare
key_dependencies:
  - name: "@modelcontextprotocol/sdk"
    purpose: Model Context Protocol server implementation
  - name: zod
    purpose: Schema validation and type inference
  - name: wrangler
    purpose: Cloudflare deployment tool
  - name: getfilepress
    purpose: File-based content management
services:
  - name: Cloudflare
    role: hosting provider for website
build:
  package_manager: pnpm
  test: undisclosed
  ci: undisclosed
generated:
  date: 2026-08-20
  generator: "appfacts-cli v0.1.0 (ollama:gemma4:12b)"
  inputs_fingerprint: 80474633db4f5705
credits:
  generated_with: https://appfacts.dev
  built_by: "Catalyst Forge — https://www.catalystforge.com/"
---

# ForgeTrail

`spec / tooling` · **active** · Apache-2.0

Curated stack label for this repository — aimed at an under-a-minute skim.

**[Open visual label →][appfacts-label]** · or scan `APP_FACTS.png`

[Homepage](https://forgetrail.dev) · [Repository](https://github.com/Catalyst-Forge-LLC/forgetrail)

### Stack

| Layer | Choice |
| --- | --- |
| Language | JavaScript, TypeScript |
| Runtime | Node.js |
| Tooling | Model Context Protocol (MCP) |
| Hosting | Cloudflare |

### Key dependencies

- `@modelcontextprotocol/sdk` — Model Context Protocol server implementation
- `zod` — Schema validation and type inference
- `wrangler` — Cloudflare deployment tool
- `getfilepress` — File-based content management

### Services

- **Cloudflare** — hosting provider for website

### Build

- **Package Manager** — pnpm

---
*Generated with [AppFacts](https://appfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/) · [Visual label][appfacts-label]*

[appfacts-label]: https://appfacts.dev/v#af1.eNp1UsFu2zAM_RVBpxVI4m5HnzYY6GFohwLtbRgGRqIdLZIoSLS7LMi_j7KNLBjQm0299_j4yLOedPtxoyME1K1-oDzgawbn9UbzKdVaSWhUo5jIuzhIvTDwWOQFDLsJpeKdwVgq-EsCc8Dtp939AjRH3Z61hziMMFTAV5jgxWSXeKNepcHyLeA8RnaziW9kcferVAdrz1Y_Sc2rjiLjb1bPmZgMefXhqXu-E-CBCi_AztNoew8Z9WWjLSYx-v2sozx9DlXELBpplWiKPYpAer9HwTxhVi4kjwGjDO8oivgi-ofsSn-RwQOoCbyzM0ZBtKqGqFzsMWM0eKW9ZYnEY165_1wrsezpVBvNkV8ZA3LvPKaMpaysB_nf7qGgVfNUQgkQJefK1pcfsoHJXMe_SUbSlsIampIoJmdlxJ6yesN9cYwzez86b-v-ZKlHkf25qFduiinUBWFh-RujdcV4EidSNO6_0qUuKGBaLuDAnErbNH29Na63trM4VU-YSHpTPt2gBseHcb8zFJoOGPyp8Ha-0u3jY3ejoS9_ATHV9b4
