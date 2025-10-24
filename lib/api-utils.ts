export function normalizeFrontMatter(raw: string): string {
  const re = /^---\s*$[\s\S]*?^---\s*(\r?\n|$)/m;
  const match = raw.match(re);
  if (!match) return raw;
  if (match[1] && match[1].length > 0) return raw;
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  return raw.replace(re, (full) => full + eol);
}
