const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.extractSkills = async (req, res) => {
  try {
    const { text } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash", // '-latest' add karke dekho
    });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Extract technical skills from the text below. 
                Return ONLY a comma-separated list of skills. 
                Do not include any introductory text, explanations, or formatting. 
                Example output: React, Node.js, Python
       
              Text: ${text}`,
            },
          ],
        },
      ],
    });
    
    const output = result.response.text();

    if (!output) {
      return res.json({ error: "Still empty 😭" });
    }

    const skills = output.split(",").map((s) => s.trim());

    res.json({ skills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};