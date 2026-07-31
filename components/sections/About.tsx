import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-custom">
        {/* Heading */}
        <div className="max-w-4xl">
          <p className="eyebrow mb-6 text-red-700">
            About Us
          </p>

          <h2 className="section-title max-w-4xl text-slate-900 lg:text-6xl lg:leading-[1.1]">
            Engineering Commercial Kitchen Solutions
            <br />
            Built To Perform Since 2010
          </h2>
        </div>

        {/* Content */}
        <div className="mt-20 grid gap-20 lg:grid-cols-2 lg:items-start">
          {/* Left Images */}
          <div className="relative">
            <div className="flex items-end gap-4">
              <div className="relative h-[520px] w-[420px] overflow-hidden rounded-2xl">
                <Image
                  src="/about/about-main.png"
                  alt="About Anjali Equipments"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative mb-8 h-[220px] w-[220px] overflow-hidden rounded-2xl">
                <Image
                  src="/about/about-secondary.png"
                  alt="Commercial Kitchen"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex h-full flex-col justify-between">
            <div>
              <p className="body-lg leading-9 text-slate-600">
                Since 2010, Anjali Equipments has been designing,
                manufacturing and installing premium SS304 commercial
                kitchen equipment for hotels, restaurants, cafés,
                hospitals and institutional kitchens across India.
                <br />
                <br />
                With over 18 years of industry expertise and an
                8,000 sq. ft. manufacturing facility, we deliver
                complete turnkey commercial kitchen solutions built
                for performance, hygiene and durability. From
                fabrication and installation to after-sales support,
                every solution is engineered to the highest standards
                of quality and reliability.
              </p>

              <Link
                href="/about"
                className="mt-12 inline-flex items-center gap-4 rounded-full border border-slate-900 px-8 py-4 text-lg font-medium transition hover:bg-slate-900 hover:text-white"
              >
                More About Us

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-20 grid grid-cols-2 gap-x-12 gap-y-10">
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-5xl font-bold text-slate-900">
                  18+
                </h3>

                <p className="mt-3 text-lg text-slate-600">
                  Years Experience
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-5xl font-bold text-slate-900">
                  500+
                </h3>

                <p className="mt-3 text-lg text-slate-600">
                  Projects Completed
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-5xl font-bold text-slate-900">
                  8,000
                </h3>

                <p className="mt-3 text-lg text-slate-600">
                  Sq. Ft. Manufacturing Facility
                </p>
              </div>

              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-5xl font-bold text-slate-900">
                  40+
                </h3>

                <p className="mt-3 text-lg text-slate-600">
                  Manufacturing & Support Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}