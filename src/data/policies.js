import { t } from "@/i18n";

// Trang chính sách (chân trang). TODO: rà soát lại nội dung với bộ phận pháp lý của doanh nghiệp.
export const policies = [
  {
    slug: "doi-tra",
    title: t("Chính sách đổi trả", "Returns policy"),
    body: [
      t(
        "Khách hàng được kiểm tra hàng trước khi thanh toán. Sản phẩm lỗi do nhà sản xuất hoặc giao sai được đổi mới miễn phí trong vòng 7 ngày kể từ khi nhận hàng.",
        "You may inspect your order before paying. Faulty or incorrect items are replaced free of charge within 7 days of delivery.",
      ),
      t(
        "Sản phẩm đổi trả cần còn nguyên tem, hộp và chưa qua sử dụng. Vui lòng liên hệ hotline để được hướng dẫn.",
        "Items must be unopened with seals and packaging intact. Please contact our hotline for assistance.",
      ),
    ],
  },
  {
    slug: "van-chuyen",
    title: t("Chính sách vận chuyển", "Shipping policy"),
    body: [
      t(
        "Giao hàng toàn quốc qua các đơn vị vận chuyển uy tín. Nội thành Hà Nội 1–2 ngày, các tỉnh khác 2–5 ngày làm việc.",
        "Nationwide delivery via trusted carriers. Hanoi 1–2 days, other provinces 2–5 working days.",
      ),
      t(
        "Miễn phí vận chuyển cho đơn hàng từ 500.000₫. Đơn dưới 500.000₫ phí đồng giá 30.000₫.",
        "Free shipping on orders over 500,000₫; a flat 30,000₫ fee applies below that.",
      ),
    ],
  },
  {
    slug: "thanh-toan",
    title: t("Chính sách thanh toán", "Payment policy"),
    body: [
      t(
        "Mayqueen hỗ trợ thanh toán khi nhận hàng (COD) trên toàn quốc. Bạn được kiểm tra hàng trước, hài lòng rồi mới thanh toán cho nhân viên giao hàng.",
        "We accept cash on delivery (COD) nationwide. Inspect your order first and pay the courier only when you are satisfied.",
      ),
    ],
  },
  {
    slug: "bao-mat",
    title: t("Chính sách bảo mật", "Privacy policy"),
    body: [
      t(
        "Thông tin cá nhân của khách hàng chỉ được sử dụng để xử lý đơn hàng, tư vấn và chăm sóc sau bán. Chúng tôi cam kết không chia sẻ cho bên thứ ba khi chưa có sự đồng ý.",
        "Your personal data is used only to process orders, provide advice and after-sales care. We never share it with third parties without your consent.",
      ),
    ],
  },
];

export const getPolicy = (slug) => policies.find((p) => p.slug === slug);
