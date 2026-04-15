const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Submission = require("../models/Submission");
const Task = require("../models/Task");

router.get("/:internshipId", authMiddleware, async (req, res) => {
  const { internshipId } = req.params;

  const totalTasks = await Task.countDocuments({ internshipId });

  const completedTasks = await Submission.countDocuments({
    userId: req.user.id,
    internshipId,
    status: "accepted",
  });

  res.json({
    totalTasks,
    completedTasks,
    progress: Math.round((completedTasks / totalTasks) * 100),
  });
});

module.exports = router;