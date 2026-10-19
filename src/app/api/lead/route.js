import { isValidPhone } from "@/lib/utils";

/**
 * Nhận đăng ký tư vấn từ popup ConsultModal.
 * TODO: thay console.log bằng nơi lưu thật (Google Sheets, email, CRM, Telegram bot...).
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "")
    .trim()
    .slice(0, 120);
  const phone = String(body.phone ?? "").trim();
  if (!name || !isValidPhone(phone)) {
    return Response.json({ message: "Missing name or invalid phone" }, { status: 422 });
  }

  console.log("[lead:consult]", {
    name,
    phone,
    goal: body.goal,
    note: String(body.note ?? "").slice(0, 1000),
  });
  return Response.json({ ok: true }, { status: 201 });
}
