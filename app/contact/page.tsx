"use client";

import PageHero from "@/components/layout/PageHero";
import { MapPin, Building2, Factory } from "lucide-react";
import { useState } from "react";


export default function ContactPage() {

  const maps = {
    headOffice:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85292.5723651285!2d72.85602947960426!3d19.1324233450965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7d23c2e18a3%3A0xb7033fb88fcf0f25!2sAnjali%20Equipments!5e0!3m2!1sen!2sin!4v1786024953002!5m2!1sen!2sin",
  
    factory:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.4252669816888!2d72.87527198583035!3d19.43722319373256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c873771d373b%3A0x3e3d13d35b07f3c2!2sAnjali%20Equipments!5e0!3m2!1sen!2sin!4v1786025153946!5m2!1sen!2sin",
  };
  const [selectedMap, setSelectedMap] = useState<
    "headOffice" | "factory"
  >("headOffice");

  return (
    <section>
      <PageHero
        title="Contact Us"
      />

      <main className="mx-auto max-w-7xl px-6 py-16 pb-32 sm:py-20">


        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>

            <h2 className="mb-8 text-3xl font-bold">
              Contact Information
            </h2>

            <div className="space-y-8">

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex items-center gap-3">

                  <Building2 className="text-red-600" />

                  <h3 className="text-xl font-semibold">
                    Head Office
                  </h3>

                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  Plot - B, A Wing, 201, Govardhan Complex<br />
                  Caves Road, Jogeshwari East,<br />
                  Mumbai, Maharashtra, India - 400 060.
                </p>

                <a
                  href="https://maps.app.goo.gl/Ghq65n7QhpWiURrC6"
                  target="_blank"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white"
                >
                  <MapPin size={18} />
                  Get Directions
                </a>

              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="flex items-center gap-3">

                  <Factory className="text-red-600" />

                  <h3 className="text-xl font-semibold">
                    Factory
                  </h3>

                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  Gala No. 01, Umar Compound<br />
                  Nalasopara Phata,<br />
                  Mumbai, Maharashtra, India - 401 208.
                </p>

                <a
                  href="https://maps.app.goo.gl/Shk21zE75QD7NEN97"
                  target="_blank"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white"
                >
                  <MapPin size={18} />
                  Get Directions
                </a>

              </div>

              <div className="rounded-2xl border border-dashed p-6">

                <h3 className="text-xl font-semibold">
                  Registered Office
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  01, Dashrath Singh Estate,<br />
                  Caves Road, Jogeshwari East,<br />
                  Mumbai, Maharashtra, India - 400 060.
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  Registered office for legal correspondence only.
                </p>

              </div>

            </div>

          </div>

          <form className="space-y-5 pr-14 sm:pr-0 mt-12">

            <h2 className="mb-6 text-2xl font-bold">
              Let's build your commercial kitchen together.
            </h2>
            <input
              className="w-full rounded-lg border p-4"
              placeholder="Name"
            />

            <input
              className="w-full rounded-lg border p-4"
              placeholder="Email"
            />

            <input
              className="w-full rounded-lg border p-4"
              placeholder="Phone"
            />

            <textarea
              rows={6}
              className="mb-4 w-full rounded-lg border p-4"
              placeholder="Message"
            />

            <button className="rounded-xl bg-red-700 px-8 py-4 text-white">
              Send Enquiry
            </button>
          </form>



        </div>


        <section className="mt-24">

  <div className="text-center">
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-red-600">
      Visit Us
    </p>

    <h2 className="mt-3 text-4xl font-bold text-slate-900">
      Our Locations
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
      Visit our Head Office or Factory. Select a location below to view it on the map.
    </p>
  </div>

  <div className="mt-10 flex justify-center gap-4">

    <button
      onClick={() => setSelectedMap("headOffice")}
      className={`rounded-xl px-6 py-3 font-medium transition ${
        selectedMap === "headOffice"
          ? "bg-red-600 text-white"
          : "border border-slate-300 bg-white"
      }`}
    >
      🏢 Head Office
    </button>

    <button
      onClick={() => setSelectedMap("factory")}
      className={`rounded-xl px-6 py-3 font-medium transition ${
        selectedMap === "factory"
          ? "bg-red-600 text-white"
          : "border border-slate-300 bg-white"
      }`}
    >
      🏭 Factory
    </button>

  </div>

  <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 shadow-xl">

  <iframe
  src={maps[selectedMap]}
  width="100%"
  height="550"
  loading="lazy"
  allowFullScreen
  referrerPolicy="strict-origin-when-cross-origin"
  className="border-0"
/>
  </div>

</section>
      </main></section>
  );
}
