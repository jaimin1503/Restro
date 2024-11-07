// types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "USER" | "CHEF" | "COUNTER" | "ADMIN";
  createdAt: string;
}

export interface OrderItem {
  id: number;
  itemId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  status: "PAID" | "PENDING" | "FAILED";
  createdAt: string;
  items: OrderItem[];
}

export interface Item {
  id: number;
  name: string;
  ingredients: string[];
  itemCode: string;
  itemImage: string;
  price: number;
  veg: boolean;
  categories: string[];
  orderItems: OrderItem[];
  quantity?: number;
}

export interface Category {
  id: number;
  name: string;
  categoryImage: string;
}
