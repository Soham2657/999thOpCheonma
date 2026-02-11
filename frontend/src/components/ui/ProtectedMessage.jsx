// src/components/ui/ProtectedMessage.jsx
/*
PURPOSE:
Shows message when user tries to do something but must login.
Example: commenting without login.
*/

import { Link } from "react-router-dom";

export default function ProtectedMessage({ message }) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl">
      <p className="text-gray-300">{message}</p>
      <Link
        to="/login"
        className="inline-block mt-3 bg-purple-600 px-4 py-2 rounded-xl hover:bg-purple-700"
      >
        Login
      </Link>
    </div>
  );
}
