import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "@/components/Layout";
import BlogSection, { BlogListItem } from "@/components/BlogSection";
import { getAllPublishedPosts } from "@/lib/posts.server";
import { mapPostsToBlogListItems } from "@/lib/posts";

export const getStaticProps: GetStaticProps<{
  posts: BlogListItem[];
}> = async () => {
  const all = await getAllPublishedPosts();
  const posts: BlogListItem[] = mapPostsToBlogListItems(all);
  return { props: { posts }, revalidate: 60 };
};

const BlogIndexPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ posts }) => {
  return (
    <Layout title="OpsiMate Blog" description="All OpsiMate blog posts">
      <BlogSection posts={posts} showViewAllLink={false} />
    </Layout>
  );
};

export default BlogIndexPage;
