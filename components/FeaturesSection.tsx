import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import FeatureCard from './FeatureCard';

interface SlideSpec {
  heading: string;
  description: ReactNode;
  ctaHref: string;
  ctaText: string;
  imageSrc: string;
  imageAlt: string;
  mediaDurationMs?: number;
}

const FeaturesSection: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const [isSlideChanging, setIsSlideChanging] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const [leftScale, setLeftScale] = useState(1);
  const [leftScaledHeight, setLeftScaledHeight] = useState<number | null>(null);

  const slides = useMemo<SlideSpec[]>(() => {
    return [
      {
        heading: 'Unified Monitoring',
        description: 'Bring bare metal, Kubernetes, Lambda, and every third-party integration into one observability command center. Correlate metrics, logs, alerts, and automations from every tool to see the full impact of changes in real time.',
        ctaHref: 'https://opsimate.vercel.app/docs/core-features',
        ctaText: 'Learn more',
        imageSrc: '/images/unifiedMonitoring.jpg',
        imageAlt: 'Unified monitoring dashboard showing cross-platform telemetry',
        mediaDurationMs: 5000,
      },
      {
        heading: 'Infrastructure Management',
        description: 'Treat each provider as a living inventory of servers, clusters, and containers, and manage them from one menu. Drill into any provider to supervise the services it hosts, regardless of whether it is systemd, Docker, or Kubernetes based.',
        ctaHref: 'https://opsimate.vercel.app/docs/providers-services/overview',
        ctaText: 'Learn more',
        imageSrc: '/images/infrastructureManagement.jpg',
        imageAlt: 'Infrastructure management inventory view listing providers and services',
        mediaDurationMs: 5000,
      },
      {
        heading: 'Real-time Metrics',
        description: 'Use the main dashboard to watch health snapshots, search services, and launch controls without leaving the page. Real-time performance cards, logs, and filters keep every workload observable and actionable at a glance.',
        ctaHref: 'https://opsimate.vercel.app/docs/dashboards/overview',
        ctaText: 'Learn more',
        imageSrc: '/images/real-timeMetrics.jpg',
        imageAlt: 'Real-time performance metrics charts with live service data',
        mediaDurationMs: 5000,
      },
      {
        heading: 'Smart Alerts',
        description: 'Sync alert rules from Grafana and other providers, map them to service tags, and surface active states right inside the service menu. Alerts follow the same lifecycle as your external tools, so operators never miss a warning or acknowledgment.',
        ctaHref: 'https://opsimate.vercel.app/docs/alerts/adding-alerts',
        ctaText: 'Learn more',
        imageSrc: '/images/smartAlerts.jpg',
        imageAlt: 'Smart alerts panel with status badges and acknowledgment timeline',
        mediaDurationMs: 5000,
      },
      {
        heading: 'Log Aggregation',
        description: 'Wire up Grafana, Kibana, Datadog, or any preferred observability stack to stream monitoring data, logs, and actions into OpsiMate. Use integrations to pivot between dashboards, deep links, and remediation steps without context switching.',
        ctaHref: 'https://opsimate.vercel.app/docs/integrations/overview',
        ctaText: 'Learn more',
        imageSrc: '/images/logAggregation.jpg',
        imageAlt: 'Log aggregation feed combining events from multiple observability tools',
        mediaDurationMs: 5000,
      },
      {
        heading: 'Service Discovery',
        description: 'Start from any provider, pop open the contextual menu, and add the services you want under management. Automatic discovery plus guided selection keeps every container, systemd unit, or pod tied to the right owner and monitoring policy.',
        ctaHref: 'https://opsimate.vercel.app/docs/providers-services/services/add-services',
        ctaText: 'Learn more',
        imageSrc: '/images/serviceDiscovery.jpg',
        imageAlt: 'Service discovery workflow for selecting containers and pods',
        mediaDurationMs: 5000,
      },
      {
        heading: 'Automated Actions',
        description: 'The service menu brings start, stop, restart, force stop, log access, health checks, and scripted actions to a single drawer. Tailor controls per service type—systemd, Docker, or Kubernetes—to resolve incidents without hopping between shells.',
        ctaHref: 'https://opsimate.vercel.app/docs/dashboards/service-menu',
        ctaText: 'Learn more',
        imageSrc: '/images/automatedActions.jpg',
        imageAlt: 'Automated actions drawer with start stop restart service controls',
        mediaDurationMs: 5000,
      },
      {
        heading: 'Open Source',
        description: 'Clone the repo, install dependencies with pnpm, and run both client and server locally to extend the platform. Tests, linting, and a transparent workflow make it straightforward to contribute features or adapt OpsiMate to your stack.',
        ctaHref: 'https://opsimate.vercel.app/docs/development',
        ctaText: 'Learn more',
        imageSrc: '/images/openSource.jpg',
        imageAlt: 'Open source contributor guide highlighting repo setup steps',
        mediaDurationMs: 5000,
      },
    ];
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const syncPlayback = (event: MediaQueryListEvent) => {
      setIsPlaying(event.matches);
    };

    setIsPlaying(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncPlayback);
      return () => mediaQuery.removeEventListener('change', syncPlayback);
    }

    mediaQuery.addListener(syncPlayback);
    return () => mediaQuery.removeListener(syncPlayback);
  }, []);

  const copy = slides[slide];
  const slideCount = slides.length;
  const slideDurationMs = copy.mediaDurationMs ?? 5000;

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    if (!isPlaying) return;
    setProgress(0);
    const started = Date.now();
    progressRef.current = setInterval(() => {
      const t = Math.min(1, (Date.now() - started) / slideDurationMs);
      setProgress(t);
    }, 50);
    timerRef.current = setInterval(() => {
      setProgress(0);
      setIsSlideChanging(true);
      setSlide((s) => (s + 1) % slideCount);
      setTimeout(() => setIsSlideChanging(false), 250);
    }, slideDurationMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, slide, slideCount, slideDurationMs]);

  const jumpTo = (i: number) => {
    setIsSlideChanging(true);
    setSlide(i);
    setProgress(0);
    setTimeout(() => setIsSlideChanging(false), 250);
  };

  useEffect(() => {
    const recompute = () => {
      const hero = heroRef.current;
      const inner = leftContentRef.current;
      if (!hero || !inner) return;
      const styles = window.getComputedStyle(hero);
      const padT = parseFloat(styles.paddingTop || '0');
      const padB = parseFloat(styles.paddingBottom || '0');
      const availableH = hero.clientHeight - padT - padB - 8;
      const neededH = inner.scrollHeight;
      const sRaw = Math.min(1, availableH / neededH);
      const s = Number.isFinite(sRaw) && sRaw > 0 ? sRaw : 1;
      setLeftScale(s);
      setLeftScaledHeight(Math.round(neededH * s));
    };
    const id = requestAnimationFrame(recompute);
    const onResize = () => recompute();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
    };
  }, [slide]);

  return (
    <section id="features" className="py-24 bg-[#f4f1ea] dark:bg-surface-950">
      <div className="container-max space-y-6">
        <div className="flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.45em] text-surface-700 dark:text-surface-300">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 bg-[#0a5ad4]" />
            <span>Feature Catalogue</span>
          </div>
        </div>
        <FeatureCard
          ref={heroRef}
          title={copy.heading}
          description={copy.description}
          ctaHref={copy.ctaHref}
          ctaText={copy.ctaText}
          isSlideChanging={isSlideChanging}
          leftWrapperStyle={{ height: leftScaledHeight ?? undefined }}
          leftContentStyle={{ transform: `scale(${leftScale})`, transformOrigin: 'top left' }}
          leftContentRef={leftContentRef}
          media={(
            <div className="relative isolate border-2 border-surface-900 dark:border-white/20 bg-white dark:bg-surface-800 shadow-[14px_14px_0_rgba(15,15,15,0.08)] overflow-hidden p-4">
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#0a5ad4]" aria-hidden />
              <div className={`relative w-full aspect-video border border-dashed border-surface-900/40 dark:border-white/30 bg-surface-100 dark:bg-surface-900/40 p-4 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] will-change-transform ${isSlideChanging ? 'opacity-0 translate-y-6 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}`}>
                <Image
                  src={copy.imageSrc}
                  alt={copy.imageAlt}
                  fill
                  className="object-contain"
                  priority={slide === 0}
                  sizes="(min-width: 1024px) 36rem, 100vw"
                />
              </div>
            </div>
          )}
        >
        <div className="absolute left-6 right-6 bottom-3 flex flex-wrap items-center gap-4 lg:gap-6 bg-white/80 dark:bg-surface-900/80 border-2 border-surface-900 dark:border-white/20 px-4 py-3 shadow-[8px_8px_0_rgba(15,15,15,0.08)] backdrop-blur">
            <button aria-label="Previous" className="h-12 w-12 grid place-items-center border-2 border-surface-900 dark:border-white/20 bg-transparent text-surface-900 dark:text-white transition-colors hover:bg-surface-900 hover:text-white dark:hover:bg-white dark:hover:text-surface-900" onClick={() => { setIsSlideChanging(true); setSlide((s) => (s + slideCount - 1) % slideCount); setProgress(0); setTimeout(() => setIsSlideChanging(false), 250); }}>
              <span className="sr-only">Previous</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 15 5 9l6-6" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
            <div className="lg:flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] hidden">
              <button aria-label={isPlaying ? 'Pause' : 'Play'} className="h-10 w-10 grid place-items-center border-2 border-surface-900 dark:border-white/20" onClick={() => setIsPlaying((p) => !p)}>
                {isPlaying ? (
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M2 0v16M12 0v16" stroke="currentColor" strokeWidth="2"/></svg>
                ) : (
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2.4.22C1.92-.06 1.32-.07.83.2.34.47.64.98.64 1.53V14.47c0 .55.3 1.06.79 1.33.49.27 1.09.26 1.57-.02l10.89-6.47a1.52 1.52 0 0 0 0-2.62L2.4.22Z" fill="currentColor"/></svg>
                )}
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Slide ${i + 1}`}
                    onClick={() => jumpTo(i)}
                    className={`relative h-2 w-12 border border-surface-900/20 dark:border-white/30 overflow-hidden`}
                  >
                    <span
                      className={`absolute inset-y-0 left-0 bg-[#0a5ad4] transition-[width,opacity] duration-200 ${slide === i ? 'opacity-100' : 'opacity-30'}`}
                      style={{ width: slide === i ? `${Math.round(progress * 100)}%` : '100%' }}
                    />
                  </button>
                ))}
              </div>
            </div>
            <button aria-label="Next" className="h-12 w-12 ml-auto grid place-items-center border-2 border-surface-900 dark:border-white/20 bg-transparent text-surface-900 dark:text-white transition-colors hover:bg-surface-900 hover:text-white dark:hover:bg-white dark:hover:text-surface-900" onClick={() => { setIsSlideChanging(true); setSlide((s) => (s + 1) % slideCount); setProgress(0); setTimeout(() => setIsSlideChanging(false), 250); }}>
              <span className="sr-only">Next</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="m7 3 6 6-6 6" stroke="currentColor" strokeWidth="2"/></svg>
            </button>
          </div>
        </FeatureCard>
      </div>
    </section>
  );
};

export default FeaturesSection;
