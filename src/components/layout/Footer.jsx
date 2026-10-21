import Image from "next/image";
import Link from "next/link";
import { Building2, Clock, Hash, Mail, MapPin, Navigation, Phone } from "lucide-react";
import MapEmbed from "@/components/common/MapEmbed";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { FacebookIcon, TikTokIcon, ZaloIcon } from "@/components/ui/BrandIcons";
import { brand } from "@/data/images";
import { href } from "@/i18n";

/**
 * Khối 6 — Thông tin công ty (chân trang, nền tối như Kobler): logo, tên pháp lý, địa chỉ trụ sở, MST, hotline,
 * email, mạng xã hội | các cột link (sản phẩm, sống đẹp, chính sách) | Google Maps nhúng.
 * Thông tin chưa có để chữ mẫu [ … ] trong src/config/site.js → company.
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
      links: articleCategories.map((c) => ({ label: c.label, path: "/song-dep", hash: c.id })),
    },
    {
      title: footer.policies,
      links: policies.map((p) => ({ label: p.title, path: `/chinh-sach/${p.slug}` })),
    },
  ];

  return (
    <footer className="bg-moss text-pearl">
      <Container
        wide
        className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_1.45fr_0.95fr] lg:gap-12 xl:gap-16"
      >
        {/* Thương hiệu + liên hệ */}
        <div className="reveal">
          {/* logo + mạng xã hội cùng 1 hàng */}
          <div className="flex items-center justify-between gap-4">
            <Logo href={href(lang, "/")} light className="h-10" />
            <ul className="flex gap-2">
              {socials.map(({ label, url, Icon }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="border-pearl/20 hover:border-sage-300 hover:bg-sage-300 hover:text-forest grid size-9 place-items-center rounded-full border transition"
                  >
                    <Icon className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-pearl/60 mt-4 text-[13px] leading-relaxed">{footer.about}</p>
          {/* thông tin liên hệ chia 2 cột → thấp hơn một nửa */}
          <ul className="text-pearl/80 mt-5 grid gap-x-7 gap-y-2.5 text-[13px] sm:grid-cols-[auto_1fr] lg:[&_li]:whitespace-nowrap">
            <li className="flex gap-2.5">
              <Building2 className="text-sage-300 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span className="text-pearl font-semibold">{site.company.name}</span>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="text-sage-300 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {site.company.address}
            </li>
            <li className="flex gap-2.5">
              <Hash className="text-sage-300 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {footer.taxId}: {site.company.taxId}
            </li>
            <li className="flex gap-2.5">
              <Phone className="text-sage-300 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="text-pearl hover:text-sage-300 font-semibold"
                >
                  {site.phone}
                </a>{" "}
                · {site.contactPerson}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Mail className="text-sage-300 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {site.company.email}
            </li>
            <li className="flex gap-2.5">
              <Clock className="text-sage-300 mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
        </div>

        {/* Các cột link */}
        <div
          style={{ "--reveal-delay": "120ms" }}
          className="reveal grid grid-cols-2 gap-8 sm:col-span-2 sm:grid-cols-3 lg:col-span-1 lg:grid-cols-[auto_auto_auto] lg:justify-between lg:gap-6"
        >
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sage-300 text-[11px] font-semibold tracking-[0.22em] uppercase">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.path + (l.hash ?? "")}>
                    <Link
                      href={href(lang, l.path) + (l.hash ? `#${l.hash}` : "")}
                      className="text-pearl/70 hover:text-pearl text-[13px] transition lg:whitespace-nowrap"
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
          <h3 className="text-sage-300 text-[11px] font-semibold tracking-[0.22em] uppercase">
            {footer.visit}
          </h3>
          <p className="text-pearl/80 mt-4 flex gap-2.5 text-[13px]">
            <MapPin className="text-sage-300 mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {site.address}
          </p>
          <MapEmbed
            src={site.mapsEmbed}
            link={site.mapsLink}
            title="Google Maps — Mayqueen Slim"
            labels={footer.map}
            className="ring-pearl/10 mt-4 aspect-[2/1] rounded-xl ring-1"
          />
          <a
            href={site.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sage-300 hover:text-pearl mt-3 inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.16em] uppercase"
          >
            <Navigation className="size-3.5" aria-hidden="true" /> {footer.directions}
          </a>
        </div>
      </Container>

      {/* Dải đáy: chính hãng B.O.T + lưu ý + bản quyền */}
      <div className="border-pearl/10 border-t">
        <Container
          wide
          className="text-pearl/50 flex flex-col gap-4 pt-5 pb-24 text-[11.5px] leading-relaxed sm:pb-5 sm:max-2xl:px-24! lg:flex-row lg:items-center lg:justify-between lg:gap-12"
        >
          {/* Dấu B.O.T + 2 dòng tách bạch: tiêu đề chính hãng / lưu ý TPBVSK (không để lưu ý xuống dòng lửng) */}
          <div className="reveal flex items-center gap-4" data-reveal="fade">
            <Image
              src={brand.stackedWhite}
              alt="B.O.T"
              width={40}
              height={40}
              className="h-9 w-auto shrink-0 opacity-90"
            />
            <span className="bg-pearl/15 h-9 w-px shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <p className="text-sage-300 text-[11px] font-semibold tracking-[0.18em] uppercase">
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
