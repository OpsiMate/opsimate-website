import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { getPostById } from "@/lib/posts.server";
import fm from "front-matter";
import {
  requireAuth,
  formatBlogDate,
  toFrontMatter,
  normalizeFrontMatter,
} from "@/lib/api-utils";

const postsDir = path.join(process.cwd(), "content", "posts");

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
      const normalized = normalizeFrontMatter(raw);
      const parsed = fm<any>(normalized);
      const body = parsed?.body ?? "";
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
        date:
          typeof req.body?.date === "string" ? req.body.date : existing.date,
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
        const normalized = normalizeFrontMatter(withMaybeFm);
        const parsed = fm<any>(normalized);
        body = parsed?.body ?? withMaybeFm;
      } else {
        const fileRaw = fs.readFileSync(
          path.join(postsDir, `${id}.md`),
          "utf8"
        );
        const normalized = normalizeFrontMatter(fileRaw);
        const parsed = fm<any>(normalized);
        body = parsed?.body ?? "";
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
