import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Parallax from "@/components/fx/Parallax";
import Container from "@/components/ui/Container";
import { backgrounds } from "@/data/images";

/**
 * Banner đầu trang con kiểu Kobler (trang Sản phẩm / Tin tức của web mẫu): ảnh tối tràn ngang nằm DƯỚI
 * header trong suốt, breadcrumb nhỏ ngay dưới header, tiêu đề serif IN HOA (phần accent màu nhấn)
 * + đoạn mô tả serif; đường dẫn (breadcrumb) nằm ngay trên tiêu đề, cả cụm căn GIỮA theo chiều cao.
 * Ảnh nền: ảnh ngang độ phân giải cao, hiển thị nguyên tỉ lệ (không phóng thêm) → sắc nét; parallax nhẹ.
 * Cùng một kích thước cho mọi trang con.
 */
export default function PageHero({
  crumbs = [],
  eyebrow,
  title,
  accent,
  text,
  image = backgrounds.moodyLeaves,
  children,
}) {
  return (
    <section className="bg-moss text-pearl relative flex h-[clamp(440px,72svh,620px)] overflow-hidden">
      <Parallax speed={0.06} className="media-cap absolute inset-x-0 -inset-y-[6%]">
        <div className="reveal absolute inset-0" data-reveal="fade">
          <Image
            src={image}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        </div>
      </Parallax>
      <div className="from-moss via-moss/70 absolute inset-0 hidden bg-gradient-to-r via-40% to-transparent sm:block" />
      <div className="bg-moss/65 absolute inset-0 sm:hidden" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/25" />

      <Container wide className="relative flex w-full flex-col pt-24 pb-10 lg:pt-28 lg:pb-12">
        {/* cả cụm (đường dẫn + tiêu đề + mô tả) căn giữa theo chiều cao vùng dưới header */}
        <div className="my-auto max-w-3xl py-6">
          <nav aria-label="Breadcrumb" className="reveal mb-7">
            <ol className="text-pearl/85 flex flex-wrap items-center gap-2 text-xs">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                  {c.href ? (
                    <Link href={c.href} className="hover:text-sage-300">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-pearl">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && (
            <p className="reveal text-sage-300 mb-4 text-[11px] font-semibold tracking-[0.3em] uppercase">
              {eyebrow}
            </p>
          )}
          <h1 className="reveal h-lux text-pearl text-[32px] sm:text-[42px] lg:text-[50px]">
            {title} {accent && <span className="text-sage-300">{accent}</span>}
          </h1>
          {text && (
            <p
              className="reveal text-pearl/85 mt-5 line-clamp-3 max-w-2xl font-serif text-[18px] leading-relaxed sm:text-[20px]"
              style={{ "--reveal-delay": "160ms" }}
            >
              {text}
            </p>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
