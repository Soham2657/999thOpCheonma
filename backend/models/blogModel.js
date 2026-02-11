const mongoose=require("mongoose");

/*
Blog Schema:
- categories → genre based browsing
- tags → main manhwa name
- aliases → alternative scan names (search friendly)
*/
const blogSchema=new mongoose.Schema({
    title:String,
    slug:String,
    content:String,
    
    thumbnail: { type: String, default: "" }, // Main blog cover image URL
    images: [String], // Additional images for blog content

    categories:[String],
    tags:[String],
    aliases:[String],

    isPublished:{type:Boolean,default:true},
     author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

},
{ timestamps: true }
);
module.exports=mongoose.model("Blog",blogSchema);