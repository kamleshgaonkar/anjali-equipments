import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-16">

        {/* LEFT */}

        <div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-red-700 sm:text-sm">
            Trusted Commercial Kitchen Manufacturer
          </p>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">

            Commercial Kitchen Equipment

            <span className="mt-2 block text-red-700">
              Built To Perform.
            </span>

          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 lg:mt-8 lg:text-lg lg:leading-8">

            Anjali Equipments manufactures premium stainless steel
            commercial kitchen equipment for hotels, restaurants,
            cloud kitchens, hospitals, canteens and industrial food
            facilities across India.

          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:mt-10">

            <Button>
              Explore Products
            </Button>

            <button className="rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-50">
              Contact Us
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative order-first lg:order-last">

          <Image
            src="/hero/kitchen.jpg"
            alt="Commercial Kitchen"
            width={700}
            height={700}
            priority
            className="h-auto w-full rounded-3xl object-cover shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}