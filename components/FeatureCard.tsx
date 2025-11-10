import React, { CSSProperties, ReactNode, forwardRef } from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  title: ReactNode;
  description: ReactNode;
  ctaHref: string;
  ctaText: string;
  media: ReactNode;
  className?: string;
  isSlideChanging?: boolean;
  leftWrapperStyle?: CSSProperties;
  leftContentStyle?: CSSProperties;
  leftContentRef?: React.Ref<HTMLDivElement>;
  children?: ReactNode;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(({
  title,
  description,
  ctaHref,
  ctaText,
  media,
  className = '',
  isSlideChanging = false,
  leftWrapperStyle,
  leftContentStyle,
  leftContentRef,
  children,
}, ref) => {
  const isExternal = /^https?:\/\//.test(ctaHref);

  return (
    <div
      ref={ref}
      className={`relative isolate overflow-hidden border-2 border-surface-900 dark:border-white/20 bg-[#fdfbf7] dark:bg-surface-900 text-surface-900 dark:text-surface-50 shadow-[12px_12px_0_rgba(15,15,15,0.08)] p-6 md:p-10 lg:p-14 pb-28 md:pb-32 md:h-[520px] lg:h-[560px] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-multiply"
        style={{
          backgroundImage: 'linear-gradient(90deg, rgba(15,15,15,0.08) 1px, transparent 1px), linear-gradient(rgba(15,15,15,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute -right-16 -top-16 h-32 w-32 border-2 border-surface-900 dark:border-white/30 bg-[#0a5ad4] opacity-30 rotate-[25deg]" aria-hidden />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 overflow-hidden">
          <div className="flex items-center gap-4 text-[11px] tracking-[0.45em] uppercase text-[#0a5ad4] dark:text-[#7cc6ff]">
            <span className="h-px flex-1 bg-[#0a5ad4]/60 dark:bg-[#7cc6ff]/60" aria-hidden />
            <span>O P S I M A T E</span>
          </div>
          <div
            className={`mt-6 transition-all duration-500 will-change-transform ease-[cubic-bezier(0.22,0.61,0.36,1)] ${isSlideChanging ? 'opacity-0 -translate-x-8 blur-sm' : 'opacity-100 translate-x-0 blur-0'}`}
            style={leftWrapperStyle}
          >
            <div
              ref={leftContentRef}
              style={leftContentStyle}
            >
              <h2 className="text-[32px] sm:text-5xl md:text-6xl font-black font-sans uppercase tracking-[0.08em] text-surface-900 dark:text-white leading-[1.05]">
                {title}
              </h2>
              <p className="mt-6 text-base sm:text-lg leading-relaxed tracking-wide text-surface-600 dark:text-surface-200 max-w-md font-source-sans">
                <span className="inline">{description}</span>
                <Link
                  href={ctaHref}
                  className="ml-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-semibold text-[#0a5ad4] dark:text-[#7cc6ff] border-b-2 border-current pb-0.5"
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span>{ctaText}</span>
                  <span aria-hidden className="text-sm leading-none">↗</span>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 hidden lg:block">
          {media}
        </div>
      </div>

      {children}
    </div>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;
