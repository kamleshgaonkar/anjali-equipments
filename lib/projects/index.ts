export {
  fetchActiveProjectBySlug,
  fetchActiveProjects,
  getProjectNeighbors,
} from "@/lib/projects/queries";
export type {
  PublicProject,
  PublicProjectListItem,
  PublicProjectNeighbor,
} from "@/lib/projects/types";
export { PROJECT_IMAGE_FALLBACK } from "@/lib/projects/types";
