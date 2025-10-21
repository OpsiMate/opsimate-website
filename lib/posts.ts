import fs from "fs";
import path from "path";
import fm from "front-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostAuthor = {
  name: string;
  avatarSrc?: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt?: string;
  date: string;
  draft?: boolean;
  publishAt?: string;
  imageSrc?: string;
  cover?: string;
  tags: string[];
  author: PostAuthor;
  contentHtml: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getPostById(id: string): Promise<Post | null> {
  const fullPath = path.join(postsDir, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const raw0 = fs.readFileSync(fullPath, "utf8");
  const raw = raw0.replace(/(^---[\s\S]*?^---)(?!\r?\n)/m, "$1\n");
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
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    author: data.author ? (data.author as PostAuthor) : { name: "" },
    contentHtml,
  };
  return post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(slugs.map((s) => getPostById(s)));
  const list = posts.filter(Boolean) as Post[];
  return list.sort((a, b) => {
    const ad = new Date(a.publishAt || a.date).getTime();
    const bd = new Date(b.publishAt || b.date).getTime();
    return isNaN(bd - ad) ? 0 : bd - ad;
  });
}

export function isPostPublished(post: Post, now: Date = new Date()): boolean {
  if (post.draft) return false;
  if (post.publishAt) {
    const when = new Date(post.publishAt);
    if (!isNaN(when.getTime())) {
      return when.getTime() <= now.getTime();
    }
  }
  return true;
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => isPostPublished(p));
}
