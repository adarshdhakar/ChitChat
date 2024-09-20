# Chit Chat - Messaging Service

## Author
**Adarsh Dhakar**  
IIT Bhubaneswar  
Computer Science and Engineering

## Documentations
- [System Design Document](./docs/System_Design_Document.md)
- [Setup and Run Instructions](./docs/Setup_and_Run_Instructions.md)
- [Dependencies and Libraries](./docs/Dependencies_and_Libraries.md)
- [Deployment Instructions](./docs/Deployment_Instructions.md)
- [Future Improvements](./docs/Future_Improvements.md)

## Description
Chit Chat is a messaging service prototype that allows users to register, send and receive messages, and participate in group chats in real time. 
The application includes optional features like an AI-powered chatbot and video calling.

## Technology Stack
- **Frontend:** Next.js
- **Backend:** Node.js
- **Database:** MongoDB
- **Authentication:** Passport.js
- **File Storage:** Cloudinary
- **Real-time Communication:** Socket.io
- **Audio/Video Calls:** WebRTC
- **AI Chatbot:** Botpress

## Features
### Core Features
- User registration and authentication
- Sending and receiving text messages
- Group chat functionality
- Real-time message updates

### Optional Features
- AI-powered chatbot
- Video calling

## System Design
For a detailed system design, refer to the [System Design Document]().

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd chit-chat

2. Open two command prompts at this location:
    (or split the terminal)
    cd front-end
    cd back-end

2. Install dependencies:
    for each of them run 
    npm install

3. Configure environment variables (create a .env file):
    MONGODB_URI=<your-mongodb-uri>
    CLOUDINARY_URL=<your-cloudinary-url>
    SESSION_SECRET=<your-session-secret>

4. Run the application:
    frontend one with -> npm run dev
    backend one with -> nodemon server.js
    (assuming you have npm and nodemon already available on your machine)

The application will be available at http://localhost:3000.

## Deployment
This application is deployed on (). You can access it at ().

## API Endpoints
### Authentication
Login: POST /api/auth/login
Signup: POST /api/auth/signup
Logout: POST /api/auth/logout

### User Profile
Get User Profile: GET /api/users/:userId
Edit User Profile: PUT /api/users/:userId
Upload Profile Picture: POST /api/users/:userId/profile-picture

### Chats
Get Chats with a Person: GET /api/chats/person/:userId
Create Chat: POST /api/chats

### Voice & Video Calls
Initiate Voice Call: POST /api/calls/voice
Initiate Video Call: POST /api/calls/video
End Call: POST /api/calls/:callId/end

### Dependencies
Next.js: For server-rendered React applications.
Node.js: For server-side programming.
Express: To handle API requests.
Mongoose: For MongoDB object modeling.
Passport.js: For user authentication.
Socket.io: For real-time messaging.
Cloudinary: For image uploads.
Multer: For handling multipart/form-data.

Web RTC: For voice and video calls.
Botpress: For chatbot training and publishing.

## Future Improvements
Add end-to-end encryption for messages.
Implement user blocking and reporting features.
Enhance the AI chatbot's capabilities.

## Contact
For any inquiries, please email:
support@ChitChatgmail.com

or 

adarshdhakar288@gmail.com


## Security Considerations
Password Hashing: User passwords are hashed using bcrypt before storage.
JWT Security: Tokens are securely signed and have an expiration time to prevent unauthorized access.
Input Validation: All inputs are validated to prevent injection attacks and ensure data integrity.
HTTPS: The application should be served over HTTPS to encrypt data in transit.

## Scalability and Performance
Horizontal Scaling: The backend can be scaled horizontally by adding more instances behind a load balancer.
Database Indexing: Proper indexing in MongoDB ensures efficient query performance.
Caching: Implementing caching strategies (e.g., Redis) can reduce database load and improve response times.

## Conclusion
The Chit Chat messaging service is built with a focus on real-time communication, scalability, and user experience. The chosen technology stack and architecture ensure a robust and maintainable system capable of handling current requirements and future enhancements.