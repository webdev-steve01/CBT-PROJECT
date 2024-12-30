import type { NextConfig } from "next";

module.exports = {
  images: {
    domains: ["example.com"],
  },
  experimental: {
    appDir: true, // Ensure this is enabled for the app directory structure
  },
};
