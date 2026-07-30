import { Product } from "@/types/product";

export const bakeryProducts: Product[] = [
  {
    id: "AE-BK-001",

    model: "AE-BK-001",

    name: "Bakery Work Table",

    slug: "bakery-work-table",

    category: "bakery",

    image: "/products/bakery/bakery-work-table/main.webp",

    gallery: [
      "/products/bakery/bakery-work-table/gallery-1.webp",
      "/products/bakery/bakery-work-table/gallery-2.webp",
    ],

    shortDescription:
      "Heavy-duty SS304 bakery work table for commercial bakeries.",

    description:
      "Premium SS304 stainless steel bakery work table specially designed for dough preparation, baking operations and food production. Suitable for bakeries, pastry shops, hotels, cafés and commercial kitchens.",

    features: [
      "SS304 Stainless Steel Construction",
      "Heavy Duty Frame",
      "Food Grade Finish",
      "Smooth Hygienic Work Surface",
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
        label: "Finish",
        value: "Hairline Finish",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "Bakery Work Table | Commercial Bakery Equipment",

    seoDescription:
      "Premium SS304 bakery work table manufactured by Anjali Equipments for bakeries, pastry shops and commercial kitchens.",
  },
];