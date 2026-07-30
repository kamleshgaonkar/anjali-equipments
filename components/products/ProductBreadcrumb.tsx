import Link from "next/link";

interface ProductBreadcrumbProps {
  categoryName: string;
  categorySlug: string;
  productName: string;
}

export default function ProductBreadcrumb({
  categoryName,
  categorySlug,
  productName,
}: ProductBreadcrumbProps) {
  return (
    <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      <Link
        href="/"
        className="transition hover:text-red-700"
      >
        Home
      </Link>

      <span>/</span>

      <Link
        href="/products"
        className="transition hover:text-red-700"
      >
        Products
      </Link>

      <span>/</span>

      <Link
        href={`/products/${categorySlug}`}
        className="transition hover:text-red-700"
      >
        {categoryName}
      </Link>

      <span>/</span>

      <span className="font-medium text-slate-900">
        {productName}
      </span>
    </nav>
  );
}