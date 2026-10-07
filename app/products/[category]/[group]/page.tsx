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
    group: string;
  }>;
};

export async function generateMetadata({ params }: Props) {
  const { category, group } = await params;
  const currentCategory = await getCatalogCategory(category);

  if (!currentCategory) {
    return {
      title: "Group Not Found | Anjali Equipments",
    };
  }

  const selectedGroup = currentCategory.groups.find(
    (item) => item.slug === group
  );

  if (!selectedGroup) {
    return {
      title: "Group Not Found | Anjali Equipments",
    };
  }

  return {
    title: `${selectedGroup.title} | ${currentCategory.title} | Anjali Equipments`,
    description: selectedGroup.description || currentCategory.description,
  };
}

export default async function GroupPage({ params }: Props) {
  const { category, group } = await params;

  const currentCategory = await getCatalogCategory(category);

  if (!currentCategory) {
    notFound();
  }

  const subcategories = await buildCategorySubcategories(currentCategory.slug);
  const selectedGroup = subcategories.find((item) => item.slug === group);

  if (!selectedGroup) {
    notFound();
  }

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
              activeSlug={selectedGroup.slug}
            />
          </div>
        </section>
      </main>
    </>
  );
}
