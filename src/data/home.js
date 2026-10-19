import { t } from "@/i18n";
import { productImages as P } from "./images";

// Nội dung các section trang chủ (song ngữ). Icon là tên icon lucide, map trong component.

export const announcements = [
  t("Freeship toàn quốc cho đơn từ 500.000₫", "Free nationwide shipping on orders over 500,000₫"),
  t("Được kiểm tra hàng trước khi thanh toán", "Inspect your order before you pay"),
  t("Chính hãng B.O.T Việt Nam · Đầy đủ giấy phép", "Authentic B.O.T Vietnam · Fully licensed"),
];

/**
 * Slider hero toàn màn hình (kiểu The Beauty Chef). Mỗi slide:
 * - bg: màu nền lấy đúng từ viền ảnh → ảnh hoà liền vào nền, không có khung.
 * - side: ảnh nằm bên "right" | "left"; dark: chữ sáng khi nền tối.
 * - Mọi slide đều lót bản nhoè của chính ảnh làm nền (PhotoBackdrop), bg là màu phủ phía có chữ.
 */
export const hero = {
  slides: [
    {
      image: P.yodetox.garden,
      bg: "#5f6236",
      side: "right",
      pos: "55% 60%",
      dark: true,
      badge: t("Thanh lọc mỗi tối", "Nightly cleanse"),
      title: t("Nhẹ bụng mỗi sáng thức dậy", "Wake up feeling lighter"),
      text: t(
        "Yodetox Extra — thức uống thảo mộc thanh lọc tiêu hoá, giảm đầy hơi, cho làn da sáng khoẻ từ bên trong.",
        "Yodetox Extra — a botanical drink that cleanses digestion, eases bloating and helps skin glow from within.",
      ),
      cta: t("Khám phá Yodetox", "Discover Yodetox"),
      path: "/san-pham/yodetox-extra",
      sticker: t("100%|thảo mộc", "100%|botanical"),
    },
    {
      image: P.yodetox.giftBox,
      bg: "#d2ccab",
      side: "left",
      pos: "40% 55%",
      badge: t("Combo liệu trình", "Ritual set"),
      title: t("Sáng đốt mỡ, tối thanh lọc", "Burn by day, cleanse by night"),
      text: t(
        "Bộ đôi Mayqueen Slim + Yodetox tác động kép: vóc dáng thon gọn đi cùng một cơ thể khoẻ, nhẹ nhõm từ bên trong.",
        "The Mayqueen Slim + Yodetox duo works twice as hard: a slimmer shape and a lighter, healthier body from within.",
      ),
      cta: t("Chọn combo & tiết kiệm", "Shop the set & save"),
      path: "/san-pham/combo-sang-dot-toi-loc",
      sticker: t("Tiết kiệm|đến 17%", "Save|up to 17%"),
    },
    {
      image: P.mayqueen.sunlight,
      bg: "#d8d2b3",
      side: "right",
      pos: "62% 55%",
      frame: "square",
      badge: t("Viên uống giữ dáng thảo mộc", "Botanical slimming capsules"),
      title: t("Thon gọn từ bên trong", "Slim from within"),
      text: t(
        "Viên uống thảo mộc Mayqueen Slim hỗ trợ chuyển hoá mỡ thừa, kiểm soát cơn thèm ăn — giữ dáng an toàn, không ép cân, không bỏ bữa.",
        "Mayqueen Slim botanical capsules support fat metabolism and curb cravings — stay in shape safely, no crash diets, no skipped meals.",
      ),
      cta: t("Mua Mayqueen Slim", "Shop Mayqueen Slim"),
      path: "/san-pham/mayqueen-slim",
      sticker: t("Freeship|toàn quốc", "Free|shipping"),
    },
  ],
};

export const bestsellers = {
  eyebrow: t("Cửa hàng", "Shop"),
  title: t("Sản phẩm được yêu thích", "Our bestsellers"),
  text: t(
    "Ba lựa chọn — một hành trình. Bắt đầu từ sản phẩm phù hợp với cơ thể bạn.",
    "Three choices, one journey. Start with what suits your body.",
  ),
};

// Ô tư vấn nằm trong lưới sản phẩm (thay cho "Take the quiz" của The Beauty Chef)
export const shopPromo = {
  eyebrow: t("Chưa biết chọn gì?", "Not sure where to start?"),
  title: t("Nhận liệu trình cá nhân hoá miễn phí", "Get a free personalised ritual"),
  text: t(
    "Chuyên viên phân tích thể trạng và gợi ý gói phù hợp trong 15 phút.",
    "A coach assesses your needs and suggests the right pack within 15 minutes.",
  ),
  cta: t("Tư vấn 1:1 ngay", "Talk to a coach"),
};

