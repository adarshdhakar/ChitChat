// routes/auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users.js");
const User = require('../models/user.js');
const multer = require('multer');
const uploadImage = require('../uploadImage'); 
const { sendOTP } = require('../emailConfig'); // Import the sendOTP function
const crypto = require('crypto'); // For generating OTP

// Configure multer to handle image files
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });

// Authentication Check Route
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Signup Route with Profile Image Upload and OTP
router.post("/signup", upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let profileImageUrl = '/default_profile.png'; // Default image path

    if (req.file) {
      profileImageUrl = await uploadImage(req.file); // Upload to Cloudinary
    }

    const newUser = new User({ username, email, profileImageUrl });
    const registeredUser = await User.register(newUser, password);

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP

    // Send OTP to user's email
    await sendOTP(email, otp);
    
    // Save OTP in session or database (for simplicity, we'll use session here)
    req.session.otp = otp;
    req.session.userId = registeredUser._id;

    res.status(200).json({ message: "User registered successfully, please verify your email with the OTP." });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
});

// OTP Verification Route
router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;

  if (req.session.otp && req.session.otp === parseInt(otp, 10)) {
    // OTP is valid
    req.session.otp = null; // Clear OTP from session
    res.status(200).json({ message: "Email verified successfully!" });
  } else {
    res.status(400).json({ error: "Invalid OTP." });
  }
});

// Login Route
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: '/api/auth/login-failed',
    failureFlash: true,
  }),
  userController.login
);

// Logout Route
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

// Login Failed Route
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Login failed. Invalid credentials." });
});

module.exports = router;
