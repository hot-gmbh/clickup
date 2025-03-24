import type { Axios } from "axios";

import type { Folder } from "./types";

export class Folders {
	constructor(private axios: Axios) {}

	/**
	 * Returns a list of folders with details
	 * @param spaceId Space the folders belong to
	 * @param includeArchived Include archived folder in the response? `default: false`
	 *
	 */
	getAll(spaceId: string | number, includeArchived = false): Promise<Folder[]> {
		return new Promise<Folder[]>((resolve, reject) => {
			this.axios
				.get<Folder[]>(
					`${this.axios.defaults.baseURL}/space/${spaceId}/folder`,
					{
						params: { archived: includeArchived },
					},
				)
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data.folders);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Returns details about a specific folder
	 * @param spaceId Id of the folder
	 */
	get(folderId: string | number): Promise<Folder> {
		return new Promise<Folder>((resolve, reject) => {
			this.axios
				.get<Folder>(`${this.axios.defaults.baseURL}/folder/${folderId}`)
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
	 * Creates a new folder in a space
	 * @param spaceId Space the folder belongs to
	 * @param folderName Name of the folder to create
	 * @returns Created folder
	 */
	create(spaceId: string | number, folderName: string): Promise<Folder> {
		return new Promise<Folder>((resolve, reject) => {
			this.axios
				.post<Folder>(
					`${this.axios.defaults.baseURL}/space/${spaceId}/folder`,
					{
						name: folderName,
					},
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
	 * Creates a folder from a folder template
	 * @param spaceId Space the folder belongs to
	 * @param folderTemplateId Folder template to create the folder from
	 * @returns Created folder
	 */
	createFromTemplate(
		spaceId: string | number,
		folderTemplateId: string,
	): Promise<Folder> {
		return new Promise<Folder>((resolve, reject) => {
			this.axios
				.post<Folder>(
					`${this.axios.defaults.baseURL}/space/${spaceId}/folder_template/${folderTemplateId}`,
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
	 * Updates a folder
	 * @param folderId Folder to update
	 * @param folder Folder details to update
	 * @returns Updated folder
	 */
	update(folderId: string | number, folder: Partial<Folder>): Promise<Folder> {
		return new Promise<Folder>((resolve, reject) => {
			this.axios
				.put<Folder>(
					`${this.axios.defaults.baseURL}/folder/${folderId}`,
					folder,
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
	 * Deletes a folder
	 * @param folderId Folder to delete
	 */
	delete(folderId: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.axios
				.delete(`${this.axios.defaults.baseURL}/folder/${folderId}`)
				.then(() => {
					return resolve();
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}
}
