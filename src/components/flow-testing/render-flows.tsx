import { useEffect, useState } from "react";
import { FetchFlowsResponse, Flow, SequenceStep } from "../../types/flow-types";
import InfoCard from "../ui/info-card";
import SequenceCard from "./sequence-card";
import axios from "axios";
import { toast } from "react-toastify";

interface SessionData {
	city: string;
	domain: string;
	active_session_id: string;
	type: string;
	enviroment: string;
}

function RenderFlows({
	flows,
	subUrl,
}: {
	flows: FetchFlowsResponse;
	subUrl: string;
}) {
	const [sessionData, setSessionData] = useState<SessionData | null>(null);
	const [acitveFlow, setActiveFlow] = useState<string | null>(null);
	useEffect(() => {
		FetchSessionData();
	}, [subUrl]);

	useEffect(() => {
		if (acitveFlow) {
			axios
				.put(
					`${import.meta.env.VITE_BACKEND_URL}/sessions`,
					{
						flowId: acitveFlow,
					},
					{
						params: {
							subscriber_url: subUrl,
						},
					}
				)
				.then((response) => {
					toast.success(`${acitveFlow} has started`);
					console.log("response", response.data);
				})
				.catch((e) => {
					console.error("error while sending response", e);
					toast.error("Error while updating session");
				});
		}
	}, [acitveFlow, subUrl]);
	function FetchSessionData() {
		axios
			.get(`${import.meta.env.VITE_BACKEND_URL}/sessions`, {
				params: {
					subscriber_url: subUrl,
				},
			})
			.then((response) => {
				const filteredData = Object.entries(response.data)
					.filter(([key, value]) => typeof value === "string")
					.reduce((acc: any, [key, value]) => {
						acc[key] = value;
						return acc;
					}, {});
				delete filteredData["active_session_id"];
				setSessionData(filteredData);
				console.log("sessionData", filteredData);
			});
	}
	return (
		<div>
			{sessionData ? (
				<InfoCard
					data={{
						...sessionData,
						SubscriberUrl: subUrl,
						acitveFlow: acitveFlow || "N/A",
					}}
				/>
			) : (
				<div>Loading...</div>
			)}
			<div className="mt-2">
				{flows.domain.map((domain) => (
					<div key={domain.name} className="mb-8">
						{domain.flows.map((flow) => (
							<Accordion
								key={flow.id}
								flow={flow}
								acitveFlow={acitveFlow}
								setActiveFlow={setActiveFlow}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

// Accordion component for each flow
interface AccordionProps {
	flow: Flow;
	acitveFlow: string | null;
	setActiveFlow: (flowId: string | null) => void;
}

function Accordion({ flow, acitveFlow, setActiveFlow }: AccordionProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Process the sequence to align steps with their pairs
	const steps = getOrderedSteps(flow.sequence);

	const getPair = (
		stepPair: {
			step: SequenceStep;
			pair?: SequenceStep;
		},
		state: "error" | "success" | "pending"
	) => {
		if (!stepPair.pair) {
			return undefined;
		}
		return { ...stepPair.pair, state };
	};

	return (
		<div className="rounded-md border border-zinc-300 mb-4 shadow-lg w-3/5">
			{/* Flex container for header and Run button */}
			<div className="flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200">
				{/* Header button */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center justify-between flex-1"
				>
					<pre className="text-base font-medium">Flow Id: {flow.id}</pre>
					<svg
						className={`w-6 h-6 transform transition-transform duration-200 ${
							isOpen ? "rotate-180" : ""
						}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 15l7-7 7 7"
						/>
					</svg>
				</button>

				{!acitveFlow && (
					<button
						onClick={() => setActiveFlow(flow.id)}
						className=" text-sky-600 border border-sky-600 p-1 ml-4 rounded hover:bg-sky-600 hover:text-white transition-colors"
					>
						start
					</button>
				)}
				{
					// If the flow is active, show a "Stop" button instead
					acitveFlow === flow.id && (
						<button
							onClick={() => setActiveFlow(null)}
							className=" text-red-500 border border-red-500 p-1 ml-4 rounded hover:bg-red-500 hover:text-white transition-colors"
						>
							stop
						</button>
					)
				}
			</div>

			{/* Accordion content */}
			{isOpen && (
				<div className="px-4 py-5 bg-white">
					<p className="text-gray-700 mb-6">{flow.description}</p>
					<div className="space-y-4 relative">
						{steps.map((stepPair, index) => (
							<div key={index}>
								<SequenceCard
									step={{ ...stepPair.step, state: "error" }}
									pair={getPair(stepPair, "success")}
									onViewDetails={() => "hello"}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

// Component for each sequence step (with optional pair)

// Helper function to order steps and align pairs
function getOrderedSteps(sequence: SequenceStep[]): {
	step: SequenceStep;
	pair?: SequenceStep;
}[] {
	const visited = new Set<string>();
	const steps = [];

	for (const step of sequence) {
		if (visited.has(step.key)) continue;

		visited.add(step.key);

		let pairStep: SequenceStep | undefined;
		if (step.pair) {
			pairStep = sequence.find((s) => s.key === step.pair);
			if (pairStep && !visited.has(pairStep.key)) {
				visited.add(pairStep.key);
			}
		}

		steps.push({
			step,
			pair: pairStep,
		});
	}

	return steps;
}

export default RenderFlows;
