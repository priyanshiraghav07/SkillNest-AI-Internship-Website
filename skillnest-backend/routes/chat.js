const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({ reply: "Please enter a message." });
    }

    // ✅ MODEL PEHLE DEFINE
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // ✅ DIRECT CALL (NO RETRY)
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // ✅ EMPTY HANDLE
    if (!text || text.trim() === "") {
      return res.json({
        reply: "Try asking something related to internships 😊",
      });
    }

    res.json({ reply: text });

  } catch (err) {
    console.log("AI ERROR:", err);

    // 🔥 FALLBACK (IMPORTANT FOR DEMO)
    res.json({
      reply:
        "You can explore frontend, backend, or AI internships based on your skills 🚀",
    });
  }
});

module.exports = router;