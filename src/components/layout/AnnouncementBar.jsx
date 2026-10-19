"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Thanh thông báo trên cùng — các thông điệp luân phiên mỗi 4 giây.
export default function AnnouncementBar({ messages }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(id);
  }, [messages.length]);

  return (
    <div className="bg-forest text-pearl relative h-9 overflow-hidden">
      {messages.map((m, i) => (
        <p
          key={m}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 flex items-center justify-center px-4 text-center text-[11px] font-medium tracking-[0.14em] uppercase transition-all duration-700 sm:text-xs",
            i === index ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
          )}
        >
          {m}
        </p>
      ))}
    </div>
  );
}
