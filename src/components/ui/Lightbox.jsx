"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { lockScroll } from "@/lib/scroll";

/**
 * Popup xem ảnh toàn màn hình (kiểu ButStudio): bộ đếm 02 / 08, nút đóng, mũi tên trái/phải,
 * vuốt trên điện thoại, phím ← → Esc. Dưới ảnh là mô tả + link (tuỳ chọn).
 * items: [{ src, caption, text }]; index: số | null; onChange(i); onClose().
 * link: { href, label } — ví dụ "Xem trên Facebook".
 */
export default function Lightbox({ items, index, onChange, onClose, link }) {
  const open = index !== null && index !== undefined;
  const total = items.length;
  const touchX = useRef(null);

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, onClose, prev, next]);

  if (!open) return null;
  const item = items[index];
  const navBtn =
    "grid size-12 place-items-center rounded-full bg-pearl/10 text-pearl transition hover:bg-pearl/25";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      onClick={onClose}
      className="bg-forest-deep/95 fixed inset-0 z-[160] flex [animation:fadeIn_.3s_ease-out_both] flex-col items-center justify-center px-4"
    >
      <p className="text-pearl/60 absolute top-5 left-5 text-xs tracking-[0.3em] tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="bg-pearl/10 text-pearl hover:bg-pearl/25 absolute top-4 right-4 grid size-11 place-items-center rounded-full transition"
      >
        <X className="size-5" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className={`absolute top-1/2 left-4 hidden -translate-y-1/2 sm:grid ${navBtn}`}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className={`absolute top-1/2 right-4 hidden -translate-y-1/2 sm:grid ${navBtn}`}
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      {/* Ảnh: vuốt trái/phải để chuyển (điện thoại) */}
      <div
        key={item.src}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}
        className="shadow-soft relative aspect-square w-[min(88vw,58vh,460px)] [animation:sheetIn_.45s_cubic-bezier(.22,1,.36,1)_both] touch-pan-y overflow-hidden rounded-2xl select-none"
      >
        <Image
          src={item.src}
          alt={item.caption}
          fill
          sizes="460px"
          quality={90}
          className="object-cover"
        />
      </div>

      <div
        key={`${item.src}-text`}
        onClick={(e) => e.stopPropagation()}
        className="mt-6 max-w-xl [animation:fadeUp_.6s_cubic-bezier(.22,1,.36,1)_.1s_both] text-center"
      >
        <p className="text-pearl font-serif text-xl sm:text-2xl">{item.caption}</p>
        {item.text && (
          <p className="text-pearl/65 mt-2 text-[13.5px] leading-relaxed">{item.text}</p>
        )}
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-leaf text-leaf hover:text-pearl mt-4 inline-block border-b pb-0.5 text-[11.5px] font-semibold tracking-[0.16em] uppercase"
          >
            {link.label}
          </a>
        )}
      </div>

      {total > 1 && (
        <div className="mt-6 flex gap-3 sm:hidden" onClick={(e) => e.stopPropagation()}>
          <button type="button" aria-label="Previous" onClick={prev} className={navBtn}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" aria-label="Next" onClick={next} className={navBtn}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
