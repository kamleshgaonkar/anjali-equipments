"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ClipboardList,
  X,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { useQuoteContext } from "@/context/QuoteContext";

export default function MobileQuoteButton() {
    const {
        items,
        totalItems,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      } = useQuoteContext();

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Quote Icon */}

      <button
        type="button"
        aria-label="Open quote request"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-900 transition-colors duration-300 hover:bg-slate-100 lg:hidden"
      >
        <ClipboardList size={24} />

        {totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold leading-none text-white">
            {totalItems > 99 ? "99+" : totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}

      {open && (
        <button
          type="button"
          aria-label="Close quote request"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Quote Drawer */}

      <aside
        className={`fixed right-0 top-0 z-[120] flex h-dvh w-full max-w-[430px] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        {/* Header */}

        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-5 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Quote Request
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {totalItems === 0
                ? "No products selected"
                : `${totalItems} ${
                    totalItems === 1 ? "item" : "items"
                  } selected`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close quote request"
            className="rounded-full border border-slate-200 bg-slate-50 p-2.5 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Products */}

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {items.length === 0 ? (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
                <ClipboardList size={30} />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Your quote is empty
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                Add equipment to your quote and we'll help you with the
                pricing and details.
              </p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 rounded-xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex gap-4">
                    {/* Image */}

                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Product */}

                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Model: {item.model}
                      </p>

                      {/* Quantity */}

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center overflow-hidden rounded-lg border border-slate-200">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-100"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            <Minus size={14} />
                          </button>

                          <span className="flex h-8 min-w-8 items-center justify-center border-x border-slate-200 px-2 text-sm font-semibold text-slate-900">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-8 w-8 items-center justify-center text-slate-600 transition hover:bg-slate-100"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 text-xs font-medium text-red-600 transition hover:text-red-700"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}

        {items.length > 0 && (
          <div className="shrink-0 border-t border-slate-200 bg-white p-5">
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-5 py-4 font-semibold text-white transition hover:bg-red-800"
            >
              Continue to Request Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}