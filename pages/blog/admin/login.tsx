import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import type { GetServerSideProps } from "next";
import { getAdminLoginProps } from "@/lib/auth";

export const getServerSideProps: GetServerSideProps = async (ctx) =>
  getAdminLoginProps(ctx);

export default function AdminLoginPage({ loggedIn }: { loggedIn?: boolean }) {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) throw new Error((await res.text()) || "Login failed");
      router.push("/blog/admin");
    } catch (e: any) {
      setError(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Admin Login" description="Sign in to blog admin">
      <section className="py-12">
        <div className="container-max max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-surface-900 dark:text-surface-100">
            Admin Login
          </h1>
          {loggedIn ? (
            <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 text-green-800 p-5 dark:bg-green-950/30 dark:border-green-900 dark:text-green-300">
              <div className="font-semibold mb-1">You're logged in</div>
              <div className="text-sm mb-3">
                You already have an active admin session.
              </div>
              <div className="flex gap-2">
                <Link
                  href="/blog/admin"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Go to Admin
                </Link>
                <button
                  onClick={async () => {
                    setSigningOut(true);
                    try {
                      await fetch("/api/admin/logout", { method: "POST" });
                      router.replace("/blog/admin/login");
                    } finally {
                      setSigningOut(false);
                    }
                  }}
                  disabled={signingOut}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white text-surface-700 border-surface-200 hover:bg-surface-100 dark:bg-surface-800 dark:text-surface-300 dark:border-surface-700 dark:hover:bg-surface-700 disabled:opacity-50"
                >
                  {signingOut ? "Signing out…" : "Logout"}
                </button>
              </div>
            </div>
          ) : null}
          {!loggedIn && error && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-700 p-4 dark:bg-red-950/30 dark:border-red-900"
            >
              {error}
            </div>
          )}
          {!loggedIn && (
            <form
              onSubmit={submit}
              className="grid gap-4 rounded-2xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 p-5 shadow-sm"
            >
              <label className="grid gap-1">
                <span className="text-sm font-medium">Admin Token</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  className="rounded-lg border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-surface-100 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  required
                  autoFocus
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
