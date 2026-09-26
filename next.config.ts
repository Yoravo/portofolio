import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/Resume%20-%20Radja%20Ravine%20Salfriandry.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value: 'attachment; filename="Resume - Radja Ravine Salfriandry.pdf"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
