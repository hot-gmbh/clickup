import { Axios } from "axios";

import { Space } from "./types";

export class Spaces {
  constructor(private axios: Axios) {}

  /**
   * Returns a list of spaces with details
   * @param teamId Team the spaces belong to
   * @param includeArchived Include archived spaces in the response? `default: false`
   *
   */
  getAll(
    teamId: string | number,
    includeArchived: boolean = false
  ): Promise<Space[]> {
    return new Promise<Space[]>(async (resolve, reject) => {
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
}
