import { Axios } from "axios";

import { List } from "./types";
import { Member } from "../shared/types";

export class Lists {
  constructor(private axios: Axios) {}

  /**
   * Returns the lists of a specific folder
   * @param folderId Folder the lists belong to
   * @param includeArchived Include archived lists in the response? `default: false`
   */
  getAll(
    folderId: string | number,
    includeArchived: boolean = false
  ): Promise<List[]> {
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
}
