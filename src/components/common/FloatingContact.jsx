"use client";

import { useState } from "react";
import { ClipboardList, MessageCircle, Phone, X } from "lucide-react";
import { MessengerIcon, ZaloIcon } from "@/components/ui/BrandIcons";
import { cn } from "@/lib/utils";

// Cụm nút liên hệ nổi (góc phải dưới): bấm mở Hotline / Zalo / Messenger.
export default function FloatingContact({ phoneRaw, zalo, messenger, labels }) {
  const [open, setOpen] = useState(false);
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
    <div className="fixed right-4 bottom-4 z-[60] flex [transform:translateY(calc(var(--float-lift,0px)*-1))] flex-col items-end gap-3 transition-transform duration-300 ease-out sm:right-6 sm:bottom-6">
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
        className="bg-pearl text-forest shadow-soft ring-forest/5 relative grid size-12 place-items-center rounded-full ring-1 transition hover:scale-105"
      >
        {open ? <X className="relative size-5" /> : <MessageCircle className="relative size-5" />}
      </button>
    </div>
  );
}
