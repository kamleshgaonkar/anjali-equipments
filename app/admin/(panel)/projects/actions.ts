"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import {
  parseProjectGallery,
  parseProjectScope,
  resolveScopeLink,
  scopeLinkValue,
  type ScopeCategoryOption,
  type ScopeGroupOption,
} from "@/lib/admin/project-scope";
import { isValidSlug, slugify } from "@/lib/admin/slug";
import {
  deleteStorageObjectByPublicUrl,
  isSupabaseProductImageUrl,
} from "@/lib/admin/storage";
import type { Project, ProjectScopeItem } from "@/types/admin-catalogue";

export type ProjectActionState = {
  error?: string;
  success?: boolean;
};

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function readNullableText(formData: FormData, key: string) {
  return readText(formData, key) || null;
}

function mapDbError(message: string) {
  const lower = message.toLowerCase();

  if (lower.includes("duplicate") || lower.includes("unique")) {
    return "A project with this slug already exists.";
  }

  return message;
}

async function assertUniqueSlug(slug: string, excludeId?: string) {
  const { supabase } = await requireAdmin();

  let query = supabase.from("projects").select("id").eq("slug", slug).limit(1);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(mapDbError(error.message));
  }

  if (data && data.length > 0) {
    throw new Error("A project with this slug already exists.");
  }
}

async function hydrateProjectScope(scope: ProjectScopeItem[]) {
  if (scope.length === 0) return scope;

  const { supabase } = await requireAdmin();
  const [{ data: categoriesData }, { data: groupsData }] = await Promise.all([
    supabase.from("categories").select("id, name, slug, is_active"),
    supabase
      .from("product_groups")
      .select("id, name, slug, category_id, is_active"),
  ]);

  const categories = (categoriesData ?? []) as ScopeCategoryOption[];
  const groups = (groupsData ?? []) as ScopeGroupOption[];

  return scope.map((item) => {
    const resolved = resolveScopeLink(scopeLinkValue(item), categories, groups);
    return {
      label: item.label,
      href: resolved.href,
      linkType: resolved.linkType,
      categoryId: resolved.categoryId,
      groupId: resolved.groupId,
    };
  });
}

function readProjectPayload(formData: FormData) {
  const name = readText(formData, "name");
  const slugInput = readText(formData, "slug");
  const location = readNullableText(formData, "location");
  const projectType = readNullableText(formData, "project_type");
  const shortDescription = readNullableText(formData, "short_description");
  const overviewHeading = readNullableText(formData, "overview_heading");
  const overview = readNullableText(formData, "overview");
  const coverImage = readNullableText(formData, "coverImageUrl");
  const seoTitle = readNullableText(formData, "seo_title");
  const seoDescription = readNullableText(formData, "seo_description");
  const displayOrderRaw = readText(formData, "display_order");
  const gallery = parseProjectGallery(readText(formData, "galleryJson"));
  const projectScope = parseProjectScope(readText(formData, "projectScopeJson"));
  const featured = formData.get("featured") === "on";
  const isActive = formData.get("is_active") === "on";

  return {
    name,
    slugInput,
    location,
    projectType,
    shortDescription,
    overviewHeading,
    overview,
    coverImage,
    seoTitle,
    seoDescription,
    displayOrderRaw,
    gallery,
    projectScope,
    featured,
    isActive,
  };
}

function toInsertRow(
  payload: ReturnType<typeof readProjectPayload>,
  slug: string,
  displayOrder: number
) {
  return {
    name: payload.name,
    slug,
    location: payload.location,
    project_type: payload.projectType,
    short_description: payload.shortDescription,
    overview_heading: payload.overviewHeading,
    overview: payload.overview,
    cover_image: payload.coverImage,
    gallery: payload.gallery,
    project_scope: payload.projectScope,
    featured: payload.featured,
    is_active: payload.isActive,
    display_order: displayOrder,
    seo_title: payload.seoTitle,
    seo_description: payload.seoDescription,
  };
}

