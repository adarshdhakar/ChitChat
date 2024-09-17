// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const userRouter = require('./routes/user');
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Allow requests from Next.js frontend
app.use(express.json()); // For parsing application/json

// Connect to MongoDB
const MONGO_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/messenger";

main()
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  },
};

// Apply middlewares
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(
  async (email, password, done) => {
      try {
          const user = await User.findOne({ email });
          if (!user) {
              return done(null, false, { message: 'Incorrect email.' });
          }
          const isMatch = await user.authenticate(password); // Assuming you have this method
          if (!isMatch) {
              return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
      } catch (err) {
          return done(err);
      }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
      const user = await User.findById(id);
      done(null, user);
  } catch (err) {
      done(err);
  }
});

// Use the pages routes
app.use('/api/pages', pagesRouter);

// Routes
app.use('/api/users', userRouter); // Prefix user routes with /api/users

// Default route for testing
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// Error handling for undefined routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({ error: message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