export const testimonialsHeading = {
  eyebrow: t("Đã thử & tin dùng", "Tried & tested"),
  title: t("Hơn 2.000 khách hàng đã thay đổi", "2,000+ customers transformed"),
  summary: t("từ 2.662 đánh giá", "from 2,662 reviews"),
};

export const statement = {
  text: t(
    "Vóc dáng đẹp không đến từ việc nhịn ăn — nó bắt đầu từ một cơ thể được nuôi dưỡng, thanh lọc và cân bằng mỗi ngày.",
    "A beautiful shape doesn't come from starving — it begins with a body that is nourished, cleansed and balanced every single day.",
  ),
  author: t("— Triết lý Mayqueen", "— The Mayqueen philosophy"),
};

export const ritual = {
  eyebrow: t("Liệu trình tác động kép", "The dual-action ritual"),
  title: t("Sáng đốt mỡ.", "Burn by day."),
  accent: t("Tối thanh lọc.", "Cleanse by night."),
  text: t(
    "Không chỉ giảm cân đơn thuần — liệu trình chú trọng thải độc từ bên trong để vóc dáng thon gọn đi cùng sức khoẻ bền vững.",
    "More than weight loss — our ritual cleanses from within, so a slimmer shape comes with lasting health.",
  ),
  day: {
    time: t("07:00 · Buổi sáng", "7:00 AM · Morning"),
    name: "Mayqueen Slim",
    text: t(
      "1 viên trước ăn sáng 30 phút — kích hoạt chuyển hoá, kiểm soát cơn thèm ăn suốt ngày dài.",
      "1 capsule 30 minutes before breakfast — fires up metabolism and keeps cravings in check all day.",
    ),
    image: P.mayqueen.floating,
    path: "/san-pham/mayqueen-slim",
  },
  night: {
    time: t("20:00 · Buổi tối", "8:00 PM · Evening"),
    name: "Yodetox Extra",
    text: t(
      "1 gói sau ăn tối 1 giờ — thanh lọc hệ tiêu hoá, sáng dậy nhẹ bụng, da sáng khoẻ.",
      "1 sachet an hour after dinner — cleanses digestion so you wake up lighter with brighter skin.",
    ),
    image: P.yodetox.garden,
    path: "/san-pham/yodetox-extra",
  },
  cta: t("Chọn combo liệu trình", "Choose the ritual set"),
  comboPath: "/san-pham/combo-sang-dot-toi-loc",
};

export const usp = {
  eyebrow: t("Vì sao chọn Mayqueen", "Why Mayqueen"),
  title: t(
    "Wellness chuẩn D2C quốc tế, dành cho người Việt",
    "Global D2C wellness, made for Vietnam",
  ),
  items: [
    {
      icon: "Globe2",
      title: t("Chuẩn mô hình D2C Wellness", "Global D2C wellness standard"),
      text: t(
        "Học hỏi phong cách thương hiệu toàn cầu: mua sắm tiện lợi, câu chuyện cảm xúc và cẩm nang sống đẹp truyền cảm hứng.",
        "Inspired by global brands: effortless shopping, heartfelt storytelling and an inspiring lifestyle journal.",
      ),
    },
    {
      icon: "BadgeCheck",
      title: t("Bảo chứng B.O.T Việt Nam", "Backed by B.O.T Vietnam"),
      text: t(
        "Nguồn gốc rõ ràng, thành phần thảo mộc lành tính, đầy đủ giấy phép công bố an toàn theo quy chuẩn y tế.",
        "Clear origin, gentle botanical ingredients and full safety licences under health regulations.",
      ),
    },
    {
      icon: "Sparkles",
      title: t("Cơ chế tác động kép", "Dual-action mechanism"),
      text: t(
        "Không chỉ giảm cân — chú trọng thải độc từ bên trong, giúp vóc dáng thon gọn cùng sức khoẻ bền vững.",
        "Not just weight loss — it detoxes from within for a slimmer shape and lasting health.",
      ),
    },
  ],
};

