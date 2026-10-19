import { SEGMENTS_EN } from "./src/i18n/routes.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  poweredByHeader: false,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 bắt buộc khai báo danh sách quality; ảnh sản phẩm dùng 90 cho nét
    // 30: dành riêng cho nền nhoè (PhotoBackdrop) — URL khác hẳn ảnh thường nên trình duyệt
    // không lấy nhầm bản ảnh lớn đã cache (gây "bóng" sản phẩm sắc nét phía sau chữ).
    qualities: [30, 75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Tiếng Việt mặc định tại "/", tiếng Anh tại "/en" (route thật nằm ở app/[lang]/<đoạn tiếng Việt>)
  async rewrites() {
    const vi = Object.keys(SEGMENTS_EN).flatMap((seg) => [
      { source: `/${seg}`, destination: `/vi/${seg}` },
      { source: `/${seg}/:slug`, destination: `/vi/${seg}/:slug` },
    ]);
    const en = Object.entries(SEGMENTS_EN).flatMap(([seg, enSeg]) => [
      { source: `/en/${enSeg}`, destination: `/en/${seg}` },
      { source: `/en/${enSeg}/:slug`, destination: `/en/${seg}/:slug` },
    ]);
    return [{ source: "/", destination: "/vi" }, ...vi, ...en];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
