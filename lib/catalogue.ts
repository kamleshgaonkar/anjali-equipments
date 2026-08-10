import { catalog, type ProductCategory } from "@/data/products/catalog";
import { getGroupedProductsByCategory } from "@/lib/products";
import type { Product } from "@/types/product";

export interface CatalogueSubcategory {
  title: string;
  slug: string;
  description: string;
  image: string;
  products: Product[];
}

export function toCatalogueSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCatalogCategory(categorySlug: string) {
  return catalog.find((item) => item.slug === categorySlug);
}

export function buildCategorySubcategories(
  category: ProductCategory
): CatalogueSubcategory[] {
  const groupedProducts = getGroupedProductsByCategory(category.slug);
  const groupEntries = Object.entries(groupedProducts);

  const subcategoriesByTitle = new Map<string, CatalogueSubcategory>(
    groupEntries.map(([groupTitle, products]) => {
      const catalogGroup = category.groups.find(
        (group) => group.title === groupTitle
      );

      return [
        groupTitle,
        {
          title: groupTitle,
          slug: catalogGroup?.slug ?? toCatalogueSlug(groupTitle),
          description: catalogGroup?.description ?? "",
          image:
            products.find((product) => Boolean(product.image))?.image ||
            catalogGroup?.image ||
            category.heroImage,
          products,
        },
      ];
    })
  );

  const orderedTitles = [
    ...category.groups
      .map((group) => group.title)
      .filter((title) => subcategoriesByTitle.has(title)),
    ...groupEntries
      .map(([title]) => title)
      .filter(
        (title) => !category.groups.some((group) => group.title === title)
      ),
  ];

  return orderedTitles
    .map((title) => subcategoriesByTitle.get(title))
    .filter((item): item is CatalogueSubcategory => Boolean(item));
}
