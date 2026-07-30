import { Product } from "@/types/product";

export const storageHandlingProducts: Product[] = [
  {
    id: "AE-SH-001",

    model: "AE-SH-001",

    name: "Storage Rack",

    slug: "storage-rack",

    category: "storage-handling",

    image: "/products/storage-handling/storage-rack/main.webp",

    gallery: [
      "/products/storage-handling/storage-rack/gallery-1.webp",
      "/products/storage-handling/storage-rack/gallery-2.webp",
    ],

    shortDescription:
      "Heavy-duty SS304 storage rack for commercial kitchens.",

    description:
      "Manufactured from premium SS304 stainless steel for hygienic and long-lasting storage. Suitable for hotels, restaurants, cafés, cloud kitchens, hospitals and food processing units.",

    features: [
      "SS304 Stainless Steel",
      "Heavy Duty Construction",
      "Multiple Shelves",
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
        value: "1800 mm",
      },
      {
        label: "Shelves",
        value: "4",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "SS304 Storage Rack | Commercial Kitchen Storage Equipment",

    seoDescription:
      "Premium SS304 stainless steel storage rack manufactured by Anjali Equipments for commercial kitchens.",
  },
];