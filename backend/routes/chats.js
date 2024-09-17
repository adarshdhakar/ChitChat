const express = require("express");
const router = express.Router();

// Chat layout route
router.get("/chat", (req, res) => {
  // Sample response (you could add real-time features like WebSocket later)
  res.json({ message: "Welcome to the chat room!" });
// res.redirect('/chat');
});

module.exports = router;
