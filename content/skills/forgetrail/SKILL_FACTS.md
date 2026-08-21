---
skill_facts_version: "0.1.0"
name: forgetrail
developer: Catalyst Forge
version: "0.3.0"
status: active
license: Apache-2.0
kind: cursor-skill
purpose: "Enforce the ForgeTrail 7-phase lifecycle and maintain .forgetrail/workflow_tracking.json as the system of record"
homepage: https://forgetrail.dev
repository: https://github.com/Catalyst-Forge-LLC/forgetrail
provenance:
  source: https://github.com/Catalyst-Forge-LLC/forgetrail
  publisher: Catalyst Forge
instructions_reach:
  shell: explicit
  network: implied
  filesystem: read-write
tools_referenced:
  - https://github.com/Catalyst-Forge-LLC/forgetrail/blob/main/mcp-server/TOOL_FACTS.md
  - getPhaseGuidance
  - runAudit
  - searchLessons
  - validateTracking
  - suggestSubagentDecomposition
  - getTemplate
  - getNewProjectKickoff
  - getResumeSessionInstructions
bundled_artifacts:
  []
egress:
  telemetry: none
  destinations: []
generated:
  date: 2026-08-20
  generator: hand-authored
credits:
  generated_with: https://skillfacts.dev
  built_by: "Catalyst Forge - https://www.catalystforge.com/"
---

# Skill Facts - forgetrail

| | |
|---|---|
| **Developer** | Catalyst Forge |
| **Version** | 0.3.0 |
| **Status** | active |
| **License** | Apache-2.0 |
| **Kind** | cursor-skill |

*Lifecycle playbook with explicit shell and read-write filesystem reach. Points at ForgeTrail MCP ToolFacts.*

## Purpose

Enforce the ForgeTrail 7-phase lifecycle and maintain .forgetrail/workflow_tracking.json as the system of record

## Provenance

| | |
|---|---|
| Source | https://github.com/Catalyst-Forge-LLC/forgetrail |
| Publisher | Catalyst Forge |

## Instructions reach

| | |
|---|---|
| Shell | explicit |
| Network | implied |
| Filesystem | read-write |

## Tools referenced

- https://github.com/Catalyst-Forge-LLC/forgetrail/blob/main/mcp-server/TOOL_FACTS.md
- getPhaseGuidance
- runAudit
- searchLessons
- validateTracking
- suggestSubagentDecomposition
- getTemplate
- getNewProjectKickoff
- getResumeSessionInstructions

## Bundled artifacts

(none)

## Egress

| | |
|---|---|
| Telemetry | none |
| Destinations | (none) |

---
*Generated with [SkillFacts](https://skillfacts.dev) · Built by [Catalyst Forge](https://www.catalystforge.com/)*
