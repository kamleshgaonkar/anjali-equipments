import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductForm from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/admin/auth";
import type {
  AdminCategory,
  AdminProduct,
  AdminProductGroup,
} from "@/types/admin-catalogue";

type Props = {
  params: Promise<{ id: string }>;
};

function normalizeProduct(row: AdminProduct): AdminProduct {
  return {
    ...row,
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    features: Array.isArray(row.features) ? row.features : [],
    specifications: Array.isArray(row.specifications)
      ? row.specifications
      : [],
  };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [
    { data: product, error },
    { data: categoriesData },
    { data: groupsData },
  ] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("categories")
      .select("id, name, slug, is_active")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true }),
    supabase
      .from("product_groups")
      .select("id, name, slug, category_id, is_active")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true }),
  ]);

  if (error || !product) {
    notFound();
  }

  const categories = (categoriesData ?? []) as Pick<
    AdminCategory,
    "id" | "name" | "slug" | "is_active"
  >[];
  const groups = (groupsData ?? []) as Pick<
    AdminProductGroup,
    "id" | "name" | "slug" | "category_id" | "is_active"
  >[];

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="text-sm font-semibold text-slate-600 transition hover:text-[#8b191c]"
        >
          ← Back to Products
        </Link>
      </div>

      <AdminPageHeader
        title="Edit Product"
        description={`Update settings for ${(product as AdminProduct).name}.`}
      />

      <div className="mt-8">
        <ProductForm
          product={normalizeProduct(product as AdminProduct)}
          categories={categories}
          groups={groups}
        />
      </div>
    </div>
  );
}
