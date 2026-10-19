import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import MapEmbed from "@/components/common/MapEmbed";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { FacebookIcon, TikTokIcon, ZaloIcon } from "@/components/ui/BrandIcons";
import { brand } from "@/data/images";
import { href } from "@/i18n";

/**
 * Footer gọn, 3 cột cân đối: thương hiệu + liên hệ | các cột link | bản đồ trụ sở.
 * Dải đáy: dấu B.O.T + cam kết chính hãng & lưu ý TPBVSK + bản quyền (một dòng, không đóng khung).
 * Bản đồ: Google Maps Embed API khi có NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY (thẻ địa điểm, ảnh thật),
 * không có key thì dùng bản nhúng công khai. Tông tối bằng CSS filter để hoà vào nền footer.
 */
export default function Footer({ lang, site, footer, products, policies, articleCategories }) {
  const socials = [
    { label: "Facebook", url: site.facebook, Icon: FacebookIcon },
    { label: "TikTok", url: site.tiktok, Icon: TikTokIcon },
    { label: "Zalo", url: site.zalo, Icon: ZaloIcon },
  ];
  const columns = [
    {
      title: footer.shop,
      links: products.map((p) => ({ label: p.name, path: `/san-pham/${p.slug}` })),
    },
    {
      title: footer.journal,
      links: articleCategories.map((c) => ({ label: c.label, path: `/song-dep#${c.id}` })),
    },
    {
      title: footer.policies,
      links: policies.map((p) => ({ label: p.title, path: `/chinh-sach/${p.slug}` })),
    },
  ];

  return (
    <footer className="bg-forest-deep text-pearl">
      <Container
        wide
        className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1fr_1.45fr_1fr] lg:gap-12 lg:py-14"
      >
        {/* Thương hiệu + liên hệ */}
        <div className="reveal">
          <Logo href={href(lang, "/")} light className="h-10" />
          <p className="text-pearl/60 mt-5 max-w-xs text-[13px] leading-relaxed">{footer.about}</p>
          <ul className="text-pearl/80 mt-5 space-y-2.5 text-[13px]">
            <li className="flex gap-2.5">
              <Phone className="text-leaf mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="text-pearl hover:text-leaf font-semibold"
                >
                  {site.phone}
                </a>{" "}
                · {site.contactPerson}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="text-leaf mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
          <ul className="mt-5 flex gap-2.5">
            {socials.map(({ label, url, Icon }) => (
              <li key={label}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="border-pearl/20 hover:border-leaf hover:bg-leaf hover:text-forest grid size-10 place-items-center rounded-full border transition"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Các cột link */}
        <div
          style={{ "--reveal-delay": "120ms" }}
          className="reveal grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-3 lg:col-span-1"
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-leaf text-[11px] font-semibold tracking-[0.22em] uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.path}>
                    <Link
                      href={href(lang, l.path)}
                      className="text-pearl/70 hover:text-pearl text-[13px] text-balance transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bản đồ trụ sở */}
        <div style={{ "--reveal-delay": "240ms" }} className="reveal sm:col-span-2 lg:col-span-1">
          <h3 className="text-leaf text-[11px] font-semibold tracking-[0.22em] uppercase">
            {footer.visit}
          </h3>
          <p className="text-pearl/80 mt-4 flex gap-2.5 text-[13px]">
            <MapPin className="text-leaf mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {site.address}
          </p>
          <MapEmbed
            src={site.mapsEmbed}
            link={site.mapsLink}
            title="Google Maps — Mayqueen Slim"
            labels={footer.map}
            className="ring-pearl/10 mt-4 aspect-[16/9] rounded-xl ring-1"
          />
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-leaf hover:text-pearl mt-3 inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.16em] uppercase"
          >
            <Navigation className="size-3.5" aria-hidden="true" /> {footer.directions}
          </a>
        </div>
      </Container>

      {/* Dải đáy: chính hãng B.O.T + lưu ý + bản quyền */}
      <div className="border-pearl/10 border-t" data-float-guard>
        <Container
          wide
          className="text-pearl/50 flex flex-col gap-4 py-5 text-[11.5px] leading-relaxed lg:flex-row lg:items-center lg:justify-between lg:gap-12"
        >
          {/* Dấu B.O.T + 2 dòng tách bạch: tiêu đề chính hãng / lưu ý TPBVSK (không để lưu ý xuống dòng lửng) */}
          <div className="reveal flex items-center gap-4">
            <Image
              src={brand.stackedWhite}
              alt="B.O.T Việt Nam"
              width={40}
              height={40}
              className="h-9 w-auto shrink-0 opacity-90"
            />
            <span className="bg-pearl/15 h-9 w-px shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-leaf text-[11px] font-semibold tracking-[0.18em] uppercase">
                {footer.certified}
              </p>
              <p className="mt-0.5 text-balance">{footer.disclaimer}</p>
            </div>
          </div>
          <p className="shrink-0">
            © {site.copyrightYear} {site.legalName}. {footer.rights}
          </p>
        </Container>
      </div>
    </footer>
  );
}
