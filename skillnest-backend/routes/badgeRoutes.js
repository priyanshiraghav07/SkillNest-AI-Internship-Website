const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Badge = require("../models/Badge");

router.get("/", authMiddleware, async (req, res) => {
  const badges = await Badge.find({ userId: req.user.id });
  res.json(badges);
});

module.exports = router;