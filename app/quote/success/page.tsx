import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function QuoteSuccessPage() {
  return (
    <main className="container-custom flex min-h-[70vh] items-center justify-center py-20">

      <div className="mx-auto max-w-2xl text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-700">
          <CheckCircle2 size={42} />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
          Request Received
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">
          Thank You
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600">
          Your quotation request has been submitted successfully.
          Our team will review your requirements and contact you shortly.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/products"
            className="rounded-xl border border-red-700 px-8 py-4 font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"
          >
            Browse Products
          </Link>

          <Link
            href="/"
            className="rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </main>
  );
}