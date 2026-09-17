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
  mediaId: string | null;
  price: string | null;
  name?: { fr: string; ary: string };
  description?: { fr: string; ary: string };
  placeholder: boolean;
}[] = categories.map((category) => ({
  id: category,
  category,
  mediaId: null,
  price: null,
  placeholder: true,
}));
// For a real product, set mediaId to an approved manifest ID assigned to "menu".
// Gallery entries are populated only from approved manifest assets assigned to "gallery".
