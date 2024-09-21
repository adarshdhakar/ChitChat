# Deployment Instructions

## Prerequisites
- **Cloud Provider Account**: (e.g., Render, AWS, Heroku, Vercel), here I have used Render here
- **GitHub Repository**: Ensure your code is pushed to GitHub.

## Pre-Deployment**:
1. **Connect cloud database like Mongo ATLAS in place of the local MongoDB**
2. **Use Mongo Session Store sessions in Mongo ATLAS in place of local Session Storage**

## Deployment Steps

### Using Render (Recommended for Next.js)
1. **Sign Up / Log In to Render**
   - [Render](https://render.com/)

2. **Import Project**
   - Click on "New Project" and select your GitHub repository.

3. **Configure Environment Variables**
   - Add the necessary environment variables like (`ATLASDB_URL`, `CLOUDINARY_URL`, `SESSION_SECRET`) etc. in Render’s dashboard under the project settings.
   - Whitelist the endpoints for this in the Mongo ATLAS Networks
   - There can be many variables depending on the projects

4. **Deploy**
   - Click "Deploy". Render will automatically build and deploy your web application, this may take a few minutes

5. **Access Deployed App**
   - Once deployed, Render will provide a URL (e.g., `https://chitchat-wryj.onrender.com`).

## Post-Deployment
- **Monitoring**: Set up monitoring and logging to track the performance and health of your application.
- **Continuous Deployment**: Enable automatic deployments on push to the main branch for continuous integration.
