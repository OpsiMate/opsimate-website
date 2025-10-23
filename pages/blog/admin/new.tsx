import React, { useMemo, useState } from "react";
import type { GetServerSideProps } from "next";
import { requireAdminPage } from "@/lib/auth";
import Layout from "@/components/Layout";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles } from "lucide-react";
import { adminLogout, adminCsrfHeader } from "@/lib/api-utils";
import { useRouter } from "next/router";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [cover, setCover] = useState("");
  const [tags, setTags] = useState<string>("");
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [content, setContent] = useState("");
  const [draft, setDraft] = useState<boolean>(false);
  const [publishAtLocal, setPublishAtLocal] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const logout = () => adminLogout();

  const nowLocal = useMemo(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const body = {
        title,
        excerpt,
        cover,
        tags: Array.from(
          new Set(
            tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          )
        ).slice(0, 20),
        authorName,
        authorAvatar,
        draft,
        publishAt: publishAtLocal.trim()
          ? (() => {
              const date = new Date(publishAtLocal);
              if (isNaN(date.getTime())) {
                throw new Error("Invalid publish date");
              }
              return date.toISOString();
            })()
          : undefined,
        content,
      };

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...adminCsrfHeader(),
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(
          msg.length < 200 && !msg.includes("\n")
            ? msg
            : "Failed to create post"
        );
      }
      try {
        const { id } = await res.json();
        await router.push(`/blog/admin/${id}`);
      } catch {
        window.location.assign("/blog/admin");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="New Post" description="Create a new post">
      <section className="py-10">
        <div className="container-max">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-surface-100">
                New Post
              </h1>
              <p className="text-sm text-surface-600 dark:text-surface-400">
                Publish fresh content to your blog.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/blog/admin"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
              >
                <ArrowLeft aria-hidden="true" className="w-4 h-4" /> Back
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700"
              >
                Logout
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-4 dark:bg-red-950/30 dark:border-red-900"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={submit}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            aria-busy={saving}
          >
            <div className="lg:col-span-2 rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-5 shadow-sm">
              <div className="grid gap-4">
                <label className="grid gap-1">
                  <span className="text-sm font-medium">Title</span>
                  <input
                    className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </label>
                <div className="text-xs text-surface-600 dark:text-surface-400">
                  Post ID will be generated automatically.
                </div>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">Excerpt</span>
                  <textarea
                    className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={3}
                  />
                </label>
                <label className="grid gap-1">
                  <span className="text-sm font-medium">
                    Content (Markdown)
                  </span>
                  <textarea
                    className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={16}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-5 shadow-sm space-y-4">
              <div>
                <div className="text-sm font-semibold mb-2">Meta</div>
                <div className="grid gap-3">
                  <div className="text-xs text-surface-600 dark:text-surface-400">
                    Use Draft to hide from public. Optionally schedule with
                    Publish At.
                  </div>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={draft}
                      onChange={(e) => setDraft(e.target.checked)}
                    />
                    <span className="text-sm">Draft</span>
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm">
                      Publish At
                      <span className="text-xs font-normal text-surface-500 dark:text-surface-400">
                        {" "}
                        (optional)
                      </span>
                    </span>
                    <input
                      type="datetime-local"
                      min={nowLocal}
                      step="60"
                      className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={publishAtLocal}
                      onChange={(e) => setPublishAtLocal(e.target.value)}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm">
                      Cover URL{" "}
                      <span className="text-xs font-normal text-surface-500 dark:text-surface-400">
                        (optional)
                      </span>
                    </span>
                    <input
                      className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={cover}
                      onChange={(e) => setCover(e.target.value)}
                      aria-describedby="cover-help"
                      type="url"
                      inputMode="url"
                      autoComplete="off"
                    />
                    <div
                      id="cover-help"
                      className="text-[11px] text-surface-500 dark:text-surface-400"
                    >
                      {" "}
                      Optional. Leave blank for a text‑only card.
                    </div>
                  </label>
                  {cover && (
                    <img
                      src={cover}
                      alt={`Cover preview${title ? ` for “${title}”` : ""}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                      className="rounded-lg border border-surface-200 dark:border-surface-700 object-cover w-full max-h-40"
                    />
                  )}
                  <label className="grid gap-1">
                    <span className="text-sm">Tags (comma separated)</span>
                    <input
                      className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Author</div>
                <div className="grid gap-3">
                  <label className="grid gap-1">
                    <span className="text-sm">Author Name</span>
                    <input
                      className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm">
                      Author Avatar URL{" "}
                      <span className="text-xs font-normal text-surface-500 dark:text-surface-400">
                        (optional)
                      </span>
                    </span>
                    <input
                      className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                      value={authorAvatar}
                      onChange={(e) => setAuthorAvatar(e.target.value)}
                      type="url"
                      inputMode="url"
                      autoComplete="off"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  disabled={saving}
                  type="submit"
                >
                  {saving ? (
                    <Sparkles
                      aria-hidden="true"
                      className="w-4 h-4 animate-pulse"
                    />
                  ) : (
                    <Save aria-hidden="true" className="w-4 h-4" />
                  )}{" "}
                  {saving ? "Saving…" : "Create"}
                </button>
                <Link
                  href="/blog/admin"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-900 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-800"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  requireAdminPage(ctx);
