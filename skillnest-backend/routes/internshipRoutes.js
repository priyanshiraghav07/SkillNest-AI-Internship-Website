const express = require("express");
const router = express.Router();

const { createInternship, getInternships } = require("../controllers/internshipController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// CREATE (Protected)
// router.post("/", authMiddleware, createInternship);
router.post("/", authMiddleware, adminMiddleware, createInternship);

// GET ALL
router.get("/", getInternships);

module.exports = router;