import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Lightbulb } from "lucide-react";
import ArticleCard from "@/components/blog/ArticleCard";
import Parallax from "@/components/fx/Parallax";
import SplitText from "@/components/fx/SplitText";
import Button from "@/components/ui/Button";
import Price from "@/components/ui/Price";
import Container from "@/components/ui/Container";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/config/site";
import { articleCategories, articles, getArticle } from "@/data/articles";
import { getProduct } from "@/data/products";
import { ui } from "@/data/ui";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { LOCALES, href, localize, t } from "@/i18n";
import { formatDate } from "@/lib/utils";

const copy = {
  back: t("Tất cả bài viết", "All articles"),
  fromPage: t("Bài viết được chia sẻ từ fanpage Mayqueen", "Shared from the Mayqueen fanpage"),
  consultLine: t("Nhận lộ trình giữ dáng riêng cho bạn →", "Get a personalised plan →"),
  shopTitle: t("Gợi ý cho bạn", "Recommended for you"),
  more: t("Đọc thêm", "Keep reading"),
};

// Sản phẩm gợi ý theo chuyên mục bài viết
const PRODUCT_BY_CATEGORY = {
  detox: "yodetox-extra",
  "eat-clean": "mayqueen-slim",
  "giu-dang": "combo-sang-dot-toi-loc",
};

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => articles.map((a) => ({ lang, slug: a.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const raw = getArticle(slug);
  if (!raw) return {};
  const a = localize(raw, lang);
  return {
    title: a.title,
    description: a.excerpt,
    alternates: {
      canonical: href(lang, `/song-dep/${slug}`),
      languages: { vi: href("vi", `/song-dep/${slug}`), en: href("en", `/song-dep/${slug}`) },
    },
    openGraph: {
      type: "article",
      publishedTime: a.date,
      images: [{ url: a.cover, width: 2000, height: 2000, alt: a.title }],
    },
  };
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="reveal text-forest mt-12 font-serif text-3xl">{block.text}</h2>;
    case "list":
      return (
        <ul className="reveal mt-5 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="bg-sage-500 mt-2.5 size-1.5 shrink-0 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <aside className="reveal bg-sage-50 text-forest mt-10 flex gap-4 rounded-md p-6">
          <Lightbulb className="text-sage-600 mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p className="font-medium">{block.text}</p>
        </aside>
      );
    default:
      return <p className="reveal mt-5">{block.text}</p>;
  }
}

// Nội dung phụ thuộc URL (đọc params) — đặt trong <Suspense> ở trang bên dưới
async function ArticleContent({ params }) {
  const { lang, slug } = await params;
  const raw = getArticle(slug);
  if (!raw) notFound();

  const site = localize(siteConfig, lang);
  const a = localize(raw, lang);
  const L = localize({ copy, ui, articleCategories }, lang);
  const categoryLabels = Object.fromEntries(L.articleCategories.map((c) => [c.id, c.label]));
  const product = localize(getProduct(PRODUCT_BY_CATEGORY[a.category]), lang);
  const more = localize(articles.filter((x) => x.slug !== slug).slice(0, 2), lang);

  return (
    <article>
      {/* Banner bài viết: ảnh bìa làm nền tràn ngang (parallax) + lớp phủ tối, chữ trắng căn giữa */}
      <header className="bg-forest-deep text-pearl relative flex min-h-[420px] items-center overflow-hidden py-16 lg:h-[min(62svh,560px)]">
        <Parallax speed={0.12} className="absolute inset-x-0 -inset-y-[15%]">
          <Image
            src={a.cover}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="from-forest-deep/55 via-forest-deep/65 to-forest-deep/85 absolute inset-0 bg-gradient-to-b" />

        <Container className="relative max-w-4xl text-center">
          <Link
            href={href(lang, "/song-dep")}
            className="reveal text-pearl/75 hover:text-pearl inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> {L.copy.back}
          </Link>
          <p className="reveal text-leaf mt-8 text-[12px] font-semibold tracking-[0.24em] uppercase">
            {categoryLabels[a.category]}
          </p>
          <SplitText
            as="h1"
            text={a.title}
            step={40}
            className="h-display text-pearl mt-4 text-[30px] text-balance sm:text-4xl lg:text-[46px]"
          />
          <p className="reveal text-pearl/70 mt-6 flex items-center justify-center gap-4 text-sm">
            <time dateTime={a.date}>{formatDate(a.date, lang)}</time>
            <span className="bg-pearl/30 h-3 w-px" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" /> {a.readTime} {L.ui.minRead}
            </span>
          </p>
        </Container>
      </header>

      {/* Nội dung rộng hơn; cột phải gọn (luôn thấp hơn màn hình) nên sticky suốt chiều dài bài */}
      <Container
        wide
        className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:py-20 xl:gap-24"
      >
        <div className="text-ink-soft text-[17px] leading-[1.8]">
          <p className="reveal text-forest font-serif text-2xl leading-snug">{a.excerpt}</p>
          <div>
            {a.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-5">
            <figure className="reveal bg-sage-50 flex items-center gap-4 rounded-2xl p-4">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                <Image src={a.thumb} alt={a.title} fill sizes="96px" className="object-cover" />
              </div>
              <figcaption>
                <p className="text-ink-soft text-[13px] leading-snug">{L.copy.fromPage}</p>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sage-700 hover:text-forest mt-2 inline-flex items-center gap-1.5 text-xs font-semibold"
                >
                  <FacebookIcon className="size-4" /> Facebook
                </a>
              </figcaption>
            </figure>

            <div
              className="reveal border-forest/10 rounded-2xl border p-5"
              style={{ "--reveal-delay": "120ms" }}
            >
              <p className="eyebrow">{L.copy.shopTitle}</p>
              <Link
                href={href(lang, `/san-pham/${product.slug}`)}
                className="group mt-4 flex gap-4"
              >
                <div className="bg-sand relative size-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sage-600 text-[10.5px] font-semibold tracking-[0.2em] uppercase">
                    {product.ritual}
                  </p>
                  <p className="text-forest group-hover:text-sage-600 mt-1 font-serif text-lg leading-tight">
                    {product.name}
                  </p>
                  <Price
                    price={product.options[0].price}
                    compareAt={product.options[0].compareAt}
                    lang={lang}
                    className="mt-1 text-sm"
                  />
                </div>
              </Link>
              <p className="text-ink-soft mt-4 text-[13px] leading-relaxed">{product.short}</p>
              <Button
                href={href(lang, `/san-pham/${product.slug}`)}
                size="sm"
                arrow
                className="mt-4 w-full"
              >
                {L.ui.viewProduct}
              </Button>
            </div>

            <button
              type="button"
              data-consult=""
              style={{ "--reveal-delay": "240ms" }}
              className="reveal bg-forest text-pearl hover:bg-sage-700 w-full rounded-2xl px-5 py-4 text-left transition"
            >
              <span className="text-leaf block text-[11px] font-semibold tracking-[0.2em] uppercase">
                {L.ui.consult}
              </span>
              <span className="mt-1 block font-serif text-lg leading-snug">
                {L.copy.consultLine}
              </span>
            </button>
          </div>
        </aside>
      </Container>

      <section className="border-forest/10 bg-pearl border-t py-16 lg:py-20">
        <Container wide>
          <h2 className="reveal h-display text-3xl sm:text-4xl">{L.copy.more}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {more.map((m) => (
              <li key={m.slug} className="reveal">
                <ArticleCard
                  article={m}
                  lang={lang}
                  categoryLabel={categoryLabels[m.category]}
                  labels={L.ui}
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </article>
  );
}

/**
 * Trang không await params ở cấp trên cùng: khung trang (App Shell) dùng chung cho mọi slug,
 * phần đọc params nằm trong <Suspense> → chuyển trang tức thì (Next.js 16 partial prefetching).
 */
export default function ArticlePage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}
