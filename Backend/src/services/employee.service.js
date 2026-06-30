const prisma = require("../config/db");

async function createEmployee(data) {
  return await prisma.employee.create({
    data,
    include: { department: true, designation: true },
  });
}

async function getAllEmployees() {
  return await prisma.employee.findMany({
    include: { department: true, designation: true },
    orderBy: { id: "asc" },
  });
}

async function getEmployeeById(id) {
  return await prisma.employee.findUnique({
    where: { id },
    include: { department: true, designation: true },
  });
}

async function updateEmployee(id, data) {
  return await prisma.employee.update({
    where: { id },
    data,
    include: { department: true, designation: true },
  });
}

async function deleteEmployee(id) {
  return await prisma.employee.delete({
    where: { id },
  });
}

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
