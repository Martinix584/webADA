import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  title: string;
  priceDelivery: number;
  priceTakeaway: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  deliveryMethod: "delivery" | "takeaway";
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryMethod: (method: "delivery" | "takeaway") => void;
  setCartOpen: (isOpen: boolean) => void;
  setCheckoutOpen: (isOpen: boolean) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      deliveryMethod: "delivery",
      isCartOpen: false,
      isCheckoutOpen: false,

      addItem: (item) => set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
            isCartOpen: true,
          };
        }
        return { 
          items: [...state.items, { ...item, quantity: 1 }],
          isCartOpen: true
        };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity <= 0 
          ? state.items.filter(i => i.id !== id)
          : state.items.map((i) => i.id === id ? { ...i, quantity } : i),
      })),

      clearCart: () => set({ items: [] }),

      setDeliveryMethod: (method) => set({ deliveryMethod: method }),
      
      setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      
      setCheckoutOpen: (isOpen) => set({ isCheckoutOpen: isOpen }),
    }),
    {
      name: "almacen-cart-storage",
      // Don't persist UI state like isCartOpen/isCheckoutOpen
      partialize: (state) => ({ 
        items: state.items,
        deliveryMethod: state.deliveryMethod
      }),
    }
  )
);
