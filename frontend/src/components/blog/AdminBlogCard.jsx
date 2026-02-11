/*
PURPOSE:
Admin version of BlogCard with edit and delete buttons.
*/

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/formatDate";
import { truncateText } from "../../utils/truncateText";
import { blogService } from "../../services/blogService";

export default function AdminBlogCard({ blog, onDelete }) {
  const categoryLabel = Array.isArray(blog.categories)
    ? blog.categories.join(", ")
    : blog.category || "";

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      return;
    }

    try {
      await blogService.deleteBlog(blog._id);
      toast.success("Blog deleted successfully!");
      onDelete(blog._id);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
      {/* Blog thumbnail image */}
      <img
        src={blog.thumbnail || "https://via.placeholder.com/400"}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        {/* Blog title */}
        <h2 className="text-xl font-bold text-white">{blog.title}</h2>

        {/* Blog meta info */}
        <p className="text-gray-400 text-sm mt-1">
          {formatDate(blog.createdAt)}
          {categoryLabel ? ` | ${categoryLabel}` : ""}
        </p>

        {/* Preview text */}
        <p className="text-gray-300 mt-3">
          {truncateText(blog.content, 120)}
        </p>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <Link
            to={`/admin/edit-blog/${blog._id}`}
            className="flex-1 text-center bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
