/*
PURPOSE:
404 page when route does not exist.
*/

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-gray-400 mt-3">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 bg-purple-600 px-6 py-3 rounded-xl hover:bg-purple-700"
      >
        Go Home
      </Link>
    </div>
  );
}