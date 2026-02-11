/*
PURPOSE:
Admin dashboard.
Admin can view blogs and go to create blog page.
*/
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Loader from "../components/layout/Loader";
import BlogList from "../components/blog/BlogList";
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

      {loading ? <Loader /> : <BlogList blogs={blogs} />}
    </div>
    );
}