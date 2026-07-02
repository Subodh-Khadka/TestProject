import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useDepartments from "../hooks/useDepartments";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentAPIService";
import Modal from "../components/shared/Modal";
import DepartmentForm from "../components/Department/DepartmentForm";
import DepartmentTableItem from "../components/Department/DepartmentTableItem";

export default function DepartmentsPage() {
  const {
    departments,
    loading,
    error,
    createDepartmentInState,
    updateDepartmentInState,
    deleteDepartmentInState,
  } = useDepartments();

  const [editingDepartment, setEditingDepartment] = useState(null);
  const [creatingDepartment, setCreatingDepartment] = useState(false);

  function closeModal() {
    setEditingDepartment(null);
    setCreatingDepartment(false);
  }

  async function handleSave(data) {
    try {
      if (editingDepartment) {
        const res = await updateDepartment(editingDepartment.id, data);
        updateDepartmentInState(res.data.data);
      } else {
        const res = await createDepartment(data);
        createDepartmentInState(res.data.data);
      }
      closeModal();
    } catch (err) {
      alert("Failed to save department. Please try again.");
    }
  }

  async function handleDelete(id) {
    const confirmed = confirm(
      "Are you sure you want to delete this department?",
    );
    if (!confirmed) return;
    try {
      await deleteDepartment(id);
      deleteDepartmentInState(id);
    } catch {
      alert("Failed to delete department");
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
      {(creatingDepartment || editingDepartment) && (
        <Modal
          title={editingDepartment ? "Edit Department" : "Add Department"}
          onClose={closeModal}
        >
          <DepartmentForm
            department={editingDepartment || null}
            onSave={handleSave}
            onCancel={closeModal}
          />
        </Modal>
      )}

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-800">Departments</h1>
          <button
            onClick={() => setCreatingDepartment(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <FiPlus size={15} /> Add Department
          </button>
        </div>

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
                  Created Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-gray-400 text-sm"
                  >
                    No departments found.
                  </td>
                </tr>
              ) : (
                departments.map((dept, index) => (
                  <DepartmentTableItem
                    key={dept.id}
                    department={dept}
                    index={index}
                    onEdit={setEditingDepartment}
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
