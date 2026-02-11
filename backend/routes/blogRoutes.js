const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

// public routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// admin protected routes
router.post("/", auth, admin, createBlog);
router.put("/:id", auth, admin, updateBlog);
router.delete("/:id", auth, admin, deleteBlog);

module.exports = router;
