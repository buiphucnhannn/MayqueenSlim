"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, MessageCircle, Phone, X } from "lucide-react";
import { MessengerIcon, ZaloIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

// Cụm nút liên hệ nổi (góc phải dưới): bấm mở Hotline / Zalo / Messenger.
export default function FloatingContact({ phoneRaw, zalo, messenger, labels }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Đang mở: bấm ra ngoài cụm nút hoặc nhấn Esc thì tự đóng
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !rootRef.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const items = [
    {
      label: labels.consult,
      consult: true,
      Icon: ClipboardList,
      className: "bg-sage-100 text-forest",
    },
    { label: labels.call, href: `tel:${phoneRaw}`, Icon: Phone, className: "bg-forest text-pearl" },
    {
      label: labels.chatZalo,
      href: zalo,
      Icon: ZaloIcon,
      className: "bg-[#0068ff] text-white",
      external: true,
    },
    {
      label: labels.chatMessenger,
      href: messenger,
      Icon: MessengerIcon,
      className: "bg-gradient-to-br from-[#00b2ff] to-[#a033ff] text-white",
      external: true,
    },
  ];

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-[60] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6"
    >
      <ul className="flex flex-col items-end gap-3">
        {items.map(({ label, href, Icon, className, external, consult }, i) => {
          const inner = (
            <>
              <span className="bg-pearl text-forest shadow-card rounded-full px-2.5 py-1 text-[11px] font-semibold">
                {label}
              </span>
              <span
                className={cn(
                  "shadow-card grid size-10 place-items-center rounded-full",
                  className,
                )}
              >
                <Icon className="size-[18px]" />
              </span>
            </>
          );
          return (
            <li
              key={label}
              className={cn(
                "transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${(items.length - i) * 60}ms` : "0ms" }}
            >
              {consult ? (
                <button
                  type="button"
                  data-consult=""
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center gap-3"
                >
                  {inner}
                </button>
              ) : (
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center gap-3"
                >
                  {inner}
                </a>
              )}
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={labels.call}
        className={cn(
          "shadow-card relative grid size-10 place-items-center rounded-full text-white transition duration-300 hover:scale-105",
          open ? "bg-forest" : "bg-sage-600 hover:bg-forest",
        )}
      >
        {open ? (
          <X className="relative size-[18px]" />
        ) : (
          <MessageCircle className="relative size-[18px]" />
        )}
      </button>
    </div>
  );
}
