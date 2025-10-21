import type { GetServerSideProps } from "next";
import { getAllPublishedPosts } from "@/lib/posts";
import { buildRssXml, getSiteUrl } from "@/lib/rss";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const posts0 = await getAllPublishedPosts();
  const posts = posts0.map((p) => ({ ...p, date: p.publishAt || p.date }));
  const xml = buildRssXml({
    siteUrl: getSiteUrl(),
    title: "OpsiMate Blog",
    description: "All OpsiMate blog posts",
    posts,
  });

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=1800, stale-while-revalidate=86400");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function RSSFeed() {
  return null as unknown as JSX.Element;
}
