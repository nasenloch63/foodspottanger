export const categories = [
  "burgers",
  "menus",
  "chicken",
  "sides",
  "drinks",
] as const;
export type Category = (typeof categories)[number];
// Remplacer ces emplacements par la carte officielle, sans inventer de prix.
export const menu: {
  id: string;
  category: Category;
  image: string;
  price: string | null;
  name?: { fr: string; ary: string };
  description?: { fr: string; ary: string };
  placeholder: boolean;
}[] = categories.map((category) => ({
  id: category,
  category,
  image: `/images/${category}.svg`,
  price: null,
  placeholder: true,
}));
export const gallery = [
  // Remplacer par une photo burger
  { image: "/images/burgers.svg", key: "burger" },
  // Remplacer par une photo du restaurant
  { image: "/images/restaurant.svg", key: "restaurant" },
  // Remplacer par une photo équipe
  { image: "/images/team.svg", key: "team" },
  // Remplacer par une photo packaging
  { image: "/images/packaging.svg", key: "packaging" },
  // Remplacer par une photo commande
  { image: "/images/menus.svg", key: "order" },
  // Remplacer par une photo ambiance nocturne
  { image: "/images/night.svg", key: "night" },
  { image: "/images/sides.svg", key: "sides" },
  { image: "/images/drinks.svg", key: "drinks" },
] as const;
