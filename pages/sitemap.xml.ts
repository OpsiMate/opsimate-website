import type { GetServerSideProps } from "next";
import { getAllPublishedPosts } from "@/lib/posts.server";
import { getSiteUrl } from "@/lib/rss";

const STATIC_PATHS = ["", "/about", "/blog", "/privacy", "/terms"];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = getSiteUrl();
  const posts = await getAllPublishedPosts();
  const urls = [
    ...STATIC_PATHS.map((p) => `${siteUrl}${p}`),
    ...posts.map((p) => `${siteUrl}/blog/${p.id}`),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
