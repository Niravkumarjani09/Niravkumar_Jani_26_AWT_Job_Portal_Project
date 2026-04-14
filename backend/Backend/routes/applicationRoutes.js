const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus
} = require("../controllers/applicationController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

// ✅ Student → Apply Job
router.post("/apply", protect, authorizeRoles("student"), applyJob);

// ✅ Student → View My Applications
router.get("/my", protect, authorizeRoles("student"), getMyApplications);

// ✅ Recruiter → View All Applications
router.get("/all", protect, authorizeRoles("recruiter"), getAllApplications);

// ✅ Recruiter → Update Status
router.put(
  "/:id/status",
  protect,
  authorizeRoles("recruiter"),
  updateApplicationStatus
);

module.exports = router;