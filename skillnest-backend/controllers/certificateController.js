const PDFDocument = require("pdfkit");
const path = require("path");

const User = require("../models/User");
const Internship = require("../models/Internship");
const Task = require("../models/Task");
const Submission = require("../models/Submission");
const Badge = require("../models/Badge");

exports.generateCertificate = async (req, res) => {
  try {
    const userId = req.user.id;
    const { internshipId } = req.query;

    // 🔥 1️⃣ CHECK ALL TASKS COMPLETED

    const totalTasks = await Task.countDocuments({ internshipId });

    const completedTasks = await Submission.countDocuments({
      userId,
      internshipId,
      status: "accepted",
    });

    if (completedTasks < totalTasks) {
      return res.json({
        msg: "Complete all tasks first",
      });
    }

    // 🔥 2️⃣ FETCH DATA

    const user = await User.findById(userId);
    const internship = await Internship.findById(internshipId);

    const userName = user?.name || "User";
    const domain = internship?.title || "Web Development Intern";
    const duration = internship?.duration || "4 weeks";

    // 📄 PDF START
    const doc = new PDFDocument({ size: "A4", layout: "landscape" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=SkillNest_Certificate.pdf"
    );

    doc.pipe(res);

    // 🖼️ TEMPLATE
    const template = path.join(
      __dirname,
      "../assets/certificate-template.png"
    );

    doc.image(template, 0, 0, {
      width: doc.page.width,
      height: doc.page.height,
    });

    // 🔤 FONTS
    const playfair = path.join(
      __dirname,
      "../assets/fonts/PlayfairDisplay-Bold.ttf"
    );

    const poppins = path.join(
      __dirname,
      "../assets/fonts/Poppins-Regular.ttf"
    );

    // 📜 TEXT

    doc
      .font(poppins)
      .fontSize(20)
      .fillColor("#4B5563")
      .text("This is to certify that", 0, 190, {
        align: "center",
      });

    doc
      .font(playfair)
      .fontSize(38)
      .fillColor("#111827")
      .text(userName, 0, 220, {
        align: "center",
      });

    // 🔥 DYNAMIC UNDERLINE (NAME LENGTH BASED)
    const textWidth = doc.widthOfString(userName);
    const pageWidth = doc.page.width;

    const startX = (pageWidth - textWidth) / 2;
    const endX = (pageWidth + (textWidth / 2)) / 2;

    doc
      .moveTo(startX, 270)
      .lineTo(endX, 270)
      .lineWidth(2)
      .stroke("#2563EB");

    // 📄 DESCRIPTION
    doc
      .font(poppins)
      .fontSize(18)
      .fillColor("#374151")
      .text(
        `has successfully completed a ${duration} internship`,
        0,
        285,
        { align: "center" }
      );

    doc.text(`on ${domain}`, 0, 310, {
      align: "center",
    });

    doc.text(`from SkillNest`, 0, 335, {
      align: "center",
    });

    // 📅 DATE
    const formattedDate = new Date().toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    doc.text(formattedDate, 0, 360, {
      align: "center",
    });

    // 🏅 CREATE BADGE (ONLY ONCE)
    const existingBadge = await Badge.findOne({
      userId: req.user.id,
      title: "Internship Completed",
    });

    if (!existingBadge) {
      await Badge.create({
        userId: req.user.id,
        title: "Internship Completed",
        description: `${domain} internship completed`,
        icon: "🏅",
      });
    }

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};