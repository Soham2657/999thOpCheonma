const Blog=require("../models/blogModel");
const createslug=require("../utils/slugify");
const { notifySubscribers } = require("./notificationController");

/*
CREATE BLOG (ADMIN ONLY)
- creates slug from title
- stores categories, tags, aliases
- author is taken from logged in admin user (req.user.id)
*/

exports.createBlog=async (req,res,next)=>{
try{
    const {title,content,categories,tags,aliases,thumbnail}=req.body;
    if(!title || !content){
        return res.status(400).json({message:"Title and content are required"});
    }
    //slugify title
    const slug=createslug(title);
    //check if slug already exists
    const existingBlog= await Blog.findOne({slug});
    if(existingBlog){
        return res.status(400).json({message:"A blog with similar title already exists"});
    }
    //create blog
    const blog=await Blog.create({
        title,
        slug,
        content,
        categories:categories || [],
        tags:tags || [],
       aliases:aliases || [],
        thumbnail: thumbnail || "",
        isPublished:true,
        author:req.user.id
    });
    
    // notify subscribers about new blog
    if (blog.isPublished) {
      notifySubscribers(blog.title, blog.slug).catch((err) => {
        console.error("Failed to notify subscribers:", err.message);
      });
    }
    
    res.status(201).json({message:"Blog created successfully",blog});
}catch(error){
    next(error);
}};

//get all blogs with pagination and filtering by category, tag, or alias
exports.getBlogs=async (req,res,next)=>{
    try{
        const {search,category,tag}=req.query;

        let query={isPublished:true};//only published blogs

        //category filter
        //$in operator to check if the category exists in the categories array of the blog
        if(category){
            query.categories={$in:[category]};
        }
        //tag filter
        if(tag){
            query.tags={$in:[tag]};
        };
        //search filter (searches in title and content)
        //$or statement to search in multiple fields (title, tags, aliases)
        //$regex for partial matching and $options:"i" for case-insensitive search like "naruto" should match "Naruto" and "naruto shippuden"
        if(search){
            query.$or=[
                {title:{$regex:search,$options:"i"}},
                {tags:{$regex:search,$options:"i"}},
                {aliases:{$regex:search,$options:"i"}},
            ];
        }
        const blogs = await Blog.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json({ blogs });
    }catch(error){
        next(error);
    }
};
//get single blog by slug
exports.getBlogBySlug=async (req,res,next)=>{
    try{
        const {slug}=req.params;
        const blog=await Blog.findOne({slug,isPublished:true}).populate("author","name email");
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }   
        res.json({blog});
    }catch(error){          
        next(error);
    }
};

//get single blog by ID (admin only)
exports.getBlogById=async (req,res,next)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById(id).populate("author","name email");
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }   
        res.json({blog});
    }catch(error){          
        next(error);
    }
};
//update blog (admin only)
exports.updateBlog=async (req,res,next)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        
    // update fields if provided
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.categories = req.body.categories || blog.categories;
    blog.tags = req.body.tags || blog.tags;
    blog.aliases = req.body.aliases || blog.aliases;
    blog.isPublished =
      req.body.isPublished !== undefined ? req.body.isPublished : blog.isPublished;

    // update slug if title changed
    if (req.body.title) {
      blog.slug = createslug(req.body.title);
    }
    await blog.save();
    res.json({message:"Blog updated successfully",blog});
    }catch(error){
        next(error);
    }
};
//delete blog (admin only)
exports.deleteBlog=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const blog=await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }   
        await blog.deleteOne();
        res.json({message:"Blog deleted successfully"});
    }catch(error){
        next(error);
    }
};