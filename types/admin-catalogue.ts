export type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  hero_image: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type AdminProductGroup = {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  display_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type AdminCategoryWithCounts = AdminCategory & {
  product_groups_count: number;
};

export type AdminProductGroupWithCategory = AdminProductGroup & {
  categories: Pick<AdminCategory, "id" | "name" | "slug"> | null;
};

export type AdminProductSpecification = {
  label: string;
  value: string;
};

export type AdminProduct = {
  id: string;
  category_id: string;
  group_id: string;
  name: string;
  slug: string;
  model: string | null;
  short_description: string | null;
  description: string | null;
  image: string | null;
  gallery: string[] | null;
  features: string[] | null;
  specifications: AdminProductSpecification[] | null;
  material: string | null;
  custom_sizes: boolean | null;
  warranty: string | null;
  origin: string | null;
  hsn_code: string | null;
  featured: boolean;
  is_active: boolean;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
};

export type AdminProductListItem = AdminProduct & {
  categories: Pick<AdminCategory, "id" | "name" | "slug"> | null;
  product_groups: Pick<
    AdminProductGroup,
    "id" | "name" | "slug" | "category_id"
  > | null;
};

export type ProjectScopeLinkType = "none" | "category" | "group";

export type ProjectScopeItem = {
  label: string;
  href: string | null;
  linkType?: ProjectScopeLinkType;
  categoryId?: string | null;
  groupId?: string | null;
};

export type ProjectGalleryItem = string;

export type Project = {
  id: string;
  name: string;
  slug: string;
  location: string | null;
  project_type: string | null;
  short_description: string | null;
  overview_heading: string | null;
  overview: string | null;
  cover_image: string | null;
  gallery: ProjectGalleryItem[];
  project_scope: ProjectScopeItem[];
  featured: boolean;
  is_active: boolean;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
};

export type AdminProject = Project;

export type AdminProjectListItem = Pick<
  Project,
  | "id"
  | "name"
  | "slug"
  | "location"
  | "project_type"
  | "cover_image"
  | "featured"
  | "is_active"
  | "display_order"
>;
