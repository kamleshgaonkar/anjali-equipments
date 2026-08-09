import { notFound } from "next/navigation";

import { catalog } from "@/data/products/catalog";
import { getGroupedProductsByCategory } from "@/lib/products";
import PageHero from "@/components/layout/PageHero";
import CategorySubcategoryCatalogue, {
  type CatalogueSubcategory,
} from "@/components/products/CategorySubcategoryCatalogue";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const currentCategory = catalog.find(
    (item) => item.slug === category
  );

  if (!currentCategory) {
    notFound();
  }

  const groupedProducts = getGroupedProductsByCategory(
    currentCategory.slug
  );

  const groupEntries = Object.entries(groupedProducts);

  const subcategoriesByTitle = new Map<string, CatalogueSubcategory>(
    groupEntries.map(([groupTitle, products]) => {
      const catalogGroup = currentCategory.groups.find(
        (group) => group.title === groupTitle
      );

      return [
        groupTitle,
        {
          title: groupTitle,
          slug: catalogGroup?.slug ?? toSlug(groupTitle),
          description: catalogGroup?.description ?? "",
          image:
            products.find((product) => Boolean(product.image))?.image ||
            catalogGroup?.image ||
            currentCategory.heroImage,
          products,
        },
      ];
    })
  );

  // Prefer catalog order, then any remaining groups from product data
  const orderedTitles = [
    ...currentCategory.groups
      .map((group) => group.title)
      .filter((title) => subcategoriesByTitle.has(title)),
    ...groupEntries
      .map(([title]) => title)
      .filter(
        (title) =>
          !currentCategory.groups.some((group) => group.title === title)
      ),
  ];

  const subcategories = orderedTitles
    .map((title) => subcategoriesByTitle.get(title))
    .filter((item): item is CatalogueSubcategory => Boolean(item));

  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Products"
        title={currentCategory.title}
        background={currentCategory.heroImage}
      />

      <section className="py-10 md:py-16">
        <div className="container-custom">
          <CategorySubcategoryCatalogue
            categorySlug={currentCategory.slug}
            subcategories={subcategories}
          />
        </div>
      </section>
    </main>
  );
}
