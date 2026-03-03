import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existIndex = state.cartItems.findIndex((p) => p.id === item.id);

      if (existIndex !== -1) {
        // If item exists, replace it with the updated one
        state.cartItems[existIndex] = item;
      } else {
        // If it doesn't exist, just push it to the array
        state.cartItems.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
export default cartSlice.reducer;
