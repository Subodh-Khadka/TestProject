const { z } = require("zod");

const createDesignationSchema = z.object({
  title: z.string().min(1, "Designation title is required"),
});

const updateDesignationSchema = createDesignationSchema.partial();

module.exports = { createDesignationSchema, updateDesignationSchema };
