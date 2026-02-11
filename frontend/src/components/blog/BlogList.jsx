/*
PURPOSE:
Displays list of blogs in grid format.
Used in Blogs page and Admin dashboard.
*/
import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  // If no blogs found, show message
  if (!blogs || blogs.length === 0) {
    return <p className="text-gray-400 mt-6">No blogs found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {/* Render each blog as BlogCard */}
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
}