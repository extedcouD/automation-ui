import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Tab {
	id: string;
	label: string;
	icon: React.ReactElement;
}

interface SidebarProps {
	isOpen: boolean;
	toggle: () => void;
	tabs: Tab[];
	activeTab: string;
	setActiveTab: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
	isOpen,
	toggle,
	tabs,
	activeTab,
	setActiveTab,
}) => {
	return (
		<div
			className={`fixed top-16 left-0 mt-1 h-full bg-white shadow-md transition-all duration-300 ${
				isOpen ? "w-64" : "w-20"
			} flex flex-col`}
		>
			{/* Sidebar Header */}
			<div className="flex items-center justify-between p-4 border-b border-gray-200">
				<button onClick={toggle} className="text-gray-700 focus:outline-none">
					{isOpen ? <FaChevronLeft /> : <FaChevronRight />}
				</button>
			</div>

			<nav className="flex-1 mt-4">
				<ul className="space-y-2">
					{tabs.map((tab) => (
						<li key={tab.id}>
							<button
								onClick={() => {
									setActiveTab(tab.id);
								}}
								className={`relative flex items-center p-3 w-full text-gray-700 hover:bg-blue-200 hover:text-blue-700 transition-all duration-300 ease-in-out rounded-md 
                                ${
																	activeTab === tab.id
																		? "bg-blue-100 text-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
																		: "hover:shadow-[0_0_8px_rgba(59,130,246,0.4)]"
																}`}
							>
								{/* Icon */}
								<span
									className={`transition-transform duration-300 ${
										activeTab === tab.id ? "scale-110 text-blue-600" : ""
									}`}
								>
									{tab.icon}
								</span>

								{/* Label */}
								{isOpen && (
									<span
										className={`ml-3 transition-opacity duration-300 ${
											activeTab === tab.id ? "opacity-100" : "opacity-80"
										}`}
									>
										{tab.label}
									</span>
								)}

								{/* Glow Effect */}
								{activeTab === tab.id && (
									<span className="absolute inset-0 rounded-md opacity-30 animate-pulse"></span>
								)}
							</button>
						</li>
					))}
				</ul>
			</nav>

			{/* Footer */}
			<div className="p-4 border-t border-gray-200">
				{isOpen && <p className="text-gray-500 text-sm">© 2024 Your Company</p>}
			</div>
		</div>
	);
};

export default Sidebar;
