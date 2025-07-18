const { cloudinary } = require("../Config/Cloudinary");

exports.uploadToCloudinary = async (fileBuffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType || "auto",
        folder: folder || "general",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

