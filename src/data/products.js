import { t } from "@/i18n";
import { productImages as P } from "./images";

/**
 * Danh mục sản phẩm. Mỗi sản phẩm có nhiều lựa chọn (options) = các gói/combo khách chọn trên trang chi tiết.
 * TODO: giá, thành phần đang là dữ liệu demo — cập nhật theo thông tin chính thức của B.O.T Việt Nam.
 */
export const categories = [
  { id: "all", label: t("Tất cả", "All") },
  { id: "slim", label: t("Giữ dáng", "Body shaping") },
  { id: "detox", label: t("Thanh lọc", "Detox") },
  { id: "combo", label: t("Combo liệu trình", "Ritual sets") },
];

export const products = [
  {
    slug: "mayqueen-slim",
    category: "slim",
    name: "Mayqueen Slim",
    badge: t("Bán chạy", "Bestseller"),
    ritual: t("Buổi sáng", "Morning"),
    tagline: t("Viên uống hỗ trợ chuyển hoá mỡ thừa", "Fat-metabolism support capsules"),
    short: t(
      "Hỗ trợ tăng cường chuyển hoá chất béo, kiểm soát cơn thèm ăn và giữ dáng an toàn từ thảo mộc thiên nhiên.",
      "Supports fat metabolism, curbs cravings and keeps you in shape — safely, with natural botanicals.",
    ),
    spec: t("Hộp 1 lọ × 30 viên", "1 bottle × 30 capsules"),
    images: [P.mayqueen.sunlight, P.mayqueen.podium, P.mayqueen.floating],
    rating: 4.9,
    reviews: 1286,
    description: t(
      "Mayqueen Slim là thực phẩm bảo vệ sức khoẻ được nghiên cứu cho người cơ địa khó giảm, nhiều mỡ thừa vùng bụng. Công thức thảo mộc giúp cơ thể đốt năng lượng hiệu quả hơn, giảm cảm giác thèm ăn vặt, để bạn thon gọn mà không cần nhịn ăn.",
      "Mayqueen Slim is a health supplement designed for stubborn body types with excess belly fat. Its botanical formula helps your body burn energy more efficiently and reduces snack cravings — so you slim down without starving.",
    ),
    benefits: [
      t("Hỗ trợ tăng cường chuyển hoá chất béo", "Supports fat metabolism"),
      t("Hỗ trợ kiểm soát cơn thèm ăn, ăn vặt", "Helps control cravings & snacking"),
      t("Hỗ trợ hạn chế tích mỡ mới", "Helps limit new fat storage"),
      t("Không gây mệt mỏi, không mất nước", "No fatigue, no dehydration"),
    ],
    ingredients: [
      {
        name: t("Garcinia Cambogia (quả bứa)", "Garcinia Cambogia"),
        note: t("Hỗ trợ hạn chế tích mỡ, giảm thèm ăn", "Helps limit fat storage & appetite"),
      },
      {
        name: t("Chiết xuất trà xanh", "Green tea extract"),
        note: t("Giàu EGCG, hỗ trợ sinh nhiệt", "Rich in EGCG, supports thermogenesis"),
      },
      {
        name: t("Cà phê xanh", "Green coffee bean"),
        note: t("Hỗ trợ chuyển hoá đường & mỡ", "Supports sugar & fat metabolism"),
      },
      {
        name: t("Gạo lứt đỏ", "Red brown rice"),
        note: t("Bổ sung chất xơ, no lâu", "Fibre for lasting fullness"),
      },
    ],
    usage: t(
      "Uống 1 viên mỗi sáng, trước bữa sáng 30 phút với nhiều nước. Dùng liệu trình tối thiểu 30 ngày để thấy hiệu quả rõ rệt.",
      "Take 1 capsule every morning, 30 minutes before breakfast with plenty of water. Use for at least 30 days for visible results.",
    ),
    options: [
      {
        id: "1",
        label: t("1 hộp", "1 box"),
        note: t("Dùng thử 30 ngày", "30-day trial"),
        price: 450000,
      },
      {
        id: "2",
        label: t("2 hộp", "2 boxes"),
        note: t("Liệu trình 60 ngày", "60-day course"),
        price: 850000,
        compareAt: 900000,
      },
      {
        id: "3",
        label: t("3 hộp", "3 boxes"),
        note: t("Tiết kiệm nhất · Tặng bình lắc", "Best value · Free shaker"),
        price: 1190000,
        compareAt: 1350000,
        popular: true,
      },
    ],
  },
  {
    slug: "yodetox-extra",
    category: "detox",
    name: "Yodetox Extra",
    badge: t("Mới", "New"),
    ritual: t("Buổi tối", "Evening"),
    tagline: t("Thức uống thải độc, thanh lọc tiêu hoá", "Detox drink for gentle digestion"),
    short: t(
      "Thanh lọc hệ tiêu hoá, nhẹ bụng, giảm đầy hơi và giúp làn da sáng khoẻ từ bên trong.",
      "Cleanses digestion, eases bloating and helps your skin glow from within.",
    ),
    spec: t("Hộp 20 gói", "Box of 20 sachets"),
    images: [P.yodetox.garden, P.yodetox.giftBox],
    rating: 4.8,
    reviews: 864,
    description: t(
      'Yodetox Extra là thức uống thanh lọc dịu nhẹ dành cho người hay nóng trong, đầy bụng, táo bón. Mỗi tối một gói giúp hệ tiêu hoá được "dọn dẹp", sáng dậy nhẹ bụng, da dẻ tươi tắn hơn.',
      "Yodetox Extra is a gentle cleansing drink for anyone prone to internal heat, bloating or constipation. One sachet each night helps your gut reset — wake up lighter, with fresher-looking skin.",
    ),
    benefits: [
      t("Hỗ trợ thanh lọc, thải độc cơ thể", "Supports natural detoxification"),
      t("Giảm đầy hơi, nhẹ bụng mỗi sáng", "Eases bloating, lighter mornings"),
      t("Hỗ trợ tiêu hoá, nhuận tràng dịu nhẹ", "Gentle digestive support"),
      t("Giúp làn da sáng khoẻ từ bên trong", "Helps skin glow from within"),
    ],
    ingredients: [
      {
        name: t("Chất xơ Inulin", "Inulin fibre"),
        note: t("Nuôi lợi khuẩn đường ruột", "Feeds healthy gut bacteria"),
      },
      {
        name: t("Diếp cá", "Houttuynia (fish mint)"),
        note: t("Thanh nhiệt, mát gan", "Cooling, supports the liver"),
      },
      {
        name: t("Atiso", "Artichoke"),
        note: t("Hỗ trợ chức năng gan, tiêu hoá", "Supports liver & digestion"),
      },
      {
        name: t("Trà xanh", "Green tea"),
        note: t("Chống oxy hoá, thanh lọc", "Antioxidant, cleansing"),
      },
    ],
    usage: t(
      "Pha 1 gói với 150–200ml nước ấm hoặc nước mát, uống vào buổi tối sau ăn 1 giờ. Dùng 3–5 lần/tuần hoặc theo hướng dẫn chuyên viên.",
      "Mix 1 sachet with 150–200ml of warm or cool water; drink in the evening, 1 hour after dinner. Use 3–5 times a week or as advised.",
    ),
    options: [
      { id: "1", label: t("1 hộp", "1 box"), note: t("20 gói", "20 sachets"), price: 350000 },
      {
        id: "2",
        label: t("2 hộp", "2 boxes"),
        note: t("Tiết kiệm 50.000₫", "Save 50,000₫"),
        price: 650000,
        compareAt: 700000,
        popular: true,
      },
      {
        id: "3",
        label: t("3 hộp", "3 boxes"),
        note: t("Tặng hộp quà", "Free gift box"),
        price: 940000,
        compareAt: 1050000,
      },
    ],
  },
  {
    slug: "combo-sang-dot-toi-loc",
    category: "combo",
    name: t("Combo Sáng đốt – Tối lọc", "Morning Burn – Night Cleanse Set"),
    badge: t("Hiệu quả nhất", "Most effective"),
    ritual: t("Sáng & Tối", "Day & Night"),
    tagline: t(
      "Liệu trình chuyên sâu Mayqueen Slim + Yodetox",
      "Intensive ritual: Mayqueen Slim + Yodetox",
    ),
    short: t(
      "Bộ đôi tác động kép: sáng Mayqueen Slim hỗ trợ đốt mỡ, tối Yodetox thanh lọc — vóc dáng thon gọn, cơ thể khoẻ bền.",
      "A dual-action duo: Mayqueen Slim burns by morning, Yodetox cleanses by night — a slimmer shape and a healthier body.",
    ),
    spec: t("1 Mayqueen Slim + 1 Yodetox Extra / bộ", "1 Mayqueen Slim + 1 Yodetox Extra per set"),
    images: [P.yodetox.giftBox, P.mayqueen.podium, P.yodetox.garden, P.mayqueen.sunlight],
    rating: 5.0,
    reviews: 512,
    description: t(
      "Combo liệu trình là giải pháp được chuyên viên khuyên dùng nhiều nhất. Không chỉ giảm cân đơn thuần, liệu trình chú trọng thải độc từ bên trong để vóc dáng thon gọn đi kèm sức khoẻ bền vững, hạn chế tăng cân trở lại.",
      "Our most recommended ritual. Beyond weight loss, it focuses on cleansing from within so your slimmer shape comes with lasting health — and less rebound.",
    ),
    benefits: [
      t("Tác động kép: chuyển hoá mỡ + thanh lọc", "Dual action: metabolism + cleanse"),
      t("Tối ưu hiệu quả, hạn chế tăng cân lại", "Maximised results, less rebound"),
      t("Lộ trình cá nhân hoá, chuyên viên theo dõi 1:1", "Personalised plan with 1:1 coaching"),
      t(
        "Đóng hộp quà sang trọng, freeship toàn quốc",
        "Premium gift box, free nationwide shipping",
      ),
    ],
    ingredients: [
      {
        name: "Mayqueen Slim",
        note: t("Buổi sáng — hỗ trợ chuyển hoá mỡ thừa", "Morning — supports fat metabolism"),
      },
      {
        name: "Yodetox Extra",
        note: t("Buổi tối — thanh lọc, nhẹ bụng", "Evening — cleanse & de-bloat"),
      },
    ],
    usage: t(
      "Sáng: 1 viên Mayqueen Slim trước ăn sáng 30 phút. Tối: 1 gói Yodetox Extra sau ăn tối 1 giờ. Kết hợp uống đủ 2 lít nước/ngày và vận động nhẹ.",
      "Morning: 1 Mayqueen Slim capsule 30 minutes before breakfast. Evening: 1 Yodetox Extra sachet 1 hour after dinner. Drink 2 litres of water daily and stay lightly active.",
    ),
    options: [
      {
        id: "1",
        label: t("1 bộ", "1 set"),
        note: t("Liệu trình 30 ngày", "30-day ritual"),
        price: 750000,
        compareAt: 800000,
      },
      {
        id: "2",
        label: t("2 bộ", "2 sets"),
        note: t("Liệu trình 60 ngày", "60-day ritual"),
        price: 1420000,
        compareAt: 1600000,
        popular: true,
      },
      {
        id: "3",
        label: t("3 bộ", "3 sets"),
        note: t("Liệu trình 90 ngày · Tặng hộp quà", "90-day ritual · Gift box"),
        price: 1990000,
        compareAt: 2400000,
      },
    ],
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const fromPrice = (product) => Math.min(...product.options.map((o) => o.price));

// Lựa chọn mặc định: gói đầu tiên (giá thấp nhất)
export const defaultOption = (product) => product.options[0];
