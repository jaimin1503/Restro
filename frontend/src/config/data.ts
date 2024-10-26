import burger from "../assets/images/burger.png";
import steak from "../assets/images/steak.png";
import pizza from "../assets/images/pizza.png";
import sandwich from "../assets/images/sandwich.png";
import pancake from "../assets/images/pancake.png";
import coffee from "../assets/images/coffee.png";
import frankie from "../assets/images/frankie.png";
import salad from "../assets/images/salad.png";
import Breakfast from "@/assets/svgs/Breakfast.svg";
import Lunch from "@/assets/svgs/Lunch.svg";
import Dinner from "@/assets/svgs/Dinner.svg";

export const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "hashedpassword123",
    phoneNumber: "+1234567890",
    role: "USER",
    createdAt: "2024-10-22T10:30:00.000Z",
  },
  {
    id: 2,
    name: "Alice Chef",
    email: "alicechef@example.com",
    password: "hashedpassword456",
    phoneNumber: "+1234567891",
    role: "CHEF",
    createdAt: "2024-10-21T09:15:00.000Z",
  },
  {
    id: 3,
    name: "Bob Counter",
    email: "bobcounter@example.com",
    password: "hashedpassword789",
    phoneNumber: "+1234567892",
    role: "COUNTER",
    createdAt: "2024-10-20T08:00:00.000Z",
  },
  {
    id: 4,
    name: "Charlie Admin",
    email: "charlieadmin@example.com",
    password: "hashedpassword101",
    phoneNumber: "+1234567893",
    role: "ADMIN",
    createdAt: "2024-10-19T07:30:00.000Z",
  },
  {
    id: 5,
    name: "Eve Customer",
    email: "evecustomer@example.com",
    password: "hashedpassword202",
    phoneNumber: "+1234567894",
    role: "USER",
    createdAt: "2024-10-18T07:00:00.000Z",
  },
];

export const orders = [
  {
    id: 1,
    userId: 1,
    status: "PAID",
    createdAt: "2024-10-22T12:45:00.000Z",
    items: [
      {
        id: 1,
        itemId: 1,
        quantity: 2,
        price: 15.0,
      },
      {
        id: 2,
        itemId: 2,
        quantity: 1,
        price: 10.0,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    status: "PENDING",
    createdAt: "2024-10-22T13:30:00.000Z",
    items: [
      {
        id: 3,
        itemId: 3,
        quantity: 3,
        price: 25.5,
      },
    ],
  },
  {
    id: 3,
    userId: 3,
    status: "FAILED",
    createdAt: "2024-10-22T14:15:00.000Z",
    items: [
      {
        id: 4,
        itemId: 4,
        quantity: 1,
        price: 5.0,
      },
    ],
  },
  {
    id: 4,
    userId: 4,
    status: "PAID",
    createdAt: "2024-10-22T15:00:00.000Z",
    items: [
      {
        id: 5,
        itemId: 5,
        quantity: 2,
        price: 8.0,
      },
      {
        id: 6,
        itemId: 6,
        quantity: 1,
        price: 12.5,
      },
    ],
  },
];

export const items = [
  {
    id: 1,
    name: "Pancakes",
    ingredients: ["flour", "eggs", "sugar", "milk"],
    itemCode: "BRK001",
    itemImage: pancake,
    price: 90.0,
    veg: true,
    categories: ["breakfast"],
    orderItems: [],
  },
  {
    id: 2,
    name: "Burger",
    ingredients: ["flour", "eggs", "sugar", "milk"],
    itemCode: "LNC001",
    itemImage: burger,
    veg: true,
    price: 100.0,
    categories: ["lunch"],
    orderItems: [],
  },
  {
    id: 3,
    name: "Steak",
    ingredients: ["meat", "salt", "pepper"],
    itemCode: "DNR001",
    itemImage: steak,
    price: 2555.0,
    veg: false,
    categories: ["dinner"],
    orderItems: [],
  },
  {
    id: 4,
    name: "Coffee",
    ingredients: ["coffee", "sugar", "milk"],
    itemCode: "BRK002",
    itemImage: coffee,
    price: 150.0,
    veg: true,
    categories: ["breakfast"],
    orderItems: [],
  },
  {
    id: 5,
    name: "Sandwich",
    ingredients: ["flour", "eggs", "sugar", "veges"],
    itemCode: "LNC002",
    itemImage: sandwich,
    price: 80.0,
    veg: true,
    categories: ["lunch"],
    orderItems: [],
  },
  {
    id: 6,
    name: "Frankie",
    ingredients: ["flour", "eggs", "salt", "pepper"],
    itemCode: "DNR002",
    itemImage: frankie,
    price: 120.0,
    veg: true,
    categories: ["dinner"],
    orderItems: [],
  },
  {
    id: 7,
    name: "Salad",
    ingredients: ["veges", "salt", "pepper"],
    itemCode: "LNC003",
    itemImage: salad,
    price: 70.0,
    veg: true,
    categories: ["lunch"],
    orderItems: [],
  },
  {
    id: 8,
    name: "Pizza",
    ingredients: ["flour", "sauce", "cheese", "pepper"],
    itemCode: "DNR003",
    itemImage: pizza,
    price: 280.0,
    veg: false,
    categories: ["dinner"],
    orderItems: [],
  },
];

export const categories = [
  {
    id: 1,
    name: "breakfast",
    categoryImage: Breakfast,
  },
  {
    id: 2,
    name: "lunch",
    categoryImage: Lunch,
  },
  {
    id: 3,
    name: "dinner",
    categoryImage: Dinner,
  },
];
