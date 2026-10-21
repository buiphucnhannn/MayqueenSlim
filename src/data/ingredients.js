import { t } from "@/i18n";
import { productImages as P } from "./images";

/**
 * Khối "Thành phần" — 2 tab: Mayqueen Slim (buổi sáng) | Yodetox Extra (buổi tối).
 * CHỮ MẪU theo brief: KHÔNG tự bịa thành phần hay công dụng. Sale xin bảng thành phần thật
 * trên vỏ hộp / hồ sơ công bố rồi điền vào name + benefit của từng lớp.
 */
const placeholder = (n) => ({
  name: t(`[Thành phần ${n}]`, `[Ingredient ${n}]`),
  benefit: t("[Công dụng]", "[Benefit]"),
});

export const ingredientTabs = [
  {
    id: "mayqueen",
    label: "Mayqueen Slim",
    time: t("Buổi sáng", "Morning"),
    image: P.mayqueen.sunlight,
    layers: Array.from({ length: 6 }, (_, i) => placeholder(i + 1)),
  },
  {
    id: "yodetox",
    label: "Yodetox Extra",
    time: t("Buổi tối", "Evening"),
    image: P.yodetox.garden,
    layers: Array.from({ length: 6 }, (_, i) => placeholder(i + 1)),
  },
];
