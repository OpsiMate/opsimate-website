import { BlogListItem } from "@/components/BlogSection";

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

export function formatPostDate(dateString: string): string {
  const d = new Date(dateString);
  return isNaN(d.getTime())
    ? dateString
    : d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
}

export function mapPostsToBlogListItems(posts: Post[]): BlogListItem[] {
  return posts.map((p) => ({
    id: p.id,
    title: p.title,
    summary: p.excerpt || "",
    date: formatPostDate(p.publishAt || p.date),
    cover: p.cover,
    tags: p.tags || [],
    author: { name: p.author?.name || "" },
    publishAt: p.publishAt ?? null,
  }));
}
