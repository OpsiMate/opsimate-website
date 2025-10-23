import React, { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import { requireAdminPage } from "@/lib/auth";
import Link from "next/link";
import Layout from "@/components/Layout";
import {
  FilePlus2,
  Eye,
  PencilLine,
  Trash2,
  RefreshCw,
  ImageOff,
} from "lucide-react";
import { formatPostDate } from "@/lib/posts";
import type { Post } from "@/lib/posts";
import { adminLogout, adminCsrfHeader } from "@/lib/api-utils";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const logout = () => adminLogout();

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/posts");
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Post[];
      setPosts(data);
    } catch (e: any) {
      setError(e?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    if (deleting) return;
    setDeleting(id);
    setError(null);
    const res = await fetch(`/api/admin/posts/${id}`, {
      method: "DELETE",
      headers: {
        ...adminCsrfHeader(),
      },
    });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } else {
      const errorText = await res.text().catch(() => "Unknown error");
      setError(`Failed to delete post: ${errorText}`);
    }
    setDeleting(null);
  };

  return (
    <Layout title="Blog Admin" description="Create and manage posts">
      <section className="py-10">
        <div className="container-max">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100">
                Blog Admin
              </h1>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Create, edit, and organize your posts.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={load}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
                aria-label="Refresh"
              >
                <RefreshCw className="w-4 h-4" /> Refresh
              </button>
              <Link
                href="/blog/admin/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              >
                <FilePlus2 className="w-4 h-4" /> New Post
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
              >
                Logout
              </button>
            </div>
          </div>

          {loading && (
            <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-6 bg-white dark:bg-surface-800">
              Loading…
            </div>
          )}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 p-4 dark:bg-red-950/30 dark:border-red-900">
              {error}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="rounded-xl border border-surface-200 dark:border-surface-700 p-10 bg-white dark:bg-surface-800 text-center">
              <div className="text-lg font-semibold mb-1">No posts yet</div>
              <p className="text-surface-600 dark:text-surface-400 mb-4">
                Create your first post to get started.
              </p>
              <Link
                href="/blog/admin/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                <FilePlus2 className="w-4 h-4" /> New Post
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            {posts.map((p) => (
              <div
                key={p.id}
                className="group flex items-center justify-between rounded-xl border p-4 bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 min-w-0">
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt="cover"
                      className="w-14 h-14 rounded-md object-cover border border-surface-200 dark:border-surface-700"
                    />
                  ) : (
                    <div
                      className="relative w-14 h-14 rounded-md overflow-hidden border border-surface-200 dark:border-surface-700"
                      role="img"
                      aria-label="No cover image"
                      title="No cover image"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-600" />
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-[0.10] dark:opacity-[0.08]"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, rgba(0,0,0,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.45) 1px, transparent 1px)",
                          backgroundSize: "10px 10px",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ImageOff className="w-5 h-5 text-surface-500 dark:text-surface-300" />
                      </div>
                      <span className="sr-only">No cover image</span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-semibold truncate text-surface-900 dark:text-surface-100">
                      {p.title}
                    </div>
                    <div className="text-xs text-surface-500 truncate">
                      {p.id}
                    </div>
                    <div className="text-xs text-surface-500">
                      {(() => {
                        const s = p.publishAt || p.date;
                        return formatPostDate(s);
                      })()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const now = Date.now();
                    const pub = p.publishAt
                      ? new Date(p.publishAt).getTime()
                      : undefined;
                    const isDraft = !!p.draft;
                    const scheduled =
                      !isDraft && typeof pub === "number" && pub > now;
                    const label = isDraft
                      ? "Draft"
                      : scheduled
                      ? "Scheduled"
                      : "Published";
                    const cls = isDraft
                      ? "text-surface-600 border-surface-300 dark:text-surface-300 dark:border-surface-600"
                      : scheduled
                      ? "text-amber-700 border-amber-200 dark:text-amber-300 dark:border-amber-800"
                      : "text-green-700 border-green-200 dark:text-green-300 dark:border-green-800";
                    return (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md border text-xs ${cls}`}
                      >
                        {label}
                      </span>
                    );
                  })()}
                  {(() => {
                    const now = Date.now();
                    const pub = p.publishAt
                      ? new Date(p.publishAt).getTime()
                      : NaN;
                    const isScheduled = !p.draft && !isNaN(pub) && pub > now;
                    const showView = !p.draft && !isScheduled;
                    return showView ? (
                      <Link
                        href={`/blog/${p.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
                        aria-label={`View ${p.title}`}
                      >
                        <Eye className="w-4 h-4" />{" "}
                        <span className="hidden sm:inline">View</span>
                      </Link>
                    ) : null;
                  })()}
                  <Link
                    href={`/blog/admin/${p.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
                    aria-label={`Edit ${p.title}`}
                  >
                    <PencilLine className="w-4 h-4" />{" "}
                    <span className="hidden sm:inline">Edit</span>
                  </Link>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900/50 dark:hover:bg-red-950/30"
                    aria-label={`Delete ${p.title}`}
                  >
                    <Trash2 className="w-4 h-4" />{" "}
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  requireAdminPage(ctx);
