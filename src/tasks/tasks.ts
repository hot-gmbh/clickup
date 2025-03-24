import { Axios } from "axios";

import { Task } from "./types";
import { Member } from "../shared/types";

export class Tasks {
  constructor(private axios: Axios) {}

  /**
   * Returns a list of tasks with details
   * @param listId List the task belongs to
   * @param includeArchived Include archived tasks in the response? `default: false`
   *
   */
  getAll(
    listId: string | number,
    includeArchived: boolean = false
  ): Promise<Task[]> {
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
   *
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
}
