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
  output:"standalone"
}

module.exports = nextConfig
