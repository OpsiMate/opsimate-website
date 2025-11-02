import { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID, isGAEnabled } from '../lib/gtag';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google Analytics */}
        {isGAEnabled() && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_TRACKING_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Fonts - Inter for modern, clean typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=1" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=1" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2563eb" />

        {/* Initial theme script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </Head>
      <body className="font-inter antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
