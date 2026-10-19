"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, ShoppingBag, X } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { href, toCanonicalPath } from "@/i18n";
import { lockScroll, subscribeScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const navLink =
  "relative text-[12px] font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors hover:text-sage-600";

/**
 * Header kiểu The Beauty Chef: menu chữ in hoa giãn cách bên trái, logo giữa,
 * nút "Tư vấn miễn phí" + ngôn ngữ + giỏ hàng bên phải. Nền kem cố định.
 * Luôn dính trên cùng khi cuộn (sticky); đã cuộn thì thêm bóng mềm + logo thu nhẹ
 * (chỉ dùng transform/box-shadow → không làm xô lệch bố cục, không giật).
 * Mục menu có consult: true → mở popup tư vấn (data-consult). Mobile: menu toàn màn hình.
 */
export default function Header({ lang, nav, ui, menuProducts, phone, phoneRaw }) {
  const pathname = toCanonicalPath(usePathname());
  const { count, setOpen: setCartOpen } = useCart();
  const [menu, setMenu] = useState({ open: false, path: "" });
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);

  // Menu tự đóng khi đổi trang (so pathname lúc mở)
  const open = menu.open && menu.path === pathname;
  const setOpen = (v) => setMenu({ open: v, path: pathname });
  // Menu mobile phủ từ ngay dưới header tới đáy màn hình (header có thể lệch do thanh thông báo)
  const headerRef = useRef(null);
  const [menuTop, setMenuTop] = useState(64);
  const toggleMenu = () => {
    if (!open && headerRef.current)
      setMenuTop(Math.round(headerRef.current.getBoundingClientRect().bottom));
    setOpen(!open);
  };

  // Nghe nhịp cuộn chung; chỉ setState khi trạng thái THỰC SỰ đổi (không render lại mỗi frame)
  useEffect(
    () =>
      subscribeScroll((y) => {
        const now = y > 24;
        if (now !== scrolledRef.current) setScrolled((scrolledRef.current = now));
      }),
    [],
  );

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  const isActive = (path) =>
    path &&
    !path.includes("#") &&
    (pathname === path || (path !== "/san-pham" && pathname.startsWith(path)));

  const renderNavItem = (item, mobile = false) => {
    const cls = mobile
      ? "block w-full border-b border-forest/10 py-3.5 text-left font-serif text-[22px] text-forest"
      : cn(
          navLink,
          isActive(item.path) ? "text-forest underline underline-offset-[6px]" : "text-ink",
        );
    if (item.consult)
      return (
        <button type="button" data-consult="" onClick={() => setOpen(false)} className={cls}>
          {item.label}
        </button>
      );
    return (
      <Link href={href(lang, item.path)} onClick={() => setOpen(false)} className={cls}>
        {item.label}
      </Link>
    );
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "bg-pearl sticky top-0 z-50 border-b transition-[box-shadow,border-color] duration-500",
        scrolled
          ? "border-forest/5 shadow-[0_10px_30px_-18px_rgb(30_58_40/0.35)]"
          : "border-transparent",
      )}
    >
      {/* Đã cuộn: header thấp lại (80 → 64px desktop, 64 → 56px mobile) cùng nhịp với logo thu nhỏ */}
      <div
        className={cn(
          "mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:px-10",
          scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20",
        )}
      >
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={ui.menu}
            aria-expanded={open}
            className="-ml-2 grid size-10 place-items-center lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <nav aria-label="Menu" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {nav.map((item, i) => (
                <li key={item.label} className={i > 2 ? "hidden xl:list-item" : undefined}>
                  {renderNavItem(item)}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Logo
          href={href(lang, "/")}
          priority
          className={cn(
            "h-8 origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-10",
            scrolled && "scale-[0.85]",
          )}
        />

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <button
            type="button"
            data-consult=""
            className="bg-sage-100 text-forest hover:bg-sage-200 hidden h-11 items-center rounded-full px-6 text-[12px] font-semibold tracking-[0.16em] uppercase transition-colors lg:flex"
          >
            {ui.consult}
          </button>
          <LanguageSwitcher lang={lang} className="hidden sm:flex" />
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`${ui.cart.title} (${count})`}
            className="text-forest hover:text-sage-600 relative grid size-10 place-items-center transition"
          >
            <ShoppingBag className="size-[22px]" strokeWidth={1.5} />
            {count > 0 && (
              <span
                key={count}
                className="bg-forest text-pearl absolute top-0.5 right-0 grid min-w-[18px] [animation:popIn_.4s_ease-out] place-items-center rounded-full px-1 text-[10px] leading-[18px] font-bold"
              >
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile toàn màn hình */}
      <div
        inert={!open}
        className={cn(
          "bg-cream fixed inset-x-0 bottom-0 overflow-y-auto transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
        )}
        style={{ top: menuTop }}
        data-lenis-prevent
      >
        <div className="flex min-h-full flex-col px-6 pt-4 pb-24">
          <ul>
            {nav.map((item, i) => (
              <li
                key={item.label}
                className={cn(
                  "transition-all duration-700",
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
                style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
              >
                {renderNavItem(item, true)}
              </li>
            ))}
          </ul>

          {/* Nút tư vấn — mở popup form liên hệ */}
          <button
            type="button"
            data-consult=""
            onClick={() => setOpen(false)}
            className={cn(
              "group bg-forest text-pearl mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-full text-[12px] font-semibold tracking-[0.16em] uppercase transition-all duration-700",
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: open ? `${150 + nav.length * 60}ms` : "0ms" }}
          >
            {ui.consult}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <div className="no-scrollbar -mx-6 mt-7 flex gap-3 overflow-x-auto px-6">
            {menuProducts.map((p) => (
              <Link
                key={p.slug}
                href={href(lang, `/san-pham/${p.slug}`)}
                onClick={() => setOpen(false)}
                className="w-36 shrink-0"
              >
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image src={p.image} alt={p.name} fill sizes="144px" className="object-cover" />
                </div>
                <p className="text-forest mt-2 text-[13px] leading-snug font-semibold">{p.name}</p>
              </Link>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-10">
            <a
              href={`tel:${phoneRaw}`}
              className="text-forest flex items-center gap-2 text-sm font-semibold"
            >
              <Phone className="size-4" aria-hidden="true" /> {phone}
            </a>
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </div>
    </header>
  );
}
