import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns:[
      {hostname: 'images.pexels.com'},
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/skoolboy/**",
      },
    ]
  },
};

export default nextConfig;
