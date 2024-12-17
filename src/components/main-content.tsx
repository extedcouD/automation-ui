// src/components/MainContent.jsx
import { useState } from "react";
import Sidebar from "./side-bar";
import { FaHome } from "react-icons/fa";
import { TbTestPipe2Filled } from "react-icons/tb";
import { GoWorkflow } from "react-icons/go";

const MainContent = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts expanded
	const [activeTab, setActiveTab] = useState("home");
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex h-full">
			{/* Sidebar */}
			<Sidebar
				isOpen={isSidebarOpen}
				toggle={toggleSidebar}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				tabs={[
					{
						id: "home",
						label: "Discover",
						icon: <FaHome className="text-xl" />,
					},
					{
						id: "flows",
						label: "Test Flows",
						icon: <GoWorkflow className="text-xl" />,
					},
					{
						id: "test",
						label: "Unit Api Testing",
						icon: <TbTestPipe2Filled className="text-xl" />,
					},
				]}
			/>
		</div>
	);
};

export default MainContent;
