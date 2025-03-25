// import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
    ],
  },
};

// if (process.env.NODE_ENV === "development") {
//   await setupDevPlatform();
// }

export default nextConfig;
