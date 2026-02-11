const express = require("express");
const router = express.Router();

const { uploadImage } = require("../controllers/uploadController");

const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const upload = require("../middlewares/uploadMiddleware");

/*
Only admin can upload images
"image" is the field name used in form-data
*/
router.post("/", auth, admin, upload.single("image"), uploadImage);

module.exports = router;
