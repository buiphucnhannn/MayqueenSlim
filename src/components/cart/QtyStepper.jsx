"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function QtyStepper({ value, onChange, min = 1, size = "md", className }) {
  const btn = cn(
    "grid place-items-center text-forest transition hover:bg-sage-100 disabled:opacity-30",
    size === "sm" ? "size-8" : "size-11",
  );
  return (
    <div
      className={cn(
        "border-forest/15 inline-flex items-center rounded-full border bg-white",
        className,
      )}
    >
      <button
        type="button"
        className={cn(btn, "rounded-l-full")}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="−"
      >
        <Minus className="size-3.5" />
      </button>
      <span
        className={cn(
          "text-center font-semibold tabular-nums",
          size === "sm" ? "w-7 text-sm" : "w-9",
        )}
      >
        {value}
      </span>
      <button
        type="button"
        className={cn(btn, "rounded-r-full")}
        onClick={() => onChange(value + 1)}
        disabled={value >= 99}
        aria-label="+"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
