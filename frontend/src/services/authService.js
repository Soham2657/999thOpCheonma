/*
PURPOSE:
Handles API calls related to authentication.
*/
import api from "./api";

export const authService = {
  register: async (data) => {
    const res = await api.post("/users/register", data);
    return res.data;
  },

  login: async (data) => {
    const res = await api.post("/users/login", data);
    return res.data;
  },
};