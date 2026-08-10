"use client";

import Image from "next/image";
import Link from "next/link";
import QuoteProgress from "@/components/quote/QuoteProgress";
import { useQuote } from "@/hooks/useQuote";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function QuotePage() {
  const {
    items,
    totalItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useQuote();

  return (
    <main className="min-h-screen bg-white">

      {/* Progress */}
      <QuoteProgress currentStep={1} />

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 lg:py-10">

        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
            Commercial Kitchen Equipment
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Your Quote Request
          </h1>

          <p className="mt-3 text-base leading-7 text-slate-600">
            Review the equipment you have selected for your quotation.
          </p>
        </div>

        {/* Empty Quote */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">

            <h2 className="text-xl font-semibold text-slate-900">
              Your quote is empty
            </h2>

            <p className="mt-2 text-slate-600">
              Add products to your quote request to continue.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800"
            >
              Browse Products
            </Link>

          </div>
        ) : (

          /* Two Column Layout */
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* ================================================== */}
            {/* LEFT: SELECTED PRODUCTS */}
            {/* ================================================== */}

            <section>

              <div className="mb-4 flex items-center justify-between">

                <h2 className="text-xl font-bold text-slate-900">
                  Selected Products
                </h2>

                <span className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700">
                  {items.length}{" "}
                  {items.length === 1 ? "Product" : "Products"}
                </span>

              </div>

              <div className="space-y-4">

                {items.map((item) => (

                  <article
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:shadow-sm md:p-5"
                  >

                    <div className="flex gap-4">

                      {/* Product Image */}
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 md:h-28 md:w-28">

                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="112px"
                            className="object-contain p-2"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400">
                            No Image
                          </div>
                        )}

                      </div>

                      {/* Product Information */}
                      <div className="min-w-0 flex-1">

                        {item.category && (
                          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
                            {item.category}
                          </p>
                        )}

                        <h3 className="mt-1 text-base font-semibold leading-snug text-slate-900 md:text-lg">
                          {item.name}
                        </h3>

                        {item.model && (
                          <p className="mt-1 text-sm text-slate-500">
                            Model:{" "}
                            <span className="font-medium text-slate-700">
                              {item.model}
                            </span>
                          </p>
                        )}

                        {/* Quantity + Remove */}
                        <div className="mt-4 flex items-center justify-between gap-4">

                          {/* Quantity Controls */}
                          <div className="flex items-center rounded-lg border border-slate-200 bg-white">

                            {/* Decrease */}
                            <button
                              type="button"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  decreaseQuantity(item.id);
                                }
                              }}
                              disabled={item.quantity <= 1}
                              className="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Decrease quantity of ${item.name}`}
                            >
                              <Minus size={16} />
                            </button>

                            {/* Quantity */}
                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-2 text-sm font-semibold text-slate-900">
                              {item.quantity}
                            </span>

                            {/* Increase */}
                            <button
                              type="button"
                              onClick={() => increaseQuantity(item.id)}
                              className="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus size={16} />
                            </button>

                          </div>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={17} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </article>

                ))}

              </div>

            </section>

            {/* ================================================== */}
            {/* RIGHT: STICKY QUOTE SUMMARY */}
            {/* ================================================== */}

            <aside className="lg:sticky lg:top-24 lg:self-start">

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">

                <h2 className="text-xl font-bold text-slate-900">
                  Quote Summary
                </h2>

                {/* Product Count */}
                <div className="mt-5 flex items-center justify-between border-b border-slate-200 pb-4">

                  <span className="text-sm text-slate-600">
                    Products Selected
                  </span>

                  <span className="text-2xl font-bold text-red-700">
                    {items.length}
                  </span>

                </div>

                {/* Total Quantity */}
                <div className="mt-4 flex items-center justify-between text-sm">

                  <span className="text-slate-600">
                    Total Quantity
                  </span>

                  <span className="font-semibold text-slate-900">
                    {totalItems}
                  </span>

                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500">
                  Your selected equipment is ready. Continue to provide your
                  contact details and request a quotation.
                </p>

                {/* Continue */}
                <Link
                  href="/quote/details"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800"
                >
                  Continue
                  <ArrowRight size={17} />
                </Link>

                {/* Add More Products */}
                <Link
                  href="/products"
                  className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-red-600 hover:text-red-700"
                >
                  Add More Products
                </Link>

              </div>

            </aside>

          </div>

        )}

      </div>

    </main>
  );
}