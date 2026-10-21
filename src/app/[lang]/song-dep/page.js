import ArticleCard from "@/components/blog/ArticleCard";
import ArticleList from "@/components/blog/ArticleList";
import PageHero from "@/components/layout/PageHero";
import SocialFeed from "@/components/sections/SocialFeed";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { articleCategories, articles } from "@/data/articles";
import { backgrounds } from "@/data/images";
import { socialFeed as socialHeading } from "@/data/home";
import { socialPosts } from "@/data/social";
import { ui } from "@/data/ui";
import { href, localize, t } from "@/i18n";

const copy = {
  eyebrow: t("Chuyên mục lifestyle", "Lifestyle journal"),
  title: t("Sống đẹp", "Live well"),
  accent: t("cùng Mayqueen", "with Mayqueen"),
  text: t(
    "Công thức detox, thực đơn Eat Clean và bí quyết giữ dáng — cẩm nang nhỏ cho một lối sống xanh, khoẻ và thật tự tin.",
    "Detox recipes, Eat Clean menus and body tips — a little guide to a greener, healthier and more confident life.",
  ),
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = localize(copy, lang);
  return {
    title: localize(t("Sống đẹp", "Journal"), lang),
    description: c.text,
    alternates: {
      canonical: href(lang, "/song-dep"),
      languages: { vi: "/song-dep", en: "/en/journal" },
    },
  };
}

export default async function JournalPage({ params }) {
  const { lang } = await params;
  const site = localize(siteConfig, lang);
  const L = localize({ copy, articles, articleCategories, ui, socialHeading, socialPosts }, lang);
  const [featured, ...rest] = L.articles;
  const categoryLabels = Object.fromEntries(L.articleCategories.map((c) => [c.id, c.label]));

  return (
    <>
      <PageHero
        image={backgrounds.airyLeaves}
        crumbs={[
          { label: L.ui.home, href: href(lang, "/") },
          { label: `${L.copy.title} ${L.copy.accent}` },
        ]}
        eyebrow={L.copy.eyebrow}
        title={L.copy.title}
        accent={L.copy.accent}
        text={L.copy.text}
      />
      <section className="bg-pearl pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24">
        <Container wide>
          <div className="reveal" data-reveal="scale">
            <ArticleCard
              article={featured}
              lang={lang}
              categoryLabel={categoryLabels[featured.category]}
              labels={L.ui}
              variant="feature"
              className="lg:h-[min(520px,calc(100svh-200px))]"
            />
          </div>
          <div className="mt-16">
            <ArticleList
              lang={lang}
              articles={rest}
              categories={L.articleCategories}
              labels={L.ui}
            />
          </div>
        </Container>
      </section>
      <SocialFeed data={L.socialHeading} posts={L.socialPosts} site={site} />
    </>
  );
}
