const { z } = require("zod");

const createDepartmentSchema = z.object({
  name: z.string().min(1, "Department name is required."),
});

const updateDepartmentSchema = createDepartmentSchema.partial();

module.exports = { createDepartmentSchema, updateDepartmentSchema };
