const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
} = require("../controllers/taskController");

// admin create task
router.post("/", createTask);

// user get tasks
router.get("/:internshipId", getTasks);

module.exports = router;