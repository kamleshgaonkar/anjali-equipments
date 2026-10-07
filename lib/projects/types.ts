import type { ProjectScopeItem } from "@/types/admin-catalogue";

export type PublicProjectListItem = {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  cover_image: string | null;
  display_order: number;
};

export type PublicProject = {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  project_type: string | null;
  short_description: string | null;
  overview_heading: string | null;
  overview: string | null;
  cover_image: string | null;
  gallery: string[];
  project_scope: ProjectScopeItem[];
  featured: boolean;
  is_active: boolean;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
};

export type PublicProjectNeighbor = {
  name: string;
  slug: string;
};

export const PROJECT_IMAGE_FALLBACK = "/images/kitchen/kitchen-panorama.jpg";
