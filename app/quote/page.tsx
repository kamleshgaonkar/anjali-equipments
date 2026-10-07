"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";

import { useQuote } from "@/hooks/useQuote";

export default function QuotePage() {
  const router = useRouter();

  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearQuote,
  } = useQuote();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (items.length === 0) {
      setError(
        "Your quotation is empty. Please add at least one product before submitting."
      );
      return;
    }

    const formData = new FormData(event.currentTarget);

    const payload = {
      contactPerson: String(
        formData.get("contactPerson") || ""
      ).trim(),

      email: String(
        formData.get("email") || ""
      ).trim(),

      phone: String(
        formData.get("phone") || ""
      ).trim(),

      requirements: String(
        formData.get("requirements") || ""
      ).trim(),

      products: items.map((item) => ({
        id: item.id,
        name: item.name,
        model: item.model,
        quantity: item.quantity,
      })),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to submit your quotation request."
        );
      }

      clearQuote();

      router.push("/quote/success");
    } catch (error) {
      console.error("Quote submission error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );

      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container-custom px-5 pb-10 pt-28 md:px-8 lg:pb-14 lg:pt-32">      

        {/* ================================================== */}
        {/* PAGE HEADING */}
        {/* ================================================== */}

        <div className="mb-10"> 
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
            Commercial Kitchen Equipment
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Your Quote Request
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Review your selected equipment and share your details.
            Our team will get in touch with you regarding your quotation.
          </p>
        </div>

        {/* ================================================== */}
        {/* EMPTY QUOTE */}
        {/* ================================================== */}

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
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-6 py-3 font-semibold text-white transition hover:bg-red-800"
            >
              Browse Products
              <ArrowRight size={17} />
            </Link>

          </div>
        ) : (

          /* ================================================== */
          /* TWO COLUMN QUOTE LAYOUT */
          /* ================================================== */

          <div className="grid items-start gap-8 lg:grid-cols-2 xl:gap-12">

            {/* ================================================== */}
            {/* LEFT: SELECTED PRODUCTS */}
            {/* ================================================== */}

            <section>

              <div className="mb-5 flex items-center justify-between">

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

                          {/* Quantity */}

                          <div className="flex items-center rounded-lg border border-slate-200 bg-white">

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

                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-2 text-sm font-semibold text-slate-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                              className="flex h-9 w-9 items-center justify-center text-slate-600 transition hover:bg-slate-50"
                              aria-label={`Increase quantity of ${item.name}`}
                            >
                              <Plus size={16} />
                            </button>

                          </div>

                          {/* Remove */}

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
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

              {/* Add More Products */}

              <Link
                href="/products"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-800"
              >
                + Add More Products
              </Link>

            </section>

            {/* ================================================== */}
            {/* RIGHT: DETAILS FORM */}
            {/* ================================================== */}

            <aside className="lg:sticky lg:top-28 lg:self-start">

              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm md:p-7"
              >

                {/* Form Heading */}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-700">
                    Request Quotation
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    Your Details
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your contact details and our team will
                    get in touch with you.
                  </p>
                </div>

                {/* Error */}

                {error && (
                  <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Contact Fields */}

                <div className="mt-7 space-y-5">

                  {/* Contact Person */}

                  <div>
                    <label
                      htmlFor="contactPerson"
                      className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                      Contact Person *
                    </label>

                    <input
                      id="contactPerson"
                      name="contactPerson"
                      type="text"
                      required
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                      Email Address *
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                  {/* Mobile */}

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-900"
                    >
                      Mobile Number *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                    />
                  </div>

                </div>

                {/* Divider */}

                <div className="my-7 border-t border-slate-200" />

                {/* Additional Requirements */}

                <div>

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <label
                        htmlFor="requirements"
                        className="block text-base font-bold text-slate-900"
                      >
                        Additional Requirements
                      </label>

                      <p className="mt-1 text-xs text-slate-400">
                        Optional
                      </p>
                    </div>

                    <span className="hidden max-w-[180px] text-right text-xs leading-5 text-slate-400 xl:block">
                      Custom size, delivery, installation, etc.
                    </span>

                  </div>

                  <textarea
                    id="requirements"
                    name="requirements"
                    rows={3}
                    placeholder="Anything else you'd like us to know?"
                    className="mt-4 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                  />

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    items.length === 0
                  }
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Sending Request..."
                    : "Request Quotation"}

                  {!isSubmitting && (
                    <ArrowRight size={18} />
                  )}
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  Our team will review your selected equipment and
                  contact you regarding your quotation.
                </p>

              </form>

            </aside>

          </div>
        )}

      </div>
    </main>
  );
}