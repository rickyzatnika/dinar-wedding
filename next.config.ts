import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/inkara-id/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
