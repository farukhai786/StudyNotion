const multer = require("multer");

// Storage config (memory में store करेंगे, ताकि cloudinary पर upload कर सकें)
const storage = multer.memoryStorage();

// Multer config
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000 * 1024 * 1024 // 1 GB max file size
  },
});

module.exports = upload;
