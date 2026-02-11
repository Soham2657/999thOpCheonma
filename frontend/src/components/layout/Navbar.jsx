/*
PURPOSE:
Navbar component shown on every page.
Includes:
- site name
- links
- search bar
- login/logout buttons
*/

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth.js";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
     // Called when search form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    navigate(`/blogs?search=${encodeURIComponent(searchText)}`);
    setSearchText("");
  };
  
  // Called when user clicks logout button
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  
  return (
    <nav className="w-full bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Site logo/name */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        999thOpCheonma
      </Link>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-gray-900 px-3 py-2 rounded-xl w-87.5"
      >
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search manhwa blogs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-transparent outline-none text-white px-2 w-full"
        />
      </form>

      {/* Navbar Links */}
      <div className="flex gap-4 items-center">
        <Link to="/blogs" className="hover:text-gray-300">
          Blogs
        </Link>

        {/* If user is logged in */}
        {user ? (
          <>
            {user.role !== "admin" && (
              <Link to="/subscription" className="hover:text-gray-300">
                Subscription
              </Link>
            )}

            {/* Admin link only if role is admin */}
            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-gray-300">
                Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* If user is not logged in */}
            <Link
              to="/login"
              className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}