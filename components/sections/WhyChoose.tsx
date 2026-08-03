"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";

const manufacturing = [
  "Premium SS304 Stainless Steel",
  "CNC Laser Cutting",
  "Hydraulic Press Brake Bending",
  "Precision TIG & MIG Welding",
  "Strict Quality Inspection",
];

const solutions = [
  "Custom Commercial Kitchen Design",
  "In-house Manufacturing",
  "Pan India Installation",
  "Project Execution & Commissioning",
  "After Sales Support & AMC",
];

const stats = [
  {
    number: "18+",
    label: "Years Experience",
  },
  {
    number: "500+",
    label: "Projects Completed",
  },
  {
    number: "8,000",
    label: "Sq. Ft. Manufacturing Facility",
  },
  {
    number: "40+",
    label: "Manufacturing & Support Team",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-28">
      <div className="container-custom">

        {/* Heading */}

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <p className="eyebrow text-red-600">
            Why Choose Us
          </p>

          <h2 className="mt-5 section-title text-5xl text-slate-900">
            Precision Engineering.
            <br />
            Trusted Manufacturing.
          </h2>

          <p className="body-lg mt-8 text-slate-600">
            From CNC laser cutting and hydraulic press brake bending
            to precision TIG welding and final installation,
            every commercial kitchen solution is manufactured
            in-house using premium SS304 stainless steel to
            deliver exceptional quality, durability and
            long-term performance.
          </p>

        </div>

        {/* Main Grid */}

        <div className="grid gap-20 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Left Image */}

          <div className="relative overflow-hidden rounded-2xl">

          <ImageSlider /> 

          </div>

          {/* Right Content */}

          <div>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-x-12 gap-y-10">

              {stats.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-slate-200 pb-8"
                >
                  <h3 className="text-5xl font-semibold text-slate-900">
                    {item.number}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    {item.label}
                  </p>
                </div>
              ))}

            </div>

            {/* Features */}

            <div className="mt-14 grid gap-12 lg:grid-cols-2">

              <div>

                <h4 className="mb-6 text-xl font-semibold text-slate-900">
                  Manufacturing Excellence
                </h4>

                <ul className="space-y-5">

                  {manufacturing.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <Check
                        size={18}
                        className="mt-1 text-red-600"
                      />

                      <span className="text-slate-700">
                        {item}
                      </span>
                    </li>
                  ))}

                </ul>

              </div>

              <div>

                <h4 className="mb-6 text-xl font-semibold text-slate-900">
                  End-to-End Solutions
                </h4>

                <ul className="space-y-5">

                  {solutions.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <Check
                        size={18}
                        className="mt-1 text-red-600"
                      />

                      <span className="text-slate-700">
                        {item}
                      </span>
                    </li>
                  ))}

                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}