import Image from "next/image";
import Parallax from "@/components/fx/Parallax";
import ScrollProgress from "@/components/fx/ScrollProgress";
import SplitText from "@/components/fx/SplitText";
import Container from "@/components/ui/Container";
import { backgrounds } from "@/data/images";

/**
 * Hành trình 30 ngày — bố cục đối xứng: ảnh lifestyle tràn nền (parallax) phủ tối đều,
 * tiêu đề căn giữa, 4 cột mốc xếp hàng ngang nối bằng một vạch chạy theo nhịp cuộn.
 * Mobile: các mốc xếp dọc.
 */
export default function JourneySection({ data }) {
  return (
    <section className="bg-forest-deep text-pearl relative flex items-center overflow-hidden py-16 lg:min-h-[calc(var(--screen)-80px)] lg:py-12">
      <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[18%]">
        <Image
          src={backgrounds.yogaBamboo}
          alt=""
          fill
          sizes="100vw"
          quality={80}
          className="object-cover object-[center_35%]"
        />
      </Parallax>
      {/* phủ đều, đậm dần xuống dưới nơi đặt các thẻ */}
      <div className="from-forest-deep/70 via-forest-deep/75 to-forest-deep/90 absolute inset-0 bg-gradient-to-b" />

      <Container wide className="relative w-full">
        <div className="mx-auto max-w-2xl text-center">
          <p className="reveal eyebrow text-leaf">{data.eyebrow}</p>
          <SplitText
            text={data.title}
            accent={data.accent}
            accentClass="italic text-leaf"
            className="h-display text-pearl mt-3 text-[28px] sm:text-[34px] lg:text-[40px]"
          />
          <p className="reveal text-pearl/75 mx-auto mt-4 max-w-lg text-[15px] leading-relaxed">
            {data.text}
          </p>
          <p className="reveal border-pearl/20 mt-6 inline-flex items-baseline gap-3 rounded-full border px-5 py-2">
            <span className="text-pearl font-serif text-2xl leading-none">{data.stat.value}</span>
            <span className="text-leaf text-[11px] font-semibold tracking-[0.22em] uppercase">
              {data.stat.label}
            </span>
          </p>
        </div>

        <div className="relative mt-9 sm:mt-12 lg:mt-14">
          {/* vạch nối ngang qua tâm 4 nút số (desktop) */}
          <div
            className="bg-pearl/15 absolute top-6 right-[12.5%] left-[12.5%] hidden h-px lg:block"
            aria-hidden="true"
          />
          <ScrollProgress
            axis="x"
            className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px lg:block"
            barClassName="bg-leaf"
          />
          <ol className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {data.steps.map((s, i) => (
              <li
                key={s.week}
                className="reveal flex flex-col items-center text-center"
                style={{ "--reveal-delay": `${i * 120}ms` }}
              >
                <span className="border-leaf/60 bg-forest-deep text-leaf relative z-10 grid size-10 place-items-center rounded-full border font-serif text-base sm:size-12 sm:text-lg">
                  0{i + 1}
                </span>
                <div className="border-pearl/12 bg-forest-deep/45 hover:border-leaf/40 hover:bg-forest-deep/65 mt-3 w-full flex-1 rounded-2xl border px-3 py-4 transition-colors duration-500 sm:mt-5 sm:px-6 sm:py-6">
                  <p className="text-pearl/55 text-[11px] font-semibold tracking-[0.22em] uppercase">
                    {s.week}
                  </p>
                  <h3 className="text-pearl mt-1.5 font-serif text-lg sm:mt-2 sm:text-[22px]">
                    {s.title}
                  </h3>
                  <p className="text-pearl/70 mt-1.5 text-[12.5px] leading-relaxed sm:mt-2 sm:text-[13.5px]">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="reveal text-pearl/45 mt-8 text-center text-xs italic">* {data.note}</p>
      </Container>
    </section>
  );
}
