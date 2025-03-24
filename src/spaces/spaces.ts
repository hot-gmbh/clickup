import type { Axios } from "axios";

import type { CreateSpace, Space } from "./types";

export class Spaces {
	constructor(private axios: Axios) {}

	/**
	 * Returns a list of spaces with details
	 * @param teamId Team the spaces belong to
	 * @param includeArchived Include archived spaces in the response? `default: false`
	 *
	 */
	getAll(teamId: string | number, includeArchived = false): Promise<Space[]> {
		return new Promise<Space[]>((resolve, reject) => {
			this.axios
				.get<Space[]>(`/team/${teamId}/space`, {
					params: { archived: includeArchived },
				})
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data.spaces);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Returns details about a space
	 * @param spaceId Id of the space
	 */
	get(spaceId: string | number): Promise<Space> {
		return new Promise<Space>((resolve, reject) => {
			this.axios
				.get<Space>(`${this.axios.defaults.baseURL}/space/${spaceId}`)
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
	 * Creates a new space in a team
	 * @param teamId Team the space belongs to
	 * @param space Space details
	 * @returns Created space
	 */
	create(teamId: string | number, space: CreateSpace): Promise<Space> {
		return new Promise<Space>((resolve, reject) => {
			this.axios
				.post<Space>(
					`${this.axios.defaults.baseURL}/team/${teamId}/space`,
					space,
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
	 * Updates a space
	 * @param spaceId Space to update
	 * @param space Space details to update
	 * @returns Updated space
	 */
	update(spaceId: string | number, space: Partial<Space>): Promise<Space> {
		return new Promise<Space>((resolve, reject) => {
			this.axios
				.put<Space>(`${this.axios.defaults.baseURL}/space/${spaceId}`, space)
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
	 * Deletes a space
	 * @param spaceId Space to delete
	 */
	delete(spaceId: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.axios
				.delete(`${this.axios.defaults.baseURL}/space/${spaceId}`)
				.then(() => {
					return resolve();
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}
}
