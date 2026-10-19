"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Chuyển trang mượt, không chớp trắng (theo ButStudio):
 * - Bấm link nội bộ sang trang KHÁC: <main> mờ dần + trôi nhẹ lên (~0.16s) rồi mới điều hướng;
 *   trang mới hiện lên từ dưới (.page-enter). Nền giữa 2 trang là màu body (kem) → không có khoảng trắng.
 * - Link về CHÍNH trang đang xem, không có # (vd. bấm logo khi đang ở trang chủ): cuộn êm lên đầu trang.
 * - Link cùng trang có #section: để SmoothScroll xử lý.
 * - Bỏ qua: tab mới, tải file, mailto/tel, link ngoài, link đổi ngôn ngữ (hreflang).
 * Đăng ký ở pha CAPTURE để chạy trước handler của <Link>.
 */
const LEAVE_MS = 160;
const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
const norm = (p) => p.replace(/\/$/, "") || "/";

export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();

  // Trang mới: hiệu ứng vào
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;
    main.classList.remove("page-leave");
    main.classList.add("page-enter");
    const t = setTimeout(() => main.classList.remove("page-enter"), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    let safety;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.hasAttribute("hreflang"))
        return;
      const raw = a.getAttribute("href");
      if (!raw || /^(https?:|mailto:|tel:)/.test(raw)) return;
      const url = new URL(raw, window.location.href);
      if (url.origin !== window.location.origin) return;

      if (norm(url.pathname) === norm(window.location.pathname)) {
        if (url.hash) return; // SmoothScroll cuộn tới section
        e.preventDefault();
        if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6, easing: easeOutExpo });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        if (window.location.hash) history.replaceState(null, "", url.pathname);
        return;
      }

      e.preventDefault();
      const main = document.querySelector("main");
      main?.classList.add("page-leave");
      try {
        router.prefetch(url.pathname);
      } catch {}
      setTimeout(
        () => router.push(url.pathname + url.search + url.hash, { scroll: false }),
        LEAVE_MS,
      );
      // điều hướng lỗi/chậm bất thường: không để nội dung ẩn mãi
      clearTimeout(safety);
      safety = setTimeout(() => main?.classList.remove("page-leave"), 4000);
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(safety);
    };
  }, [router]);

  return null;
}
