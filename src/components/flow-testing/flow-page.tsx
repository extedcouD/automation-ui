import { useEffect, useState } from "react";
import { FormInput } from "../ui/forms/form-input";
import FormSelect from "../ui/forms/form-select";
import GenericForm from "../ui/forms/generic-form";
import axios from "axios";
import { FetchFlowsResponse } from "../../types/flow-types";
import RenderFlows from "./render-flows";

export default function FlowContent() {
	const [step, setStep] = useState(1);
	const [session, setSession] = useState<string | null>(null);
	const [flows, setFlows] = useState<FetchFlowsResponse | null>(null);
	const onSubmit = async (data: any) => {
		try {
			console.log("data", data);
			const response = await axios.post(
				`${import.meta.env.VITE_BACKEND_URL}/sessions`,
				data
			);
			console.log("response", response.data);
			setSession(response.data.sessionId);
			setStep((s) => s + 1);
		} catch (e) {
			console.error("error while sending response", e);
		}
	};
	const fetchFlows = async () => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/flow`,
				{}
			);
			setFlows(response.data);
		} catch (e) {
			console.log("error while fetching flows", e);
		}
	};

	useEffect(() => {
		fetchFlows();
	}, []);

	switch (step) {
		case 0:
			return (
				<div className="w-full backdrop-blur-md bg-white bg-opacity-30 p-2">
					<GenericForm onSubmit={onSubmit}>
						<FormInput
							label="Enter Subscriber Url"
							name="subscriberUrl"
							required={true}
							labelInfo="your registered subscriber url"
						/>
						<FormInput
							label="Enter Subscriber ID"
							name="subscriberId"
							required={true}
						/>
						<FormSelect
							name="domain"
							label="Select Domain"
							options={["ONDC:TRV11"]}
							required
						/>
						<FormInput label="Enter Version" name="version" required={true} />
						<FormInput label="Enter City Code" name="city" required={true} />
						<FormSelect
							name="participantType"
							label="Select Type"
							options={["BAP", "BPP"]}
							required
						/>
					</GenericForm>
				</div>
			);
		case 1:
			if (!flows) return <h1>Loading...</h1>;
			return <RenderFlows flows={flows} />;
		default:
			return <h1>hello</h1>;
	}
}
