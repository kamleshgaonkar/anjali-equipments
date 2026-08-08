"use client";

import { Check, FileText } from "lucide-react";
import { Product } from "@/types/product";
import { useQuote } from "@/hooks/useQuote";

interface QuoteButtonProps {
  product: Product;
}

export default function QuoteButton({
  product,
}: QuoteButtonProps) {
  const {
    items,
    addItem,
  } = useQuote();

  const exists = items.some(
    (item) => item.id === product.id
  );

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 font-semibold transition-all duration-300 ${
        exists
          ? "bg-green-600 text-white hover:bg-green-700"
          : "border border-slate-300 bg-white text-slate-900 hover:border-red-700 hover:text-red-700"
      }`}
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