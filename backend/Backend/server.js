const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Job Routes
const jobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", jobRoutes);

// Import Auth Middleware
const { protect, authorizeRoles } = require("./middleware/authMiddleware");

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Protected Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed ✅",
    user: req.user,
  });
});

// Recruiter Only Route
app.get("/api/recruiter-only", protect, authorizeRoles("recruiter"), (req, res) => {
  res.json({
    message: "Welcome Recruiter 🎉",
  });
});

// Applications Route
const applicationRoutes = require("./routes/applicationRoutes");
app.use("/api/applications", applicationRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/jobportal_project")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});