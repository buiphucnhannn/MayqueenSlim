import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { href } from "@/i18n";
import { cn, formatDate } from "@/lib/utils";

/**
 * Thẻ bài viết "Sống đẹp".
 * - variant "feature": ảnh bìa lớn (ảnh chất lượng cao).
 * - variant "row": ảnh thumbnail nhỏ (ảnh bài đăng mạng xã hội, giữ nét ở kích thước nhỏ).
 * article: dữ liệu ĐÃ localize; categoryLabel: tên chuyên mục.
 */
export default function ArticleCard({
  article,
  lang,
  categoryLabel,
  labels,
  variant = "row",
  className,
}) {
  const link = href(lang, `/song-dep/${article.slug}`);

  if (variant === "feature")
    return (
      <Link
        href={link}
        className={cn(
          "group bg-forest relative block h-full overflow-hidden rounded-md",
          className,
        )}
      >
        <div className="relative aspect-[4/5] h-full sm:aspect-[16/11] lg:aspect-auto">
          <Image
            src={article.cover}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 55vw, 92vw"
            className="object-cover opacity-90 transition duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="from-forest-deep/90 via-forest-deep/20 absolute inset-0 bg-gradient-to-t to-transparent" />
        </div>
        <div className="text-pearl absolute inset-x-0 bottom-0 p-7 sm:p-10">
          <span className="bg-leaf text-forest rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase">
            {categoryLabel}
          </span>
          <h3 className="mt-4 max-w-xl font-serif text-2xl leading-tight sm:text-3xl">
            {article.title}
          </h3>
          <p className="text-pearl/75 mt-3 line-clamp-2 max-w-lg text-sm">{article.excerpt}</p>
          <span className="text-leaf mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            {labels.readMore}{" "}
            <ArrowUpRight className="size-4 transition group-hover:rotate-45" aria-hidden="true" />
          </span>
        </div>
      </Link>
    );

  return (
    <Link
      href={link}
      className={cn("group hover:bg-sage-50 flex gap-5 rounded-md p-3 transition", className)}
    >
      <div className="relative size-24 shrink-0 overflow-hidden rounded-md sm:size-28">
        <Image
          src={article.thumb}
          alt={article.title}
          fill
          sizes="128px"
          className="object-cover transition duration-700 group-hover:scale-110"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center">
        <p className="text-sage-600 flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase">
          {categoryLabel}
        </p>
        <h3 className="text-forest group-hover:text-sage-700 mt-1.5 line-clamp-2 font-serif text-lg leading-snug sm:text-xl">
          {article.title}
        </h3>
        <p className="text-ink-muted mt-2 flex items-center gap-3 text-xs">
          <span>{formatDate(article.date, lang)}</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" aria-hidden="true" /> {article.readTime} {labels.minRead}
          </span>
        </p>
      </div>
    </Link>
  );
}
