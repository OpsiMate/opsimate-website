import React from "react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "../components/Layout";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import IntegrationsSection from "../components/IntegrationsSection";
import CTASection from "../components/CTASection";
import BlogSection, { BlogListItem } from "@/components/BlogSection";
import { getAllPublishedPosts } from "@/lib/posts";

export const getStaticProps: GetStaticProps<{ posts: BlogListItem[] }> = async () => {
  const all = await getAllPublishedPosts();
  const fmt = (s: string) => {
    const d = new Date(s);
    return isNaN(d.getTime())
      ? s
      : d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  const posts: BlogListItem[] = all.map((p) => ({
    id: p.id,
    title: p.title,
    summary: p.excerpt || "",
    date: fmt(p.publishAt || p.date),
    cover: p.cover,
    tags: p.tags || [],
    author: { name: p.author?.name || "" },
    publishAt: p.publishAt ?? null,
  }));
  return { props: { posts }, revalidate: 60 };
};

const HomePage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
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
