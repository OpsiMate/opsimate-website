import type { NextApiRequest, NextApiResponse } from "next";

export function requireAuth(
  req: NextApiRequest,
  res: NextApiResponse
): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    res
      .status(500)
      .json({ error: "Server misconfigured: ADMIN_TOKEN not set" });
    return false;
  }
  const provided = req.headers["x-admin-token"];
  const headerToken = Array.isArray(provided)
    ? provided[0]
    : typeof provided === "string"
    ? provided
    : undefined;
  const cookieToken = (req as any).cookies?.["admin_token"] as
    | string
    | undefined;
  if (headerToken === token) return true;
  if (cookieToken === token) return true;
  res.status(401).json({ error: "Unauthorized" });
  return false;
}

export function formatBlogDate(d: Date): string {
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function toFrontMatter(data: any): string {
  const esc = (s: any) =>
    String(s ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"');
  const tags: string[] = Array.isArray(data.tags) ? data.tags : [];
  const authorName = data.authorName ?? data.author?.name ?? "";
  const authorAvatar = data.authorAvatar ?? data.author?.avatarSrc ?? undefined;
  const lines = [
    "---",
    `id: "${esc(data.id)}"`,
    `title: "${esc(data.title)}"`,
    data.excerpt ? `excerpt: "${esc(data.excerpt)}"` : undefined,
    data.date ? `date: "${esc(data.date)}"` : undefined,
    typeof data.draft === "boolean" ? `draft: ${data.draft}` : undefined,
    data.publishAt ? `publishAt: "${esc(data.publishAt)}"` : undefined,
    data.cover ? `cover: "${esc(data.cover)}"` : undefined,
    `tags: [${tags.map((t) => `"${esc(t)}"`).join(", ")}]`,
    "author:",
    `  name: "${esc(authorName)}"`,
    authorAvatar ? `  avatarSrc: "${esc(authorAvatar)}"` : undefined,
    "---",
    "",
  ].filter((v) => v !== undefined) as string[];
  return lines.join("\n");
}

export function normalizeFrontMatter(raw: string): string {
  const re = /^---\s*$[\s\S]*?^---\s*(\r?\n|$)/m;
  const match = raw.match(re);
  if (!match) return raw;
  // If a newline already follows the closing marker, nothing to do.
  if (match[1] && match[1].length > 0) return raw;
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  return raw.replace(re, (full) => full + eol);
}
