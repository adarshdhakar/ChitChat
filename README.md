# Chit Chat - Messaging Service

<table>
  <tr>
    <td><img src="docs/images/1.png" alt="Chit Chat Banner" width="500"></td>
    <td><img src="docs/images/2.png" alt="Sample Image 2" width="500"></td>
  </tr>
</table>
<table>
  <tr>
    <td><img src="docs/images/3.png" alt="Sample Image 3" width="500"></td>
    <td><img src="docs/images/4.png" alt="Sample Image 4" width="500"></td>
  </tr>
</table>

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
  <table>
  <tr>
    <td><img src="docs/images/5.png" alt="Sample Image 5" width="500"></td>
    <td><img src="docs/images/6.png" alt="Sample Image 6" width="500"></td>
  </tr>
</table>
- Sending and receiving text messages
- Group chat functionality
  <table>
  <tr>
    <td><img src="docs/images/7.png" alt="Sample Image 7" width="500"></td>
    <td><img src="docs/images/9.png" alt="Sample Image 9" width="500"></td>
  </tr>
</table>
  <table style="width:100%; text-align:center;">
  <tr>
    <td><img src="docs/images/11.png" alt="Sample Image 11" width="500"></td>
  </tr>
</table>
- Real-time message updates
  <table style="text-align:center;">
  <tr>
    <td><img src="docs/images/10.png" alt="Sample Image 10" width="500"></td>
    <td><img src="docs/images/12.png" alt="Sample Image 12" width="500"></td>
  </tr>
</table>
  <table style="width:100%; text-align:center;">
  <tr>
    <td><img src="docs/images/13.png" alt="Sample Image 13" width="500"></td>
  </tr>
</table>
- AI-powered chatbot
  <table style="width:100%; text-align:center;">
  <tr>
    <td><img src="docs/images/8.png" alt="Sample Image 8" width="500"></td>
  </tr>
</table>
- Video/Voice calling
  <table style="width:100%; text-align:center;">
  <tr>
    <td><img src="docs/images/14.png" alt="Sample Image 14" width="500"></td>
  </tr>
</table>
- About and Contact Us Section
<table>
  <tr>
    <td><img src="docs/images/15.png" alt="Sample Image 15" width="500"></td>
    <td><img src="docs/images/16.png" alt="Sample Image 16" width="500"></td>
  </tr>
</table>

## System Design
For a detailed system design, refer to the [System Design Document](./docs/System_Design_Document.md).

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/adarshdhakar/ChitChat.git
   cd ChitChat

2. Install dependencies:
    ```bash
    npm install

3. Configure environment variables (create a .env file):
- NEXT_PUBLIC_SOCKET_URL=<http://localhost:3000>
- NEXT_PUBLIC_API_URL=<http://localhost:5000>
- CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
- CLOUDINARY_API_KEY=your-cloudinary-api-key
- CLOUDINARY_API_SECRET=your-api-secret
- EMAIL_USER=your-gmail-id
- EMAIL_PASS=your-gmail-app-password
- ATLASDB_URL=your-atlasdb-url
- SECRET=your-session-secret

4. Run the application:
    ```bash
    npm start

The application will be available at http://localhost:3000.

## Deployment
This application is deployed on (https://render.com). You can access it at (https://chitchat-wryj.onrender.com/).

## API Endpoints
### Authentication
- Login: POST /api/auth/login
- Signup: POST /api/auth/signup
- Logout: POST /api/auth/logout

### User Profile
- Get User Profile: GET /api/users/:userId
- Upload Profile Picture: POST /api/users/:userId/profile-picture

### Chats
- Create Chat: POST /api/chats

### Voice & Video Calls
- Initiate Voice Call: POST /api/calls/voice
- Initiate Video Call: POST /api/calls/video

### Dependencies
- Next.js: For server-rendered React applications.
- Node.js: For server-side programming.
- Express: To handle API requests.
- Mongoose: For MongoDB object modeling.
- Passport.js: For user authentication.
- Socket.io: For real-time messaging.
- Cloudinary: For image uploads.
- Multer: For handling multipart/form-data.

- Web RTC: For voice and video calls.
- Botpress: For chatbot training and publishing.

## Future Improvements
- Add end-to-end encryption for messages.
- Implement user blocking and reporting features.
- Enhance the AI chatbot's capabilities.

## Contact
For any inquiries, please email:

chitchathelpdesk@gmail.com

or 

adarshdhakar277@gmail.com
