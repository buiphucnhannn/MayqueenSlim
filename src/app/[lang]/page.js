import BrandStory from "@/components/sections/BrandStory";
import CertificatesSection from "@/components/sections/CertificatesSection";
import HeroVideo from "@/components/sections/HeroVideo";
import IngredientLayers from "@/components/sections/IngredientLayers";
import JournalTeaser from "@/components/sections/JournalTeaser";
import ProductShowcase from "@/components/sections/ProductShowcase";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import Transformation from "@/components/sections/Transformation";
import { siteConfig } from "@/config/site";
import { articleCategories, articles } from "@/data/articles";
import { certificates, testReports } from "@/data/certificates";
import * as home from "@/data/home";
import { ingredientTabs } from "@/data/ingredients";
import { products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { ui } from "@/data/ui";
import { localize } from "@/i18n";

/**
 * Trang chủ v2 — kể chuyện theo phong cách web mẫu Kobler, mỗi khối gần trọn màn hình:
 * 1 Video TVC → đoạn "biến hình" → 2 Câu chuyện thương hiệu → Sản phẩm (combo Sáng – Tối)
 * → 3 Thành phần (tách lớp) → 4 Chứng nhận → 5 Cảm nhận → Sống đẹp → Tư vấn 1:1 → 6 Chân trang (layout).
 */
export default async function HomePage({ params }) {
  const { lang } = await params;
  const site = localize(siteConfig, lang);
  const L = localize(
    {
      ...home,
      ui,
      products,
      testimonials,
      articles,
      articleCategories,
      certificates,
      testReports,
      ingredientTabs,
    },
    lang,
  );
  const categoryLabels = Object.fromEntries(L.articleCategories.map((c) => [c.id, c.label]));

  return (
    <>
      <HeroVideo
        lang={lang}
        data={L.hero}
        video={site.heroVideo}
        poster={site.heroPoster}
        legalNote={L.legalNote}
      />
      <Transformation data={L.transformation} />
      <BrandStory lang={lang} data={L.story} />
      <ProductShowcase
        lang={lang}
        data={L.showcase}
        products={L.products}
        labels={{ ...L.ui, ...L.ui.product }}
      />
      <IngredientLayers lang={lang} data={L.ingredientsHeading} tabs={L.ingredientTabs} />
      <CertificatesSection
        data={L.certificatesHeading}
        certificates={L.certificates}
        reports={L.testReports}
        labels={{ view: L.ui.view }}
      />
      <TestimonialSlider data={L.testimonialsHeading} reviews={L.testimonials} />
      <JournalTeaser
        lang={lang}
        data={L.journalTeaser}
        articles={L.articles}
        categoryLabels={categoryLabels}
        labels={L.ui}
      />
    </>
  );
}
