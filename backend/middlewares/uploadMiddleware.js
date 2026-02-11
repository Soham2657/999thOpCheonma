const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure cloudinary directly
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

console.log("Cloudinary Config:");
console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME?.trim());
console.log("API Key:", process.env.CLOUDINARY_API_KEY?.trim() ? "✓ Set" : "✗ Missing");
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET?.trim() ? "✓ Set" : "✗ Missing");

/*
This middleware handles file upload directly to Cloudinary
No file stored in your backend server
*/

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "manhwa_blog_uploads", // cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

module.exports = upload;
