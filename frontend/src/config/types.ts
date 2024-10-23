export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phoneNumber: string;
  createdAt: string;
}

export interface Item {
  id: number;
  name: string;
  itemCode: string;
  itemImage: string;
  price: number;
  categories: string[];
}

export interface Order {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  items: CartItem[];
}

export interface Cart {
  cartItems: CartItem[];
  total: number;
  loading: boolean;
}
