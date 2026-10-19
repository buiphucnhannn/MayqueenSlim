"use client";

import { useRef, useState } from "react";
import { Hand, MousePointerClick } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Bản đồ Google nhúng: BẤM vào bất kỳ đâu → mở link Google Maps ở tab mới; KÉO → điều khiển bản đồ.
 *
 * Iframe khác domain nên trang không đọc được sự kiện bên trong → đặt một lớp phủ trong suốt lên trên:
 * - pointerdown ghi vị trí + thời điểm;
 * - di chuyển > 6px khi đang giữ chuột/ngón tay = KÉO → gỡ lớp phủ (chế độ tương tác), từ đó người dùng
 *   kéo/zoom bản đồ bình thường cho tới khi rời chuột khỏi bản đồ (hoặc 4s không chạm trên mobile);
 * - nhả ra mà gần như không di chuyển (≤ 6px, < 600ms) = BẤM → mở link.
 * Lăn chuột trên lớp phủ vẫn cuộn trang (không bị bản đồ "nuốt" cuộn).
 */
const MOVE_PX = 6;
const TAP_MS = 600;

export default function MapEmbed({ src, link, title, labels, className }) {
  const [interactive, setInteractive] = useState(false);
  const start = useRef(null);
  const idle = useRef(null);

  const enterInteractive = () => {
    setInteractive(true);
    clearTimeout(idle.current);
  };
  const leaveInteractive = () => {
    clearTimeout(idle.current);
    setInteractive(false);
  };

  return (
    <div
      className={cn("group relative overflow-hidden", className)}
      onMouseLeave={leaveInteractive}
      onTouchEnd={() => {
        // mobile không có "rời chuột" → tự khoá lại sau 4s không chạm
        clearTimeout(idle.current);
        idle.current = setTimeout(() => setInteractive(false), 4000);
      }}
    >
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="map-dark absolute inset-0 size-full border-0"
      />

      {!interactive && (
        <div
          role="link"
          tabIndex={0}
          aria-label={labels.open}
          className="absolute inset-0 cursor-pointer touch-pan-y"
          onPointerDown={(e) => {
            start.current = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId };
          }}
          onPointerMove={(e) => {
            const s = start.current;
            if (!s || s.id !== e.pointerId) return;
            if (Math.hypot(e.clientX - s.x, e.clientY - s.y) > MOVE_PX) {
              start.current = null;
              enterInteractive(); // người dùng đang kéo → nhường cho bản đồ
            }
          }}
          onPointerUp={(e) => {
            const s = start.current;
            start.current = null;
            if (!s) return;
            const moved = Math.hypot(e.clientX - s.x, e.clientY - s.y);
            if (moved <= MOVE_PX && Date.now() - s.t < TAP_MS)
              window.open(link, "_blank", "noopener,noreferrer");
          }}
          onPointerCancel={() => (start.current = null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              window.open(link, "_blank", "noopener,noreferrer");
            }
          }}
        />
      )}

      {/* Gợi ý thao tác */}
      <span
        className={cn(
          "bg-forest-deep/85 text-pearl pointer-events-none absolute right-2 bottom-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition-opacity duration-300",
          interactive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
        )}
      >
        {interactive ? (
          <>
            <Hand className="size-3.5" aria-hidden="true" /> {labels.dragging}
          </>
        ) : (
          <>
            <MousePointerClick className="size-3.5" aria-hidden="true" /> {labels.hint}
          </>
        )}
      </span>
    </div>
  );
}
