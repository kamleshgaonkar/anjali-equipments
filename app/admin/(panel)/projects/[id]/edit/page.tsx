import Link from "next/link";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectForm from "@/components/admin/ProjectForm";
import { requireAdmin } from "@/lib/admin/auth";
import {
  normalizeProjectGallery,
  normalizeProjectScope,
} from "@/lib/admin/project-scope";
import type {
  AdminCategory,
  AdminProductGroup,
  Project,
} from "@/types/admin-catalogue";

type Props = {
  params: Promise<{ id: string }>;
};

function normalizeProject(row: Project): Project {
  return {
    ...row,
    gallery: normalizeProjectGallery(row.gallery),
    project_scope: normalizeProjectScope(row.project_scope),
  };
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [
    { data: project, error },
    { data: categoriesData },
    { data: groupsData },
  ] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).maybeSingle(),
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

  if (error || !project) {
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

  const normalized = normalizeProject(project as Project);

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
        title="Edit Project"
        description={`Update settings for ${normalized.name}.`}
      />

      <div className="mt-8">
        <ProjectForm
          project={normalized}
          categories={categories}
          groups={groups}
        />
      </div>
    </div>
  );
}
