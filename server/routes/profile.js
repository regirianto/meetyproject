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

// Get all interests
router.get("/interests", (req, res) => {
  const query = "SELECT * FROM interests";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Save User Interests
router.post("/activity", (req, res) => {
  console.log("Recieved Data: ", req.body);

  const { profileId, interestId } = req.body;

  if (!profileId || !interestId || !interestId.length) {
    console.log("❌ Missing data: ", req.body);
    return res
      .status(400)
      .json({ error: "Please select at least one interest" });
  }

  const values = interestId.map((interestId) => [profileId, interestId]);

  const query = "INSERT INTO user_interests (profile_id, interest_id) VALUES ?";
  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("❌ Database Error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Interests Saved:", result);
    res.status(201).json({ message: "Interests saved!" });
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

  if (!profileId || !req.files || !req.files.length === 0) {
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

// Profile Page
router.get("/user-profile/:userId", (req, res) => {
  const { userId } = req.params;

  // fetch profile details
  const profileQuery = `
    SELECT p.id AS profile_id, p.name, p.birth_date, p.gender, COALESCE(p.bio, 'Add bio') AS bio, COALESCE(p.about, 'Add your profile') AS about, p.last_active_at FROM profiles p WHERE p.user_id = ?
  `;

  db.query(profileQuery, [userId], (err, profileResults) => {
    if (err) {
      console.error("❌ Database Error (Profile):", err.message);
      return res.status(500).json({ error: err.message });
    }
    if (profileResults.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    let profile = profileResults[0];

    // Convert birth_date to age
    const birthDate = new Date(profile.birth_date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    profile.age = age;
    delete profile.birth_date;

    // fetch first profile photo
    const photoQuery = `
      SELECT image FROM gallery WHERE profile_id = ? ORDER BY id ASC LIMIT 1
    `;

    db.query(photoQuery, [profile.profile_id], (err, photoResults) => {
      if (err) {
        console.error("❌ Database Error (Photo):", err.message);
        return res.status(500).json({ error: err.message });
      }

      profile.photo_profile =
        photoResults.length > 0
          ? `http://localhost:5000/uploads/${photoResults[0].image}`
          : null;

      // Fetch user interest
      const interestsQuery = `
        SELECT i.id, i.interest_name FROM user_interests ui JOIN interests i ON ui.interest_id = i.id WHERE ui.profile_id = ?
      `;

      db.query(
        interestsQuery,
        [profile.profile_id],
        (err, interestsResults) => {
          if (err) {
            console.error("❌ Database Error (Interests):", err.message);
            return res.status(500).json({ error: err.message });
          }

          profile.interests = interestsResults;

          // all gallery
          const galleryQuery = `
            SELECT image FROM gallery WHERE profile_id = ? ORDER BY id DESC
          `;

          db.query(
            galleryQuery,
            [profile.profile_id],
            (err, galleryResults) => {
              if (err) {
                console.error("❌ Database Error (Gallery):", err.message);
                return res.status(500).json({ error: err.message });
              }

              profile.gallery = galleryResults.map(
                (img) => `http://localhost:5000/uploads/${img.image}`
              );

              // Return profile
              res.json(profile);
            }
          );
        }
      );
    });
  });
});

export default router;
