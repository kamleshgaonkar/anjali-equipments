import { Product } from "@/types/product";
import { manufacturedDefaults, importedDefaults } from "../helpers";

export const fryers: Product[] = [
  {
    ...manufacturedDefaults,
    id: "AE-CK-024",
    model: "AE-CK-024",
    name: "Gas Fryer",
    slug: "gas-fryer",
    category: "Cooking",
    group: "Fryers",
    image: "/products/cooking/gas-fryer/hero.webp",
  },
  {
    ...importedDefaults,
    id: "AE-CK-025",
    model: "AE-CK-025",
    name: "Electric Fryer",
    slug: "electric-fryer",
    category: "Cooking",
    group: "Fryers",
    image: "/products/cooking/electric-fryer/hero.webp",
  },
];