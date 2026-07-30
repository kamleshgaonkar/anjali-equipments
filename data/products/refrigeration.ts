import { Product } from "@/types/product";

export const refrigerationProducts: Product[] = [
  {
    id: "AE-RF-001",

    model: "AE-RF-001",

    name: "Work Top Refrigerator",

    slug: "work-top-refrigerator",

    category: "refrigeration",

    image: "/products/refrigeration/work-top-refrigerator/main.webp",

    gallery: [
      "/products/refrigeration/work-top-refrigerator/gallery-1.webp",
      "/products/refrigeration/work-top-refrigerator/gallery-2.webp",
    ],

    shortDescription:
      "SS304 work top refrigerator for commercial kitchens.",

    description:
      "Premium SS304 refrigerated work table with insulated cabinet and heavy-duty refrigeration system. Ideal for hotels, restaurants, cafés, bakeries and cloud kitchens.",

    features: [
      "SS304 Stainless Steel Construction",
      "Food Grade Interior & Exterior",
      "Heavy Duty Refrigeration Unit",
      "Digital Temperature Controller",
      "Adjustable Shelves",
      "Self Closing Doors",
      "Custom Sizes Available",
    ],

    specifications: [
      {
        label: "Material",
        value: "SS304",
      },
      {
        label: "Temperature Range",
        value: "2°C to 8°C",
      },
      {
        label: "Power Supply",
        value: "230V / 50Hz",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "Work Top Refrigerator | Commercial Refrigeration Equipment",

    seoDescription:
      "Premium SS304 work top refrigerator manufactured by Anjali Equipments for commercial kitchens.",
  },
];