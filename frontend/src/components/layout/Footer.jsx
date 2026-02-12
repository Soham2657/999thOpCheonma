// src/components/layout/Footer.jsx
/*
PURPOSE:
Footer shown on every page.
*/

import { Linkedin, Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-400 py-8 mt-10 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-lg mb-2">ManhwaSensei</h3>
            <p className="text-sm">
              Your go-to source for manhwa news, reviews, and community discussions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/blogs" className="hover:text-purple-400 transition">
                  Blogs
                </a>
              </li>
              <li>
                <a href="/subscription" className="hover:text-purple-400 transition">
                  Subscribe
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-right">
            <h3 className="text-white font-bold text-lg mb-2">Connect With Us</h3>
            <div className="flex justify-center md:justify-end gap-4">
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-400 transition"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://discord.gg/yourserver"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition"
                aria-label="Discord"
              >
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} ManhwaSensei | Built with MERN ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
