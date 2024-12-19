export interface CacheSessionData {
	type: string;
	subscriberUrl: string;
	current_session_id: string;
	current_flow_id?: string;
	session_payloads: {
		[key: string]: {
			request: any;
			response: any;
		}[];
	};
}

export interface State {
	type: string;
	description: string;
	stepIndex: number;
	state?: "success" | "error" | "pending" | "inactive";
	flowId: string;
	cachedData: CacheSessionData;
}

export interface SequenceCardProps {
	step: State;
	pair?: State;
}
