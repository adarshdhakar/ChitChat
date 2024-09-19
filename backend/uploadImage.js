const cloudinary = require('./cloudinaryConfig'); // Import Cloudinary config

const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) return reject(error);
      resolve(result.secure_url); // Return the image URL
    });
  });
};

module.exports = uploadImage;
