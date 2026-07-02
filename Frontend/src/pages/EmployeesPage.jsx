import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useEmployees from "../hooks/useEmployees";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeAPIService";
import Modal from "../components/shared/Modal";
import EmployeeForm from "../components/Employee/EmployeeForm";
import EmployeeTableItem from "../components/Employee/EmployeeTableItem";

export default function EmployeesPage() {
  const {
    employees,
    loading,
    error,
    createEmployeeInState,
    updateEmployeeInState,
    deleteEmployeeInState,
  } = useEmployees();

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [creatingEmployee, setCreatingEmployee] = useState(false);

  function closeModal() {
    setEditingEmployee(null);
    setCreatingEmployee(false);
  }

  async function handleSave(data) {
    if (editingEmployee) {
      const res = await updateEmployee(editingEmployee.id, data);
      updateEmployeeInState(res.data.data);
    } else {
      const res = await createEmployee(data);
      createEmployeeInState(res.data.data);
    }
    closeModal();
  }

  async function handleDelete(id) {
    const confirmed = confirm("Are you sure you want to delete this employee?");
    if (!confirmed) return;
    try {
      await deleteEmployee(id);
      deleteEmployeeInState(id);
    } catch {
      alert("Failed to delete employee");
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );

  return (
    <>
      {(creatingEmployee || editingEmployee) && (
        <Modal
          title={editingEmployee ? "Edit Employee" : "Add Employee"}
          onClose={closeModal}
        >
          <EmployeeForm
            employee={editingEmployee || null}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </Modal>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Employees</h1>
          <button
            onClick={() => setCreatingEmployee(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FiPlus size={15} /> Add Employee
          </button>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  #
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Designation
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No employees found.
                  </td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <EmployeeTableItem
                    key={emp.id}
                    employee={emp}
                    index={index}
                    onEdit={setEditingEmployee}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
