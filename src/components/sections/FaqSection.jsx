import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

// Hỏi đáp: dùng <details> gốc — đóng/mở không cần JavaScript, sẵn hỗ trợ bàn phím.
export default function FaqSection({ data, faqs, phone, phoneRaw }) {
  return (
    <section className="bg-pearl py-16 lg:py-24">
      <Container wide className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={data.eyebrow} title={data.title} text={data.text} align="left" />
          <div className="reveal mt-7 flex flex-wrap gap-3">
            <Button data-consult="" variant="primary">
              {data.consultCta}
            </Button>
            <Button href={`tel:${phoneRaw}`} variant="outline">
              {data.cta} · {phone}
            </Button>
          </div>
        </div>
        <div className="divide-forest/10 border-forest/10 divide-y border-y">
          {faqs.map((f, i) => (
            <details
              key={f.q}
              className="reveal group py-5"
              style={{ "--reveal-delay": `${i * 80}ms` }}
              open={i === 0}
            >
              <summary className="text-forest flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-lg sm:text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="border-forest/15 group-open:border-forest group-open:bg-forest group-open:text-leaf grid size-10 shrink-0 place-items-center rounded-full border transition duration-500 group-open:rotate-45">
                  <Plus className="size-4" aria-hidden="true" />
                </span>
              </summary>
              <p className="text-ink-soft mt-4 max-w-2xl pr-14 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
