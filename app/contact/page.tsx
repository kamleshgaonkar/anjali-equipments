"use client";

import { MapPin, Building2, Factory } from "lucide-react";
import { FormEvent, useState } from "react";
import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<
    "success" | "error" | ""
  >("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
  
    const form = event.currentTarget;
  
    setIsSubmitting(true);
    setStatus("");
    setStatusType("");
 
  
    const formData = new FormData(form);
  
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };
  
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to send your enquiry."
        );
      }
  
      // Reset the saved form reference
      form.reset();

      setStatus(
        "Thank you. Your enquiry has been sent successfully."
      );
      
      setStatusType("success");
  
    } catch (error) {
      console.error("Contact form error:", error);
  
      setStatus(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      
      setStatusType("error");
  
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      <main className="container-custom py-16 pb-32 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">

          {/* Contact Information */}
          <div>
          
          <h2 className="mb-8 text-3xl font-bold text-slate-900">
              Contact Information
            </h2>
          

            <div className="space-y-8">

              {/* Head Office */}
              
<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">

<div className="flex items-center gap-3">
  <Building2 className="text-red-600" />

  <h3 className="text-xl font-semibold">
    Head Office
  </h3>
</div>

<p className="mt-4 leading-7 text-slate-600">
  Plot - B, A Wing, 201, Govardhan Complex
  <br />
  Caves Road, Jogeshwari East,
  <br />
  Mumbai, Maharashtra, India - 400 060.
</p>

<a
  href="https://maps.app.goo.gl/Ghq65n7QhpWiURrC6"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-3 inline-flex items-center gap-2 font-medium text-red-600 transition hover:gap-3"
>
  Open in Google Maps
  <span>→</span>
</a>

</div>
              

              {/* Factory */}
              
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">

                <div className="flex items-center gap-3">
                  <Factory className="text-red-600" />

                  <h3 className="text-xl font-semibold">
                    Factory
                  </h3>
                </div>

                <p className="mt-4 leading-7 text-slate-600">
                  Gala No. 01, Umar Compound
                  <br />
                  Nalasopara Phata,
                  <br />
                  Mumbai, Maharashtra, India - 401 208.
                </p>

                <a
                  href="https://maps.app.goo.gl/Shk21zE75QD7NEN97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-medium text-red-600 transition hover:gap-3"
                >
                  Open in Google Maps
                  <span>→</span>
                </a>
              </div>
              

              {/* Registered Office */}
              
              <div className="rounded-2xl border border-dashed border-slate-300 p-6">

                <h3 className="text-xl font-semibold">
                  Registered Office
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  01, Dashrath Singh Estate,
                  <br />
                  Caves Road, Jogeshwari East,
                  <br />
                  Mumbai, Maharashtra, India - 400 060.
                </p>

                <p className="mt-4 text-sm text-slate-500">
                  Registered office for legal correspondence only.
                </p>

              </div>
              

            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:pt-12">

            <div className="w-full">
              
              <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
                Let's build your commercial kitchen together.
              </h2>
              

              
              <form
                onSubmit={handleSubmit}
                className="w-full space-y-5"
              >

                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Name"
                  className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="Phone"
                  className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

<textarea
  name="message"
  rows={7}
  placeholder="Tell us about your requirements..."
  className="w-full resize-y rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
/>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-red-700 px-8 py-4 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry →"}
                </button>

                {status && (
  <div
    className={`rounded-xl border p-4 text-sm font-medium ${
      statusType === "success"
        ? "border-green-200 bg-green-50 text-green-700"
        : "border-red-200 bg-red-50 text-red-700"
    }`}
  >
    {status}
  </div>
)}

              </form>
              
            </div>

          </div>

        </div>

        {/* Locations */}
        <section className="mt-24">

          <div className="text-center">
            
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-700">
              FIND US
            </p>
            

            
            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              Our Locations
            </h2>
            

            
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Visit our Head Office or Factory. Select a location
              below to view it on the map.
            </p>
            
          </div>

          {/* Map Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">

            <button
              type="button"
              onClick={() => setSelectedMap("headOffice")}
              className={`rounded-xl px-6 py-3 font-medium transition ${
                selectedMap === "headOffice"
                  ? "bg-red-600 text-white shadow-md"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-red-300"
              }`}
            >
              🏢 Head Office
            </button>

            <button
              type="button"
              onClick={() => setSelectedMap("factory")}
              className={`rounded-xl px-6 py-3 font-medium transition ${
                selectedMap === "factory"
                  ? "bg-red-600 text-white shadow-md"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-red-300"
              }`}
            >
              🏭 Factory
            </button>

          </div>

          {/* Map */}
          
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm">

            <div className="relative aspect-[16/9] w-full">
              <iframe
                src={maps[selectedMap]}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title={
                  selectedMap === "headOffice"
                    ? "Anjali Equipments Head Office"
                    : "Anjali Equipments Factory"
                }
                className="absolute inset-0 h-full w-full"
              />
            </div>

          </div>
          
        </section>
      </main>
    </>
  );
}