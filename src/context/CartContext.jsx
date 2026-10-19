"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { siteConfig } from "@/config/site";
import { getProduct } from "@/data/products";
import { localize } from "@/i18n";
import { cartStore } from "@/lib/cartStore";

const CartContext = createContext(null);

// Ghép dòng giỏ hàng với dữ liệu sản phẩm (tên, ảnh, giá theo gói) theo ngôn ngữ hiện tại
function buildLines(items, lang) {
  return items
    .map((item) => {
      const raw = getProduct(item.slug);
      const option = raw?.options.find((o) => o.id === item.optionId);
      if (!raw || !option) return null;
      const p = localize(raw, lang);
      const o = localize(option, lang);
      return {
        key: `${item.slug}:${item.optionId}`,
        slug: item.slug,
        optionId: item.optionId,
        qty: item.qty,
        name: p.name,
        image: p.images[0],
        optionLabel: o.label,
        price: o.price,
        compareAt: o.compareAt,
      };
    })
    .filter(Boolean);
}

export function CartProvider({ lang, children }) {
  const items = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );
  const [open, setOpen] = useState(false);

  const lines = useMemo(() => buildLines(items, lang), [items, lang]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const saved = lines.reduce((s, l) => s + ((l.compareAt ?? l.price) - l.price) * l.qty, 0);
  const shipping =
    subtotal === 0 || subtotal >= siteConfig.freeShipThreshold ? 0 : siteConfig.shippingFee;

  const add = useCallback((slug, optionId, qty = 1, { openDrawer = true } = {}) => {
    cartStore.add(slug, optionId, qty);
    if (openDrawer) setOpen(true);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      lines,
      count,
      subtotal,
      saved,
      shipping,
      total: subtotal + shipping,
      open,
      setOpen,
      add,
      setQty: cartStore.setQty,
      remove: (slug, optionId) => cartStore.setQty(slug, optionId, 0),
      clear: cartStore.clear,
    }),
    [lang, lines, count, subtotal, saved, shipping, open, add],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart phải nằm trong <CartProvider>");
  return ctx;
}
