# Setup and Run Instructions

## Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
- **MongoDB**: [Download MongoDB](https://www.mongodb.com/try/download/community)
- **Cloudinary Account**: [Sign up for Cloudinary](https://cloudinary.com/users/register/free)

## Installation

1. Clone the repository:
   ```bash
   git clone (https://github.com/adarshdhakar/ChitChat.git)
   cd ChitChat

2. Install dependencies:
    npm install

3. Configure environment variables (create a .env file):
    NEXT_PUBLIC_SOCKET_URL=<http://localhost:3000>
    NEXT_PUBLIC_API_URL=<http://localhost:5000>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-api-secret>
    EMAIL_USER=<your-gmail-id>
    EMAIL_PASS=<your-gmail-app-password>
    ATLASDB_URL=<your-atlasdb-url>
    SECRET=<your-session-secret>

4. Run the application:
    npm start

The application will be available at http://localhost:3000.


