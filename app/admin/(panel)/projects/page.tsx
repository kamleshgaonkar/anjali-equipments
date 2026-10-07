import { Suspense } from "react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import ProjectsTable from "@/components/admin/ProjectsTable";
import { requireAdmin } from "@/lib/admin/auth";
import type { AdminProjectListItem } from "@/types/admin-catalogue";

type Props = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    featured?: string;
  }>;
};

export default async function AdminProjectsPage({ searchParams }: Props) {
  const { q, status, featured } = await searchParams;
  const { supabase } = await requireAdmin();

  let query = supabase
    .from("projects")
    .select(
      "id, name, slug, location, project_type, cover_image, featured, is_active, display_order"
    )
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (q?.trim()) {
    const term = q.trim().replaceAll(",", " ");
    query = query.or(`name.ilike.%${term}%,location.ilike.%${term}%`);
  }

  if (status === "active") {
    query = query.eq("is_active", true);
  }

  if (status === "inactive") {
    query = query.eq("is_active", false);
  }

  if (featured === "yes") {
    query = query.eq("featured", true);
  }

  if (featured === "no") {
    query = query.eq("featured", false);
  }

  const { data, error } = await query;

  const hasFilters = Boolean(q?.trim() || status || featured);

  if (error) {
    return (
      <div>
        <AdminPageHeader
          title="Projects"
          description="Manage completed kitchen projects shown on the website."
          actionHref="/admin/projects/new"
          actionLabel="+ Add Project"
        />
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700">
          Unable to load projects: {error.message}
        </div>
      </div>
    );
  }

  const projects = (data ?? []) as AdminProjectListItem[];

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        description="Manage completed kitchen projects shown on the website."
        actionHref="/admin/projects/new"
        actionLabel="+ Add Project"
      />

      <Suspense
        fallback={
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-10 text-sm text-slate-500">
            Loading projects...
          </div>
        }
      >
        <ProjectsTable projects={projects} hasFilters={hasFilters} />
      </Suspense>
    </div>
  );
}
