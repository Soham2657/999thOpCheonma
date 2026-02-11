const Comment=require('../models/commentModel');
const Blog=require('../models/blogModel');

//create comment
exports.addComment=async(req,res,next)=>{
    try{
        console.log("Request body:", req.body);
        const {blogId,text}=req.body;
        console.log("blogId:", blogId, "text:", text);

        if(!blogId || !text){
            return res.status(400).json({message:"Blog ID and comment text are required"});
        }
        const blog=await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        const comment=new Comment({
            blog:blogId,
            user:req.user._id,
            text,
        });
        await comment.save();
        res.status(201).json({message:"Comment added successfully",comment});
    }catch(err){
        next(err);
}};

/*
GET COMMENTS FOR A BLOG
*/
exports.getComments=async(req,res,next)=>{
    try{
        const {blogId}=req.params;
      
        const comments=await Comment.find({blog:blogId}).populate("user","name");//populate used to get user name instead of user id    
        res.status(200).json({comments});
    }  catch(err){
        next(err);
    }
};   
//DELETE COMMENT
exports.deleteComment=async(req,res,next)=>{
    try{
        const {commentId}=req.params;
        const comment=await Comment.findById(commentId);
        if(!comment){
            return res.status(404).json({message:"Comment not found"});
        }
        if(comment.user.toString()!==req.user._id.toString()){
            return res.status(403).json({message:"You are not authorized to delete this comment"});
        }
        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({message:"Comment deleted successfully"});
    }catch(err){
        next(err);
    }
};