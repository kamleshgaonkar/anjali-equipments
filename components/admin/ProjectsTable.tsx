"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import StatusBadge from "@/components/admin/StatusBadge";
import type { AdminProjectListItem } from "@/types/admin-catalogue";
import {
  deleteProject,
  duplicateProject,
} from "@/app/admin/(panel)/projects/actions";

export default function ProjectsTable({
  projects,
  hasFilters,
}: {
  projects: AdminProjectListItem[];
  hasFilters: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const q = searchParams.get("q") ?? "";
  const statusFilter = searchParams.get("status") ?? "";
  const featuredFilter = searchParams.get("featured") ?? "";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    const query = params.toString();
    router.push(query ? `/admin/projects?${query}` : "/admin/projects");
  }

  function handleDuplicate(id: string) {
    startTransition(async () => {
      const result = await duplicateProject(id);
      if (result?.error) {
        window.alert(result.error);
      }
    });
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Search
          </label>
          <input
            defaultValue={q}
            placeholder="Project name or location"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateParams({
                  q: (event.target as HTMLInputElement).value.trim(),
                });
              }
            }}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#8b191c]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(event) => updateParams({ status: event.target.value })}
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#8b191c]"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Featured
          </label>
          <select
            value={featuredFilter}
            onChange={(event) =>
              updateParams({ featured: event.target.value })
            }
            className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#8b191c]"
          >
            <option value="">All</option>
            <option value="yes">Featured</option>
            <option value="no">Not featured</option>
          </select>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-700">
            {hasFilters
              ? "No projects match the current search or filters."
              : "No projects yet."}
          </p>
          {!hasFilters ? (
            <Link
              href="/admin/projects/new"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-[#8b191c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731417]"
            >
              + Add Project
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Project Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Display Order</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-slate-100 last:border-b-0"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                          {project.cover_image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={project.cover_image}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                        <span className="font-semibold text-slate-900">
                          {project.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {project.location || "—"}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {project.project_type || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge active={project.is_active} />
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {project.featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {project.display_order}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => handleDuplicate(project.id)}
                          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
                        >
                          Duplicate
                        </button>
                        <ConfirmDeleteButton
                          confirmMessage="Delete this project? This action cannot be undone."
                          onConfirm={() => deleteProject(project.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
