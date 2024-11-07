import { useSelector, useDispatch } from "react-redux";
import { setCartItems } from "../../redux/slices/cartSlice.ts";
import { useState, useEffect } from "react";
import { items } from "../../config/data";
import { useParams } from "react-router-dom";
import ItemCard from "@/components/ItemCard.tsx";
import { RootState } from "@/redux/reducers/index.reducer.ts";
import { Item } from "@/config/types.ts";

const Menu = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector((state: RootState) => state.cart.cartItems) as Item[]; // Specify the type as Item[]
	const [itemQuantities, setItemQuantities] = useState<{ [key: number]: number }>({});
	const { category } = useParams<{ category: string }>(); // Define category as a string parameter
	const [filteredItems, setFilteredItems] = useState<Item[]>([]); // Define filteredItems type as Item[]

	// Update item quantities based on cart items
	useEffect(() => {
		const quantities = cartItems.reduce((acc: { [key: number]: number }, item: Item) => {
			acc[item.id] = item.quantity || 0;
			return acc;
		}, {});
		setItemQuantities(quantities);
	}, [cartItems]);

	// Function to handle adding an item to the cart
	const handleAddToCart = (itemId: number) => {
		const newItem = items.find(item => item.id === itemId);
		const existingItem = cartItems.find(item => item.id === itemId);

		if (newItem) {
			if (existingItem) {
				// Update quantity if item already exists
				dispatch(
					setCartItems(
						cartItems.map(item =>
							item.id === newItem.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
						)
					)
				);
			} else {
				// Add new item if it doesn't exist
				dispatch(setCartItems([...cartItems, { ...newItem, quantity: 1 }]));
			}
		}
	};

	// Function to handle removing an item from the cart
	const handleRemoveFromCart = (itemId: number) => {
		const existingItem = cartItems.find(item => item.id === itemId);
		if (existingItem && existingItem.quantity && existingItem.quantity > 1) {
			// Decrease quantity if more than 1
			dispatch(
				setCartItems(
					cartItems.map(item =>
						item.id === itemId ? { ...item, quantity: (item.quantity || 0) - 1 } : item
					)
				)
			);
		} else {
			// Remove item if quantity is 1
			dispatch(setCartItems(cartItems.filter(item => item.id !== itemId)));
		}
	};

	// Filter items based on category
	useEffect(() => {
		const filteredItems = items.filter((item: Item) => item.categories.includes(category || ""));
		setFilteredItems(filteredItems);
	}, [category]);

	return (
		<div>
			<div className="p-2">
				{filteredItems.map(item => (
					<ItemCard
						key={item.id}
						item={item}
						itemQuantities={itemQuantities}
						handleAddToCart={handleAddToCart}
						handleRemoveFromCart={handleRemoveFromCart}
					/>
				))}
			</div>
		</div>
	);
};

export default Menu;
