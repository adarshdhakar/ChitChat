const express = require('express');
const router = express.Router();
const User = require('../models/user');
const uploadImage = require('../uploadImage'); // Adjust the path as necessary
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});
const upload = multer({ storage });

// Get User Profile
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit User Profile
router.put('/:userId', async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { username, email },
      { new: true, runValidators: true } // Return updated document and validate fields
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User profile updated', user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Upload Profile Picture
router.post('/:userId/profile-picture', upload.single('profileImage'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const imageUrl = await uploadImage(req.file); // Upload image to Cloudinary

    user.profileImageUrl = imageUrl;
    await user.save();

    res.json({ message: 'Profile picture uploaded', profileImageUrl: imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
