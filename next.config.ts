import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL("https://cdn.rareblocks.xyz/collection/celebration/Images/**"),
      new URL("https://images.unsplash.com/**"),
      new URL("https://drive.google.com/**"),
    ],
  },
};

export default nextConfig;
