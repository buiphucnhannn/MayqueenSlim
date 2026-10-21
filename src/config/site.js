import { t } from "@/i18n";

// Thông tin thương hiệu — lấy từ hồ sơ yêu cầu (docs/demo.docx). Sửa tại đây, toàn site cập nhật theo.
export const siteConfig = {
  name: "Mayqueen Slim",
  legalName: "MayqueenSlim Official",
  parentBrand: "B.O.T Việt Nam",
  tagline: t("Thon gọn từ bên trong", "Slim from within"),
  // Tiêu đề tab trang chủ: "Mayqueen Slim | …" (tên thương hiệu đứng đầu — tab bị cắt vẫn đọc được)
  homeTitle: t("Sáng đốt mỡ – Tối thanh lọc", "Burn by Day, Cleanse by Night"),
  notFoundTitle: t("Không tìm thấy trang", "Page not found"),
  description: t(
    "Mayqueen Slim & Yodetox — giải pháp giữ dáng từ thảo mộc thiên nhiên: sáng hỗ trợ chuyển hoá mỡ thừa, tối thanh lọc cơ thể. Chính hãng B.O.T Việt Nam.",
    "Mayqueen Slim & Yodetox — herbal body-care rituals: support fat metabolism by morning, gently detox by night. Authentic B.O.T Vietnam.",
  ),
  keywords: [
    "Mayqueen Slim",
    "Yodetox",
    "giảm cân thảo mộc",
    "detox",
    "giữ dáng",
    "B.O.T Việt Nam",
  ],
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  themeColor: "#5f7d41",
  copyrightYear: 2026,
  contactPerson: "Phan Tiến Đại",
  phone: "039 5057 364",
  phoneRaw: "0395057364",
  address: t("Hà Đông, Hà Nội, Việt Nam", "Ha Dong, Hanoi, Vietnam"),
  hours: t("08:00 – 21:00, Thứ 2 – Chủ nhật", "8:00 AM – 9:00 PM, Mon – Sun"),
  geo: { lat: 20.9691307, lng: 105.7697576 },
  mapsLink: "https://maps.app.goo.gl/eoVXPYNVaPmcASwV8",
  // Bản đồ nhúng đúng địa điểm của link maps.app.goo.gl/eoVXPYNVaPmcASwV8 — "May Queen Nail & Beauty"
  // (mã địa điểm 0x31345327f88ec38b:0x35930b6ae96c332a). Có NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY thì dùng
  // Maps Embed API chính thức; không có key vẫn dùng bản nhúng địa điểm công khai (không cần key).
  mapsEmbed: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY}&q=May+Queen+Nail+%26+Beauty,H%C3%A0+%C4%90%C3%B4ng,H%C3%A0+N%E1%BB%99i&center=20.9691307,105.7697576&zoom=16&language=vi`
    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.4!2d105.7697576!3d20.9691307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345327f88ec38b%3A0x35930b6ae96c332a!2sMay%20Queen%20Nail%20%26%20Beauty!5e0!3m2!1svi!2svn!4v1760000000000!5m2!1svi!2svn",
  facebook: "https://www.facebook.com/profile.php?id=61586783311362",
  messenger: "https://m.me/61586783311362",
  zalo: "https://zalo.me/0395057364",
  // TODO: thay bằng link TikTok thật của shop
  tiktok: "https://www.tiktok.com/",
  // ---- Video TVC đầu trang: THAY FILE TẠI ĐÂY (đặt video mới vào public/videos/ rồi sửa 2 dòng dưới) ----
  // Hiện là video dựng tạm bằng AI (chỉ để hình dung) — khi có TVC thật chỉ cần thay file.
  heroVideo: "/videos/mayqueen_video.mp4",
  heroPoster: "/images/video/poster.jpg",
  // ---- Thông tin pháp lý (CHỮ MẪU — chờ sale gửi bản thật, không tự điền) ----
  company: {
    name: t("[Tên công ty]", "[Company name]"),
    taxId: "[MST]",
    address: t("[Địa chỉ trụ sở]", "[Head office address]"),
    email: "[Email]",
  },
  freeShipThreshold: 500000,
  shippingFee: 30000,
};
