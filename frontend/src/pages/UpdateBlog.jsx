/*
PURPOSE:
Admin Edit Blog Page.
Similar to CreateBlog but for updating existing blogs.
*/
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { blogService } from "../services/blogService";
import { uploadService } from "../services/uploadService";
import { BLOG_CATEGORIES } from "../utils/constants";
// TipTap editor imports
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function UpdateBlog() {
  const navigate = useNavigate();
  const { id } = useParams(); // Blog ID from URL
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(BLOG_CATEGORIES[0]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [aliases, setAliases] = useState([]);
  const [aliasInput, setAliasInput] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailName, setThumbnailName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Blog content...</p>",
  });

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blog = await blogService.getBlogById(id);
        if (!blog) {
          toast.error("Blog not found");
          navigate("/admin");
          return;
        }
        setTitle(blog.title);
        setCategories(blog.categories || []);
        setTags(blog.tags || []);
        setAliases(blog.aliases || []);
        setThumbnail(blog.thumbnail);
        if (blog.thumbnail) setThumbnailName("Current thumbnail");
        editor?.setContent(blog.content);
      } catch (error) {
        toast.error("Failed to fetch blog");
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, editor]);

  const handleUploadThumbnail = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailName(file.name);

    try {
      setUploading(true);
      const data = await uploadService.uploadImage(file);
      setThumbnail(data.imageUrl);
      toast.success("Thumbnail uploaded!");
    } catch (error) {
      toast.error("Thumbnail upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return toast.error("Title is required");
    if (!editor) return toast.error("Editor not loaded yet");

    const contentHTML = editor.getHTML();

    try {
      await blogService.updateBlog(id, {
        title,
        categories,
        tags,
        aliases,
        thumbnail,
        content: contentHTML,
      });

      toast.success("Blog updated successfully!");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Update Blog</h1>

      <form onSubmit={handleSubmit}>
        {/* Blog Title */}
        <input
          type="text"
          placeholder="Enter blog title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900 text-white outline-none mb-4"
        />

        {/* Category Picker */}
        <div className="mb-4">
          <div className="flex gap-3 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-gray-900 text-white outline-none"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                if (!categories.includes(selectedCategory)) {
                  setCategories((prev) => [...prev, selectedCategory]);
                }
              }}
              className="bg-blue-600 px-4 py-3 rounded-xl hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategories((prev) => prev.filter((c) => c !== cat))}
                  className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                  {cat} x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Tags (main manhwa names)</label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Enter tag and press Add..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                    setTags((prev) => [...prev, tagInput.trim()]);
                    setTagInput("");
                  }
                }
              }}
              className="flex-1 p-3 rounded-xl bg-gray-900 text-white outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (tagInput.trim() && !tags.includes(tagInput.trim())) {
                  setTags((prev) => [...prev, tagInput.trim()]);
                  setTagInput("");
                }
              }}
              className="bg-green-600 px-4 py-3 rounded-xl hover:bg-green-700"
            >
              Add Tag
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTags((prev) => prev.filter((t) => t !== tag))}
                  className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                  {tag} x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Aliases Input */}
        <div className="mb-4">
          <label className="block text-gray-300 text-sm mb-2">Aliases (alternative scan names)</label>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Enter alias and press Add..."
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (aliasInput.trim() && !aliases.includes(aliasInput.trim())) {
                    setAliases((prev) => [...prev, aliasInput.trim()]);
                    setAliasInput("");
                  }
                }
              }}
              className="flex-1 p-3 rounded-xl bg-gray-900 text-white outline-none"
            />
            <button
              type="button"
              onClick={() => {
                if (aliasInput.trim() && !aliases.includes(aliasInput.trim())) {
                  setAliases((prev) => [...prev, aliasInput.trim()]);
                  setAliasInput("");
                }
              }}
              className="bg-green-600 px-4 py-3 rounded-xl hover:bg-green-700"
            >
              Add Alias
            </button>
          </div>

          {aliases.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {aliases.map((alias) => (
                <button
                  key={alias}
                  type="button"
                  onClick={() => setAliases((prev) => prev.filter((a) => a !== alias))}
                  className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                  {alias} x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-4">
          <input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            onChange={handleUploadThumbnail}
            className="hidden"
          />
          <label
            htmlFor="thumbnail-upload"
            className="inline-flex items-center gap-3 bg-gray-900 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-800"
          >
            <span className="bg-purple-600 px-3 py-1 rounded-lg">Choose File</span>
            <span className="text-gray-300 text-sm">
              {thumbnailName || "No file selected"}
            </span>
          </label>
        </div>

        {/* Thumbnail preview */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt="thumbnail"
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
        )}

        {uploading && <p className="text-gray-400 mb-4">Uploading...</p>}

        {/* TipTap Editor */}
        <div className="bg-gray-900 p-4 rounded-xl mb-4">
          <h2 className="text-lg font-bold mb-2">Blog Content</h2>
          <EditorContent editor={editor} className="text-white min-h-50" />
        </div>

        {/* Submit Button */}
        <button className="bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700">
          Update Blog
        </button>
      </form>
    </div>
  );
}
