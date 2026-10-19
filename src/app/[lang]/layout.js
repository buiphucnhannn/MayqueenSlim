import { Be_Vietnam_Pro, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import CartDrawer from "@/components/cart/CartDrawer";
import BackToTop from "@/components/common/BackToTop";
import ConsultModal from "@/components/common/ConsultModal";
import FloatingContact from "@/components/common/FloatingContact";
import FloatLift from "@/components/fx/FloatLift";
import PageTransition from "@/components/fx/PageTransition";
import Preloader from "@/components/fx/Preloader";
import Reveal from "@/components/fx/Reveal";
import SmoothScroll from "@/components/fx/SmoothScroll";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/context/CartContext";
import { articleCategories } from "@/data/articles";
import { announcements } from "@/data/home";
import { policies } from "@/data/policies";
import { products } from "@/data/products";
import { footer, nav, ui } from "@/data/ui";
import { LOCALES, href, isLocale, localize } from "@/i18n";
import "../globals.css";

// Tiêu đề: serif mềm mại, hiện đại (gần chữ trên vỏ hộp) · Nội dung: sans hỗ trợ tiếng Việt đầy đủ
const serif = Fraunces({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const sans = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const site = localize(siteConfig, lang);
  const title = `${site.name} — ${site.tagline}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description: site.description,
    keywords: site.keywords,
    applicationName: site.name,
    alternates: { canonical: href(lang, "/"), languages: { vi: "/", en: "/en" } },
    openGraph: {
      type: "website",
      locale: lang === "vi" ? "vi_VN" : "en_US",
      url: href(lang, "/"),
      siteName: site.name,
      title,
      description: site.description,
    },
    twitter: { card: "summary_large_image", title, description: site.description },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: siteConfig.themeColor,
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const site = localize(siteConfig, lang);
  const L = localize(
    { nav, ui, footer, announcements, products, policies, articleCategories },
    lang,
  );

  // Dữ liệu có cấu trúc cho Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: site.legalName,
    brand: site.name,
    description: site.description,
    url: site.url + href(lang, "/"),
    telephone: `+84${site.phoneRaw.slice(1)}`,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hà Đông",
      addressRegion: "Hà Nội",
      addressCountry: "VN",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsLink,
    sameAs: [site.facebook],
  };

  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider lang={lang}>
          <Preloader caption={lang === "vi" ? "Thon gọn từ bên trong" : "Slim from within"} />
          <SmoothScroll />
          <PageTransition />
          <FloatLift />
          <Reveal />
          <AnnouncementBar messages={L.announcements} />
          <Header
            lang={lang}
            nav={L.nav}
            ui={L.ui}
            phone={site.phone}
            phoneRaw={site.phoneRaw}
            menuProducts={L.products.map((p) => ({
              slug: p.slug,
              name: p.name,
              image: p.images[0],
            }))}
          />
          <main>{children}</main>
          <Footer
            lang={lang}
            site={site}
            footer={L.footer}
            products={L.products}
            policies={L.policies}
            articleCategories={L.articleCategories.filter((c) => c.id !== "all")}
          />
          <CartDrawer labels={{ ...L.ui.cart, close: L.ui.close }} />
          <FloatingContact
            phoneRaw={site.phoneRaw}
            zalo={site.zalo}
            messenger={site.messenger}
            labels={L.ui}
          />
          <ConsultModal labels={L.ui.consultModal} formLabels={L.ui.form} site={site} />
          <BackToTop label={L.ui.toTop} />
        </CartProvider>
      </body>
    </html>
  );
}
