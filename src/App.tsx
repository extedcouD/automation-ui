import "./App.css";
import MainContent from "./components/main-content";
import TopBar from "./components/top-bar";

function App() {
	return (
		<>
			<TopBar />
			<main className="pt-16 h-full flex">
				<MainContent />
			</main>
		</>
	);
}

export default App;
