import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Always put page metadata in <head> (not streamed into <body>), so the HTML stays valid.
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "ac.goit.global" }],
  },
};

export default nextConfig;
