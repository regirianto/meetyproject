import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Register
router.post("/sign-up", async (req, res) => {
  const { username, email, phone, password } = req.body;
  console.log("Received Data: ", req.body);

  if (!username || !email || !phone || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)";
    db.query(query, [username, email, phone, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Register Successfully" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/sign-in", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(400).json({ error: "user not found" });

    const user = results[0];
    console.log("🔑 User Found:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password.");
      return res.status(401).json({ error: "Username or Password Wrong" });
    }

    // Check if the user has a profile
    const profileQuery = "SELECT * FROM profiles WHERE user_id = ?";
    db.query(profileQuery, [user.id], (err, profileResults) => {
      if (err) return res.status(500).json({ error: err.message });

      const needsProfile = profileResults.length === 0; // the mean user has no profile

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.json({
        message: "Sign-in Successfully",
        token,
        user: {
          id: user.id,
          username: user.username,
        },
        needsProfile,
      });
    });
  });
});

export default router;
