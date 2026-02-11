/*
PURPOSE:
This file creates a reusable Axios instance.
So we don't repeat baseURL in every API call.

Also attaches JWT token automatically in every request.
*/
import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base url
});

// Automatically attach token before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // If token exists, attach it to Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;