const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
    required: true,
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
  },
  code: String,

  status: {
    type: String,
    default: "pending", // pending / accepted / rejected
  },

  aiResult: String,
});

module.exports = mongoose.model("Submission", submissionSchema);