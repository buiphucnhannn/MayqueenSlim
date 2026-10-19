import { t } from "@/i18n";
import { productImages as P, social as S } from "./images";

/**
 * Chuyên mục "Sống đẹp cùng Mayqueen" — cẩm nang lifestyle, thực đơn Eat Clean, công thức detox.
 * cover: ảnh lớn (đầu bài viết); thumb: ảnh bài đăng mạng xã hội (thumbnail nhỏ).
 * body: danh sách khối nội dung { type: "p" | "h2" | "list" | "tip", text | items }.
 */
export const articleCategories = [
  { id: "all", label: t("Tất cả", "All") },
  { id: "detox", label: t("Công thức detox", "Detox recipes") },
  { id: "eat-clean", label: t("Thực đơn Eat Clean", "Eat Clean menus") },
  { id: "giu-dang", label: t("Bí quyết giữ dáng", "Body tips") },
];

export const articles = [
  {
    slug: "5-cong-thuc-nuoc-detox-buoi-sang",
    category: "detox",
    date: "2026-10-12",
    readTime: 4,
    cover: P.yodetox.garden,
    thumb: S.nguoiKhoe,
    title: t(
      "5 công thức nước detox buổi sáng cho làn da căng mọng",
      "5 morning detox drinks for glowing skin",
    ),
    excerpt: t(
      "Chỉ 5 phút mỗi sáng với những nguyên liệu quen thuộc trong bếp, bạn đã có ly nước thanh lọc giúp nhẹ bụng và da sáng khoẻ.",
      "Five minutes each morning with everyday ingredients is all it takes for a cleansing drink that de-bloats and brightens skin.",
    ),
    body: [
      {
        type: "p",
        text: t(
          "Một ly nước detox vào buổi sáng giúp đánh thức hệ tiêu hoá, bù nước sau một đêm dài và cung cấp vitamin cho làn da. Dưới đây là 5 công thức dễ làm nhất mà đội ngũ Mayqueen yêu thích.",
          "A morning detox drink wakes up your digestion, rehydrates you after a long night and feeds your skin with vitamins. Here are five of the Mayqueen team's easiest favourites.",
        ),
      },
      { type: "h2", text: t("1. Chanh – dưa leo – bạc hà", "1. Lemon – cucumber – mint") },
      {
        type: "p",
        text: t(
          "Thái lát nửa quả chanh, 5 lát dưa leo và vài lá bạc hà, ngâm với 500ml nước lọc trong 15 phút. Vị thanh mát, giúp giảm cảm giác đầy hơi.",
          "Slice half a lemon, 5 cucumber slices and a few mint leaves; steep in 500ml of water for 15 minutes. Fresh and soothing for bloating.",
        ),
      },
      { type: "h2", text: t("2. Gừng – mật ong ấm", "2. Warm ginger – honey") },
      {
        type: "p",
        text: t(
          "3 lát gừng tươi hãm với nước ấm, thêm 1 thìa nhỏ mật ong. Phù hợp ngày lạnh, giúp làm ấm bụng và hỗ trợ tiêu hoá.",
          "Steep 3 slices of fresh ginger in warm water with a teaspoon of honey. Perfect on cool days to warm the belly and aid digestion.",
        ),
      },
      { type: "h2", text: t("3. Táo – quế", "3. Apple – cinnamon") },
      {
        type: "p",
        text: t(
          "Táo xanh thái mỏng cùng 1 thanh quế nhỏ, ngâm qua đêm trong tủ lạnh. Quế giúp ổn định đường huyết, hạn chế cơn thèm ngọt.",
          "Thinly sliced green apple with a small cinnamon stick, chilled overnight. Cinnamon helps steady blood sugar and sweet cravings.",
        ),
      },
      { type: "h2", text: t("4. Dứa – chanh dây", "4. Pineapple – passion fruit") },
      {
        type: "p",
        text: t(
          "Enzyme bromelain trong dứa hỗ trợ tiêu hoá đạm, chanh dây giàu vitamin C cho làn da tươi sáng.",
          "Bromelain in pineapple helps digest protein, while passion fruit brings vitamin C for brighter skin.",
        ),
      },
      { type: "h2", text: t("5. Trà xanh – sả", "5. Green tea – lemongrass") },
      {
        type: "p",
        text: t(
          "Trà xanh giàu chất chống oxy hoá, sả giúp lợi tiểu nhẹ. Uống ấm trước bữa sáng 20 phút.",
          "Green tea is packed with antioxidants, lemongrass is a gentle diuretic. Sip warm 20 minutes before breakfast.",
        ),
      },
      {
        type: "tip",
        text: t(
          "Mẹo: buổi tối, thay nước detox bằng 1 gói Yodetox Extra để quá trình thanh lọc diễn ra trọn vẹn khi bạn ngủ.",
          "Tip: in the evening, swap your detox water for a Yodetox Extra sachet to keep cleansing while you sleep.",
        ),
      },
    ],
  },
  {
    slug: "thuc-don-eat-clean-7-ngay-cho-dan-van-phong",
    category: "eat-clean",
    date: "2026-10-05",
    readTime: 6,
    cover: P.mayqueen.podium,
    thumb: S.congThuc30Ngay,
    title: t(
      "Thực đơn Eat Clean 7 ngày cho dân văn phòng bận rộn",
      "A 7-day Eat Clean menu for busy office workers",
    ),
    excerpt: t(
      "Chuẩn bị trong 30 phút cuối tuần, ăn ngon cả tuần mà vẫn giữ dáng — thực đơn được chuyên viên dinh dưỡng Mayqueen gợi ý.",
      "Prep in 30 minutes on the weekend, eat well all week and stay in shape — a menu suggested by Mayqueen's nutrition coaches.",
    ),
    body: [
      {
        type: "p",
        text: t(
          "Eat Clean không phải ăn kiêng khắc nghiệt, mà là ưu tiên thực phẩm tươi, ít chế biến và cân bằng dinh dưỡng. Với dân văn phòng, bí quyết nằm ở khâu chuẩn bị trước.",
          "Eat Clean isn't strict dieting — it's choosing fresh, minimally processed food with balanced nutrition. For office workers, the secret is meal prep.",
        ),
      },
      { type: "h2", text: t("Nguyên tắc đĩa ăn 2-1-1", "The 2-1-1 plate") },
      {
        type: "list",
        items: [
          t("1/2 đĩa: rau xanh các loại", "1/2 plate: leafy greens & vegetables"),
          t(
            "1/4 đĩa: đạm nạc (ức gà, cá, đậu phụ, trứng)",
            "1/4 plate: lean protein (chicken, fish, tofu, eggs)",
          ),
          t(
            "1/4 đĩa: tinh bột tốt (gạo lứt, khoai lang, yến mạch)",
            "1/4 plate: good carbs (brown rice, sweet potato, oats)",
          ),
        ],
      },
      { type: "h2", text: t("Gợi ý thực đơn", "Menu ideas") },
      {
        type: "list",
        items: [
          t(
            "Thứ 2: Yến mạch sữa chua hạt chia · Cơm gạo lứt ức gà áp chảo · Salad cá ngừ",
            "Mon: Chia yoghurt oats · Brown rice with seared chicken · Tuna salad",
          ),
          t(
            "Thứ 3: Bánh mì đen trứng ốp · Bún gạo lứt bò xào · Canh bí đỏ đậu phụ",
            "Tue: Rye toast & eggs · Brown-rice noodles with beef · Pumpkin tofu soup",
          ),
          t(
            "Thứ 4: Sinh tố chuối bơ · Khoai lang + cá hồi nướng · Rau củ luộc chấm mè",
            "Wed: Banana-avocado smoothie · Sweet potato & baked salmon · Steamed veggies with sesame",
          ),
          t(
            "Thứ 5: Pancake yến mạch · Cơm gạo lứt tôm rim · Súp nấm",
            "Thu: Oat pancakes · Brown rice with prawns · Mushroom soup",
          ),
          t(
            "Thứ 6: Granola sữa hạt · Gỏi cuốn tôm thịt · Salad ức gà sốt mè",
            "Fri: Granola with nut milk · Fresh spring rolls · Sesame chicken salad",
          ),
          t(
            "Cuối tuần: ăn tự do có kiểm soát, ưu tiên món nhà nấu",
            "Weekend: mindful free meals, home-cooked first",
          ),
        ],
      },
      {
        type: "tip",
        text: t(
          "Kết hợp 1 viên Mayqueen Slim mỗi sáng giúp hạn chế cơn thèm ăn vặt giữa giờ làm.",
          "Pair with one Mayqueen Slim capsule each morning to curb mid-afternoon snacking.",
        ),
      },
    ],
  },
  {
    slug: "che-ngu-con-doi-gia",
    category: "giu-dang",
    date: "2026-09-28",
    readTime: 3,
    cover: P.mayqueen.floating,
    thumb: S.cheNguConDoi,
    title: t(
      "Bí quyết chế ngự “cơn đói giả” — thủ phạm khiến bạn khó giảm cân",
      "Taming “fake hunger” — the hidden reason you can't slim down",
    ),
    excerpt: t(
      "Bạn vừa ăn xong nhưng vẫn thèm? Đó có thể là cơn đói giả. Nhận biết và kiểm soát nó là bước đầu tiên để giữ dáng bền vững.",
      "Just ate but still craving? That may be fake hunger. Spotting and managing it is step one to staying in shape.",
    ),
    body: [
      {
        type: "p",
        text: t(
          "Cơn đói giả (đói cảm xúc) thường xuất hiện đột ngột, thèm một món cụ thể — thường là đồ ngọt, đồ chiên — và không biến mất dù bạn đã ăn no.",
          "Fake (emotional) hunger hits suddenly, targets specific foods — usually sweet or fried — and lingers even when you're full.",
        ),
      },
      { type: "h2", text: t("Cách nhận biết", "How to tell") },
      {
        type: "list",
        items: [
          t(
            "Đói thật đến từ từ, đói giả đến đột ngột",
            "Real hunger builds slowly; fake hunger strikes suddenly",
          ),
          t(
            "Đói thật ăn gì cũng được, đói giả chỉ thèm một món",
            "Real hunger accepts any food; fake hunger wants one thing",
          ),
          t(
            "Đói giả thường đi kèm căng thẳng, buồn chán",
            "Fake hunger often comes with stress or boredom",
          ),
        ],
      },
      { type: "h2", text: t("3 cách chế ngự", "3 ways to tame it") },
      {
        type: "list",
        items: [
          t(
            "Uống một ly nước lớn và chờ 10 phút",
            "Drink a big glass of water and wait 10 minutes",
          ),
          t(
            "Ngủ đủ 7–8 tiếng để cân bằng hormone đói",
            "Sleep 7–8 hours to balance hunger hormones",
          ),
          t(
            "Bổ sung chất xơ, đạm trong bữa chính để no lâu",
            "Add fibre and protein to main meals to stay full longer",
          ),
        ],
      },
      {
        type: "tip",
        text: t(
          "Mayqueen Slim chứa Garcinia Cambogia giúp hỗ trợ kiểm soát cơn thèm ăn một cách tự nhiên.",
          "Mayqueen Slim contains Garcinia Cambogia to naturally help manage cravings.",
        ),
      },
    ],
  },
  {
    slug: "vi-sao-ban-tang-can-lai-sau-khi-giam",
    category: "giu-dang",
    date: "2026-09-20",
    readTime: 5,
    cover: P.mayqueen.sunlight,
    thumb: S.noiKhongTangCan,
    title: t(
      "Vì sao bạn tăng cân lại sau khi giảm? Nói KHÔNG với hiệu ứng yo-yo",
      "Why does the weight come back? Saying no to the yo-yo effect",
    ),
    excerpt: t(
      "Giảm nhanh – tăng nhanh là vòng lặp quen thuộc. Hiểu đúng về trao đổi chất sẽ giúp bạn giữ kết quả lâu dài.",
      "Lose fast, regain fast — a familiar loop. Understanding your metabolism helps results last.",
    ),
    body: [
      {
        type: "p",
        text: t(
          "Khi nhịn ăn quá mức, cơ thể chuyển sang “chế độ tiết kiệm”: giảm tốc độ trao đổi chất và tích trữ mỡ ngay khi bạn ăn lại bình thường.",
          "When you under-eat, your body enters “saving mode”: it slows metabolism and stores fat as soon as you eat normally again.",
        ),
      },
      {
        type: "h2",
        text: t("Giảm mỡ đúng thay vì giảm cân nhanh", "Lose fat right, not weight fast"),
      },
      {
        type: "list",
        items: [
          t("Giảm 0,5–1kg/tuần là tốc độ an toàn", "0.5–1kg a week is a safe pace"),
          t(
            "Không bỏ bữa sáng — bữa quan trọng nhất cho trao đổi chất",
            "Never skip breakfast — it fuels your metabolism",
          ),
          t(
            "Tập kháng lực 2–3 buổi/tuần để giữ cơ",
            "Strength-train 2–3 times a week to keep muscle",
          ),
          t(
            "Thanh lọc định kỳ để hệ tiêu hoá hoạt động hiệu quả",
            "Cleanse regularly so digestion stays efficient",
          ),
        ],
      },
      {
        type: "tip",
        text: t(
          "Liệu trình Sáng đốt – Tối lọc được thiết kế để giảm mỡ đúng cách và hạn chế tăng cân trở lại.",
          "The Morning Burn – Night Cleanse ritual is designed to lose fat the right way and limit rebound.",
        ),
      },
    ],
  },
  {
    slug: "bi-quyet-giu-dang-nam-gon-trong-tui-xach",
    category: "giu-dang",
    date: "2026-09-12",
    readTime: 3,
    cover: P.yodetox.giftBox,
    thumb: S.tuiXach,
    title: t(
      "Bí quyết giữ dáng nằm gọn trong túi xách của nàng công sở",
      "The body-care secrets that fit in your work bag",
    ),
    excerpt: t(
      "Bình nước, hộp hạt, một lọ Mayqueen Slim… những món nhỏ giúp bạn giữ dáng cả ngày dài ở văn phòng.",
      "A water bottle, a pot of nuts, a bottle of Mayqueen Slim… small things that keep you on track all day at work.",
    ),
    body: [
      {
        type: "p",
        text: t(
          "Giữ dáng không cần thay đổi lớn — chỉ cần chuẩn bị sẵn vài món nhỏ trong túi để chọn đúng khi cơn thèm ập đến.",
          "Staying in shape doesn't require big changes — just a few small things in your bag so you choose well when cravings hit.",
        ),
      },
      {
        type: "list",
        items: [
          t(
            "Bình nước 750ml: nhắc bạn uống đủ 2 lít/ngày",
            "A 750ml bottle: reminds you to drink 2 litres a day",
          ),
          t(
            "Hộp hạt dinh dưỡng không muối: món ăn vặt lành mạnh",
            "Unsalted mixed nuts: a healthy snack",
          ),
          t(
            "Mayqueen Slim: 1 viên mỗi sáng, nhỏ gọn dễ mang",
            "Mayqueen Slim: one capsule each morning, travel-sized",
          ),
          t(
            "Gói Yodetox Extra: cho những ngày ăn tiệc, đầy bụng",
            "A Yodetox Extra sachet: for party days and bloating",
          ),
        ],
      },
    ],
  },
  {
    slug: "tra-thao-moc-thanh-loc-buoi-toi",
    category: "detox",
    date: "2026-09-03",
    readTime: 4,
    cover: P.yodetox.garden,
    thumb: S.dotCalo,
    title: t(
      "Thói quen buổi tối giúp đốt calo thụ động khi ngủ",
      "Evening habits that help you burn calories while you sleep",
    ),
    excerpt: t(
      "Giấc ngủ là lúc cơ thể phục hồi và trao đổi chất. Vài thói quen nhỏ trước khi ngủ giúp bạn thức dậy nhẹ nhõm hơn.",
      "Sleep is when your body repairs and metabolises. A few small bedtime habits help you wake up lighter.",
    ),
    body: [
      {
        type: "p",
        text: t(
          "Trong lúc ngủ, cơ thể vẫn tiêu hao năng lượng để phục hồi tế bào. Ngủ đủ và đúng cách giúp quá trình này hiệu quả hơn.",
          "While you sleep, your body still burns energy repairing cells. Good sleep makes this process more efficient.",
        ),
      },
      {
        type: "list",
        items: [
          t(
            "Ăn tối trước 19h30, ưu tiên rau và đạm nhẹ",
            "Eat dinner before 7:30 PM, favouring veggies and light protein",
          ),
          t(
            "Một ly Yodetox Extra sau ăn tối 1 giờ để nhẹ bụng",
            "A glass of Yodetox Extra 1 hour after dinner to de-bloat",
          ),
          t("Tắt màn hình 30 phút trước khi ngủ", "Switch off screens 30 minutes before bed"),
          t(
            "Giữ phòng ngủ mát (24–26°C) giúp đốt năng lượng tốt hơn",
            "Keep your room cool (24–26°C) to burn more energy",
          ),
        ],
      },
      {
        type: "tip",
        text: t(
          "Ngủ đủ 7–8 tiếng giúp giảm hormone gây thèm ăn ghrelin vào ngày hôm sau.",
          "7–8 hours of sleep lowers the hunger hormone ghrelin the next day.",
        ),
      },
    ],
  },
];

export const getArticle = (slug) => articles.find((a) => a.slug === slug);
