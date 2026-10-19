"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";

// Lưới 8 ảnh fanpage vừa khít bề ngang (mobile 4×2, desktop 8×1); bấm ảnh → popup xem lớn + mô tả.
export default function SocialGallery({ posts, link }) {
  const [index, setIndex] = useState(null);

  return (
    <>
      <ul className="mt-10 grid grid-cols-4 gap-2 sm:gap-3 lg:grid-cols-8 lg:gap-4">
        {posts.map((p, i) => (
          <li key={p.src} className="reveal" style={{ "--reveal-delay": `${i * 60}ms` }}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={p.caption}
              className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl"
            >
              <Image
                src={p.src}
                alt={p.caption}
                fill
                sizes="(min-width: 1024px) 12vw, 25vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="bg-forest/0 text-pearl group-hover:bg-forest/45 absolute inset-0 grid place-items-center opacity-0 transition duration-500 group-hover:opacity-100">
                <Expand className="size-6" aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        items={posts}
        index={index}
        onChange={setIndex}
        onClose={() => setIndex(null)}
        link={link}
      />
    </>
  );
}
