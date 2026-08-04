"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="bg-white py-24 lg:py-22">
      <div className="container-custom">

        {/* Heading */}

        <div className="mb-20 max-w-4xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
            About Us
          </span>

          <h2 className="mt-5 section-title text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight text-slate-900">

            Engineering Commercial Kitchen
            
            Solutions Since 2010
          </h2>
        </div>

        {/* Content */}

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}

          <div className="relative h-[450px] overflow-hidden rounded-2xl">
            <Image
              src="/about/about-main.png"
              alt="Anjali Equipments"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Content */}

          <div>

            <p className="text-lg leading-9 text-slate-600">
              Since 2010, Anjali Equipments has been delivering premium
              commercial kitchen equipment and turnkey kitchen solutions
              across India. From concept planning and custom manufacturing
              to installation and after-sales support, we help hotels,
              restaurants, cafés, hospitals and institutional kitchens
              build efficient, hygienic and high-performance workspaces.

              <br />
              <br />

              Every product is manufactured using premium SS304 food-grade
              stainless steel, ensuring durability, precision engineering
              and long-lasting performance for demanding commercial
              environments.
            </p>

            <Link
              href="/about"
              className="mt-10 inline-flex items-center rounded-lg bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800"
            >
              Learn More
            </Link>

          </div>

        </div>

        {/* Stats 

        <div className="mt-20 grid gap-10 border-t border-slate-200 pt-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <h3 className="text-5xl font-semibold text-red-700">
              18+
            </h3>

            <p className="mt-3 text-lg text-slate-600">
              Years Experience
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-semibold text-red-700">
              8,000
            </h3>

            <p className="mt-3 text-lg text-slate-600">
              Sq. Ft. Manufacturing Facility
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-semibold text-red-700">
              500+
            </h3>

            <p className="mt-3 text-lg text-slate-600">
              Projects Completed
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-semibold text-red-700">
              40+
            </h3>

            <p className="mt-3 text-lg text-slate-600">
              Manufacturing & Support Team
            </p>
          </div>

        </div>*/}

      </div>
    </section>
  );
}