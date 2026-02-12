/*
PURPOSE:
Navbar component shown on every page.
Includes:
- site name
- links
- search bar
- login/logout buttons
- mobile responsive hamburger menu
*/

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth.js";
import logo from "../../assets/logo/manhwa logo.jpg";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
     // Called when search form is submitted
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    navigate(`/blogs?search=${encodeURIComponent(searchText)}`);
    setSearchText("");
    setMobileMenuOpen(false);
  };
  
  // Called when user clicks logout button
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
    setMobileMenuOpen(false);
  };

  
  return (
    <nav className="w-full bg-black text-white px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Site logo/name */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ManhwaSensei Logo" className="h-10 w-10 md:h-12 md:w-12 rounded-lg object-cover" />
          <span className="text-xl md:text-2xl font-bold tracking-wide">999thOpCheonma</span>
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-900 px-3 py-2 rounded-xl flex-1 max-w-md mx-6"
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

        {/* Desktop Navbar Links */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/blogs" className="hover:text-gray-300">
            Blogs
          </Link>

          {user ? (
            <>
              {user.role !== "admin" && (
                <Link to="/subscription" className="hover:text-gray-300">
                  Subscription
                </Link>
              )}

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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-800 pt-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center bg-gray-900 px-3 py-2 rounded-xl">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search manhwa blogs..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent outline-none text-white px-2 w-full"
              />
            </div>
          </form>

          {/* Mobile Links */}
          <div className="flex flex-col gap-3">
            <Link
              to="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-gray-300 py-2"
            >
              Blogs
            </Link>

            {user ? (
              <>
                {user.role !== "admin" && (
                  <Link
                    to="/subscription"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-gray-300 py-2"
                  >
                    Subscription
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-gray-300 py-2"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700 text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-700 text-center"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-green-600 px-4 py-2 rounded-xl hover:bg-green-700 text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}