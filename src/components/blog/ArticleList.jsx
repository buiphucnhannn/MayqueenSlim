"use client";

import { useEffect, useState } from "react";
import ArticleCard from "@/components/blog/ArticleCard";
import { cn } from "@/lib/utils";

/**
 * Danh sách bài viết có lọc theo chuyên mục. Chuyên mục đọc từ hash URL (/song-dep#detox)
 * để nút điều hướng nhanh ở trang chủ mở đúng chủ đề.
 */
export default function ArticleList({ lang, articles, categories, labels }) {
  const [tab, setTab] = useState("all");
  const categoryLabels = Object.fromEntries(categories.map((c) => [c.id, c.label]));

  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.slice(1);
      if (categories.some((c) => c.id === id)) setTab(id);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [categories]);

  const select = (id) => {
    setTab(id);
    history.replaceState(null, "", id === "all" ? window.location.pathname : `#${id}`);
  };

  const shown = tab === "all" ? articles : articles.filter((a) => a.category === tab);

  return (
    <div>
      <div role="tablist" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {categories.map((c) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={tab === c.id}
            onClick={() => select(c.id)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-[13px] font-semibold transition",
              tab === c.id ? "bg-forest text-pearl" : "bg-sage-50 text-ink-soft hover:bg-sage-100",
            )}
          >
            {c.label}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-x-10 gap-y-2 md:grid-cols-2">
        {shown.map((a, i) => (
          <li
            key={`${tab}-${a.slug}`}
            className="reveal border-forest/10 border-b py-3"
            style={{ "--reveal-delay": `${(i % 4) * 80}ms` }}
          >
            <ArticleCard
              article={a}
              lang={lang}
              categoryLabel={categoryLabels[a.category]}
              labels={labels}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
