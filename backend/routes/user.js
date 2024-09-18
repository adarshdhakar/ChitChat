const express = require("express"); 
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users.js");

// Route to handle user signup (GET and POST)
router.get("/signup", (req, res) => {
  res.redirect('/signup');  // Redirect to Next.js signup page
});
router.post("/signup", userController.signup);

// Route to handle user login (GET and POST)
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ message: "Already logged in" });
  }
  res.redirect('/login');  // Redirect to Next.js login page
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: '/api/users/login-failed',
    failureFlash: true,
  }),
  userController.login
);

// Route to handle user logout (GET)
router.get("/logout", userController.logout);

// Optional route to handle failed login
router.get("/login-failed", (req, res) => {
  res.status(401).json({ message: "Login failed. Invalid credentials." });
});

module.exports = router;
