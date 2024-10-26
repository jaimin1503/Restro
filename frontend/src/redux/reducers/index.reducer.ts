import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";

const rootReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
export default rootReducers;
