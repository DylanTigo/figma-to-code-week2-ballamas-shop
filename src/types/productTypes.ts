export type ProductImage = {
  url: string;
  altText: string;
  width?: number;
  height?: number;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type ProductOption = {
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  /** ex: { Size: "Small", Color: "Green" } */
  selectedOptions: Record<string, string>;
  image: ProductImage | null;
};

/** Version légère d'un produit, utilisée pour les listes (cartes) */
export type ProductSummary = {
  id: string;
  /** Partie numérique de l'id Shopify, utilisée dans l'URL */
  productId: string;
  handle: string;
  title: string;
  price: Money;
  image: ProductImage | null;
  /** Première variante disponible, utilisée pour l'ajout rapide au panier */
  defaultVariant: ProductVariant | null;
};

/** Produit complet, utilisé sur la page détail */
export type Product = ProductSummary & {
  description: string;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
};

export type Collection = {
  handle: string;
  title: string;
  count: number;
};

export type ProductPage = {
  products: ProductSummary[];
  hasNextPage: boolean;
  endCursor: string | null;
};

/** Une ligne du panier = une variante (taille / couleur) d'un produit */
export type CartItem = {
  variantId: string;
  productId: string;
  title: string;
  image: ProductImage | null;
  price: Money;
  quantity: number;
  options: Record<string, string>;
};
