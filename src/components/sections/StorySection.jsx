import Image from "next/image";
import Parallax from "@/components/fx/Parallax";
import SplitText from "@/components/fx/SplitText";
import Icon from "@/components/ui/Icon";
import PhotoBackdrop from "@/components/ui/PhotoBackdrop";
import { productImages } from "@/data/images";

/**
 * Câu chuyện thương hiệu + 3 điểm khác biệt (USP) — kiểu khối "Our Story" của The Beauty Chef:
 * nửa trái là ảnh tràn mép (mở dần khi cuộn tới), nửa phải là chữ trên nền trùng màu ảnh.
 */
export default function StorySection({ data }) {
  return (
    <section id="cau-chuyen" className="relative grid scroll-mt-20 bg-[#c3c8a8] lg:grid-cols-2">
      {/* Nền nhoè từ chính ảnh → cột chữ cùng tông với ảnh, không phải mảng màu phẳng */}
      <PhotoBackdrop
        src={productImages.mayqueen.podium}
        pos="75% 72%"
        tint="#c9cdb0"
        fade="right"
        strength={0.7}
      />
      <div
        className="reveal relative z-10 h-[380px] overflow-hidden sm:h-[460px] lg:h-auto lg:min-h-[min(88svh,760px)]"
        data-reveal="clip"
      >
        <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[10%]">
          <Image
            src={productImages.mayqueen.podium}
            alt="Mayqueen Slim"
            fill
            quality={90}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[75%_72%]"
          />
        </Parallax>
      </div>

      <div className="relative z-10 flex items-center px-6 py-14 sm:px-12 lg:px-16 lg:py-16 xl:px-24">
        <div className="max-w-xl">
          <p className="reveal eyebrow text-sage-800">{data.eyebrow}</p>
          <SplitText
            text={data.title}
            className="h-display mt-3 text-[28px] sm:text-[34px] lg:text-[40px]"
          />
          <ol className="divide-forest/15 border-forest/15 mt-8 divide-y border-y">
            {data.items.map((item, i) => (
              <li
                key={item.title}
                className="reveal flex gap-5 py-5"
                style={{ "--reveal-delay": `${i * 110}ms` }}
              >
                <span className="bg-pearl/80 text-sage-700 grid size-11 shrink-0 place-items-center rounded-full">
                  <Icon name={item.icon} className="size-5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-forest font-serif text-xl">{item.title}</h3>
                  <p className="text-ink-soft mt-1 text-[13.5px] leading-relaxed">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
