import Image from "next/image";
import Parallax from "@/components/fx/Parallax";
import SplitText from "@/components/fx/SplitText";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { RotatingBadge } from "@/components/ui/Ornaments";
import { backgrounds, brand } from "@/data/images";

/**
 * Bảo chứng B.O.T Việt Nam — nền ảnh lá xanh trầm tràn ngang (parallax) + lớp phủ tối.
 * Tiêu đề căn giữa, 4 chứng nhận xếp thành dải "kính" chia bằng đường kẻ mảnh (gap-px),
 * các điểm khác biệt thành dãy nhãn bo tròn.
 */
export default function TrustSection({ data, difference }) {
  return (
    <section className="bg-forest-deep text-pearl relative flex items-center overflow-hidden py-14 lg:min-h-[calc(var(--screen)-80px)] lg:py-12">
      <Parallax speed={0.1} className="absolute inset-x-0 -inset-y-[20%]">
        <Image
          src={backgrounds.moodyLeaves}
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="object-cover object-[center_40%]"
        />
      </Parallax>
      <div className="bg-forest-deep/70 absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(20_42_28/0.75)_100%)]" />

      <Container wide className="relative w-full">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <RotatingBadge
            id="trust-badge"
            text="AUTHENTIC • CERTIFIED • B.O.T VIETNAM • "
            className="reveal text-leaf size-24"
          >
            <Image
              src={brand.stackedWhite}
              alt="B.O.T Việt Nam"
              width={56}
              height={56}
              className="h-12 w-auto"
            />
          </RotatingBadge>
          <p className="reveal eyebrow text-leaf mt-5">{data.eyebrow}</p>
          <SplitText
            text={data.title}
            className="h-display text-pearl mt-3 text-[28px] sm:text-[34px] lg:text-[40px]"
          />
          <p className="reveal text-pearl/75 mt-4 text-[15px] leading-relaxed">{data.text}</p>
        </div>

        <ul className="reveal border-pearl/15 bg-pearl/15 mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:grid-cols-4">
          {data.certificates.map((c, i) => (
            <li
              key={c.title}
              className="group bg-forest-deep/80 hover:bg-forest-deep/55 relative p-4 transition-colors duration-500 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <span className="bg-leaf text-forest grid size-10 place-items-center rounded-full transition-transform duration-500 group-hover:-rotate-12 sm:size-12">
                  <Icon name={c.icon} className="size-5" />
                </span>
                <span className="text-pearl/20 font-serif text-2xl sm:text-3xl">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-serif text-[17px] leading-snug sm:mt-5 sm:text-xl">
                {c.title}
              </h3>
              <p className="text-pearl/60 mt-1.5 text-[12px] leading-relaxed sm:mt-2 sm:text-[13px]">
                {c.text}
              </p>
            </li>
          ))}
        </ul>

        <ul className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center sm:gap-3">
          {difference.map((d, i) => (
            <li
              key={d.title}
              className="reveal border-pearl/20 bg-pearl/[0.06] flex items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-center text-[12px] font-medium sm:gap-2.5 sm:px-5 sm:text-[13px]"
              style={{ "--reveal-delay": `${i * 80}ms` }}
            >
              <Icon name={d.icon} className="text-leaf size-4" />
              {d.title}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
