// Google Analytics utility functions
// This file handles all GA tracking logic

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Check if GA is enabled (tracking ID exists)
export const isGAEnabled = (): boolean => {
  return !!GA_TRACKING_ID;
};

// Track page views
export const pageview = (url: string): void => {
  if (!isGAEnabled()) return;
  
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  });
};

// Track custom events
export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}): void => {
  if (!isGAEnabled()) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}
