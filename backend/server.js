const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const MongoStore = require('connect-mongo');
// backend/server.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const userRouter = require('./routes/user');
const pagesRouter = require('./routes/pages');
const chatRouter = require('./routes/chats.js');
const authRouter = require('./routes/auth.js');
require('./passport-config')(passport); // Passport configuration file

dotenv.config(); 
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // Allow CORS for all origins or set your frontend domain here
    methods: ["GET", "POST"],
  },
});

// app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials (cookies) to be sent
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));

app.use(express.json());

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins a room
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  // Listen for message from client
  socket.on('send_message', (message) => {
    console.log(`Message received in room ${message.room}:`, message);
    io.to(message.room).emit('receive_message', message); // Send message to everyone in the room
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
  store: MongoStore.create({ mongoUrl: MONGO_URL }),
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
  },
};

// Apply session middleware
app.use(session(sessionOptions));
app.use(flash());

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// ... [Passport strategy and serialization/deserialization]

// Ensure Passport LocalStrategy uses correct field
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Ensure email is used as the username field
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      // Use the authenticate method from passport-local-mongoose or define it in your User model
      user.authenticate(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
        return done(null, user);
      });
    } catch (err) {
      return done(err);
    }
  }
));

// Serialization and deserialization
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

app.use('/api/auth', authRouter);

app.use('/api/chat', chatRouter);


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
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
