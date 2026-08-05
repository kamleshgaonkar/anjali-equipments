import { Product } from "@/types/product";

export const foodHoldingServingProducts: Product[] = [
  {
    id: "AE-FHS-001",

    model: "AE-FHS-001",

    name: "Hot Bain Marie Counter",

    slug: "hot-bain-marie-counter",

    category: "food-holding-serving",
    group: "Food Holding & Serving Equipment", 
    image: "/products/food-holding-serving/hot-bain-marie-counter/main.webp",

    gallery: [
      "/products/food-holding-serving/hot-bain-marie-counter/gallery-1.webp",
      "/products/food-holding-serving/hot-bain-marie-counter/gallery-2.webp",
    ],

    shortDescription:
      "SS304 hot bain marie counter for serving and holding food at the desired temperature.",

    description:
      "Premium SS304 hot bain marie counter designed for hotels, restaurants, cafés, buffet counters and commercial kitchens. Built for continuous operation with excellent heat distribution and hygienic construction.",

    features: [
      "SS304 Stainless Steel Construction",
      "Food Grade Finish",
      "Heavy Duty Body",
      "GN Pan Compatible",
      "Thermostatic Temperature Control",
      "Easy Cleaning & Maintenance",
      "Custom Sizes Available",
    ],

    specifications: [
      {
        label: "Material",
        value: "SS304",
      },
      {
        label: "Heating",
        value: "Electric",
      },
      {
        label: "GN Pan Compatibility",
        value: "1/1, 1/2 & 1/3 GN Pans",
      },
    ],

    material: "SS304",

    customSizes: true,

    warranty: "1 Year",

    featured: true,

    seoTitle:
      "Hot Bain Marie Counter | Commercial Food Holding Equipment",

    seoDescription:
      "Premium SS304 hot bain marie counter manufactured by Anjali Equipments for commercial kitchens and buffet service.",
  },
];