// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// // Cloudinary config
// const cloudinaryConnect = () => {
//   try {
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
//     console.log("Cloudinary connected successfully");
//   } catch (error) {
//     console.log("Cloudinary connection failed: ", error);
//   }
// };

// module.exports = { cloudinary, cloudinaryConnect };

const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // यह सबसे ऊपर होना चाहिए

// 🔍 Check env values
// console.log("cloud_name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("api_key:", process.env.CLOUDINARY_API_KEY);
// console.log("api_secret:", process.env.CLOUDINARY_API_SECRET);

// Cloudinary config
const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary connected successfully");
  } catch (error) {
    console.log("Cloudinary connection failed: ", error);
  }
};

module.exports = { cloudinary, cloudinaryConnect };
