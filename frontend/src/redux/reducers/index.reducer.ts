import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import { Item } from "@/config/types";

const rootReducers = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});
export default rootReducers;



export interface RootState {

  auth: {
    loading: boolean;
    signupData: {
      name: string;
      email: string;
      password: string;
      phoneNumber: string;
      role: "USER" | "CHEF" | "COUNTER" | "ADMIN";
    };
    token: string;
  };
  cart:{
    cartItems:Item[]
    totalQuantity:number
  }

  total: number;

}