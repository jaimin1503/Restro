import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  total: 0,
  loading: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
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
