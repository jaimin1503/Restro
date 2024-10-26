import Veg from "@/assets/svgs/Veg";
import NonVeg from "@/assets/svgs/NonVeg";

const ItemCard = ({ item, itemQuantities, handleAddToCart, handleRemoveFromCart }: any) => {
	return (
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
	)
}
export default ItemCard