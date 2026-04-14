const express = require("express");
const router = express.Router();

const { getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMe);

const { registerUser, loginUser } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

const { updateProfile } = require("../controllers/authController");
router.put("/update", protect, updateProfile);

module.exports = router;