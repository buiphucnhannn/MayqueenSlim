import { siteConfig } from "@/config/site";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thanh-toan", "/en/checkout"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
