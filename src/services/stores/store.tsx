import { create } from "zustand";
import { Product } from "../../types/productTypes";

type Store = {
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getTotalPrice: () => number;
  modifyProduct: (productId: string, newProduct: Product) => void;
};

// Utilitaire pour mettre à jour les produits dans le panier
const updateProductQuantity = (
  products: Product[],
  productId: string,
  change: (quantity: number) => number
): Product[] =>
  products.map((p) =>
    p.id === productId ? { ...p, quantity: change(p.quantity || 1) } : p
  );

// Création du store Zustand
export const useCartStore = create<Store>((set, get) => ({
  products: [],

  addToCart: (product: Product) =>
    set((state) => {
      const existingItem = state.products.find((p) => p.id === product.id);
      return {
        products: existingItem
          ? updateProductQuantity(state.products, product.id, (qty) => qty + 1)
          : [
              ...state.products,
              { ...product, quantity: product.quantity || 1 },
            ],
      };
    }),

  removeFromCart: (productId: string) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== productId),
    })),

  clearCart: () =>
    set(() => ({
      products: [],
    })),

  increaseQuantity: (productId: string) =>
    set((state) => ({
      products: updateProductQuantity(
        state.products,
        productId,
        (qty) => qty + 1
      ),
    })),

  decreaseQuantity: (productId: string) =>
    set((state) => ({
      products: updateProductQuantity(state.products, productId, (qty) =>
        Math.max(qty - 1, 1)
      ),
    })),
  getTotalPrice: () => {
    const state = get();
    return state.products.reduce(
      (total, product) =>
        total + (product.amount || 0) * (product.quantity || 1),
      0
    );
  },
  modifyProduct: (productId: string, newProduct: Product) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === productId ? newProduct : p)),
    }));
  },
}));
