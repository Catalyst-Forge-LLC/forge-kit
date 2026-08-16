#!/usr/bin/env node

/**
 * Live MCP ping: spawns forgetrail-mcp, calls the ping tool, prints result.
 * Run from mcp-server/ so @modelcontextprotocol/sdk resolves from node_modules.
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MCP_SERVER_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FORGETRAIL_ROOT = process.env.FORGETRAIL_ROOT
  ? resolve(process.env.FORGETRAIL_ROOT)
  : resolve(MCP_SERVER_ROOT, "..");
const entry = join(MCP_SERVER_ROOT, "dist", "index.js");

if (!existsSync(entry)) {
  console.error("Missing mcp-server/dist/index.js — run: forgetrail mcp build");
  process.exit(1);
}

const transport = new StdioClientTransport({
  command: process.execPath,
  args: [entry],
  env: {
    ...process.env,
    FORGETRAIL_ROOT,
    FORGETRAIL_QUIET: "1",
  },
  stderr: "pipe",
});

const client = new Client({ name: "forgetrail-cli", version: "1.0.0" }, { capabilities: {} });

try {
  await client.connect(transport);
  const result = await client.callTool({ name: "ping", arguments: { format: "json" } });

  let payload = null;
  if (result.content?.length) {
    const text = result.content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("\n");
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { rawText: text };
    }
  }

  if (result.isError) {
    console.error("ping tool returned an error.");
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify({ ok: true, ping: payload }, null, 2));
  process.exit(payload?.ok === false ? 1 : 0);
} catch (err) {
  console.error("MCP ping failed:", err instanceof Error ? err.message : err);
  process.exit(1);
} finally {
  try {
    await client.close();
  } catch {
    /* ignore */
  }
}
