import { useState, useEffect } from "react";
import { getAllDepartments } from "../../services/departmentAPIService";
import { getAllDesignations } from "../../services/designationAPIService";

const inputClass =
  "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400 transition-colors";

const labelClass = "block text-sm text-gray-600 mb-1";

export default function EmployeeForm({ employee, onCancel, onSave }) {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    salary: employee?.salary || "",
    dateOfJoining: employee?.dateOfJoining
      ? employee.dateOfJoining.split("T")[0]
      : "",
    status: employee?.status || "active",
    departmentId: employee?.departmentId || "",
    designationId: employee?.designationId || "",
  });

  useEffect(() => {
    getAllDepartments().then((res) => setDepartments(res.data.data));
    getAllDesignations().then((res) => setDesignations(res.data.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...formData,
      salary: formData.salary ? parseFloat(formData.salary) : undefined,
      departmentId: formData.departmentId
        ? parseInt(formData.departmentId)
        : undefined,
      designationId: formData.designationId
        ? parseInt(formData.designationId)
        : undefined,
      dateOfJoining: new Date(formData.dateOfJoining).toISOString(),
    };

    try {
      await onSave(payload);
    } catch (err) {
      setError("Failed to save. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name + Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@company.com"
            required
            className={inputClass}
          />
        </div>

        {/* Phone & Salary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9887567334"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Salary</label>
            <input
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              placeholder="50000"
              className={inputClass}
            />
          </div>
        </div>

        {/* Department + Designation */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Department</label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Designation</label>
            <select
              name="designationId"
              value={formData.designationId}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select designation</option>
              {designations.map((desig) => (
                <option key={desig.id} value={desig.id}>
                  {desig.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date of Joining + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date of Joining</label>
            <input
              name="dateOfJoining"
              type="date"
              value={formData.dateOfJoining}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : employee ? "Update" : "Add Employee"}
          </button>
        </div>
      </form>
    </>
  );
}
