import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductGroupForm from "@/components/admin/ProductGroupForm";
import { requireAdmin } from "@/lib/admin/auth";
import type { AdminCategory } from "@/types/admin-catalogue";

export default async function NewProductGroupPage() {
  const { supabase } = await requireAdmin();

  const { data } = await supabase
    .from("categories")
    .select("id, name, slug, is_active")
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  const categories = (data ?? []) as Pick<
    AdminCategory,
    "id" | "name" | "slug" | "is_active"
  >[];

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/groups"
          className="text-sm font-semibold text-slate-600 transition hover:text-[#8b191c]"
        >
          ← Back to Product Groups
        </Link>
      </div>

      <AdminPageHeader
        title="Add Product Group"
        description="Create a subcategory group under an existing category."
      />

      <div className="mt-8">
        {categories.length === 0 ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-5 text-sm text-amber-800">
            Create at least one category before adding product groups.
          </div>
        ) : (
          <ProductGroupForm categories={categories} />
        )}
      </div>
    </div>
  );
}
