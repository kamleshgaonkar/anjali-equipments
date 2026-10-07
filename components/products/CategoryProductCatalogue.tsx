import type { CatalogueSubcategory } from "@/lib/catalogue";
import CategoryGroupNav from "@/components/products/CategoryGroupNav";
import CatalogueProductGrid from "@/components/products/CatalogueProductGrid";

interface CategoryProductCatalogueProps {
  categorySlug: string;
  categoryTitle: string;
  categoryDescription?: string;
  subcategories: CatalogueSubcategory[];
  activeSlug: "all" | string;
}

export default function CategoryProductCatalogue({
  categorySlug,
  categoryTitle,
  categoryDescription,
  subcategories,
  activeSlug,
}: CategoryProductCatalogueProps) {
  const navGroups = subcategories.map((item) => ({
    title: item.title,
    slug: item.slug,
  }));

  const isAllView = activeSlug === "all";
  const selected = isAllView
    ? null
    : subcategories.find((item) => item.slug === activeSlug);

  if (!isAllView && !selected) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          Products Coming Soon
        </h2>
        <p className="mt-3 text-slate-600">
          We are currently updating this category.
        </p>
      </div>
    );
  }

  const groupsWithProducts = subcategories.filter(
    (group) => group.products.length > 0
  );

  return (
    <div className="space-y-10 md:space-y-12">
      <CategoryGroupNav
        categorySlug={categorySlug}
        groups={navGroups}
        activeSlug={activeSlug}
      />

      {isAllView ? (
        <div className="space-y-14 md:space-y-16">
          {groupsWithProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center">
              <p className="font-medium text-slate-900">Products Coming Soon</p>
              <p className="mt-2 text-sm text-slate-600">
                We are currently updating this category.
              </p>
            </div>
          ) : (
            groupsWithProducts.map((group) => (
              <section key={group.slug} className="space-y-6">
                <div className="max-w-3xl">
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                    {group.title}
                  </h3>
                  {group.description ? (
                    <p className="mt-2 text-sm leading-6 text-slate-600 md:text-base md:leading-7">
                      {group.description}
                    </p>
                  ) : null}
                </div>

                <CatalogueProductGrid
                  products={group.products}
                  categorySlug={categorySlug}
                  groupSlug={group.slug}
                />
              </section>
            ))
          )}
        </div>
      ) : (
        <section className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold uppercase tracking-tight text-slate-900 md:text-3xl">
              {selected!.title}
            </h2>
            {selected!.description ? (
              <p className="mt-3 text-base leading-7 text-slate-600">
                {selected!.description}
              </p>
            ) : null}
          </div>

          <CatalogueProductGrid
            products={selected!.products}
            categorySlug={categorySlug}
            groupSlug={selected!.slug}
            emptyTitle="Products Coming Soon"
            emptyDescription="We are currently updating this subcategory."
          />
        </section>
      )}
    </div>
  );
}
