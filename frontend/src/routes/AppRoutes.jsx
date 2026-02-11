// src/routes/AppRoutes.jsx
/*
PURPOSE:
Handles all routes/pages of the application using react-router-dom.
This is where we define which URL loads which page.
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

//layout components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
//pages
import Home from "../pages/Home";
import Blogs from "../pages/Blogs";
import BlogPage from "../pages/BlogPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Subscription from "../pages/Subscription";
import AdminDashboard from "../pages/AdminDashboard";
import CreateBlog from "../pages/CreateBlog";
import UpdateBlog from "../pages/UpdateBlog";
import NotFound from "../pages/NotFound";

//protected route component
import PrivateRoute from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
   
        <Route path="/subscription" element={ <PrivateRoute> <Subscription /></PrivateRoute> } />
        
        <Route path="/admin" element={ <AdminRoute> <AdminDashboard /></AdminRoute> } />
        <Route path="/admin/create-blog" element={ <AdminRoute> <CreateBlog /></AdminRoute> } />
        <Route path="/admin/edit-blog/:id" element={ <AdminRoute> <UpdateBlog /></AdminRoute> } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />    
    </BrowserRouter>
  );
}