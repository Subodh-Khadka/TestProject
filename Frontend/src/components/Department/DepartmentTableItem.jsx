import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function DepartmentTableItem({
  department,
  index,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-gray-500 text-sm">{index + 1}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-800">
        {department.name}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {new Date(department.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(department)}
            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <FiEdit2 size={15} />
          </button>
          <button
            onClick={() => onDelete(department.id)}
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
