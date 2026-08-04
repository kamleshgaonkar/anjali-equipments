"use client";

import { Check } from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";
import Counter from "@/components/ui/Counter";

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
    number: <Counter end={18} suffix="+" />,
    label: "Years Experience",
  },
  {
    number: <Counter end={500} suffix="+" />,
    label: "Projects Completed",
  },
  {
    number: <Counter end={8000} />,
    label: "Sq. Ft. Manufacturing Facility",
  },
  {
    number: <Counter end={40} suffix="+" />,
    label: "Manufacturing & Support Team",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white py-28">
      <div className="container-custom">

        {/* Heading */}

        <div className="mb-20 max-w-4xl">

          <p className="eyebrow text-red-600">
            Why Choose Us
          </p>

          <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:text-6xl lg:leading-[0.95]">
            Precision Engineering.{" "}
            Trusted Manufacturing.
          </h2>

          <p className="mt-6 text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8">
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

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-12 sm:gap-y-10">

              {stats.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-slate-200 pb-6 sm:pb-8"
                >
                  <h3 className="text-3xl font-semibold text-red-600 sm:text-4xl lg:text-5xl">
                    {item.number}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 sm:mt-3 sm:text-base">
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