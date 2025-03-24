import { Axios } from "axios";

import { Folder } from "./types";

export class Folders {
  constructor(private axios: Axios) {}

  /**
   * Returns a list of folders with details
   * @param spaceId Space the folders belong to
   * @param includeArchived Include archived folder in the response? `default: false`
   *
   */
  getAll(
    spaceId: string | number,
    includeArchived: boolean = false
  ): Promise<Folder[]> {
    return new Promise<Folder[]>((resolve, reject) => {
      this.axios
        .get<Folder[]>(
          `${this.axios.defaults.baseURL}/space/${spaceId}/folder`,
          {
            params: { archived: includeArchived },
          }
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
}
