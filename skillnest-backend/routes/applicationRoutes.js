const express = require("express");
const router = express.Router();

const { applyInternship } = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/apply", authMiddleware, applyInternship);

module.exports = router;