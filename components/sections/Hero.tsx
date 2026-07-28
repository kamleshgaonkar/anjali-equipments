import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-16 px-6 py-16 lg:grid-cols-2">

        {/* LEFT */}

        <div>

          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-red-700">
            Trusted Commercial Kitchen Manufacturer
          </p>

          <h1 className="text-6xl font-extrabold leading-tight text-slate-900">

            Commercial Kitchen Equipment

            <span className="block text-red-700">
            Built To Perform.
            </span>

            

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">

            Anjali Equipments manufactures premium stainless steel
            commercial kitchen equipment for hotels, restaurants,
            cloud kitchens, hospitals, canteens and industrial food
            facilities across India.

          </p>

          <div className="mt-10 flex gap-4">

            <Button>
              Explore Products
            </Button>

            <button className="rounded-xl border border-slate-300 px-8 py-4 font-semibold hover:bg-slate-50">
              Contact Us
            </button>

          </div>

        </div>

        {/* RIGHT */}

        <div className="relative">

          <Image
            src="/hero/kitchen.jpg"
            alt="Commercial Kitchen"
            width={700}
            height={700}
            className="rounded-3xl object-cover shadow-2xl"
            priority
          />

        </div>

      </div>
    </section>
  );
}