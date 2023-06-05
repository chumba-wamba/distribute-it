import axios from "axios";

export const verifyGoogleToken = (credentialToken) => {
  console.log("here");
  const URL = `${process.env.REACT_APP_API_AUTH_URL}/token?google_token=${credentialToken}`;
  return axios.get(URL);
};

export const createTask = (access_token, task) => {
  const URL = `${process.env.REACT_APP_API_TASK_URL}/create?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.post(URL, task);
};

export const fetchAllTasks = (access_token) => {
  const URL = `${process.env.REACT_APP_API_TASK_URL}/fetch?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.get(URL);
};

export const fetchTasksUploadedByCurrentUser = (access_token) => {
  const URL = `${process.env.REACT_APP_API_TASK_URL}/fetch/current_user?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.get(URL);
};

export const fetchTasksExecutedByCurrentUser = (access_token) => {
  const URL = `${process.env.REACT_APP_API_TASK_URL}/fetch/executed_by_current_user?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.get(URL);
};

export const fetchTaskById = (access_token, id) => {
  const URL = `${process.env.REACT_APP_API_TASK_URL}/fetch/${id}?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.get(URL);
};

export const deleteTaskById = (access_token, id) => {
  const URL = `${process.env.REACT_APP_API_TASK_URL}/delete/${id}?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.get(URL);
};

export const acceptTask = (access_token, id) => {
  const URL = `${process.env.REACT_APP_API_TASK_URL}/accept/${id}?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.get(URL);
};

export const completeTask = (access_token, result, id) => {
  console.log({ result: String(result) });
  const URL = `${process.env.REACT_APP_API_TASK_URL}/complete/${id}?${process.env.REACT_APP_API_TOKEN_QUERY}=${access_token}`;
  return axios.post(URL, { result: String(result) });
};
