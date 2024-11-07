import logo from "../../assets/logo.jpg";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducers/index.reducer.ts";
import { Item } from "@/config/types.ts";

// Define types for CartItem and NavItem

interface NavItem {
	navImage: React.ElementType;
	navName: string;
	LinkTo: string;
}

const UserNavigation = () => {
	// Typed useSelector to match RootState structure
	const { cartItems }: { cartItems: Item[] } = useSelector((state: RootState) => state.cart);
	const [cartTotal, setCartTotal] = useState<number>(0);
	const [activeNav, setActiveNav] = useState<string>("/");
	const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

	useEffect(() => {
		if (cartItems) {
			setCartTotal(
				cartItems.reduce((acc: number, item: Item) => acc + item.price * (item.quantity || 0), 0)
			);
		}
	}, [cartItems]);

	const navItems: NavItem[] = [
		{
			navImage: LuHome,
			navName: "Home",
			LinkTo: "/",
		},
		{
			navImage: IoSearch,
			navName: "Search",
			LinkTo: "/search",
		},
		{
			navImage: FaRegUser,
			navName: "Profile",
			LinkTo: "/profile",
		},
	];

	return (
		<nav>
			<div className="h-[100px] shadow-md w-screen items-center hidden sm:flex bg-blue-100">
				<img
					className="h-[55px] w-[55px] rounded-full object-cover ml-20 cursor-pointer hover:rotate-2"
					src={logo}
					alt="logo"
				/>
				<h1 className="text-3xl font-bold ml-5 cursor-pointer text-black">Restro</h1>
				<div className="ml-auto flex">
					<FaRegUser className="text-xl mx-4 cursor-pointer" />
					<BsCart3 className="text-xl mx-4 cursor-pointer" />
					<IoSearch className="text-xl mx-4 mr-20 cursor-pointer" />
				</div>
			</div>

			<div className="sm:hidden h-[70px] shadow-md w-screen flex items-center fixed bg-blue-100">
				<img
					className="h-[40px] w-[40px] rounded-full object-cover ml-7 cursor-pointer"
					src={logo}
					alt="logo"
				/>
				<h1 className="text-2xl font-bold ml-2 cursor-pointer text-black">Restro</h1>
			</div>

			<div className={`h-[50px] sm:hidden w-screen flex items-center bottom-0 fixed mb-[50px] bg-blue-400 text-white`}>
				<BsCart3 className="text-xl mx-4 cursor-pointer font-medium" />
				<p>{totalQuantity} Items | &#8377; {cartTotal}</p>
				<Link to="/cart" className=" ml-auto mx-4 font-bold">
					View Cart
				</Link>
			</div>

			<div className="sm:hidden h-[50px] shadow-lg w-screen flex items-center justify-evenly fixed bottom-0 bg-blue-100">
				{navItems.map((item, index) => (
					<Link
						to={item.LinkTo}
						key={index}
						className={`flex flex-col items-center justify-center cursor-pointer ${
							activeNav === item.LinkTo ? "text-blue-700 font-bold" : "text-black"
						}`}
						onClick={() => setActiveNav(item.LinkTo)}
					>
						<item.navImage className="text-xl font-semibold" />
						<p className="text-xs">{item.navName}</p>
					</Link>
				))}
			</div>
		</nav>
	);
};

export default UserNavigation;
