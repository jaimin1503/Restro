import logo from "../../assets/logo.jpg"
import { FaRegUser } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { BiFoodMenu } from "react-icons/bi";
import { colourTheme } from "@/config/constants";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const UserNavigation = () => {

	const { cartItems } = useSelector((state: any) => state.cart)
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		if (cartItems) {
			setCartTotal(cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0))
		}
	}, [])


	const navItems = [
		{
			navImage: GoHome,
			navName: "Home",
			LinkTo: "/"
		},
		{
			navImage: BiFoodMenu,
			navName: "Menu",
			LinkTo: "/menu"
		},
		{
			navImage: IoSearch,
			navName: "Search",
			LinkTo: "/search"
		},
		{
			navImage: FaRegUser,
			navName: "Profile",
			LinkTo: "/profile"
		},
	]
	return (
		<nav>
			<div className="h-[100px] shadow-md w-screen items-center hidden sm:flex">
				<img className="h-[55px] w-[55px] rounded-full object-cover ml-20 cursor-pointer hover:rotate-2" src={logo} alt="logo" />
				<h1 className="text-3xl font-bold ml-5 cursor-pointer">Restro</h1>
				<div className="ml-auto flex">
					<FaRegUser className="text-xl mx-4 cursor-pointer" />
					<BsCart3 className="text-xl mx-4 cursor-pointer" />
					<IoSearch className="text-xl mx-4 mr-20 cursor-pointer" />
				</div>
			</div>

			<div className="sm:hidden h-[80px] shadow-md w-screen flex items-center">
				<img className="h-[45px] w-[45px] rounded-full object-cover ml-10 cursor-pointer" src={logo} alt="logo" />
				<h1 className="text-2xl font-bold ml-5 cursor-pointer">Restro</h1>
			</div>

			<div className={`h-[50px] sm:hidden w-screen flex items-center bottom-0 fixed mb-[50px] 
				bg-${colourTheme}-400`}>
				<BsCart3 className="text-xl mx-4 cursor-pointer font-medium" />
				<p>{cartItems.length} Items | &#8377; {cartTotal}</p>

				<p className=" ml-auto mx-4 font-bold">View Cart</p>
			</div>

			<div className="sm:hidden h-[50px] shadow-lg w-screen flex items-center justify-evenly fixed bottom-0">
				{navItems.map((item, index) => (
					<div key={index} className="flex flex-col items-center justify-center cursor-pointer">
						<item.navImage className="text-xl" />
						<p className="text-xs">{item.navName}</p>
					</div>
				))}
			</div>
		</nav>
	)
}
export default UserNavigation