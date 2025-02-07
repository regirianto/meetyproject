import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/like", (req, res) => {
  const { likerId, likedId } = req.body;

  if (!likerId || !likedId) {
    return res
      .status(400)
      .json({ error: "Both likerId and likedId are required" });
  }

  // ✅ Check if the liked user also liked back (Mutual match)
  const checkMatchQuery = `SELECT * FROM likes WHERE liker_id = ? AND liked_id = ?`;

  db.query(checkMatchQuery, [likedId, likerId], (err, results) => {
    if (err) {
      console.error("❌ Database Error (Checking Match):", err.message);
      return res.status(500).json({ error: err.message });
    }

    const isMatch = results.length > 0;

    // ✅ Insert the like into the table
    const insertLikeQuery = `
      INSERT INTO likes (liker_id, liked_id, is_match) VALUES (?, ?, ?)
    `;

    db.query(insertLikeQuery, [likerId, likedId, isMatch], (err) => {
      if (err) {
        console.error("❌ Database Error (Liking User):", err.message);
        return res.status(500).json({ error: err.message });
      }

      res.json({ success: true, isMatch });
    });
  });
});

router.get("/liked-you/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT p.id AS profile_id, p.name, p.gender, p.bio,
    (SELECT image FROM gallery WHERE profile_id = p.id ORDER BY id ASC LIMIT 1) AS photo_profile
    FROM likes l
    JOIN profiles p ON l.liker_id = p.user_id
    WHERE l.liked_id = ?
    ORDER BY l.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Database Error (You Liked List):", err.message);
      return res.status(500).json({ error: err.message });
    }

    const profiles = results.map((profile) => ({
      ...profile,
      photo_profile: profile.photo_profile
        ? `http://localhost:5000/uploads/${profile.photo_profile}`
        : null,
    }));

    res.json(profiles);
  });
});

router.get("/you-liked/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT p.id AS profile_id, p.name, p.gender, p.bio,
      (SELECT image FROM gallery WHERE profile_id = p.id ORDER BY id ASC LIMIT 1) AS photo_profile
    FROM likes l
    JOIN profiles p ON l.liked_id = p.user_id
    WHERE l.liker_id = ?
    ORDER BY l.created_at DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("❌ Database Error (You Liked List):", err.message);
      return res.status(500).json({ error: err.message });
    }

    const profiles = results.map((profile) => ({
      ...profile,
      photo_profile: profile.photo_profile
        ? `http://localhost:5000/uploads/${profile.photo_profile}`
        : null,
    }));

    res.json(profiles);
  });
});

export default router;
