import { products } from "@/data/products";
import { categories } from "@/data/categories";

export function getAllCategories() {
  return categories;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getAllProducts() {
  return products;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getProductsByCategory(categorySlug: string) {
  const category = categories.find(
    (c) => c.slug === categorySlug
  );

  if (!category) return [];

  return products.filter(
    (product) => product.category === category.name
  );
}

export function getProduct(
  categorySlug: string,
  productSlug: string
) {
  const category = categories.find(
    (c) => c.slug === categorySlug
  );

  if (!category) return undefined;

  return products.find(
    (product) =>
      product.category === category.name &&
      product.slug === productSlug
  );
}

export function getRelatedProducts(
  categorySlug: string,
  currentProductId: string
) {
  const category = categories.find(
    (c) => c.slug === categorySlug
  );

  if (!category) return [];

  return products.filter(
    (product) =>
      product.category === category.name &&
      product.id !== currentProductId
  );
}
export function getGroupedProductsByCategory(categorySlug: string) {
  const category = categories.find(
    (c) => c.slug === categorySlug
  );

  if (!category) return {};

  const categoryProducts = products.filter(
    (product) => product.category === category.name
  );

  return categoryProducts.reduce<
    Record<string, typeof categoryProducts>
  >((groups, product) => {
    const group = product.group ?? "Products";

    if (!groups[group]) {
      groups[group] = [];
    }

    groups[group].push(product);

    return groups;
  }, {});
}

export function searchProducts(search: string) {
  const query = search.toLowerCase().trim();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.shortDescription?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query)
  );
}