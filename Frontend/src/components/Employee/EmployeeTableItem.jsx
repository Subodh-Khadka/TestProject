import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function EmployeeTableItem({
  employee,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-gray-500 text-sm">{index + 1}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-800">
        {employee.firstName} {employee.lastName}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{employee.email}</td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {employee.department?.name || "—"}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {employee.designation?.title || "—"}
      </td>
      <td className="px-4 py-3">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            employee.status === "active"
              ? "bg-green-100 text-green-700"
              : employee.status === "inactive"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {employee.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(employee)}
            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </td>
    </tr>
  );
}
