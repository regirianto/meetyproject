import express from "express";
import db from "../config/db.js";

const router = express.Router();

// Start Chat
router.post("/start-chat", (req, res) => {
  const { user1Id, user2Id } = req.body;

  console.log("🔍 Starting chat between:", { user1Id, user2Id });

  if (!user1Id || !user2Id) {
    return res.status(400).json({ error: "Invalid request" });
  }

  // ✅ Ensure smaller user ID is always first
  if (user1Id > user2Id) {
    [user1Id, user2Id] = [user2Id, user1Id];
  }

  console.log("🔍 Starting chat between:", { user1Id, user2Id });

  const query = `
    INSERT INTO conversations (user1_id, user2_id)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
  `;

  db.query(query, [user1Id, user2Id], (err, result) => {
    if (err) {
      console.error("❌ Error creating chat:", err.message);
      return res.status(500).json({ error: err.message });
    }

    const conversationId = result.insertId;
    console.log("✅ Chat started! Conversation ID:", conversationId);
    res.json({ conversationId });
  });
});

// Get Chat Conversations
router.get("/chats/:userId", (req, res) => {
  const { userId } = req.params;

  console.log("🔍 Fetching chats for user:", userId);

  const query = `
    SELECT c.id AS conversation_id, 
           u.id AS user_id, 
           u.username, 
           p.name, 
           (SELECT text FROM messages m WHERE m.conversation_id = c.id ORDER BY m.created_at DESC LIMIT 1) AS last_message
    FROM conversations c
    JOIN users u ON (u.id = c.user1_id OR u.id = c.user2_id) AND u.id != ?
    JOIN profiles p ON u.id = p.user_id
    WHERE c.user1_id = ? OR c.user2_id = ?
    ORDER BY c.id DESC;
  `;

  db.query(query, [userId, userId, userId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching chats:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ Chats:", results);
    res.json(results);
  });
});

// Fetch all messages in a conversation
router.get("/messages/:conversationId", (req, res) => {
  const { conversationId } = req.params;

  console.log("🔍 Fetching messages for conversation:", conversationId);

  const query = `
    SELECT m.id, m.sender_id, m.text, m.created_at
    FROM messages m
    WHERE m.conversation_id = ?
    ORDER BY m.created_at ASC;
  `;

  db.query(query, [conversationId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching messages:", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("✅ Messages:", results);
    res.json(results);
  });
});

export default router;
