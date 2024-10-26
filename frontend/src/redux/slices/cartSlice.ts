import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  totalQuantity: 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      // Update total quantity and total whenever cartItems change
      state.totalQuantity = action.payload.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      state.total = action.payload.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    incrementQuantity(state, action) {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.total += item.price;
      }
    },
    decrementQuantity(state, action) {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.total -= item.price;
      } else {
        // If quantity is 1, remove the item from the cart
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
        state.totalQuantity -= 1;
        state.total -= item.price;
      }
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        state.totalQuantity -= item.quantity;
        state.total -= item.price * item.quantity;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      }
    },
  },
});

export const {
  setCartItems,
  setTotal,
  setLoading,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
