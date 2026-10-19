import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SplitText from "@/components/fx/SplitText";
import Container from "@/components/ui/Container";
import { backgrounds } from "@/data/images";

/**
 * Banner đầu trang con — CÙNG MỘT KÍCH THƯỚC cho mọi trang (cửa hàng, sống đẹp, thanh toán, chính sách).
 * Ảnh cành bạch đàn sắc nét bên phải, hoà (multiply) vào nền kem: nền trắng của ảnh biến thành đúng
 * màu nền → không có đường ghép; mép trái ảnh mờ dần về phía chữ.
 */
export default function PageHero({ crumbs = [], eyebrow, title, accent, text, children }) {
  return (
    <section className="bg-cream relative flex h-[clamp(300px,40svh,400px)] items-center overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-full [mask-image:linear-gradient(to_right,transparent_0%,#000_45%)] opacity-35 mix-blend-multiply sm:w-[70%] sm:opacity-100 lg:w-[55%]">
        <Image
          src={backgrounds.eucalyptus}
          alt=""
          fill
          priority
          quality={85}
          sizes="(min-width: 1024px) 55vw, 70vw"
          className="object-cover object-[70%_70%] brightness-[1.05]"
        />
      </div>

      <Container wide className="relative">
        <nav aria-label="Breadcrumb" className="reveal">
          <ol className="text-ink-muted flex flex-wrap items-center gap-1.5 text-xs">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="size-3" aria-hidden="true" />}
                {c.href ? (
                  <Link href={c.href} className="hover:text-forest">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-forest">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <p className="reveal eyebrow mt-6">{eyebrow}</p>}
        <SplitText
          as="h1"
          text={title}
          accent={accent}
          className="h-display mt-3 max-w-3xl text-[32px] sm:text-[40px] lg:text-[48px]"
        />
        {text && (
          <p
            className="reveal text-ink-soft mt-4 line-clamp-3 max-w-xl text-[15px] leading-relaxed sm:text-base"
            style={{ "--reveal-delay": "200ms" }}
          >
            {text}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
