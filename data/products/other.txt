import { Product } from "@/types/product";

export const otherProducts: Product[] = [
  {
    id: "AE-OT-001",

    model: "AE-OT-001",

    name: "Pickup Counter",

    slug: "pickup-counter",

    category: "other",
    group: "Other Equipment", 
    image: "/products/other/pickup-counter/main.webp",

    gallery: [
      "/products/other/pickup-counter/gallery-1.webp",
      "/products/other/pickup-counter/gallery-2.webp",
    ],

    shortDescription:
      "Custom SS304 pickup counter for commercial kitchens and food service areas.",

    description:
      "Premium SS304 pickup counter manufactured for hotels, restaurants, cafés, cloud kitchens and food courts. Designed for hygienic food service with customizable dimensions, storage options and accessories.",

    features: [
      "SS304 Stainless Steel Construction",
      "Heavy Duty Body",
      "Food Grade Finish",
      "Optional Overhead Shelf",
      "Optional Under Shelf",
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
        label: "Finish",
        value: "Hairline Finish",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "Pickup Counter | Commercial Kitchen Equipment",

    seoDescription:
      "Premium SS304 pickup counter manufactured by Anjali Equipments for commercial kitchens, restaurants and food service areas.",
  },
];