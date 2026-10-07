import Link from "next/link";
import type { ProjectScopeItem } from "@/types/admin-catalogue";

function isInternalHref(href: string | null): href is string {
  return Boolean(href && href.startsWith("/") && !href.startsWith("//"));
}

export default function ProjectScopeList({
  items,
}: {
  items: ProjectScopeItem[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="container-custom py-16 md:py-20">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          Project Scope
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const className =
              "rounded-xl border border-slate-200 bg-white px-5 py-4 font-medium text-slate-900";

            if (isInternalHref(item.href)) {
              return (
                <Link
                  key={`${item.label}-${index}`}
                  href={item.href}
                  className={`${className} cursor-pointer transition hover:border-[#8b191c] hover:text-[#8b191c]`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={`${item.label}-${index}`} className={className}>
                {item.label}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
