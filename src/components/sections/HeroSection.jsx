"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import PhotoBackdrop from "@/components/ui/PhotoBackdrop";
import Container from "@/components/ui/Container";
import { href } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Hero toàn màn hình kiểu The Beauty Chef: slider chuyển mờ, mỗi slide có nền đúng màu viền ảnh,
 * ảnh tràn mép và được mask mờ dần vào nền → sản phẩm "hoà" với nền, không có khung thẻ.
 * Chiều cao = 1 màn hình trừ thanh thông báo + header (biến --chrome trong globals.css).
 */
const INTERVAL = 5000;

// Mask: desktop mờ dần về phía chữ; mobile mờ dần ở đáy ảnh
const MASK = {
  right: "lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_32%)]",
  left: "lg:[mask-image:linear-gradient(to_left,transparent_0%,#000_32%)]",
};

export default function HeroSection({ lang, slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((i) => setIndex((i + slides.length) % slides.length), [slides.length]);

  return (
    <section
      className="relative h-[calc(var(--screen)-var(--chrome))] min-h-[600px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.image}
            aria-hidden={!active}
            inert={!active}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1200ms] ease-out",
              active ? "z-10 opacity-100" : "z-0 opacity-0",
            )}
            style={{ backgroundColor: s.bg }}
          >
            {/* Nền nhoè từ chính ảnh → phần chữ cùng tông, cùng ánh sáng với ảnh (mọi slide) */}
            <PhotoBackdrop
              src={s.image}
              pos={s.pos}
              tint={s.bg}
              fade={s.side === "right" ? "left" : "right"}
              strength={s.dark ? 0.62 : 0.72}
              dark={s.dark}
              className="hidden lg:block"
            />
            <PhotoBackdrop
              src={s.image}
              pos={s.pos}
              tint={s.bg}
              fade="bottom"
              strength={s.dark ? 0.7 : 0.8}
              dark={s.dark}
              className="lg:hidden"
            />

            {/* Ảnh: mobile phủ nửa trên, desktop chiếm ~60% một bên */}
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-[58%] [mask-image:linear-gradient(to_bottom,#000_62%,transparent)] lg:inset-y-0 lg:h-full lg:[mask-image:none]",
                // frame "square": khung vuông = đúng tỉ lệ ảnh gốc → hiện trọn sản phẩm, không bị cắt
                s.frame === "square"
                  ? "lg:w-[calc(var(--screen)-var(--chrome))] lg:max-w-[62%]"
                  : "lg:w-[max(58%,calc(var(--screen)-var(--chrome)))] lg:max-w-[70%] xl:w-[max(62%,calc(var(--screen)-var(--chrome)))]",
                s.side === "right" ? "lg:right-0 lg:left-auto" : "lg:right-auto lg:left-0",
                MASK[s.side],
                // khung vuông dịch vào trong 1 chút + mờ cả 2 mép để hoà vào nền nhoè phía sau
                s.frame === "square" &&
                  "lg:right-[7%] lg:[mask-image:linear-gradient(to_right,transparent_0%,#000_30%,#000_86%,transparent_100%)]",
              )}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority={i === 0}
                quality={90}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className={cn("object-cover", active && "animate-kenburns")}
                style={{ objectPosition: s.pos }}
              />
            </div>

            <Container
              wide
              className={cn(
                "relative flex h-full items-end pb-20 lg:items-center lg:pb-0",
                s.side === "right" ? "lg:justify-start" : "lg:justify-end",
              )}
            >
              <div
                key={active ? `on-${index}` : "off"}
                className={cn(
                  "max-w-[520px] text-center lg:w-[40%] lg:max-w-[560px]",
                  s.dark ? "text-pearl" : "text-forest",
                  active && "[animation:fadeUp_1s_cubic-bezier(.22,1,.36,1)_.25s_both]",
                )}
              >
                {/* Dòng giới thiệu: chữ in hoa giãn rộng + 2 gạch mảnh (không dùng badge) */}
                <p
                  className={cn(
                    "flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.28em] uppercase",
                    s.dark ? "text-leaf" : "text-sage-800",
                  )}
                >
                  <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
                  {s.badge}
                  <span className="h-px w-10 bg-current opacity-60" aria-hidden="true" />
                </p>
                {/* text-balance: các dòng tiêu đề dài gần bằng nhau, không rớt 1–2 chữ lẻ */}
                {i === 0 ? (
                  <h1
                    className={
                      "mx-auto mt-5 max-w-[560px] font-serif text-[34px] leading-[1.18] text-balance sm:text-[44px] lg:text-[52px]"
                    }
                  >
                    {s.title}
                  </h1>
                ) : (
                  <h2
                    className={
                      "mx-auto mt-5 max-w-[560px] font-serif text-[34px] leading-[1.18] text-balance sm:text-[44px] lg:text-[52px]"
                    }
                  >
                    {s.title}
                  </h2>
                )}
                <p
                  className={cn(
                    "mx-auto mt-5 max-w-[430px] text-[15px] leading-[1.7] text-pretty",
                    s.dark ? "text-pearl/80" : "text-ink-soft",
                  )}
                >
                  {s.text}
                </p>
                {/* Một nút duy nhất mỗi slide — gọn, rõ hành động chính */}
                <Button
                  href={href(lang, s.path)}
                  variant={s.dark ? "light" : "primary"}
                  arrow
                  className="mt-8"
                >
                  {s.cta}
                </Button>
              </div>
            </Container>

            {/* Sticker tròn kiểu "FREE GIFT" */}
            <span
              className={cn(
                "shadow-card absolute top-[7%] grid size-24 rotate-[-10deg] place-items-center rounded-full text-center text-[11px] leading-tight font-bold tracking-[0.12em] uppercase sm:size-28 lg:top-[9%] lg:size-32 lg:text-xs",
                s.dark ? "bg-pearl text-forest" : "bg-forest text-pearl",
                // Luôn nằm trong vùng ảnh, ở góc xa khối chữ → không bao giờ đè lên tiêu đề
                s.side === "right" ? "right-[5%]" : "left-[5%]",
                s.frame === "square" && "lg:right-[11%]",
              )}
            >
              <span>
                {s.sticker.split("|")[0]}
                <span className="mt-0.5 block font-serif text-lg tracking-normal normal-case lg:text-xl">
                  {s.sticker.split("|")[1]}
                </span>
              </span>
            </span>
          </div>
        );
      })}

      {/* Điều khiển */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous"
          className="bg-pearl/80 text-forest hover:bg-pearl hidden size-9 place-items-center rounded-full transition sm:grid"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1}/${slides.length}`}
              aria-current={i === index}
              className="bg-pearl/45 relative h-1 w-10 overflow-hidden rounded-full"
            >
              {i === index && (
                <span
                  key={index}
                  className="bg-pearl absolute inset-0 origin-left"
                  // Hết vạch tiến độ → sang slide sau; rê chuột vào hero thì vạch dừng lại
                  style={{
                    animation: `loadbar ${INTERVAL}ms linear both`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                  onAnimationEnd={() => go(index + 1)}
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next"
          className="bg-pearl/80 text-forest hover:bg-pearl hidden size-9 place-items-center rounded-full transition sm:grid"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
