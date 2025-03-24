import type { Axios } from "axios";

import type { List } from "./types";
import type { Member } from "../shared/types";

export class Lists {
	constructor(private axios: Axios) {}

	/**
	 * Returns the lists of a specific folder
	 * @param folderId Folder the lists belong to
	 * @param includeArchived Include archived lists in the response? `default: false`
	 * @returns List of lists
	 */
	getAll(folderId: string | number, includeArchived = false): Promise<List[]> {
		return new Promise<List[]>((resolve, reject) => {
			this.axios
				.get<List[]>(`${this.axios.defaults.baseURL}/folder/${folderId}/list`, {
					params: { archived: includeArchived },
				})
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data.lists);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Returns details about a specific list
	 * @param listId Id of the list
	 * @returns List details
	 */
	get(listId: string | number): Promise<List> {
		return new Promise<List>((resolve, reject) => {
			this.axios
				.get<List>(`${this.axios.defaults.baseURL}/list/${listId}`)
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Returns a list of lists without folder connection
	 * @param spaceId Space the lists belong to
	 * @param includeArchived Include archived lists in the response? `default: false`
	 * @returns List of lists
	 */
	getAllFoldersLess(
		spaceId: string | number,
		includeArchived = false,
	): Promise<List[]> {
		return new Promise<List[]>((resolve, reject) => {
			this.axios
				.get<List[]>(`${this.axios.defaults.baseURL}/space/${spaceId}/list`, {
					params: { archived: includeArchived },
				})
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data.lists);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Returns a list of assigned members of a list
	 * @param listId List to get members of
	 *
	 */
	getMembers(listId: string | number): Promise<Member[]> {
		return new Promise<Member[]>((resolve, reject) => {
			this.axios
				.get<Member[]>(`${this.axios.defaults.baseURL}/list/${listId}/member`)
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data.members);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Creates a new list in a folder
	 * @param folderId Folder the list belongs to
	 * @param listName Name of the list to create
	 * @returns Created list
	 */
	create(folderId: string | number, listName: string): Promise<List> {
		return new Promise<List>((resolve, reject) => {
			this.axios
				.post<List>(`${this.axios.defaults.baseURL}/folder/${folderId}/list`, {
					name: listName,
				})
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Creates a list from a list template
	 * @param folderId Folder the list belongs to
	 * @param listTemplateId List template to create the list from
	 * @returns Created list
	 */
	createFromTemplateInFolder(
		folderId: string | number,
		listTemplateId: string,
	): Promise<List> {
		return new Promise<List>((resolve, reject) => {
			this.axios
				.post<List>(
					`${this.axios.defaults.baseURL}/folder/${folderId}/list_template/${listTemplateId}`,
				)
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Creates a list from a list template
	 * @param spaceId Space the list belongs to
	 * @param listTemplateId List template to create the list from
	 * @returns Created list
	 */
	createFromTemplateFolderLess(
		spaceId: string | number,
		listTemplateId: string,
	): Promise<List> {
		return new Promise<List>((resolve, reject) => {
			this.axios
				.post<List>(
					`${this.axios.defaults.baseURL}/space/${spaceId}/list_template/${listTemplateId}`,
				)
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	createFolderLessList(
		spaceId: string | number,
		listName: string,
	): Promise<List> {
		return new Promise<List>((resolve, reject) => {
			this.axios
				.post<List>(`${this.axios.defaults.baseURL}/space/${spaceId}/list`, {
					name: listName,
				})
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Updates a list
	 * @param listId List to update
	 * @param list List details to update
	 * @returns Updated list
	 */
	update(listId: string | number, list: Partial<List>): Promise<List> {
		return new Promise<List>((resolve, reject) => {
			this.axios
				.put<List>(`${this.axios.defaults.baseURL}/list/${listId}`, list)
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Deletes a list
	 * @param listId List to delete
	 */
	delete(listId: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.axios
				.delete(`${this.axios.defaults.baseURL}/list/${listId}`)
				.then(() => {
					return resolve();
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Adds a task to a list
	 * @param listId List to add task to
	 * @param taskId Task to add
	 * @returns Nothing
	 */
	addTask(listId: string | number, taskId: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.axios
				.post<void>(
					`${this.axios.defaults.baseURL}/list/${listId}/task/${taskId}`,
				)
				.then(() => {
					return resolve();
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Removes a task from a list
	 * @param listId List to remove task from
	 * @param taskId Task to remove
	 * @returns Nothing
	 */
	removeTask(listId: string | number, taskId: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.axios
				.delete<void>(
					`${this.axios.defaults.baseURL}/list/${listId}/task/${taskId}`,
				)
				.then(() => {
					return resolve();
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}
}
