import api from "./baseAPI";

export function getAllEmployees() {
  return api.get("/employees");
}

export function getEmployeeById(id) {
  return api.get(`/employees/${id}`);
}

export function createEmployee(data) {
  return api.post("/employees", data);
}

export function updateEmployee(id, data) {
  return api.put(`/employees/${id}`, data);
}

export function deleteEmployee(id) {
  return api.delete(`/employees/${id}`);
}
