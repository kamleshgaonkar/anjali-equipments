import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const projects = [
  {
    name: "Luxury Hotel Kitchen",
    location: "Mumbai",
    image: "/projects/hotel-kitchen.jpg",
    description:
      "Complete commercial kitchen setup including cooking, preparation and refrigeration equipment.",
  },
  {
    name: "Cloud Kitchen",
    location: "Pune",
    image: "/projects/cloud-kitchen.jpg",
    description:
      "Custom stainless steel kitchen designed for high-volume food delivery operations.",
  },
  {
    name: "Hospital Kitchen",
    location: "Goa",
    image: "/projects/hospital-kitchen.jpg",
    description:
      "Hygienic institutional kitchen with food preparation, storage and serving equipment.",
  },
];

export default function Projects() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
            Recent Projects
          </span>

          <h2 className="mt-5 text-5xl font-bold leading-tight text-slate-900">
            Commercial Kitchens We&apos;ve Delivered
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Every project is built around quality, efficiency and long-term
            performance for demanding commercial environments.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-7">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} />
                  {project.location}
                </div>

                <h3 className="mt-3 text-2xl font-semibold text-slate-900">
                  {project.name}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {project.description}
                </p>

                <Link
                  href="/projects"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-red-600 transition group-hover:gap-3"
                >
                  View Project
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}

        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
          >
            View All Projects
            <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}