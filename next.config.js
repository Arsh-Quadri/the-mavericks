/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "epic-projects.nyc3.digitaloceanspaces.com",
      "media.istockphoto.com",
      "techneo360.com",
    ],
  },
};

module.exports = nextConfig;
