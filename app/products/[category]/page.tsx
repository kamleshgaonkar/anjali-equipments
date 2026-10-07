import { notFound } from "next/navigation";

import {
  buildCategorySubcategories,
  getCatalogCategory,
} from "@/lib/catalogue";
import PageHero from "@/components/layout/PageHero";
import {
  HeaderOffsetSpacer,
  StickyBreadcrumbBar,
} from "@/components/layout/StickyBreadcrumbBar";
import CategoryProductCatalogue from "@/components/products/CategoryProductCatalogue";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const currentCategory = await getCatalogCategory(category);

  if (!currentCategory) {
    return {
      title: "Category Not Found | Anjali Equipments",
    };
  }

  return {
    title: `${currentCategory.title} | Anjali Equipments`,
    description: currentCategory.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const currentCategory = await getCatalogCategory(category);

  if (!currentCategory) {
    notFound();
  }

  const subcategories = await buildCategorySubcategories(currentCategory.slug);

  return (
    <>
      <HeaderOffsetSpacer />
      <StickyBreadcrumbBar />

      <main className="bg-white">
        <PageHero
          variant="category"
          eyebrow="Products"
          title={currentCategory.title}
          description={currentCategory.description || undefined}
          background={currentCategory.heroImage || undefined}
        />

        <section className="py-10 md:py-12">
          <div className="container-custom">
            <CategoryProductCatalogue
              categorySlug={currentCategory.slug}
              categoryTitle={currentCategory.title}
              categoryDescription={currentCategory.description}
              subcategories={subcategories}
              activeSlug="all"
            />
          </div>
        </section>
      </main>
    </>
  );
}
