import { useState, useEffect } from "react";
import { getAllEmployees } from "../services/employeeAPIService";

export default function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllEmployees();
      setEmployees(res.data.data);
    } catch (err) {
      setError(err.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const createEmployeeInState = (newEmployee) => {
    setEmployees((prev) => [newEmployee, ...prev]);
  };

  const updateEmployeeInState = (updatedEmployee) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp,
      ),
    );
  };

  const deleteEmployeeInState = (deletedId) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== deletedId));
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    loadEmployees,
    createEmployeeInState,
    updateEmployeeInState,
    deleteEmployeeInState,
  };
}
