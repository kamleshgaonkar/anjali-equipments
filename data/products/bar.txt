import { Product } from "@/types/product";

export const barProducts: Product[] = [
  {
    id: "AE-BR-001",

    model: "AE-BR-001",

    name: "Bar Counter",

    slug: "bar-counter",

    category: "bar",
    group: "Bar Equipment",
    image: "/products/bar/bar-counter/main.webp",

    gallery: [
      "/products/bar/bar-counter/gallery-1.webp",
      "/products/bar/bar-counter/gallery-2.webp",
    ],

    shortDescription:
      "Premium SS304 bar counter for commercial bars, cafés and restaurants.",

    description:
      "Heavy-duty SS304 stainless steel bar counter designed for restaurants, hotels, pubs, cafés and beverage service areas. Manufactured with a hygienic finish, durable construction and customizable layout to suit every establishment.",

    features: [
      "SS304 Stainless Steel Construction",
      "Heavy Duty Body",
      "Food Grade Finish",
      "Smooth Working Surface",
      "Storage Shelves & Cabinets",
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
        value: "Matt / Hairline",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "SS304 Bar Counter | Commercial Bar Equipment",

    seoDescription:
      "Premium SS304 stainless steel bar counter manufactured by Anjali Equipments for restaurants, hotels and cafés.",
  },
];