"use client";

import {
  getAllCategories,
  getProductsByCategory,
} from "@/lib/products";


import { useState } from "react";

import ProductDrawer from "@/components/products/ProductDrawer";
import { Product } from "@/types/product";

import CTA from "@/components/sections/CTA";
import PageHero from "@/components/layout/PageHero";
import CategorySection from "@/components/products/CategorySection";

export default function ProductsPage() {
  const categories = getAllCategories();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const openProduct = (product: Product) => {
    setSelectedProduct(product);
  
    if (!drawerOpen) {
      setDrawerOpen(true);
    }
  };
  
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <>
      <PageHero 
        title="Products"
      />

      <main className="bg-white">

      {categories.map((category, index) => (
  <section
    key={category.slug}
    className={`${
      index % 2 === 0
        ? "bg-white"
        : "border-y border-slate-200/60 bg-slate-50"
    }`}
  >
    <CategorySection
      category={category}
      products={getProductsByCategory(category.slug)}
      onProductClick={openProduct}
    />
  </section>
))}

      </main>
      <ProductDrawer
  product={selectedProduct}
  open={drawerOpen}
  onClose={closeDrawer}
/>
      <CTA />

    </>
  );
}