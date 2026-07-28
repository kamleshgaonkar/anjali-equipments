import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">

        <div className="max-w-4xl">

          <span className="inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            About Anjali Equipments
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
            Building Reliable Commercial Kitchen Solutions for Every Business
          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
            Anjali Equipments is a trusted manufacturer of premium stainless
            steel commercial kitchen equipment, delivering customized solutions
            for hotels, restaurants, hospitals, institutions, cloud kitchens,
            and industrial food facilities across India.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-flex items-center rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Explore Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-100"
            >
              Contact Us
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}