// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const userController = require("../controllers/users.js");
// const User = require('../models/user.js');

// router.get('/', (req, res) => {
//   console.log('Auth Check:', req.isAuthenticated());
//   if (req.isAuthenticated()) {
//     res.json({ isAuthenticated: true, user: req.user });
//   } else {
//     res.json({ isAuthenticated: false });
//   }
// });

// router.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = new User({ username, email });
//     const registeredUser = await User.register(newUser, password);
    
//     req.login(registeredUser, (err) => {
//       if (err) return res.status(500).json({ error: 'Login failed after registration' });
//       res.status(201).json({ message: "User registered successfully", user: registeredUser });
//     });
//   } catch (e) {
//     res.status(400).json({ error: e.message });
//   }
// });

// router.get("/login", (req, res) => {
//   if (req.isAuthenticated()) {
//     return res.status(200).json({ message: "Already logged in" });
//   }
//   res.redirect('/');  // Redirect to Next.js login page
// });

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: '/api/auth/login-failed',
//     failureFlash: true,
//   }),
//   userController.login
// );

// router.post('/logout', (req, res, next) => {
//   req.logout((err) => {
//     if (err) { return next(err); }
//     res.status(200).json({ message: 'Logged out successfully' });
//   });
// });

// router.get("/login-failed", (req, res) => {
//   res.status(401).json({ message: "Login failed. Invalid credentials." });
// });

// module.exports = router;


// routes/auth.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users.js");
const User = require('../models/user.js');
const multer = require('multer');
const path = require('path');

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/profileImages/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 1234567890.png
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

// Authentication Check Route
router.get('/', (req, res) => {
  console.log('Auth Check:', req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Signup Route with Profile Image Upload
router.post("/signup", upload.single('profileImage'), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let profileImageUrl = '/default_profile.png'; // Default image path

    if (req.file) {
      // Assuming you serve static files from 'uploads' directory
      profileImageUrl = `/uploads/profileImages/${req.file.filename}`;
    }

    const newUser = new User({ username, email, profileImageUrl });
    const registeredUser = await User.register(newUser, password);
    
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ error: 'Login failed after registration' });
      res.status(201).json({ message: "User registered successfully", user: registeredUser });
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
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
