import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import CategoryForm from "@/components/admin/CategoryForm";
import { requireAdmin } from "@/lib/admin/auth";
import type { AdminCategory } from "@/types/admin-catalogue";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const category = data as AdminCategory;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/categories"
          className="text-sm font-semibold text-slate-600 transition hover:text-[#8b191c]"
        >
          ← Back to Categories
        </Link>
      </div>

      <AdminPageHeader
        title="Edit Category"
        description={`Update settings for ${category.name}.`}
      />

      <div className="mt-8">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
