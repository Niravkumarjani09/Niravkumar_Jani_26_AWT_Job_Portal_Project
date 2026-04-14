const Application = require("../models/Application");

// Apply for Job (Student only)
const applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        // Prevent duplicate apply
        const existing = await Application.findOne({
            job: jobId,
            applicant: req.user.id
        });

        if (existing) {
            return res.status(400).json({ message: "Already applied" });
        }

        const application = new Application({
            job: jobId,
            applicant: req.user.id
        });

        await application.save();

        res.status(201).json({
            message: "Applied successfully",
            application
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// Get applications for logged-in student
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id })
            .populate("job");

        res.json(applications);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status;

        await application.save();

        res.json({
            message: "Status updated successfully",
            application
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
// ✅ Recruiter → Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job")
      .populate("applicant", "name email");

    res.json(applications);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  applyJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus
};