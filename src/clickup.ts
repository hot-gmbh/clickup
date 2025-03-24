import { Axios } from "axios";

import { Spaces } from "./spaces/spaces";
import { Lists } from "./lists/lists";
import { Tasks } from "./tasks/tasks";
import { Folders } from "./folders/folders";

export class ClickUp {
	private axios: Axios;

	private baseUrl: string;
	private apiKey: string;

	spaces: Spaces;
	folders: Folders;
	lists: Lists;
	tasks: Tasks;

	/**
	 *
	 * @param apiKey API Key from ClickUp. For documentation on how to get this, see https://clickup.com/api
	 * @param baseUrl Base URL for the ClickUp API. Default `https://api.clickup.com/api/v2`
	 */
	constructor(apiKey: string, baseUrl?: string) {
		this.apiKey = apiKey;
		this.baseUrl = baseUrl || "https://api.clickup.com/api/v2";

		this.axios = new Axios({
			baseURL: this.baseUrl,
			headers: {
				Accept: "application/json",
				Authorization: `${this.apiKey}`,
			},
		});

		this.spaces = new Spaces(this.axios);
		this.folders = new Folders(this.axios);
		this.lists = new Lists(this.axios);
		this.tasks = new Tasks(this.axios);
	}
}
