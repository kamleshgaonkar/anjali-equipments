import Link from "next/link";
import { Briefcase, FolderTree, Layers3, Package } from "lucide-react";

const cards = [
  {
    href: "/admin/products",
    title: "Products",
    description: "Manage the commercial kitchen equipment catalogue.",
    icon: Package,
  },
  {
    href: "/admin/categories",
    title: "Categories",
    description: "Organise top-level product categories for the website.",
    icon: FolderTree,
  },
  {
    href: "/admin/groups",
    title: "Product Groups",
    description: "Structure subcategory groups within each category.",
    icon: Layers3,
  },
  {
    href: "/admin/projects",
    title: "Projects",
    description: "Manage completed kitchen projects shown on the website.",
    icon: Briefcase,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Welcome to Anjali Admin
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
          Manage the product catalogue displayed on the Anjali Equipments
          website.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#8b191c]">
                <Icon size={20} />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-slate-900">
                {card.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
