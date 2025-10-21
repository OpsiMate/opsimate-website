import type { Post } from "./posts";

function xmlEscape(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date: Date): string {
  return date.toUTCString();
}

export function buildRssXml(params: {
  siteUrl: string;
  title: string;
  description: string;
  posts: Post[];
}): string {
  const { siteUrl, title, description, posts } = params;
  const now = new Date();
  const channelLink = siteUrl.replace(/\/$/, "");
  const selfLink = `${channelLink}/feed.xml`;

  const items = posts
    .map((p) => {
      const url = `${channelLink}/blog/${encodeURIComponent(p.id)}`;
      const pub = new Date(p.date);
      const pubDate = isNaN(pub.getTime()) ? rfc822(now) : rfc822(pub);
      const guid = url;
      const descriptionCdata = p.excerpt
        ? `<![CDATA[${p.excerpt}]]>`
        : `<![CDATA[${p.title}]]>`;
      const contentCdata = p.contentHtml
        ? `<![CDATA[${p.contentHtml}]]>`
        : descriptionCdata;
      const author = p.author?.name ? `<author>${xmlEscape(p.author.name)}</author>` : "";
      const categories = Array.isArray(p.tags)
        ? p.tags.map((t) => `<category>${xmlEscape(t)}</category>`).join("")
        : "";
      return `
        <item>
          <title>${xmlEscape(p.title)}</title>
          <link>${url}</link>
          <guid isPermaLink="true">${guid}</guid>
          <pubDate>${pubDate}</pubDate>
          ${author}
          ${categories}
          <description>${descriptionCdata}</description>
          <content:encoded>${contentCdata}</content:encoded>
        </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xmlEscape(title)}</title>
    <link>${channelLink}</link>
    <description>${xmlEscape(description)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(now)}</lastBuildDate>
    <atom:link href="${selfLink}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}

export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  const base = env && env.trim().length > 0 ? env : "http://localhost:3000";
  return base.replace(/\/$/, "");
}

