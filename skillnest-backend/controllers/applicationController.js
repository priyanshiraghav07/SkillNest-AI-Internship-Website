const Application = require("../models/Application");

// Apply internship
exports.applyInternship = async (req, res) => {
  try {
    const { internshipId } = req.body;

    const application = await Application.create({
      userId: req.user.id, // from auth middleware
      internshipId,
    });

    res.json({ msg: "Applied successfully", application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};