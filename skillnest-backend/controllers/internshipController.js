const Internship = require("../models/Internship");

// CREATE INTERNSHIP
exports.createInternship = async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    res.json({ msg: "Internship created", internship });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL INTERNSHIPS
exports.getInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};