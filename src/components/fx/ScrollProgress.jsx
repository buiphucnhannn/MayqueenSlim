"use client";

import { useEffect, useRef } from "react";
import { documentTop, subscribeScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Vạch tiến độ dọc "mọc" dần theo nhịp cuộn qua khối cha (dùng cho dòng thời gian).
 * Chỉ ghi transform: scaleY → mượt, không đọc layout khi cuộn.
 */
// axis: "y" vạch dọc (mặc định) | "x" vạch ngang
export default function ScrollProgress({ axis = "y", className, barClassName }) {
  const ref = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    let top = 0;
    let height = 0;
    let vh = 0;
    let last = -1;
    const measure = () => {
      top = documentTop(el);
      height = el.offsetHeight;
      vh = window.innerHeight;
    };
    const onScroll = (y) => {
      // 0 khi vạch ở 75% màn hình; chạy hết khi đã cuộn thêm (chiều cao khối + 20% màn hình)
      const p = Math.min(1, Math.max(0, (y + vh * 0.75 - top) / (height + vh * 0.2)));
      const v = Math.round(p * 1000) / 1000;
      if (v === last) return;
      last = v;
      bar.style.transform = axis === "x" ? `scaleX(${v})` : `scaleY(${v})`;
    };
    return subscribeScroll(onScroll, measure);
  }, [axis]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)} aria-hidden="true">
      <div
        ref={barRef}
        className={cn("h-full w-full", axis === "x" ? "origin-left" : "origin-top", barClassName)}
        style={{ transform: axis === "x" ? "scaleX(0)" : "scaleY(0)" }}
      />
    </div>
  );
}
