import { siteConfig } from "@/config/site";
import { articles } from "@/data/articles";
import { policies } from "@/data/policies";
import { products } from "@/data/products";
import { href } from "@/i18n";

// Mỗi trang có bản tiếng Việt + tiếng Anh (khai báo alternates để Google hiểu cặp ngôn ngữ)
const LAST_MODIFIED = "2026-10-19";

export default function sitemap() {
  const paths = [
    { path: "/", priority: 1 },
    { path: "/san-pham", priority: 0.9 },
    ...products.map((p) => ({ path: `/san-pham/${p.slug}`, priority: 0.9 })),
    { path: "/song-dep", priority: 0.7 },
    ...articles.map((a) => ({ path: `/song-dep/${a.slug}`, priority: 0.6, lastModified: a.date })),
    ...policies.map((p) => ({ path: `/chinh-sach/${p.slug}`, priority: 0.3 })),
  ];

  return paths.flatMap(({ path, priority, lastModified = LAST_MODIFIED }) =>
    ["vi", "en"].map((lang) => ({
      url: siteConfig.url + href(lang, path),
      lastModified,
      priority: lang === "vi" ? priority : priority * 0.9,
      alternates: {
        languages: { vi: siteConfig.url + href("vi", path), en: siteConfig.url + href("en", path) },
      },
    })),
  );
}
