import Link from "next/link";

type NavGroup = {
  title: string;
  slug: string;
};

interface CategoryGroupNavProps {
  categorySlug: string;
  groups: NavGroup[];
  activeSlug: "all" | string;
}

export default function CategoryGroupNav({
  categorySlug,
  groups,
  activeSlug,
}: CategoryGroupNavProps) {
  const items: Array<{ label: string; href: string; slug: "all" | string }> = [
    {
      label: "All",
      href: `/products/${categorySlug}`,
      slug: "all",
    },
    ...groups.map((group) => ({
      label: group.title,
      href: `/products/${categorySlug}/${group.slug}`,
      slug: group.slug,
    })),
  ];

  return (
    <nav aria-label="Product groups" className="w-full">
      <div className="-mx-5 overflow-x-auto overscroll-x-contain px-5 [scrollbar-width:none] [-ms-overflow-style:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-center gap-2 md:w-full md:flex-wrap">
          {items.map((item) => {
            const isActive = item.slug === activeSlug;

            return (
              <Link
                key={item.slug}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex shrink-0 items-center rounded-lg border px-3.5 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-[#8b191c] bg-[#8b191c] text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:text-[#8b191c]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
