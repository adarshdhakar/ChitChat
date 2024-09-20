// backend/uploadImage.js
const cloudinary = require('./cloudinaryConfig.js');
console.log('Cloudinary Configuration:', {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // Return the image URL
      }
    ).end(file.buffer); // End the stream with the file buffer
  });
};

module.exports = uploadImage;
