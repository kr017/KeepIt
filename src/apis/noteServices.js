import { axiosClient } from "./apiClient";

export function getAllNotes(data) {
  return axiosClient.post("/api/notes", data);
}

export function addNote(data) {
  return axiosClient.post("/api/addNotes", data);
}

export function updateNote(data) {
  return axiosClient.put("/api/updateNote", data);
}

export function deleteNote(data) {
  return axiosClient.post("/api/deleteNote", data);
}

export function getTrashNotes() {
  return axiosClient.get("/api/trashNotes");
}
