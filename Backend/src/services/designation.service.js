const prisma = require("../config/db");

async function createDesignation(data) {
  return await prisma.designation.create({ data });
}

async function getAllDesignations() {
  return await prisma.designation.findMany({
    orderBy: { id: "asc" },
  });
}

async function getDesignationById(id) {
  return await prisma.designation.findUnique({
    where: { id },
  });
}

async function updateDesignation(id, data) {
  return await prisma.designation.update({
    where: { id },
    data,
  });
}

async function deleteDesignation(id) {
  return await prisma.designation.delete({
    where: { id },
  });
}

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};