export const journey = {
  eyebrow: t("Hành trình 30 ngày", "Your 30-day journey"),
  title: t("Cảm nhận thay đổi", "Feel the change,"),
  accent: t("theo từng tuần.", "week by week."),
  text: t(
    "Một liệu trình — bốn cột mốc. Cơ thể nhẹ dần, vóc dáng gọn dần, năng lượng trở lại mỗi ngày.",
    "One ritual, four milestones. Lighter, leaner and more energised — day by day.",
  ),
  stat: { value: "30", label: t("ngày · 1 liệu trình", "days · 1 ritual") },
  steps: [
    {
      week: t("Tuần 1", "Week 1"),
      title: t("Nhẹ bụng", "Lighter belly"),
      text: t(
        "Giảm đầy hơi, tiêu hoá êm hơn, ngủ ngon hơn.",
        "Less bloating, smoother digestion, better sleep.",
      ),
    },
    {
      week: t("Tuần 2", "Week 2"),
      title: t("Bớt thèm ăn", "Fewer cravings"),
      text: t(
        "Kiểm soát ăn vặt, cơ thể quen nhịp ăn uống mới.",
        "Snacking under control, a new eating rhythm.",
      ),
    },
    {
      week: t("Tuần 3", "Week 3"),
      title: t("Số đo thay đổi", "Inches drop"),
      text: t(
        "Vòng eo gọn dần, quần áo mặc vừa vặn hơn.",
        "Your waist slims and clothes fit better.",
      ),
    },
    {
      week: t("Tuần 4", "Week 4"),
      title: t("Rạng rỡ", "Radiant"),
      text: t(
        "Dáng gọn, da sáng, tràn đầy năng lượng.",
        "Leaner shape, brighter skin, more energy.",
      ),
    },
  ],
  note: t(
    "Kết quả có thể khác nhau tuỳ cơ địa và chế độ sinh hoạt.",
    "Results may vary depending on body type and lifestyle.",
  ),
};

export const trust = {
  eyebrow: t("Bảo chứng uy tín", "Trusted quality"),
  title: t("Chính hãng B.O.T Việt Nam", "Authentic B.O.T Vietnam"),
  text: t(
    "Mỗi sản phẩm Mayqueen đều có nguồn gốc xuất xứ rõ ràng, được kiểm nghiệm và công bố an toàn theo quy chuẩn của Bộ Y tế.",
    "Every Mayqueen product has a clear origin and is tested and declared safe under Ministry of Health regulations.",
  ),
  certificates: [
    {
      icon: "FileCheck2",
      title: t("Giấy công bố sản phẩm", "Product declaration"),
      text: t("Tiếp nhận bởi Cục An toàn thực phẩm", "Received by the Food Safety Authority"),
    },
    {
      icon: "Factory",
      title: t("Nhà máy chuẩn GMP", "GMP-certified factory"),
      text: t("Sản xuất theo tiêu chuẩn thực hành tốt", "Made under Good Manufacturing Practice"),
    },
    {
      icon: "FlaskConical",
      title: t("Kiểm nghiệm an toàn", "Safety tested"),
      text: t("Phiếu kiểm nghiệm cho từng lô hàng", "Test reports for every batch"),
    },
    {
      icon: "ShieldCheck",
      title: t("Tem chống hàng giả", "Anti-counterfeit seal"),
      text: t("Quét mã xác thực chính hãng", "Scan to verify authenticity"),
    },
  ],
};

export const difference = [
  { icon: "Leaf", title: t("Thảo mộc tự nhiên", "Natural botanicals") },
  { icon: "HeartPulse", title: t("Lành tính, an toàn", "Gentle & safe") },
  { icon: "Microscope", title: t("Nghiên cứu khoa học", "Science-backed") },
  { icon: "Truck", title: t("Giao nhanh, kiểm tra hàng", "Fast delivery, COD") },
];

export const journalTeaser = {
  eyebrow: t("Sống đẹp cùng Mayqueen", "Live well with Mayqueen"),
  title: t("Cẩm nang sống xanh, ăn sạch, dáng xinh", "Your guide to clean living and a lean body"),
  cta: t("Xem tất cả bài viết", "Read the journal"),
};

export const socialFeed = {
  eyebrow: t("Cộng đồng", "Community"),
  title: t("Theo dõi Mayqueen trên mạng xã hội", "Join our community"),
  handle: "#SongDepCungMayqueen",
  viewOn: t("Xem trên Facebook", "View on Facebook"),
};

export const faqHeading = {
  eyebrow: t("Hỏi đáp", "FAQ"),
  title: t("Bạn hỏi, Mayqueen trả lời", "Your questions, answered"),
  text: t(
    "Chưa tìm thấy câu trả lời? Gọi ngay cho chuyên viên của chúng tôi.",
    "Can't find your answer? Call one of our coaches.",
  ),
  cta: t("Gọi", "Call"),
  consultCta: t("Đăng ký tư vấn", "Request advice"),
};
