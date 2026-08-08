export interface ProductGroup {
    title: string;
    slug: string;
    image: string;
    description: string;
  }
  
  export interface ProductCategory {
    title: string;
    slug: string;
    heroImage: string;
    description: string;
    groups: ProductGroup[];
  }
  
  export const catalog: ProductCategory[] = [
    {
      title: "Cooking",
      slug: "cooking",
      heroImage: "/categories/cooking.jpg",
      description:
        "Commercial cooking equipment for hotels, restaurants, cafés, cloud kitchens and institutional kitchens.",
  
      groups: [
        {
          title: "Cooking Ranges",
          slug: "cooking-ranges",
          image: "/subcategories/cooking/cooking-ranges.webp",
          description:
            "Single burner to six burner commercial cooking ranges.",
        },
        {
          title: "Chinese Cooking",
          slug: "chinese-cooking",
          image: "/subcategories/cooking/chinese-cooking.webp",
          description:
            "Professional Chinese cooking ranges and wok stations.",
        },
        {
          title: "Chapati Equipment",
          slug: "chapati-equipment",
          image: "/subcategories/cooking/chapati-equipment.webp",
          description:
            "Commercial chapati plates, puffers and chapati bhattis.",
        },
        {
          title: "Griddles & Grills",
          slug: "griddles-grills",
          image: "/subcategories/cooking/griddles-grills.webp",
          description:
            "Commercial griddle plates, dosa plates and grills.",
        },
        {
          title: "Fryers",
          slug: "fryers",
          image: "/subcategories/cooking/fryers.webp",
          description:
            "Gas and electric commercial fryers.",
        },
        {
          title: "Steam Cooking",
          slug: "steam-cooking",
          image: "/subcategories/cooking/steam-cooking.webp",
          description:
            "Commercial steam cooking equipment and steamers.",
        },
      ],
    },
  ];