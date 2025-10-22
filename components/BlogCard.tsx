import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

interface AuthorInfo {
  name: string;
  avatarSrc?: string;
}

interface BlogCardProps {
  title: string;
  excerpt: string;
  href: string;
  date: string;
  imageSrc?: string;
  tags?: string[];
  author?: AuthorInfo;
  className?: string;
  onTagClick?: (tag: string) => void;
  badgeLabel?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  excerpt,
  href,
  date,
  imageSrc,
  tags = [],
  author,
  className = "",
  onTagClick,
  badgeLabel,
}) => {
  return (
    <article
      className={`relative group overflow-hidden rounded-2xl border border-surface-200/70 dark:border-surface-800 bg-white/60 dark:bg-surface-900/30 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col ${className}`}
    >
      <div
        className="relative mb-4 overflow-hidden rounded-t-2xl bg-surface-100/60 dark:bg-surface-800/60"
        style={{ aspectRatio: "16/9" }}
      >
        {badgeLabel && (
          <div className="absolute top-2 left-2 z-10">
            <span className="px-2 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800">
              {badgeLabel}
            </span>
          </div>
        )}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-surface-700 dark:via-surface-700/80 dark:to-surface-600" />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.12] dark:opacity-[0.08]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(0,0,0,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.45) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/25 via-indigo-500/25 to-purple-500/25 blur-sm opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <div className="relative flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-surface-900/40 border border-white/40 dark:border-white/10 shadow-lg">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 ring-1 ring-inset ring-blue-500/20">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="leading-tight">
                    <div className="text-[11px] uppercase tracking-widest font-semibold text-blue-700/80 dark:text-blue-300/90">
                      Text-only
                    </div>
                    <div className="text-sm font-medium text-surface-700 dark:text-surface-200">
                      Article
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-900/10 to-transparent dark:from-black/30" />
      </div>

      <div className="px-4 md:px-5 pb-5 flex flex-col h-full">
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, idx) =>
              onTagClick ? (
                <button
                  type="button"
                  key={`${tag}-${idx}`}
                  onClick={() => onTagClick(tag)}
                  className="text-xs font-medium px-2 py-1 rounded-md bg-surface-200 text-surface-700 hover:bg-surface-300 dark:bg-surface-700 dark:text-surface-300 dark:hover:bg-surface-600 transition-colors"
                >
                  {tag}
                </button>
              ) : (
                <span
                  key={tag}
                  className="text-xs font-medium px-2 py-1 rounded-md bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        )}

        <h3 className="text-xl font-semibold tracking-tight text-surface-900 dark:text-surface-100 mb-2">
          <Link
            href={href}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 rounded"
            aria-label={title}
          >
            {title}
          </Link>
        </h3>

        <p className="text-sm text-surface-700/80 dark:text-surface-300/80 leading-relaxed mb-4">
          {excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-200/70 dark:border-surface-700/70">
          <div className="flex items-center gap-3">
            {author?.avatarSrc ? (
              <img
                src={author.avatarSrc}
                alt={author.name}
                loading="lazy"
                decoding="async"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-surface-200 dark:bg-surface-700 flex items-center justify-center text-xs font-semibold text-surface-600 dark:text-surface-300">
                {author?.name ? author.name.charAt(0).toUpperCase() : ""}
              </div>
            )}
            <div className="text-xs">
              {author?.name && (
                <div className="font-medium text-surface-900 dark:text-surface-100">
                  {author.name}
                </div>
              )}
              <time
                className="text-surface-500 dark:text-surface-400"
                dateTime={date}
              >
                {date}
              </time>
            </div>
          </div>

          <Link
            href={href}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors px-3 py-1.5 rounded-md bg-blue-50/60 hover:bg-blue-100/70 dark:bg-blue-500/10 dark:hover:bg-blue-500/15 border border-blue-200/60 dark:border-blue-500/20"
            aria-label={`Read more: ${title}`}
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
