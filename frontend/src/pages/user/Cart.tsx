import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../../redux/slices/cartSlice";

const Cart = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const dispatch = useDispatch();

	// Calculate total cost of all items in cart
	const totalCost = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

	return (
		<div className="flex flex-col items-center p-6">
			<h2 className="text-2xl font-bold mb-4">Your Cart</h2>

			{cartItems.length === 0 ? (
				<p className="text-center">Your cart is empty.</p>
			) : (
				<div className="w-full max-w-lg">
					{cartItems.map((item) => (
						<div key={item.id} className="flex items-center justify-between my-2">
							<div className="flex items-center space-x-4">
								<img src={item.itemImage} alt={item.name} className="w-16 h-16 rounded-lg" />
								<div>
									<p className="capitalize text-lg font-semibold">{item.name}</p>
									
									<p className="text-gray-500 text-sm">Price: ₹{item.price}</p>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<button onClick={() => dispatch(decrementQuantity(item.id))} className="bg-hoverColor text-white px-2 rounded">
									-
								</button>
								<span>{item.quantity}</span>
								<button onClick={() => dispatch(incrementQuantity(item.id))} className="bg-primary text-white px-2 rounded">
									+
								</button>
							</div>
							<button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-600 text-xs">
								Remove
							</button>
						</div>
					))}

					<div className="text-lg font-bold mt-4 text-right">
						Total: ₹{totalCost}
					</div>
				</div>
			)}
			<button className="bg-primary text-white px-4 py-2 rounded ml-auto mt-2">Place Order</button>
		</div>
	);
};

export default Cart;
