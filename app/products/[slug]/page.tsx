import { products } from "@/data/products";
import Link from "next/link";

type Props = {
    params: Promise<{
      slug: string;
    }>;
  };
  
  export default async function ProductCategoryPage({ params }: Props) {
    const { slug } = await params;
    const categoryProducts = products.filter(
        (product) => product.category === slug
      );

    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-5xl font-bold capitalize">
          {slug.replace(/-/g, " ")}
        </h1>
  
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  {categoryProducts.map((product) => (
    <Link
      href={`/products/${slug}/${product.slug}`}
      key={product.id}
      className="rounded-xl border p-6 shadow-sm transition hover:shadow-lg"
    >
      <div className="mb-4 h-52 rounded-lg bg-slate-200"></div>

      <h3 className="text-xl font-semibold">
        {product.name}
      </h3>

      <p className="mt-2 text-slate-600">
        View Details →
      </p>
    </Link>
  ))}
</div>
      </main>
    );
  }