import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderItem } from "@/config/types";
interface Item {
    id?: number;
    name?: string;
    ingredients?: string[];
    itemCode?: string;
    itemImage?: string;
    price?: number;
    veg?: boolean;
    categories?: string[];
    orderItems?: OrderItem[];
    quantity?: number;
}


const initialState: Item[] = []

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Item[]>) {
            return action.payload;
            // Update total quantity and total whenever cartItems change
        },
        removeAllItems(states,action:PayloadAction<Item[]>){
            return []
        }
    },
});

export const { setItems } = itemSlice.actions;
export default itemSlice.reducer;
