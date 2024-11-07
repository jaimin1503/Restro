import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../../redux/slices/cartSlice";
import { RootState } from "@/redux/reducers/index.reducer";

const Cart = () => {
	const  {cartItems:items}  = useSelector((state:RootState) => state.cart);
	const dispatch = useDispatch();

	// Calculate total cost of all items in cart
	const totalCost = items.reduce((acc, item) => acc + item.price * (item.quantity || 0), 0);

	return (
		<div className="flex flex-col items-center p-6">
			<h2 className="text-2xl font-bold mb-4">Your Cart</h2>

			{items.length === 0 ? (
				<p className="text-center">Your cart is empty.</p>
			) : (
				<div className="w-full max-w-lg">
					{items.map((item) => (
						<div key={item.id} className="flex items-center justify-between my-2">
							<div className="flex items-center space-x-4">
								<img src={item.itemImage} alt={item.name} className="w-16 h-16 rounded-lg" />
								<div>
									<p className="capitalize text-lg font-semibold">{item.name}</p>
									
									<p className="text-gray-500 text-sm">Price: ₹{item.price}</p>
								</div>
							</div>
							<div className="flex items-center space-x-4 border-2 border-red-300 rounded-md">
								<button onClick={() => dispatch(decrementQuantity(item.id))} className=" px-2 rounded">
									-
								</button>
								<span className="font-semibold">{item.quantity}</span>
								<button onClick={() => dispatch(incrementQuantity(item.id))} className=" px-2 rounded">
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
			{
				items.length > 0 && (<button className="bg-blue-600 text-white px-4 py-2 rounded ml-auto mt-2">Place Order</button>)
			}
		</div>
	);
};

export default Cart;
