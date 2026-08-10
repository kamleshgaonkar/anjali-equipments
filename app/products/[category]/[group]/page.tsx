import { notFound } from "next/navigation";

import {
  buildCategorySubcategories,
  getCatalogCategory,
} from "@/lib/catalogue";
import PageHero from "@/components/layout/PageHero";
import CategoryProductCatalogue from "@/components/products/CategoryProductCatalogue";

type Props = {
  params: Promise<{
    category: string;
    group: string;
  }>;
};

export default async function GroupPage({ params }: Props) {
  const { category, group } = await params;

  const currentCategory = getCatalogCategory(category);

  if (!currentCategory) {
    notFound();
  }

  const subcategories = buildCategorySubcategories(currentCategory);
  const selectedGroup = subcategories.find((item) => item.slug === group);

  if (!selectedGroup) {
    notFound();
  }

  return (
    <main className="bg-white">
      <PageHero
        eyebrow={currentCategory.title}
        title={selectedGroup.title}
        background={currentCategory.heroImage}
      />

      <section className="py-10 md:py-12">
        <div className="container-custom">
          <CategoryProductCatalogue
            categorySlug={currentCategory.slug}
            categoryTitle={currentCategory.title}
            subcategories={subcategories}
            activeSlug={selectedGroup.slug}
          />
        </div>
      </section>
    </main>
  );
}
