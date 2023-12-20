import { Brand, Category, Image, PriceVariant, Product } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStore {
  items: (Product & {images: Image[]; category: Category | null; brand: Brand | null; priceVariant: PriceVariant, quantity: number})[];
  addItem: (data: Product & {images: Image[]; category: Category | null; brand: Brand | null; priceVariant: PriceVariant}, toast: (options: { description: string }) => void, quantity?: number) => void, 
  removeItem: (id: string, toast: (options: { description: string }) => void) => void; // Add type for toast
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
    items: [],

    addItem: (data: Product & {images: Image[]; category: Category | null; brand: Brand | null; priceVariant: PriceVariant}, toast, quantity?: number) => {
      const currentItems = get().items;
      const existingItem = currentItems.find((item) => item.id === data.id);

      if (existingItem) {
        // If the item exists, update the quantity
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + (quantity || 1) };
        const updatedItems = currentItems.map((item) => (item.id === data.id ? updatedItem : item));
        set({ items: updatedItems });
        toast({ description: "Povećali ste količinu artikla." });
      } else {
        // If the item does not exist, add it with the specified quantity or default to 1
        set({
          items: [
            ...get().items,
            { ...data, quantity: quantity || 1 },
          ],
        });
        toast({ description: "Artikal dodan u košaricu." });
      }
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
