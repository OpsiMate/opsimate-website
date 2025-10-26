import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import IntegrationsSection from "../components/IntegrationsSection";
import CTASection from "../components/CTASection";
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

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Integrations Section */}
      <IntegrationsSection />

      {/* Blog Section */}
      <BlogSection posts={posts} />

      {/* Call to Action Section */}
      <CTASection />
    </Layout>
  );
};

export default HomePage;
