import Image from "next/image";
import { Quote } from "lucide-react";
import SplitText from "@/components/fx/SplitText";
import Container from "@/components/ui/Container";
import ReviewsCarousel from "@/components/sections/ReviewsCarousel";
import Stars from "@/components/ui/Stars";
import { backgrounds } from "@/data/images";

/**
 * "Tried & Tested": ảnh lifestyle lớn (ly sinh tố xanh) mang điểm đánh giá + tiêu đề,
 * bên cạnh là lưới đánh giá 2×2 chuyển trang (ReviewsCarousel) — luôn hiện trọn thẻ.
 */
export default function TestimonialsSection({ data, reviews }) {
  return (
    <section className="bg-sage-50 py-14 lg:py-12">
      <Container wide className="grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        <div
          className="reveal relative min-h-[400px] overflow-hidden rounded-2xl lg:h-[min(600px,calc(100svh-180px))]"
          data-reveal="clip"
        >
          <Image
            src={backgrounds.greenSmoothie}
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            quality={80}
            className="object-cover object-[55%_70%]"
          />
          <div className="from-forest-deep/90 via-forest-deep/35 to-forest-deep/5 absolute inset-0 bg-gradient-to-t" />
          <Quote className="text-pearl/60 absolute top-7 left-7 size-10" aria-hidden="true" />
          <div className="text-pearl absolute inset-x-0 bottom-0 p-7 sm:p-9">
            <p className="eyebrow text-leaf">{data.eyebrow}</p>
            <SplitText
              text={data.title}
              className="h-display text-pearl mt-3 text-[28px] sm:text-[34px] lg:text-[38px]"
            />
            <div className="border-pearl/20 mt-6 flex items-center gap-4 border-t pt-5">
              <span className="font-serif text-5xl leading-none">4.9</span>
              <span>
                <Stars value={5} size="size-4" />
                <span className="text-pearl/75 mt-1 block text-[13px]">{data.summary}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="lg:h-[min(600px,calc(100svh-180px))]">
          <ReviewsCarousel reviews={reviews} />
        </div>
      </Container>
    </section>
  );
}
