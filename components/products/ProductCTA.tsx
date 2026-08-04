import Link from "next/link";

export default function ProductCTA() {
  return (
    <section className="mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-5xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700 sm:text-sm sm:tracking-[0.3em]">
          COMPLETE COMMERCIAL KITCHEN SOLUTIONS
        </p>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Planning a Commercial Kitchen Project?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
          Looking for more than just one product? Our experts help you
          design, manufacture and install complete commercial kitchen
          solutions for hotels, restaurants, cloud kitchens, hospitals,
          educational institutions and industrial canteens.
        </p>

        <p className="mt-5 text-base font-medium text-slate-700">
          Need expert guidance? Speak with our kitchen specialists today.
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          <Link
            href="/contact"
            className="flex h-14 w-full max-w-72 items-center justify-center rounded-xl bg-red-700 font-semibold text-white transition hover:bg-red-800 sm:w-72"
          >
            Request Quote
          </Link>

          <Link
            href="/contact?service=complete-kitchen"
            className="flex h-14 w-full max-w-72 items-center justify-center rounded-xl border-2 border-red-700 bg-white px-4 text-center font-semibold text-red-700 transition hover:bg-red-700 hover:text-white sm:w-72"
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