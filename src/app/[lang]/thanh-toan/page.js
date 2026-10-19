import CheckoutForm from "@/components/forms/CheckoutForm";
import PageHero from "@/components/layout/PageHero";
import Container from "@/components/ui/Container";
import { ui } from "@/data/ui";
import { href, localize } from "@/i18n";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: localize(ui.checkout.title, lang),
    robots: { index: false },
    alternates: { canonical: href(lang, "/thanh-toan") },
  };
}

export default async function CheckoutPage({ params }) {
  const { lang } = await params;
  const L = localize(ui, lang);

  return (
    <>
      <PageHero
        crumbs={[
          { label: L.home, href: href(lang, "/") },
          { label: L.cart.title, href: href(lang, "/san-pham") },
          { label: L.checkout.title },
        ]}
        title={L.checkout.title}
        text={L.checkout.text}
      />
      <section className="bg-cream pb-20 lg:pb-28">
        <Container wide>
          <CheckoutForm labels={L.checkout} />
        </Container>
      </section>
    </>
  );
}
