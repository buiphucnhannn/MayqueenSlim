"use client";

import { useEffect } from "react";
import { documentTop, subscribeScroll } from "@/lib/scroll";

/**
 * Đẩy 2 nút nổi (lên đầu trang / liên hệ) lên trên khi dải đáy footer lọt vào màn hình,
 * để nút không đè lên chữ. Ghi biến CSS --float-lift (px) trên <html>; các nút dùng
 * transform: translateY(-lift) → mượt, không làm đổi bố cục. Bình thường lift = 0, nút giữ nguyên
 * khoảng cách đáy = khoảng cách cạnh.
 */
export default function FloatLift({ selector = "[data-float-guard]" }) {
  useEffect(() => {
    const root = document.documentElement;
    let el = null;
    let top = 0;
    let vh = 0;
    let last = -1;

    const measure = () => {
      el = document.querySelector(selector);
      if (!el) return;
      top = documentTop(el);
      vh = window.innerHeight;
    };
    const onScroll = (y) => {
      if (!el) return;
      // phần dải đáy đang lọt vào màn hình → nút luôn cách mép trên dải đúng bằng khoảng cách cạnh
      const lift = Math.round(Math.max(0, y + vh - top));
      if (lift === last) return;
      last = lift;
      root.style.setProperty("--float-lift", `${lift}px`);
    };
    const off = subscribeScroll(onScroll, measure);
    return () => {
      off();
      root.style.removeProperty("--float-lift");
    };
  }, [selector]);

  return null;
}
