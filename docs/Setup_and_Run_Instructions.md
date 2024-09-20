# Setup and Run Instructions

## Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Cloudinary Account**: [Sign up for Cloudinary](https://cloudinary.com/users/register/free)

## Installation

1. Clone the repository:
   ```bash
   git clone ()
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


## Additional Configuration

Port Configuration: If you need to run the app on a different port, update the PORT variable in your .env file.
Database Seeding: If applicable, provide instructions on how to seed the database with initial data.

## Troubleshooting

Common Issues: List common setup issues and how to resolve them.
Contact for Help: Provide contact information or links to support channels.