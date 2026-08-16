# Contributing to ForgeTrail

Thank you for helping improve ForgeTrail. This project is an open methodology, template library, and MCP server for building apps with AI coding agents.

## Support expectations

ForgeTrail is maintained as **open source on a best-effort basis**. There is no guaranteed response time, SLA, or paid support included with the license. For commercial help, contact [Catalyst Forge](https://catalystforge.com).

## Ways to contribute

1. **Issues** — bugs in docs, MCP tools, scripts, or confusing agent behavior. Include repro steps and your environment (OS, Git version, Node, agent product).
2. **Pull requests** — doc fixes, new lessons, script improvements, MCP tool enhancements. Keep PRs focused.
3. **Real-world feedback** — if you bootstrapped a project with Lite or MCP, note what broke in `.forgetrail/FORGETRAIL_LITE_UPDATES.md` in your app repo, then open an issue or PR here with the distilled lesson.
4. **Propagation from apps** — if you maintain a separate app repo, use `prompts/propagate-to-forgetrail.md` as a checklist before opening a ForgeTrail PR.

## Before you open a PR

- Read [WORKFLOW.md](WORKFLOW.md) and [content/FORGETRAIL_LITE.md](content/FORGETRAIL_LITE.md) for tone and structure.
- Do **not** commit secrets, `.env` files, customer data, or `debug.log`-style artifacts.
- Ground commit messages in the actual diff (see `.cursor/rules/commit-messages.mdc` in this repo).
- If you change **FORGETRAIL_LITE.md**, bump the version in the header, footer, and §12 `AGENTS.md` snippet reference when the change is substantive.
- Run `pnpm install && pnpm run build` in `mcp-server/` when you touch TypeScript.

## Doc and lesson changes

- Prefer **actionable agent instructions** over essay-style prose.
- Lessons belong in the right home: inline in **FORGETRAIL_LITE** §13, template callouts in `docs/`, or MCP lesson content — not duplicated in three places without reason.
- Record notable releases in [update-log.md](update-log.md) when maintainers merge substantive batches.

## Code of conduct

Be direct, respectful, and constructive. We are here to reduce chaos in AI-assisted software delivery, not recreate it in issues.

## License

By contributing, you agree that your contributions will be licensed under the [Apache License 2.0](LICENSE), same as the project.
