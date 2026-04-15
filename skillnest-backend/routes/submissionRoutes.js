const express = require("express");
const router = express.Router();

const { submitTask } = require("../controllers/submissionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, submitTask);

module.exports = router;