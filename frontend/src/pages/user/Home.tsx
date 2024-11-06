import { Link } from "react-router-dom";
import { categories } from "../../config/data";

const Home = () => {


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
