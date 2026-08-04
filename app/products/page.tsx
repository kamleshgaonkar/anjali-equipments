import CategoryCard from "@/components/products/CategoryCard";
import { getAllCategories } from "@/lib/products";
import CTA from "@/components/sections/CTA";
import PageHero from "@/components/layout/PageHero";
export default function ProductsPage() {
  const categories = getAllCategories();

  return (
    <section>
 {/* Hero */}
       
 <PageHero
  eyebrow="Products"
  title="Commercial Kitchen Equipment"
  description="Explore our complete range of commercial kitchen equipment
          designed for hotels, restaurants, cloud kitchens, hospitals
          and institutions."
  background="/hero/hero.jpg"
/>
    
    <main className="mx-auto max-w-7xl px-6 py-20">
     

      <section className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            {...category}
          />
        ))}
      </section>
      
    </main>
    <CTA />
    </section>
  );
}