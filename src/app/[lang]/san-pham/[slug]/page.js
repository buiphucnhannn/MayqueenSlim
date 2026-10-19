import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CheckCircle2, Leaf } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Stars from "@/components/ui/Stars";
import { siteConfig } from "@/config/site";
import { testimonialsHeading } from "@/data/home";
import { getProduct, products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { ui } from "@/data/ui";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { LOCALES, href, localize } from "@/i18n";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const raw = getProduct(slug);
  if (!raw) return {};
  const p = localize(raw, lang);
  return {
    title: `${p.name} — ${p.tagline}`,
    description: p.short,
    alternates: {
      canonical: href(lang, `/san-pham/${slug}`),
      languages: { vi: href("vi", `/san-pham/${slug}`), en: href("en", `/san-pham/${slug}`) },
    },
    openGraph: { images: [{ url: p.images[0], width: 2000, height: 2000, alt: p.name }] },
  };
}

// Nội dung phụ thuộc URL (đọc params) — đặt trong <Suspense> ở trang bên dưới
async function ProductContent({ params }) {
  const { lang, slug } = await params;
  const raw = getProduct(slug);
  if (!raw) notFound();

  const site = localize(siteConfig, lang);
  const p = localize(raw, lang);
  const L = localize({ ui, testimonialsHeading, testimonials, products }, lang);
  const labels = { ...L.ui, ...L.ui.product };
  const related = L.products.filter((x) => x.slug !== slug);
  const reviews = L.testimonials.filter(
    (r) => slug === "combo-sang-dot-toi-loc" || !r.product.startsWith("Combo"),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: p.images.map((i) => site.url + i),
    description: p.short,
    brand: { "@type": "Brand", name: "Mayqueen · B.O.T Việt Nam" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews },
    offers: p.options.map((o) => ({
      "@type": "Offer",
      price: o.price,
      priceCurrency: "VND",
      availability: "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-pearl pt-8 pb-16 lg:pt-12 lg:pb-24">
        <Container wide>
          <PageHeroCrumbs lang={lang} labels={L.ui} name={p.name} />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="reveal lg:sticky lg:top-28 lg:self-start">
              <ProductGallery images={p.images} name={p.name} badge={p.badge} />
            </div>

            <div>
              <p className="reveal eyebrow flex items-center gap-2">
                <Leaf className="size-3.5" aria-hidden="true" /> {p.ritual} · {p.spec}
              </p>
              <h1 className="reveal h-display mt-4 text-[34px] sm:text-[42px]">{p.name}</h1>
              <div className="reveal text-ink-soft mt-4 flex items-center gap-3 text-sm">
                <Stars value={p.rating} size="size-4" />
                <span>
                  {p.rating.toFixed(1)} ·{" "}
                  {p.reviews.toLocaleString(lang === "en" ? "en-US" : "vi-VN")} {L.ui.reviews}
                </span>
              </div>
              <p className="reveal text-sage-700 mt-5 font-serif text-xl italic">{p.tagline}</p>
              <p className="reveal text-ink-soft mt-3 leading-relaxed">{p.short}</p>

              <ul className="reveal mt-6 grid gap-2.5 sm:grid-cols-2">
                {p.benefits.map((b) => (
                  <li key={b} className="text-ink flex gap-2 text-sm">
                    <CheckCircle2
                      className="text-sage-600 mt-0.5 size-4 shrink-0"
                      aria-hidden="true"
                    />{" "}
                    {b}
                  </li>
                ))}
              </ul>

              <div className="reveal mt-8">
                <ProductPurchase product={p} lang={lang} labels={labels} />
              </div>

              <div className="reveal divide-forest/10 border-forest/10 mt-10 divide-y border-y">
                {[
                  [labels.description, <p key="d">{p.description}</p>],
                  [
                    labels.ingredients,
                    <ul key="i" className="grid gap-3 sm:grid-cols-2">
                      {p.ingredients.map((ing) => (
                        <li key={ing.name} className="bg-sage-50 rounded-2xl p-4">
                          <p className="text-forest font-semibold">{ing.name}</p>
                          <p className="text-ink-muted mt-1 text-xs">{ing.note}</p>
                        </li>
                      ))}
                    </ul>,
                  ],
                  [labels.usage, <p key="u">{p.usage}</p>],
                  [labels.spec, <p key="s">{p.spec}</p>],
                ].map(([title, body], i) => (
                  <details key={title} className="group py-5" open={i === 0}>
                    <summary className="text-forest flex cursor-pointer list-none items-center justify-between font-serif text-xl [&::-webkit-details-marker]:hidden">
                      {title}
                      <span className="text-sage-600 text-2xl leading-none transition group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="text-ink-soft mt-4 text-sm leading-relaxed">{body}</div>
                  </details>
                ))}
              </div>
              <p className="text-ink-muted mt-6 text-xs leading-relaxed italic">
                * {labels.disclaimer}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <TestimonialsSection data={L.testimonialsHeading} reviews={reviews} />

      <section className="bg-pearl py-16 lg:py-24">
        <Container wide>
          <SectionHeading title={labels.related} />
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
            {related.map((r, i) => (
              <div key={r.slug} className="reveal" style={{ "--reveal-delay": `${i * 120}ms` }}>
                <ProductCard product={r} lang={lang} labels={labels} />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

// Breadcrumb gọn cho trang sản phẩm (không cần banner lớn)
function PageHeroCrumbs({ lang, labels, name }) {
  return (
    <nav aria-label="Breadcrumb" className="reveal text-ink-muted text-xs">
      <Link href={href(lang, "/")} className="hover:text-forest">
        {labels.home}
      </Link>
      <span className="mx-2">/</span>
      <Link href={href(lang, "/san-pham")} className="hover:text-forest">
        {lang === "vi" ? "Cửa hàng" : "Shop"}
      </Link>
      <span className="mx-2">/</span>
      <span className="text-forest">{name}</span>
    </nav>
  );
}

/**
 * Trang không await params ở cấp trên cùng: khung trang (App Shell) dùng chung cho mọi slug,
 * phần đọc params nằm trong <Suspense> → chuyển trang tức thì (Next.js 16 partial prefetching).
 */
export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton variant="product" />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
