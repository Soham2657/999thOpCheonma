/*
PURPOSE:
Shows comment form and list of comments.
Allows logged in users to post comment.
*/
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import { commentService } from "../../services/commentService";
import ProtectedMessage from "../ui/ProtectedMessage";
import Loader from "../layout/Loader";
import { formatDate } from "../../utils/formatDate";
export default function commentBox9({ blogId }) {
    const { user } = useAuth();
    // State for comments and new comment form
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(false);
    // Fetch comments when blogId changes
    useEffect(()=>{
        const fetchComments=async()=>{
            setLoading(true);
            try{
                const data= await commentService.getCommentsByBlog(blogId);
                setComments(data);
            }catch(err){
                toast.error("Failed to load comments");
            }finally{
                setLoading(false);
            }
        };
        fetchComments();
        
    }, [blogId]);
    // Handle comment form submission
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!commentText.trim()){
            toast.error("Comment cannot be empty");
            return;
        }
        
    try {
      const newComment = await commentService.addComment(blogId, {
        text: commentText,
      });

      // Add comment to UI instantly
      setComments([newComment, ...comments]);
      setCommentText("");

      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };
// Handle comment deletion
const handleDelete=async(commentId)=>{
    try{
        if(window.confirm("Are you sure you want to delete this comment?")){
            await commentService.deleteComment(commentId);
            setComments(comments.filter(c=>c._id!==commentId));
            toast.success("Comment deleted");
        }
    } catch (error) {
        toast.error("Failed to delete comment");
    }
};
return (
    <div className="mt-10">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Comments</h2>

      {/* If user not logged in, show login message */}
      {!user && (
        <ProtectedMessage message="You must login to comment on this blog." />
      )}

      {/* If user logged in, show comment form */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full bg-gray-900 text-white p-3 rounded-xl outline-none text-sm md:text-base"
            rows={4}
          ></textarea>

          <button className="mt-3 bg-purple-600 px-6 py-2 rounded-xl hover:bg-purple-700 w-full sm:w-auto">
            Post Comment
          </button>
        </form>
      )}

      {/* Loading spinner */}
      {loading && <Loader />}

      {/* Render all comments */}
      {!loading &&
        comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-900 p-4 rounded-xl mb-3"
          >
            <p className="text-gray-200">{comment.text}</p>

            <p className="text-gray-500 text-sm mt-2">
              {comment.user?.name || "Anonymous"} •{" "}
              {formatDate(comment.createdAt)}
            </p>
             {/* Delete button only if admin or comment owner */}
            {user &&
              (user.role === "admin" || user._id === comment.user?._id) && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-400 mt-2 text-sm hover:text-red-500"
                >
                  Delete
                </button>
              )}
          </div>
        ))}
    </div>
  );
}