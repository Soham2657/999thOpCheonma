const express = require("express");
const router = express.Router();

const { addComment, getComments, deleteComment } = require("../controllers/commentController");
const auth = require("../middlewares/authMiddleware");

// get comments for a blog (public)
router.get("/:blogId", getComments);

// add comment (protected)
router.post("/", auth, addComment);

// delete comment (protected)
router.delete("/:commentId", auth, deleteComment);

module.exports = router;
