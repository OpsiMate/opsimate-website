/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
