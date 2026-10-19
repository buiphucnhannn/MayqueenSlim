import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Gộp className, tự loại bỏ class Tailwind bị trùng/xung đột.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value, lang = "vi") {
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(iso, lang = "vi") {
  return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${iso}T00:00:00`));
}

export const discountPercent = (price, compareAt) =>
  compareAt ? Math.round(((compareAt - price) / compareAt) * 100) : 0;

export const isValidPhone = (value) => /^(0|\+84)\d{9}$/.test(String(value).replace(/[\s.]/g, ""));

// Nối 2 từ cuối bằng khoảng trắng không ngắt → tiêu đề không rớt 1 chữ lẻ ở dòng cuối
export function noOrphan(text = "") {
  const i = text.lastIndexOf(" ");
  return i > 0 ? `${text.slice(0, i)} ${text.slice(i + 1)}` : text;
}
