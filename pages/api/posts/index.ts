import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/posts";

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

function generateRandomNumericId(): string {
  const n = Math.floor(100_000_000 + Math.random() * 900_000_000);
  return String(n);
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
  if (req.method === "GET") {
    const posts = await getAllPosts();
    return res.status(200).json(posts);
  }

  if (req.method === "POST") {
    if (!requireAuth(req, res)) return;
    try {
      const {
        title,
        content,
        excerpt,
        date,
        cover,
        tags,
        authorName,
        authorAvatar,
        draft,
        publishAt,
      } = req.body || {};
      if (!title || !content) {
        return res
          .status(400)
          .json({ error: "title and content are required" });
      }
      if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
      let candidate = generateRandomNumericId();
      let attempts = 0;
      while (
        fs.existsSync(path.join(postsDir, `${candidate}.md`)) &&
        attempts < 50
      ) {
        candidate = generateRandomNumericId();
        attempts++;
      }
      const baseId = candidate;
      const filePath = path.join(postsDir, `${baseId}.md`);
      if (fs.existsSync(filePath)) {
        return res.status(409).json({ error: "post with id already exists" });
      }
      const nowDate = formatBlogDate(new Date());
      const front = toFrontMatter({
        id: baseId,
        title,
        excerpt,
        date: date || nowDate,
        draft: typeof draft === "boolean" ? draft : false,
        publishAt:
          typeof publishAt === "string" && publishAt.trim()
            ? publishAt
            : undefined,
        cover,
        tags,
        authorName,
        authorAvatar,
      });
      fs.writeFileSync(filePath, front + String(content), "utf8");
      return res.status(201).json({ id: baseId });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || "failed to create" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}
