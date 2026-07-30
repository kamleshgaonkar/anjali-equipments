export interface ProductSpecification {
    label: string;
    value: string;
  }
  
  export interface Product {
    id: string;
  
    model: string;
  
    name: string;
  
    slug: string;
  
    category: string;
  
    image: string;
  
    gallery?: string[];
  
    shortDescription: string;
  
    description: string;
  
    features: string[];
  
    specifications: ProductSpecification[];
  
    material: "SS304" | "SS202";
  
    customSizes: boolean;
  
    warranty?: string;
  
    featured?: boolean;
  
    seoTitle?: string;
  
    seoDescription?: string;
  }