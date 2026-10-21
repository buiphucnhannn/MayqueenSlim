import { t } from "@/i18n";
import { heroImages, productImages as P, videoFrames as V } from "./images";

/**
 * Nội dung trang chủ v2 (theo brief "Nâng cấp website Mayqueen Slim – phiếu 38 bản 2").
 * Quy ước: thông tin CHƯA CÓ để dạng [ … ] — không tự điền; khối viết tạm gắn cờ sample: true
 * → giao diện hiện nhãn "Nội dung mẫu" để khách không đưa lên chạy thật.
 */

// Lưu ý pháp lý bắt buộc (hiện ở cuối khối video và chân trang)
export const legalNote = t(
  "Thực phẩm này không phải là thuốc, không có tác dụng thay thế thuốc chữa bệnh.",
  "This food is not a medicine and does not replace medical treatment.",
);

// ---- Khối 1 · Video TVC + 2 Slide sản phẩm ----
export const hero = {
  mute: t("Bật / tắt tiếng", "Toggle sound"),
  pause: t("Phát / tạm dừng", "Play / pause"),
  scroll: t("Cuộn xuống", "Scroll"),
  slides: [
    {
      id: "mayqueen-slim",
      eyebrow: t("Mayqueen Slim · Buổi sáng", "Mayqueen Slim · Morning"),
      title: t("Sáng đốt mỡ", "Burn by day"),
      accent: t("Đánh thức vóc dáng", "Awaken your shape"),
      text: t(
        "Viên uống thảo mộc tác động kép — tăng cường chuyển hoá chất béo, kiểm soát cơn thèm ăn, cho cơ thể nhẹ nhõm và tràn đầy năng lượng mỗi ngày.",
        "A botanical morning ritual — enhances fat metabolism, curbs cravings, keeping your body light and revitalised throughout the day.",
      ),
      buy: t("Khám phá Mayqueen Slim", "Explore Mayqueen Slim"),
      buyPath: "/san-pham/mayqueen-slim",
      consult: t("Tư vấn miễn phí", "Free advice"),
      image: heroImages.mayqueen,
    },
    {
      id: "yodetox-extra",
      eyebrow: t("Yodetox Extra · Buổi tối", "Yodetox Extra · Evening"),
      title: t("Tối thanh lọc", "Cleanse by night"),
      accent: t("Nhẹ bụng an yên", "Calm & light gut"),
      text: t(
        "Thức uống thảo mộc tự nhiên — thanh lọc hệ tiêu hoá, giảm đầy hơi, giúp cơ thể đào thải độc tố và nuôi dưỡng làn da tươi tắn sau giấc ngủ trọn vẹn.",
        "A gentle botanical drink — cleanses digestion, eases bloating, detoxifying your body for restful sleep and glowing skin.",
      ),
      buy: t("Khám phá Yodetox Extra", "Explore Yodetox Extra"),
      buyPath: "/san-pham/yodetox-extra",
      consult: t("Tư vấn miễn phí", "Free advice"),
      image: heroImages.yodetox,
    },
  ],
  // Tương thích ngược
  image: heroImages.mayqueen,
  eyebrow: t("Mayqueen Slim · Buổi sáng", "Mayqueen Slim · Morning"),
  title: t("Sáng đốt mỡ", "Burn by day"),
  accent: t("Đánh thức vóc dáng", "Awaken your shape"),
  text: t(
    "Viên uống thảo mộc tác động kép — tăng cường chuyển hoá chất béo, kiểm soát cơn thèm ăn, cho cơ thể nhẹ nhõm và tràn đầy năng lượng mỗi ngày.",
    "A botanical morning ritual — enhances fat metabolism, curbs cravings, keeping your body light and revitalised throughout the day.",
  ),
  buy: t("Khám phá Mayqueen Slim", "Explore Mayqueen Slim"),
  buyPath: "/san-pham/mayqueen-slim",
  consult: t("Tư vấn miễn phí", "Free advice"),
};

