import { IoSearch } from "react-icons/io5";
import { items } from "@/config/data";
import { useEffect, useState } from "react";
import { Item } from "@/config/types.ts";
import ItemCard from "@/components/ItemCard.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/reducers/index.reducer";
import { setCartItems } from "@/redux/slices/cartSlice";
import food from "../../assets/images/food.svg";


const Search = () => {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state: RootState) => state.cart.cartItems
  ) as Item[]; // Specify the type as Item[]
  const [itemQuantities, setItemQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    const quantities = cartItems.reduce(
      (acc: { [key: number]: number }, item: Item) => {
        acc[item.id] = item.quantity || 0;
        return acc;
      },
      {}
    );
    setItemQuantities(quantities);
  }, [cartItems]);

  useEffect(() => {
    // Only search if the search term length is greater than 3
    if (searchTerm.length > 1) {
      const debounceTimeout = setTimeout(() => {
        setFilteredItems(
          items.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }, 400); // Delay the search by 400ms

      // Clear the timeout if searchTerm changes
      return () => clearTimeout(debounceTimeout);
    } else {
      setFilteredItems([]); // Clear the results if the search term is 3 characters or less
    }
  }, [searchTerm]);

  console.log(filteredItems);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (itemId: number) => {
    const newItem = items.find((item) => item.id === itemId);
    const existingItem = cartItems.find((item) => item.id === itemId);

    if (newItem) {
      if (existingItem) {
        // Update quantity if item already exists
        dispatch(
          setCartItems(
            cartItems.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: (item.quantity || 0) + 1 }
                : item
            )
          )
        );
      } else {
        // Add new item if it doesn't exist
        dispatch(setCartItems([...cartItems, { ...newItem, quantity: 1 }]));
      }
    }
  };

  const handleRemoveFromCart = (itemId: number) => {
    const existingItem = cartItems.find((item) => item.id === itemId);
    if (existingItem && existingItem.quantity && existingItem.quantity > 1) {
      // Decrease quantity if more than 1
      dispatch(
        setCartItems(
          cartItems.map((item) =>
            item.id === itemId
              ? { ...item, quantity: (item.quantity || 0) - 1 }
              : item
          )
        )
      );
    } else {
      // Remove item if quantity is 1
      dispatch(setCartItems(cartItems.filter((item) => item.id !== itemId)));
    }
  };

  return (
    <div>
      <div className="bg-white fixed w-full z-10">
        <div className="search-bar relative p-2">
          <input
            type="text"
            placeholder="Search for items"
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
          <IoSearch className="absolute text-xl right-5 text-gray-400 top-1/2 transform -translate-y-1/2" />
        </div>
      </div>
      <div className="container p-2 pt-12">
        {filteredItems.length > 0 ? (
          <div>
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                itemQuantities={itemQuantities}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
        ) : (
          <div className=" flex flex-col w-full pt-40 justify-center items-center">
            <img className="w-32 " src={food} alt="food" />
            <p className="text-gray-500 text-xl font-medium">Search for delicious food items!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
