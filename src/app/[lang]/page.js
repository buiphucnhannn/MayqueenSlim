import Bestsellers from "@/components/sections/Bestsellers";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import JournalTeaser from "@/components/sections/JournalTeaser";
import JourneySection from "@/components/sections/JourneySection";
import RitualSection from "@/components/sections/RitualSection";
import SocialFeed from "@/components/sections/SocialFeed";
import StatementSection from "@/components/sections/StatementSection";
import StorySection from "@/components/sections/StorySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustSection from "@/components/sections/TrustSection";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { articleCategories, articles } from "@/data/articles";
import { faqs } from "@/data/faqs";
import * as home from "@/data/home";
import { socialPosts } from "@/data/social";
import { categories, products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { ui } from "@/data/ui";
import { localize } from "@/i18n";

/**
 * Trang chủ — thứ tự section:
 * Hero (slider toàn màn hình) → Sản phẩm bán chạy → Tuyên ngôn
 * → Liệu trình Sáng/Tối → Câu chuyện & USP → Hành trình 30 ngày → Đánh giá → Bảo chứng B.O.T
 * → Sống đẹp → Cộng đồng → Hỏi đáp. (Tư vấn: popup ConsultModal, mở từ mọi nút data-consult)
 */
export default async function HomePage({ params }) {
  const { lang } = await params;
  const site = localize(siteConfig, lang);
  const L = localize(
    {
      ...home,
      ui,
      products,
      categories,
      testimonials,
      faqs,
      articles,
      articleCategories,
      socialPosts,
    },
    lang,
  );
  const productLabels = { ...L.ui, ...L.ui.product };
  const categoryLabels = Object.fromEntries(L.articleCategories.map((c) => [c.id, c.label]));

  return (
    <>
      <HeroSection lang={lang} slides={L.hero.slides} />

      <section id="san-pham" className="bg-pearl scroll-mt-20 py-16 lg:py-20">
        <Container wide>
          <SectionHeading
            eyebrow={L.bestsellers.eyebrow}
            title={L.bestsellers.title}
            text={L.bestsellers.text}
            className="mb-8"
          />
          <Bestsellers
            lang={lang}
            products={L.products}
            categories={L.categories}
            labels={productLabels}
            promo={L.shopPromo}
          />
        </Container>
      </section>
      <StatementSection data={L.statement} />
      <RitualSection lang={lang} data={L.ritual} />
      <StorySection data={L.usp} />
      <JourneySection data={L.journey} />
      <TestimonialsSection data={L.testimonialsHeading} reviews={L.testimonials} />
      <TrustSection data={L.trust} difference={L.difference} />
      <JournalTeaser
        lang={lang}
        data={L.journalTeaser}
        articles={L.articles}
        categoryLabels={categoryLabels}
        labels={L.ui}
      />
      <SocialFeed data={L.socialFeed} posts={L.socialPosts} site={site} />
      <FaqSection data={L.faqHeading} faqs={L.faqs} phone={site.phone} phoneRaw={site.phoneRaw} />
    </>
  );
}
