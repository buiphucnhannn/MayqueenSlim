"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { brand } from "@/data/images";
import { cn } from "@/lib/utils";

/**
 * Màn chào khi tải trang lần đầu: nền kem + logo B.O.T + vạch nạp, rồi tấm màn trượt lên.
 * Nằm trong layout gốc → chuyển trang nội bộ không chạy lại.
 */
const SHOW_MS = 1000;
const LEAVE_MS = 900;

export default function Preloader({ caption }) {
  const [state, setState] = useState("show"); // show | leave | done

  useEffect(() => {
    const t1 = setTimeout(() => setState("leave"), SHOW_MS);
    const t2 = setTimeout(() => setState("done"), SHOW_MS + LEAVE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "bg-cream fixed inset-0 z-[200] flex items-center justify-center transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        state === "leave" ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center transition-all duration-500",
          state === "leave" ? "-translate-y-6 opacity-0" : "[animation:fadeUp_.9s_ease-out_both]",
        )}
      >
        <Image
          src={brand.stacked}
          alt=""
          width={112}
          height={112}
          priority
          className="h-24 w-auto"
        />
        <p className="text-ink-muted mt-5 text-[10px] tracking-[0.4em] uppercase">{caption}</p>
        <span className="bg-forest/10 relative mt-6 block h-px w-28 overflow-hidden">
          <span className="bg-sage-600 absolute inset-0 origin-left [animation:loadbar_1s_cubic-bezier(.22,1,.36,1)_.1s_both]" />
        </span>
      </div>
    </div>
  );
}
