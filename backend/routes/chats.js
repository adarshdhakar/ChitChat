const express = require('express');
const router = express.Router();
const Chat = require('../models/chats.js'); // Import the Chat model

// POST /api/chats
router.post('/', async (req, res) => {
  const { chatCode } = req.body;

  if (!chatCode) {
    return res.status(400).json({ message: 'Chat code is required' });
  }

  try {
    // Check if the chat code already exists
    const existingChat = await Chat.findOne({ chatCode });
    if (existingChat) {
      return res.status(409).json({ message: 'Chat code already exists' });
    }

    // Create a new chat room
    const newChat = new Chat({ chatCode, participants: [] });
    await newChat.save();

    res.status(201).json({ chatCode: newChat.chatCode });
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/chats/:chatCode
router.get('/:chatCode', async (req, res) => {
  const { chatCode } = req.params;

  try {
    const chat = await Chat.findOne({ chatCode });
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }

    res.status(200).json({ chatCode: chat.chatCode, participants: chat.participants });
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// // Create Chat
// router.post('/', async (req, res) => {
//   try {
//     const { recipientUsername } = req.body;

//     // Assuming you have a User model where you can look up by username
//     const recipient = await User.findOne({ username: recipientUsername });

//     if (!recipient) {
//       return res.status(404).json({ error: 'Recipient not found' });
//     }

//     // Assuming the chat's participants include the current user (req.user.id)
//     const participants = [req.user.id, recipient._id];

//     const newChat = new Chat({ participants, messages: [] });
//     await newChat.save();
    
//     res.status(201).json(newChat);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Get Chats with a Person
router.get('/person/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const chats = await Chat.find({ participants: userId }).populate('participants');
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Chat
router.put('/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    const updatedChat = await Chat.findByIdAndUpdate(chatId, req.body, { new: true });
    if (!updatedChat) return res.status(404).json({ error: 'Chat not found' });
    res.json(updatedChat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Chat
router.delete('/:chatId', async (req, res) => {
  try {
    const { chatId } = req.params;
    const deletedChat = await Chat.findByIdAndDelete(chatId);
    if (!deletedChat) return res.status(404).json({ error: 'Chat not found' });
    res.json({ message: 'Chat deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
