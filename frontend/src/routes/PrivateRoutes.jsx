/*
PURPOSE:
This is a protected route component.
If the user is NOT logged in, it redirects them to /login.
If logged in, it renders the requested page.
*/

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();

  // If no user exists, it means user is not logged in,(children is here Notification page)
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, allow access to the page
  return children;
}
