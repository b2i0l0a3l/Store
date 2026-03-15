import { create } from "zustand";

export type CartItem = {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  stockQuantity?: number;
};

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}


function checkQuantity(quantity: number , StockQuantity : number) {
  if(quantity > StockQuantity) {
    return StockQuantity ;
  }
  
  return quantity <= 0 ? 0 : quantity;
}

export const useStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cItem) => cItem.productId === item.productId,
      );
      if (existingItem) {
        return {
          cart: state.cart.map((cItem) =>
            cItem.productId === item.productId
              ? { ...cItem, quantity: checkQuantity((cItem.quantity || 1) + 1 , item.quantity) }
              : cItem,
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 , stockQuantity: item.quantity}] };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      cart: state.cart.map((cItem) =>
        cItem.productId === productId
          ? { ...cItem, quantity: cItem?.stockQuantity ? checkQuantity(quantity , cItem.stockQuantity ) : quantity }
          : cItem,
      ),
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((cItem) => cItem.productId !== productId),
    })),
  clearCart: () => set({ cart: [] }),
}));
