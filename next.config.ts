import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // to load only the Chakra modules you actually use, which also resolves some webpack cache warnings
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
