"use client";

import type { MouseEvent } from "react";
import { Check, FileText, Plus } from "lucide-react";
import { Product } from "@/types/product";
import { useQuote } from "@/hooks/useQuote";

interface QuoteButtonProps {
  product: Product;
  variant?: "default" | "compact" | "card";
  className?: string;
}

export default function QuoteButton({
  product,
  variant = "default",
  className = "",
}: QuoteButtonProps) {
  const { items, addItem } = useQuote();

  const exists = items.some((item) => item.id === product.id);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addItem(product);
  };

  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2 ${
          exists
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-[#8b191c] text-white hover:bg-[#731417]"
        } ${className}`}
      >
        {exists ? (
          <>
            <Check size={16} />
            Added to Quote
          </>
        ) : (
          <>
            <Plus size={16} />
            Add to Quote
          </>
        )}
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
          exists
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-[#8b191c] text-white hover:bg-[#731417]"
        } ${className}`}
      >
        {exists ? (
          <>
            <Check size={16} />
            Added to Quote
          </>
        ) : (
          <>Add to Quote</>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
        exists
          ? "bg-green-600 text-white hover:bg-green-700"
          : "border border-slate-300 bg-white text-slate-900 hover:border-red-700 hover:text-red-700"
      } ${className}`}
    >
      {exists ? (
        <>
          <Check size={18} />
          Added to Quote Request
        </>
      ) : (
        <>
          <FileText size={18} />
          Add to Quote Request
        </>
      )}
    </button>
  );
}
