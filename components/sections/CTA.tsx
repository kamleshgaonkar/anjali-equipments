import Link from "next/link";
import {
  ArrowRight,
  Factory,
  Truck,
  Wrench,
} from "lucide-react";

export default function CTA() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-24"
      style={{
        backgroundImage: "url('/images/cta-bg.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/95 via-[#000000]/75 to-[#171717]/90" />
      <div className="relative container-custom px-6">

        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

       
          <h2 className="mt-6 text-4xl font-bold leading-tight text-white lg:text-6xl">
          Engineering Commercial Kitchen Excellence.
          </h2>
 
        </div>

        {/* Buttons */}

        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition duration-300 hover:bg-red-700"
          >
            Request Quote
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition duration-300 hover:bg-white hover:text-slate-900"
          >
            View Our Projects
          </Link>

        </div>
        

        <div className="mt-20 grid gap-10 md:grid-cols-3">
          
            <div>
              <Factory
                size={30}
                strokeWidth={1.6}
                className="text-red-500"
              />

              <h3 className="mt-5 text-2xl font-semibold text-white">
                Custom Manufacturing
              </h3>

              <p className="mt-3 max-w-sm leading-5 text-white/70">
                Equipment manufactured to your exact kitchen layout using premium
                SS304 stainless steel.
              </p>
            </div>
          

          
            <div>
              <Truck
                size={30}
                strokeWidth={1.6}
                className="text-red-500"
              />

              <h3 className="mt-5 text-2xl font-semibold text-white">
                PAN India Delivery
              </h3>

              <p className="mt-3 max-w-sm leading-5 text-white/70">
                Reliable transportation, professional installation and timely
                project execution across India.
              </p>
            </div>
          

          
            <div>
              <Wrench
                size={30}
                strokeWidth={1.6}
                className="text-red-500"
              />

              <h3 className="mt-5 text-2xl font-semibold text-white">
                Installation & Support
              </h3>

              <p className="mt-3 max-w-sm leading-5 text-white/70">
                Expert installation, commissioning and dependable after-sales
                support for long-term performance.
              </p>
            </div>
          
        </div>
      </div>
    </section>
  );
}