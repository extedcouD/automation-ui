import { GoArrowSwitch } from "react-icons/go";
import { MdCheckCircle, MdError, MdHourglassEmpty } from "react-icons/md";

interface State {
	type: string;
	description: string;
	state: "success" | "error" | "pending";
	request?: any;
	response?: any;
}

interface SequenceCardProps {
	step: State;
	pair?: State;
	onViewDetails?: (item: State) => void;
}

// Reusable StateCard component
const StateCard: React.FC<{
	data: State;
	onViewDetails?: (item: State) => void;
}> = ({ data, onViewDetails }) => {
	const getStateStyles = (state: string) => {
		switch (state) {
			case "success":
				return {
					borderColor: "border-green-500",
					bgColor: "bg-green-50",
					textColor: "text-green-700",
					icon: <MdCheckCircle className="text-green-500 text-xl" />,
				};
			case "error":
				return {
					borderColor: "border-red-500",
					bgColor: "bg-red-50",
					textColor: "text-red-700",
					icon: <MdError className="text-red-500 text-xl" />,
				};
			case "pending":
				return {
					borderColor: "border-yellow-500",
					bgColor: "bg-yellow-50",
					textColor: "text-yellow-700",
					icon: <MdHourglassEmpty className="text-yellow-500 text-xl" />,
				};
			default:
				return {
					borderColor: "border-gray-300",
					bgColor: "bg-white",
					textColor: "text-gray-700",
					icon: null,
				};
		}
	};

	const styles = getStateStyles(data.state);

	return (
		<div
			className={`border ${styles.borderColor} ${styles.bgColor} rounded-md p-4 flex-1 shadow-sm`}
		>
			<div className="flex items-center mb-2">
				{styles.icon}
				<h3 className={`text-lg font-semibold ${styles.textColor} ml-2`}>
					{data.type}
				</h3>
			</div>
			<p className="text-sm text-gray-600">{data.description}</p>
			{(data.state === "success" || data.state === "error") && (
				<button
					className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
					onClick={() => onViewDetails && onViewDetails(data)}
				>
					View Request & Response
				</button>
			)}
		</div>
	);
};

function SequenceCard({ step, pair, onViewDetails }: SequenceCardProps) {
	return (
		<div className="flex items-center space-x-4 bg-white p-4 rounded-md shadow-sm border">
			{/* Step Card */}
			<StateCard data={step} onViewDetails={onViewDetails} />

			{/* Separator Icon */}
			{pair && (
				<div className="flex flex-col items-center">
					<GoArrowSwitch className="text-2xl text-gray-500 my-2" />
				</div>
			)}

			{/* Pair Card */}
			{pair && <StateCard data={pair} onViewDetails={onViewDetails} />}
		</div>
	);
}

export default SequenceCard;
