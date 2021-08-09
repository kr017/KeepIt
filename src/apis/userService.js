import { axiosClient } from "./apiClient";

export function checkMail(data) {
  return axiosClient.post("/user/checkMail", data);
}

export function login(data) {
  return axiosClient.post("/user/login", data);
}
