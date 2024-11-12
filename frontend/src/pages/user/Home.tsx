import { Link } from "react-router-dom";
import { categories } from "../../config/data";
import { useEffect } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { setItems } from "@/redux/slices/itemSlice";
const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("useefect run")
		const fatchItem = async () => {
			try {
				console.log("inside fun run")

				const response = await axios.get(`http://localhost:3000/api/v1/item/getItemFromRedis`)
				console.log("after")

				console.log("response of getITemsFromRedis",response)
				dispatch(setItems(response.data?.items));
			} catch (error) {
				console.error
			}
		}
		fatchItem()
	}, [])

	return (
		<div className=" flex justify-evenly items-center py-5">

			{categories.map((category) => (
				<Link to={`/menu/${category.name}`} key={category.id} className="flex flex-col items-center border-2 border-blue-200 p-4 m-2 rounded-lg">
					<img src={category.categoryImage} alt="category" className="w-20 h-20" />
					<p className="capitalize text-sm">{category.name}</p>
				</Link>
			))}
		</div>
	);
};

export default Home;
