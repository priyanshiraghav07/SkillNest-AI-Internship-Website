const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  deadline: String,

  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
  },
});

module.exports = mongoose.model("Task", taskSchema);