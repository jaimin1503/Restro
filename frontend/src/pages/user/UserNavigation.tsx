import logo from "../../assets/logo.jpg";
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { LuHome } from "react-icons/lu";
import { BiFoodMenu } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UserNavigation = () => {
	const { cartItems, totalQuantity } = useSelector((state: any) => state.cart);
	const [cartTotal, setCartTotal] = useState(0);
	const [activeNav, setActiveNav] = useState("/");

	useEffect(() => {
		if (cartItems) {
			setCartTotal(cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0));
		}

	}, [cartItems]);

	const navItems = [
		{
			navImage: LuHome,
			navName: "Home",
			LinkTo: "/",
		},
		{
			navImage: BiFoodMenu,
			navName: "Menu",
			LinkTo: "/menu",
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
			<div className="h-[100px] shadow-md w-screen items-center hidden sm:flex bg-primary">
				<img className="h-[55px] w-[55px] rounded-full object-cover ml-20 cursor-pointer hover:rotate-2" src={logo} alt="logo" />
				<h1 className="text-3xl font-bold ml-5 cursor-pointer text-secondary">Restro</h1>
				<div className="ml-auto flex">
					<FaRegUser className="text-xl mx-4 cursor-pointer" />
					<BsCart3 className="text-xl mx-4 cursor-pointer" />
					<IoSearch className="text-xl mx-4 mr-20 cursor-pointer" />
				</div>
			</div>

			<div className="sm:hidden h-[70px] shadow-md w-screen flex items-center fixed bg-secondary">
				<img className="h-[40px] w-[40px] rounded-full object-cover ml-7 cursor-pointer" src={logo} alt="logo" />
				<h1 className="text-2xl font-bold ml-2 cursor-pointer text-white">Restro</h1>
			</div>

			<div className={`h-[50px] sm:hidden w-screen flex items-center bottom-0 fixed mb-[50px] bg-primary text-white`}>
				<BsCart3 className="text-xl mx-4 cursor-pointer font-medium" />
				<p>{totalQuantity} Items | &#8377; {cartTotal}</p>
				<p className=" ml-auto mx-4 font-bold">View Cart</p>
			</div>

			<div className="sm:hidden h-[50px] shadow-lg w-screen flex items-center justify-evenly fixed bottom-0 bg-secondary">
				{navItems.map((item, index) => (
					<div
						key={index}
						className={`flex flex-col items-center justify-center cursor-pointer ${activeNav === item.LinkTo ? "text-background font-bold" : "text-white"
							}`}
						onClick={() => setActiveNav(item.LinkTo)}
					>
						<item.navImage className="text-xl font-semibold" />
						<p className="text-xs">{item.navName}</p>
					</div>
				))}
			</div>
		</nav>
	);
};

export default UserNavigation;
