import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
            COMPLETE COMMERCIAL KITCHEN SOLUTIONS
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900 lg:text-5xl">
            Planning a Commercial Kitchen Project?
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Looking for more than just one product? Our experts help you design,
            manufacture and install complete commercial kitchen solutions for
            hotels, restaurants, cloud kitchens, hospitals, educational
            institutions and industrial canteens.
          </p>

          <p className="mt-6 text-xl font-medium text-slate-800">
            Need expert guidance? Speak with our kitchen specialists today.
          </p>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
          >
            Request Quote
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border-2 border-red-700 px-8 py-4 font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"
          >
            Discuss Your Project
          </Link>

        </div>

        {/* Trust Badges */}

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">

            <div className="text-5xl">🏭</div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Custom Manufacturing
            </h3>

            <p className="mt-2 text-slate-600 leading-7">
              Equipment built to your exact dimensions and kitchen layout.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">

            <div className="text-5xl">🚚</div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              PAN India Delivery
            </h3>

            <p className="mt-2 text-slate-600 leading-7">
              Safe and reliable delivery for commercial kitchen projects.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">

            <div className="text-5xl">🛠️</div>

            <h3 className="mt-4 text-xl font-semibold text-slate-900">
              Installation Support
            </h3>

            <p className="mt-2 text-slate-600 leading-7">
              Professional installation and after-sales service support.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}