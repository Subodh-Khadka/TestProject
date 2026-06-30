const prisma = require("../config/db");

async function createDepartment(data) {
  return await prisma.department.create({ data });
}

async function getAllDepartments() {
  return await prisma.department.findMany({
    orderBy: { id: "asc" },
  });
}

async function getDepartmentById(id) {
  return await prisma.department.findUnique({
    where: { id },
  });
}

async function updateDepartment(id, data) {
  return await prisma.department.update({
    where: { id },
    data,
  });
}

async function deleteDepartment(id) {
  return await prisma.department.delete({
    where: { id },
  });
}

module.exports = {
  createDepartment,
  updateDepartment,
  getAllDepartments,
  getDepartmentById,
  deleteDepartment,
};
