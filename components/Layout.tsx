import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'OpsiMate - Simplify Your Infrastructure Management',
  description = 'One platform to monitor, manage, and optimize your entire infrastructure. Transform complexity into clarity with OpsiMate\'s unified, intelligent platform.'
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/og-image.png" /> {/* Placeholder - add actual OG image */}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="/images/og-image.png" /> {/* Placeholder - add actual Twitter image */}
        
        {/* Additional SEO tags */}
        <meta name="keywords" content="infrastructure management, monitoring, DevOps, cloud management, server monitoring, Kubernetes, Docker, observability" />
        <meta name="author" content="OpsiMate" />
        <link rel="canonical" href="https://opsimate.com" /> {/* Update with actual domain */}
        <link rel="alternate" type="application/rss+xml" title="OpsiMate Blog RSS" href="/feed.xml" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
