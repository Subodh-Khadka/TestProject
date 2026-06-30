const { z } = require("zod");

// Used when creating a new employee (POST)
const createEmployeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().optional(),
  departmentId: z.number().int().positive().optional(),
  designationId: z.number().int().positive().optional(),
  managerId: z.number().int().positive().optional(),
  salary: z.number().min(0, "Salary cannot be negative").optional(),
  dateOfJoining: z.coerce.date({
    required_error: "Date of joining is required",
  }),
  status: z.enum(["active", "inactive", "terminated"]).optional(),
});

// Used when updating an employee (PUT/PATCH) - same fields, but all optional
const updateEmployeeSchema = createEmployeeSchema.partial();

module.exports = { createEmployeeSchema, updateEmployeeSchema };
