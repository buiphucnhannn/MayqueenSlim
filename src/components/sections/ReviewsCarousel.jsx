"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Stars from "@/components/ui/Stars";
import { cn } from "@/lib/utils";

const INTERVAL = 6000;

function ReviewCard({ r }) {
  const initials = r.name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <figure className="bg-pearl shadow-card flex h-full flex-col rounded-2xl p-6">
      <div className="flex items-center justify-between gap-3">
        <Stars value={r.rating} />
        <span className="bg-sage-100 text-sage-700 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase">
          {r.product}
        </span>
      </div>
      <blockquote className="text-forest mt-4 flex-1 font-serif text-[17px] leading-snug">
        “{r.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="bg-sage-600 text-pearl grid size-10 place-items-center rounded-full text-xs font-bold">
          {initials}
        </span>
        <span className="min-w-0">
          <span className="text-forest block text-sm font-semibold">{r.name}</span>
          <span className="text-ink-muted block truncate text-xs">{r.meta}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Lưới đánh giá theo trang: luôn hiện TRỌN thẻ (không cắt nửa như dải trôi).
 * Desktop/tablet 2×2 = 4 thẻ/trang, mobile 1 thẻ/trang. Tự chuyển trang mỗi 6s (dừng khi rê chuột),
 * có nút trước/sau + chấm trang. Các thẻ cùng hàng cao bằng nhau (grid-rows-2 + h-full).
 */
export default function ReviewsCarousel({ reviews }) {
  const [perPage, setPerPage] = useState(4);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const sync = () => setPerPage(mq.matches ? 4 : 1);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const pages = Math.ceil(reviews.length / perPage);
  const current = page % pages;
  const go = (p) => setPage((p + pages) % pages);

  useEffect(() => {
    if (paused || pages < 2) return;
    const id = setInterval(() => setPage((p) => (p + 1) % pages), INTERVAL);
    return () => clearInterval(id);
  }, [paused, pages]);

  // Trang cuối thiếu thẻ → lấy vòng lại từ đầu cho đủ, lưới luôn đầy
  const shown = Array.from(
    { length: perPage },
    (_, i) => reviews[(current * perPage + i) % reviews.length],
  );

  return (
    <div
      className="flex h-full flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        key={`${perPage}-${current}`}
        className="grid flex-1 [animation:fadeUp_.7s_cubic-bezier(.22,1,.36,1)_both] gap-4 sm:grid-cols-2 sm:grid-rows-2"
      >
        {shown.map((r, i) => (
          <div key={`${r.name}-${i}`} className="min-h-0">
            <ReviewCard r={r} />
          </div>
        ))}
      </div>

      {pages > 1 && (
        // Điều khiển gom một cụm ở giữa: [<]  chấm trang  [>]
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(current - 1)}
            aria-label="Previous"
            className="border-forest/15 text-forest hover:bg-forest hover:text-pearl grid size-10 place-items-center rounded-full border transition"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={`${i + 1}/${pages}`}
                aria-current={i === current}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === current ? "bg-forest w-8" : "bg-forest/20 hover:bg-forest/40 w-1.5",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(current + 1)}
            aria-label="Next"
            className="border-forest/15 text-forest hover:bg-forest hover:text-pearl grid size-10 place-items-center rounded-full border transition"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
