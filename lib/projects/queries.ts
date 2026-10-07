import { createPublicCatalogueClient } from "@/lib/catalogue/public-client";
import {
  normalizeProjectGallery,
  normalizeProjectScope,
} from "@/lib/admin/project-scope";
import type {
  PublicProject,
  PublicProjectListItem,
  PublicProjectNeighbor,
} from "@/lib/projects/types";

type DbProjectListRow = {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  cover_image: string | null;
  display_order: number;
};

type DbProjectRow = DbProjectListRow & {
  project_type: string | null;
  short_description: string | null;
  overview_heading: string | null;
  overview: string | null;
  gallery: unknown;
  project_scope: unknown;
  featured: boolean;
  is_active: boolean;
  seo_title: string | null;
  seo_description: string | null;
};

function logProjectsError(context: string, error: { message: string }) {
  console.error(`[projects] ${context}: ${error.message}`);
}

function mapListItem(row: DbProjectListRow): PublicProjectListItem {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    location: row.location,
    cover_image: row.cover_image,
    display_order: row.display_order,
  };
}

function mapProject(row: DbProjectRow): PublicProject {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    location: row.location,
    project_type: row.project_type,
    short_description: row.short_description,
    overview_heading: row.overview_heading,
    overview: row.overview,
    cover_image: row.cover_image,
    gallery: normalizeProjectGallery(row.gallery),
    project_scope: normalizeProjectScope(row.project_scope),
    featured: Boolean(row.featured),
    is_active: Boolean(row.is_active),
    display_order: row.display_order,
    seo_title: row.seo_title,
    seo_description: row.seo_description,
  };
}

export async function fetchActiveProjects(): Promise<PublicProjectListItem[]> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("projects")
    .select("id, name, slug, location, cover_image, display_order")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    logProjectsError("fetchActiveProjects", error);
    throw new Error("Unable to load projects.");
  }

  return ((data ?? []) as DbProjectListRow[]).map(mapListItem);
}

export async function fetchActiveProjectBySlug(
  slug: string
): Promise<PublicProject | null> {
  const supabase = createPublicCatalogueClient();

  const { data, error } = await supabase
    .from("projects")
    .select(
      "id, name, slug, location, project_type, short_description, overview_heading, overview, cover_image, gallery, project_scope, featured, is_active, display_order, seo_title, seo_description"
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    logProjectsError("fetchActiveProjectBySlug", error);
    throw new Error("Unable to load project.");
  }

  if (!data) return null;
  return mapProject(data as DbProjectRow);
}

export function getProjectNeighbors(
  projects: PublicProjectListItem[],
  slug: string
): {
  previous: PublicProjectNeighbor | null;
  next: PublicProjectNeighbor | null;
} {
  if (projects.length <= 1) {
    return { previous: null, next: null };
  }

  const currentIndex = projects.findIndex((project) => project.slug === slug);
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  const previous =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return {
    previous: { name: previous.name, slug: previous.slug },
    next: { name: next.name, slug: next.slug },
  };
}
