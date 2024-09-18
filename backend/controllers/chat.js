// controllers/chat.js
const { getHistory, addMessage } = require("../chatHistory");

// Get chat history for a specific room
exports.getChatHistory = (req, res) => {
  const { room } = req.query;
  console.log(room);
  if (room) {
    res.json(getHistory(room));
  } else {
    res.status(400).json({ error: "Room parameter is required" });
  }
};

// Post a new message to a specific room
exports.postMessage = (req, res) => {
  const { text, sender, room } = req.body;
  console.log(req.body);
  if (text && sender && room) {
    const message = { text, sender, room, timestamp: new Date() };
    addMessage(room, message);
    res.status(201).json(message);
  } else {
    res.status(400).json({ error: "Invalid message data" });
  }
};
