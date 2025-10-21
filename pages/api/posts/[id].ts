import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getPostById } from "@/lib/posts";

const postsDir = path.join(process.cwd(), "content", "posts");

function requireAuth(req: NextApiRequest, res: NextApiResponse): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return true;
  const provided = req.headers["x-admin-token"];
  if (typeof provided === "string" && provided === token) return true;
  res.status(401).json({ error: "Unauthorized" });
  return false;
}

function formatBlogDate(d: Date): string {
  const month = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

function toFrontMatter(data: any): string {
  const esc = (s: any) => String(s ?? "").replace(/"/g, '\\"');
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  if (req.method === "GET") {
    const post = await getPostById(id);
    if (!post) return res.status(404).json({ error: "not found" });
    try {
      const filePath = path.join(postsDir, `${id}.md`);
      const raw = fs.readFileSync(filePath, "utf8");
      const fmBlock = /^---\s*[\s\S]*?^---(?:\s+|$)/m;
      const body = fmBlock.test(raw)
        ? raw.replace(fmBlock, "").replace(/^\r?\n/, "")
        : raw;
      return res.status(200).json({ ...post, raw, body });
    } catch {
      return res.status(200).json(post);
    }
  }

  if (req.method === "PUT") {
    if (!requireAuth(req, res)) return;
    try {
      const existing = await getPostById(id);
      if (!existing) return res.status(404).json({ error: "not found" });

      const {
        title,
        content,
        excerpt,
        cover,
        tags,
        authorName,
        authorAvatar,
        draft,
        publishAt,
      } = req.body || {};
      const next = {
        id,
        title: title ?? existing.title,
        excerpt: excerpt ?? existing.excerpt,
        date: formatBlogDate(new Date()),
        draft: typeof draft === "boolean" ? draft : existing.draft ?? false,
        publishAt:
          typeof publishAt === "string" && publishAt.trim()
            ? publishAt
            : existing.publishAt,
        cover: cover ?? existing.cover,
        tags: Array.isArray(tags) ? tags : existing.tags,
        authorName: authorName ?? existing.author?.name,
        authorAvatar: authorAvatar ?? existing.author?.avatarSrc,
      } as any;

      const front = toFrontMatter(next);
      let body: string;
      if (typeof content === "string") {
        const withMaybeFm = String(content);
        const fmBlock = /^---\s*[\s\S]*?^---(?:\s+|$)/m;
        body = fmBlock.test(withMaybeFm)
          ? withMaybeFm.replace(fmBlock, "").replace(/^\r?\n/, "")
          : withMaybeFm;
      } else {
        const fileRaw = fs.readFileSync(
          path.join(postsDir, `${id}.md`),
          "utf8"
        );
        const parts = fileRaw.split(/^---\s*$/m);
        body =
          parts.length >= 3
            ? parts.slice(2).join("\n---\n").trimStart()
            : parts[1] || "";
      }
      const filePath = path.join(postsDir, `${id}.md`);
      fs.writeFileSync(filePath, front + String(body), "utf8");
      return res.status(200).json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || "failed to update" });
    }
  }

  if (req.method === "DELETE") {
    if (!requireAuth(req, res)) return;
    try {
      const filePath = path.join(postsDir, `${id}.md`);
      if (!fs.existsSync(filePath))
        return res.status(404).json({ error: "not found" });
      fs.unlinkSync(filePath);
      return res.status(200).json({ ok: true });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || "failed to delete" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).end("Method Not Allowed");
}
