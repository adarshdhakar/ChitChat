# System Design Document

## Introduction
Chit Chat is a real-time messaging service designed to facilitate seamless communication between users. It supports individual messaging, group chats, and includes optional features like an AI-powered chatbot and video calling. The purpose of this document is to outline the system architecture, components, data flow, and API design to provide a comprehensive understanding of the application's structure.

## Technology Stack
- **Frontend:** Next.js
- **Backend:** Node.js
- **Database:** MongoDB
- **Authentication:** Passport.js
- **File Storage:** Cloudinary
- **Real-time Communication:** Socket.io
- **Audio/Video Calls:** WebRTC
- **AI Chatbot:** Botpress

## Component Breakdown

### User Authentication
- **Functionality:** Allows users to register, log in, and manage their sessions.
- **Implementation:** Utilizes Passport.js for handling authentication strategies, bcrypt for password hashing, and Express Sessions for session management.

### Messaging
- **Functionality:** Enables users to send and receive messages in real-time.
- **Implementation:** Messages are handled via REST APIs and Socket.io for real-time updates. Stored in MongoDB with references to sender and receiver.

### Group Chats
- **Functionality:** Allows users to create and join groups for collective messaging.
- **Implementation:** Groups are managed through REST APIs, with messages tagged to group IDs. Real-time updates are handled via Socket.io rooms.

### AI-powered Chatbot 
- **Functionality:** Provides automated responses and assistance to users.
- **Implementation:** Integrated with BotPress’s API to generate contextual replies based on user input.

### Video Calling 
- **Functionality:** Enables users to engage in video or audio calls.
- **Implementation:** Utilizes WebRTC for peer-to-peer communication, with signaling handled via Socket.io.

## Data Flow

1. **User Registration/Login**
   - User submits registration/login form.
   - Backend validates and processes the request.
   - On success, the current user data is stored in .

2. **Sending a Message**
   - User sends a message via the frontend interface.
   - Message data is sent to the backend through a REST API.
   - Backend stores the message in MongoDB and emits a Socket.io event to the recipient(s).

3. **Receiving a Message**
   - Frontend listens for Socket.io events.
   - On receiving an event, the message is displayed in real-time without refreshing the page.

4. **Group Chat**
   - User joins a group via the frontend.
   - Messages sent to the group are broadcasted to all group members through Socket.io rooms.

## REST API Endpoints

## API Endpoints

### Authentication
| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| `/api/auth/register`     | POST   | Register a new user                |
| `/api/auth/login`        | POST   | Authenticate a user                |
| `/api/auth/logout`       | POST   | Logout the current user            |
| `/api/auth`              | GET    | Get data of the logged-in user     |

### User Profile
| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| `/api/users/:userId`     | GET    | Get the profile of a specific user |

### Chat
| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| `/api/chats`             | POST   | Create a new chat                  |

### Calls
| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| `/api/calls/voice`       | POST   | Initiate a voice call              |
| `/api/calls/video`       | POST   | Initiate a video call              |

### AI Assist
| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| `/api/ai`                | GET    | Access the chatbot (AI Assist)     |

### Other
| Endpoint                | Method | Description                        |
|-------------------------|--------|------------------------------------|
| `/api/about`             | GET    | Get about page of ChitChat         |
| `/api/contact`           | GET    | Get contact us page of ChitChat    |





