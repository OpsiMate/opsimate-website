import fs from "fs";
import path from "path";
import fm from "front-matter";
import { remark } from "remark";
import html from "remark-html";
import { normalizeFrontMatter } from "@/lib/api-utils";
import type { Post } from "@/lib/posts";

const postsDir = path.join(process.cwd(), "content", "posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostById(id: string): Promise<Post | null> {
  const fullPath = path.resolve(postsDir, `${id}.md`);
  const postsRoot = path.resolve(postsDir) + path.sep;
  if (!fullPath.startsWith(postsRoot)) return null; // reject traversal
  if (!fs.existsSync(fullPath)) return null;
  const raw0 = fs.readFileSync(fullPath, "utf8");
  const raw = normalizeFrontMatter(raw0);
  const parsed = fm<any>(raw);

  const processed = await remark().use(html).process(parsed.body);
  const contentHtml = processed.toString();

  const data = parsed.attributes || {};
  const post: Post = {
    id: String(data.id ?? id),
    title: String(data.title ?? "Untitled"),
    excerpt: typeof data.excerpt === "string" ? String(data.excerpt) : "",
    date: String(data.date ?? ""),
    draft:
      typeof data.draft === "boolean"
        ? data.draft
        : typeof data.draft === "string"
        ? data.draft.toLowerCase() === "true"
        : false,
    publishAt:
      typeof data.publishAt === "string" && data.publishAt.trim().length > 0
        ? String(data.publishAt)
        : undefined,
    imageSrc:
      typeof data.imageSrc === "string"
        ? String(data.imageSrc)
        : typeof data.cover === "string"
        ? String(data.cover)
        : "",
    cover:
      typeof data.cover === "string"
        ? String(data.cover)
        : typeof data.imageSrc === "string"
        ? String(data.imageSrc)
        : "",
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: {
      name: data?.author?.name ? String(data.author.name) : "",
      avatarSrc: data?.author?.avatarSrc
        ? String(data.author.avatarSrc)
        : undefined,
    },
    contentHtml,
  };
  return post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((s) => getPostById(s)));
  const list = posts.filter(Boolean) as Post[];
  return list.sort((a, b) => {
    const ad = Date.parse(a.publishAt || a.date);
    const bd = Date.parse(b.publishAt || b.date);
    if (isNaN(ad) && isNaN(bd)) return b.id.localeCompare(a.id);
    if (isNaN(ad)) return 1;
    if (isNaN(bd)) return -1;
    return bd - ad; // newest first
  });
}

export function isPostPublished(post: Post, now: Date = new Date()): boolean {
  if (post.draft) return false;
  if (post.publishAt) {
    const when = new Date(post.publishAt);
    if (isNaN(when.getTime())) return false;
    return when.getTime() <= now.getTime();
  }
  return true;
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => isPostPublished(p));
}
