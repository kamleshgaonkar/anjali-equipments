"use client";

import Link from "next/link";
import { FileText } from "lucide-react";
import { useQuote } from "@/hooks/useQuote";

export default function QuoteBadge() {
  const { totalItems } = useQuote();

  return (
    <Link
      href="/quote"
      className="relative inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 font-medium transition hover:border-red-600 hover:text-red-700"
    >
      <FileText size={18} />

      <span>Quote Request</span>

      {totalItems > 0 && (
        <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-red-700 px-2 text-xs font-semibold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}