import { notFound } from "next/navigation";

import {
  buildCategorySubcategories,
  getCatalogCategory,
} from "@/lib/catalogue";
import PageHero from "@/components/layout/PageHero";
import CategorySubcategoryLanding from "@/components/products/CategorySubcategoryLanding";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const currentCategory = getCatalogCategory(category);

  if (!currentCategory) {
    notFound();
  }

  const subcategories = buildCategorySubcategories(currentCategory);

  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Products"
        title={currentCategory.title}
        background={currentCategory.heroImage}
      />

      <section className="py-10 md:py-16">
        <div className="container-custom">
          <CategorySubcategoryLanding
            categorySlug={currentCategory.slug}
            categoryTitle={currentCategory.title}
            categoryDescription={currentCategory.description}
            subcategories={subcategories}
          />
        </div>
      </section>
    </main>
  );
}
