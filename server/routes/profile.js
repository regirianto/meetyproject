import express from "express";
import db from "../config/db.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Save base-profile input
router.post("/base-profile", (req, res) => {
  console.log("Received Data: ", req.body);

  const { userId, firstName, birthDate, gender } = req.body;

  if (!userId || !firstName || !gender || !birthDate) {
    console.log("❌ Missing required fields");
    return res.status(400).json({ error: "All fields are required!" });
  }

  const query =
    "INSERT INTO profiles (user_id, name, gender, birth_date) VALUES (?, ?, ?, ?)";

  console.log("🛠 Executing Query:", query, [
    userId,
    firstName,
    gender,
    birthDate,
  ]); // ✅ Log query data

  db.query(query, [userId, firstName, gender, birthDate], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err.message);
      res.status(500).json({ error: err.message });
    }
    console.log("✅ Profile Saved:", result);
    res
      .status(201)
      .json({ message: "Profile Saved", profileId: result.insertId });
  });
});

// Save User Interests
router.post("/activity", (req, res) => {
  const { profileId, interestId } = req.body;

  if (!profileId || !interestId || !interestId.length) {
    return res
      .status(400)
      .json({ error: "Please select at least one interest" });
  }

  const values = interestId.map((interestId) => [profileId, interestId]);

  const query = "INSER INTO user_interests (profile_id, interest_id) VALUES ?";
  db.query(query, [values], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Interests Saved" });
  });
});

// Get Photo Profile

// Multer Config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Save Photo
router.post("/set-photo", upload.array("photos", 6), (req, res) => {
  const { profileId } = req.body;

  if (!profileId || !req.files.length === 0) {
    return res.status(400).json({ error: "Please select a photo" });
  }

  // Extract file path
  const photoPaths = req.files.map((file) => file.filename);

  // insert all photo into gallery table
  const values = photoPaths.map((photoPath) => [profileId, photoPath]);
  const query = "INSERT INTO gallery (profile_id, image) VALUES ?";

  db.query(query, [values], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Photo Uploaded!", uploadedFiles: photoPaths });
  });
});

export default router;
