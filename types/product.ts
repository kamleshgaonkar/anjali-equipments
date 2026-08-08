export interface ProductSpecification {
    label: string;
    value: string;
  }
  
  export interface Product {
    id: string;
    model?: string;
    name: string;
    slug: string;
  
    category: string;
    group: string;
  
    image: string;
    gallery?: string[];
  
    shortDescription?: string;
    description?: string;
    features?: string[];
  
    specifications?: {
      label: string;
      value: string;
    }[];
  
    material?: string;
    customSizes?: boolean;
    warranty?: string;
  
    origin?: string;
  
    featured?: boolean;
  
    seoTitle?: string;
    seoDescription?: string;
  }