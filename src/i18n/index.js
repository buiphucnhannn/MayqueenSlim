/**
 * Song ngữ Việt / Anh.
 * - Chuỗi trong data viết dạng t("tiếng Việt", "English"); localize(data, lang) duyệt sâu và chọn ngôn ngữ.
 * - URL: tiếng Việt tại "/", tiếng Anh tại "/en" (xem rewrites trong next.config.mjs).
 */
import { toEnPath, toViPath } from "./routes.mjs";

export const LOCALES = ["vi", "en"];
export const DEFAULT_LOCALE = "vi";

export const isLocale = (v) => LOCALES.includes(v);

export const t = (vi, en) => ({ vi, en });

const isI18nString = (v) =>
  v &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  "vi" in v &&
  "en" in v &&
  Object.keys(v).length === 2;

export function localize(data, lang) {
  if (Array.isArray(data)) return data.map((d) => localize(d, lang));
  if (data && typeof data === "object") {
    if (isI18nString(data)) return data[lang] ?? data[DEFAULT_LOCALE];
    const out = {};
    for (const k of Object.keys(data)) out[k] = localize(data[k], lang);
    return out;
  }
  return data;
}

// Luôn truyền đường dẫn TIẾNG VIỆT: href("en", "/san-pham/combo") => "/en/shop/combo"; href("en", "/#tu-van") => "/en#tu-van"
export function href(lang, path = "/") {
  if (lang === DEFAULT_LOCALE) return path;
  if (path === "/") return "/en";
  if (path.startsWith("/#")) return `/en${path.slice(1)}`;
  return `/en${toEnPath(path)}`;
}

// URL thật hoặc đường dẫn nội bộ sau rewrite ("/en/shop/x", "/en/san-pham/x", "/vi/san-pham/x") → "/san-pham/x"
export function toCanonicalPath(pathname = "/") {
  if (/^\/en(\/|$)/.test(pathname)) return toViPath(pathname.replace(/^\/en/, "") || "/");
  return pathname.replace(/^\/vi(?=\/|$)/, "") || "/";
}

export const switchLocalePath = (pathname, target) => href(target, toCanonicalPath(pathname));
