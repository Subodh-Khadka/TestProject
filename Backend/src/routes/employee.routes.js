const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee.controller");
const validate = require("../middlewares/validate");
const {
  createEmployeeSchema,
  updateEmployeeSchema,
} = require("../dtos/employee.dto");

router.post(
  "/",
  validate(createEmployeeSchema),
  employeeController.createEmployee,
);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put(
  "/:id",
  validate(updateEmployeeSchema),
  employeeController.updateEmployee,
);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