export async function createProject(
  _prev: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const { supabase } = await requireAdmin();
  const payload = readProjectPayload(formData);

  if (!payload.name) {
    return { error: "Project name is required." };
  }

  const slug = slugify(payload.slugInput || payload.name);
  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(payload.displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  try {
    await assertUniqueSlug(slug);
    const projectScope = await hydrateProjectScope(payload.projectScope);

    const { error } = await supabase
      .from("projects")
      .insert(toInsertRow({ ...payload, projectScope }, slug, displayOrder));

    if (error) {
      return { error: mapDbError(error.message) };
    }
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to create project.",
    };
  }

  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prev: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  const { supabase } = await requireAdmin();
  const payload = readProjectPayload(formData);

  if (!payload.name) {
    return { error: "Project name is required." };
  }

  const slug = slugify(payload.slugInput || payload.name);
  if (!slug || !isValidSlug(slug)) {
    return { error: "Enter a valid lowercase URL-safe slug." };
  }

  const displayOrder = Number(payload.displayOrderRaw || "0");
  if (!Number.isFinite(displayOrder)) {
    return { error: "Display order must be a number." };
  }

  try {
    await assertUniqueSlug(slug, id);
    const projectScope = await hydrateProjectScope(payload.projectScope);

    const { error } = await supabase
      .from("projects")
      .update(toInsertRow({ ...payload, projectScope }, slug, displayOrder))
      .eq("id", id);

    if (error) {
      return { error: mapDbError(error.message) };
    }
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Unable to update project.",
    };
  }

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}/edit`);
  redirect("/admin/projects");
}

function collectProjectImageUrls(project: {
  cover_image?: unknown;
  gallery?: unknown;
}) {
  const cover =
    typeof project.cover_image === "string" ? project.cover_image : null;
  const gallery = Array.isArray(project.gallery)
    ? project.gallery.filter((item): item is string => typeof item === "string")
    : [];

  return [cover, ...gallery].filter((url): url is string => Boolean(url));
}

export async function deleteProject(id: string) {
  const { supabase } = await requireAdmin();

  const { data: project, error: loadError } = await supabase
    .from("projects")
    .select("id, cover_image, gallery")
    .eq("id", id)
    .maybeSingle();

  if (loadError) {
    return { error: mapDbError(loadError.message) };
  }

  if (!project) {
    return { error: "Project not found." };
  }

  const storageWarnings: string[] = [];

  for (const url of collectProjectImageUrls(project)) {
    if (!isSupabaseProductImageUrl(url)) continue;

    try {
      await deleteStorageObjectByPublicUrl(supabase, url);
    } catch (error) {
      storageWarnings.push(
        error instanceof Error ? error.message : "Storage cleanup failed."
      );
    }
  }

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    return { error: mapDbError(error.message) };
  }

  revalidatePath("/admin/projects");

  if (storageWarnings.length) {
    return {
      error: `Project deleted, but some images could not be removed from storage: ${storageWarnings[0]}`,
    };
  }

  return {};
}

export async function duplicateProject(id: string) {
  const { supabase } = await requireAdmin();

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return { error: mapDbError(error.message) };
  }

  if (!project) {
    return { error: "Project not found." };
  }

  const source = project as Project;
  const baseName = `${source.name} Copy`;
  let candidateSlug = slugify(`${source.slug}-copy`);
  let attempt = 1;

  while (true) {
    const { data: existing } = await supabase
      .from("projects")
      .select("id")
      .eq("slug", candidateSlug)
      .limit(1);

    if (!existing?.length) break;
    attempt += 1;
    candidateSlug = slugify(`${source.slug}-copy-${attempt}`);
  }

  const projectScope: ProjectScopeItem[] = Array.isArray(source.project_scope)
    ? source.project_scope
    : [];

  const { data: created, error: insertError } = await supabase
    .from("projects")
    .insert({
      name: baseName,
      slug: candidateSlug,
      location: source.location,
      project_type: source.project_type,
      short_description: source.short_description,
      overview_heading: source.overview_heading,
      overview: source.overview,
      cover_image: null,
      gallery: [],
      project_scope: projectScope,
      featured: false,
      is_active: false,
      display_order: source.display_order ?? 0,
      seo_title: source.seo_title,
      seo_description: source.seo_description,
    })
    .select("id")
    .single();

  if (insertError || !created) {
    return {
      error: mapDbError(insertError?.message || "Unable to duplicate project."),
    };
  }

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${created.id}/edit`);
}
