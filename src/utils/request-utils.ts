import axios from "axios";
import { CacheSessionData } from "../types/session-types";
import { toast } from "react-toastify";

export const triggerSearch = async (session: CacheSessionData) => {
	if (session.type === "BAP") {
		return;
	}

	try {
		toast.info("search triggered");
		const data = {
			subscriberUrl: session.subscriberUrl,
			initiateSearch: true,
		};

		const response = await axios.post(
			`${import.meta.env.VITE_BACKEND_URL}/flow/trigger`,
			data
		);

		console.log("trigger response", response);
	} catch (e) {
		console.log("errror", e);
	}
};

export const putCacheData = async (data: any, subUrl: string) => {
	return await axios.put(
		`${import.meta.env.VITE_BACKEND_URL}/sessions`,
		{
			...data,
		},
		{
			params: {
				subscriber_url: subUrl,
			},
		}
	);
};
