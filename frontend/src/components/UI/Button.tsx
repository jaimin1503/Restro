
interface ButtonProps {
	lable: String,
	className: String,
	disbled: Boolean,
	onClick: Function,
	variant: String
}

const variants = {
	primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
	secondary: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
	success: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
	error: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
	warning: "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded",
	info: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
}

const Button: React.FC<ButtonProps> = ({ lable, className = "", variant = "primary", disbled = false, onClick }) => {
	return (
		<button className={`btn ${className} ${variants[variant]} `} onClick={onClick} disabled={disbled}>
			{lable}
		</button>
	)
}
export default Button

