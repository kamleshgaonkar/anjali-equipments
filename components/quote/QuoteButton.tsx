"use client";

import { Check, FileText } from "lucide-react";
import { Product } from "@/types/product";
import { useQuote } from "@/hooks/useQuote";

interface QuoteButtonProps {
  product: Product;
  variant?: "default" | "compact";
  className?: string;
}

export default function QuoteButton({
  product,
  variant = "default",
  className = "",
}: QuoteButtonProps) {
  const { items, addItem } = useQuote();

  const exists = items.some((item) => item.id === product.id);
  const isCompact = variant === "compact";

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className={
        isCompact
          ? `inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
              exists
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-[#8b191c] text-white hover:bg-[#731417]"
            } ${className}`
          : `inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
              exists
                ? "bg-green-600 text-white hover:bg-green-700"
                : "border border-slate-300 bg-white text-slate-900 hover:border-red-700 hover:text-red-700"
            } ${className}`
      }
    >
      {exists ? (
        <>
          <Check size={isCompact ? 16 : 18} />
          {isCompact ? "Added to Quote" : "Added to Quote Request"}
        </>
      ) : (
        <>
          {!isCompact && <FileText size={18} />}
          {isCompact ? "Add to Quote" : "Add to Quote Request"}
        </>
      )}
    </button>
  );
}
