import { useSelector, useDispatch } from "react-redux";
import { setCartItems } from "../../redux/slices/cartSlice.ts";
import { useState, useEffect } from "react";
import { items } from "../../config/data";

import { useParams } from "react-router-dom";
import ItemCard from "@/components/ItemCard.tsx";

const Menu = () => {
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state: any) => state.cart);
	const [itemQuantities, setItemQuantities] = useState({});
	const { category } = useParams();
	const [filteredItems, setFilteredItems] = useState<any[]>([]);

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

	useEffect(() => {
		const filteredItems = items.filter((item: any) => item.categories.includes(category));
		setFilteredItems(filteredItems);
	}, [category])

	return (

		<div>
			<div className="p-2 ">
				{filteredItems.map((item: any) => (
					<ItemCard key={item.id} item={item} itemQuantities={itemQuantities} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart} />
				))}
			</div>
		</div>
	)
}
export default Menu