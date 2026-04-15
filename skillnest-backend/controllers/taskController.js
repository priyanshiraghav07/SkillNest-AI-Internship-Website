const Task = require("../models/Task");

// Create task (admin)
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json({ msg: "Task created", task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tasks by internship
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      internshipId: req.params.internshipId,
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};