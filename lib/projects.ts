export interface Project {
    slug: string;
    title: string;
    location: string;
    category: string;
    description: string;
    coverImage: string;
    gallery: string[];
    equipment: string[];
  }
  
  export const projects: Project[] = [
    {
      slug: "the-grand-kitchen",
      title: "The Grand Kitchen",
      location: "Mumbai",
      category: "Hotel & Resort",
      description:
        "A complete commercial kitchen solution designed for efficient high-volume hotel operations.",
      coverImage: "/images/projects/project-1.jpg",
      gallery: [
        "/images/projects/project-1.jpg",
        "/images/projects/project-1-2.jpg",
        "/images/projects/project-1-3.jpg",
      ],
      equipment: [
        "Cooking Range",
        "Preparation Tables",
        "Sink Units",
        "Exhaust Hood",
        "Storage Racks",
      ],
    },
  
    {
      slug: "urban-spice-restaurant",
      title: "Urban Spice Restaurant",
      location: "Pune",
      category: "Restaurant",
      description:
        "A compact and efficient restaurant kitchen designed around a high-volume cooking workflow.",
      coverImage: "/images/projects/project-2.jpg",
      gallery: [
        "/images/projects/project-2.jpg",
        "/images/projects/project-2-2.jpg",
        "/images/projects/project-2-3.jpg",
      ],
      equipment: [
        "Cooking Range",
        "Chinese Range",
        "Preparation Tables",
        "Refrigeration",
        "Exhaust System",
      ],
    },
  
    {
      slug: "freshbite-cafe",
      title: "FreshBite Café",
      location: "Mumbai",
      category: "Café & Bakery",
      description:
        "A modern café kitchen combining preparation, refrigeration, bakery and service equipment.",
      coverImage: "/images/projects/project-3.jpg",
      gallery: [
        "/images/projects/project-3.jpg",
        "/images/projects/project-3-2.jpg",
        "/images/projects/project-3-3.jpg",
      ],
      equipment: [
        "Work Tables",
        "Refrigerated Counter",
        "Bakery Equipment",
        "Display Counter",
        "Storage",
      ],
    },
  
    {
      slug: "cloudchef-central-kitchen",
      title: "CloudChef Central Kitchen",
      location: "Navi Mumbai",
      category: "Cloud Kitchen",
      description:
        "A production-focused central kitchen designed for streamlined preparation and high-volume food production.",
      coverImage: "/images/projects/project-4.jpg",
      gallery: [
        "/images/projects/project-4.jpg",
        "/images/projects/project-4-2.jpg",
        "/images/projects/project-4-3.jpg",
      ],
      equipment: [
        "Bulk Cooking Equipment",
        "Preparation Tables",
        "Storage Racks",
        "Refrigeration",
        "Washing Equipment",
      ],
    },
  
    {
      slug: "harmony-hospital-kitchen",
      title: "Harmony Hospital Kitchen",
      location: "Mumbai",
      category: "Hospital",
      description:
        "A hygienic commercial kitchen setup designed for institutional food preparation and service.",
      coverImage: "/images/projects/project-5.jpg",
      gallery: [
        "/images/projects/project-5.jpg",
        "/images/projects/project-5-2.jpg",
        "/images/projects/project-5-3.jpg",
      ],
      equipment: [
        "Cooking Equipment",
        "Preparation Tables",
        "Washing Equipment",
        "Storage",
        "Food Holding Equipment",
      ],
    },
  
    {
      slug: "royal-banquet-kitchen",
      title: "Royal Banquet Kitchen",
      location: "Thane",
      category: "Banquet",
      description:
        "A large-scale kitchen setup designed to support banquet service and high-volume food production.",
      coverImage: "/images/projects/project-6.jpg",
      gallery: [
        "/images/projects/project-6.jpg",
        "/images/projects/project-6-2.jpg",
        "/images/projects/project-6-3.jpg",
      ],
      equipment: [
        "Bulk Cooking Equipment",
        "Cooking Ranges",
        "Bain Marie",
        "Service Counters",
        "Exhaust System",
      ],
    },
  ];
  
  export function getProjectBySlug(slug: string) {
    return projects.find((project) => project.slug === slug);
  }