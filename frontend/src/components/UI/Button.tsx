interface ButtonProps {
	label: string;
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
	variant?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
}

const variants = {
	primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
	secondary: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded",
	success: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded",
	error: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
	warning: "bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded",
	info: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
};

const Button: React.FC<ButtonProps> = ({
	label,
	className = "",
	variant = "primary",
	disabled = false,
	onClick,
}) => {
	return (
		<button
			className={`btn cursor-pointer ${className} ${variants[variant]}`}
			onClick={onClick}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;
