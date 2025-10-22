import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../contexts/ThemeContext";
import "../styles/globals.css";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = 'opsimateCookieConsent';

export default function App({ Component, pageProps }: AppProps) {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    setHasConsent(consent === 'accepted');
  }, []);

  const shouldRenderAnalytics = hasConsent === true;

  return (
    <ThemeProvider>
      <Component {...pageProps} />
      {shouldRenderAnalytics && <Analytics />}
    </ThemeProvider>
  );
}