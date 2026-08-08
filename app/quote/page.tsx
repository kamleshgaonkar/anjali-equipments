"use client";

import Link from "next/link";
import QuoteSummary from "@/components/quote/QuoteSummary";
import QuoteItem from "@/components/quote/QuoteItem";
import PageHero from "@/components/layout/PageHero";
import { useQuote } from "@/hooks/useQuote";

export default function QuotePage() {
  const { items } = useQuote();

  return (
    <>
      <PageHero
       title="Quote Request"
        background="/hero/products.jpg"
      />

      <main className="container-custom py-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10">
           

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Your Quote Request
            </h1>

            <p className="mt-4 text-lg text-slate-600">
              Review the equipment you've selected before requesting a quotation.
            </p>
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">

              <h2 className="text-2xl font-semibold">
                Your quote request is empty.
              </h2>

              <p className="mt-4 text-slate-600">
                Browse our products and add equipment to build your quote request.
              </p>

              <Link
                href="/products"
                className="mt-8 inline-flex rounded-xl bg-red-700 px-8 py-4 font-semibold text-white hover:bg-red-800"
              >
                Browse Products
              </Link>

            </div>
          ) : (
            <div className="space-y-6">

{items.map((item) => (
  <QuoteItem
    key={item.id}
    item={item}
  />
))}
<QuoteSummary />
            </div>
          )}

        </div>

      </main>
    </>
  );
}