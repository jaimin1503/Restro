import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  totalQuantity: 0, // New state for total quantity
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      // Update total quantity whenever cartItems change
      state.totalQuantity = action.payload.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCartItems, setTotal, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
