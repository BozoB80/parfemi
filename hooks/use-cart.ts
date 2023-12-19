import { PriceVariant, Product } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: (Product & { priceVariant: PriceVariant})[];
  addItem: (data: Product & { priceVariant: PriceVariant}, toast: (options: { description: string }) => void) => void; // Add type for toast
  removeItem: (id: string, toast: (options: { description: string }) => void) => void; // Add type for toast
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],

    addItem: (data: Product & { priceVariant: PriceVariant}, toast) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        return toast({ description: "Povećali ste količinu artikla." });
      }

      set({ items: [...get().items, data] });
      toast({ description: "Artikal dodan u košaricu." });
    },

    removeItem: (id: string, toast) => {
      set({ items: [...get().items.filter((item) => item.id !== id)] });
      toast({ description: "Artikal uklonjen iz košarice." });
    },

    removeAll: () => set({ items: [] }),
  }), {
    name: "cart-storage",
    storage: createJSONStorage(() => localStorage),
  })
);

export default useCart;
