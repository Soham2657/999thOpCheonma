/*
PURPOSE:
This is an admin protected route component.
Only users with role "admin" can access these routes.
If user is not admin, redirect to home.
*/

import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

export default function AdminRoute({ children}){
const { user } = useAuth();

// If no user exists, it means user is not logged in
if (!user) {
  return <Navigate to="/login" replace />;
}

// If user exists but role is not admin, redirect to home
if (user.role !== "admin") {
  return <Navigate to="/" replace />;   

}
//if admin allow access to the page(childrens are admindshboard and createblog)
return children;
}