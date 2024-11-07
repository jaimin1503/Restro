import Veg from "@/assets/svgs/Veg";
import NonVeg from "@/assets/svgs/NonVeg";
import { Item } from "@/config/types";

interface ItemCardProps {
  item: Item;
  itemQuantities: { [itemId: number]: number };
  handleAddToCart: (itemId: number) => void;
  handleRemoveFromCart: (itemId: number) => void;
}
const ItemCard = ({
  item,
  itemQuantities,
  handleAddToCart,
  handleRemoveFromCart,
}: ItemCardProps) => {
  return (
    <div
      key={item.id}
      className="card-container flex items-center bg-blue-100 rounded-lg my-2 p-2 shadow-md relative"
    >
      <img
        src={item.itemImage}
        alt={item.name}
        className="card-image w-30 h-30 object-cover rounded-sm"
      />

      <div className="card-content flex flex-col flex-1 ml-4">
        <div className="font-bold text-lg">{item.name}</div>
        <div className="flex">
          <div className="text-xs flex flex-row text-gray-500">
            {item.ingredients.join(", ")}
          </div>
        </div>
        <div className="text-sm text-gray-500">₹ {item.price}</div>
        <div className="veg-indicator mt-1 absolute top-4 right-4">
          {item.veg ? <Veg /> : <NonVeg />}
        </div>

        {itemQuantities[item.id] > 0 ? (
          <div className="quantity-controls flex items-center space-x-2 mt-2 border-2 rounded-md border-red-300 w-fit">
            <button
              onClick={() => handleRemoveFromCart(item.id)}
              className=" py-1 px-2 rounded-lg text-xs font-semibold"
            >
              -
            </button>
            <span className="font-semibold">{itemQuantities[item.id]}</span>
            <button
              onClick={() => handleAddToCart(item.id)}
              className="bg- py-1 px-2 rounded-lg text-xs font-semibold "
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(item.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-lg text-xs font-semibold mt-2 w-16"
          >
            Add +
          </button>
        )}
      </div>
    </div>
  );
};
export default ItemCard;
