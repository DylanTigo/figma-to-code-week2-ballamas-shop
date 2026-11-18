import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CartItem } from "../../types/productTypes";

export type ShippingMethod = "free" | "regular" | "express";

export const SHIPPING_OPTIONS: Record<
  ShippingMethod,
  { label: string; delay: string; price: number }
> = {
  free: { label: "Free Shipping", delay: "7-30 business days", price: 0 },
  regular: { label: "Regular Shipping", delay: "3-14 business days", price: 7.5 },
  express: { label: "Express Shipping", delay: "1-3 business days", price: 22.5 },
};

/** Codes promo acceptés (démo front-end) : code -> pourcentage de réduction */
export const DISCOUNT_CODES: Record<string, number> = {
  WELCOME20: 20,
};

export type Order = {
  id: string;
  email: string;
  firstName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currencyCode: string;
  createdAt: string;
};

type Store = {
  items: CartItem[];
  discountCode: string | null;
  lastOrder: Order | null;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (variantId: string) => void;
  clearCart: () => void;
  increaseQuantity: (variantId: string) => void;
  decreaseQuantity: (variantId: string) => void;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  placeOrder: (order: Omit<Order, "id" | "createdAt">) => Order;
};

export const MAX_QUANTITY = 99;

const updateQuantity = (
  items: CartItem[],
  variantId: string,
  change: (quantity: number) => number
): CartItem[] =>
  items.map((item) =>
    item.variantId === variantId
      ? {
          ...item,
          quantity: Math.min(Math.max(change(item.quantity), 1), MAX_QUANTITY),
        }
      : item
  );

// Store du panier, sauvegardé dans le localStorage pour survivre aux rechargements
export const useCartStore = create<Store>()(
  persist(
    (set) => ({
      items: [],
      discountCode: null,
      lastOrder: null,

      addToCart: (item, quantity = 1) =>
        set((state) => {
          const exists = state.items.some((i) => i.variantId === item.variantId);
          return {
            items: exists
              ? updateQuantity(state.items, item.variantId, (q) => q + quantity)
              : [...state.items, { ...item, quantity }],
          };
        }),

      removeFromCart: (variantId) =>
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        })),

      clearCart: () => set({ items: [], discountCode: null }),

      increaseQuantity: (variantId) =>
        set((state) => ({
          items: updateQuantity(state.items, variantId, (q) => q + 1),
        })),

      decreaseQuantity: (variantId) =>
        set((state) => ({
          items: updateQuantity(state.items, variantId, (q) => q - 1),
        })),

      applyDiscountCode: (code) => {
        const normalized = code.trim().toUpperCase();
        if (!(normalized in DISCOUNT_CODES)) return false;
        set({ discountCode: normalized });
        return true;
      },

      removeDiscountCode: () => set({ discountCode: null }),

      placeOrder: (order) => {
        const fullOrder: Order = {
          ...order,
          id: Math.random().toString(36).slice(2, 10).toUpperCase(),
          createdAt: new Date().toISOString(),
        };
        set({ lastOrder: fullOrder, items: [], discountCode: null });
        return fullOrder;
      },
    }),
    {
      name: "ballamas-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // On ne sauvegarde que le panier : pas de données personnelles en local
      partialize: (state) => ({
        items: state.items,
        discountCode: state.discountCode,
      }),
    }
  )
);

// Sélecteurs dérivés
export const selectItemCount = (state: Store) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectSubtotal = (state: Store) =>
  state.items.reduce(
    (total, item) => total + item.price.amount * item.quantity,
    0
  );

export const selectDiscount = (state: Store) => {
  const percent = state.discountCode ? DISCOUNT_CODES[state.discountCode] ?? 0 : 0;
  return Math.round(selectSubtotal(state) * percent) / 100;
};

export const selectCurrency = (state: Store) =>
  state.items[0]?.price.currencyCode ?? "CAD";
