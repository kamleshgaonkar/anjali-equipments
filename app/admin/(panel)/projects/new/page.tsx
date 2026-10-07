import Link from "next/link";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/admin/auth";
import type { AdminCategory, AdminProductGroup } from "@/types/admin-catalogue";

export default async function NewProjectPage() {
  const { supabase } = await requireAdmin();

  const [{ data: categoriesData }, { data: groupsData }] = await Promise.all([
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
          href="/admin/projects"
          className="text-sm font-semibold text-slate-600 transition hover:text-[#8b191c]"
        >
          ← Back to Projects
        </Link>
      </div>

      <AdminPageHeader
        title="Add Project"
        description="Create a new project record."
      />

      <div className="mt-8">
        <ProjectForm categories={categories} groups={groups} />
      </div>
    </div>
  );
}
