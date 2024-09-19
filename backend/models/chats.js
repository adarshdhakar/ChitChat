const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  chatCode: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
