# Security policy

## Supported versions

Security fixes are applied to the **default branch** (`main`). Older tags are not actively supported unless noted in a release.

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Email **security@catalystforge.com** (or, if that address is not yet active, use the contact path on [catalystforge.com](https://catalystforge.com)) with:

- A description of the issue
- Steps to reproduce
- Impact assessment (data exposure, RCE, secret leakage, etc.)
- Affected paths (e.g. `mcp-server/`, setup scripts, docs only)

We will acknowledge receipt within a reasonable time and work on a fix or mitigation. We may ask for a coordinated disclosure timeline.

## Scope notes

ForgeTrail includes:

- Documentation and agent prompts (lower direct risk, but can steer agents toward unsafe practices if wrong)
- The **MCP server** (local process; should not expose network services by default)
- **Reference scripts** (`content/scripts/`) that download binaries (PocketBase) or talk to local services (Ollama)

When reporting issues in **app repos** that use ForgeTrail, distinguish ForgeTrail upstream bugs from project-specific `.env` or custom code.

## Safe use reminders

- Never commit `.env`, API keys, or production credentials.
- Review what agents download (PocketBase, npm packages, Ollama models) before running setup scripts.
- Treat MCP tool output as instructions for the agent, not as auto-executed commands without human review in sensitive environments.
