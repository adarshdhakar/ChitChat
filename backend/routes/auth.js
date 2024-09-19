const express = require("express"); 
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users.js");
const User = require('../models/user.js');

router.get('/', (req, res) => {
  console.log('Auth Check:', req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

router.get("/signup", (req, res) => {
  res.redirect('/signup');  // Redirect to Next.js signup page
});

router.post("/signup", async (req, res, next) => {
  try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      
      req.login(registeredUser, (err) => {
          if (err) return next(err);
          res.status(201).json({ message: "User registered successfully", user: registeredUser });
      });
  } catch (e) {
      res.status(400).json({ error: e.message });
  }
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: "Already logged in" });
  }
  res.redirect('/');  // Redirect to Next.js login page
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: '/api/users/login-failed',
    failureFlash: true,
  }),
  userController.login
);

router.post('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({ message: 'Logged out successfully' });
    res.redirect('/');
  });
});

// Optional route to handle failed login
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Login failed. Invalid credentials." });
});

module.exports = router;


