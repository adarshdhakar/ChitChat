// require('dotenv').config();
require('dotenv').config({ path: '../.env' });

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const session = require("express-session");
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
const ExpressError = require("./utils/ExpressError.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Chat = require("./models/chats.js");

const infoRouter = require('./routes/info.js');
const chatRouter = require('./routes/chats.js');
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/users.js');

require('./passport-config')(passport); // Passport configuration file

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Set your frontend origin here
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// CORS middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);

    // Notify other users in the room
    const users = Array.from(io.sockets.adapter.rooms.get(room) || []);
    socket.to(room).emit('user_joined', { userId: socket.id });
    socket.to(room).emit('room_users', users);
  });

  socket.on('video_offer', (data) => {
    const { offer, room } = data;
    socket.to(room).emit('video_offer', { offer, sender: socket.id });
  });

  socket.on('video_answer', (data) => {
    const { answer, room } = data;
    socket.to(room).emit('video_answer', { answer, sender: socket.id });
  });

  socket.on('video_candidate', (data) => {
    const { candidate, room } = data;
    socket.to(room).emit('video_candidate', { candidate, sender: socket.id });
  });

  socket.on('send_message', (message) => {
    console.log(`Message received in room ${message.room}:`, message);
    io.to(message.room).emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const dbUrl = process.env.ATLASDB_URL;

async function main() {
  try {
    await mongoose.connect(dbUrl);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

main();

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,

  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email.' });
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

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);
// app.use('/api/page', infoRouter);

app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({ error: message });
});
