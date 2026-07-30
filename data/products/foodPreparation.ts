import { Product } from "@/types/product";

export const foodPreparationProducts: Product[] = [
  {
    id: "AE-FP-001",

    model: "AE-FP-001",

    name: "Work Table",

    slug: "work-table",

    category: "food-preparation",

    image: "/products/food-preparation/work-table/main.webp",

    gallery: [
      "/products/food-preparation/work-table/gallery-1.webp",
      "/products/food-preparation/work-table/gallery-2.webp",
    ],

    shortDescription:
      "Heavy-duty SS304 stainless steel work table.",

    description:
      "Manufactured from premium SS304 stainless steel with a hygienic finish and robust construction. Suitable for hotels, restaurants, cloud kitchens, hospitals and industrial kitchens.",

    features: [
      "SS304 Stainless Steel",
      "Heavy Duty Construction",
      "Food Grade Finish",
      "Adjustable Nylon Bullet Feet",
      "Custom Sizes Available",
    ],

    specifications: [
      {
        label: "Material",
        value: "SS304",
      },
      {
        label: "Height",
        value: "850 mm",
      },
      {
        label: "Top Thickness",
        value: "1.2 mm",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "SS304 Stainless Steel Work Table | Anjali Equipments",

    seoDescription:
      "Premium SS304 stainless steel work table for commercial kitchens. Custom sizes available.",
  },
];