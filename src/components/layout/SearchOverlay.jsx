"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { href } from "@/i18n";
import { usePresence } from "@/hooks/usePresence";
import { lockScroll } from "@/lib/scroll";

// Bỏ dấu tiếng Việt để tìm "mo thua" vẫn ra "mỡ thừa"
const fold = (s = "") => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d");

/**
 * Ô tìm kiếm toàn màn hình (nút kính lúp trên header): tìm trong sản phẩm + bài viết "Sống đẹp".
 * items: [{ type, title, sub, path, image }] — dữ liệu ĐÃ localize, truyền từ layout.
 */
export default function SearchOverlay({ open, onClose, lang, items, labels }) {
  const [q, setQ] = useState("");
  const inputRef = useRef(null);
  const { mounted, closing } = usePresence(open, 320);
  // giữ onClose mới nhất trong ref → effect không chạy lại mỗi lần cha render
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    const onKey = (e) => e.key === "Escape" && closeRef.current();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const results = useMemo(() => {
    const k = fold(q.trim());
    if (!k) return items.filter((i) => i.type === "product");
    return items.filter((i) => fold(`${i.title} ${i.sub}`).includes(k)).slice(0, 8);
  }, [q, items]);

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={labels.open}
      className={`bg-forest-deep/70 fixed inset-0 z-[120] flex flex-col backdrop-blur-[2px] ${closing ? "pointer-events-none [animation:fadeOut_.32s_ease-in_both]" : "[animation:fadeIn_.3s_ease-out_both]"}`}
      onClick={onClose}
    >
      <div
        className={`bg-pearl w-full ${closing ? "[animation:searchOut_.3s_cubic-bezier(.4,0,1,1)_both]" : "[animation:searchIn_.5s_cubic-bezier(.22,1,.36,1)_both]"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-3xl px-5 pt-6 pb-8 sm:pt-10">
          <div className="border-forest/20 flex items-center gap-3 border-b pb-3">
            <Search className="text-sage-600 size-5 shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={labels.placeholder}
              className="text-forest placeholder:text-ink-muted min-w-0 flex-1 bg-transparent font-serif text-2xl outline-none sm:text-3xl"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="hover:bg-sage-50 grid size-10 shrink-0 place-items-center rounded-full"
            >
              <X className="size-5" />
            </button>
          </div>

          <p className="eyebrow mt-6">{q.trim() ? labels.results : labels.suggest}</p>
          {results.length === 0 ? (
            <p className="text-ink-soft mt-4 text-sm">{labels.empty}</p>
          ) : (
            <ul className="divide-forest/10 mt-3 divide-y" data-lenis-prevent>
              {results.map((r) => (
                <li key={r.path}>
                  <Link
                    href={href(lang, r.path)}
                    onClick={onClose}
                    className="group hover:bg-sage-50 -mx-3 flex items-center gap-4 rounded-xl px-3 py-3 transition"
                  >
                    <span className="bg-sand relative size-14 shrink-0 overflow-hidden rounded-lg">
                      <Image src={r.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="text-sage-600 block text-[10.5px] font-semibold tracking-[0.18em] uppercase">
                        {r.type === "product" ? labels.product : labels.article}
                      </span>
                      <span className="text-forest group-hover:text-sage-700 block truncate font-serif text-lg">
                        {r.title}
                      </span>
                      <span className="text-ink-muted block truncate text-xs">{r.sub}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
