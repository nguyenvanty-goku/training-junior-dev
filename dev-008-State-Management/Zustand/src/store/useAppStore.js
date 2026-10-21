import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createCartSlice } from './slices/cartSlice';
import { createCustomerSlice } from './slices/customerSlice';

export const useAppStore = create(
  persist(
    (...a) => ({
      ...createCartSlice(...a),
      ...createCustomerSlice(...a),
    }),
    {
      name: 'junior-ecommerce-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        customer: state.customer,
      }),
    }
  )
);

export const selectCartTotalItems = (state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrice = (state) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

