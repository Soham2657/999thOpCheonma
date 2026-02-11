const  mongoose  = require("mongoose");

/*
Each comment:
- belongs to a blog
- belongs to a user
*/
const commentSchema=new mongoose.Schema(
    {
        blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: String,
},
  { timestamps: true }
);
module.exports=mongoose.model("Comment",commentSchema);