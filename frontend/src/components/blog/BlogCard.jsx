/*
PURPOSE:
Displays one blog preview card.
Used inside BlogList and Blogs page.
*/

import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { truncateText } from "../../utils/truncateText";


export default function BlogCard({ blog }) {
  const categoryLabel = Array.isArray(blog.categories)
    ? blog.categories.join(", ")
    : blog.category || "";

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

        {/* Read more button ,goes to BlogPage*/}
        <Link
          to={`/blogs/${blog.slug}`}
          className="inline-block mt-4 bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}