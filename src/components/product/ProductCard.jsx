"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Price from "@/components/ui/Price";
import { useCart } from "@/context/CartContext";
import { href } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * Thẻ sản phẩm kiểu The Beauty Chef: ảnh vuông (ảnh thứ 2 hiện khi hover), nhãn nhỏ,
 * chữ căn giữa, nút "Thêm vào giỏ" toàn chiều ngang. product: dữ liệu ĐÃ localize.
 */
export default function ProductCard({ product, lang, labels, className, priority = false }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const option = product.options[0];
  const link = href(lang, `/san-pham/${product.slug}`);

  const quickAdd = () => {
    add(product.slug, option.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className={cn("group flex flex-col text-center", className)}>
      <Link href={link} className="bg-sand relative block aspect-square overflow-hidden rounded-md">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt=""
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        {product.badge && (
          <span className="bg-forest text-pearl absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase">
            {product.badge}
          </span>
        )}
      </Link>

      <div className="mt-3 flex flex-1 flex-col items-center px-1 sm:mt-4 sm:px-2">
        <p className="text-sage-600 text-[10.5px] font-semibold tracking-[0.2em] uppercase">
          {product.ritual}
        </p>
        <h3 className="text-forest mt-1.5 font-serif text-[17px] leading-tight sm:text-xl">
          <Link href={link} className="hover:text-sage-600">
            {product.name}
          </Link>
        </h3>
        <p className="text-ink-soft mt-1 line-clamp-2 text-[12px] leading-snug sm:text-[13px]">
          {product.tagline}
        </p>
        <Price
          price={option.price}
          compareAt={option.compareAt}
          lang={lang}
          className="mt-2 justify-center text-[15px]"
        />
      </div>

      <button
        type="button"
        onClick={quickAdd}
        className={cn(
          "mt-3 h-10 w-full rounded-full border text-[10.5px] font-semibold tracking-[0.1em] uppercase transition-colors duration-300 sm:mt-4 sm:h-11 sm:text-[11.5px] sm:tracking-[0.16em]",
          added
            ? "border-sage-600 bg-sage-600 text-pearl"
            : "border-forest text-forest hover:bg-forest hover:text-pearl",
        )}
      >
        {added ? labels.added : labels.addToCart}
      </button>
    </article>
  );
}
