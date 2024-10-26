import UserNavigation from "./UserNavigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setCartItems } from "../../redux/slices/cartSlice";
import { useState, useEffect } from "react";
import { items } from "../../config/data";
import Veg from "@/assets/svgs/Veg";
import NonVeg from "@/assets/svgs/NonVeg";

const Order = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state: any) => state.cart);
	const [itemQuantities, setItemQuantities] = useState({});

	console.log(cartItems);

	// Update item quantities based on cart items
	useEffect(() => {
		const quantities = cartItems.reduce((acc: any, item: any) => {
			acc[item.id] = item.quantity;
			return acc;
		}, {});
		setItemQuantities(quantities);
	}, [cartItems]);

	// Function to handle adding an item to the cart
	const handleAddToCart = (itemId: number) => {
		const newItem = items.find(item => item.id === itemId);
		const existingItem = cartItems.find((item: any) => item.id === itemId);

		if (existingItem) {
			// Update quantity if item already exists
			dispatch(
				setCartItems(
					cartItems.map((item: any) =>
						item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
					)
				)
			);
		} else {
			// Add new item if it doesn't exist
			dispatch(setCartItems([...cartItems, { ...newItem, quantity: 1 }]));
		}
	};

	// Function to handle removing an item from the cart
	const handleRemoveFromCart = (itemId: number) => {
		const existingItem = cartItems.find((item: any) => item.id === itemId);
		if (existingItem && existingItem.quantity > 1) {
			// Decrease quantity if more than 1
			dispatch(
				setCartItems(
					cartItems.map((item: any) =>
						item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
					)
				)
			);
		} else {
			// Remove item if quantity is 1
			dispatch(setCartItems(cartItems.filter((item: any) => item.id !== itemId)));
		}
	};

	return (
		<div>
			<div className="p-2 ">
				{items.map((item: any) => (
					<div key={item.id} className="card-container flex items-center bg-foreground rounded-lg my-2 p-2 shadow-md relative">
						<img src={item.itemImage} alt={item.name} className="card-image w-30 h-30 object-cover rounded-sm" />

						<div className="card-content flex flex-col flex-1 ml-4">
							<div className="font-bold text-lg">{item.name}</div>
							<div className="flex">
								{item?.ingredients?.map((ingredient: any) => (
									<div key={ingredient} className="text-xs flex flex-row text-gray-500">
										{ingredient + ", "}
									</div>
								))}
							</div>
							<div className="text-sm text-gray-500">₹ {item.price}</div>
							<div className="veg-indicator mt-1 absolute top-4 right-4">
								{item.veg ? <Veg /> : <NonVeg />}
							</div>

							{itemQuantities[item.id] > 0 ? (
								<div className="quantity-controls flex items-center space-x-2 mt-2">
									<button onClick={() => handleRemoveFromCart(item.id)} className="bg-background py-1 px-2 rounded-lg text-xs font-semibold">
										-
									</button>
									<span className="font-semibold">{itemQuantities[item.id]}</span>
									<button onClick={() => handleAddToCart(item.id)} className="bg-primary py-1 px-2 rounded-lg text-xs font-semibold ">
										+
									</button>
								</div>
							) : (
								<button onClick={() => handleAddToCart(item.id)} className="bg-primary text-white py-1 px-2 rounded-lg text-xs font-semibold mt-2 w-16">
									Add +
								</button>
							)}
						</div>
					</div>


				))}
			</div>
		</div>
	);
};

export default Order;
