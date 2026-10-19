"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, switchLocalePath } from "@/i18n";
import { cn } from "@/lib/utils";

// VI / EN dạng chữ tối giản (light: chữ sáng khi header nằm trên nền tối) — giữ nguyên trang đang xem khi đổi ngôn ngữ.
export default function LanguageSwitcher({ lang, light = false, className }) {
  const pathname = usePathname();
  return (
    <div
      className={cn("flex items-center gap-1.5 text-xs font-semibold tracking-[0.14em]", className)}
    >
      {LOCALES.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className={light ? "text-pearl/40" : "text-forest/25"}>/</span>}
          <Link
            href={switchLocalePath(pathname, l)}
            hrefLang={l}
            aria-current={l === lang ? "true" : undefined}
            className={cn(
              "uppercase transition",
              l === lang
                ? cn("underline underline-offset-4", light ? "text-pearl" : "text-forest")
                : light
                  ? "text-pearl/70 hover:text-pearl"
                  : "text-ink-muted hover:text-forest",
            )}
          >
            {l}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}
