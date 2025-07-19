import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
      </Head>
      <body className="font-inter antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
