"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const labels: Record<string, string> = {
    about: "About Us",
    products: "Products",
    contact: "Contact",
    projects: "Projects",
  
    cooking: "Cooking",
    refrigeration: "Refrigeration",
    "food-preparation": "Food Preparation",
    "storage-handling": "Storage & Handling",
    washing: "Washing",
    "exhaust-ventilation": "Exhaust & Ventilation",
    "food-holding-serving": "Food Holding & Serving",
    bakery: "Bakery",
    bar: "Bar",
    other: "Other Equipment",

    "cooking-ranges": "Cooking Ranges",
    "chinese-cooking": "Chinese Cooking",
    "chapati-equipment": "Chapati Equipment",
    "griddles-grills": "Griddles & Grills",
    fryers: "Fryers",
    "steam-cooking": "Steam Cooking",
  };

export default function Breadcrumb() {
  const pathname = usePathname();

  const paths = pathname
    .split("/")
    .filter(Boolean);

  const format = (text: string) =>
    text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <nav
      aria-label="Breadcrumb"
      className="mt-3"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm">

        <li>
          <Link
            href="/"
            className="text-white/70 transition hover:text-red-500"
          >
            Home
          </Link>
        </li>

        {paths.map((path, index) => {

const href = "/" + paths.slice(0, index + 1).join("/");

const isLast = index === paths.length - 1;

const displayLabel = labels[path] ?? format(path);

return (
  <li
    key={href}
    className="flex items-center"
  >

    <ChevronRight
      size={14}
      className="mx-2 text-white/30"
    />

    {isLast ? (

      <span className="font-medium text-white">
        {displayLabel}
      </span>

    ) : (

      <Link
        href={href}
        className="text-white/70 transition hover:text-red-500"
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