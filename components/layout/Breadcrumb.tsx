"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const labels: Record<string, string> = {
  about: "About Us",
  products: "Products",
  contact: "Contact",
  projects: "Projects",
  clients: "Clients",
  quote: "Quote",

  cooking: "Cooking",
  refrigeration: "Refrigeration",
  preparation: "Preparation",
  washing: "Washing",
  storage: "Storage",
  serving: "Serving",
  bakery: "Bakery",
  "bulk-cooking": "Bulk Cooking",
  exhaust: "Exhaust & Ventilation",
  "bar-equipment": "Bar Equipment",
  "food-preparation": "Food Preparation",
  "storage-handling": "Storage & Handling",
  "exhaust-ventilation": "Exhaust & Ventilation",
  "food-holding-serving": "Food Holding & Serving",
  bar: "Bar",
  other: "Other Equipment",

  "cooking-ranges": "Cooking Ranges",
  "chinese-cooking": "Chinese Cooking",
  "chapati-equipment": "Chapati Equipment",
  "griddles-grills": "Griddles & Grills",
  fryers: "Fryers",
  "steam-cooking": "Steam Cooking",
};

type BreadcrumbTone = "onDark" | "onLight";

interface BreadcrumbProps {
  tone?: BreadcrumbTone;
}

export default function Breadcrumb({ tone = "onDark" }: BreadcrumbProps) {
  const pathname = usePathname();

  const paths = pathname.split("/").filter(Boolean);

  const format = (text: string) =>
    text.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const isLight = tone === "onLight";

  return (
    <nav aria-label="Breadcrumb" className={isLight ? "" : "mt-3"}>
      <ol
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${
          isLight ? "text-[13px] leading-5" : "text-sm"
        }`}
      >
        <li>
          <Link
            href="/"
            className={
              isLight
                ? "text-slate-500 transition hover:text-[#8b191c]"
                : "text-white/70 transition hover:text-red-500"
            }
          >
            Home
          </Link>
        </li>

        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          const displayLabel = labels[path] ?? format(path);

          return (
            <li key={href} className="flex items-center gap-x-2">
              {isLight ? (
                <span className="text-slate-300" aria-hidden>
                  /
                </span>
              ) : (
                <ChevronRight
                  size={14}
                  className="text-white/30"
                  aria-hidden
                />
              )}

              {isLast ? (
                <span
                  className={
                    isLight
                      ? "font-semibold text-slate-900"
                      : "font-medium text-white"
                  }
                >
                  {displayLabel}
                </span>
              ) : (
                <Link
                  href={href}
                  className={
                    isLight
                      ? "text-slate-500 transition hover:text-[#8b191c]"
                      : "text-white/70 transition hover:text-red-500"
                  }
                >
                  {displayLabel}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
