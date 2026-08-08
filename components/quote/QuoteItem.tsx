"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

import { QuoteItem as QuoteProduct } from "@/context/QuoteContext";
import { useQuote } from "@/hooks/useQuote";

interface Props {
  item: QuoteProduct;
}

export default function QuoteItem({ item }: Props) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useQuote();

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">

      <div className="flex flex-col gap-6 md:flex-row md:items-center">

        {/* Image */}

        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <Image
            src={item.image}
            alt={item.name}
            width={120}
            height={120}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Product Info */}

        <div className="flex-1">

          <p className="text-sm font-medium text-red-700">
            {item.group}
          </p>

          <h2 className="mt-1 text-xl font-semibold text-slate-900">
            {item.name}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Model: {item.model}
          </p>

        </div>

        {/* Quantity */}

        <div className="flex items-center gap-3">

          <button
            onClick={() => decreaseQuantity(item.id)}
            className="rounded-lg border border-slate-300 p-2 hover:border-red-700"
          >
            <Minus size={18} />
          </button>

          <span className="w-10 text-center text-lg font-semibold">
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="rounded-lg border border-slate-300 p-2 hover:border-red-700"
          >
            <Plus size={18} />
          </button>

        </div>

        {/* Remove */}

        <button
          onClick={() => removeItem(item.id)}
          className="rounded-xl p-3 text-slate-500 transition hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>

      </div>

    </div>
  );
}