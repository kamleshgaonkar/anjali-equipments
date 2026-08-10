import Image from "next/image";
import Link from "next/link";
import type { CatalogueSubcategory } from "@/lib/catalogue";

interface CategorySubcategoryLandingProps {
  categorySlug: string;
  categoryTitle: string;
  categoryDescription?: string;
  subcategories: CatalogueSubcategory[];
}

export default function CategorySubcategoryLanding({
  categorySlug,
  categoryTitle,
  categoryDescription,
  subcategories,
}: CategorySubcategoryLandingProps) {
  return (
    <div>
      <div className="max-w-3xl">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          {categoryTitle}
        </h2>

        {categoryDescription ? (
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {categoryDescription}
          </p>
        ) : (
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Explore our commercial {categoryTitle.toLowerCase()} equipment.
          </p>
        )}
      </div>

      {subcategories.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
          <h3 className="text-2xl font-semibold text-slate-900">
            Subcategories Coming Soon
          </h3>
          <p className="mt-3 text-slate-600">
            We are currently updating this category.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/products/${categorySlug}/${subcategory.slug}`}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b191c] focus-visible:ring-offset-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                {subcategory.image ? (
                  <Image
                    src={subcategory.image}
                    alt={`${subcategory.title} category`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-6 transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>

              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold text-slate-900 transition-colors group-hover:text-[#8b191c]">
                  {subcategory.title}
                </h3>

                {subcategory.description ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                    {subcategory.description}
                  </p>
                ) : null}

                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-[#8b191c] transition-all group-hover:gap-3">
                  Explore Products
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
