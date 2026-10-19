import Container from "@/components/ui/Container";
import { FacebookIcon, TikTokIcon, ZaloIcon } from "@/components/ui/BrandIcons";
import SplitText from "@/components/fx/SplitText";
import SocialGallery from "@/components/sections/SocialGallery";

// Cộng đồng: tiêu đề + nút mạng xã hội + lưới ảnh fanpage (bấm ảnh mở popup xem lớn kèm mô tả).
export default function SocialFeed({ data, posts, site }) {
  const socials = [
    { label: "Facebook", url: site.facebook, Icon: FacebookIcon },
    { label: "TikTok", url: site.tiktok, Icon: TikTokIcon },
    { label: "Zalo", url: site.zalo, Icon: ZaloIcon },
  ];

  return (
    <section className="bg-sage-50 overflow-hidden py-16 lg:py-20">
      <Container
        wide
        className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left"
      >
        <div>
          <p className="reveal eyebrow">{data.eyebrow}</p>
          <SplitText
            text={data.title}
            className="h-display mt-4 text-[28px] sm:text-[34px] lg:text-[40px]"
          />
          <p className="reveal text-sage-600 mt-3 font-serif text-xl italic">{data.handle}</p>
        </div>
        <ul className="reveal flex flex-wrap justify-center gap-2 sm:gap-3">
          {socials.map(({ label, url, Icon }) => (
            <li key={label}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pearl text-forest shadow-card hover:bg-forest hover:text-pearl flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition sm:px-5 sm:py-3 sm:text-sm"
              >
                <Icon className="size-5" /> {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <Container wide>
        <SocialGallery posts={posts} link={{ href: site.facebook, label: data.viewOn }} />
      </Container>
    </section>
  );
}
