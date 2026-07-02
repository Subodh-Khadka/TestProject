import { useState, useEffect } from "react";
import { getAllDepartments } from "../services/departmentAPIService";

export default function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDepartments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllDepartments();
      setDepartments(res.data.data);
    } catch (err) {
      setError(err.message || "Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const createDepartmentInState = (newDepartment) => {
    setDepartments((prev) => [newDepartment, ...prev]);
  };

  const updateDepartmentInState = (updatedDepartment) => {
    setDepartments((prev) =>
      prev.map((dep) =>
        dep.id === updatedDepartment.id ? updatedDepartment : dep,
      ),
    );
  };

  const deleteDepartmentInState = (deletedId) => {
    setDepartments((prev) => prev.filter((dep) => dep.id !== deletedId));
  };

  useEffect(() => {
    getAllDepartments()
      .then((res) => setDepartments(res.data.data))
      .catch((err) => setError(err.message || "Failed to load departments"))
      .finally(() => setLoading(false));
  }, []);

  return {
    departments,
    loading,
    error,
    loadDepartments,
    createDepartmentInState,
    updateDepartmentInState,
    deleteDepartmentInState,
  };
}
