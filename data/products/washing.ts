import { Product } from "@/types/product";

export const washingProducts: Product[] = [
  {
    id: "AE-WS-001",

    model: "AE-WS-001",

    name: "Single Sink Unit",

    slug: "single-sink-unit",

    category: "washing",
    group: "Washing Equipment", 
    image: "/products/washing/single-sink-unit/main.webp",

    gallery: [
      "/products/washing/single-sink-unit/gallery-1.webp",
      "/products/washing/single-sink-unit/gallery-2.webp",
    ],

    shortDescription:
      "Heavy-duty SS304 single sink unit for commercial kitchens.",

    description:
      "Premium SS304 stainless steel sink unit designed for commercial kitchens. Hygienic, corrosion resistant and built for continuous use in hotels, restaurants, cafés, hospitals and food processing units.",

    features: [
      "SS304 Stainless Steel",
      "Deep Drawn Sink Bowl",
      "Heavy Duty Construction",
      "Adjustable Nylon Bullet Feet",
      "Rear Splash Back",
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
        label: "Sink Bowl",
        value: "450 × 450 × 300 mm",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "Single Sink Unit | Commercial Kitchen Washing Equipment",

    seoDescription:
      "Premium SS304 stainless steel single sink unit manufactured by Anjali Equipments for commercial kitchens.",
  },
];