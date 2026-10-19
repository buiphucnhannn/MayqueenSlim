"use client";

import { useEffect, useRef } from "react";
import { documentTop, subscribeScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Câu tuyên ngôn "sáng dần theo từng chữ" khi cuộn: mỗi từ đi từ mờ (0.15) tới rõ (1)
 * theo tiến độ cuộn qua khối. Đo vị trí 1 lần; mỗi frame chỉ ghi opacity của những từ thay đổi.
 */
// base: độ mờ ban đầu của chữ chưa "sáng" (0.15 trên nền trơn; cao hơn khi nền có ảnh)
export default function ScrollWords({ text, as: Tag = "p", base = 0.15, className }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = [...el.querySelectorAll("[data-word]")];
    const values = spans.map(() => -1);
    let top = 0;
    let height = 0;
    let vh = 0;

    const measure = () => {
      top = documentTop(el);
      height = el.offsetHeight;
      vh = window.innerHeight;
    };
    const onScroll = (y) => {
      const rectTop = top - y;
      // 0 khi mép trên khối ở 85% màn hình, 1 khi mép dưới khối ở 45% màn hình
      const start = vh * 0.85;
      const end = vh * 0.45 - height;
      const p = Math.min(1, Math.max(0, (start - rectTop) / (start - end)));
      const lit = p * spans.length;
      spans.forEach((s, i) => {
        const v = Math.round((base + (1 - base) * Math.min(1, Math.max(0, lit - i))) * 100) / 100;
        if (v === values[i]) return;
        values[i] = v;
        s.style.opacity = v;
      });
    };
    return subscribeScroll(onScroll, measure);
  }, [base]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {words.map((w, i) => (
        <span key={i} data-word="" style={{ opacity: base }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
