import { siteConfig } from "@/config/site";
import { getProduct } from "@/data/products";
import { isValidPhone } from "@/lib/utils";

/**
 * Nhận đơn đặt hàng từ trang thanh toán.
 * Giá luôn TÍNH LẠI ở server từ dữ liệu sản phẩm — không tin giá gửi lên từ trình duyệt.
 * TODO: lưu đơn vào hệ thống thật (Google Sheets / Pancake / KiotViet / email...).
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { customer = {}, items = [] } = body;
  const name = String(customer.name ?? "").trim();
  const phone = String(customer.phone ?? "").trim();
  const address = String(customer.address ?? "").trim();
  if (!name || !isValidPhone(phone) || !address) {
    return Response.json({ message: "Missing customer info" }, { status: 422 });
  }

  const lines = [];
  for (const it of Array.isArray(items) ? items : []) {
    const product = getProduct(it.slug);
    const option = product?.options.find((o) => o.id === it.optionId);
    const qty = Math.min(99, Math.max(1, Number.parseInt(it.qty, 10) || 0));
    if (!option) continue;
    lines.push({ slug: it.slug, optionId: it.optionId, qty, price: option.price });
  }
  if (!lines.length) return Response.json({ message: "Empty cart" }, { status: 422 });

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const shipping = subtotal >= siteConfig.freeShipThreshold ? 0 : siteConfig.shippingFee;
  const orderId = `MQ${Date.now().toString(36).toUpperCase()}`;

  console.log("[order]", {
    orderId,
    customer: { name, phone, address, province: customer.province, note: customer.note },
    payment: "cod", // chỉ hỗ trợ thanh toán khi nhận hàng
    lines,
    subtotal,
    shipping,
    total: subtotal + shipping,
  });

  return Response.json({ orderId, total: subtotal + shipping }, { status: 201 });
}
