/*
PURPOSE:
Stores authentication data globally:
- user info
- token
- login/logout functions

So any component can access auth state without passing props everywhere.
*/
import  { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  //runs on page load to check if user is already logged in (token in localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

//login function to save user and token in state and localStorage
//passes login params from login page (userData and token) to this context
    const login = (userData, token) => {
    setUser(userData);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

//logout function to clear user and token from state and localStorage
    const logout = () => {  
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
    </AuthContext.Provider>
  );
}