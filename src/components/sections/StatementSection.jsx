import Image from "next/image";
import Parallax from "@/components/fx/Parallax";
import ScrollWords from "@/components/fx/ScrollWords";
import Container from "@/components/ui/Container";
import { backgrounds, brand } from "@/data/images";

/**
 * Câu tuyên ngôn thương hiệu cỡ lớn, sáng dần từng chữ theo nhịp cuộn.
 * Nền: ảnh lá non trên nền nắng (sáng, tươi) tràn ngang, trôi parallax; vầng kem ở giữa để chữ dễ đọc.
 */
export default function StatementSection({ data }) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Parallax speed={0.1} className="absolute inset-x-0 -inset-y-[15%]">
        <Image
          src={backgrounds.airyLeaves}
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="object-cover object-center brightness-[0.82] saturate-[0.9]"
        />
      </Parallax>
      {/* phủ xanh sage dịu ánh nắng + vầng kem mềm ở giữa để chữ nổi */}
      <div className="bg-sage-700/25 absolute inset-0 mix-blend-multiply" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_center,rgb(248_245_236/0.78)_0%,rgb(248_245_236/0.45)_60%,transparent_100%)]" />

      <Container className="relative text-center">
        <Image
          src={brand.stacked}
          alt="B.O.T Việt Nam"
          width={96}
          height={96}
          className="reveal mx-auto h-[72px] w-auto"
        />
        <ScrollWords
          text={data.text}
          base={0.32}
          className="h-display mx-auto mt-8 max-w-4xl text-[26px] leading-[1.3] sm:text-[34px] lg:text-[42px]"
        />
        <p className="reveal text-forest mt-8 text-sm font-semibold tracking-[0.2em] uppercase">
          {data.author}
        </p>
      </Container>
    </section>
  );
}
