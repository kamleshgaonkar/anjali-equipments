"use client";

import Link from "next/link";
import { useQuote } from "@/hooks/useQuote";

export default function QuoteSummary() {
  const { totalItems } = useQuote();

  return (
    <div className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-8">

      <h2 className="text-2xl font-bold text-slate-900">
        Quote Summary
      </h2>

      <div className="mt-8 flex items-center justify-between border-b border-slate-200 pb-6">

        <span className="text-lg text-slate-600">
          Products Selected
        </span>

        <span className="text-3xl font-bold text-red-700">
          {totalItems}
        </span>

      </div>

      <p className="mt-6 text-slate-600">
        Review your selected commercial kitchen equipment before continuing to your quotation request.
      </p>

      <Link
        href="/quote/details"
        className="mt-8 inline-flex rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
      >
        Continue
      </Link>

    </div>
  );
}