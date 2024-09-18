// routes/chat.js
const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

// Route to get chat history for a specific room
router.get("/history", chatController.getChatHistory);

// Route to post a new message
router.post("/message", chatController.postMessage);

module.exports = router;
