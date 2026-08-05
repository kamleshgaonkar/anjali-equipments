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
  return products.filter(
    (product) => product.category === categorySlug
  );
}

export function getProduct(
  categorySlug: string,
  productSlug: string
) {
  return products.find(
    (product) =>
      product.category === categorySlug &&
      product.slug === productSlug
  );
}

export function getRelatedProducts(
  categorySlug: string,
  currentProductId: string
) {
  return products.filter(
    (product) =>
      product.category === categorySlug &&
      product.id !== currentProductId
  );
}
export function getGroupedProductsByCategory(categorySlug: string) {
  const categoryProducts = products.filter(
    (product) => product.category === categorySlug
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
      product.shortDescription.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
  );
}