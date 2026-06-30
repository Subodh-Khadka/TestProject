const express = require("express");
const cors = require("cors");
require("dotenv").config();

const employeeRoutes = require("./src/routes/employee.routes");
const departmentRoutes = require("./src/routes/department.routes");
const designationRoutes = require("./src/routes/designation.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Employee Management API is running");
});

// Employee routes
app.use("/api/employees", employeeRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/designations", designationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
