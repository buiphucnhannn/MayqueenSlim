"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn, isValidPhone } from "@/lib/utils";

const initial = { name: "", phone: "", goal: 0, note: "" };

// Form đăng ký tư vấn liệu trình cá nhân hoá → POST /api/lead
export default function ConsultForm({ labels }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const set = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!values.name.trim()) next.name = labels.nameError;
    if (!isValidPhone(values.phone)) next.phone = labels.phoneError;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "consult", ...values, goal: labels.goals[values.goal] }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      setValues(initial);
    } catch {
      setStatus("error");
    }
  };

  if (status === "done")
    return (
      <div className="flex flex-col items-center py-12 text-center" role="status">
        <span className="bg-leaf-soft text-sage-700 grid size-16 [animation:popIn_.5s_ease-out] place-items-center rounded-full">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <p className="text-forest mt-5 max-w-xs font-serif text-2xl">{labels.success}</p>
      </div>
    );

  return (
    <form onSubmit={submit} noValidate className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label htmlFor="consult-name" className="sr-only">
            {labels.name}
          </label>
          <input
            id="consult-name"
            autoComplete="name"
            placeholder={`${labels.name} *`}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={cn("field", errors.name && "border-red-400")}
          />
          {errors.name && <p className="mt-1.5 pl-2 text-xs text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="consult-phone" className="sr-only">
            {labels.phone}
          </label>
          <input
            id="consult-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={`${labels.phone} *`}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            className={cn("field", errors.phone && "border-red-400")}
          />
          {errors.phone && <p className="mt-1.5 pl-2 text-xs text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <fieldset>
        <legend className="text-ink-soft mb-2.5 pl-1 text-sm font-medium">{labels.goal}</legend>
        {/* Lưới 2 cột đều nhau → các hàng luôn thẳng hàng */}
        <div className="grid grid-cols-2 gap-2">
          {labels.goals.map((g, i) => (
            <button
              key={g}
              type="button"
              aria-pressed={values.goal === i}
              onClick={() => set("goal", i)}
              className={cn(
                "flex min-h-10 items-center justify-center rounded-xl border px-2.5 py-1.5 text-center text-[12.5px] leading-snug transition sm:min-h-11 sm:px-3 sm:py-2 sm:text-[13px]",
                values.goal === i
                  ? "border-forest bg-forest text-pearl"
                  : "border-forest/15 text-ink-soft hover:border-forest/40 bg-white",
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="consult-note" className="sr-only">
          {labels.note}
        </label>
        <textarea
          id="consult-note"
          rows={2}
          placeholder={labels.note}
          value={values.note}
          onChange={(e) => set("note", e.target.value)}
          className="field resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {labels.error}
        </p>
      )}

      <Button type="submit" size="lg" arrow className="w-full" disabled={status === "sending"}>
        {status === "sending" ? labels.sending : labels.submit}
      </Button>
    </form>
  );
}
