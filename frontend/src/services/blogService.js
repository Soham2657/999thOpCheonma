/*
PURPOSE:
Handles all blog-related API calls.
*/
import api from "./api";

export const blogService = {
    // Get all blogs
    getAllBlogs: async(search="",category="")=>{
        const res= await api.get(`/blogs?search=${search}&category=${category}`);
        return res.data;
    },
    // Get single blog by slug
    getBlogBySlug: async(slug)=>{
        const res= await api.get(`/blogs/${slug}`);
        return res.data.blog;
    } , 
        // Create new blog (admin only) 
    createBlog: async(data)=>{
        const res= await api.post("/blogs",data);
        return res.data;
    },
    // Update blog (admin only)
    updateBlog: async(id,data)=>{
        const res= await api.put(`/blogs/${id}`,data);
        return res.data;
    },
    // Delete blog (admin only)
    deleteBlog: async(id)=>{
        const res= await api.delete(`/blogs/${id}`);
        return res.data;
    },
};