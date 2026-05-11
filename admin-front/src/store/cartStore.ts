import { persist, createJSONStorage } from "zustand/middleware";
import type { Burger } from "@/types/Burger";
import { create } from "zustand";


interface CartItem extends Burger {
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addToCart: (burger: Burger) => void;
    increase: (id: number) => void;
    decrease: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],

            addToCart: (burger) =>
                set((state) => {
                    const exists = state.items.find(
                        (item) => item.id === burger.id
                    );

                    if (exists) {
                        return {
                            items: state.items.map((item) =>
                                item.id === burger.id
                                    ? { ...item, quantity: item.quantity + 1 }
                                    : item
                            ),
                        };
                    }

                    return {
                        items: [...state.items, { ...burger, quantity: 1 }],
                    };
                }),

            increase: (id) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                })),

            decrease: (id) =>
                set((state) => ({
                    items: state.items
                        .map((item) =>
                            item.id === id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter((item) => item.quantity > 0),
                })),

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "burger-cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
);