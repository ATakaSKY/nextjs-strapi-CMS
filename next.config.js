/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [`${process.env.DOMAIN}`, "place-hold.it"],
  },
};

module.exports = nextConfig;
