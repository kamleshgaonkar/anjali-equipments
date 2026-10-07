import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProductGroupForm from "@/components/admin/ProductGroupForm";
import { requireAdmin } from "@/lib/admin/auth";
import type {
  AdminCategory,
  AdminProductGroup,
} from "@/types/admin-catalogue";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductGroupPage({ params }: Props) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [{ data: group, error }, { data: categoriesData }] = await Promise.all([
    supabase.from("product_groups").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("categories")
      .select("id, name, slug, is_active")
      .order("display_order", { ascending: true })
      .order("name", { ascending: true }),
  ]);

  if (error || !group) {
    notFound();
  }

  const categories = (categoriesData ?? []) as Pick<
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
        title="Edit Product Group"
        description={`Update settings for ${(group as AdminProductGroup).name}.`}
      />

      <div className="mt-8">
        <ProductGroupForm
          group={group as AdminProductGroup}
          categories={categories}
        />
      </div>
    </div>
  );
}
