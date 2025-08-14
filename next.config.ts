import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "miro.medium.com",
      "tastecooking.com",
      "scrumptiously.com",
      "api.omela.com",
      "cornercoffeestore.com",
      "nibble-images.b-cdn.net",
    ],
  },
};

export default nextConfig;
