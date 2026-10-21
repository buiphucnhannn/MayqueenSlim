"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { documentTop, subscribeScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Đoạn "biến hình" ngay sau video TVC: khối dính (sticky) cao 1 màn hình, cuộn tới đâu đổi cảnh
 * tới đó — từ "nặng nề, thiếu tự tin" tới "nhẹ nhõm, tự tin với chính mình".
 * Ảnh chuyển mờ + phóng chậm; chữ trượt lên. Chỉ setState khi đổi chặng (không render mỗi frame).
 * Chiều cao khối ngoài = số chặng × 70% màn hình → mỗi chặng ~ 1 lượt cuộn ngắn.
 */
export default function Transformation({ data }) {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const barRef = useRef(null);
  const n = data.steps.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let top = 0;
    let span = 1;
    let last = -1;
    const measure = () => {
      top = documentTop(el);
      span = Math.max(1, el.offsetHeight - window.innerHeight);
    };
    const onScroll = (y) => {
      const p = Math.min(1, Math.max(0, (y - top) / span));
      const i = Math.min(n - 1, Math.floor(p * n * 0.999));
      if (i !== last) setActive((last = i));
      if (barRef.current) barRef.current.style.transform = `scaleX(${p.toFixed(3)})`;
    };
    return subscribeScroll(onScroll, measure);
  }, [n]);

  return (
    <section
      ref={ref}
      className="bg-moss relative"
      style={{ height: `calc(100svh + var(--screen) * ${((n - 1) * 0.7).toFixed(2)})` }}
    >
      {/* khung dính cao đúng 1 màn hình; khung ảnh (tối đa 1000px × 1920px) căn giữa trong đó
          → thu nhỏ trình duyệt không còn khoảng trống tối bên dưới */}
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="text-pearl relative mx-auto h-[var(--screen)] min-h-[520px] w-full max-w-[1920px] overflow-hidden">
          {data.steps.map((s, i) => (
            <div
              key={s.image}
              aria-hidden={i !== active}
              className={cn(
                "media-cap absolute inset-0 transition-opacity duration-[1200ms] ease-out",
                i === active ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes="100vw"
                quality={80}
                className={cn(
                  "object-cover object-[65%_center] transition-transform duration-[6000ms] ease-out",
                  i === active ? "scale-100" : "scale-110",
                )}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-5 sm:px-10">
            <div className="relative w-full max-w-2xl">
              <p className="text-pearl/60 text-[11px] font-semibold tracking-[0.32em] uppercase">
                {data.eyebrow}
              </p>
              <div className="relative mt-4 min-h-[280px] sm:min-h-[300px]">
                {data.steps.map((s, i) => (
                  <div
                    key={s.image}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-x-0 top-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      i === active
                        ? "translate-y-0 opacity-100"
                        : i < active
                          ? "-translate-y-6 opacity-0"
                          : "translate-y-6 opacity-0",
                    )}
                  >
                    {/* 1 dòng nhãn: số chặng + thời điểm */}
                    <p className="text-sage-200 flex items-center gap-3 text-[12px] font-semibold tracking-[0.2em] uppercase">
                      <span className="font-serif text-[15px] tracking-normal">0{i + 1}</span>
                      <span className="bg-sage-200/60 h-px w-8" aria-hidden="true" />
                      {s.kicker}
                    </p>
                    {/* mỗi dòng 1 ý trọn vẹn: dòng trắng + dòng màu nhấn (không ngắt giữa cụm từ) */}
                    <h2 className="h-lux text-pearl [&_.accent]:text-sage-200 mt-5 text-[27px] leading-[1.15] text-balance min-[400px]:text-[30px] sm:text-[42px] lg:text-[50px] sm:[&_.accent]:whitespace-nowrap">
                      {s.title}
                      <span className="accent">{s.accent}</span>
                    </h2>
                    <p className="text-pearl/85 mt-6 max-w-[440px] text-[15px] leading-[1.75] text-pretty sm:text-[17px]">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Thanh tiến độ các chặng (phải) */}
          <ol className="absolute top-1/2 right-10 hidden -translate-y-1/2 flex-col gap-4 sm:flex">
            {data.steps.map((s, i) => (
              <li key={s.image} className="flex items-center justify-end">
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-full border font-serif text-sm transition-colors duration-500",
                    i === active
                      ? "border-pearl bg-pearl text-forest"
                      : i < active
                        ? "border-sage-300 text-sage-200"
                        : "border-pearl/30 text-pearl/50",
                  )}
                >
                  0{i + 1}
                </span>
              </li>
            ))}
          </ol>

          {/* vạch tiến độ đáy */}
          <div className="bg-pearl/15 absolute inset-x-0 bottom-0 h-0.5">
            <div
              ref={barRef}
              className="bg-sage-300 h-full origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
