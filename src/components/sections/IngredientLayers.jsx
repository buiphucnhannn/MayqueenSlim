"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CircleLink from "@/components/ui/CircleLink";
import LuxTitle from "@/components/ui/LuxTitle";
import { href } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Khối 3 — Thành phần (bố cục khối "8 lớp kiến tạo · Công nghệ phía sau" của Kobler):
 * - Cột trái: tiêu đề, tab Mayqueen Slim | Yodetox Extra, sơ đồ lớp: mỗi tấm 3D mảnh nằm ngang hàng
 *   đúng dòng thành phần của nó (nối nét đứt). Khi sơ đồ lọt vào màn hình, các tấm TRƯỢT từ chồng
 *   xếp ra vị trí theo thứ tự (CSS transition → mượt, không giật); cuộn ngược lên thì thu lại thành chồng,
 *   đổi tab thì chạy lại. Mỗi sản phẩm 6 lớp.
 * - Cột phải: "Quy trình phía sau mỗi sản phẩm" — thẻ ảnh + mũi tên; chiều cao 2 cột tương đương.
 * - Mobile: thành phần dạng lưới 2 cột, thẻ quy trình vuốt ngang.
 */
const PLATE = 96; // cạnh tấm vuông trước khi xoay → hình thoi rộng ~136px, cao ~68px
const PLATE_W = Math.round(PLATE * Math.SQRT2);
const PLATE_H = Math.round(PLATE_W / 2);
const ROW = 40; // chiều cao mỗi dòng thành phần = khoảng cách giữa các tấm khi tách
const STACKED = 5; // khoảng cách giữa các tấm khi còn xếp chồng
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Sơ đồ tấm + danh sách — key theo tab để đổi tab là chạy lại hiệu ứng. */
function LayerDiagram({ tab }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const n = tab.layers.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        // vào màn hình → tách lớp; cuộn ngược lên (khối rơi xuống dưới màn hình) → xếp chồng lại.
        // Đã cuộn qua phía trên thì giữ nguyên trạng thái tách.
        if (e.isIntersecting) setShown(true);
        else if (e.boundingClientRect.top > 0) setShown(false);
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative mt-9 flex" style={{ height: n * ROW }}>
      {/* chồng tấm */}
      <div aria-hidden="true" className="relative shrink-0" style={{ width: PLATE_W }}>
        {tab.layers.map((_, i) => {
          const final = i * ROW + ROW / 2 - PLATE_H / 2;
          const stacked = ROW / 2 - PLATE_H / 2 + i * STACKED;
          return (
            <div
              key={i}
              className="absolute top-0 left-0"
              style={{
                width: PLATE_W,
                height: PLATE_H,
                zIndex: n - i,
                transform: `translate3d(0, ${shown ? final : stacked}px, 0)`,
                // tách: lớp trên đi trước; thu lại: lớp dưới về trước
                transition: `transform ${shown ? 1.1 : 0.8}s ${EASE} ${(shown ? i : n - 1 - i) * 70}ms`,
              }}
            >
              <div
                className="absolute"
                style={{
                  width: PLATE,
                  height: PLATE,
                  left: (PLATE_W - PLATE) / 2,
                  top: (PLATE_H - PLATE) / 2,
                  transform: "rotateX(60deg) rotateZ(-45deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="absolute inset-0 rounded-[6px]"
                  style={{ transform: "translateZ(-4px)", background: "#8ea47a" }}
                />
                <div
                  className="absolute inset-0 overflow-hidden rounded-[6px] border border-white/80 shadow-[0_14px_18px_-12px_rgba(30,58,40,.45)]"
                  style={{
                    background:
                      i === 0
                        ? undefined
                        : `linear-gradient(135deg, hsl(${80 + i * 4} 30% ${93 - i * 3}%) 0%, hsl(${90 + i * 4} 26% ${82 - i * 3}%) 100%)`,
                  }}
                >
                  {i === 0 ? (
                    <Image src={tab.image} alt="" fill sizes="110px" className="object-cover" />
                  ) : (
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,.7),transparent_60%)]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* danh sách: mỗi dòng cao ROW, ngang hàng tâm tấm */}
      <ol className="min-w-0 flex-1 pl-16">
        {tab.layers.map((layer, i) => (
          <li
            key={i}
            className="relative flex items-center gap-3.5"
            style={{
              height: ROW,
              opacity: shown ? 1 : 0,
              transform: `translate3d(${shown ? 0 : 14}px, 0, 0)`,
              transition: shown
                ? `opacity .7s ease ${200 + i * 70}ms, transform .9s ${EASE} ${200 + i * 70}ms`
                : `opacity .35s ease, transform .5s ${EASE}`,
            }}
          >
            <span
              aria-hidden="true"
              className="border-forest/25 absolute top-1/2 right-full mr-2 w-10 border-t border-dashed"
            />
            <span className="bg-forest grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold text-white">
              {i + 1}
            </span>
            <span className="min-w-0 truncate text-[13.5px]">
              <span className="text-forest font-semibold tracking-[0.04em] uppercase">
                {layer.name}
              </span>
              <span className="text-ink-muted"> — {layer.benefit}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function IngredientLayers({ lang, data, tabs }) {
  const [tabId, setTabId] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === tabId);
  const trackRef = useRef(null);

  const slide = (dir) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (card) track.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  const arrow =
    "border-forest/25 text-forest hover:bg-forest hover:border-forest grid size-11 place-items-center rounded-full border transition-colors hover:text-white";

  return (
    <section id="thanh-phan" className="bg-pearl section-y relative scroll-mt-16 overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-0">
        {/* ---------- Cột trái: các lớp thành phần ---------- */}
        <div className="min-w-0 lg:pr-12 xl:pr-16">
          <LuxTitle title={data.title} accent={data.accent} size="sm" />

          {/* tab dạng viên thuốc */}
          <div
            role="tablist"
            className="reveal border-forest/10 bg-linen mt-7 inline-flex rounded-full border p-1"
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                aria-selected={t.id === tabId}
                onClick={() => setTabId(t.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase transition-colors sm:px-5",
                  t.id === tabId ? "bg-forest text-white" : "text-ink-soft hover:text-forest",
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "ml-1.5 hidden font-normal normal-case sm:inline",
                    t.id === tabId ? "text-white/70" : "text-ink-muted",
                  )}
                >
                  · {t.time}
                </span>
              </button>
            ))}
          </div>

          {/* Desktop: sơ đồ tấm + danh sách */}
          <div className="hidden lg:block">
            <LayerDiagram key={tabId} tab={tab} />
          </div>

          {/* Mobile / tablet: lưới 2 cột, không cuộn ngang */}
          <ol className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
            {tab.layers.map((layer, i) => (
              <li
                key={`${tabId}-m-${i}`}
                className="reveal border-forest/10 bg-linen rounded-xl border p-4"
                style={{ "--reveal-delay": `${(i % 2) * 80}ms` }}
              >
                <span className="bg-forest grid size-7 place-items-center rounded-full text-[12px] font-semibold text-white">
                  {i + 1}
                </span>
                <p className="text-forest mt-3 text-[13px] font-semibold uppercase">{layer.name}</p>
                <p className="text-ink-muted mt-0.5 text-[13px]">{layer.benefit}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* ---------- Cột phải: quy trình phía sau sản phẩm ---------- */}
        <div className="border-forest/10 flex min-w-0 flex-col lg:border-l lg:pl-12 xl:pl-16">
          <LuxTitle title={data.process.title} accent={data.process.accent} size="sm" />

          <ul
            ref={trackRef}
            className="slider-track -mx-5 mt-9 scroll-px-5 gap-4 scroll-smooth px-5 sm:mx-0 sm:scroll-px-0 sm:px-0"
          >
            {data.process.cards.map((c, i) => (
              <li
                key={c.title}
                className="reveal group relative aspect-[3/4] w-[74%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[calc((100%-16px)/2)] xl:w-[calc((100%-32px)/3)]"
                style={{ "--reveal-delay": `${i * 90}ms` }}
              >
                {/* phóng nhẹ để cắt logo nhỏ ở góc ảnh gốc */}
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 74vw"
                  className="scale-[1.12] object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.18]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a11]/90 via-[#0d1a11]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="text-[12px] font-semibold tracking-[0.2em] text-white/60">
                    0{i + 1}
                  </span>
                  <p className="mt-1 text-[14px] font-semibold tracking-[0.04em] uppercase">
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-white/80">{c.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center justify-between pt-8">
            <CircleLink href={href(lang, "/#chung-nhan")}>{data.process.cta}</CircleLink>
            <div className="hidden gap-3 sm:flex">
              <button
                type="button"
                onClick={() => slide(-1)}
                aria-label="Previous"
                className={arrow}
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => slide(1)} aria-label="Next" className={arrow}>
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
