/*
UPLOAD IMAGE CONTROLLER
Returns the uploaded image URL from Cloudinary
*/

exports.uploadImage = async (req, res, next) => {
  try {
    console.log("Upload request received");
    console.log("Request file:", req.file);
    console.log("Request body:", req.body);
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // req.file.path contains the Cloudinary URL
    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    next(error);
  }
};
