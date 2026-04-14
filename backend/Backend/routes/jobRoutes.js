const express = require("express");
const router = express.Router();

const { createJob, getAllJobs } = require("../controllers/jobController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// Recruiter → create job
router.post("/create", protect, authorizeRoles("recruiter"), createJob);

// ✅ Get all jobs (public or protected - your choice)
router.get("/all", getAllJobs);

module.exports = router;