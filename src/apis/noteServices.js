import { axiosClient } from "./apiClient";

export function getAllNotes() {
  return axiosClient.get("/api/notes");
}

export function addNote(data) {
  return axiosClient.post("/api/addNotes", data);
}

export function updateNote(data) {
  return axiosClient.put("/api/updateNote", data);
}
