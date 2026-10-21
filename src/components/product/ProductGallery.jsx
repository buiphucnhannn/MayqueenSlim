"use client";

import { useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

// Thư viện ảnh trang chi tiết: ảnh lớn chuyển mờ + dải ảnh nhỏ. Bấm ảnh lớn → mở trình xem ảnh (lightbox).
export default function ProductGallery({ images, name, badge }) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState(null);
  const items = images.map((src, i) => ({ src, caption: `${name} · ${i + 1}/${images.length}` }));

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      {/* p-1: chừa chỗ cho viền + khoảng hở của ảnh đang chọn (khung cuộn cắt mất nếu sát mép) */}
      <div className="no-scrollbar -m-1 flex gap-3 overflow-x-auto p-1 lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${name} ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "ring-offset-pearl relative size-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-offset-2 transition duration-300 lg:size-24",
              i === active ? "ring-sage-600" : "opacity-60 ring-transparent hover:opacity-100",
            )}
          >
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setViewer(active)}
        aria-label={name}
        className="group bg-sage-50 relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-md"
      >
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === active ? name : ""}
            fill
            priority={i === 0}
            quality={90}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "object-cover transition-opacity duration-700 ease-out",
              i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {/* gợi ý bấm để xem lớn */}
        <span className="bg-pearl/90 text-forest absolute top-4 right-4 grid size-10 place-items-center rounded-full opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          <Maximize2 className="size-4" aria-hidden="true" />
        </span>
        {badge && (
          <span className="bg-forest text-pearl absolute bottom-5 left-5 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase">
            {badge}
          </span>
        )}
      </button>

      <Lightbox
        items={items}
        index={viewer}
        onChange={(i) => {
          setViewer(i);
          setActive(i);
        }}
        onClose={() => setViewer(null)}
      />
    </div>
  );
}
