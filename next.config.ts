import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["fakestoreapi.com"], // <-- add your external host here
  },
};

export default nextConfig;
