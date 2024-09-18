const { createRouter } = require('next-connect');
const passport = require('passport');

// Create a new router instance
const router = createRouter();

// Middleware setup
router.use(passport.initialize());
router.use(passport.session());

// GET route handler
router.get((req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

module.exports = router.handler; // Export the handler function

// // test-next-connect.js
// const nextConnect = require('next-connect');
// console.log("hello");
// const handler = nextConnect();
// console.log('nextConnect imported and used successfully!');
