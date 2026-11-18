export type NavItem = { label: string; to: string };

export const LEFT_NAV: NavItem[] = [
  { label: "Men", to: "/?collection=men#products" },
  { label: "Women", to: "/?collection=women#products" },
  { label: "Unisex", to: "/?collection=unisex#products" },
  { label: "Collection", to: "/?collection=featured#products" },
];

export const SHOP_LINK: NavItem = { label: "Shop", to: "/#products" };
