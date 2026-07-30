import Link from "next/link";

export default function ProductCTA() {
  return (
    <section className="mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-5xl px-8 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
          COMPLETE COMMERCIAL KITCHEN SOLUTIONS
        </p>

        <h2 className="mt-4 text-4xl font-bold text-slate-900">
          Planning a Commercial Kitchen Project?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Looking for more than just one product? Our experts help you
          design, manufacture and install complete commercial kitchen
          solutions for hotels, restaurants, cloud kitchens, hospitals,
          educational institutions and industrial canteens.
        </p>

        <p className="mt-5 text-base font-medium text-slate-700">
          Need expert guidance? Speak with our kitchen specialists today.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link
            href="/contact"
            className="flex h-14 w-72 items-center justify-center rounded-xl bg-red-700 font-semibold text-white transition hover:bg-red-800"
          >
            Request Quote
          </Link>

          <Link
            href="/contact?service=complete-kitchen"
            className="flex h-14 w-72 items-center justify-center rounded-xl border-2 border-red-700 bg-white font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"
          >
            Get Complete Kitchen Proposal
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-4xl">🏭</div>

            <h3 className="mt-4 font-semibold">
              Custom Manufacturing
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Equipment built to your exact dimensions and kitchen layout.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-4xl">🚚</div>

            <h3 className="mt-4 font-semibold">
              PAN India Delivery
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Safe and reliable delivery for commercial kitchen projects.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-4xl">🛠</div>

            <h3 className="mt-4 font-semibold">
              Installation Support
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Professional installation and after-sales service support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}