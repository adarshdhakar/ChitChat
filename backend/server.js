// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const cors = require('cors');
// const MongoStore = require('connect-mongo');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const ExpressError = require("./utils/ExpressError.js");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");
// const Chat = require("./models/chats.js");

// const infoRouter = require('./routes/info.js');
// const chatRouter = require('./routes/chats.js');
// const authRouter = require('./routes/auth.js');
// const userRouter = require('./routes/users.js');

// require('./passport-config')(passport); // Passport configuration file

// dotenv.config(); 
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Set your frontend origin here
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // CORS middleware
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// // Socket.io connection
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   socket.on('join_room', (room) => {
//     socket.join(room);
//     console.log(`User with ID: ${socket.id} joined room: ${room}`);
//   });

//   socket.on('send_message', (message) => {
//     console.log(`Message received in room ${message.room}:`, message);
//     io.to(message.room).emit('receive_message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('A user disconnected:', socket.id);
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const MONGO_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/messenger";

// async function main() {
//   try {
//     await mongoose.connect(MONGO_URL);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//   }
// }

// main();

// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "mysupersecretcode",
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: MONGO_URL }),
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production',
//   },
// };

// app.use(session(sessionOptions));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new LocalStrategy(
//   { usernameField: 'email' },
//   async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });
//       if (!user) return done(null, false, { message: 'Incorrect email.' });
//       user.authenticate(password, (err, isMatch) => {
//         if (err) return done(err);
//         if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
//         return done(null, user);
//       });
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// app.use('/api/users', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/chats', chatRouter);
// app.use('/api/page', infoRouter);

// app.get('/', (req, res) => {
//   res.send('Hello from backend!');
// });

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).json({ error: message });
// });





// // server.js
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const cors = require('cors');
// const MongoStore = require('connect-mongo');

// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const ExpressError = require("./utils/ExpressError.js");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");
// const Chat = require("./models/chats.js");

// const infoRouter = require('./routes/info.js');
// const chatRouter = require('./routes/chats.js');
// const authRouter = require('./routes/auth.js');
// const userRouter = require('./routes/users.js');

// require('./passport-config')(passport); // Passport configuration file

// dotenv.config(); 
// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server, {
//   cors: {
//     origin: "http://localhost:3000", // Frontend origin
//     methods: ["GET", "POST"],
//     credentials: true, // Allow credentials
//   },
// });

// // Apply CORS middleware with the defined options
// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true, // Allow credentials (cookies) to be sent
// }));

// app.use(express.json());

// // Connect to MongoDB
// const MONGO_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/messenger";

// mongoose.connect(MONGO_URL)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Session configuration
// const sessionOptions = {
//   secret: process.env.SESSION_SECRET || "mysupersecretcode",
//   resave: false,
//   saveUninitialized: false,
//   store: MongoStore.create({ mongoUrl: MONGO_URL }),
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     sameSite: 'lax',
//     secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
//   },
// };

// // Apply session middleware
// app.use(session(sessionOptions));
// app.use(flash());

// // Initialize Passport and session
// app.use(passport.initialize());
// app.use(passport.session());

// // Passport LocalStrategy
// passport.use(new LocalStrategy(
//   { usernameField: 'email' }, // Use email as username
//   async (email, password, done) => {
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return done(null, false, { message: 'Incorrect email.' });
//       }
//       // Assuming you have a method to validate password
//       const isMatch = await user.validatePassword(password);
//       if (!isMatch) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   }
// ));

// // Serialization and deserialization
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// // Use Routers
// app.use('/api/users', userRouter);
// app.use('/api/page', infoRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/chats', chatRouter);

// // Default route for testing
// app.get('/', (req, res) => {
//   res.send('Hello from backend!');
// });

// // Socket.io connection
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // User joins a chat room
//   socket.on('join_room', (room) => {
//     socket.join(room);
//     console.log(`User with ID: ${socket.id} joined room: ${room}`);

//     // Optionally, send the current list of users in the room
//     const usersInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []);
//     io.to(room).emit('room_users', usersInRoom);
//   });

//   // Listen for chat messages
//   socket.on('send_message', (message) => {
//     console.log(`Message received in room ${message.room}:`, message);
//     io.to(message.room).emit('receive_message', message); // Send message to everyone in the room
//   });

//   // WebRTC Signaling Events

//   // Handle video offers (SDP)
//   socket.on('video_offer', (data) => {
//     const { offer, room } = data;
//     console.log(`Received video_offer from ${socket.id} in room ${room}`);
//     // Broadcast the offer to other users in the room
//     socket.to(room).emit('video_offer', { offer, sender: socket.id });
//   });

//   // Handle video answers (SDP)
//   socket.on('video_answer', (data) => {
//     const { answer, room } = data;
//     console.log(`Received video_answer from ${socket.id} in room ${room}`);
//     // Broadcast the answer to other users in the room
//     socket.to(room).emit('video_answer', { answer, sender: socket.id });
//   });

//   // Handle ICE candidates
//   socket.on('video_candidate', (data) => {
//     const { candidate, room } = data;
//     console.log(`Received video_candidate from ${socket.id} in room ${room}`);
//     // Broadcast the candidate to other users in the room
//     socket.to(room).emit('video_candidate', { candidate, sender: socket.id });
//   });

//   // Handle leaving a room
//   socket.on('leave_room', (room) => {
//     socket.leave(room);
//     console.log(`User with ID: ${socket.id} left room: ${room}`);

//     // Optionally, update the room users
//     const usersInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []);
//     io.to(room).emit('room_users', usersInRoom);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('A user disconnected:', socket.id);
//     // Optionally, notify other users in all rooms the socket was part of
//     const rooms = Array.from(socket.rooms).filter(r => r !== socket.id);
//     rooms.forEach(room => {
//       const usersInRoom = Array.from(io.sockets.adapter.rooms.get(room) || []);
//       io.to(room).emit('room_users', usersInRoom);
//     });
//   });
// });

// // Error handling for undefined routes
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

// // Error handler
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).json({ error: message });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
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

dotenv.config();
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

const MONGO_URL = process.env.MONGODB_URI || "mongodb://localhost:27017/messenger";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

main();

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
    secure: process.env.NODE_ENV === 'production',
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
app.use('/api/page', infoRouter);

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
