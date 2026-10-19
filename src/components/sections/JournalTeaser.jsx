import ArticleCard from "@/components/blog/ArticleCard";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { href } from "@/i18n";

// Góc "Sống đẹp cùng Mayqueen" trên trang chủ: 1 bài nổi bật + danh sách bài mới.
export default function JournalTeaser({ lang, data, articles, categoryLabels, labels }) {
  const [featured, ...rest] = articles;
  return (
    <section className="bg-pearl py-14 lg:py-12">
      <Container wide>
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow={data.eyebrow}
            title={data.title}
            align="left"
            className="max-w-3xl"
          />
          <Button href={href(lang, "/song-dep")} variant="outline" arrow className="reveal">
            {data.cta}
          </Button>
        </div>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div className="reveal lg:h-full" data-reveal="scale">
            <ArticleCard
              article={featured}
              lang={lang}
              categoryLabel={categoryLabels[featured.category]}
              labels={labels}
              variant="feature"
              className="lg:min-h-[min(460px,calc(100svh-340px))]"
            />
          </div>
          <ul className="divide-forest/10 flex flex-col justify-between divide-y">
            {rest.slice(0, 3).map((a, i) => (
              <li key={a.slug} className="reveal py-2" style={{ "--reveal-delay": `${i * 100}ms` }}>
                <ArticleCard
                  article={a}
                  lang={lang}
                  categoryLabel={categoryLabels[a.category]}
                  labels={labels}
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
