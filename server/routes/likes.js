import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/like", (req, res) => {
  const { likerId, likedId } = req.body;

  console.log("🔍 Backend received Like:", { likerId, likedId }); // Debugging

  if (!likerId || !likedId) {
    return res.status(400).json({ error: "Invalid request" });
  }

  const query = `
  INSERT INTO user_likes (liker_id, liked_id, created_at)
  VALUES (?, ?, CURRENT_TIMESTAMP)
  ON DUPLICATE KEY UPDATE created_at = VALUES(created_at)
`;

  db.query(query, [likerId, likedId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Berhasil menyukai user!" });
  });
});

router.get("/liked-you/:userId", (req, res) => {
  const { userId } = req.params;

  console.log("🔍 Fetching 'Liked You' for user:", userId); // Debugging

  const query = `
    SELECT u.id, u.username, p.name, p.gender, p.birth_date, 
    TIMESTAMPDIFF(YEAR, p.birth_date, CURDATE()) AS age, p.bio, 
    (SELECT g.image FROM gallery g WHERE g.profile_id = p.id LIMIT 1) AS photo_profile
    FROM user_likes ul
    JOIN users u ON ul.liker_id = u.id
    JOIN profiles p ON u.id = p.user_id
    WHERE ul.liked_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Database Error (Liked You):", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ Liked You Data:", results);
    res.json(results);
  });
});

router.get("/you-liked/:userId", (req, res) => {
  const { userId } = req.params;

  console.log("🔍 Fetching 'Liked You' for user:", userId); // Debugging

  const query = `
    SELECT u.id, u.username, p.name, p.gender, p.birth_date,
    TIMESTAMPDIFF(YEAR, p.birth_date, CURDATE()) AS age, p.bio, 
    (SELECT g.image FROM gallery g WHERE g.profile_id = p.id LIMIT 1) AS photo_profile
    FROM user_likes ul
    JOIN users u ON ul.liked_id = u.id
    JOIN profiles p ON u.id = p.user_id
    WHERE ul.liker_id = ?;
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Database Error (You Liked):", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("✅ You Liked Data:", results);
    res.json(results);
  });
});

export default router;
