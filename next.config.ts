import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return [
      {
        source: "/build-in-public",
        destination: "/projects",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
