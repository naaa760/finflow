/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  pageExtensions: ["tsx", "ts", "jsx", "js"].filter(
    (ext) => !ext.includes("test")
  ),
};

module.exports = nextConfig;
