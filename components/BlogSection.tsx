import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BlogCard from "./BlogCard";

export interface BlogListItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  cover?: string;
  tags: string[];
  author: { name: string };
  publishAt?: string | null;
}

interface Props {
  posts: BlogListItem[];
  showViewAllLink?: boolean;
}

const BlogSection: React.FC<Props> = ({ posts, showViewAllLink = true }) => {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const pageSize = 8;

  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let list = posts;
    if (selectedTag !== "All") {
      list = list.filter((p) => (p.tags || []).includes(selectedTag));
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => {
        const hay = `${p.title} ${p.summary} ${(p.tags || []).join(
          " "
        )}`.toLowerCase();
        return hay.includes(q);
      });
    }
    return list;
  }, [posts, selectedTag, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const pageItems = filteredPosts.slice(pageStart, pageStart + pageSize);

  useEffect(() => {
    setPage(1);
  }, [selectedTag, query]);

  return (
    <section id="blog" className="py-16 features-section">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-surface-100 mb-3">
            Latest From the <span className="gradient-text">OpsiMate</span> Team
          </h2>
          <p className="text-sm md:text-base text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Deep dives, product updates, and practical guides to help you
            monitor, automate, and run your infrastructure with confidence.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="w-full md:max-w-sm">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 px-3 py-2 pl-9 outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search posts"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                🔎
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end">
            {allTags.map((tag) => {
              const isActive = tag === selectedTag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600 dark:bg-surface-200 dark:text-surface-900 dark:border-surface-200"
                      : "bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
                  }`}
                  aria-pressed={isActive}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pageItems.map((post, index) => {
            const badgeLabel = (() => {
              if (post.publishAt) {
                const t = new Date(post.publishAt).getTime();
                if (!isNaN(t) && t > Date.now()) return "Scheduled";
              }
              return undefined;
            })();
            return (
              <BlogCard
                key={index}
                title={post.title}
                excerpt={post.summary}
                href={`/blog/${post.id}`}
                date={post.date}
                imageSrc={post.cover}
                tags={post.tags}
                author={post.author}
                onTagClick={(tag) => setSelectedTag(tag)}
                badgeLabel={badgeLabel}
              />
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center text-surface-600 dark:text-surface-400 mt-6">
            No posts found for{" "}
            <span className="font-semibold">{selectedTag}</span>.
          </div>
        )}

        {filteredPosts.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 disabled:opacity-50 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const active = n === currentPage;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-pressed={active}
                  className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors ${
                    active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 disabled:opacity-50 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
            >
              Next
            </button>
          </div>
        )}

        {showViewAllLink && (
          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center px-4 py-2 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 transition-colors dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
            >
              View all blogs
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
