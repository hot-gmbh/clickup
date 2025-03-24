import type { Axios } from "axios";

import type { CreateTask, Task } from "./types";
import type { Member } from "../shared/types";

export class Tasks {
	constructor(private axios: Axios) {}

	/**
	 * Returns a list of tasks with details
	 * @param listId List the task belongs to
	 * @param includeArchived Include archived tasks in the response? `default: false`
	 * @returns List of tasks
	 */
	getAll(listId: string | number, includeArchived = false): Promise<Task[]> {
		return new Promise<Task[]>((resolve, reject) => {
			this.axios
				.get<Task[]>(`${this.axios.defaults.baseURL}/list/${listId}/task`, {
					params: {
						archived: includeArchived,
					},
				})
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data.tasks);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 * Returns details about a specific task
	 * @param taskId Id of the task
	 * @returns Task details
	 */
	get(taskId: string | number): Promise<Task> {
		return new Promise<Task>((resolve, reject) => {
			this.axios
				.get<Task>(`${this.axios.defaults.baseURL}/task/${taskId}`)
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
	 * Returns a list of assigned members of a task
	 * @param taskId Task id to get members of
	 * @returns List of members assigned to the task
	 */
	getMembers(taskId: string | number): Promise<Member[]> {
		return new Promise<Member[]>((resolve, reject) => {
			this.axios
				.get<Member[]>(`${this.axios.defaults.baseURL}/task/${taskId}/member`)
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
	 * Returns a list of task templates for a team
	 * @param teamId Team id to get task templates from
	 * @param page Page number to get templates from. `default: 1`
	 * @returns List of task templates
	 */
	getTaskTemplates(teamId: string | number, page = 1): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			this.axios
				.get<string[]>(
					`${this.axios.defaults.baseURL}/team/${teamId}/taskTemplate`,
					{
						params: {
							page: page,
						},
					},
				)
				.then((response) => {
					const data =
						typeof response.data === "string"
							? JSON.parse(response.data)
							: response.data;
					return resolve(data.templates);
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}

	/**
	 *  Creates a task
	 * @param listId List the task belongs to
	 * @param task Task details
	 * @returns Created task
	 */
	create(listId: string | number, task: CreateTask): Promise<Task> {
		return new Promise<Task>((resolve, reject) => {
			this.axios
				.post<Task>(`${this.axios.defaults.baseURL}/list/${listId}/task`, task)
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
	 * Creates a task from a task template
	 * @param listId List the task belongs to
	 * @param templateId Task template to create the task from
	 * @param task Task details
	 * @returns Created task
	 */
	createFromTemplate(
		listId: string | number,
		templateId: string,
		task: CreateTask,
	): Promise<Task> {
		return new Promise<Task>((resolve, reject) => {
			this.axios
				.post<Task>(
					`${this.axios.defaults.baseURL}/list/${listId}/taskTemplate/${templateId}`,
					task,
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
	 * Updates a task
	 * @param taskId Task id to update
	 * @param task Task details to update. Partial<Task> is required to update only the fields that are needed
	 * @returns Updated task details
	 */
	update(taskId: string | number, task: Partial<Task>): Promise<Task> {
		return new Promise<Task>((resolve, reject) => {
			this.axios
				.put<Task>(`${this.axios.defaults.baseURL}/task/${taskId}/`, task)
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
	 * Deletes a task
	 * @param taskId Task id to delete
	 * @returns Nothing
	 */
	delete(taskId: string | number): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.axios
				.delete<void>(`${this.axios.defaults.baseURL}/task/${taskId}/`)
				.then(() => {
					return resolve();
				})
				.catch((error) => {
					return reject(error);
				});
		});
	}
}
