const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.put("/update", async (req, res) => {
  try {
    const { email, name, role, location, company, phone, university } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name, role, location, company, phone, university },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err });
  }
});

module.exports = router;