import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { getPolicy, policies } from "@/data/policies";
import { footer, ui } from "@/data/ui";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { LOCALES, href, localize } from "@/i18n";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => policies.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const p = getPolicy(slug);
  if (!p) return { title: localize(siteConfig.notFoundTitle, lang) };
  return {
    title: localize(p.title, lang),
    alternates: { canonical: href(lang, `/chinh-sach/${slug}`) },
  };
}

// Nội dung phụ thuộc URL (đọc params) — đặt trong <Suspense> ở trang bên dưới
async function PolicyContent({ params }) {
  const { lang, slug } = await params;
  const raw = getPolicy(slug);
  if (!raw) notFound();

  const site = localize(siteConfig, lang);
  const p = localize(raw, lang);
  const L = localize({ ui, footer, policies }, lang);

  return (
    <>
      <PageHero
        crumbs={[
          { label: L.ui.home, href: href(lang, "/") },
          { label: L.footer.policies },
          { label: p.title },
        ]}
        title={p.title}
      />
      <section className="bg-pearl section-y">
        <Container wide className="grid gap-12 lg:grid-cols-[280px_1fr]">
          <nav aria-label={L.footer.policies} className="lg:sticky lg:top-28 lg:self-start">
            <ul className="reveal space-y-1">
              {L.policies.map((x) => (
                <li key={x.slug}>
                  <Link
                    href={href(lang, `/chinh-sach/${x.slug}`)}
                    className={cn(
                      "block rounded-full px-5 py-3 text-sm font-medium transition",
                      x.slug === slug ? "bg-forest text-pearl" : "text-ink-soft hover:bg-sage-50",
                    )}
                  >
                    {x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-ink-soft max-w-3xl space-y-5 text-[17px] leading-relaxed">
            {p.body.map((para) => (
              <p key={para} className="reveal">
                {para}
              </p>
            ))}
            <p className="reveal bg-sage-50 rounded-md p-6 text-sm">
              {site.legalName} · {site.address} · Hotline:{" "}
              <a href={`tel:${site.phoneRaw}`} className="text-forest font-semibold">
                {site.phone}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

/**
 * Trang không await params ở cấp trên cùng: khung trang (App Shell) dùng chung cho mọi slug,
 * phần đọc params nằm trong <Suspense> → chuyển trang tức thì (Next.js 16 partial prefetching).
 */
export default function PolicyPage({ params }) {
  return (
    <Suspense fallback={<PageSkeleton variant="text" />}>
      <PolicyContent params={params} />
    </Suspense>
  );
}
