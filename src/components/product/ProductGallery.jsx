"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Thư viện ảnh trang chi tiết: ảnh lớn chuyển mờ + dải ảnh nhỏ. Rê chuột lên ảnh lớn để phóng nhẹ theo con trỏ.
export default function ProductGallery({ images, name, badge }) {
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const [zoom, setZoom] = useState(false);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin(
      `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
    );
  };

  return (
    <div className="flex flex-col-reverse gap-4 lg:flex-row">
      <div className="no-scrollbar flex gap-3 overflow-x-auto lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${name} ${i + 1}`}
            aria-current={i === active}
            className={cn(
              "ring-offset-pearl relative size-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-offset-2 transition lg:size-24",
              i === active ? "ring-sage-600" : "opacity-60 ring-transparent hover:opacity-100",
            )}
          >
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>

      <div
        className="bg-sage-50 relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-md"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
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
            style={{ transformOrigin: origin }}
            className={cn(
              "object-cover transition-[opacity,transform] duration-700",
              i === active ? "opacity-100" : "opacity-0",
              zoom && i === active ? "scale-[1.6]" : "scale-100",
            )}
          />
        ))}
        {badge && (
          <span className="bg-forest text-pearl absolute bottom-5 left-5 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] uppercase">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
