import type {
  AdminCategory,
  AdminProductGroup,
  ProjectScopeItem,
  ProjectScopeLinkType,
} from "@/types/admin-catalogue";

export type ScopeCategoryOption = Pick<
  AdminCategory,
  "id" | "name" | "slug" | "is_active"
>;

export type ScopeGroupOption = Pick<
  AdminProductGroup,
  "id" | "name" | "slug" | "category_id" | "is_active"
>;

export function categoryPublicHref(categorySlug: string) {
  return `/products/${categorySlug}`;
}

export function groupPublicHref(categorySlug: string, groupSlug: string) {
  return `/products/${categorySlug}/${groupSlug}`;
}

export function scopeLinkValue(item: ProjectScopeItem) {
  if (item.linkType === "group" && item.groupId) {
    return `group:${item.groupId}`;
  }

  if (item.linkType === "category" && item.categoryId) {
    return `category:${item.categoryId}`;
  }

  return "none";
}

export function resolveScopeLink(
  linkValue: string,
  categories: ScopeCategoryOption[],
  groups: ScopeGroupOption[]
): Pick<ProjectScopeItem, "href" | "linkType" | "categoryId" | "groupId"> {
  if (linkValue.startsWith("category:")) {
    const categoryId = linkValue.slice("category:".length);
    const category = categories.find((item) => item.id === categoryId);

    if (!category) {
      return {
        href: null,
        linkType: "none",
        categoryId: null,
        groupId: null,
      };
    }

    return {
      href: categoryPublicHref(category.slug),
      linkType: "category",
      categoryId: category.id,
      groupId: null,
    };
  }

  if (linkValue.startsWith("group:")) {
    const groupId = linkValue.slice("group:".length);
    const group = groups.find((item) => item.id === groupId);
    const category = group
      ? categories.find((item) => item.id === group.category_id)
      : undefined;

    if (!group || !category) {
      return {
        href: null,
        linkType: "none",
        categoryId: null,
        groupId: null,
      };
    }

    return {
      href: groupPublicHref(category.slug, group.slug),
      linkType: "group",
      categoryId: category.id,
      groupId: group.id,
    };
  }

  return {
    href: null,
    linkType: "none",
    categoryId: null,
    groupId: null,
  };
}

function asLinkType(value: unknown): ProjectScopeLinkType | undefined {
  if (value === "none" || value === "category" || value === "group") {
    return value;
  }

  return undefined;
}

export function parseProjectScope(raw: string): ProjectScopeItem[] {
  try {
    const parsed = JSON.parse(raw || "[]") as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item): ProjectScopeItem | null => {
        if (!item || typeof item !== "object") return null;

        const row = item as {
          label?: unknown;
          href?: unknown;
          linkType?: unknown;
          categoryId?: unknown;
          groupId?: unknown;
        };

        const label = String(row.label ?? "").trim();
        if (!label) return null;

        const hrefRaw = String(row.href ?? "").trim();
        const categoryId = String(row.categoryId ?? "").trim() || null;
        const groupId = String(row.groupId ?? "").trim() || null;

        return {
          label,
          href: hrefRaw || null,
          linkType: asLinkType(row.linkType) ?? (hrefRaw ? undefined : "none"),
          categoryId,
          groupId,
        };
      })
      .filter((item): item is ProjectScopeItem => Boolean(item));
  } catch {
    return [];
  }
}

export function parseProjectGallery(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw || "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

export function normalizeProjectScope(
  value: unknown
): ProjectScopeItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item): ProjectScopeItem | null => {
      if (!item || typeof item !== "object") return null;
      const row = item as {
        label?: unknown;
        href?: unknown;
        linkType?: unknown;
        categoryId?: unknown;
        groupId?: unknown;
      };
      const label = String(row.label ?? "").trim();
      if (!label) return null;
      const hrefRaw = String(row.href ?? "").trim();

      return {
        label,
        href: hrefRaw || null,
        linkType: asLinkType(row.linkType),
        categoryId: String(row.categoryId ?? "").trim() || null,
        groupId: String(row.groupId ?? "").trim() || null,
      };
    })
    .filter((item): item is ProjectScopeItem => Boolean(item));
}

export function normalizeProjectGallery(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
}
