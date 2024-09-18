// chatHistory.js
const chatHistory = {};

const getHistory = (room) => {
  return chatHistory[room] || [];
};

const addMessage = (room, message) => {
  if (!chatHistory[room]) {
    chatHistory[room] = [];
  }
  chatHistory[room].push(message);
};

module.exports = {
  getHistory,
  addMessage,
};
