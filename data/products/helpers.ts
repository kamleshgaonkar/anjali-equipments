import { Product } from "@/types/product";

export const manufacturedDefaults: Partial<Product> = {
  origin: "manufactured",
  material: "SS304",
  customSizes: true,
  warranty: "1 Year",
  featured: false,
  gallery: [],
  shortDescription: "",
  description: "",
  features: [],
  specifications: [],
  seoTitle: "",
  seoDescription: "",
};

export const importedDefaults: Partial<Product> = {
  origin: "imported",
  featured: false,
  gallery: [],
  shortDescription: "",
  description: "",
  features: [],
  specifications: [],
  seoTitle: "",
  seoDescription: "",
};