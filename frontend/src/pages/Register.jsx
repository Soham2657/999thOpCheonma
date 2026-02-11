/*
PURPOSE:
Register page.
Calls backend API to register user.
Also logs user in instantly after register.
*/
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { authService } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
export default function Register(){
    const {login}=useAuth();
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    });
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.register(formData);
            login(data.user, data.token);
            toast.success("Registration successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        }
    };
    return( <div className="min-h-screen bg-gray-950 text-white flex justify-center items-center px-6">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white outline-none mb-4"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white outline-none mb-4"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white outline-none mb-4"
          />

          <button className="w-full bg-green-600 p-3 rounded-xl hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}