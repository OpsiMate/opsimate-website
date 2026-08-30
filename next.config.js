/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 16 dropped the `swcMinify` option; SWC minification is always on.
  // The webpack config below is why `build`/`dev` pass `--webpack`: Turbopack
  // is the Next 16 default and errors out when a webpack config is present.
  // Migrating this polling workaround to Turbopack is a follow-up.
  webpack:(config,{dev})=>{
    if(dev && process.env.NEXT_WEBPACK_USEPOLLING){
       config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      };
    }
    return config
  },
  output:"standalone",
  async redirects() {
    return [
      // opsimate.dev and www.opsimate.dev both answered 200 for every path,
      // so each page existed at two URLs and Google split them. Consolidate
      // on the www host the sitemap, robots.txt and JSON-LD already declare.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'opsimate\\.dev' }],
        destination: 'https://www.opsimate.dev/:path*',
        permanent: true,
      },
      // /index served a second copy of the homepage.
      { source: '/index', destination: '/', permanent: true },
    ]
  }
}

module.exports = nextConfig
