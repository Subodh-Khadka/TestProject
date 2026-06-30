const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/department.controller");
const validate = require("../middlewares/validate");
const {
  createDepartmentSchema,
  updateDepartmentSchema,
} = require("../dtos/department.dto");

router.post(
  "/",
  validate(createDepartmentSchema),
  departmentController.createDepartment,
);
router.get("/", departmentController.getAllDepartments);
router.get("/:id", departmentController.getDepartmentById);
router.put(
  "/:id",
  validate(updateDepartmentSchema),
  departmentController.updateDepartment,
);
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;
