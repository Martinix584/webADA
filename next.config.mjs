/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dcdn-us.mitiendanube.com",
      },
    ],
  },
};

export default nextConfig;
