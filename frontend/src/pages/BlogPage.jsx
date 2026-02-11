/*
PURPOSE:
Displays full blog details by slug.
Also renders CommentBox.
*/
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import CommentBox from "../components/blog/CommentBox";
import Loader from "../components/layout/Loader";
import { formatDate } from "../utils/formatDate";
import { blogService } from "../services/blogService";
//useparams to get slug from url, then fetch blog details using slug and display them
export default function BlogPage() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    //fetch blog by slug on component mount
    useEffect(()=>{
        const fetchBlog=async()=>{
            setLoading(true);   
            try{
                const data= await blogService.getBlogBySlug(slug);
                setBlog(data);
            }catch(err){
                toast.error("Failed to load blog");
            }finally{
                setLoading(false);
            }   
        };
        fetchBlog();
    }, [slug]);
    if(loading) return <Loader />;
    if(!blog) return <p className="text-center text-gray-400">Blog not found</p>;
    const categoryLabel = Array.isArray(blog.categories)
      ? blog.categories.join(", ")
      : blog.category || "";
    return(
        <div className="min-h-screen bg-gray-950 text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold">{blog.title}</h1>

      <p className="text-gray-400 mt-2">
        {formatDate(blog.createdAt)}{categoryLabel ? ` • ${categoryLabel}` : ""}
      </p>

      {/* Thumbnail */}
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-87.5 object-cover rounded-2xl mt-6"
        />
      )}

      {/* Blog content */}
      <div
        className="mt-6 text-gray-200 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Comments */}
      <CommentBox blogId={blog._id} />
    </div>
  );
}