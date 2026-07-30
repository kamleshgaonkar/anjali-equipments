import { Product } from "@/types/product";

export const exhaustVentilationProducts: Product[] = [
  {
    id: "AE-EV-001",

    model: "AE-EV-001",

    name: "Kitchen Exhaust Hood",

    slug: "kitchen-exhaust-hood",

    category: "exhaust-ventilation",

    image: "/products/exhaust-ventilation/kitchen-exhaust-hood/main.webp",

    gallery: [
      "/products/exhaust-ventilation/kitchen-exhaust-hood/gallery-1.webp",
      "/products/exhaust-ventilation/kitchen-exhaust-hood/gallery-2.webp",
    ],

    shortDescription:
      "Heavy-duty SS304 kitchen exhaust hood for commercial kitchens.",

    description:
      "Premium SS304 exhaust hood designed to efficiently remove smoke, heat, grease and cooking fumes from commercial kitchens. Suitable for hotels, restaurants, cafés, cloud kitchens and industrial food production facilities.",

    features: [
      "SS304 Stainless Steel",
      "Heavy Duty Construction",
      "Built-in Grease Filters",
      "Easy to Clean Design",
      "High Airflow Efficiency",
      "Custom Sizes Available",
    ],

    specifications: [
      {
        label: "Material",
        value: "SS304",
      },
      {
        label: "Filter Type",
        value: "Baffle Filter",
      },
      {
        label: "Installation",
        value: "Wall Mounted / Island Type",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "Kitchen Exhaust Hood | Commercial Kitchen Ventilation Equipment",

    seoDescription:
      "Premium SS304 kitchen exhaust hood manufactured by Anjali Equipments for commercial kitchens.",
  },
];