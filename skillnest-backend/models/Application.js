const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
  },
  status: {
    type: String,
    default: "applied", // applied / accepted / rejected
  },
});

module.exports = mongoose.model("Application", applicationSchema);