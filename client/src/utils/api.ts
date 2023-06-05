import axios, { AxiosResponse } from "axios";

export const fetchAllTasks = (): Promise<AxiosResponse<any>> => {
  const URL = "http://localhost:5000/task/fetch";
  return axios.get(URL);
};
