/** @type {import('next').NextConfig} */

// For GitHub Pages (project site) the app is served from /<repo>. The deploy
// workflow sets NEXT_PUBLIC_BASE_PATH to the repo name; locally it's empty.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
