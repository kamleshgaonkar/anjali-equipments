import Link from "next/link";
import {
  Hotel,
  UtensilsCrossed,
  Building2,
  School,
  Coffee,
  ArrowRight,
} from "lucide-react";

const industries = [
  {
    title: "Hotels",
    description:
      "Complete commercial kitchen solutions for luxury hotels and hospitality businesses.",
    icon: Hotel,
  },
  {
    title: "Restaurants",
    description:
      "Durable stainless steel equipment designed for busy restaurant kitchens.",
    icon: UtensilsCrossed,
  },
  {
    title: "Cloud Kitchens",
    description:
      "Space-efficient equipment optimized for high-volume food delivery operations.",
    icon: Building2,
  },
  {
    title: "Hospitals",
    description:
      "Hygienic kitchen equipment that meets institutional food service standards.",
    icon: Building2,
  },
  {
    title: "Institutions",
    description:
      "Reliable equipment for schools, colleges, hostels and industrial canteens.",
    icon: School,
  },
  {
    title: "Cafés & Bakeries",
    description:
      "Modern preparation and display equipment for cafés and bakery businesses.",
    icon: Coffee,
  },
];

export default function Industries() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Industries We Serve
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">
            Kitchen Solutions Built for Every Industry
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            From hotels and restaurants to hospitals and institutions, we
            manufacture commercial kitchen equipment tailored to every business.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 transition group-hover:bg-red-600">
                  <Icon
                    size={30}
                    className="text-red-600 transition group-hover:text-white"
                  />
                </div>

                <h3 className="mt-8 text-2xl font-semibold text-slate-900">
                  {industry.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {industry.description}
                </p>

                <Link
                  href="/industries"
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 transition hover:gap-3"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}