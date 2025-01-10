import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  // Function to log in and update the auth state
  const login = (userData) => {
    setAuthState({
      isAuthenticated: true,
      user: userData,
    });
  };

  // Function to log out
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier use of AuthContext
export const useAuth = () => useContext(AuthContext);