/*
PURPOSE:
Shows all blogs in a list.
Supports searching through query param (?search=...).
Supports filtering by category through query param (?category=...).
*/
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { blogService } from "../services/blogService";
import BlogList from "../components/blog/BlogList";
import Loader from "../components/layout/Loader";


export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";//gets search data from navbar search form
  const category = searchParams.get("category") || "";//gets category filter from query param

  //fetches blogs from backend, supports search query and category filter
  useEffect(()=>{
    const fetchBlogs = async ()=>{
      try{
        setLoading(true);
        const data=await blogService.getAllBlogs(search, category);
        setBlogs(data.blogs);
      }catch(error){
        toast.error(error.response?.data?.message || "Failed to fetch blogs");
      }finally{
        setLoading(false);
      }
    };
    fetchBlogs();
    },[search, category]);
    return(
      <div className="min-h-screen bg-gray-950 text-white p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Blogs</h1>

      {search && (
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Showing results for: <span className="text-purple-400">{search}</span>
        </p>
      )}

      {category && (
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Category: <span className="text-purple-400">{category}</span>
        </p>
      )}

      {loading ? <Loader /> : <BlogList blogs={blogs} />}
    </div>
  );
}
