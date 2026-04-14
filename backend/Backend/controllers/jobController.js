const Job = require("../models/Job");

// Create Job (Recruiter only)
const createJob = async (req, res) => {
    try {
        const { title, company, location, type } = req.body;

        if (!title || !company || !location) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const job = new Job({
            title,
            company,
            location,
            type, // ✅ add this
            createdBy: req.user.id
        });

        await job.save();

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error("CREATE JOB ERROR:", error); // 👈 VERY IMPORTANT
        res.status(500).json({ message: "Server error" });
    }
};

// Get All Jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();

        res.json({
            count: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createJob, getAllJobs };