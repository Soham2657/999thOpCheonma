/*
PURPOSE:
Admin dashboard.
Admin can view blogs and go to create blog page.
*/
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../components/layout/Loader";
import AdminBlogCard from "../components/blog/AdminBlogCard";
import { blogService } from "../services/blogService";
export default function AdminDashboard() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await blogService.getAllBlogs();
                setBlogs(data.blogs ?? []);
            } catch (error) {
                console.error("Failed to fetch blogs", error);
                toast.error("Failed to fetch blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleDelete = (blogId) => {
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    };

    return(<div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <Link
          to="/admin/create-blog"
          className="bg-purple-600 px-5 py-2 rounded-xl hover:bg-purple-700"
        >
          + Create Blog
        </Link>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog) => (
            <AdminBlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
    );
}