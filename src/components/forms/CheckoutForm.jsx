"use client";

import { useState } from "react";
import Image from "next/image";
import { Banknote, Check, CheckCircle2, ShoppingBag } from "lucide-react";
import QtyStepper from "@/components/cart/QtyStepper";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { href } from "@/i18n";
import { cn, formatPrice, isValidPhone } from "@/lib/utils";

const initial = { name: "", phone: "", address: "", province: "", note: "" };

// Trang đặt hàng: thông tin giao hàng + hình thức thanh toán (chỉ COD) + tóm tắt đơn. Gửi POST /api/order.
export default function CheckoutForm({ labels }) {
  const { lang, lines, subtotal, saved, shipping, total, setQty, clear } = useCart();
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | error
  const [order, setOrder] = useState(null);

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((x) => ({ ...x, [key]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = labels.required;
    if (!isValidPhone(values.phone)) next.phone = labels.phoneError;
    if (!values.address.trim()) next.address = labels.required;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: values,
          payment: "cod",
          items: lines.map(({ slug, optionId, qty }) => ({ slug, optionId, qty })),
        }),
      });
      if (!res.ok) throw new Error();
      setOrder(await res.json());
      clear();
      window.__lenis?.scrollTo(0, { immediate: true });
    } catch {
      setStatus("error");
    }
  };

  if (order)
    return (
      <div className="mx-auto max-w-lg py-10 text-center" role="status">
        <span className="bg-leaf-soft text-sage-700 mx-auto grid size-20 [animation:popIn_.5s_ease-out] place-items-center rounded-full">
          <CheckCircle2 className="size-10" aria-hidden="true" />
        </span>
        <h2 className="h-display mt-6 text-4xl">{labels.thanks}</h2>
        <p className="text-ink-soft mt-3">{labels.thanksText}</p>
        <p className="bg-sage-50 mt-6 inline-block rounded-full px-5 py-2 text-sm">
          {labels.orderId}: <strong className="text-forest">{order.orderId}</strong> ·{" "}
          {formatPrice(order.total, lang)}
        </p>
        <div className="mt-8">
          <Button href={href(lang, "/")} arrow>
            {labels.backHome}
          </Button>
        </div>
      </div>
    );

  if (lines.length === 0)
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <span className="bg-sage-100 text-sage-600 grid size-20 place-items-center rounded-full">
          <ShoppingBag className="size-8" aria-hidden="true" />
        </span>
        <p className="text-forest mt-5 font-serif text-3xl">{labels.empty}</p>
        <Button href={href(lang, "/san-pham")} arrow className="mt-6">
          {labels.continue}
        </Button>
      </div>
    );

  const field = (key, props = {}) => (
    <div className={props.wrapClass}>
      <label htmlFor={`co-${key}`} className="text-ink-soft mb-1.5 block pl-1 text-sm font-medium">
        {labels[key]}
        {props.required && <span className="text-sage-600"> *</span>}
      </label>
      <input
        id={`co-${key}`}
        value={values[key]}
        onChange={set(key)}
        aria-invalid={!!errors[key]}
        className={cn("field", errors[key] && "border-red-400")}
        {...props.input}
      />
      {errors[key] && <p className="mt-1.5 pl-2 text-xs text-red-600">{errors[key]}</p>}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
      <div className="space-y-8">
        <fieldset className="reveal bg-pearl shadow-card rounded-lg p-6 sm:p-8">
          <legend className="sr-only">{labels.shippingInfo}</legend>
          <h2 className="text-forest font-serif text-2xl">{labels.shippingInfo}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {field("name", { required: true, input: { autoComplete: "name" } })}
            {field("phone", {
              required: true,
              input: { type: "tel", inputMode: "tel", autoComplete: "tel" },
            })}
            {field("address", {
              required: true,
              wrapClass: "sm:col-span-2",
              input: { autoComplete: "street-address" },
            })}
            {field("province", {
              wrapClass: "sm:col-span-2",
              input: { autoComplete: "address-level1" },
            })}
            <div className="sm:col-span-2">
              <label
                htmlFor="co-note"
                className="text-ink-soft mb-1.5 block pl-1 text-sm font-medium"
              >
                {labels.note}
              </label>
              <textarea
                id="co-note"
                rows={3}
                value={values.note}
                onChange={set("note")}
                className="field resize-none"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="reveal bg-pearl shadow-card rounded-lg p-6 sm:p-8">
          <legend className="sr-only">{labels.payment}</legend>
          <h2 className="text-forest font-serif text-2xl">{labels.payment}</h2>
          {/* Chỉ một hình thức: thanh toán khi nhận hàng — hiển thị dạng thẻ thông tin (không cần chọn) */}
          <div className="border-sage-600 bg-sage-50 mt-5 flex items-center gap-4 rounded-3xl border-2 p-4">
            <span className="bg-sage-100 text-sage-700 grid size-11 shrink-0 place-items-center rounded-full">
              <Banknote className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-forest block font-semibold">{labels.cod}</span>
              <span className="text-ink-muted block text-xs">{labels.codNote}</span>
            </span>
            <span className="bg-sage-600 grid size-6 shrink-0 place-items-center rounded-full text-white">
              <Check className="size-3.5" aria-hidden="true" />
            </span>
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div
          style={{ "--reveal-delay": "150ms" }}
          className="reveal bg-forest text-pearl rounded-lg p-6 sm:p-8"
        >
          <h2 className="font-serif text-2xl">{labels.summary}</h2>
          <ul className="divide-pearl/10 mt-5 divide-y">
            {lines.map((l) => (
              <li key={l.key} className="flex items-center gap-4 py-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                  <Image src={l.image} alt={l.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug font-semibold">{l.name}</p>
                  <p className="text-pearl/60 text-xs">{l.optionLabel}</p>
                  <QtyStepper
                    size="sm"
                    value={l.qty}
                    min={0}
                    onChange={(q) => setQty(l.slug, l.optionId, q)}
                    className="text-forest mt-2"
                  />
                </div>
                <span className="text-sm font-semibold">{formatPrice(l.price * l.qty, lang)}</span>
              </li>
            ))}
          </ul>
          <dl className="border-pearl/10 space-y-2 border-t pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-pearl/70">{labels.subtotal}</dt>
              <dd>{formatPrice(subtotal, lang)}</dd>
            </div>
            {saved > 0 && (
              <div className="text-leaf flex justify-between">
                <dt>{labels.saved}</dt>
                <dd>−{formatPrice(saved, lang)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-pearl/70">{labels.shipping}</dt>
              <dd>{shipping === 0 ? labels.free : formatPrice(shipping, lang)}</dd>
            </div>
            <div className="border-pearl/10 flex items-baseline justify-between border-t pt-4">
              <dt className="font-semibold">{labels.total}</dt>
              <dd className="text-leaf font-serif text-3xl">{formatPrice(total, lang)}</dd>
            </div>
          </dl>
          {status === "error" && (
            <p
              className="mt-4 rounded-2xl bg-red-500/15 px-4 py-3 text-sm text-red-200"
              role="alert"
            >
              {labels.error}
            </p>
          )}
          <Button
            type="submit"
            variant="leaf"
            size="lg"
            arrow
            className="mt-6 w-full"
            disabled={status === "sending"}
          >
            {status === "sending" ? labels.sending : labels.placeOrder}
          </Button>
          <p className="text-pearl/55 mt-3 text-center text-xs">{labels.secure}</p>
        </div>
      </aside>
    </form>
  );
}
