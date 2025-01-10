import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FlightsPage from "./pages/Flightspage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SignupPage from "./pages/SignupPage";
import HotelsPage from "./pages/Hotelspage";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthContext

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  const { authState } = useAuth();

  return authState.isAuthenticated ? element : <Navigate to="/login" />;
};


const App = () => {
  return (
    <AuthProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/flights"
            element={<ProtectedRoute element={<FlightsPage />} />} // Protect this route
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;