import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types/productType';

interface PosStore {
  cart: Product[];
  Total: number;
  addItem: (item: Product) => void;
  removeItem: (productId: number) => void;
  removeItemByProduct: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  setCart: (params: { cart: Product[]; total?: number }) => void;
  setTotal: (total: number) => void;
  countTotal: () => number;
}

export const usePosStore = create(
  persist<PosStore>(
    (set, get) => ({
      cart: [],
      Total: 0,

      countTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

      setTotal: (total) => set({ Total: total }),

      setCart: ({ cart, total }) => set({ 
        cart, 
        Total: total !== undefined ? total : get().countTotal() 
      }),

      addItem: (item) => set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        const newTotal = state.Total + item.price;

        if (existingItem) {
          return {
            cart: state.cart.map((cartItem) =>
              cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            ),
            Total: newTotal,
          };
        }

        return {
          cart: [...state.cart, { ...item, quantity: 1 }],
          Total: newTotal,
        };
      }),

      removeItem: (productId) => set((state) => {
        const item = state.cart.find((cartItem) => cartItem.id === productId);
        if (!item) return {};
        
        return {
          cart: state.cart.filter((cartItem) => cartItem.id !== productId),
          Total: state.Total - (item.price * item.quantity),
        };
      }),

      removeItemByProduct: (product) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== product.id),
        Total: state.Total - (product.price * product.quantity),
      })),

      updateQuantity: (productId, quantity) => {
        const item = get().cart.find((cartItem) => cartItem.id === productId);
        if (!item) return;

        if (quantity <= 0) {
          get().removeItemByProduct(item);
          return;
        }

        const newTotal = get().Total - (item.price * item.quantity) + (item.price * quantity);

        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.id === productId ? { ...cartItem, quantity } : cartItem
          ),
          Total: newTotal,
        }));
      },

      clearCart: () => set({ cart: [], Total: 0 }),
    }),
    {
      name: 'pos-cart-storage',
    }
  )
);