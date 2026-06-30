const designationService = require("../services/designation.service");

async function createDesignation(req, res) {
  try {
    const designation = await designationService.createDesignation(req.body);
    res.status(201).json({
      success: true,
      message: "Designation created successfully",
      data: designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create designation",
      error: error.message,
    });
  }
}

async function getAllDesignations(req, res) {
  try {
    const designations = await designationService.getAllDesignations();
    res.status(200).json({
      success: true,
      data: designations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch designations",
      error: error.message,
    });
  }
}

async function getDesignationById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const designation = await designationService.getDesignationById(id);

    if (!designation) {
      return res.status(404).json({
        success: false,
        message: "Designation not found",
      });
    }

    res.status(200).json({
      success: true,
      data: designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch designation",
      error: error.message,
    });
  }
}

async function updateDesignation(req, res) {
  try {
    const id = parseInt(req.params.id);
    const designation = await designationService.updateDesignation(
      id,
      req.body,
    );
    res.status(200).json({
      success: true,
      message: "Designation updated successfully",
      data: designation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update designation",
      error: error.message,
    });
  }
}

async function deleteDesignation(req, res) {
  try {
    const id = parseInt(req.params.id);
    await designationService.deleteDesignation(id);
    res.status(200).json({
      success: true,
      message: "Designation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete designation",
      error: error.message,
    });
  }
}

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};