// ---- Đoạn "biến hình" ngay sau video: cuộn tới đâu đổi cảnh tới đó (khung hình từ video minh hoạ) ----
export const transformation = {
  eyebrow: t("Hành trình của bạn", "Your journey"),
  steps: [
    {
      image: V.bloated,
      kicker: t("Trước đây", "Before"),
      title: t("Nặng nề,", "Heavy,"),
      accent: t("thiếu tự tin", "unsure of myself"),
      text: t(
        "Đầy bụng sau mỗi bữa ăn, quần áo chật dần — và ngại nhìn mình trong gương.",
        "Bloated after every meal, clothes getting tighter — avoiding the mirror.",
      ),
    },
    {
      image: V.morning,
      kicker: t("07:00 · Buổi sáng", "7:00 AM · Morning"),
      title: t("Bắt đầu", "Start with"),
      accent: t("từ một thói quen nhỏ", "one small habit"),
      text: t(
        "Một viên Mayqueen Slim trước bữa sáng — đánh thức nhịp chuyển hoá của ngày mới.",
        "One Mayqueen Slim capsule before breakfast — waking up your metabolism.",
      ),
    },
    {
      image: V.evening,
      kicker: t("20:00 · Buổi tối", "8:00 PM · Evening"),
      title: t("Thả lỏng,", "Unwind,"),
      accent: t("thanh lọc nhẹ nhàng", "cleanse gently"),
      text: t(
        "Một ly Yodetox Extra ấm sau bữa tối — để cơ thể được nghỉ ngơi và làm mới.",
        "A warm Yodetox Extra after dinner — letting your body rest and renew.",
      ),
    },
    {
      image: V.confident,
      kicker: t("Mỗi ngày", "Every day"),
      title: t("Nhẹ nhõm,", "Lighter,"),
      accent: t("tự tin với chính mình", "confident in my body"),
      text: t(
        "Không ép cân, không bỏ bữa — chỉ là một cơ thể được chăm sóc đúng cách, từ bên trong.",
        "No crash diets, no skipped meals — just a body cared for properly, from within.",
      ),
    },
  ],
};

// ---- Khối 2 · Câu chuyện thương hiệu (NỘI DUNG MẪU — khách sẽ tự viết) ----
export const story = {
  sample: true,
  eyebrow: t("Câu chuyện Mayqueen", "The Mayqueen story"),
  title: t("Thon gọn từ bên trong", "Slim from within"),
  accent: t("Tinh hoa thảo mộc Việt", "The essence of Vietnamese botanicals"),
  // 1 đoạn ngắn kiểu Kobler (Chủ tịch sẽ viết lại bản chính thức)
  paragraphs: [
    t(
      "Từ năm [năm thành lập], Mayqueen chọn lọc thảo mộc và sản xuất tại nhà máy đạt chuẩn GMP — sáng nuôi dưỡng năng lượng, tối trả lại sự nhẹ nhõm, để vóc dáng thon gọn đi cùng sức khoẻ bền lâu.",
      "Since [founding year], Mayqueen has selected botanicals and manufactured in a GMP-certified factory — energy by morning, lightness by night, so a slimmer shape comes with lasting health.",
    ),
  ],
  pillars: [
    { label: t("Thảo mộc", "Botanical"), text: t("Nguồn gốc rõ ràng", "Clear origins") },
    { label: t("Chuẩn GMP", "GMP-certified"), text: t("Sản xuất tại Việt Nam", "Made in Vietnam") },
    {
      label: t("Tác động kép", "Dual action"),
      text: t("Sáng đốt – tối lọc", "Burn by day, cleanse by night"),
    },
    { label: t("Đồng hành", "Guidance"), text: t("Tư vấn liệu trình 1:1", "1:1 ritual coaching") },
  ],
  founder: t("[Tên Chủ tịch]", "[Chairman's name]"),
  founderTitle: t("[Chức danh] · Mayqueen – B.O.T Việt Nam", "[Title] · Mayqueen – B.O.T Vietnam"),
  cta: t("Khám phá sản phẩm", "Explore products"),
  image: V.productShot,
};

// ---- Sản phẩm (giữ combo Sáng – Tối & nút Mua ngay từ bản cũ) ----
export const showcase = {
  eyebrow: t("Sản phẩm", "Products"),
  title: t("Bộ đôi Sáng – Tối", "The Day – Night duo"),
  accent: t("Cho vóc dáng nhẹ nhõm", "For a lighter you"),
  text: t(
    "Dùng riêng từng sản phẩm hoặc kết hợp thành liệu trình tác động kép.",
    "Use each on its own or pair them into a dual-action ritual.",
  ),
  all: t("Xem tất cả sản phẩm", "View all products"),
};

