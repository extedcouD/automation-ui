import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SidebarHeaderProps {
	isOpen: boolean;
	toggle: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, toggle }) => {
	return (
		<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
			<h1
				className={`text-lg font-semibold text-gray-800 transition-all duration-300 ${
					isOpen ? "opacity-100" : "opacity-0 translate-x-[-10px]"
				}`}
			>
				{isOpen && "Menu"}
			</h1>
			<button
				onClick={toggle}
				className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-all duration-300 shadow-sm"
				aria-label="Toggle Sidebar"
			>
				{isOpen ? <FaChevronLeft size={18} /> : <FaChevronRight size={18} />}
			</button>
		</div>
	);
};

export default SidebarHeader;
