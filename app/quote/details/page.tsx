"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QuoteProgress from "@/components/quote/QuoteProgress";
import { useQuote } from "@/hooks/useQuote";
import PageHero from "@/components/layout/PageHero";
export default function QuoteDetailsPage() {
  const router = useRouter();
  const { items, clearQuote } = useQuote();

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
      contactPerson: String(formData.get("contactPerson") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      requirements: String(formData.get("requirements") || "").trim(),

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
          result.message || "Unable to submit your quotation request."
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

    <>
      <PageHero
       title="Quote Request"
        background="/hero/products.jpg"
      />

    <main className="container-custom py-16">
  <div className="mx-auto max-w-4xl">

    <QuoteProgress currentStep={2} />

    {/* Intro */}
    <div className="mb-12">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
        Commercial Kitchen Equipment
      </p>

      <h1 className="mt-3 text-4xl font-bold text-slate-900">
        Your Details
      </h1>

      <p className="mt-4 text-lg leading-8 text-slate-600">
        Enter your contact details and our team will get in touch with you regarding your quotation.
      </p>
    </div>

    {/* Error */}
    {error && (
      <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
        {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-10">

      {/* Contact Information */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8">

        <h2 className="text-2xl font-bold text-slate-900">
          Contact Information
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>
            <label
              htmlFor="contactPerson"
              className="mb-2 block font-medium"
            >
              Contact Person *
            </label>

            <input
              id="contactPerson"
              name="contactPerson"
              type="text"
              required
              autoComplete="name"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium"
            >
              Email Address *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="phone"
              className="mb-2 block font-medium"
            >
              Mobile Number *
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
            />
          </div>

        </div>
      </section>

{/* Additional Requirements */}
<section className="rounded-2xl border border-slate-200 bg-white p-6">
  <div className="flex items-center justify-between gap-4">
    <div>
      <h2 className="text-lg font-bold text-slate-900">
        Additional Requirements
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Optional
      </p>
    </div>

    <span className="hidden text-sm text-slate-400 sm:block">
      Custom size, delivery, installation, etc.
    </span>
  </div>

  <textarea
    id="requirements"
    name="requirements"
    rows={2}
    placeholder="Anything else you'd like us to know?"
    className="mt-4 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
  />
</section>

      {/* Buttons */}
      <div className="flex flex-col-reverse items-stretch justify-between gap-4 sm:flex-row sm:items-center">

        <Link
          href="/quote"
          className="rounded-xl border border-red-700 px-8 py-4 text-center font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"
        >
          ← Back
        </Link>

        <button
          type="submit"
          disabled={isSubmitting || items.length === 0}
          className="rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Sending Request..."
            : "Send Quote Request →"}
        </button>

      </div>

    </form>

  </div>
</main>
</>
  );
}