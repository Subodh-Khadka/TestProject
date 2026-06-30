const express = require("express");
const router = express.Router();

const designationController = require("../controllers/designation.controller");
const validate = require("../middlewares/validate");
const {
  createDesignationSchema,
  updateDesignationSchema,
} = require("../dtos/designation.dto");

router.post(
  "/",
  validate(createDesignationSchema),
  designationController.createDesignation,
);
router.get("/", designationController.getAllDesignations);
router.get("/:id", designationController.getDesignationById);
router.put(
  "/:id",
  validate(updateDesignationSchema),
  designationController.updateDesignation,
);
router.delete("/:id", designationController.deleteDesignation);

module.exports = router;
