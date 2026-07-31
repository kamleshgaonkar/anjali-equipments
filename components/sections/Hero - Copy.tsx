import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white">
      {/* Background */}
      <div className="absolute right-0 top-0 h-[550px] w-[550px] rounded-full bg-red-100/40 blur-3xl" />

      {/* Hero */}
      <div className="container-custom relative py-16 lg:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* LEFT */}
          <div>
            <p className="eyebrow mb-4 text-red-700">
              Trusted Commercial Kitchen Manufacturer
            </p>

            <h1 className="hero-title text-slate-900">
              Commercial Kitchen Equipment
              <span className="mt-2 block text-red-700">
                Built To Perform.
              </span>
            </h1>

            <p className="body-lg mt-8 max-w-xl text-slate-600">
              From concept planning and manufacturing to installation and
              after-sales support, Anjali Equipments delivers premium SS304
              commercial kitchen solutions trusted by hotels, restaurants,
              hospitals and institutional kitchens across India.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-700" />
                <span>SS304 Food Grade Stainless Steel</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-700" />
                <span>Custom Kitchen Design & Fabrication</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-700" />
                <span>Manufacturing • Installation • Service</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button>Explore Products</Button>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-8 py-4 font-semibold transition hover:border-red-700 hover:text-red-700"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="absolute -bottom-5 -right-5 h-full w-full rounded-3xl bg-red-700/10" />

            <Image
              src="/hero/kitchen.jpg"
              alt="Commercial Kitchen"
              width={800}
              height={800}
              priority
              className="relative rounded-3xl shadow-2xl"
            />

            <div className="absolute -bottom-6 left-6 rounded-2xl bg-white p-6 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-3xl font-bold text-red-700">18+</p>
                  <p className="text-sm text-slate-500">Years Experience</p>
                </div>

                <div>
                  <p className="text-3xl font-bold text-red-700">500+</p>
                  <p className="text-sm text-slate-500">Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
}