// ---- Khối 3 · Thành phần (tiêu đề; dữ liệu ở data/ingredients.js) ----
export const ingredientsHeading = {
  eyebrow: t("Thành phần", "Ingredients"),
  title: t("Từng lớp thảo mộc", "Layer by layer"),
  accent: t("Kiến tạo nghi thức", "Crafting the ritual"),
  // Cột phải (tương ứng "Công nghệ phía sau sự tinh tế" của Kobler) — chỉ dùng thông tin có trong hồ sơ PDF
  process: {
    title: t("Quy trình", "The process"),
    accent: t("Phía sau mỗi sản phẩm", "Behind every product"),
    cta: t("Xem chứng nhận", "View certificates"),
    cards: [
      {
        title: t("Nhà máy đạt chuẩn GMP", "GMP-certified factory"),
        text: t(
          "Sản xuất tại CTCP Dược phẩm Công nghệ cao Goldcare — GMP số 69/2023/ATTP-CNGMP.",
          "Made by Goldcare High-Tech Pharma — GMP No. 69/2023/ATTP-CNGMP.",
        ),
        image: P.mayqueen.floating,
      },
      {
        title: t("Nguyên liệu có kiểm nghiệm", "Tested raw materials"),
        text: t(
          "9 phiếu kiểm nghiệm (COA) cho nguyên liệu đầu vào từ nhà cung cấp.",
          "9 certificates of analysis (COA) for incoming raw materials.",
        ),
        image: V.productShot,
      },
      {
        title: t("An toàn thực phẩm ISO 22000", "ISO 22000 food safety"),
        text: t(
          "Hệ thống quản lý an toàn thực phẩm đạt ISO 22000:2018.",
          "Food-safety management system certified ISO 22000:2018.",
        ),
        image: P.yodetox.garden,
      },
      {
        title: t("Nghi thức sáng – tối", "Morning – evening ritual"),
        text: t(
          "Sáng Mayqueen Slim, tối Yodetox Extra — liệu trình tác động kép.",
          "Mayqueen Slim by day, Yodetox Extra by night — a dual-action ritual.",
        ),
        image: V.evening,
      },
    ],
  },
};

// ---- Khối 4 · Chứng nhận (tiêu đề + số liệu thật; ô chứng nhận ở data/certificates.js) ----
export const certificatesHeading = {
  eyebrow: t("Chứng nhận", "Certificates"),
  title: t("Niềm tin", "Trust that"),
  accent: t("Tạo nên lựa chọn", "Shapes every choice"),
  text: t(
    "Sản xuất tại nhà máy đạt chuẩn GMP, có giấy tiếp nhận đăng ký bản công bố sản phẩm của Cục An toàn thực phẩm – Bộ Y tế.",
    "Made in a GMP-certified factory, with a product declaration receipt from the Vietnam Food Administration – Ministry of Health.",
  ),
  view: t("Xem giấy", "View"),
  reportsTitle: t("Phiếu kiểm nghiệm", "Test report"),
  // Chỉ dùng số liệu có thật (vỏ hộp + hồ sơ PDF khách gửi) — không ghi số khách hàng
  stats: [
    { value: 30, suffix: "", label: t("viên / lọ Mayqueen Slim", "capsules per bottle") },
    { value: 20, suffix: "", label: t("gói / hộp Yodetox Extra", "sachets per box") },
    {
      value: 9,
      suffix: "",
      label: t("phiếu kiểm nghiệm nguyên liệu", "raw-material test reports"),
    },
    { value: 100, suffix: "%", label: t("sản xuất tại Việt Nam", "made in Vietnam") },
  ],
};

// ---- Khối 5 · Cảm nhận khách hàng (tiêu đề; thẻ ở data/testimonials.js) ----
export const testimonialsHeading = {
  title: t("Cảm nhận khách hàng", "Customer stories"),
  text: t(
    "Những chia sẻ về hành trình chăm sóc vóc dáng cùng Mayqueen.",
    "Stories from women caring for their shape with Mayqueen.",
  ),
};

// ---- Sống đẹp (blog) ----
export const journalTeaser = {
  eyebrow: t("Sống đẹp cùng Mayqueen", "Live well with Mayqueen"),
  title: t("Sống đẹp", "Live well"),
  accent: t("Cùng Mayqueen", "With Mayqueen"),
  cta: t("Xem tất cả bài viết", "Read the journal"),
};

// ---- Dùng ở các trang khác (cửa hàng, sống đẹp) ----
export const bestsellers = {
  eyebrow: t("Cửa hàng", "Shop"),
  title: t("Sản phẩm", "Our"),
  accent: t("Mayqueen", "Products"),
  text: t(
    "Ba lựa chọn — một hành trình. Bắt đầu từ sản phẩm phù hợp với cơ thể bạn.",
    "Three choices, one journey. Start with what suits your body.",
  ),
};

export const shopPromo = {
  eyebrow: t("Chưa biết chọn gì?", "Not sure where to start?"),
  title: t("Nhận liệu trình cá nhân hoá miễn phí", "Get a free personalised ritual"),
  text: t(
    "Chuyên viên phân tích thể trạng và gợi ý gói phù hợp.",
    "A coach assesses your needs and suggests the right pack.",
  ),
  cta: t("Tư vấn 1:1 ngay", "Talk to a coach"),
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
