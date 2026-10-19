import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Nền nhoè từ chính bức ảnh: tải bản siêu nhỏ (48px) rồi phóng to → trình duyệt tự làm mịn như blur
 * mà không tốn GPU (không dùng filter: blur). Đặt dưới ảnh chính để phần nền xung quanh có cùng
 * tông màu, ánh sáng với ảnh → ảnh "hoà" vào nền thay vì nằm trên một mảng màu phẳng.
 *
 * tint: màu phủ lên để chữ dễ đọc; fade: "left" | "right" | "bottom" | "none" — phía nào phủ đậm hơn
 * (phía có chữ). dark: thêm lớp tối nhẹ cho nền tối chữ sáng.
 */
const FADE = {
  left: (c) => `linear-gradient(90deg, ${c} 0%, ${c} 30%, transparent 85%)`,
  right: (c) => `linear-gradient(270deg, ${c} 0%, ${c} 30%, transparent 85%)`,
  bottom: (c) => `linear-gradient(0deg, ${c} 0%, ${c} 35%, transparent 90%)`,
  none: (c) => c,
};

export default function PhotoBackdrop({
  src,
  pos = "center",
  tint,
  fade = "none",
  strength = 0.6,
  dark = false,
  className,
}) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="48px"
        quality={30}
        className="scale-125 object-cover"
        style={{ objectPosition: pos }}
      />
      {tint && (
        <div
          className="absolute inset-0"
          style={{ background: FADE[fade](tint), opacity: strength }}
        />
      )}
      {dark && <div className="bg-forest-deep/25 absolute inset-0" />}
    </div>
  );
}
