import { useState } from "react";
import { FetchFlowsResponse, Flow, SequenceStep } from "../../types/flow-types";
import InfoCard from "../ui/info-card";
import SequenceCard from "./sequence-card";

// Main component
function RenderFlows({ flows }: { flows: FetchFlowsResponse }) {
	return (
		<div>
			<InfoCard
				data={{
					Domain: "ONDC:TRV11",
					Version: "2.0.0",
					Type: "BAP",
					SessionID: "1234567890",
					ActiveFlow: "N/A",
					Envirment: "PROD",
				}}
			/>
			<div className="mt-2">
				{flows.domain.map((domain) => (
					<div key={domain.name} className="mb-8">
						{domain.flows.map((flow) => (
							<Accordion key={flow.id} flow={flow} />
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
}

function Accordion({ flow }: AccordionProps) {
	const [isOpen, setIsOpen] = useState(false);

	// Process the sequence to align steps with their pairs
	const steps = getOrderedSteps(flow.sequence);

	return (
		<div className="rounded-md border border-zinc-300 mb-4 shadow-lg">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className=" rounded-md w-full flex items-center justify-between px-4 py-3 bg-gray-100 hover:bg-gray-200"
			>
				<pre className=" text-base font-medium ">Flow Id: {flow.id}</pre>
				<svg
					className={`w-6 h-6  transform transition-transform duration-200 ${
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
			{isOpen && (
				<div className="px-4 py-5 bg-white">
					<p className="text-gray-700 mb-6">{flow.description}</p>
					<div className=" space-y-4 relative">
						{steps.map((stepPair, index) => (
							<div key={index}>
								<SequenceCard
									step={{ ...stepPair.step, state: "error" }}
									pair={{ ...stepPair.pair, state: "success" }}
									onViewDetails={() => "hello"}
								/>
								{/* {index < steps.length - 1 && (
									<div className="flex justify-center">
										<div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center shadow-sm mt-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth="2"
												stroke="currentColor"
												className="w-4 h-4 text-gray-500"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M19 9l-7 7-7-7"
												/>
											</svg>
										</div>
									</div>
								)} */}
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
