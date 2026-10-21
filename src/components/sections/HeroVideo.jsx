"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import CircleLink from "@/components/ui/CircleLink";
import { href } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Khối 1 — Hero Slider 3 slide:
 * - Slide 0: Video TVC thương hiệu (không chữ đè, tự chạy, tắt tiếng; nút bật tiếng + tạm dừng dạng viên mờ).
 * - Slide 1: Mayqueen Slim (Sáng đốt mỡ - vóc dáng thon gọn).
 * - Slide 2: Yodetox Extra (Tối thanh lọc - thải độc nhẹ bụng).
 * - Slide ảnh hiện 5s rồi tự chuyển tiếp, hết slide cuối thì quay vòng lại video.
 * - Chấm / thanh chỉ báo ở đáy để chuyển slide linh hoạt.
 */
const IMAGE_SLIDE_MS = 5000;

export default function HeroVideo({ lang, data, video, poster, legalNote }) {
  const ref = useRef(null);
  const [slide, setSlide] = useState(0);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const productSlides =
    data.slides && data.slides.length > 0
      ? data.slides
      : [
          {
            id: "mayqueen-slim",
            eyebrow: data.eyebrow,
            title: data.title,
            accent: data.accent,
            text: data.text,
            buy: data.buy,
            buyPath: data.buyPath,
            consult: data.consult,
            image: data.image,
          },
        ];

  const totalSlides = 1 + productSlides.length;

  // Slide video: phát lại từ đầu mỗi lần quay về; tạm dừng khi cuộn khỏi màn hình
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (slide !== 0) {
      v.pause();
      return;
    }
    v.currentTime = 0;
    let visible = true;
    const play = () => !pausedRef.current && visible && v.play().catch(() => {});
    play();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [slide]);

  // Slide ảnh: tự động chuyển sang slide tiếp theo sau khoảng thời gian định trước
  useEffect(() => {
    if (slide === 0) return;
    const id = setTimeout(() => {
      setSlide((curr) => {
        const next = curr + 1;
        if (next >= totalSlides) {
          pausedRef.current = false;
          setPaused(false);
          return 0;
        }
        return next;
      });
    }, IMAGE_SLIDE_MS);
    return () => clearTimeout(id);
  }, [slide, totalSlides]);

  // Chuyển slide thủ công
  const goTo = (i) => {
    if (i === 0) {
      pausedRef.current = false;
      setPaused(false);
    }
    setSlide(i);
  };

  const togglePause = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      pausedRef.current = false;
      setPaused(false);
    } else {
      v.pause();
      pausedRef.current = true;
      setPaused(true);
    }
  };

  const toggleMute = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const ctrl =
    "grid size-10 place-items-center rounded-full text-white transition hover:bg-white/15";
  const fade = (i) =>
    cn(
      "absolute inset-0 transition-opacity duration-1000 ease-out",
      slide === i ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0",
    );

  return (
    <section className="text-pearl relative h-[var(--screen)] min-h-[560px] overflow-hidden bg-[#0b160e]">
      {/* "Sân khấu" tối đa 1920px: chữ + ảnh luôn giữ đúng bố cục như ở 100% dù thu/phóng trình duyệt */}
      <div className="relative mx-auto h-full max-w-[1920px]">
        {/* ---------- Slide 0: chỉ video ---------- */}
        <div className={fade(0)} aria-hidden={slide !== 0}>
          {/* Mobile: video phủ kín màn dọc, khung căn vào chủ thể (người ở giữa-trái khung 16:9) */}
          <video
            ref={ref}
            className="media-cap absolute inset-0 size-full object-cover object-[42%_center] sm:object-center"
            src={video}
            poster={poster}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={() => setSlide(1)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-20 flex justify-center">
            <div className="flex items-center gap-1 rounded-full bg-white/20 p-1.5 backdrop-blur-md">
              <button type="button" onClick={toggleMute} aria-label={data.mute} className={ctrl}>
                {muted ? (
                  <VolumeX className="size-5" strokeWidth={1.5} />
                ) : (
                  <Volume2 className="size-5" strokeWidth={1.5} />
                )}
              </button>
              <button type="button" onClick={togglePause} aria-label={data.pause} className={ctrl}>
                {paused ? (
                  <Play className="size-5" strokeWidth={1.5} />
                ) : (
                  <Pause className="size-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Slides sản phẩm (Slide 1 & Slide 2) ---------- */}
        {productSlides.map((s, idx) => {
          const slideIndex = idx + 1;
          const isActive = slide === slideIndex;
          return (
            <div
              key={s.id || idx}
              className={cn(fade(slideIndex), "bg-[#0b160e]")}
              aria-hidden={!isActive}
            >
              {/* Ảnh sản phẩm nền sang trọng - HD siêu nét */}
              <div className="media-cap absolute inset-0 overflow-hidden">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  priority={idx === 0}
                  unoptimized
                  sizes="100vw"
                  className={cn(
                    "object-cover object-[70%_center] transition-transform duration-[8s] ease-out sm:object-[68%_center] lg:object-center",
                    isActive ? "scale-100" : "scale-[1.04]",
                  )}
                />
              </div>

              {/* Gradient phủ tinh tế cho khối chữ bên trái, giữ trọn 100% độ sắc nét cho sản phẩm bên phải */}
              <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#0b160e]/90 via-[#0b160e]/55 via-35% to-transparent to-50% sm:block" />
              <div className="pointer-events-none absolute inset-0 bg-[#0b160e]/60 sm:hidden" />

              {/* Khối nội dung chữ & nút CTA */}
              <div className="pointer-events-auto relative flex h-full flex-col justify-center px-5 pt-16 pb-16 sm:px-10 lg:justify-center lg:px-[min(5.5vw,105px)] lg:pt-24 lg:pb-16 [@media(max-height:720px)]:lg:pb-10">
                <div
                  key={`${slideIndex}-${isActive}`}
                  className={cn(
                    "max-w-[560px] xl:max-w-[620px]",
                    isActive && "[animation:fadeUp_1.1s_cubic-bezier(.22,1,.36,1)_.2s_both]",
                  )}
                >
                  <p className="text-sage-300 flex items-center gap-3 text-[11px] font-semibold tracking-[0.32em] uppercase">
                    <span className="bg-sage-300 h-px w-8" aria-hidden="true" />
                    {s.eyebrow}
                  </p>
                  <h1 className="text-pearl mt-5 font-serif text-[42px] leading-[1.05] font-medium sm:text-[56px] lg:text-[clamp(56px,4.2vw,80px)] [@media(max-height:720px)]:lg:text-[52px]">
                    {s.title} –<span className="text-sage-300 block italic">{s.accent}</span>
                  </h1>
                  <p className="text-pearl/80 mt-6 max-w-[460px] text-[15px] leading-[1.75] sm:text-base [@media(max-height:720px)]:mt-4">
                    {s.text}
                  </p>
                  <div className="mt-9 flex flex-wrap items-center gap-x-9 gap-y-4 [@media(max-height:720px)]:mt-6">
                    <CircleLink href={href(lang, s.buyPath)} light>
                      {s.buy}
                    </CircleLink>
                    <CircleLink data-consult="" light>
                      {s.consult}
                    </CircleLink>
                  </div>
                  <p className="border-pearl/15 text-pearl/55 mt-10 max-w-[460px] border-t pt-4 text-[11.5px] leading-relaxed [@media(max-height:720px)]:mt-6">
                    {legalNote}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* Chấm / Thanh chuyển slide */}
        <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-2.5">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={slide === i}
              className={cn(
                "rounded-full transition-all duration-300",
                slide === i
                  ? "bg-sage-300 h-2.5 w-7"
                  : "size-2.5 border border-white/80 bg-white/20 hover:bg-white/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
