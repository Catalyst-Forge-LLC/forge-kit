/** Text vs JSON MCP tool responses for headless / structured clients. */

export type ResponseFormat = "text" | "json";

export function toolResult(
  format: ResponseFormat | undefined,
  payload: { text: string; json: Record<string, unknown> }
): { content: [{ type: "text"; text: string }] } {
  if (format === "json") {
    return { content: [{ type: "text", text: JSON.stringify(payload.json, null, 2) }] };
  }
  return { content: [{ type: "text", text: payload.text }] };
}
