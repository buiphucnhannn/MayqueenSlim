import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import Parallax from "@/components/fx/Parallax";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { href } from "@/i18n";
import { LeafSprig } from "@/components/ui/Ornaments";
import { cn } from "@/lib/utils";

// Một nửa liệu trình: ảnh tràn kín ô, chữ đặt trên lớp chuyển màu ở đáy (không khung thẻ)
function RitualPanel({ lang, item, night = false, delay = "0ms" }) {
  return (
    <Link
      href={href(lang, item.path)}
      style={{ "--reveal-delay": delay }}
      className="reveal group relative block h-[420px] overflow-hidden sm:h-[480px] lg:h-[min(62svh,560px)]"
    >
      <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[12%]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[center_25%] transition duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </Parallax>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t to-transparent",
          night
            ? "from-forest-deep/95 via-forest-deep/50"
            : "from-forest-deep/90 via-forest-deep/40",
        )}
      />
      <div className="text-pearl absolute inset-x-0 bottom-0 p-7 sm:p-10">
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase">
          {night ? (
            <Moon className="size-4" aria-hidden="true" />
          ) : (
            <Sun className="size-4 text-amber-300" aria-hidden="true" />
          )}
          {item.time}
        </p>
        <h3 className="mt-3 font-serif text-3xl sm:text-[34px]">{item.name}</h3>
        <p className="text-pearl/80 mt-2 max-w-md text-sm leading-relaxed">{item.text}</p>
        <span className="border-pearl group-hover:border-leaf group-hover:text-leaf mt-5 inline-block border-b pb-1 text-[11.5px] font-semibold tracking-[0.16em] uppercase transition-colors">
          {item.name} →
        </span>
      </div>
    </Link>
  );
}

// Liệu trình "Sáng đốt mỡ (Mayqueen Slim) – Tối thanh lọc (Yodetox)": 2 nửa ảnh tràn mép
export default function RitualSection({ lang, data }) {
  return (
    <section className="bg-cream">
      {/* Phần mở đầu: nền xanh nhạt + hoạ tiết line-art tối giản; padding trên = dưới */}
      <div className="bg-sage-50 relative overflow-hidden py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgb(95_125_65/0.35)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,transparent_35%,#000_75%)] [background-size:22px_22px] opacity-[0.35]"
          aria-hidden="true"
        />
        <span
          className="border-sage-200 pointer-events-none absolute top-1/2 left-[6%] hidden size-56 -translate-y-1/2 rounded-full border lg:block"
          aria-hidden="true"
        />
        <span
          className="border-sage-200 pointer-events-none absolute top-1/2 right-[6%] hidden size-56 -translate-y-1/2 rounded-full border lg:block"
          aria-hidden="true"
        />
        <LeafSprig className="text-sage-400 absolute top-1/2 left-[9%] hidden h-48 -translate-y-1/2 -rotate-12 lg:block" />
        <LeafSprig className="text-sage-400 absolute top-1/2 right-[9%] hidden h-48 -translate-y-1/2 -scale-x-100 rotate-12 lg:block" />
        <Sun
          className="absolute top-10 left-[30%] hidden size-5 text-amber-400/70 lg:block"
          strokeWidth={1.4}
          aria-hidden="true"
        />
        <Moon
          className="text-sage-500/70 absolute right-[30%] bottom-10 hidden size-5 lg:block"
          strokeWidth={1.4}
          aria-hidden="true"
        />

        <div className="relative">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            accent={data.accent}
            text={data.text}
            className="px-4"
          />
          <div className="reveal mt-8 text-center">
            <Button href={href(lang, data.comboPath)} variant="primary" arrow>
              {data.cta}
            </Button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2">
        <RitualPanel lang={lang} item={data.day} />
        <RitualPanel lang={lang} item={data.night} night delay="150ms" />
      </div>
    </section>
  );
}
