"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, Search, ShoppingBag, X } from "lucide-react";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import SearchOverlay from "@/components/layout/SearchOverlay";
import Logo from "@/components/ui/Logo";
import { useCart } from "@/context/CartContext";
import { href, toCanonicalPath } from "@/i18n";
import { lockScroll, subscribeScroll } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Header y như web mẫu Kobler (đo trực tiếp trên kobler.com.vn):
 * - Desktop: CỐ ĐỊNH và KHÔNG đổi nền khi cuộn — luôn là dải tối mờ dần xuống trong suốt
 *   (gradient tối → trong suốt) + làm mờ nhẹ nội dung phía sau (blur 4px); chữ trắng đậm,
 *   hover / trang hiện tại → chữ màu nhấn + gạch chân. Logo trắng ở giữa; menu trang bên trái,
 *   bên phải là "Liên hệ" (mở popup tư vấn) + VI/EN, tìm kiếm, giỏ hàng.
 * - Mobile (< lg): thanh tối đặc; logo trái; VI/EN, tìm kiếm, giỏ, nút menu vuông màu nhấn bên phải.
 * - Trang con: banner ảnh tối nằm dưới header (PageHero / bài viết); trang không có banner
 *   (chi tiết sản phẩm) có dải tối đệm đúng chiều cao header.
 */
export default function Header({ lang, nav, ui, menuProducts, searchItems, phone, phoneRaw }) {
  const pathname = toCanonicalPath(usePathname());
  const { count, setOpen: setCartOpen } = useCart();
  const [menu, setMenu] = useState({ open: false, path: "" });
  const [searchOpen, setSearchOpen] = useState(false);
  // Cuộn khỏi đầu trang → header thấp lại + logo nhỏ lại (mọi trang)
  const [compact, setCompact] = useState(false);
  const compactRef = useRef(false);
  useEffect(
    () =>
      subscribeScroll((y) => {
        const now = y > 60;
        if (now !== compactRef.current) setCompact((compactRef.current = now));
      }),
    [],
  );

  const open = menu.open && menu.path === pathname;
  const setOpen = (v) => setMenu({ open: v, path: pathname });

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => lockScroll(false);
  }, [open]);

  // Chỉ trang chi tiết sản phẩm không có banner ảnh tối riêng
  const hasHero = !/^\/san-pham\/[^/]+/.test(pathname);
  // Mục đang xem = đường dẫn khớp dài nhất (trang combo không làm sáng luôn "Cửa hàng")
  const activePath = nav
    .map((item) => item.path)
    .filter((p) => pathname === p || pathname.startsWith(`${p}/`))
    .sort((a, b) => b.length - a.length)[0];
  const isActive = (path) => path === activePath;
  const linkCls = (active) =>
    cn(
      "inline-block border-b pb-0.5 text-[15px] leading-6 font-semibold whitespace-nowrap transition-colors duration-300 2xl:text-[18px] 2xl:leading-7",
      "hover:border-sage-300 hover:text-sage-300",
      active ? "border-sage-300 text-sage-300" : "border-transparent text-white",
    );

  const navList = (items) => (
    <ul className="flex items-center gap-6 xl:gap-8 2xl:gap-10">
      {items.map((item) => (
        <li key={item.path}>
          <Link href={href(lang, item.path)} className={linkCls(isActive(item.path))}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  const iconBtn =
    "relative grid size-10 place-items-center rounded-full text-white transition-colors hover:text-sage-300";

  return (
    <>
      <header className="bg-moss/95 fixed inset-x-0 top-0 z-50 lg:bg-transparent lg:bg-gradient-to-b lg:from-black/90 lg:to-transparent lg:backdrop-blur-[4px]">
        <div
          className={cn(
            "relative mx-auto flex h-16 max-w-[1920px] items-center justify-between px-4 transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-[min(4.8vw,92px)]",
            compact ? "lg:h-[72px]" : "lg:h-24",
          )}
        >
          <nav aria-label="Menu" className="hidden lg:block">
            {navList(nav)}
          </nav>

          <Logo
            href={href(lang, "/")}
            light
            priority
            className={cn(
              "transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:mx-8",
              compact ? "h-8 lg:h-10 2xl:h-11" : "h-9 lg:h-14 2xl:h-16",
            )}
          />

          <div className="flex items-center justify-end gap-1">
            {/* "Liên hệ" cùng kiểu chữ menu, mở popup tư vấn */}
            <button
              type="button"
              data-consult=""
              className={cn(linkCls(false), "mr-5 hidden lg:block xl:mr-8")}
            >
              {ui.contact}
            </button>
            <LanguageSwitcher lang={lang} light className="mr-1.5 hidden sm:flex" />
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={ui.search.open}
              className={iconBtn}
            >
              <Search className="size-[19px]" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`${ui.cart.title} (${count})`}
              className={iconBtn}
            >
              <ShoppingBag className="size-[19px]" strokeWidth={1.6} />
              {count > 0 && (
                <span
                  key={count}
                  className="bg-sage-500 text-pearl absolute top-0.5 right-0 grid min-w-[17px] [animation:popIn_.4s_ease-out] place-items-center rounded-full px-1 text-[10px] leading-[17px] font-bold"
                >
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </button>
            {/* nút menu vuông màu nhấn như Kobler bản mobile */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={ui.menu}
              aria-expanded={open}
              className="bg-sage-600 ml-1.5 grid size-10 place-items-center rounded-md text-white lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Menu mobile toàn màn hình (nền tối như Kobler) */}
        <div
          inert={!open}
          className={cn(
            "bg-moss fixed inset-x-0 top-16 bottom-0 overflow-y-auto transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden",
            open ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
          )}
          data-lenis-prevent
        >
          <div className="flex min-h-full flex-col px-6 pt-4 pb-24">
            <ul>
              {nav.map((item, i) => (
                <li
                  key={item.path}
                  className={cn(
                    "transition-all duration-700",
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${150 + i * 50}ms` : "0ms" }}
                >
                  <Link
                    href={href(lang, item.path)}
                    onClick={() => setOpen(false)}
                    className="border-pearl/10 text-pearl block border-b py-3 font-serif text-[22px] font-medium uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              data-consult=""
              onClick={() => setOpen(false)}
              className="group bg-sage-600 text-pearl mt-6 flex h-12 w-full items-center justify-center gap-2.5 rounded-full text-[12px] font-semibold tracking-[0.16em] uppercase"
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
                  <p className="text-pearl mt-2 text-[13px] leading-snug font-semibold">{p.name}</p>
                </Link>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-10">
              <a
                href={`tel:${phoneRaw}`}
                className="text-pearl flex items-center gap-2 text-sm font-semibold"
              >
                <Phone className="size-4" aria-hidden="true" /> {phone}
              </a>
              <LanguageSwitcher lang={lang} light />
            </div>
          </div>
        </div>
      </header>

      {/* Trang không có banner ảnh tối: dải tối đệm đúng chiều cao header */}
      {!hasHero && <div aria-hidden="true" className="bg-moss h-16 lg:h-24" />}

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        lang={lang}
        items={searchItems}
        labels={ui.search}
      />
    </>
  );
}
