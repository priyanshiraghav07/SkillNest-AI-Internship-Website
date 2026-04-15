require("dotenv").config();
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

// const app = require("./app");
const app = express();

// middleware
app.use(express.json());

// Require chatbot routes
const chatRoutes = require("./routes/chat");

// DB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected 🔥"))
.catch((err) => console.log(err));

//Middleware for protected route
const authMiddleware = require("./middleware/authMiddleware");
// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You are authorized", user: req.user });
});

//cors for frontend
// const cors = require("cors");
// app.use(cors());
app.use(cors({
  origin: "*",
  // credentials: true
}));

// ROUTES YAHAN ADD KARA HAI
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/internships", require("./routes/internshipRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/submissions", require("./routes/submissionRoutes"));
app.use("/api/certificate", require("./routes/certificateRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/badges", require("./routes/badgeRoutes"));
app.use("/api/progress", require("./routes/progressRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/chat", chatRoutes);
// app.use("/api/ai", require("./routes/aiRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("SkillNest Backend Running 🚀");
});

// server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});