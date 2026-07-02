import api from "./baseAPI";

export function getAllDesignations() {
  return api.get("/designations");
}

export function getDesignationById(id) {
  return api.get(`/designations/${id}`);
}

export function createDesignation(data) {
  return api.post("/designations", data);
}

export function updateDesignation(id, data) {
  return api.put(`/designations/${id}`, data);
}

export function deleteDesignation(id) {
  return api.delete(`/designations/${id}`);
}
