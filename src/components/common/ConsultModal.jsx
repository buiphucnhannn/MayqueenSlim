"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Check, Phone, X } from "lucide-react";
import ConsultForm from "@/components/forms/ConsultForm";
import { MessengerIcon, ZaloIcon } from "@/components/ui/BrandIcons";
import { brand, productImages } from "@/data/images";
import { usePresence } from "@/hooks/usePresence";
import { lockScroll } from "@/lib/scroll";

/**
 * Popup đăng ký tư vấn dùng chung toàn site (thay cho section tư vấn).
 * Mở bằng BẤT KỲ phần tử nào có thuộc tính data-consult — không cần truyền state qua props.
 * Desktop: hộp 2 cột (ảnh + lời mời | form). Mobile: bottom sheet trượt từ dưới lên.
 */
export default function ConsultModal({ labels, formLabels, site }) {
  const [open, setOpen] = useState(false);
  // key tăng mỗi lần mở → form làm mới (xoá trạng thái "đã gửi" của lần trước)
  const [session, setSession] = useState(0);
  const close = useCallback(() => setOpen(false), []);
  const { mounted, closing } = usePresence(open, 380);

  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest("[data-consult]")) return;
      e.preventDefault();
      setSession((n) => n + 1);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    lockScroll(true);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
    };
  }, [open, close]);

  if (!mounted) return null;

  const quick = [
    { href: site.messenger, label: "Messenger", Icon: MessengerIcon, ext: true },
    { href: site.zalo, label: "Zalo", Icon: ZaloIcon, ext: true },
    { href: `tel:${site.phoneRaw}`, label: site.phone, Icon: Phone },
  ];

  return (
    <div
      className={`fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 ${closing ? "pointer-events-none" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={labels.title}
    >
      <div
        className={`bg-forest-deep/60 absolute inset-0 backdrop-blur-[2px] ${closing ? "[animation:fadeOut_.38s_ease-in_both]" : "[animation:fadeIn_.4s_ease-out_both]"}`}
        onClick={close}
      />

      <div
        className={`bg-pearl shadow-soft relative grid max-h-[calc(100svh-24px)] w-full max-w-[920px] overflow-hidden rounded-[20px] lg:grid-cols-[0.42fr_0.58fr] ${closing ? "[animation:sheetOut_.36s_cubic-bezier(.4,0,1,1)_both]" : "[animation:sheetIn_.6s_cubic-bezier(.22,1,.36,1)_both]"}`}
      >
        {/* Cột ảnh (desktop) */}
        <div className="relative hidden lg:block">
          <Image
            src={productImages.mayqueen.floating}
            alt=""
            fill
            quality={92}

            sizes="(min-width: 1024px) 800px, 1px"
            className="object-cover object-[60%_center]"
          />
          <div className="from-forest-deep/90 via-forest-deep/25 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="text-pearl absolute inset-x-0 bottom-0 px-8 pt-8 pb-10">
            <p className="font-serif text-[28px] leading-tight whitespace-pre-line">
              {labels.headline}
            </p>
            <ul className="mt-4 space-y-2">
              {labels.bullets.map((b) => (
                <li key={b} className="text-pearl/85 flex items-start gap-2 text-[13px]">
                  <Check className="text-leaf mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cột form — data-lenis-prevent: cuộn bên trong popup không bị Lenis chặn */}
        <div
          data-lenis-prevent
          className="no-scrollbar relative overflow-y-auto overscroll-contain px-5 pt-6 pb-5 sm:px-9 sm:py-8"
        >
          <span aria-hidden="true" className="hidden" />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="text-forest/70 hover:bg-sage-50 hover:text-forest absolute top-3 right-3 grid size-10 place-items-center rounded-full transition sm:top-4 sm:right-4"
          >
            <X className="size-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <Image
              src={brand.horizontal}
              alt="B.O.T"
              width={357}
              height={136}
              className="h-7 w-auto"
            />
            <h3 className="text-forest mt-3 font-serif text-[24px] leading-tight sm:mt-4 sm:text-[32px]">
              {labels.title}
            </h3>
            <p className="text-ink-soft mt-2 max-w-sm text-[13.5px] leading-relaxed text-balance">
              {labels.desc}
            </p>
          </div>

          <div className="mt-5 sm:mt-6">
            <ConsultForm key={session} labels={formLabels} />
          </div>

          <div className="border-forest/10 text-ink-muted mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 border-t pt-4 text-[12px] sm:mt-6 sm:gap-x-5 sm:pt-5">
            <span>{labels.or}</span>
            {quick.map(({ href, label, Icon, ext }) => (
              <a
                key={label}
                href={href}
                target={ext ? "_blank" : undefined}
                rel={ext ? "noopener noreferrer" : undefined}
                className="text-forest/80 hover:text-forest inline-flex items-center gap-1.5 font-medium transition"
              >
                <Icon className="size-4" /> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
