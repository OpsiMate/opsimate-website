import React, { useMemo } from "react";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
import {
  getPostById,
  getAllPublishedPosts,
  isPostPublished,
  type Post as PostItem,
} from "@/lib/posts";
import Link from "next/link";

export const getStaticPaths: GetStaticPaths = async () => {
  const published = await getAllPublishedPosts();
  return {
    paths: published.map((p) => ({ params: { id: p.id } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{ post: PostItem }> = async (
  ctx
) => {
  const id = ctx.params?.id as string | undefined;
  if (!id) return { notFound: true };
  const post = await getPostById(id);
  if (!post) return { notFound: true };
  if (!isPostPublished(post)) return { notFound: true };
  const withDisplayDate = {
    ...post,
    date: post.publishAt || post.date,
    publishAt: post.publishAt ?? null,
  } as any;
  return { props: { post: withDisplayDate }, revalidate: 60 };
};

const BlogPostPage: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  const displayDate = useMemo(() => {
    const source = (post as any).publishAt || post.date;
    const d = new Date(source);
    if (isNaN(d.getTime())) return post.date;
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();
    const year = d.getFullYear();
    const hour = d.getHours();
    const minute = String(d.getMinutes()).padStart(2, "0");
    return `${month} ${day}, ${year} ${hour}:${minute}`;
  }, [post]);

  return (
    <Layout title={`OpsiMate Blog`} description={post.excerpt}>
      <Head>
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.cover && <meta property="og:image" content={post.cover} />}
      </Head>

      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link
                href="/#blog"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← Back to Blog
              </Link>
            </div>

            <header className="mb-6 text-center">
              {post.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2 py-1 rounded-md bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-surface-900 dark:text-surface-100 mb-3">
                {post.title}
              </h1>
              <div className="flex items-center justify-center gap-3 text-surface-600 dark:text-surface-400">
                {post.author?.avatarSrc ? (
                  <img
                    src={post.author.avatarSrc}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-xs font-semibold text-surface-600 dark:text-surface-300">
                    {post.author?.name
                      ? post.author.name.charAt(0).toUpperCase()
                      : ""}
                  </div>
                )}
                <span className="text-sm font-medium">{post.author?.name}</span>
                <span className="text-surface-300 dark:text-surface-600">
                  •
                </span>
                <span className="text-sm">{displayDate}</span>
              </div>
            </header>

            {post.cover && (
              <div
                className="rounded-2xl overflow-hidden shadow-lg border border-surface-200 dark:border-surface-700 bg-surface-100 dark:bg-surface-800 mb-8"
                style={{ aspectRatio: "16/9" }}
              >
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex items-center justify-end mb-6">
              <button
                type="button"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(window.location.href);
                  } catch {}
                }}
                className="px-3 py-2 rounded-lg border text-sm font-medium bg-white text-surface-700 border-surface-200 hover:bg-surface-100 transition-colors dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
              >
                Copy link
              </button>
            </div>

            <article className="feature-card p-6 md:p-10">
              <div
                className="prose prose-slate dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPostPage;
