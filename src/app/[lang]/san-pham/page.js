import PageHero from "@/components/layout/PageHero";
import Bestsellers from "@/components/sections/Bestsellers";
import FaqSection from "@/components/sections/FaqSection";
import RitualSection from "@/components/sections/RitualSection";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { faqs } from "@/data/faqs";
import { faqHeading, ritual, shopPromo } from "@/data/home";
import { categories, products } from "@/data/products";
import { ui } from "@/data/ui";
import { href, localize, t } from "@/i18n";

const copy = {
  title: t("Cửa hàng", "Shop"),
  accent: t("Mayqueen", "Mayqueen"),
  eyebrow: t("Giữ dáng · Thanh lọc · Combo", "Shape · Detox · Sets"),
  text: t(
    "Viên uống giữ dáng, thức uống thanh lọc và combo liệu trình chuyên sâu — chọn đúng sản phẩm cho cơ thể bạn.",
    "Slimming capsules, cleansing drinks and intensive ritual sets — choose what's right for your body.",
  ),
};

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const c = localize(copy, lang);
  return {
    title: c.title,
    description: c.text,
    alternates: {
      canonical: href(lang, "/san-pham"),
      languages: { vi: "/san-pham", en: "/en/shop" },
    },
  };
}

export default async function ShopPage({ params }) {
  const { lang } = await params;
  const site = localize(siteConfig, lang);
  const L = localize({ copy, products, categories, ui, shopPromo, ritual, faqs, faqHeading }, lang);

  return (
    <>
      <PageHero
        crumbs={[{ label: L.ui.home, href: href(lang, "/") }, { label: L.copy.title }]}
        eyebrow={L.copy.eyebrow}
        title={L.copy.title}
        accent={L.copy.accent}
        text={L.copy.text}
      />
      <section className="bg-pearl py-14 lg:py-20">
        <Container wide>
          <Bestsellers
            lang={lang}
            products={L.products}
            categories={L.categories}
            labels={{ ...L.ui, ...L.ui.product }}
            promo={L.shopPromo}
          />
        </Container>
      </section>
      <RitualSection lang={lang} data={L.ritual} />
      <FaqSection data={L.faqHeading} faqs={L.faqs} phone={site.phone} phoneRaw={site.phoneRaw} />
    </>
  );
}
