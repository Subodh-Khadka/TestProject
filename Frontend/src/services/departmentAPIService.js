import api from "./baseAPI";

export function getAllDepartments() {
  return api.get("/departments");
}

export function getDepartmentById(id) {
  return api.get(`/departments/${id}`);
}

export function createDepartment(data) {
  return api.post("/departments", data);
}

export function updateDepartment(id, data) {
  return api.put(`/departments/${id}`, data);
}

export function deleteDepartment(id) {
  return api.delete(`/departments/${id}`);
}
