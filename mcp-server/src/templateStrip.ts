/**
 * Single-source ForgeKit templates: strip enrichment from markdown on the server.
 *
 * Convention (no parallel files): enrichment lives in contiguous blockquote runs
 * whose first line starts with one of the ForgeKit callout emojis after `>`:
 *   💡 Lesson learned / Also / etc.
 *   📝 Example
 *   🔧 Guidance
 *
 * Those blocks are removed in "shell" mode. Everything else (headings, tables,
 * placeholders, non-enrichment blockquotes) is kept.
 */

/** First line of a blockquote run signals ForgeKit enrichment to strip in shell mode */
const ENRICHMENT_BLOCKQUOTE = /^\s*>\s*(💡|📝|🔧)/;

export const SHELL_MODE_PREAMBLE = `<!-- forgekit-template-mode: shell — long-form lessons, examples, and guidance callouts were stripped. Use getTemplate with mode \`full\` when you need the complete template. -->

`;

/**
 * Returns true if this blockquote run should be stripped in shell mode.
 */
export function isEnrichmentBlockquoteRun(firstLine: string): boolean {
  return ENRICHMENT_BLOCKQUOTE.test(firstLine);
}

/**
 * Strip enrichment blockquotes from a single markdown document. Single source of truth
 * remains the .md file on disk; this is computed at serve time.
 */
export function stripForgeKitTemplateToShell(markdown: string): string {
  const rawLines = markdown.split("\n");
  const lines = rawLines.map((l) => l.replace(/\r$/, ""));
  const out: string[] = [];
  let strippedAny = false;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*>/.test(line)) {
      const runStart = i;
      while (i < lines.length && /^\s*>/.test(lines[i])) {
        i++;
      }
      const first = lines[runStart] ?? "";
      if (isEnrichmentBlockquoteRun(first)) {
        strippedAny = true;
        // Collapse removed run to at most one blank line to avoid double gaps
        if (out.length > 0 && out[out.length - 1] !== "") {
          out.push("");
        }
      } else {
        for (let j = runStart; j < i; j++) {
          out.push(lines[j]);
        }
      }
      continue;
    }
    out.push(line);
    i++;
  }

  // Trim excessive trailing blank lines
  while (out.length > 0 && out[out.length - 1] === "") {
    out.pop();
  }

  const body = out.join("\n").replace(/\n{3,}/g, "\n\n");
  if (!strippedAny) {
    return body;
  }
  return SHELL_MODE_PREAMBLE + body;
}
