"use client";

import Link from "next/link";
import { Check } from "lucide-react";

interface QuoteProgressProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: "Products" },
  { number: 2, label: "Your Details" },
  { number: 3, label: "Submitted" },
];

export default function QuoteProgress({
  currentStep,
}: QuoteProgressProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          const completed = currentStep > step.number;
          const active = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex flex-1 items-center last:flex-none"
            >
              <div className="flex min-w-0 flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all ${
                    completed
                      ? "border-red-700 bg-red-700 text-white"
                      : active
                        ? "border-red-700 bg-white text-red-700"
                        : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {completed ? (
                    <Check size={17} strokeWidth={2.5} />
                  ) : (
                    step.number
                  )}
                </div>

                <span
                  className={`mt-2 whitespace-nowrap text-xs font-semibold sm:text-sm ${
                    active || completed
                      ? "text-red-700"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 mb-6 h-0.5 flex-1 transition-colors sm:mx-4 ${
                    currentStep > step.number
                      ? "bg-red-700"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}