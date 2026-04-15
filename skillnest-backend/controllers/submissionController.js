const Submission = require("../models/Submission");
const axios = require("axios");
const Task = require("../models/Task");

exports.submitTask = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ ADD THIS
    const { taskId, code } = req.body;

    // 🔥 AI CHECK
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Check if this code is AI generated or human written. Reply only "AI" or "Human": ${code}`,
              },
            ],
          },
        ],
      }
    );

    const aiText =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    let status = "accepted";

    if (aiText && aiText.toLowerCase().includes("ai")) {
      status = "rejected";
    }

    // GET TASK TO LINK INTERNSHIP ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // 🔥 AI CHECK (already tera system me hoga)
    const aiResult = "Human"; // ya jo bhi logic hai

    if (code.length < 20 || code.includes("function add")) {
      aiResult = "AI";
    }

    const submission = await Submission.create({
      userId,
      internshipId: task.internshipId, // VERY IMPORTANT
      taskId,
      code,
      aiResult,
      status: aiResult === "AI" ? "rejected" : "accepted"
    });
  

    res.json({ msg: "Submitted", submission });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.message });
  }
};