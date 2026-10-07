"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import GalleryImagesField from "@/components/admin/GalleryImagesField";
import ImageUploadField from "@/components/admin/ImageUploadField";
import ProjectScopeEditor from "@/components/admin/ProjectScopeEditor";
import {
  type ScopeCategoryOption,
  type ScopeGroupOption,
} from "@/lib/admin/project-scope";
import { slugify } from "@/lib/admin/slug";
import {
  buildProjectCoverPath,
  buildProjectGalleryPath,
} from "@/lib/admin/storage";
import type { Project, ProjectScopeItem } from "@/types/admin-catalogue";
import {
  createProject,
  updateProject,
  type ProjectActionState,
} from "@/app/admin/(panel)/projects/actions";

const initialState: ProjectActionState = {};

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export default function ProjectForm({
  project,
  categories,
  groups,
}: {
  project?: Project;
  categories: ScopeCategoryOption[];
  groups: ScopeGroupOption[];
}) {
  const isEdit = Boolean(project);
  const boundUpdate = updateProject.bind(null, project?.id ?? "");
  const [state, formAction, pending] = useActionState(
    isEdit ? boundUpdate : createProject,
    initialState
  );

  const [name, setName] = useState(project?.name ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(
    project?.cover_image ?? null
  );
  const [gallery, setGallery] = useState<string[]>(project?.gallery ?? []);
  const [projectScope, setProjectScope] = useState<ProjectScopeItem[]>(
    project?.project_scope ?? []
  );
  const [seoOpen, setSeoOpen] = useState(
    Boolean(project?.seo_title || project?.seo_description)
  );
  const [seoTitle, setSeoTitle] = useState(project?.seo_title ?? "");
  const [seoDescription, setSeoDescription] = useState(
    project?.seo_description ?? ""
  );

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(name));
    }
  }, [name, slugTouched]);

  const normalizedSlug = slugify(slug);
  const canUploadImages = Boolean(normalizedSlug);

  return (
    <form action={formAction} className="mx-auto max-w-5xl space-y-6">
      <Section title="Basic Information">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Project Name *
            </label>
            <input
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Slug *
            </label>
            <input
              name="slug"
              required
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700">
              Location
            </label>
            <input
              name="location"
              defaultValue={project?.location ?? ""}
              placeholder="e.g. Mumbai"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700">
              Project Type
            </label>
            <input
              name="project_type"
              defaultValue={project?.project_type ?? ""}
              placeholder="e.g. Hotel & Resort"
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
            />
          </div>
        </div>
      </Section>

      <Section title="Project Overview">
        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Short Description
          </label>
          <textarea
            name="short_description"
            rows={3}
            defaultValue={project?.short_description ?? ""}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Overview Heading
          </label>
          <input
            name="overview_heading"
            defaultValue={project?.overview_heading ?? ""}
            placeholder="Built around the way the kitchen works."
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Overview
          </label>
          <textarea
            name="overview"
            rows={8}
            defaultValue={project?.overview ?? ""}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
          />
        </div>
      </Section>

      <Section title="Images">
        <ImageUploadField
          name="coverImageUrl"
          label="Cover Image"
          value={coverImageUrl}
          onChange={setCoverImageUrl}
          canUpload={canUploadImages}
          uploadBlockedMessage="Enter a project slug before uploading images."
          getStoragePath={(file) => buildProjectCoverPath(normalizedSlug, file)}
          helpText="JPEG, PNG or WebP. Max 5 MB. Uploaded directly to Supabase Storage."
        />

        <GalleryImagesField
          name="galleryJson"
          value={gallery}
          onChange={setGallery}
          canUpload={canUploadImages}
          uploadBlockedMessage="Enter a project slug before uploading gallery images."
          getStoragePath={(file) =>
            buildProjectGalleryPath(normalizedSlug, file)
          }
        />
      </Section>

      <Section title="Project Scope">
        <ProjectScopeEditor
          name="projectScopeJson"
          value={projectScope}
          onChange={setProjectScope}
          categories={categories}
          groups={groups}
        />
      </Section>

      <Section title="Publishing">
        <div className="flex flex-wrap gap-4">
          <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={Boolean(project?.featured)}
              className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
            />
            Featured
          </label>
          <label className="inline-flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={project?.is_active ?? true}
              className="h-4 w-4 rounded border-slate-300 text-[#8b191c] focus:ring-[#8b191c]"
            />
            Active
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700">
            Display Order
          </label>
          <input
            name="display_order"
            type="number"
            defaultValue={project?.display_order ?? 0}
            className="mt-2 w-full max-w-xs rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
          />
          <p className="mt-2 text-xs text-slate-500">
            Used later for previous/next project navigation on public pages.
          </p>
        </div>
      </Section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <button
          type="button"
          onClick={() => setSeoOpen((open) => !open)}
          className="flex w-full items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-slate-900">SEO</h2>
          <span className="text-sm font-semibold text-slate-500">
            {seoOpen ? "Hide" : "Show"}
          </span>
        </button>

        {seoOpen ? (
          <div className="mt-5 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                SEO Title
              </label>
              <input
                name="seo_title"
                value={seoTitle}
                onChange={(event) => setSeoTitle(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
              />
              <p className="mt-2 text-xs text-slate-500">
                {seoTitle.length} characters
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700">
                SEO Description
              </label>
              <textarea
                name="seo_description"
                rows={4}
                value={seoDescription}
                onChange={(event) => setSeoDescription(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#8b191c] focus:ring-2 focus:ring-[#8b191c]/20"
              />
              <p className="mt-2 text-xs text-slate-500">
                {seoDescription.length} characters
              </p>
            </div>
          </div>
        ) : (
          <>
            <input type="hidden" name="seo_title" value={seoTitle} />
            <input type="hidden" name="seo_description" value={seoDescription} />
          </>
        )}
      </section>

      {state.error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-xl bg-[#8b191c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#731417] disabled:opacity-70"
        >
          {pending
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Create Project"}
        </button>
        <Link
          href="/admin/projects"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
